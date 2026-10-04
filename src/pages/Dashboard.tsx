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
import Locations from './Locations'
import Gaps from './Gaps'
import { FilterProvider, useFilter } from '../contexts/FilterContext'
import { usePerformanceMetrics } from '../hooks/useAnalytics'
import LoadingSpinner from '../components/LoadingSpinner'

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { selectedCounty, setSelectedCounty } = useFilter()
  
  // Use live data from Supabase
  const { metrics, loading: metricsLoading, error: metricsError } = usePerformanceMetrics()

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCountyClick = (countyId: string) => {
    setSelectedCounty(countyId)
  }

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Format time in hours to readable format
  const formatResolutionTime = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)}min`
    if (hours < 24) return `${hours.toFixed(1)}hrs`
    return `${(hours / 24).toFixed(1)}days`
  }

  // Generate live metrics data based on Supabase data
  const getLiveMetricsData = () => {
    if (!metrics) return []

    const population = 54000000 // Kenya population estimate
    const resolutionRate = metrics.resolutionRate || 0
    
    return [
      {
        title: 'TOTAL POPULATION',
        value: '54.0M',
        subtitle: 'citizens across Kenya',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+2.3%'
      },
      {
        title: 'ACTIVE COMPLAINTS',
        value: formatNumber(metrics.openReports || 0),
        subtitle: 'pending resolution',
        color: metrics.openReports > 100 ? 'red' as const : 'orange' as const,
        trend: 'neutral' as const,
        trendValue: undefined
      },
      {
        title: 'REPORTS SUBMITTED',
        value: formatNumber(metrics.reportsToday || 0),
        subtitle: 'received today',
        color: 'gray' as const,
        trend: metrics.reportsToday > 10 ? 'up' as const : 'down' as const,
        trendValue: metrics.reportsToday > 0 ? `+${metrics.reportsToday}` : '0'
      },
      {
        title: 'RESOLUTION RATE',
        value: `${resolutionRate.toFixed(1)}%`,
        subtitle: 'this month',
        color: resolutionRate > 80 ? 'green' as const : resolutionRate > 60 ? 'orange' as const : 'red' as const,
        trend: resolutionRate > 80 ? 'up' as const : 'down' as const,
        trendValue: resolutionRate > 0 ? `${resolutionRate > 80 ? '+' : ''}${(resolutionRate - 75).toFixed(1)}%` : '0%'
      },
      {
        title: 'SERVICE QUALITY',
        value: '4.2',
        subtitle: 'average rating',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: '+0.3'
      },
      {
        title: 'RESOLVED REPORTS',
        value: formatNumber(metrics.resolvedReports || 0),
        subtitle: 'completed total',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: `+${formatNumber(metrics.resolvedReports || 0)}`
      }
    ]
  }

  if (metricsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading dashboard data</div>
          <div className="text-gray-500 text-sm">{metricsError}</div>
        </div>
      </div>
    )
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
              {metricsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {/* Primary Metrics Cards Section */}
                  <div className="grid-responsive-6 gap-3 sm:gap-4">
                    {getLiveMetricsData().map((metric, index) => (
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
                </>
              )}
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
          
          {/* Locations Management */}
          {activeTab === 'locations' && (
            <div className="fade-in">
              <Locations />
            </div>
          )}
          
          {/* Gap Analysis */}
          {activeTab === 'gaps' && (
            <div className="fade-in">
              <Gaps />
            </div>
          )}
          
          {/* Verify Section */}
          {activeTab === 'verify' && (
            <div className="fade-in">
              <div className="text-center py-12">
                <div className="scale-in">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-safaricom-green rounded-full animate-spin"></div>
                  </div>
                  <h2 className="text-xl text-gray-600 mb-2">Verify</h2>
                  <p className="text-gray-500">Verification system coming soon...</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tab content */}
          {!['dashboard', 'reports', 'officers', 'analytics', 'settings', 'locations', 'gaps', 'verify'].includes(activeTab) && (
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