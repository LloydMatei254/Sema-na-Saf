import React from 'react'
import { RefreshCw } from 'lucide-react'

const FilterBar: React.FC = () => {
  return (
    <div className="bg-gray-850 px-4 sm:px-6 py-4 border-b border-gray-700">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span className="text-red-400 font-semibold">NATIONALS</span>
            <span className="hidden sm:inline">- 44 counties</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
            <select className="bg-gray-700 border border-gray-600 rounded px-2 sm:px-3 py-1 sm:py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500">
              <option>All counties</option>
            </select>
            
            <select className="bg-gray-700 border border-gray-600 rounded px-2 sm:px-3 py-1 sm:py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500">
              <option>All districts</option>
            </select>
            
            <select className="bg-gray-700 border border-gray-600 rounded px-2 sm:px-3 py-1 sm:py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500">
              <option>Pick a district</option>
            </select>
            
            <select className="bg-gray-700 border border-gray-600 rounded px-2 sm:px-3 py-1 sm:py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500">
              <option>Pick a division</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <button className="btn-primary text-xs sm:text-sm px-3 py-1">
              Save
            </button>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-300 overflow-x-auto">
              <span className="whitespace-nowrap">This week</span>
              <span className="hidden sm:inline whitespace-nowrap">Last 7 days</span>
              <span className="hidden md:inline whitespace-nowrap">Last 30 days</span>
              <span className="hidden lg:inline whitespace-nowrap">Since 30 days</span>
            </div>
            <button className="p-1 sm:p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded">
              <RefreshCw size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar