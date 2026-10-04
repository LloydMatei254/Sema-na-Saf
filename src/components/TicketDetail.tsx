import React, { useState } from 'react'
import {
  X,
  User,
  Phone,
  MapPin,
  Smartphone,
  Clock,
  Star,
  MessageSquare,
  Image,
  Mic,
  Tag,
  CheckCircle,
  AlertTriangle,
  Edit
} from 'lucide-react'
import { Database } from '../services/supabase'
import { ReportsService } from '../services/reportsService'

type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']

interface TicketDetailProps {
  ticket: ReportWithAnalysis
  onClose: () => void
  onUpdate: (ticket: ReportWithAnalysis) => void
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onClose, onUpdate }) => {
  const [status, setStatus] = useState(ticket.status || 'RECEIVED')
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_team || '')
  const [notes, setNotes] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 'text-blue-400'
      case 'ANALYZING':
        return 'text-yellow-400'
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return 'text-orange-400'
      case 'RESOLVED':
        return 'text-green-400'
      default:
        return 'text-gray-400'
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'NETWORK':
        return <AlertTriangle className="text-red-400" size={20} />
      case 'MPESA':
        return <MessageSquare className="text-green-400" size={20} />
      case 'APP_UX':
        return <Smartphone className="text-orange-400" size={20} />
      case 'BILLING':
        return <MessageSquare className="text-purple-400" size={20} />
      case 'FEATURE_REQUEST':
        return <Star className="text-blue-400" size={20} />
      default:
        return <MessageSquare className="text-gray-400" size={20} />
    }
  }

  const handleUpdate = () => {
    const updatedTicket: Ticket = {
      ...ticket,
      status,
      assignedTo: assignedTo || undefined,
      updatedAt: new Date().toISOString()
    }
    onUpdate(updatedTicket)
    setIsEditing(false)
  }

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSignalQuality = (strength: number) => {
    if (strength === 0) return { label: 'No Signal', color: 'text-red-400' }
    if (strength > -60) return { label: 'Excellent', color: 'text-green-400' }
    if (strength > -70) return { label: 'Good', color: 'text-blue-400' }
    if (strength > -80) return { label: 'Fair', color: 'text-orange-400' }
    return { label: 'Poor', color: 'text-red-400' }
  }

  const signal = getSignalQuality(ticket.deviceInfo.signalStrength)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Ticket Details</h2>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 font-mono">{ticket.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
              <span className={`text-sm ${getStatusColor(status)} capitalize`}>
                {status.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subject and Description */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2 flex items-center space-x-2">
                  {getCategoryIcon(ticket.category)}
                  <span>{ticket.subject}</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{ticket.description}</p>
              </div>

              {/* Attachments */}
              {(ticket.attachments.screenshot || ticket.attachments.voiceNote) && (
                <div>
                  <h4 className="text-white font-medium mb-3">Attachments</h4>
                  <div className="flex space-x-4">
                    {ticket.attachments.screenshot && (
                      <div className="flex items-center space-x-2 bg-gray-750 rounded-lg p-3">
                        <Image className="text-blue-400" size={20} />
                        <span className="text-gray-300 text-sm">Screenshot</span>
                      </div>
                    )}
                    {ticket.attachments.voiceNote && (
                      <div className="flex items-center space-x-2 bg-gray-750 rounded-lg p-3">
                        <Mic className="text-green-400" size={20} />
                        <span className="text-gray-300 text-sm">Voice Note</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Resolution Info */}
              {ticket.status === 'resolved' && (
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                  <h4 className="text-green-400 font-medium mb-2 flex items-center space-x-2">
                    <CheckCircle size={16} />
                    <span>Resolution</span>
                  </h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p><strong>Resolution Time:</strong> {ticket.resolutionTime} minutes</p>
                    {ticket.satisfactionRating && (
                      <div className="flex items-center space-x-2">
                        <span><strong>Rating:</strong></span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= ticket.satisfactionRating! ? 'text-yellow-400 fill-current' : 'text-gray-500'}
                            />
                          ))}
                        </div>
                        <span>({ticket.satisfactionRating}/5)</span>
                      </div>
                    )}
                    {ticket.feedback && (
                      <p><strong>Customer Feedback:</strong> "{ticket.feedback}"</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Panel */}
              {isEditing && (
                <div className="bg-gray-750 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-4">Update Ticket</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Assign To</label>
                      <input
                        type="text"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        placeholder="Team or agent name"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Internal Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes..."
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={handleUpdate}
                      className="btn-primary"
                    >
                      Update Ticket
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Customer Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <User className="text-gray-400" size={16} />
                    <span className="text-gray-300">{ticket.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-gray-300">{ticket.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-gray-300">{ticket.location.county}</span>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Device Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Device:</span>
                    <span className="text-gray-300">{ticket.deviceInfo.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">OS:</span>
                    <span className="text-gray-300">{ticket.deviceInfo.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">App Version:</span>
                    <span className="text-gray-300">{ticket.deviceInfo.appVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-gray-300">{ticket.deviceInfo.networkType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Signal:</span>
                    <span className={signal.color}>{signal.label}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {ticket.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-300"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Timeline</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-400" size={16} />
                    <div>
                      <p className="text-gray-300">Created</p>
                      <p className="text-gray-500">{formatDateTime(ticket.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-400" size={16} />
                    <div>
                      <p className="text-gray-300">Last Updated</p>
                      <p className="text-gray-500">{formatDateTime(ticket.updatedAt)}</p>
                    </div>
                  </div>
                  {ticket.assignedTo && (
                    <div className="flex items-center space-x-3">
                      <User className="text-blue-400" size={16} />
                      <div>
                        <p className="text-gray-300">Assigned To</p>
                        <p className="text-gray-500">{ticket.assignedTo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail