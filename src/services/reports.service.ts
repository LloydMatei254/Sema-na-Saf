import { supabase } from '../lib/supabase'
import type { 
  Report, 
  ReportTelemetry, 
  ReportWithAnalysis, 
  AIAnalysis 
} from '../types/database'

export interface CreateReportData {
  description: string
  inputType: 'TEXT' | 'VOICE'
  locationName?: string
  latitude?: number
  longitude?: number
  telemetry?: Partial<ReportTelemetry>
  attachmentFile?: File
}

export interface ReportFilters {
  category?: string
  status?: string
  severity?: string
  assignedTeam?: string
  location?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

class ReportsService {
  async createReport(data: CreateReportData): Promise<Report> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Create the report
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        user_id: user.id,
        description: data.description,
        input_type: data.inputType,
        location_name: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        status: 'RECEIVED'
      })
      .select()
      .single()

    if (reportError) throw reportError

    // Add telemetry if provided
    if (data.telemetry) {
      const { error: telemetryError } = await supabase
        .from('report_telemetry')
        .insert({
          report_id: report.id,
          ...data.telemetry
        })

      if (telemetryError) {
        console.error('Failed to save telemetry:', telemetryError)
      }
    }

    // Handle file attachment if provided
    if (data.attachmentFile) {
      await this.uploadAttachment(report.id, data.attachmentFile)
    }

    // Trigger AI analysis
    this.triggerAIAnalysis(report.id).catch(console.error)

    return report
  }

  async getReports(filters: ReportFilters = {}): Promise<ReportWithAnalysis[]> {
    let query = supabase
      .from('reports_with_analysis')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category.toUpperCase())
    }

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status.toUpperCase())
    }

    if (filters.severity && filters.severity !== 'all') {
      query = query.eq('severity', filters.severity.toUpperCase())
    }

    if (filters.assignedTeam && filters.assignedTeam !== 'all') {
      query = query.eq('assigned_team', filters.assignedTeam)
    }

    if (filters.location) {
      query = query.ilike('location_name', `%${filters.location}%`)
    }

    if (filters.dateFrom) {
      query = query.gte('created_at', filters.dateFrom)
    }

    if (filters.dateTo) {
      query = query.lte('created_at', filters.dateTo)
    }

    if (filters.search) {
      query = query.or(`description.ilike.%${filters.search}%,ticket_number.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.limit(100)

    if (error) throw error
    return data || []
  }

  async getMyReports(): Promise<Report[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getReportById(id: string): Promise<ReportWithAnalysis | null> {
    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data
  }

  async getReportWithDetails(id: string) {
    const [report, telemetry, analysis, statusHistory, attachments] = await Promise.all([
      this.getReportById(id),
      this.getReportTelemetry(id),
      this.getReportAIAnalysis(id),
      this.getReportStatusHistory(id),
      this.getReportAttachments(id)
    ])

    return {
      report,
      telemetry,
      analysis,
      statusHistory,
      attachments
    }
  }

  async updateReportStatus(id: string, status: Report['status'], comment?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('reports')
      .update({ 
        status,
        resolved_at: status === 'RESOLVED' ? new Date().toISOString() : null
      })
      .eq('id', id)

    if (error) throw error

    // Add status history entry
    await supabase
      .from('report_status_history')
      .insert({
        report_id: id,
        status,
        changed_by: user.id,
        comment
      })
  }

  async assignReport(id: string, teamId: string): Promise<void> {
    const { error } = await supabase
      .from('reports')
      .update({ 
        assigned_team_id: teamId,
        status: 'ASSIGNED'
      })
      .eq('id', id)

    if (error) throw error
  }

  private async getReportTelemetry(reportId: string): Promise<ReportTelemetry[]> {
    const { data, error } = await supabase
      .from('report_telemetry')
      .select('*')
      .eq('report_id', reportId)

    if (error) throw error
    return data || []
  }

  private async getReportAIAnalysis(reportId: string): Promise<AIAnalysis | null> {
    const { data, error } = await supabase
      .from('ai_analysis')
      .select('*')
      .eq('report_id', reportId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  private async getReportStatusHistory(reportId: string) {
    const { data, error } = await supabase
      .from('report_status_history')
      .select(`
        *,
        changed_by_profile:profiles!report_status_history_changed_by_fkey(full_name)
      `)
      .eq('report_id', reportId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  private async getReportAttachments(reportId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('report_id', reportId)

    if (error) throw error
    return data || []
  }

  private async uploadAttachment(reportId: string, file: File): Promise<void> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${reportId}/${Date.now()}.${fileExt}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('voice-reports')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    // Save attachment metadata
    const { error: dbError } = await supabase
      .from('attachments')
      .insert({
        report_id: reportId,
        file_name: file.name,
        file_type: file.type,
        storage_path: fileName,
        file_size: file.size
      })

    if (dbError) throw dbError
  }

  private async triggerAIAnalysis(reportId: string): Promise<void> {
    try {
      // Call the Edge Function for AI analysis
      const { error } = await supabase.functions.invoke('analyze-report', {
        body: { reportId }
      })

      if (error) {
        console.error('AI analysis failed:', error)
        // Update status to indicate manual review needed
        await supabase
          .from('reports')
          .update({ status: 'ASSIGNED' })
          .eq('id', reportId)
      }
    } catch (error) {
      console.error('Failed to trigger AI analysis:', error)
    }
  }

  // Realtime subscriptions
  subscribeToReports(callback: (payload: any) => void) {
    return supabase
      .channel('reports-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reports'
      }, callback)
      .subscribe()
  }

  subscribeToMyReports(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('my-reports-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reports',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe()
  }
}

export const reportsService = new ReportsService()