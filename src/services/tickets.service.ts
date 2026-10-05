import { supabase } from '../lib/supabase'

export interface Ticket {
  id: string
  title: string
  description: string
  category: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  user_id: string
  assigned_to?: string
  location?: string
  county?: string
  created_at: string
  updated_at: string
  resolved_at?: string
}

export interface CreateTicketData {
  title: string
  description: string
  category: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  location?: string
  county?: string
}

export const ticketsService = {
  // Get all tickets (admin/analyst view)
  async getAllTickets() {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          profiles!tickets_user_id_fkey (
            full_name,
            phone
          ),
          assigned_profile:profiles!tickets_assigned_to_fkey (
            full_name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets:', error)
      return { data: null, error }
    }
  },

  // Get user's own tickets
  async getUserTickets(userId: string) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          assigned_profile:profiles!tickets_assigned_to_fkey (
            full_name
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user tickets:', error)
      return { data: null, error }
    }
  },

  // Create new ticket
  async createTicket(ticketData: CreateTicketData, userId: string) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert({
          ...ticketData,
          user_id: userId,
          status: 'OPEN'
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating ticket:', error)
      return { data: null, error }
    }
  },

  // Update ticket status
  async updateTicketStatus(ticketId: string, status: Ticket['status'], assignedTo?: string) {
    try {
      const updateData: any = { status, updated_at: new Date().toISOString() }
      
      if (assignedTo) {
        updateData.assigned_to = assignedTo
      }
      
      if (status === 'RESOLVED') {
        updateData.resolved_at = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('tickets')
        .update(updateData)
        .eq('id', ticketId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating ticket:', error)
      return { data: null, error }
    }
  },

  // Get tickets by category
  async getTicketsByCategory(category: string) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets by category:', error)
      return { data: null, error }
    }
  },

  // Get tickets by location/county
  async getTicketsByLocation(county?: string, location?: string) {
    try {
      let query = supabase.from('tickets').select('*')
      
      if (county) {
        query = query.eq('county', county)
      }
      
      if (location) {
        query = query.ilike('location', `%${location}%`)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets by location:', error)
      return { data: null, error }
    }
  },

  // Get analytics data
  async getTicketAnalytics() {
    try {
      // Get tickets by status
      const { data: statusData, error: statusError } = await supabase
        .from('tickets')
        .select('status')

      if (statusError) throw statusError

      // Get tickets by category  
      const { data: categoryData, error: categoryError } = await supabase
        .from('tickets')
        .select('category, created_at')

      if (categoryError) throw categoryError

      // Get resolution times
      const { data: resolutionData, error: resolutionError } = await supabase
        .from('tickets')
        .select('created_at, resolved_at, status')
        .not('resolved_at', 'is', null)

      if (resolutionError) throw resolutionError

      return { 
        data: {
          statusData,
          categoryData,
          resolutionData
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return { data: null, error }
    }
  },

  // Subscribe to real-time updates
  subscribeToTickets(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('tickets')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'tickets' 
        }, 
        callback
      )
      .subscribe()

    return subscription
  }
}