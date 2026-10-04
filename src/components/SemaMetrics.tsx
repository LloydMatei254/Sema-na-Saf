import React from 'react'
import { MessageSquare, CheckCircle, Clock, Users, AlertTriangle, Smartphone } from 'lucide-react'
import { semaMetrics } from '../data/metricsData'

const SemaMetrics: React.FC = () => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Feedback Tickets */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">FEEDBACK TICKETS</h3>
            <div className="text-2xl font-bold text-blue-400 mt-2">
              {formatNumber(semaMetrics.totalTickets)}
            </div>
            <div className="text-xs text-gray-400">total received</div>
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
            <div className="text-xs text-gray-400">tickets closed</div>
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
            <div className="text-xs text-gray-400">average time</div>
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
            <div className="text-xs text-gray-400">user rating</div>
          </div>
          <Users className="text-green-400" size={24} />
        </div>
      </div>

      {/* Network Issues */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">NETWORK ISSUES</h3>
            <div className="text-2xl font-bold text-red-400 mt-2">
              {formatNumber(semaMetrics.networkIssues)}
            </div>
            <div className="text-xs text-gray-400">reported this week</div>
          </div>
          <AlertTriangle className="text-red-400" size={24} />
        </div>
      </div>

      {/* App Bugs */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">APP BUGS</h3>
            <div className="text-2xl font-bold text-orange-400 mt-2">
              {formatNumber(semaMetrics.appBugs)}
            </div>
            <div className="text-xs text-gray-400">reported this week</div>
          </div>
          <Smartphone className="text-orange-400" size={24} />
        </div>
      </div>

      {/* Cost Savings */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">COST SAVINGS</h3>
            <div className="text-2xl font-bold text-safaricom-green mt-2">
              {semaMetrics.costSavings}
            </div>
            <div className="text-xs text-gray-400">daily deflection</div>
          </div>
          <div className="text-safaricom-green text-2xl">₨</div>
        </div>
      </div>

      {/* Churn Prevention */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">CHURN PREVENTED</h3>
            <div className="text-2xl font-bold text-green-400 mt-2">
              {semaMetrics.churnPrevented}%
            </div>
            <div className="text-xs text-gray-400">estimated retention</div>
          </div>
          <Users className="text-green-400" size={24} />
        </div>
      </div>
    </div>
  )
}

export default SemaMetrics