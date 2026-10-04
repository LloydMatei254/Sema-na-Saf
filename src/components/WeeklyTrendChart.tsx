import React from 'react'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart
} from 'recharts'
import { useDailyTrends } from '../hooks/useAnalytics'
import LoadingSpinner from './LoadingSpinner'

const WeeklyTrendChart: React.FC = () => {
  const { trends, loading, error } = useDailyTrends()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${
                entry.dataKey === 'resolution_rate' 
                  ? entry.value.toFixed(1) + '%'
                  : entry.value
              }`}
            </p>
          ))}
        </div>
      )
    }
    return null
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

  if (error || !trends || trends.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="text-red-400 mb-2">Error loading trend data</div>
          <div className="text-gray-400 text-sm">{error || 'No data available'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Weekly Performance Trends</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-gray-300">Tickets</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-green-400"></div>
            <span className="text-gray-300">Resolution %</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-orange-400"></div>
            <span className="text-gray-300">Satisfaction</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <ComposedChart data={trends}>
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="left"
              dataKey="total_reports"
              fill="#3b82f6"
              name="Reports"
              opacity={0.8}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="resolution_rate"
              stroke="#4ade80"
              strokeWidth={3}
              name="Resolution Rate"
              dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-blue-400">
            {trends.length > 0 ? Math.round(trends.reduce((sum, item) => sum + item.total_reports, 0) / trends.length) : 0}
          </div>
          <div className="text-xs text-gray-400">Avg Daily Reports</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {trends.length > 0 ? (trends.reduce((sum, item) => sum + item.resolution_rate, 0) / trends.length).toFixed(1) : 0}%
          </div>
          <div className="text-xs text-gray-400">Avg Resolution Rate</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-orange-400">
            4.2/5
          </div>
          <div className="text-xs text-gray-400">Avg Satisfaction</div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyTrendChart