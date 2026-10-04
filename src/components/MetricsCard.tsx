import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string
  subtitle: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'red' | 'orange' | 'gray'
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  trend = 'neutral',
  trendValue,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    red: 'text-red-400',
    orange: 'text-orange-400',
    gray: 'text-gray-400'
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} className="text-green-400" />
    if (trend === 'down') return <TrendingDown size={16} className="text-red-400" />
    return null
  }

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            {title}
          </h3>
          <div className="mt-2">
            <div className={`text-2xl font-bold ${colorClasses[color]}`}>
              {value}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {subtitle}
            </div>
          </div>
        </div>
        
        {trendValue && (
          <div className="flex items-center space-x-1 ml-2">
            {getTrendIcon()}
            <span className={`text-xs ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard