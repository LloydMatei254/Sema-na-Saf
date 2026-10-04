import React from 'react'
import { X } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobileMenuOpen: boolean
  onMobileMenuClose: () => void
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  onMobileMenuClose 
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'officers', label: 'Officers' },
    { id: 'reports', label: 'Reports' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'locations', label: 'Locations' },
    { id: 'gaps', label: 'Gaps' },
    { id: 'verify', label: 'Verify' },
    { id: 'settings', label: 'Settings' },
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onMobileMenuClose()
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex space-x-6 lg:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onMobileMenuClose} />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={onMobileMenuClose}
                className="p-2 text-gray-600 hover:text-safaricom-green transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`block w-full text-left px-4 py-3 text-gray-600 hover:text-safaricom-green hover:bg-green-50 transition-colors ${
                    activeTab === tab.id ? 'text-safaricom-green bg-green-100 border-r-2 border-safaricom-green font-medium' : ''
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation