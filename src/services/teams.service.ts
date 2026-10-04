import { supabase } from '../lib/supabase'
import type { Team } from '../types/database'

class TeamsService {
  async getTeams(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  }

  async getTeamById(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data
  }

  getTeamByCategory(category: string): string | null {
    const teamMapping: Record<string, string> = {
      'NETWORK': 'NOC / Radio Planning',
      'MPESA': 'FinTech / Customer Care',
      'BILLING': 'Billing / Customer Care',
      'APP_UX': 'Digital Product & Design',
      'FEATURE_REQUEST': 'Product Innovation',
      'OTHER': 'Customer Care'
    }

    return teamMapping[category.toUpperCase()] || null
  }

  async getTeamIdByCategory(category: string): Promise<string | null> {
    const teamName = this.getTeamByCategory(category)
    if (!teamName) return null

    const { data, error } = await supabase
      .from('teams')
      .select('id')
      .eq('name', teamName)
      .single()

    if (error) return null
    return data?.id || null
  }

  async getTeamPerformance() {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        assigned_team_id,
        status,
        created_at,
        resolved_at,
        teams!reports_assigned_team_id_fkey(name, department)
      `)
      .not('assigned_team_id', 'is', null)

    if (error) throw error

    const teamPerformance = data.reduce((acc, report) => {
      const team = report.teams
      if (!team) return acc

      if (!acc[team.id]) {
        acc[team.id] = {
          id: team.id,
          name: team.name,
          department: team.department,
          totalAssigned: 0,
          resolved: 0,
          inProgress: 0,
          avgResolutionTime: 0,
          totalResolutionTime: 0
        }
      }

      const teamStats = acc[team.id]
      teamStats.totalAssigned += 1

      if (report.status === 'RESOLVED') {
        teamStats.resolved += 1
        if (report.resolved_at) {
          const resolutionTime = new Date(report.resolved_at).getTime() - new Date(report.created_at).getTime()
          teamStats.totalResolutionTime += resolutionTime / (1000 * 60 * 60) // Convert to hours
        }
      } else if (report.status === 'IN_PROGRESS') {
        teamStats.inProgress += 1
      }

      return acc
    }, {} as Record<string, any>)

    // Calculate average resolution times
    Object.values(teamPerformance).forEach((team: any) => {
      if (team.resolved > 0) {
        team.avgResolutionTime = team.totalResolutionTime / team.resolved
      }
      delete team.totalResolutionTime
    })

    return Object.values(teamPerformance)
  }
}

export const teamsService = new TeamsService()