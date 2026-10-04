import React, { useState } from 'react'
import TicketList from '../components/TicketList'
import TicketDetail from '../components/TicketDetail'
import { Ticket } from '../data/ticketsData'

const TicketManagement: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    // In a real app, this would update the backend and refresh the list
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