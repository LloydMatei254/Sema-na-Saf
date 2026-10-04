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
import { usePerformanceMetrics, useCountyAnalytics, useCategoryDistribution } from '../hooks/useAnalytics'
import LoadingSpinner from '../components/LoadingSpinner'

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [chartType, setChartType] = useState('trend')

  // Use live data from Supabase
  const { metrics, loading: metricsLoading, error: metricsError } = usePerformanceMetrics()
  const { counties, loading: countiesLoading } = useCountyAnalytics()
  const { categories, loading: categoriesLoading } = useCategoryDistribution()

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ]

  // Format live performance metrics
  const formatResolutionTime = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)}min`
    if (hours < 24) return `${hours.toFixed(1)}h`
    return `${(hours / 24).toFixed(1)}d`
  }

  const getLivePerformanceMetrics = () => {
    if (!metrics) return []

    const resolutionRate = metrics.resolutionRate || 0
    const avgResolutionTime = metrics.avgResolutionTime || 0

    return [
      {
        title: 'Resolution Rate',
        value: `${resolutionRate.toFixed(1)}%`,
        change: resolutionRate > 85 ? `+${(resolutionRate - 85).toFixed(1)}%` : `${(resolutionRate - 85).toFixed(1)}%`,
        trend: (resolutionRate > 85 ? 'up' : 'down') as const,
        icon: Target,
        color: 'green' as keyof typeof colorClasses
      },
      {
        title: 'Avg Response Time',
        value: formatResolutionTime(avgResolutionTime),
        change: avgResolutionTime < 4 ? '-0.3h' : '+0.5h',
        trend: (avgResolutionTime < 4 ? 'down' : 'up') as const,
        icon: Clock,
        color: 'blue' as keyof typeof colorClasses
      },
      {
        title: 'Customer Rating',
        value: '4.2/5',
        change: '+0.2',
        trend: 'up' as const,
        icon: Users,
        color: 'yellow' as keyof typeof colorClasses
      },
      {
        title: 'Total Reports',
        value: metrics.totalReports.toString(),
        change: `+${metrics.reportsToday}`,
        trend: 'up' as const,
        icon: TrendingUp,
        color: 'purple' as keyof typeof colorClasses
      }
    ]
  }

  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  }

  if (metricsError) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 mb-2">Error loading analytics data</div>
          <div className="text-gray-500 text-sm">{metricsError}</div>
        </div>
      </div>
    )
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
        {metricsLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center h-20">
                <LoadingSpinner size="sm" />
              </div>
            </div>
          ))
        ) : (
          getLivePerformanceMetrics().map((metric, index) => {
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
          })
        )}
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
          {countiesLoading ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            <div className="space-y-4">
              {counties.slice(0, 5).map((county, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-safaricom-green text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{county.county}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{county.resolution_rate.toFixed(1)}%</span>
                    <span className="text-sm text-gray-600">({county.total_reports} reports)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Categories</h3>
          {categoriesLoading ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            <div className="space-y-4">
              {categories.slice(0, 5).map((item, index) => {
                const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500']
                const categoryLabels: { [key: string]: string } = {
                  'network': 'Network Issues',
                  'mpesa': 'M-PESA Problems',
                  'app_ux': 'App Issues',
                  'billing': 'Billing Issues',
                  'feature_request': 'Feature Requests',
                  'other': 'Other Issues'
                }
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {categoryLabels[item.category] || item.category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.count} ({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[index] || 'bg-gray-500'} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics