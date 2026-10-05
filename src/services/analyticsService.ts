import { supabase, Database } from './supabase'

type DashboardSummary = Database['public']['Views']['dashboard_summary']['Row']

export interface CountyAnalytics {
  county: string
  total_reports: number
  open_reports: number
  critical_reports: number
  resolved_reports: number
  resolution_rate: number
}

export interface HourlyData {
  hour: string
  tickets: number
  resolved: number
  network: number
  mpesa: number
  billing: number
  app_ux: number
}

export interface CategoryData {
  category: string
  count: number
  percentage: number
}

export interface DailyTrendData {
  date: string
  total_reports: number
  resolved_reports: number
  resolution_rate: number
}

export class AnalyticsService {
  // Get dashboard summary metrics
  static async getDashboardSummary(): Promise<DashboardSummary> {
    const { data, error } = await supabase
      .from('dashboard_summary')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching dashboard summary:', error)
      throw error
    }

    return data
  }

  // Get reports by county for geographic analysis
  static async getCountyAnalytics(): Promise<CountyAnalytics[]> {
    const { data, error } = await supabase.rpc('get_county_analytics')

    if (error) {
      // Fallback to manual query if RPC function doesn't exist
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('reports')
        .select(`
          location_name,
          status,
          severity,
          created_at
        `)
        .not('location_name', 'is', null)

      if (fallbackError) {
        console.error('Error fetching county analytics:', fallbackError)
        throw fallbackError
      }

      // Process the data manually
      const countyMap = new Map<string, CountyAnalytics>()
      
      fallbackData?.forEach(report => {
        if (!report.location_name) return
        
        // Extract county name (first part before comma)
        const county = report.location_name.split(',')[0].trim()
        
        if (!countyMap.has(county)) {
          countyMap.set(county, {
            county,
            total_reports: 0,
            open_reports: 0,
            critical_reports: 0,
            resolved_reports: 0,
            resolution_rate: 0
          })
        }

        const analytics = countyMap.get(county)!
        analytics.total_reports++
        
        if (report.status !== 'RESOLVED') {
          analytics.open_reports++
        } else {
          analytics.resolved_reports++
        }
        
        if (report.severity === 'CRITICAL') {
          analytics.critical_reports++
        }
      })

      // Calculate resolution rates
      const result = Array.from(countyMap.values()).map(analytics => ({
        ...analytics,
        resolution_rate: analytics.total_reports > 0 
          ? (analytics.resolved_reports / analytics.total_reports) * 100 
          : 0
      }))

      return result.sort((a, b) => b.total_reports - a.total_reports)
    }

    return data || []
  }

  // Get hourly ticket distribution for today
  static async getHourlyData(): Promise<HourlyData[]> {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('reports')
      .select(`
        created_at,
        status,
        category
      `)
      .gte('created_at', `${today}T00:00:00Z`)
      .lt('created_at', `${today}T23:59:59Z`)

    if (error) {
      console.error('Error fetching hourly data:', error)
      throw error
    }

    // Process data into hourly buckets
    const hourlyMap = new Map<string, HourlyData>()
    
    // Initialize all hours
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0')
      hourlyMap.set(hourStr, {
        hour: hourStr,
        tickets: 0,
        resolved: 0,
        network: 0,
        mpesa: 0,
        billing: 0,
        app_ux: 0
      })
    }

    // Aggregate data
    data?.forEach(report => {
      const hour = new Date(report.created_at).getHours().toString().padStart(2, '0')
      const hourData = hourlyMap.get(hour)!
      
      hourData.tickets++
      
      if (report.status === 'RESOLVED') {
        hourData.resolved++
      }
      
      switch (report.category) {
        case 'NETWORK':
          hourData.network++
          break
        case 'MPESA':
          hourData.mpesa++
          break
        case 'BILLING':
          hourData.billing++
          break
        case 'APP_UX':
          hourData.app_ux++
          break
      }
    })

    return Array.from(hourlyMap.values())
  }

  // Get category distribution
  static async getCategoryDistribution(): Promise<CategoryData[]> {
    const { data, error } = await supabase
      .from('reports')
      .select('category')

    if (error) {
      console.error('Error fetching category distribution:', error)
      throw error
    }

    const categoryMap = new Map<string, number>()
    const totalReports = data?.length || 0

    data?.forEach(report => {
      const category = report.category
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    })

    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      category: category.toLowerCase(),
      count,
      percentage: totalReports > 0 ? (count / totalReports) * 100 : 0
    })).sort((a, b) => b.count - a.count)
  }

  // Get daily trend data for the past week
  static async getDailyTrends(): Promise<DailyTrendData[]> {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 7)

    const { data, error } = await supabase
      .from('reports')
      .select('created_at, status')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    if (error) {
      console.error('Error fetching daily trends:', error)
      throw error
    }

    // Group by date
    const dailyMap = new Map<string, { total: number; resolved: number }>()

    data?.forEach(report => {
      const date = new Date(report.created_at).toISOString().split('T')[0]
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { total: 0, resolved: 0 })
      }

      const dayData = dailyMap.get(date)!
      dayData.total++
      
      if (report.status === 'RESOLVED') {
        dayData.resolved++
      }
    })

    return Array.from(dailyMap.entries()).map(([date, stats]) => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      total_reports: stats.total,
      resolved_reports: stats.resolved,
      resolution_rate: stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Get performance metrics
  static async getPerformanceMetrics() {
    const { data: summary } = await supabase
      .from('dashboard_summary')
      .select('*')
      .single()

    const { data: recentReports } = await supabase
      .from('reports')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    const { data: criticalReports } = await supabase
      .from('reports')
      .select('id')
      .eq('severity', 'CRITICAL')
      .neq('status', 'RESOLVED')

    return {
      totalReports: summary?.total_reports || 0,
      openReports: summary?.open_reports || 0,
      criticalReports: summary?.critical_reports || 0,
      resolvedReports: summary?.resolved_reports || 0,
      avgResolutionTime: summary?.avg_resolution_time || 0,
      reportsToday: recentReports?.length || 0,
      resolutionRate: summary?.total_reports 
        ? ((summary?.resolved_reports || 0) / summary.total_reports) * 100 
        : 0
    }
  }

  // Subscribe to analytics changes - DISABLED to fix realtime error
  static subscribeToAnalytics(callback: (payload: any) => void) {
    // Temporarily disabled to prevent realtime subscription errors
    console.log('Analytics subscription disabled')
    return {
      unsubscribe: () => {}
    }
  }
}