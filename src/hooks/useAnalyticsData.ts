import { useState, useEffect } from 'react'
import { ticketsService } from '../services/tickets.service'
import { useAuth } from '../contexts/AuthContext'

interface AnalyticsData {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  resolutionRate: number
  avgResolutionTime: number
  ticketsByCategory: { [key: string]: number }
  ticketsByStatus: { [key: string]: number }
  ticketsByPriority: { [key: string]: number }
  recentTickets: any[]
}

export function useAnalyticsData() {
  const { isAuthenticated, isAdmin } = useAuth()
  const [data, setData] = useState<AnalyticsData>({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    resolutionRate: 0,
    avgResolutionTime: 0,
    ticketsByCategory: {},
    ticketsByStatus: {},
    ticketsByPriority: {},
    recentTickets: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    if (!isAuthenticated || !isAdmin()) return

    setLoading(true)
    setError(null)

    try {
      const result = await ticketsService.getTicketAnalytics()
      
      if (result.error) {
        throw result.error
      }

      const { statusData, categoryData, resolutionData } = result.data || {}
      
      // Process status data
      const statusCounts = statusData?.reduce((acc: any, ticket: any) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1
        return acc
      }, {}) || {}

      // Process category data
      const categoryCounts = categoryData?.reduce((acc: any, ticket: any) => {
        acc[ticket.category] = (acc[ticket.category] || 0) + 1
        return acc
      }, {}) || {}

      // Calculate resolution metrics
      const totalTickets = statusData?.length || 0
      const resolvedTickets = statusCounts['RESOLVED'] || 0
      const openTickets = (statusCounts['OPEN'] || 0) + (statusCounts['IN_PROGRESS'] || 0)
      const resolutionRate = totalTickets > 0 ? (resolvedTickets / totalTickets) * 100 : 0

      // Calculate average resolution time
      const avgResolutionTime = resolutionData?.length > 0 
        ? resolutionData.reduce((acc: number, ticket: any) => {
            const created = new Date(ticket.created_at)
            const resolved = new Date(ticket.resolved_at)
            const diffHours = (resolved.getTime() - created.getTime()) / (1000 * 60 * 60)
            return acc + diffHours
          }, 0) / resolutionData.length
        : 0

      setData({
        totalTickets,
        openTickets,
        resolvedTickets,
        resolutionRate: Math.round(resolutionRate),
        avgResolutionTime: Math.round(avgResolutionTime),
        ticketsByCategory: categoryCounts,
        ticketsByStatus: statusCounts,
        ticketsByPriority: {}, // Could be calculated from full ticket data
        recentTickets: categoryData?.slice(0, 10) || []
      })

    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics')
      console.error('Error fetching analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && isAdmin()) {
      fetchAnalytics()
    }
  }, [isAuthenticated, isAdmin])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  }
}