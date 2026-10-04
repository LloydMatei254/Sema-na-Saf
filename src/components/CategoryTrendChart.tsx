import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { categoryTrendData } from '../data/analyticsData'

const CategoryTrendChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
          <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-600">
            Total: {payload.reduce((sum: number, entry: any) => sum + entry.value, 0)}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Feedback Categories - Weekly Trend</h3>
        <div className="text-sm text-gray-400">
          Total categories: 5
        </div>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={categoryTrendData}>
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="network"
              stackId="1"
              stroke="#dc2626"
              fill="#dc2626"
              fillOpacity={0.8}
              name="Network Issues"
            />
            <Area
              type="monotone"
              dataKey="mpesa"
              stackId="1"
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.8}
              name="M-PESA Issues"
            />
            <Area
              type="monotone"
              dataKey="app"
              stackId="1"
              stroke="#ea580c"
              fill="#ea580c"
              fillOpacity={0.8}
              name="App Bugs"
            />
            <Area
              type="monotone"
              dataKey="billing"
              stackId="1"
              stroke="#7c3aed"
              fill="#7c3aed"
              fillOpacity={0.8}
              name="Billing Issues"
            />
            <Area
              type="monotone"
              dataKey="features"
              stackId="1"
              stroke="#0891b2"
              fill="#0891b2"
              fillOpacity={0.8}
              name="Feature Requests"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span className="text-gray-300">Network Issues</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span className="text-gray-300">M-PESA Issues</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-600 rounded"></div>
          <span className="text-gray-300">App Bugs</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-600 rounded"></div>
          <span className="text-gray-300">Billing Issues</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-600 rounded"></div>
          <span className="text-gray-300">Feature Requests</span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-red-400">
            {categoryTrendData.reduce((sum, item) => sum + item.network, 0)}
          </div>
          <div className="text-xs text-gray-400">Network Issues (Week)</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {categoryTrendData.reduce((sum, item) => sum + item.mpesa, 0)}
          </div>
          <div className="text-xs text-gray-400">M-PESA Issues (Week)</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryTrendChart