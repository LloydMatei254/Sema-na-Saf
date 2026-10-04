import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface CreateReportRequest {
  description: string
  inputType: 'TEXT' | 'VOICE'
  locationName?: string
  latitude?: number
  longitude?: number
  telemetry?: {
    networkType?: string
    signalStrength?: number
    latencyMs?: number
    cellId?: string
    deviceModel?: string
    osVersion?: string
    appScreen?: string
  }
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

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user from JWT token
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const requestData: CreateReportRequest = await req.json()

    // Validate required fields
    if (!requestData.description) {
      return new Response(
        JSON.stringify({ error: 'Description is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create the report
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        user_id: user.id,
        description: requestData.description,
        input_type: requestData.inputType || 'TEXT',
        location_name: requestData.locationName,
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        status: 'RECEIVED'
      })
      .select()
      .single()

    if (reportError) {
      throw reportError
    }

    // Add telemetry if provided
    if (requestData.telemetry) {
      const { error: telemetryError } = await supabase
        .from('report_telemetry')
        .insert({
          report_id: report.id,
          network_type: requestData.telemetry.networkType,
          signal_strength: requestData.telemetry.signalStrength,
          latency_ms: requestData.telemetry.latencyMs,
          cell_id: requestData.telemetry.cellId,
          device_model: requestData.telemetry.deviceModel,
          os_version: requestData.telemetry.osVersion,
          app_screen: requestData.telemetry.appScreen,
          latitude: requestData.latitude,
          longitude: requestData.longitude
        })

      if (telemetryError) {
        console.error('Failed to save telemetry:', telemetryError)
      }
    }

    // Trigger AI analysis asynchronously
    try {
      fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/analyze-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportId: report.id })
      }).catch(console.error) // Fire and forget
    } catch (error) {
      console.error('Failed to trigger AI analysis:', error)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        report: {
          id: report.id,
          ticketNumber: report.ticket_number,
          status: report.status
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error creating report:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})