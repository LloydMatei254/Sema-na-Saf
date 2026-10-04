import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { hourlyTicketData } from '../data/analyticsData'

const HourlyTicketChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}:00`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
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
        <h3 className="text-lg font-semibold text-white">Tickets by hour - today</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-orange-400"></div>
            <span className="text-gray-300">Total Tickets</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-green-400"></div>
            <span className="text-gray-300">Resolved</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <AreaChart data={hourlyTicketData}>
            <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
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
              dataKey="tickets"
              stackId="1"
              stroke="#fb923c"
              fill="#fb923c"
              fillOpacity={0.6}
              name="Total Tickets"
            />
            <Area
              type="monotone"
              dataKey="resolved"
              stackId="2"
              stroke="#4ade80"
              fill="#4ade80"
              fillOpacity={0.4}
              name="Resolved"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-orange-400">
            {hourlyTicketData.reduce((sum, item) => sum + item.tickets, 0)}
          </div>
          <div className="text-xs text-gray-400">Today's Total</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {hourlyTicketData.reduce((sum, item) => sum + item.resolved, 0)}
          </div>
          <div className="text-xs text-gray-400">Resolved Today</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-400">
            {Math.max(...hourlyTicketData.map(item => item.tickets))}
          </div>
          <div className="text-xs text-gray-400">Peak Hour</div>
        </div>
      </div>
    </div>
  )
}

export default HourlyTicketChart