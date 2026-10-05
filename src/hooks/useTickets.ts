import { useState, useEffect } from 'react'
import { ticketsService, Ticket } from '../services/tickets.service'
import { useAuth } from '../contexts/AuthContext'

export function useTickets() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = async () => {
    if (!isAuthenticated || !user) return

    setLoading(true)
    setError(null)

    try {
      let result
      if (isAdmin()) {
        result = await ticketsService.getAllTickets()
      } else {
        result = await ticketsService.getUserTickets(user.id)
      }

      if (result.error) {
        throw result.error
      }

      setTickets(result.data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tickets')
      console.error('Error fetching tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateTicketStatus = async (ticketId: string, status: Ticket['status'], assignedTo?: string) => {
    try {
      const result = await ticketsService.updateTicketStatus(ticketId, status, assignedTo)
      
      if (result.error) {
        throw result.error
      }

      // Update local state
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status, assigned_to: assignedTo, updated_at: new Date().toISOString() }
            : ticket
        )
      )

      return { success: true, error: null }
    } catch (err: any) {
      setError(err.message || 'Failed to update ticket')
      return { success: false, error: err }
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTickets()
    }
  }, [isAuthenticated, user])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isAuthenticated) return

    const subscription = ticketsService.subscribeToTickets((payload) => {
      console.log('Real-time update:', payload)
      
      if (payload.eventType === 'INSERT') {
        setTickets(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setTickets(prev => 
          prev.map(ticket => 
            ticket.id === payload.new.id ? payload.new : ticket
          )
        )
      } else if (payload.eventType === 'DELETE') {
        setTickets(prev => 
          prev.filter(ticket => ticket.id !== payload.old.id)
        )
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isAuthenticated])

  return {
    tickets,
    loading,
    error,
    refetch: fetchTickets,
    updateTicketStatus
  }
}