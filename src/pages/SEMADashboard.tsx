import React, { useState, useEffect } from 'react'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MapPin,
  BarChart3,
  Filter,
  Download,
  Search,
  ArrowUp,
  ArrowDown,
  Building2,
  Home,
  Activity,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { useTickets } from '../hooks/useTickets'

// All 47 Counties in Kenya
const kenyaCounties = [
  'All counties',
  'Baringo',
  'Bomet',
  'Bungoma',
  'Busia',
  'Elgeyo-Marakwet',
  'Embu',
  'Garissa',
  'Homa Bay',
  'Isiolo',
  'Kajiado',
  'Kakamega',
  'Kericho',
  'Kiambu',
  'Kilifi',
  'Kirinyaga',
  'Kisii',
  'Kisumu',
  'Kitui',
  'Kwale',
  'Laikipia',
  'Lamu',
  'Machakos',
  'Makueni',
  'Mandera',
  'Marsabit',
  'Meru',
  'Migori',
  'Mombasa',
  'Murang\'a',
  'Nairobi',
  'Nakuru',
  'Nandi',
  'Narok',
  'Nyamira',
  'Nyandarua',
  'Nyeri',
  'Samburu',
  'Siaya',
  'Taita-Taveta',
  'Tana River',
  'Tharaka-Nithi',
  'Trans Nzoia',
  'Turkana',
  'Uasin Gishu',
  'Vihiga',
  'Wajir',
  'West Pokot'
]

// Functional status options
const functionalStatuses = [
  'All functional statuses',
  'Functional',
  'Semi-Functional',
  'Non-Functional',
  'Closed'
]

const SEMADashboard: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState('All counties')
  const [selectedStatus, setSelectedStatus] = useState('All functional statuses')
  const [showCountyDropdown, setShowCountyDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  
  // Get live tickets data from Supabase
  const { tickets, loading, error, refetch } = useTickets()
  
  // Filter tickets based on selected criteria
  const filteredTickets = tickets?.filter(ticket => {
    const countyMatch = selectedCounty === 'All counties' || ticket.county === selectedCounty
    const statusMatch = selectedStatus === 'All functional statuses' || ticket.status === selectedStatus.toLowerCase()
    return countyMatch && statusMatch
  }) || []

  // Calculate stats from filtered data
  const stats = {
    totalTickets: filteredTickets.length,
    functionalTickets: filteredTickets.filter(t => t.status === 'functional').length,
    semiFunctionalTickets: filteredTickets.filter(t => t.status === 'semi-functional').length,
    nonFunctionalTickets: filteredTickets.filter(t => t.status === 'non-functional').length,
    resolvedTickets: filteredTickets.filter(t => t.status === 'closed').length,
    activeAgents: 17499, // This would come from another table
    citizensCovered: 11900000 // This would be calculated
  }

  // Handler functions for navigation
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    // Navigate back to landing page
    window.location.href = '/'
  }

  // Filter handlers
  const applyFilters = () => {
    // Filters are applied automatically through state changes
    refetch()
  }

  const clearFilters = () => {
    setSelectedCounty('All counties')
    setSelectedStatus('All functional statuses')
    refetch()
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation - Green Theme */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo Section - Clickable */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-green-600">SEMA</h1>
                    <p className="text-xs text-gray-500">Voice Platform</p>
                  </div>
                </button>
              </div>
              
              {/* Navigation Links - Only Dashboard */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={scrollToTop}
                  className="px-3 py-2 text-sm font-medium text-green-600 border-b-2 border-green-600"
                >
                  Dashboard
                </button>
              </div>

              {/* Logout Button */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Green Theme */}
        <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-900 overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-green-200 text-sm mb-6">
              <Home className="w-4 h-4" />
              <span>/</span>
              <span>Dashboard</span>
            </div>
            
            {/* Title Section */}
            <div className="mb-8">
              <div className="bg-green-800 bg-opacity-50 rounded-md px-3 py-1 inline-block mb-4">
                <span className="text-green-200 text-sm font-medium">Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                National SEMA Overview
              </h1>
              <p className="text-xl text-green-100 max-w-3xl">
                Monitor citizen service tickets, functional status, workforce coverage and county-level 
                performance across Kenya's consumer advocacy platform.
              </p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Card Section - Matching provided design */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                {/* County Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowCountyDropdown(!showCountyDropdown)}
                    className="flex items-center justify-between min-w-[160px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <span>{selectedCounty}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {showCountyDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {kenyaCounties.map((county) => (
                        <button
                          key={county}
                          onClick={() => {
                            setSelectedCounty(county)
                            setShowCountyDropdown(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                            selectedCounty === county ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {county}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center justify-between min-w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <span>{selectedStatus}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {functionalStatuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status)
                            setShowStatusDropdown(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                            selectedStatus === status ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={applyFilters}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
                
                <button 
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <span>Clear filters</span>
                </button>
              </div>
            </div>

            {/* Active View and Reporting Status */}
            <div className="flex items-center space-x-6 border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Active view:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Status: {selectedStatus === 'All functional statuses' ? 'All' : selectedStatus}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Reporting:</span> Latest available
              </div>
            </div>
          </div>

          {/* Main Stats Cards - Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Tickets */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-900">{stats.totalTickets.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">+2.6%</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            </div>

            {/* Functional Tickets */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Functional Tickets</p>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-900">{stats.functionalTickets.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">+4.4%</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            </div>

            {/* Semi-Functional Tickets */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Semi-Functional Tickets</p>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-900">{stats.semiFunctionalTickets.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <ArrowDown className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-medium">-1.5%</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-green-600 mt-16 rounded-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center">
                <p className="text-green-100 text-sm">
                  © 2026 SEMA Voice Platform. All rights reserved. | Government of Kenya
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default SEMADashboard