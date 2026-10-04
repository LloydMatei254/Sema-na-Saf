import React, { useState } from 'react'
import { AlertTriangle, TrendingUp, Clock, Users, MapPin, Target, Search, ChevronRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface GapData {
  id: string
  location: string
  type: 'coverage' | 'capacity' | 'response_time' | 'resources' | 'training'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  impact: number
  estimatedCost: number
  timeline: string
  status: 'identified' | 'planned' | 'in_progress' | 'resolved'
  assignedTo?: string
}

const Gaps: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'coverage' | 'capacity' | 'response_time' | 'resources' | 'training'>('all')
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample gap data
  const gaps: GapData[] = [
    {
      id: '1',
      location: 'Turkana County',
      type: 'coverage',
      severity: 'critical',
      description: 'Remote areas lack adequate service coverage, affecting 45% of population',
      impact: 85,
      estimatedCost: 2500000,
      timeline: '6 months',
      status: 'identified',
    },
    {
      id: '2',
      location: 'Nairobi - Kibera',
      type: 'capacity',
      severity: 'high',
      description: 'Insufficient officers for population density, response times exceeding targets',
      impact: 70,
      estimatedCost: 800000,
      timeline: '3 months',
      status: 'planned',
    },
    {
      id: '3',
      location: 'Mombasa County',
      type: 'response_time',
      severity: 'medium',
      description: 'Average response time 25% above target due to traffic congestion',
      impact: 45,
      estimatedCost: 400000,
      timeline: '4 months',
      status: 'in_progress',
    },
    {
      id: '4',
      location: 'Garissa County',
      type: 'resources',
      severity: 'high',
      description: 'Lack of vehicles and communication equipment limiting effectiveness',
      impact: 75,
      estimatedCost: 1200000,
      timeline: '2 months',
      status: 'identified',
    },
    {
      id: '5',
      location: 'Kisumu County',
      type: 'training',
      severity: 'medium',
      description: 'Officers need training on new digital systems and procedures',
      impact: 40,
      estimatedCost: 150000,
      timeline: '1 month',
      status: 'planned',
    }
  ]

  const filteredGaps = gaps.filter(gap => {
    const matchesSearch = gap.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gap.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || gap.type === filterType
    const matchesSeverity = filterSeverity === 'all' || gap.severity === filterSeverity
    
    return matchesSearch && matchesType && matchesSeverity
  })

  // Chart data
  const severityData = [
    { name: 'Critical', value: gaps.filter(g => g.severity === 'critical').length, color: '#ef4444' },
    { name: 'High', value: gaps.filter(g => g.severity === 'high').length, color: '#f97316' },
    { name: 'Medium', value: gaps.filter(g => g.severity === 'medium').length, color: '#eab308' },
    { name: 'Low', value: gaps.filter(g => g.severity === 'low').length, color: '#22c55e' }
  ]

  const typeData = [
    { type: 'Coverage', count: gaps.filter(g => g.type === 'coverage').length },
    { type: 'Capacity', count: gaps.filter(g => g.type === 'capacity').length },
    { type: 'Response Time', count: gaps.filter(g => g.type === 'response_time').length },
    { type: 'Resources', count: gaps.filter(g => g.type === 'resources').length },
    { type: 'Training', count: gaps.filter(g => g.type === 'training').length }
  ]

  const costData = [
    { month: 'Jan', cost: 1200000 },
    { month: 'Feb', cost: 800000 },
    { month: 'Mar', cost: 1500000 },
    { month: 'Apr', cost: 2200000 },
    { month: 'May', cost: 1800000 },
    { month: 'Jun', cost: 2500000 }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200'
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-200'
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-700 bg-green-100 border-green-200'
      default: return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-700 bg-green-100'
      case 'in_progress': return 'text-blue-700 bg-blue-100'
      case 'planned': return 'text-yellow-700 bg-yellow-100'
      case 'identified': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coverage': return <MapPin size={18} />
      case 'capacity': return <Users size={18} />
      case 'response_time': return <Clock size={18} />
      case 'resources': return <Target size={18} />
      case 'training': return <TrendingUp size={18} />
      default: return <AlertTriangle size={18} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gap Analysis</h1>
          <p className="text-gray-600 mt-1">Identify and address service delivery gaps across all locations</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center space-x-2">
          <Target size={18} />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Gaps</p>
              <p className="text-2xl font-bold text-red-600">{gaps.filter(g => g.severity === 'critical').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="card border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cost (KSh)</p>
              <p className="text-2xl font-bold text-orange-600">
                {(gaps.reduce((sum, g) => sum + g.estimatedCost, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="card border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{gaps.filter(g => g.status === 'in_progress').length}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Impact</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(gaps.reduce((sum, g) => sum + g.impact, 0) / gaps.length)}%
              </p>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gap Types Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gaps by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00A651" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Severity Levels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Costs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => `KSh ${(value / 1000000).toFixed(1)}M`} />
              <Line type="monotone" dataKey="cost" stroke="#00A651" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search gaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
              />
            </div>
            
            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
            >
              <option value="all">All Types</option>
              <option value="coverage">Coverage</option>
              <option value="capacity">Capacity</option>
              <option value="response_time">Response Time</option>
              <option value="resources">Resources</option>
              <option value="training">Training</option>
            </select>
            
            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gaps List */}
      <div className="space-y-4">
        {filteredGaps.map((gap) => (
          <div key={gap.id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full ${getSeverityColor(gap.severity).split(' ')[1]}`}>
                    {getTypeIcon(gap.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{gap.location}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(gap.severity)}`}>
                        {gap.severity.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(gap.status)}`}>
                        {gap.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{gap.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Impact:</span>
                      <span className="ml-2 font-medium">{gap.impact}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost:</span>
                      <span className="ml-2 font-medium">KSh {(gap.estimatedCost / 1000).toLocaleString()}K</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-2 font-medium">{gap.timeline}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium capitalize">{gap.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGaps.length === 0 && (
        <div className="card text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No gaps found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}

export default Gaps