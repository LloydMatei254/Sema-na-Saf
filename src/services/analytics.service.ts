import { supabase } from '../lib/supabase'
import type { DashboardSummary } from '../types/database'

export interface AnalyticsData {
  totalReports: number
  openReports: number
  criticalReports: number
  resolvedReports: number
  avgResolutionTime: number
  categoryDistribution: Array<{ category: string; count: number }>
  severityDistribution: Array<{ severity: string; count: number }>
  locationDistribution: Array<{ location: string; count: number; lat?: number; lng?: number }>
  dailyReports: Array<{ date: string; count: number }>
  teamPerformance: Array<{ team: string; assigned: number; resolved: number; avgTime: number }>
  recentActivity: Array<{
    id: string
    type: 'report_created' | 'status_changed' | 'report_resolved'
    description: string
    timestamp: string
  }>
}

class AnalyticsService {
  async getDashboardSummary(): Promise<DashboardSummary> {
    const { data, error } = await supabase
      .from('dashboard_summary')
      .select('*')
      .single()

    if (error) throw error
    return data
  }

  async getAnalyticsData(): Promise<AnalyticsData> {
    const [
      summary,
      categoryData,
      severityData,
      locationData,
      dailyData,
      teamData,
      recentActivity
    ] = await Promise.all([
      this.getDashboardSummary(),
      this.getCategoryDistribution(),
      this.getSeverityDistribution(), 
      this.getLocationDistribution(),
      this.getDailyReportStats(),
      this.getTeamPerformance(),
      this.getRecentActivity()
    ])

    return {
      totalReports: summary.total_reports,
      openReports: summary.open_reports,
      criticalReports: summary.critical_reports,
      resolvedReports: summary.resolved_reports,
      avgResolutionTime: summary.avg_resolution_time,
      categoryDistribution: categoryData,
      severityDistribution: severityData,
      locationDistribution: locationData,
      dailyReports: dailyData,
      teamPerformance: teamData,
      recentActivity
    }
  }

