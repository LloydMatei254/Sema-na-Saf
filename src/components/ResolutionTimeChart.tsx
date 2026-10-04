import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { resolutionTimeData } from '../data/analyticsData'

const ResolutionTimeChart: React.FC = () => {
  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#f97316', '#ef4444', '#dc2626']

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-blue-400 text-sm">Count: {data.count.toLocaleString()}</p>
          <p className="text-green-400 text-sm">Percentage: {data.percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Resolution Time Distribution</h3>
        <div className="text-sm text-gray-400">
          Target: &lt;2 hours (60%)
        </div>
      </div>

      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={resolutionTimeData} layout="horizontal">
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              type="number"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              type="category"
              dataKey="timeRange"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Tickets">
              {resolutionTimeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance indicators */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-400">
              {(resolutionTimeData.slice(0, 2).reduce((sum, item) => sum + item.percentage, 0)).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Resolved &lt;2 hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-400">
              {(resolutionTimeData.slice(2, 4).reduce((sum, item) => sum + item.percentage, 0)).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Resolved 2-8 hours</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          <span className="text-red-400 font-medium">
            {(resolutionTimeData.slice(4).reduce((sum, item) => sum + item.percentage, 0)).toFixed(1)}%
          </span> require &gt;8 hours (needs attention)
        </div>
      </div>
    </div>
  )
}

export default ResolutionTimeChart