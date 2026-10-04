import React from 'react'
import { Wifi, Smartphone, CreditCard, Lightbulb, DollarSign } from 'lucide-react'
import { feedbackCategories } from '../data/kenyaCountiesData'

const FeedbackSummary: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network':
        return <Wifi className="text-red-400" size={20} />
      case 'app':
        return <Smartphone className="text-orange-400" size={20} />
      case 'mpesa':
        return <CreditCard className="text-green-400" size={20} />
      case 'features':
        return <Lightbulb className="text-blue-400" size={20} />
      case 'billing':
        return <DollarSign className="text-yellow-400" size={20} />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-orange-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-4">Feedback Categories</h3>
      <div className="space-y-4">
        {Object.entries(feedbackCategories).map(([key, category]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(key)}
              <div>
                <div className="text-sm font-medium text-white">{category.name}</div>
                <div className="text-xs text-gray-400">
                  Avg resolution: {category.avgResolutionTime}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                {category.count.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                {category.percentage}%
              </div>
              <div className={`text-xs font-medium ${getPriorityColor(category.priority)}`}>
                {category.priority.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          Total feedback tickets processed: {Object.values(feedbackCategories).reduce((sum, cat) => sum + cat.count, 0).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default FeedbackSummary