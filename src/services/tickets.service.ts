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

// In-memory fallback storage for when database is not available
let fallbackTickets: Ticket[] = []
let fallbackIdCounter = 1

const createFallbackTicket = (ticketData: CreateTicketData, userId: string): Ticket => {
  const ticket: Ticket = {
    id: `fallback-${fallbackIdCounter++}`,
    ...ticketData,
    user_id: userId,
    status: 'OPEN',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  fallbackTickets.unshift(ticket)
  return ticket
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          console.warn('Database not set up, using fallback tickets')
          return { data: fallbackTickets, error: null }
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets:', error)
      return { data: fallbackTickets, error: null } // Return fallback on any error
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          console.warn('Database not set up, using fallback tickets')
          const userTickets = fallbackTickets.filter(t => t.user_id === userId)
          return { data: userTickets, error: null }
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user tickets:', error)
      const userTickets = fallbackTickets.filter(t => t.user_id === userId)
      return { data: userTickets, error: null }
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          console.warn('Database not set up, using fallback storage')
          const ticket = createFallbackTicket(ticketData, userId)
          return { data: ticket, error: null }
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error creating ticket:', error)
      // Always create fallback ticket on error
      const ticket = createFallbackTicket(ticketData, userId)
      return { data: ticket, error: null }
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          console.warn('Database not set up, updating fallback ticket')
          // Update fallback ticket
          const ticketIndex = fallbackTickets.findIndex(t => t.id === ticketId)
          if (ticketIndex >= 0) {
            fallbackTickets[ticketIndex] = { ...fallbackTickets[ticketIndex], ...updateData }
            return { data: fallbackTickets[ticketIndex], error: null }
          }
          throw new Error('Ticket not found')
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error updating ticket:', error)
      // Try to update fallback ticket
      const ticketIndex = fallbackTickets.findIndex(t => t.id === ticketId)
      if (ticketIndex >= 0) {
        const updateData: any = { status, updated_at: new Date().toISOString() }
        if (assignedTo) updateData.assigned_to = assignedTo
        if (status === 'RESOLVED') updateData.resolved_at = new Date().toISOString()
        
        fallbackTickets[ticketIndex] = { ...fallbackTickets[ticketIndex], ...updateData }
        return { data: fallbackTickets[ticketIndex], error: null }
      }
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          const categoryTickets = fallbackTickets.filter(t => t.category === category)
          return { data: categoryTickets, error: null }
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets by category:', error)
      const categoryTickets = fallbackTickets.filter(t => t.category === category)
      return { data: categoryTickets, error: null }
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

      if (error) {
        if (error.message?.includes('relation "tickets" does not exist')) {
          let filteredTickets = fallbackTickets
          if (county) filteredTickets = filteredTickets.filter(t => t.county === county)
          if (location) filteredTickets = filteredTickets.filter(t => t.location?.includes(location))
          return { data: filteredTickets, error: null }
        }
        throw error
      }
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tickets by location:', error)
      let filteredTickets = fallbackTickets
      if (county) filteredTickets = filteredTickets.filter(t => t.county === county)
      if (location) filteredTickets = filteredTickets.filter(t => t.location?.includes(location))
      return { data: filteredTickets, error: null }
    }
  },

  // Get analytics data
  async getTicketAnalytics() {
    try {
      // Get tickets by status
      const { data: statusData, error: statusError } = await supabase
        .from('tickets')
        .select('status')

      if (statusError) {
        if (statusError.message?.includes('relation "tickets" does not exist')) {
          return { 
            data: {
              statusData: fallbackTickets,
              categoryData: fallbackTickets,
              resolutionData: fallbackTickets.filter(t => t.resolved_at)
            }, 
            error: null 
          }
        }
        throw statusError
      }

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
      return { 
        data: {
          statusData: fallbackTickets,
          categoryData: fallbackTickets,
          resolutionData: fallbackTickets.filter(t => t.resolved_at)
        }, 
        error: null 
      }
    }
  },

  // Subscribe to real-time updates
  subscribeToTickets(callback: (payload: any) => void) {
    try {
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
    } catch (error) {
      console.error('Error subscribing to tickets:', error)
      // Return dummy subscription that can be unsubscribed
      return {
        unsubscribe: () => {}
      }
    }
  }
}