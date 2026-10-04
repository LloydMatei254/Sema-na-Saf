import { supabase, Database } from './supabase'

type Team = Database['public']['Tables']['teams']['Row']

export interface TeamWithStats {
  id: string
  name: string
  description: string
  department: string
  total_assigned: number
  resolved_reports: number
  pending_reports: number
  avg_resolution_time: number
  resolution_rate: number
}

export class TeamsService {
  // Get all teams
  static async getAllTeams(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching teams:', error)
      throw error
    }

    return data || []
  }

  // Get teams with performance statistics
  static async getTeamsWithStats(): Promise<TeamWithStats[]> {
    const teams = await this.getAllTeams()
    
    const teamsWithStats = await Promise.all(
      teams.map(async (team) => {
        // Get reports assigned to this team
        const { data: reports } = await supabase
          .from('reports')
          .select('status, created_at, resolved_at')
          .eq('assigned_team_id', team.id)

        const totalAssigned = reports?.length || 0
        const resolvedReports = reports?.filter(r => r.status === 'RESOLVED').length || 0
        const pendingReports = totalAssigned - resolvedReports

        // Calculate average resolution time for resolved reports
        let avgResolutionTime = 0
        if (resolvedReports > 0) {
          const resolvedWithTimes = reports?.filter(r => r.resolved_at && r.created_at) || []
          const totalResolutionTime = resolvedWithTimes.reduce((sum, report) => {
            const created = new Date(report.created_at).getTime()
            const resolved = new Date(report.resolved_at!).getTime()
            return sum + (resolved - created)
          }, 0)
          
          avgResolutionTime = totalResolutionTime / (resolvedWithTimes.length * 1000 * 60 * 60) // Convert to hours
        }

        return {
          ...team,
          total_assigned: totalAssigned,
          resolved_reports: resolvedReports,
          pending_reports: pendingReports,
          avg_resolution_time: avgResolutionTime,
          resolution_rate: totalAssigned > 0 ? (resolvedReports / totalAssigned) * 100 : 0
        }
      })
    )

    return teamsWithStats.sort((a, b) => b.total_assigned - a.total_assigned)
  }

  // Get team by ID
  static async getTeamById(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching team:', error)
      return null
    }

    return data
  }

  // Get reports assigned to a specific team
  static async getTeamReports(teamId: string) {
    const { data, error } = await supabase
      .from('reports_with_analysis')
      .select('*')
      .eq('assigned_team_id', teamId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching team reports:', error)
      throw error
    }

    return data || []
  }

  // Get team workload distribution
  static async getTeamWorkloadDistribution() {
    const teams = await this.getAllTeams()
    
    const workloadData = await Promise.all(
      teams.map(async (team) => {
        const { data: openReports } = await supabase
          .from('reports')
          .select('id', { count: 'exact' })
          .eq('assigned_team_id', team.id)
          .neq('status', 'RESOLVED')

        const { data: totalReports } = await supabase
          .from('reports')
          .select('id', { count: 'exact' })
          .eq('assigned_team_id', team.id)

        return {
          team_name: team.name,
          department: team.department,
          open_reports: openReports?.length || 0,
          total_reports: totalReports?.length || 0,
          workload_percentage: totalReports?.length 
            ? ((openReports?.length || 0) / totalReports.length) * 100 
            : 0
        }
      })
    )

    return workloadData.sort((a, b) => b.open_reports - a.open_reports)
  }

  // Subscribe to team-related changes
  static subscribeToTeamChanges(callback: (payload: any) => void) {
    return supabase
      .channel('team_changes')
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