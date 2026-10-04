import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface AnalyzeReportRequest {
  reportId: string
}

interface AIAnalysisResult {
  category: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
  subcategory?: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  confidence: number
  summary: string
  recommended_action: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { reportId }: AnalyzeReportRequest = await req.json()

    if (!reportId) {
      return new Response(
        JSON.stringify({ error: 'Report ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch the report and telemetry
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select(`
        *,
        report_telemetry(*),
        profiles(full_name, phone)
      `)
      .eq('id', reportId)
      .single()

    if (reportError || !report) {
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update status to analyzing
    await supabase
      .from('reports')
      .update({ status: 'ANALYZING' })
      .eq('id', reportId)

    // Perform AI analysis
    let analysisResult: AIAnalysisResult

    try {
      analysisResult = await performAIAnalysis(report)
    } catch (error) {
      console.error('AI analysis failed:', error)
      // Fallback to keyword-based analysis
      analysisResult = performFallbackAnalysis(report.description)
    }

    // Get the appropriate team for this category
    const { data: team } = await supabase
      .from('teams')
      .select('id')
      .eq('name', getTeamForCategory(analysisResult.category))
      .single()

    // Save AI analysis
    const { error: analysisError } = await supabase
      .from('ai_analysis')
      .insert({
        report_id: reportId,
        category: analysisResult.category,
        subcategory: analysisResult.subcategory,
        severity: analysisResult.severity,
        confidence: analysisResult.confidence,
        summary: analysisResult.summary,
        recommended_action: analysisResult.recommended_action,
        assigned_team_id: team?.id,
        model: 'gpt-4-turbo',
        raw_response: analysisResult
      })

    if (analysisError) {
      throw analysisError
    }

    // Update report with analysis results and assign to team
    await supabase
      .from('reports')
      .update({
        category: analysisResult.category,
        subcategory: analysisResult.subcategory,
        severity: analysisResult.severity,
        status: 'ASSIGNED',
        assigned_team_id: team?.id
      })
      .eq('id', reportId)

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: analysisResult,
        assignedTeam: team?.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error analyzing report:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function performAIAnalysis(report: any): Promise<AIAnalysisResult> {
  const openaiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openaiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = `
You are Sema, an intelligent customer feedback classification system for Safaricom Kenya.

Analyze this customer report and return JSON only with this exact structure:

{
  "category": "NETWORK|MPESA|BILLING|APP_UX|FEATURE_REQUEST|OTHER",
  "subcategory": "specific_issue_type",
  "severity": "LOW|MEDIUM|HIGH|CRITICAL",
  "confidence": 0.0-1.0,
  "summary": "Brief technical summary",
  "recommended_action": "Specific action to take"
}

Customer Report:
Description: ${report.description}
Location: ${report.location_name || 'Not specified'}
Input Type: ${report.input_type}

${report.report_telemetry?.[0] ? `
Telemetry:
- Network: ${report.report_telemetry[0].network_type}
- Signal Strength: ${report.report_telemetry[0].signal_strength}dBm
- Device: ${report.report_telemetry[0].device_model}
- OS: ${report.report_telemetry[0].os_version}
` : ''}

Classification Rules:
- NETWORK: connectivity, speed, coverage, signal issues
- MPESA: mobile money, transactions, payments, ATM issues  
- BILLING: charges, account issues, incorrect bills
- APP_UX: app crashes, interface problems, login issues
- FEATURE_REQUEST: suggestions for new features
- OTHER: everything else

Severity Rules:
- CRITICAL: service completely unavailable, money lost
- HIGH: significant impact on daily usage
- MEDIUM: inconvenience but workarounds exist
- LOW: minor issues, feature requests

Return only valid JSON:
`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are a technical support classification system. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.1
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('No response from AI')
  }

  // Parse JSON response
  try {
    const analysis = JSON.parse(content.trim())
    
    // Validate the response
    if (!validateAnalysis(analysis)) {
      throw new Error('Invalid AI response structure')
    }

    return analysis
  } catch (error) {
    console.error('Failed to parse AI response:', content)
    throw new Error('Invalid AI response format')
  }
}

function performFallbackAnalysis(description: string): AIAnalysisResult {
  const text = description.toLowerCase()
  
  // Keyword-based classification
  let category: AIAnalysisResult['category'] = 'OTHER'
  let subcategory = ''
  let severity: AIAnalysisResult['severity'] = 'MEDIUM'

  // Network issues
  if (text.includes('network') || text.includes('signal') || text.includes('coverage') || 
      text.includes('internet') || text.includes('data') || text.includes('call') ||
      text.includes('slow') || text.includes('connection')) {
    category = 'NETWORK'
    
    if (text.includes('slow') || text.includes('speed')) {
      subcategory = 'SLOW_DATA'
      severity = text.includes('extremely') || text.includes('very') ? 'HIGH' : 'MEDIUM'
    } else if (text.includes('no signal') || text.includes('outage') || text.includes('down')) {
      subcategory = 'NO_SIGNAL'
      severity = 'CRITICAL'
    } else if (text.includes('drop') || text.includes('dropping')) {
      subcategory = 'CALL_DROPS'
      severity = 'MEDIUM'
    } else {
      subcategory = 'POOR_COVERAGE'
      severity = 'MEDIUM'
    }
  }

  // M-PESA issues
  else if (text.includes('mpesa') || text.includes('m-pesa') || text.includes('transaction') ||
           text.includes('money') || text.includes('payment') || text.includes('send money')) {
    category = 'MPESA'
    
    if (text.includes('failed') && text.includes('deduct')) {
      subcategory = 'FAILED_TRANSACTION'
      severity = 'HIGH'
    } else if (text.includes('slow') || text.includes('delay')) {
      subcategory = 'SLOW_PROCESSING'
      severity = 'MEDIUM'
    } else if (text.includes('atm')) {
      subcategory = 'ATM_ISSUES'
      severity = 'HIGH'
    } else {
      subcategory = 'GENERAL_ISSUE'
      severity = 'MEDIUM'
    }
  }

  // Billing issues
  else if (text.includes('bill') || text.includes('charge') || text.includes('billing') ||
           text.includes('account') || text.includes('balance') || text.includes('deduct')) {
    category = 'BILLING'
    subcategory = 'INCORRECT_CHARGES'
    severity = 'MEDIUM'
  }

  // App issues  
  else if (text.includes('app') || text.includes('crash') || text.includes('login') ||
           text.includes('mysafaricom') || text.includes('interface')) {
    category = 'APP_UX'
    
    if (text.includes('crash')) {
      subcategory = 'APP_CRASH'
      severity = 'MEDIUM'
    } else if (text.includes('login')) {
      subcategory = 'LOGIN_ISSUES'
      severity = 'HIGH'
    } else {
      subcategory = 'INTERFACE_ISSUES'
      severity = 'LOW'
    }
  }

  // Feature requests
  else if (text.includes('request') || text.includes('feature') || text.includes('add') ||
           text.includes('suggest') || text.includes('rollover')) {
    category = 'FEATURE_REQUEST'
    subcategory = 'ENHANCEMENT'
    severity = 'LOW'
  }

  return {
    category,
    subcategory,
    severity,
    confidence: 0.7, // Lower confidence for fallback
    summary: `Fallback analysis: ${category} issue detected in customer report`,
    recommended_action: `Route to ${getTeamForCategory(category)} for manual review and resolution`
  }
}

function validateAnalysis(analysis: any): boolean {
  const validCategories = ['NETWORK', 'MPESA', 'BILLING', 'APP_UX', 'FEATURE_REQUEST', 'OTHER']
  const validSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

  return (
    analysis &&
    validCategories.includes(analysis.category) &&
    validSeverities.includes(analysis.severity) &&
    typeof analysis.confidence === 'number' &&
    analysis.confidence >= 0 && analysis.confidence <= 1 &&
    typeof analysis.summary === 'string' &&
    typeof analysis.recommended_action === 'string'
  )
}

function getTeamForCategory(category: string): string {
  const teamMapping: Record<string, string> = {
    'NETWORK': 'NOC / Radio Planning',
    'MPESA': 'FinTech / Customer Care', 
    'BILLING': 'Billing / Customer Care',
    'APP_UX': 'Digital Product & Design',
    'FEATURE_REQUEST': 'Product Innovation',
    'OTHER': 'Customer Care'
  }

  return teamMapping[category] || 'Customer Care'
}