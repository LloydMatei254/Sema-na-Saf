import React, { useState } from 'react'
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { kenyaCountiesData, CountyPerformanceData } from '../data/kenyaCountiesData'

interface PerformanceTableProps {
  data?: CountyPerformanceData[]
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ 
  data = kenyaCountiesData 
}) => {
  const [sortField, setSortField] = useState<keyof CountyPerformanceData>('county')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(1)}%`
  }

  const handleSort = (field: keyof CountyPerformanceData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-600" />
      case 'down':
        return <TrendingDown size={16} className="text-red-600" />
      default:
        return <Minus size={16} className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600'
      case 'inactive':
        return 'text-red-600'
      case 'assigned':
        return 'text-blue-600'
      default:
        return 'text-orange-600'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performance by district</h3>
          <p className="text-sm text-gray-600 mt-1">Click icon to drill-down</p>
        </div>
        <div className="text-sm text-gray-600">
          Showing {data.length} counties
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('county')}
                  className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>District</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('totalCitizens')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Citizens</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('registered')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Reports</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('unresolved')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Pending</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('resolved')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Resolved</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('conversionRate')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Success Rate</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('targetAchieved')}
                  className="flex items-center justify-end space-x-1 hover:text-gray-900 transition-colors"
                >
                  <span>Goal</span>
                  <ChevronDown size={14} />
                </button>
              </th>
              <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((county) => (
              <tr 
                key={county.id} 
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 text-sm text-gray-900 font-medium">
                  {county.county}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatNumber(county.totalCitizens)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatNumber(county.registered)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatNumber(county.unresolved)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatNumber(county.resolved)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatPercentage(county.conversionRate)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 text-right">
                  {formatPercentage(county.targetAchieved)}
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`text-xs font-medium ${getStatusColor(county.status)}`}>
                    {county.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  {getTrendIcon(county.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing all {data.length} districts
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Attention Needed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceTable