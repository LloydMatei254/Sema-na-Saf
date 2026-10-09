import React, { useState } from 'react'
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
  Activity
} from 'lucide-react'

// SEMA-specific data matching DHA structure
const semaStats = {
  totalTickets: 11643,
  functionalTickets: 8949,
  semiFunctionalTickets: 1935,
  nonFunctionalTickets: 239,
  resolvedTickets: 520,
  activeAgents: 17499,
  citizensCovered: 11900000
}

const countiesPerformance = [
  { name: 'Laikipia', total: 181, functionalRate: 99, workforce: 45, households: 246235 },
  { name: 'Tharaka-Nithi', total: 129, functionalRate: 98, workforce: 10, households: 65300 },
  { name: 'Busia', total: 233, functionalRate: 98, workforce: 104, households: 225400 },
  { name: 'Nyamira', total: 147, functionalRate: 97, workforce: 363, households: 185900 },
  { name: 'Vihiga', total: 169, functionalRate: 96, workforce: 400, households: 167000 },
  { name: 'Trans Nzoia', total: 237, functionalRate: 95, workforce: 350, households: 421500 },
  { name: 'Lamu', total: 57, functionalRate: 95, workforce: 305, households: 36000 },
  { name: 'Turkana', total: 333, functionalRate: 94, workforce: 608, households: 352200 }
]

const topCountiesByTickets = [
  { name: 'Nairobi City', count: 886, percentage: 76 },
  { name: 'Kiambu', count: 493, percentage: 4.2 },
  { name: 'Kakanega', count: 436, percentage: 3.7 },
  { name: 'Nakuru', count: 414, percentage: 3.5 },
  { name: 'Meru', count: 370, percentage: 3.2 },
  { name: 'Bungoma', count: 367, percentage: 3.1 }
]

