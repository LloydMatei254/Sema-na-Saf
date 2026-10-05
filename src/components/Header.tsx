import React from 'react'
import { Bell, User, Settings, Menu, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-gray-600 hover:text-safaricom-green transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-safaricom-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Sema Admin Dashboard</h1>
              <div className="hidden sm:flex items-center space-x-2 text-xs">
                <span className="text-safaricom-green flex items-center font-medium">
                  <div className="w-2 h-2 bg-safaricom-green rounded-full mr-2 animate-pulse"></div>
                  Live
                </span>
                <span className="text-gray-500">updated {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden sm:block text-sm text-gray-700">
            Welcome, <span className="font-medium">{user?.name}</span>
          </span>
          
          <button className="p-2 text-gray-600 hover:text-safaricom-green transition-colors hover:bg-green-50 rounded-lg">
            <Bell size={20} />
          </button>
          
          <button className="p-2 text-gray-600 hover:text-safaricom-green transition-colors hover:bg-green-50 rounded-lg">
            <Settings size={20} />
          </button>
          
          <button 
            onClick={logout}
            className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-600 transition-colors hover:bg-red-50 rounded-lg"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-safaricom-green rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header