import React from 'react'
import { Bell, User, Settings, Menu } from 'lucide-react'

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <h1 className="text-lg sm:text-xl font-semibold text-white">SDICS Dashboard</h1>
          <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm">
            <span className="text-green-400 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live
            </span>
            <span className="text-gray-400">updated 09:34</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden sm:block text-sm text-gray-300">SDICS System Admin</span>
          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded-lg">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded-lg">
            <Settings size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-safaricom-green rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <User size={16} className="text-white" />
            </div>
            <span className="hidden sm:block text-sm text-white">Lg</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header