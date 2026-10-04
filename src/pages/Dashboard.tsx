import React, { useState } from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import FilterBar from '../components/FilterBar'
import MetricsCard from '../components/MetricsCard'
import SemaMetrics from '../components/SemaMetrics'
import PerformanceTable from '../components/PerformanceTable'
import FeedbackSummary from '../components/FeedbackSummary'
import KenyaMap from '../components/KenyaMap'
import HourlyTicketChart from '../components/HourlyTicketChart'
import WeeklyTrendChart from '../components/WeeklyTrendChart'
import CategoryTrendChart from '../components/CategoryTrendChart'
import ResolutionTimeChart from '../components/ResolutionTimeChart'
import TicketManagement from './TicketManagement'
import Officers from './Officers'
import Settings from './Settings'
import Analytics from './Analytics'
import { metricsData } from '../data/metricsData'
import { FilterProvider, useFilter } from '../contexts/FilterContext'

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { selectedCounty, setSelectedCounty } = useFilter()

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCountyClick = (countyId: string) => {
    setSelectedCounty(countyId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMobileMenuToggle={handleMobileMenuToggle} />
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
      />
      <FilterBar />
      
      <main className="container-responsive py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6 fade-in">
              {/* Primary Metrics Cards Section */}
              <div className="grid-responsive-6 gap-3 sm:gap-4">
                {metricsData.map((metric, index) => (
                  <div key={index} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <MetricsCard
                      title={metric.title}
                      value={metric.value}
                      subtitle={metric.subtitle}
                      trend={metric.trend}
                      trendValue={metric.trendValue}
                      color={metric.color}
                    />
                  </div>
                ))}
              </div>

              {/* Sema-Specific Metrics */}
              <div className="slide-up" style={{ animationDelay: '0.6s' }}>
                <SemaMetrics />
              </div>
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Performance Table */}
                <div className="xl:col-span-2 slide-up" style={{ animationDelay: '0.7s' }}>
                  <PerformanceTable />
                </div>
                
                {/* Map and Charts */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="slide-up" style={{ animationDelay: '0.8s' }}>
                    <KenyaMap 
                      onCountyClick={handleCountyClick}
                      selectedCounty={selectedCounty !== 'all' ? selectedCounty : null}
                    />
                  </div>
                  
                  <div className="slide-up" style={{ animationDelay: '0.9s' }}>
                    <HourlyTicketChart />
                  </div>
                  
                  <div className="slide-up" style={{ animationDelay: '1.0s' }}>
                    <FeedbackSummary />
                  </div>
                </div>
              </div>
              
              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6">
                <div className="slide-up" style={{ animationDelay: '1.1s' }}>
                  <WeeklyTrendChart />
                </div>
                <div className="slide-up" style={{ animationDelay: '1.2s' }}>
                  <CategoryTrendChart />
                </div>
                <div className="slide-up" style={{ animationDelay: '1.3s' }}>
                  <ResolutionTimeChart />
                </div>
              </div>
            </div>
          )}
          
          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="fade-in">
              <Analytics />
            </div>
          )}
          
          {/* Officers Management */}
          {activeTab === 'officers' && (
            <div className="fade-in">
              <Officers />
            </div>
          )}
          
          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="fade-in">
              <Settings />
            </div>
          )}
          
          {/* Ticket Management */}
          {activeTab === 'reports' && (
            <div className="fade-in">
              <TicketManagement />
            </div>
          )}
          
          {/* Other tab content */}
          {!['dashboard', 'reports', 'officers', 'analytics', 'settings'].includes(activeTab) && (
            <div className="text-center py-12 fade-in">
              <div className="scale-in">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-safaricom-green rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl text-gray-600 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-gray-500">Content coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <FilterProvider>
      <DashboardContent />
    </FilterProvider>
  )
}

export default Dashboard