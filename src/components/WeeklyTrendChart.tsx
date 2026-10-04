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
import { weeklyTrendData } from '../data/analyticsData'

const WeeklyTrendChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${
                entry.dataKey === 'resolution_rate' || entry.dataKey === 'satisfaction' 
                  ? entry.value.toFixed(1) + (entry.dataKey === 'resolution_rate' ? '%' : '/5')
                  : entry.value
              }`}
            </p>
          ))}
        </div>
      )
    }
    return null
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
          <ComposedChart data={weeklyTrendData}>
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
              dataKey="tickets"
              fill="#3b82f6"
              name="Tickets"
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
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="satisfaction"
              stroke="#fb923c"
              strokeWidth={3}
              name="Satisfaction"
              strokeDasharray="5,5"
              dot={{ fill: '#fb923c', strokeWidth: 2, r: 4 }}
              scale={20} // Scale satisfaction from 0-5 to 0-100 for better visualization
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-blue-400">
            {(weeklyTrendData.reduce((sum, item) => sum + item.tickets, 0) / weeklyTrendData.length).toFixed(0)}
          </div>
          <div className="text-xs text-gray-400">Avg Daily Tickets</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {(weeklyTrendData.reduce((sum, item) => sum + item.resolution_rate, 0) / weeklyTrendData.length).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Avg Resolution Rate</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-orange-400">
            {(weeklyTrendData.reduce((sum, item) => sum + item.satisfaction, 0) / weeklyTrendData.length).toFixed(1)}/5
          </div>
          <div className="text-xs text-gray-400">Avg Satisfaction</div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyTrendChart