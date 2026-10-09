import React, { useState, useMemo } from 'react'
import { 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Bot,
  Zap,
  ArrowLeft,
  Filter,
  RefreshCw
} from 'lucide-react'
import { useTickets } from '../hooks/useTickets'
import { useTeams } from '../hooks/useTeams'

interface Team {
  id: string
  name: string
  members: number
  county: string
  specialization: string[]
  capacity: number
  currentLoad: number
}

interface AssignmentRecommendation {
  ticketId: string
  teamId: string
  confidence: number
  reason: string
}

const TaskAssignment: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { tickets, loading: ticketsLoading, updateTicket } = useTickets()
  const { teams, loading: teamsLoading } = useTeams()
  
  const [selectedCounty, setSelectedCounty] = useState<string>('All counties')
  const [selectedStatus, setSelectedStatus] = useState<string>('Unassigned')
  const [autoAssigning, setAutoAssigning] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  // AI-powered automatic assignment algorithm
  const generateAIRecommendations = useMemo((): AssignmentRecommendation[] => {
    if (!tickets || !teams) return []

    const recommendations: AssignmentRecommendation[] = []
    
    // Filter unassigned tickets
    const unassignedTickets = tickets.filter(t => 
      !t.assignedTo && 
      (selectedCounty === 'All counties' || t.county === selectedCounty)
    )

    unassignedTickets.forEach(ticket => {
      // Score each team for this ticket
      const teamScores = teams.map(team => {
        let score = 0
        let reasons: string[] = []

        // 1. Geographic proximity (40% weight)
        if (team.county === ticket.county) {
          score += 40
          reasons.push('Same county')
        } else {
          score += 10
          reasons.push('Different county')
        }

        // 2. Specialization match (30% weight)
        const ticketCategory = ticket.category?.toLowerCase() || ''
        const hasSpecialization = team.specialization?.some(spec => 
          ticketCategory.includes(spec.toLowerCase())
        )
        if (hasSpecialization) {
          score += 30
          reasons.push('Specialization match')
        } else {
          score += 10
          reasons.push('General capability')
        }

        // 3. Team capacity (20% weight)
        const loadPercentage = (team.currentLoad / team.capacity) * 100
        if (loadPercentage < 50) {
          score += 20
          reasons.push('Low workload')
        } else if (loadPercentage < 75) {
          score += 15
          reasons.push('Moderate workload')
        } else if (loadPercentage < 90) {
          score += 10
          reasons.push('High workload')
        } else {
          score += 5
          reasons.push('Near capacity')
        }

        // 4. Priority handling (10% weight)
        const ticketPriority = ticket.priority?.toLowerCase() || 'medium'
        if (ticketPriority === 'high' || ticketPriority === 'urgent') {
          // Prefer teams with lower load for urgent tickets
          if (loadPercentage < 60) {
            score += 10
            reasons.push('Available for urgent')
          } else {
            score += 5
          }
        } else {
          score += 10
        }

        return {
          teamId: team.id,
          teamName: team.name,
          score,
          reasons: reasons.join(', '),
          confidence: Math.min(score, 100)
        }
      })

      // Select best team
      const bestMatch = teamScores.sort((a, b) => b.score - a.score)[0]
      
      if (bestMatch) {
        recommendations.push({
          ticketId: ticket.id!,
          teamId: bestMatch.teamId,
          confidence: bestMatch.confidence,
          reason: bestMatch.reasons
        })
      }
    })

    return recommendations
  }, [tickets, teams, selectedCounty])

  // Filter tickets based on selection
  const filteredTickets = useMemo(() => {
    if (!tickets) return []
    
    return tickets.filter(ticket => {
      const countyMatch = selectedCounty === 'All counties' || ticket.county === selectedCounty
      const statusMatch = 
        selectedStatus === 'All' ||
        (selectedStatus === 'Unassigned' && !ticket.assignedTo) ||
        (selectedStatus === 'Assigned' && ticket.assignedTo)
      
      return countyMatch && statusMatch
    })
  }, [tickets, selectedCounty, selectedStatus])

  // Get recommendation for a ticket
  const getRecommendation = (ticketId: string) => {
    return generateAIRecommendations.find(r => r.ticketId === ticketId)
  }

  // Get team by ID
  const getTeam = (teamId: string) => {
    return teams?.find(t => t.id === teamId)
  }

  // Handle auto-assign all
  const handleAutoAssignAll = async () => {
    setAutoAssigning(true)
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Apply recommendations
      for (const recommendation of generateAIRecommendations) {
        const team = getTeam(recommendation.teamId)
        if (team && updateTicket) {
          await updateTicket(recommendation.ticketId, {
            assignedTo: team.name,
            assignedTeamId: team.id,
            assignedAt: new Date().toISOString(),
            status: 'assigned'
          })
        }
      }
      
      alert(`Successfully assigned ${generateAIRecommendations.length} tickets using AI recommendations!`)
    } catch (error) {
      console.error('Auto-assign error:', error)
      alert('Failed to auto-assign tickets. Please try again.')
    } finally {
      setAutoAssigning(false)
    }
  }

  // Handle manual assignment
  const handleManualAssign = async (ticketId: string, teamId: string) => {
    const team = getTeam(teamId)
    if (team && updateTicket) {
      try {
        await updateTicket(ticketId, {
          assignedTo: team.name,
          assignedTeamId: team.id,
          assignedAt: new Date().toISOString(),
          status: 'assigned'
        })
        alert('Ticket assigned successfully!')
      } catch (error) {
        console.error('Manual assign error:', error)
        alert('Failed to assign ticket. Please try again.')
      }
    }
  }

  const loading = ticketsLoading || teamsLoading

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Assignment</h1>
                <p className="text-sm text-gray-600">Assign tickets to teams automatically or manually</p>
              </div>
            </div>
            
            <button
              onClick={handleAutoAssignAll}
              disabled={autoAssigning || generateAIRecommendations.length === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {autoAssigning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5" />
                  <span>Auto-Assign All ({generateAIRecommendations.length})</span>
                  <Zap className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Unassigned</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {tickets?.filter(t => !t.assignedTo).length || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Assigned</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {tickets?.filter(t => t.assignedTo).length || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Active Teams</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {teams?.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">AI Recommendations</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {generateAIRecommendations.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All counties</option>
              {Array.from(new Set(tickets?.map(t => t.county).filter(Boolean))).map(county => (
                <option key={county}>{county}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Unassigned</option>
              <option>Assigned</option>
            </select>

            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className={`ml-auto px-4 py-2 rounded-lg transition-colors ${
                showRecommendations
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showRecommendations ? 'Hide' : 'Show'} AI Recommendations
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tickets</h2>
            <p className="text-sm text-gray-600">
              {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading tickets...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tickets found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                const recommendation = getRecommendation(ticket.id!)
                const recommendedTeam = recommendation ? getTeam(recommendation.teamId) : null

                return (
                  <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                          {ticket.assignedTo ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Assigned
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                              Unassigned
                            </span>
                          )}
                          {ticket.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{ticket.county}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(ticket.createdAt!).toLocaleDateString()}</span>
                          </span>
                          {ticket.assignedTo && (
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>Assigned to: {ticket.assignedTo}</span>
                            </span>
                          )}
                        </div>

                        {/* AI Recommendation */}
                        {showRecommendations && recommendation && recommendedTeam && !ticket.assignedTo && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Bot className="w-5 h-5 text-purple-600 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-purple-900 mb-1">
                                  AI Recommendation
                                </p>
                                <p className="text-sm text-purple-700 mb-2">
                                  <span className="font-semibold">{recommendedTeam.name}</span>
                                  {' '}- {recommendation.reason}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-white rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                                      style={{ width: `${recommendation.confidence}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium text-purple-900">
                                    {recommendation.confidence}% confidence
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-6">
                        {ticket.assignedTo ? (
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{ticket.assignedTo}</p>
                            <p className="text-xs text-gray-500">Assigned</p>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => e.target.value && handleManualAssign(ticket.id!, e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign to team...</option>
                            {teams?.map(team => (
                              <option key={team.id} value={team.id}>
                                {team.name} ({team.county})
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* AI Information Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How AI Assignment Works</h3>
              <p className="text-sm text-gray-700 mb-3">
                Our intelligent assignment system analyzes multiple factors to recommend the best team for each ticket:
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-purple-600">•</span>
                  <span><strong>Geographic Proximity (40%)</strong> - Teams in the same county get priority</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-purple-600">•</span>
                  <span><strong>Specialization Match (30%)</strong> - Teams with relevant expertise are preferred</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-purple-600">•</span>
                  <span><strong>Team Capacity (20%)</strong> - Distributes workload evenly across teams</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-semibold text-purple-600">•</span>
                  <span><strong>Priority Handling (10%)</strong> - Urgent tickets go to less busy teams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskAssignment
