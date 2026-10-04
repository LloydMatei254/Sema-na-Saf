import { supabase, Database } from './supabase'

type Report = Database['public']['Tables']['reports']['Row']
type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']
type InsertReport = Database['public']['Tables']['reports']['Insert']
type UpdateReport = Database['public']['Tables']['reports']['Update']

export class ReportsService {
  // Get all reports with analysis data
  static async getAllReports(): Promise<ReportWithAnalysis[]> {
    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reports:', error)
      throw error
    }

    return data || []
  }

  // Get reports by status
  static async getReportsByStatus(status: string): Promise<ReportWithAnalysis[]> {
    if (status === 'all') {
      return this.getAllReports()
    }

    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .eq('status', status.toUpperCase())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reports by status:', error)
      throw error
    }

    return data || []
  }

  // Get reports by category
  static async getReportsByCategory(category: string): Promise<ReportWithAnalysis[]> {
    if (category === 'all') {
      return this.getAllReports()
    }

    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .eq('category', category.toUpperCase())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reports by category:', error)
      throw error
    }

    return data || []
  }

  // Create a new report
  static async createReport(report: InsertReport): Promise<Report> {
    const { data, error } = await supabase
      .from('reports')
      .insert(report)
      .select()
      .single()

    if (error) {
      console.error('Error creating report:', error)
      throw error
    }

    return data
  }

  // Update a report
  static async updateReport(id: string, updates: UpdateReport): Promise<Report> {
    const { data, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating report:', error)
      throw error
    }

    return data
  }

  // Get reports for a specific user
  static async getUserReports(userId: string): Promise<ReportWithAnalysis[]> {
    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user reports:', error)
      throw error
    }

    return data || []
  }

  // Get reports by location (county)
  static async getReportsByLocation(county: string): Promise<ReportWithAnalysis[]> {
    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .ilike('location_name', `%${county}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reports by location:', error)
      throw error
    }

    return data || []
  }

  // Subscribe to real-time report changes
  static subscribeToReports(callback: (payload: any) => void) {
    return supabase
      .channel('reports_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reports'
        },
        callback
      )
      .subscribe()
  }
}