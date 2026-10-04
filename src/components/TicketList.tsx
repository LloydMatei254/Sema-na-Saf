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
import { useReports } from '../hooks/useReports'
import { Database } from '../services/supabase'
import LoadingSpinner from './LoadingSpinner'

type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']

interface TicketListProps {
  onTicketSelect: (ticket: ReportWithAnalysis) => void
}

const TicketList: React.FC<TicketListProps> = ({ onTicketSelect }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'timestamp' | 'severity' | 'status'>('timestamp')

  // Use live data from Supabase
  const { reports, loading, error, refetch } = useReports()

  // Static filter options based on database enums
  const ticketCategories = [
    { value: 'all', label: 'All Categories', color: 'gray' },
    { value: 'NETWORK', label: 'Network Issues', color: 'red' },
    { value: 'MPESA', label: 'M-PESA Issues', color: 'green' },
    { value: 'APP_UX', label: 'App Issues', color: 'orange' },
    { value: 'BILLING', label: 'Billing Issues', color: 'purple' },
    { value: 'FEATURE_REQUEST', label: 'Feature Requests', color: 'blue' },
    { value: 'OTHER', label: 'Other', color: 'gray' }
  ]

  const ticketStatuses = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'RECEIVED', label: 'Received', color: 'blue' },
    { value: 'ANALYZING', label: 'Analyzing', color: 'yellow' },
    { value: 'ASSIGNED', label: 'Assigned', color: 'orange' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'orange' },
    { value: 'RESOLVED', label: 'Resolved', color: 'green' }
  ]

  const severityLevels = [
    { value: 'all', label: 'All Severity', color: 'gray' },
    { value: 'LOW', label: 'Low', color: 'green' },
    { value: 'MEDIUM', label: 'Medium', color: 'orange' },
    { value: 'HIGH', label: 'High', color: 'red' },
    { value: 'CRITICAL', label: 'Critical', color: 'purple' }
  ]

  const filteredTickets = useMemo(() => {
    if (!reports) return []

    let filtered = reports.filter(ticket => {
      const matchesSearch = 
        ticket.ticket_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.location_name?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      const matchesSeverity = severityFilter === 'all' || ticket.severity === severityFilter

      return matchesSearch && matchesCategory && matchesStatus && matchesSeverity
    })

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'severity':
          const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
          return (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                 (severityOrder[a.severity as keyof typeof severityOrder] || 0)
        case 'status':
          return (a.status || '').localeCompare(b.status || '')
        default:
          return 0
      }
    })

    return filtered
  }, [reports, searchQuery, categoryFilter, statusFilter, severityFilter, sortBy])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return <Circle className="text-blue-400" size={16} />
      case 'ANALYZING':
        return <Clock className="text-yellow-400" size={16} />
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return <Clock className="text-orange-400" size={16} />
      case 'RESOLVED':
        return <CheckCircle className="text-green-400" size={16} />
      default:
        return <Circle className="text-gray-400" size={16} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-purple-600 text-white'
      case 'HIGH':
        return 'bg-red-600 text-white'
      case 'MEDIUM':
        return 'bg-orange-600 text-white'
      case 'LOW':
        return 'bg-green-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NETWORK':
        return 'text-red-400'
      case 'MPESA':
        return 'text-green-400'
      case 'APP_UX':
        return 'text-orange-400'
      case 'BILLING':
        return 'text-purple-400'
      case 'FEATURE_REQUEST':
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

  const formatCategoryLabel = (category: string) => {
    return ticketCategories.find(c => c.value === category)?.label || category
  }

  const formatStatusLabel = (status: string) => {
    return ticketStatuses.find(s => s.value === status)?.label || status
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
          <p className="text-red-400 mb-2">Error loading tickets</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Customer Feedback Reports</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{filteredTickets.length} reports</span>
          <button 
            onClick={refetch}
            className="text-blue-400 hover:text-blue-300 ml-2"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search reports..."
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
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          {severityLevels.map((severity) => (
            <option key={severity.value} value={severity.value}>
              {severity.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'severity' | 'status')}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="timestamp">Sort by Time</option>
          <option value="severity">Sort by Severity</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Reports List */}
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
                  <span className="text-sm font-mono text-gray-400">{ticket.ticket_number}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(ticket.severity || 'LOW')}`}>
                    {ticket.severity || 'LOW'}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(ticket.status || 'RECEIVED')}
                    <span className="text-xs text-gray-400">
                      {formatStatusLabel(ticket.status || 'RECEIVED')}
                    </span>
                  </div>
                  {ticket.ai_confidence && (
                    <span className="text-xs text-blue-400">
                      AI: {Math.round(ticket.ai_confidence * 100)}%
                    </span>
                  )}
                </div>

                <h4 className="text-white font-medium mb-2">
                  {ticket.subcategory ? `${ticket.subcategory}: ${ticket.description?.slice(0, 100)}...` : ticket.description?.slice(0, 100) + '...'}
                </h4>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {ticket.ai_summary || ticket.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare size={12} />
                      <span className={getCategoryColor(ticket.category || 'OTHER')}>
                        {formatCategoryLabel(ticket.category || 'OTHER')}
                      </span>
                    </div>
                    {ticket.location_name && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span>{ticket.location_name}</span>
                      </div>
                    )}
                    {ticket.assigned_team && (
                      <div className="flex items-center space-x-1">
                        <Smartphone size={12} />
                        <span>{ticket.assigned_team}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span>{ticket.user_name || ticket.user_email || 'Anonymous'}</span>
                    <span>{formatTimeAgo(ticket.created_at)}</span>
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

      {filteredTickets.length === 0 && !loading && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400">No reports found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default TicketList