  private async getCategoryDistribution() {
    const { data, error } = await supabase
      .from('reports')
      .select('category')
      .not('category', 'is', null)

    if (error) throw error

    const distribution = data.reduce((acc, report) => {
      const category = report.category || 'OTHER'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(distribution).map(([category, count]) => ({
      category,
      count
    }))
  }

  private async getSeverityDistribution() {
    const { data, error } = await supabase
      .from('reports')
      .select('severity')
      .not('severity', 'is', null)

    if (error) throw error

    const distribution = data.reduce((acc, report) => {
      const severity = report.severity || 'MEDIUM'
      acc[severity] = (acc[severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(distribution).map(([severity, count]) => ({
      severity,
      count
    }))
  }

  private async getLocationDistribution() {
    const { data, error } = await supabase
      .from('reports')
      .select('location_name, latitude, longitude')
      .not('location_name', 'is', null)

    if (error) throw error

    const locationMap = data.reduce((acc, report) => {
      const location = report.location_name!
      if (!acc[location]) {
        acc[location] = {
          location,
          count: 0,
          lat: report.latitude || undefined,
          lng: report.longitude || undefined
        }
      }
      acc[location].count += 1
      return acc
    }, {} as Record<string, { location: string; count: number; lat?: number; lng?: number }>)

    return Object.values(locationMap)
  }

  private async getDailyReportStats() {
    const { data, error } = await supabase
      .from('reports')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    const dailyStats = data.reduce((acc, report) => {
      const date = new Date(report.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(dailyStats).map(([date, count]) => ({
      date,
      count
    }))
  }

  private async getTeamPerformance() {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        assigned_team_id,
        status,
        created_at,
        resolved_at,
        teams!reports_assigned_team_id_fkey(name)
      `)
      .not('assigned_team_id', 'is', null)

    if (error) throw error

    const teamStats = data.reduce((acc, report) => {
      const teamName = report.teams?.name || 'Unassigned'
      
      if (!acc[teamName]) {
        acc[teamName] = {
          assigned: 0,
          resolved: 0,
          totalResolutionTime: 0
        }
      }

      acc[teamName].assigned += 1

      if (report.status === 'RESOLVED' && report.resolved_at) {
        acc[teamName].resolved += 1
        const resolutionTime = new Date(report.resolved_at).getTime() - new Date(report.created_at).getTime()
        acc[teamName].totalResolutionTime += resolutionTime / (1000 * 60 * 60) // Convert to hours
      }

      return acc
    }, {} as Record<string, { assigned: number; resolved: number; totalResolutionTime: number }>)

    return Object.entries(teamStats).map(([team, stats]) => ({
      team,
      assigned: stats.assigned,
      resolved: stats.resolved,
      avgTime: stats.resolved > 0 ? stats.totalResolutionTime / stats.resolved : 0
    }))
  }

  private async getRecentActivity() {
    // Get recent status changes
    const { data: statusHistory, error: statusError } = await supabase
      .from('report_status_history')
      .select(`
        *,
        reports!report_status_history_report_id_fkey(ticket_number),
        profiles!report_status_history_changed_by_fkey(full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(20)

    if (statusError) throw statusError

    const activities = statusHistory.map(item => ({
      id: item.id,
      type: item.status === 'RESOLVED' ? 'report_resolved' as const : 
            item.status === 'RECEIVED' ? 'report_created' as const :
            'status_changed' as const,
      description: item.status === 'RESOLVED' 
        ? `Report ${item.reports?.ticket_number} resolved`
        : item.status === 'RECEIVED'
        ? `New report ${item.reports?.ticket_number} created`
        : `Report ${item.reports?.ticket_number} status changed to ${item.status}`,
      timestamp: item.created_at
    }))

    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  async getInsights(): Promise<Array<{
    title: string
    description: string
    type: 'warning' | 'info' | 'success'
    data?: any
  }>> {
    const analytics = await this.getAnalyticsData()
    const insights = []

    // Network issues clustering
    const networkReports = analytics.categoryDistribution.find(c => c.category === 'NETWORK')?.count || 0
    if (networkReports > analytics.totalReports * 0.4) {
      insights.push({
        title: 'High Network Issue Volume',
        description: `${networkReports} network-related reports detected. Investigate potential infrastructure issues.`,
        type: 'warning' as const,
        data: { count: networkReports, percentage: (networkReports / analytics.totalReports * 100).toFixed(1) }
      })
    }

    // Location clustering
    const topLocation = analytics.locationDistribution.sort((a, b) => b.count - a.count)[0]
    if (topLocation && topLocation.count > 5) {
      insights.push({
        title: 'Geographic Issue Cluster',
        description: `${topLocation.count} reports from ${topLocation.location}. Consider field investigation.`,
        type: 'info' as const,
        data: topLocation
      })
    }

    // Resolution performance
    if (analytics.avgResolutionTime < 4) {
      insights.push({
        title: 'Excellent Resolution Time',
        description: `Average resolution time is ${analytics.avgResolutionTime.toFixed(1)} hours. Keep up the good work!`,
        type: 'success' as const,
        data: { avgTime: analytics.avgResolutionTime }
      })
    } else if (analytics.avgResolutionTime > 24) {
      insights.push({
        title: 'High Resolution Time',
        description: `Average resolution time is ${analytics.avgResolutionTime.toFixed(1)} hours. Consider process optimization.`,
        type: 'warning' as const,
        data: { avgTime: analytics.avgResolutionTime }
      })
    }

    // Critical reports
    const criticalPercentage = (analytics.criticalReports / analytics.totalReports) * 100
    if (criticalPercentage > 15) {
      insights.push({
        title: 'High Critical Report Volume',
        description: `${criticalPercentage.toFixed(1)}% of reports are critical. Prioritize immediate attention.`,
        type: 'warning' as const,
        data: { count: analytics.criticalReports, percentage: criticalPercentage }
      })
    }

    return insights
  }

  // Real-time analytics subscriptions
  subscribeToAnalytics(callback: () => void) {
    return supabase
      .channel('analytics-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reports'
      }, callback)
      .on('postgres_changes', {
        event: '*',
        schema: 'public', 
        table: 'ai_analysis'
      }, callback)
      .subscribe()
  }
}

export const analyticsService = new AnalyticsService()