const SEMADashboard: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - DHA Style */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-600">SEMA</h1>
                  <p className="text-xs text-gray-500">Voice Platform</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </button>
              <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                Dashboard
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">About</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">Resources</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">FAQs</button>
            </div>

            {/* Login Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section - Matching DHA Style */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* You can add background image here */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-blue-200 text-sm mb-6">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span>Dashboard</span>
          </div>
          
          {/* Title Section */}
          <div className="mb-8">
            <div className="bg-blue-800 bg-opacity-50 rounded-md px-3 py-1 inline-block mb-4">
              <span className="text-blue-200 text-sm font-medium">Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              National SEMA Overview
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Monitor citizen service tickets, functional status, workforce coverage and county-level 
              performance across Kenya's consumer advocacy platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section - Matching DHA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All counties</option>
              {countiesPerformance.map((county) => (
                <option key={county.name} value={county.name.toLowerCase()}>{county.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All functional statuses</option>
              <option value="functional">Functional</option>
              <option value="semi-functional">Semi-Functional</option>
              <option value="non-functional">Non-Functional</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
            
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Clear filters
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center space-x-6 mb-8 border-b border-gray-200">
          <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            <span className="font-medium">Active view:</span>
            <span>All counties • All functional statuses</span>
          </div>
          <button className="px-3 py-2 text-sm font-medium text-gray-500">
            Reporting: Latest available
          </button>
        </div>
        {/* Main Stats Cards - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Tickets */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{semaStats.totalTickets.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-gray-900">{semaStats.functionalTickets.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-gray-900">{semaStats.semiFunctionalTickets.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <ArrowDown className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-medium">-1.5%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Non-Functional Tickets */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Non-Functional Tickets</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{semaStats.nonFunctionalTickets.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <ArrowDown className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-medium">-0.8%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>

          {/* Service Agents */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Service Agents</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{semaStats.activeAgents.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-gray-500">Live data</span>
            </div>
          </div>

          {/* Citizens Covered */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Citizens Covered</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{(semaStats.citizensCovered / 1000000).toFixed(1)}M</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-gray-500">Live data</span>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ticket Functionality Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Functionality Distribution</h3>
              <p className="text-sm text-gray-600">Functional status from live dashboard statistics.</p>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              {/* Donut Chart Placeholder */}
              <div className="relative w-48 h-48">
                <div className="w-48 h-48 rounded-full border-[24px] border-blue-500 relative">
                  <div className="absolute inset-0 rounded-full border-[24px] border-yellow-500 transform rotate-[140deg]" 
                       style={{ clipPath: 'polygon(50% 50%, 50% 0%, 85% 15%, 50% 50%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[24px] border-red-500 transform rotate-[320deg]" 
                       style={{ clipPath: 'polygon(50% 50%, 50% 0%, 55% 5%, 50% 50%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[24px] border-gray-400 transform rotate-[340deg]" 
                       style={{ clipPath: 'polygon(50% 50%, 50% 0%, 65% 10%, 50% 50%)' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{semaStats.totalTickets.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Tickets</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Functional</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{semaStats.functionalTickets.toLocaleString()} Tickets • 76.9%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Semi Functional</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{semaStats.semiFunctionalTickets.toLocaleString()} Tickets • 16.6%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Non Functional</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{semaStats.nonFunctionalTickets} Tickets • 2.1%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Closed</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{semaStats.resolvedTickets} Tickets • 4.5%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Counties by Established Tickets */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Counties by Established Tickets</h3>
            </div>
            
            <div className="space-y-4">
              {topCountiesByTickets.map((county, index) => (
                <div key={county.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{county.name}</span>
                      <span className="text-sm font-semibold text-gray-900">{county.count}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${county.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{county.percentage}% of national registry</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* County Functionality Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Functionality by County</h3>
              <p className="text-sm text-gray-600">County comparison derived from the currently loaded live ticket rows.</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-blue-600">{semaStats.totalTickets.toLocaleString()} records in view</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {countiesPerformance.map((county, index) => (
              <div key={county.name} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-900 mr-4">
                  {county.name}
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="bg-blue-500 h-6 rounded-full transition-all duration-300" 
                      style={{ width: `${county.functionalRate}%` }}
                    ></div>
                    {county.functionalRate < 95 && (
                      <div 
                        className="bg-yellow-500 h-6 absolute top-0 transition-all duration-300" 
                        style={{ 
                          left: `${county.functionalRate}%`, 
                          width: `${Math.min(10, 100 - county.functionalRate)}%` 
                        }}
                      ></div>
                    )}
                    {county.functionalRate < 90 && (
                      <div 
                        className="bg-red-500 h-6 absolute top-0 transition-all duration-300" 
                        style={{ 
                          left: `${county.functionalRate + 5}%`, 
                          width: `${Math.max(0, 100 - county.functionalRate - 5)}%` 
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm font-semibold text-gray-900">{county.functionalRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Functional</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Semi-Functional</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Non-Functional</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-700">Closed</span>
            </div>
          </div>
        </div>

        {/* SEMA Performance by County */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SEMA Performance by County</h3>
            <p className="text-sm text-gray-600">Interactive county map using live ticket rows grouped by county.</p>
            <p className="text-sm text-gray-600 mt-1">Number of established Citizen Service Tickets in each county.</p>
          </div>
          
          <div className="flex items-center justify-end space-x-2 mb-6">
            <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
              Functional Rate
            </button>
            <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">
              Total Tickets
            </button>
            <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
              Workforce
            </button>
          </div>
          
          {/* Kenya Map Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg flex items-center justify-center relative">
              <div className="w-80 h-80 bg-blue-300 rounded-lg opacity-60 relative">
                <div className="absolute inset-4 bg-blue-400 rounded-lg opacity-70"></div>
                <div className="absolute inset-8 bg-blue-500 rounded-lg opacity-80"></div>
                <div className="absolute inset-12 bg-blue-600 rounded-lg opacity-90"></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-sm text-gray-600">Total Tickets ranges</span>
              </div>
            </div>
            
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <div className="text-center mb-4">
                <h4 className="font-semibold text-gray-900">Laikipia County</h4>
                <p className="text-xs text-gray-600">Last updated: 07 Oct 2026</p>
                <p className="text-xs text-gray-600">11,643 or 11,643 ticket records loaded</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current View</span>
                  <span className="text-sm font-semibold">181</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Tickets</span>
                  <span className="text-sm font-semibold">181</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Functional Rate</span>
                  <span className="text-sm font-semibold">99%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Workforce</span>
                  <span className="text-sm font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Citizens Covered</span>
                  <span className="text-sm font-semibold">246,235</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Share of Registry</span>
                  <span className="text-sm font-semibold">1.6%</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                View County Summary
              </button>
            </div>
          </div>
        </div>
        {/* County Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">County Comparison</h3>
              <p className="text-sm text-gray-600">Comparison of ticket availability, functionality, and coverage.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search counties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">County</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total Tickets</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Functional Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Workforce</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Citizens Covered</th>
                </tr>
              </thead>
              <tbody>
                {countiesPerformance.map((county, index) => (
                  <tr key={county.name} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{county.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{county.total}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${county.functionalRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{county.functionalRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-blue-600">{county.workforce}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{county.households.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing 1 - 8 of 47 counties
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">3</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">4</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">5</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">6</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">›</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">››</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Blue matching DHA */}
      <footer className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-blue-100 text-sm">
              © 2026 SEMA Voice Platform. All rights reserved. | Government of Kenya
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SEMADashboard