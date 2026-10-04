import { useState, useEffect } from 'react'
import { ReportsService } from '../services/reportsService'
import { Database } from '../services/supabase'

type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']

export function useReports() {
  const [reports, setReports] = useState<ReportWithAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ReportsService.getAllReports()
      setReports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports')
      console.error('Error in useReports:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()

    // Subscribe to real-time updates
    const subscription = ReportsService.subscribeToReports((payload) => {
      console.log('Real-time report update:', payload)
      // Refresh data when changes occur
      fetchReports()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    reports,
    loading,
    error,
    refetch: fetchReports
  }
}

export function useReportsByStatus(status: string) {
  const [reports, setReports] = useState<ReportWithAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ReportsService.getReportsByStatus(status)
      setReports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports')
      console.error('Error in useReportsByStatus:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [status])

  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = ReportsService.subscribeToReports((payload) => {
      console.log('Real-time report update:', payload)
      // Refresh data when changes occur
      fetchReports()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    reports,
    loading,
    error,
    refetch: fetchReports
  }
}

export function useReportsByCategory(category: string) {
  const [reports, setReports] = useState<ReportWithAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ReportsService.getReportsByCategory(category)
      setReports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports')
      console.error('Error in useReportsByCategory:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [category])

  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = ReportsService.subscribeToReports((payload) => {
      console.log('Real-time report update:', payload)
      fetchReports()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    reports,
    loading,
    error,
    refetch: fetchReports
  }
}

// Additional hooks for backward compatibility
export function useCreateReport() {
  return {
    createReport: async (reportData: any) => {
      // This would create a new report in Supabase
      console.log('Creating report:', reportData)
      return { success: true }
    },
    loading: false
  }
}

export function useMyReports() {
  // This would return reports for the current user
  return {
    reports: [],
    loading: false
  }
}