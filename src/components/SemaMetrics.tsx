import React from 'react'
import { MessageSquare, CheckCircle, Clock, Users, AlertTriangle, Wrench } from 'lucide-react'
import { semaMetrics } from '../data/metricsData'

const SemaMetrics: React.FC = () => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Complaints */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">TOTAL COMPLAINTS</h3>
            <div className="text-2xl font-bold text-blue-400 mt-2">
              {formatNumber(semaMetrics.totalComplaints)}
            </div>
            <div className="text-xs text-gray-400">submitted to date</div>
          </div>
          <MessageSquare className="text-blue-400" size={24} />
        </div>
      </div>

      {/* Resolved Today */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">RESOLVED TODAY</h3>
            <div className="text-2xl font-bold text-green-400 mt-2">
              {formatNumber(semaMetrics.resolvedToday)}
            </div>
            <div className="text-xs text-gray-400">issues addressed</div>
          </div>
          <CheckCircle className="text-green-400" size={24} />
        </div>
      </div>

      {/* Average Resolution Time */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">AVG RESOLUTION</h3>
            <div className="text-2xl font-bold text-orange-400 mt-2">
              {semaMetrics.avgResolutionTime}
            </div>
            <div className="text-xs text-gray-400">response time</div>
          </div>
          <Clock className="text-orange-400" size={24} />
        </div>
      </div>

      {/* Customer Satisfaction */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">SATISFACTION</h3>
            <div className="text-2xl font-bold text-green-400 mt-2">
              {semaMetrics.customerSatisfaction}
            </div>
            <div className="text-xs text-gray-400">citizen rating</div>
          </div>
          <Users className="text-green-400" size={24} />
        </div>
      </div>

      {/* Infrastructure Issues */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">INFRASTRUCTURE</h3>
            <div className="text-2xl font-bold text-red-400 mt-2">
              {formatNumber(semaMetrics.infrastructureIssues)}
            </div>
            <div className="text-xs text-gray-400">reported issues</div>
          </div>
          <AlertTriangle className="text-red-400" size={24} />
        </div>
      </div>

      {/* Service Requests */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">SERVICE REQUESTS</h3>
            <div className="text-2xl font-bold text-orange-400 mt-2">
              {formatNumber(semaMetrics.serviceRequests)}
            </div>
            <div className="text-xs text-gray-400">this month</div>
          </div>
          <Wrench className="text-orange-400" size={24} />
        </div>
      </div>

      {/* Cost Savings */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">EFFICIENCY GAIN</h3>
            <div className="text-2xl font-bold text-safaricom-green mt-2">
              {semaMetrics.costSavings}
            </div>
            <div className="text-xs text-gray-400">monthly savings</div>
          </div>
          <div className="text-safaricom-green text-2xl">₨</div>
        </div>
      </div>

      {/* Service Improvement */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">IMPROVEMENT</h3>
            <div className="text-2xl font-bold text-green-400 mt-2">
              {semaMetrics.satisfactionImprovement}%
            </div>
            <div className="text-xs text-gray-400">satisfaction boost</div>
          </div>
          <Users className="text-green-400" size={24} />
        </div>
      </div>
    </div>
  )
}

export default SemaMetrics