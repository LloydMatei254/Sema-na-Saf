import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from 'lucide-react'
import HourlyTicketChart from '../components/HourlyTicketChart'
import WeeklyTrendChart from '../components/WeeklyTrendChart'
import CategoryTrendChart from '../components/CategoryTrendChart'
import ResolutionTimeChart from '../components/ResolutionTimeChart'
import KenyaMap from '../components/KenyaMap'

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [chartType, setChartType] = useState('trend')

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ]

  const performanceMetrics = [
    {
      title: 'Resolution Rate',
      value: '92.7%',
      change: '+5.2%',
      trend: 'up' as const,
      icon: Target,
      color: 'green' as keyof typeof colorClasses
    },
    {
      title: 'Avg Response Time',
      value: '2.1h',
      change: '-0.3h',
      trend: 'down' as const,
      icon: Clock,
      color: 'blue' as keyof typeof colorClasses
    },
    {
      title: 'Customer Rating',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up' as const,
      icon: Users,
      color: 'yellow' as keyof typeof colorClasses
    },
    {
      title: 'Escalation Rate',
      value: '3.2%',
      change: '-1.1%',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'purple' as keyof typeof colorClasses
    }
  ]

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Detailed performance insights and trend analysis</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-safaricom-green focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <button className="btn-primary flex items-center space-x-2">
            <Calendar size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${colorClasses[metric.color]}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Navigation */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">View:</span>
          {[
            { id: 'trend', label: 'Trend Analysis', icon: TrendingUp },
            { id: 'performance', label: 'Performance', icon: BarChart3 },
            { id: 'categories', label: 'Categories', icon: PieChart },
            { id: 'geographic', label: 'Geographic', icon: Activity }
          ].map(option => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={() => setChartType(option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chartType === option.id
                    ? 'bg-safaricom-green text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {chartType === 'trend' && (
          <>
            <div className="xl:col-span-2">
              <WeeklyTrendChart />
            </div>
            <div>
              <HourlyTicketChart />
            </div>
            <div className="xl:col-span-2">
              <CategoryTrendChart />
            </div>
            <div>
              <ResolutionTimeChart />
            </div>
          </>
        )}

        {chartType === 'performance' && (
          <>
            <div className="xl:col-span-2">
              <ResolutionTimeChart />
            </div>
            <div>
              <HourlyTicketChart />
            </div>
            <div className="xl:col-span-3">
              <WeeklyTrendChart />
            </div>
          </>
        )}

        {chartType === 'categories' && (
          <>
            <div className="xl:col-span-3">
              <CategoryTrendChart />
            </div>
            <div className="xl:col-span-2">
              <WeeklyTrendChart />
            </div>
            <div>
              <ResolutionTimeChart />
            </div>
          </>
        )}

        {chartType === 'geographic' && (
          <>
            <div className="xl:col-span-2">
              <KenyaMap />
            </div>
            <div className="space-y-6">
              <HourlyTicketChart />
              <ResolutionTimeChart />
            </div>
            <div className="xl:col-span-3">
              <CategoryTrendChart />
            </div>
          </>
        )}
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Counties</h3>
          <div className="space-y-4">
            {[
              { name: 'Nairobi', score: 96.2, change: 2.1 },
              { name: 'Kiambu', score: 94.8, change: 1.5 },
              { name: 'Mombasa', score: 93.7, change: -0.3 },
              { name: 'Nakuru', score: 91.4, change: 3.2 },
              { name: 'Kisumu', score: 89.6, change: 0.8 }
            ].map((county, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-safaricom-green text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{county.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">{county.score}%</span>
                  <span className={`text-sm ${county.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {county.change >= 0 ? '+' : ''}{county.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Categories</h3>
          <div className="space-y-4">
            {[
              { category: 'Network Issues', count: 5234, percentage: 34.3, color: 'bg-red-500' },
              { category: 'M-PESA Problems', count: 4156, percentage: 27.2, color: 'bg-green-500' },
              { category: 'App Bugs', count: 2847, percentage: 18.7, color: 'bg-blue-500' },
              { category: 'Billing Issues', count: 1618, percentage: 10.6, color: 'bg-yellow-500' },
              { category: 'Feature Requests', count: 1392, percentage: 9.1, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics