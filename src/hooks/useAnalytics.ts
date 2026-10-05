import { useState, useEffect } from 'react'
import { AnalyticsService, CountyAnalytics, HourlyData, CategoryData, DailyTrendData } from '../services/analyticsService'
import { Database } from '../services/supabase'

type DashboardSummary = Database['public']['Views']['dashboard_summary']['Row']

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getDashboardSummary()
      setSummary(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard summary')
      console.error('Error in useDashboardSummary:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time analytics update:', payload)
    //   fetchSummary()
    // })

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [])

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary
  }
}

export function useCountyAnalytics() {
  const [counties, setCounties] = useState<CountyAnalytics[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCounties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getCountyAnalytics()
      setCounties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch county analytics')
      console.error('Error in useCountyAnalytics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCounties()

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time county analytics update:', payload)
    //   fetchCounties()
    // })

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [])

  return {
    counties,
    loading,
    error,
    refetch: fetchCounties
  }
}

export function useHourlyData() {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHourlyData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getHourlyData()
      setHourlyData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hourly data')
      console.error('Error in useHourlyData:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHourlyData()

    // Refresh hourly data every 5 minutes
    const interval = setInterval(fetchHourlyData, 5 * 60 * 1000)

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time hourly data update:', payload)
    //   fetchHourlyData()
    // })

    return () => {
      clearInterval(interval)
      // subscription.unsubscribe()
    }
  }, [])

  return {
    hourlyData,
    loading,
    error,
    refetch: fetchHourlyData
  }
}

export function useCategoryDistribution() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getCategoryDistribution()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category distribution')
      console.error('Error in useCategoryDistribution:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time category distribution update:', payload)
    //   fetchCategories()
    // })

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [])

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  }
}

export function useDailyTrends() {
  const [trends, setTrends] = useState<DailyTrendData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrends = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getDailyTrends()
      setTrends(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch daily trends')
      console.error('Error in useDailyTrends:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrends()

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time daily trends update:', payload)
    //   fetchTrends()
    // })

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [])

  return {
    trends,
    loading,
    error,
    refetch: fetchTrends
  }
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AnalyticsService.getPerformanceMetrics()
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch performance metrics')
      console.error('Error in usePerformanceMetrics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()

    // Refresh metrics every 2 minutes
    const interval = setInterval(fetchMetrics, 2 * 60 * 1000)

    // Real-time updates temporarily disabled to prevent subscription errors
    // const subscription = AnalyticsService.subscribeToAnalytics((payload) => {
    //   console.log('Real-time performance metrics update:', payload)
    //   fetchMetrics()
    // })

    return () => {
      clearInterval(interval)
      // subscription.unsubscribe()
    }
  }, [])

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics
  }
}