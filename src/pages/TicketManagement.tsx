import React, { useState } from 'react'
import TicketList from '../components/TicketList'
import TicketDetail from '../components/TicketDetail'
import { Database } from '../services/supabase'

type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']

const TicketManagement: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<ReportWithAnalysis | null>(null)

  const handleTicketSelect = (ticket: ReportWithAnalysis) => {
    setSelectedTicket(ticket)
  }

  const handleTicketUpdate = (updatedTicket: ReportWithAnalysis) => {
    // Update handled by the component internally via Supabase
    console.log('Ticket updated:', updatedTicket)
    setSelectedTicket(null)
  }

  const handleCloseTicket = () => {
    setSelectedTicket(null)
  }

  return (
    <div className="space-y-6">
      <TicketList onTicketSelect={handleTicketSelect} />
      
      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onClose={handleCloseTicket}
          onUpdate={handleTicketUpdate}
        />
      )}
    </div>
  )
}

export default TicketManagement