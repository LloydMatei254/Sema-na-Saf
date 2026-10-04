import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Eye, 
  MessageSquare, 
  Clock, 
  MapPin,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Circle
} from 'lucide-react'
import { 
  sampleTickets, 
  ticketCategories, 
  ticketStatuses, 
  ticketPriorities, 
  Ticket 
} from '../data/ticketsData'

interface TicketListProps {
  onTicketSelect: (ticket: Ticket) => void
}

const TicketList: React.FC<TicketListProps> = ({ onTicketSelect }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'timestamp' | 'priority' | 'status'>('timestamp')

  const filteredTickets = useMemo(() => {
    let filtered = sampleTickets.filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority
    })

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, categoryFilter, statusFilter, priorityFilter, sortBy])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Circle className="text-blue-400" size={16} />
      case 'in_progress':
        return <Clock className="text-orange-400" size={16} />
      case 'resolved':
        return <CheckCircle className="text-green-400" size={16} />
      case 'closed':
        return <XCircle className="text-gray-400" size={16} />
      default:
        return <Circle className="text-gray-400" size={16} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-purple-600 text-white'
      case 'high':
        return 'bg-red-600 text-white'
      case 'medium':
        return 'bg-orange-600 text-white'
      case 'low':
        return 'bg-green-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'network':
        return 'text-red-400'
      case 'mpesa':
        return 'text-green-400'
      case 'app':
        return 'text-orange-400'
      case 'billing':
        return 'text-purple-400'
      case 'features':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Customer Feedback Tickets</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{filteredTickets.length} tickets</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {ticketCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {ticketStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {ticketPriorities.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'priority' | 'status')}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="timestamp">Sort by Time</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-600"
            onClick={() => onTicketSelect(ticket)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-mono text-gray-400">{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(ticket.status)}
                    <span className="text-xs text-gray-400 capitalize">{ticket.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <h4 className="text-white font-medium mb-2">{ticket.subject}</h4>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {ticket.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare size={12} />
                      <span className={getCategoryColor(ticket.category)}>
                        {ticketCategories.find(c => c.value === ticket.category)?.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={12} />
                      <span>{ticket.location.county}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Smartphone size={12} />
                      <span>{ticket.deviceInfo.networkType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span>{ticket.customerName}</span>
                    <span>{formatTimeAgo(ticket.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onTicketSelect(ticket)
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400">No tickets found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default TicketList