import { useState, useEffect } from 'react'
import { TeamsService, TeamWithStats } from '../services/teamsService'
import { Database } from '../services/supabase'

type Team = Database['public']['Tables']['teams']['Row']

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeams = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TeamsService.getAllTeams()
      setTeams(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch teams')
      console.error('Error in useTeams:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()

    // Subscribe to real-time updates
    const subscription = TeamsService.subscribeToTeamChanges((payload) => {
      console.log('Real-time team update:', payload)
      fetchTeams()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    teams,
    loading,
    error,
    refetch: fetchTeams
  }
}

export function useTeamsWithStats() {
  const [teams, setTeams] = useState<TeamWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Calculate overall stats from team data
  const calculateStats = (teamData: TeamWithStats[]) => {
    if (!teamData || teamData.length === 0) {
      return {
        totalTeams: 0,
        totalMembers: 0,
        avgResolutionRate: 0,
        avgResponseTime: 0
      }
    }

    const totalMembers = teamData.reduce((sum, team) => sum + (team.total_assigned || 0), 0)
    const avgResolutionRate = teamData.reduce((sum, team) => sum + (team.resolution_rate || 0), 0) / teamData.length
    const avgResponseTime = teamData.reduce((sum, team) => sum + (team.avg_resolution_time || 0), 0) / teamData.length

    return {
      totalTeams: teamData.length,
      totalMembers,
      avgResolutionRate,
      avgResponseTime
    }
  }

  const fetchTeamsWithStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TeamsService.getTeamsWithStats()
      setTeams(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch teams with stats')
      console.error('Error in useTeamsWithStats:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamsWithStats()

    // Subscribe to real-time updates
    const subscription = TeamsService.subscribeToTeamChanges((payload) => {
      console.log('Real-time team stats update:', payload)
      fetchTeamsWithStats()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const stats = calculateStats(teams)

  return {
    teams,
    stats,
    loading,
    error,
    refetch: fetchTeamsWithStats
  }
}

export function useTeamReports(teamId: string) {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeamReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TeamsService.getTeamReports(teamId)
      setReports(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team reports')
      console.error('Error in useTeamReports:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (teamId) {
      fetchTeamReports()
    }
  }, [teamId])

  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = TeamsService.subscribeToTeamChanges((payload) => {
      console.log('Real-time team reports update:', payload)
      if (teamId) {
        fetchTeamReports()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [teamId])

  return {
    reports,
    loading,
    error,
    refetch: fetchTeamReports
  }
}

export function useTeamWorkloadDistribution() {
  const [workload, setWorkload] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkload = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TeamsService.getTeamWorkloadDistribution()
      setWorkload(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team workload')
      console.error('Error in useTeamWorkloadDistribution:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkload()

    // Subscribe to real-time updates
    const subscription = TeamsService.subscribeToTeamChanges((payload) => {
      console.log('Real-time team workload update:', payload)
      fetchWorkload()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    workload,
    loading,
    error,
    refetch: fetchWorkload
  }
}