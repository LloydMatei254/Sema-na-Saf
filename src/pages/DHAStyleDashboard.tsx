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
  Calendar,
  Filter,
  Download,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  Activity,
  Globe,
  Shield,
  Award,
  Home,
  Building2,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// Mock data matching DHA structure
const mockStats = {
  totalServices: 11643,
  functionalServices: 8949,
  semiFunctionalServices: 1935,
  nonFunctionalServices: 239,
  closedServices: 520,
  serviceProviders: 17499,
  householdsCovered: 11900000
}

const countiesData = [
  { name: 'Laikipia', total: 181, functionalRate: 99, workforce: 45, households: 246235 },
  { name: 'Tharaka-Nithi', total: 129, functionalRate: 98, workforce: 10, households: 65300 },
  { name: 'Busia', total: 233, functionalRate: 98, workforce: 104, households: 225400 },
  { name: 'Nyamira', total: 147, functionalRate: 97, workforce: 363, households: 185900 },
  { name: 'Vihiga', total: 169, functionalRate: 96, workforce: 400, households: 167000 },
  { name: 'Trans Nzoia', total: 237, functionalRate: 95, workforce: 350, households: 421500 },
  { name: 'Lamu', total: 57, functionalRate: 95, workforce: 305, households: 36000 },
  { name: 'Turkana', total: 333, functionalRate: 94, workforce: 608, households: 352200 }
]

const topCounties = [
  { name: 'Nairobi City', count: 886, percentage: 76 },
  { name: 'Kiambu', count: 493, percentage: 4.2 },
  { name: 'Kakanega', count: 436, percentage: 3.7 },
  { name: 'Nakuru', count: 414, percentage: 3.5 },
  { name: 'Meru', count: 370, percentage: 3.2 },
  { name: 'Bungoma', count: 367, percentage: 3.1 }
]

const functionalityDistribution = [
  { status: 'Functional', count: 8949, percentage: 76.9, color: '#2563eb' },
  { status: 'Semi Functional', count: 1935, percentage: 16.6, color: '#f59e0b' },
  { status: 'Non Functional', count: 239, percentage: 2.1, color: '#dc2626' },
  { status: 'Closed', count: 520, percentage: 4.5, color: '#6b7280' }
]

const DHAStyleDashboard: React.FC = () => {
  const { profile, isAdmin } = useAuth()
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Administrator privileges required to access this dashboard.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Matching DHA Style */}
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
                  <p className="text-xs text-gray-500">Government Services</p>
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
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
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
              National Service Overview
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Monitor government service delivery, functional status, workforce coverage and county-level 
              performance across Kenya's 47 counties.
            </p>
          </div>
        </div>
      </div>
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All counties</option>
              {countiesData.map((county) => (
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
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            <span>Active view:</span>
            <span>All counties • All functional statuses</span>
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500">
            Reporting: Latest available
          </button>
        </div>
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Services */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalServices.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+2.6%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>

          {/* Functional Services */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Functional Services</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{mockStats.functionalServices.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+4.4%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>

          {/* Semi-Functional Services */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Semi-Functional Services</p>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{mockStats.semiFunctionalServices.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <ArrowDown className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-medium">-1.5%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>