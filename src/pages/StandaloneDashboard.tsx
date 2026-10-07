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
  Award
} from 'lucide-react'

// This is a standalone dashboard that works without any external dependencies
const StandaloneDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  
  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Mock data
  const stats = {
    totalTickets: 15420,
    activeTickets: 2313,
    resolvedTickets: 13107,
    criticalTickets: 156,
    resolutionRate: 85
  }

  const countiesData = [
    { name: 'Nairobi', tickets: 2840, resolved: 2456, rate: 86.5 },
    { name: 'Mombasa', tickets: 1520, resolved: 1298, rate: 85.4 },
    { name: 'Kisumu', tickets: 980, resolved: 834, rate: 85.1 },
    { name: 'Nakuru', tickets: 1200, resolved: 1020, rate: 85.0 },
    { name: 'Eldoret', tickets: 890, resolved: 756, rate: 84.9 }
  ]

  const activities = [
    { id: 1, message: 'New high priority ticket submitted in Nairobi County', time: '2 mins ago', priority: 'high' },
    { id: 2, message: 'Network issue resolved in Mombasa County', time: '15 mins ago', priority: 'normal' },
    { id: 3, message: 'Ticket assigned to Technical Team', time: '32 mins ago', priority: 'normal' },
    { id: 4, message: 'Critical M-Pesa issue escalated', time: '1 hour ago', priority: 'critical' }
  ]

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SEMA</h1>
                <p className="text-sm text-gray-600">Government Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Government Service <span className="text-green-600">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Modern dashboard to replace nchur.dha.go.ke/dashboard with advanced analytics, 
            real-time monitoring, and comprehensive government service management.
          </p>
          
          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-3xl font-bold text-green-600">{stats.totalTickets.toLocaleString()}</p>
              <p className="text-gray-600">Total Services</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-3xl font-bold text-blue-600">{stats.resolutionRate}%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-3xl font-bold text-purple-600">47</p>
              <p className="text-gray-600">Counties</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-3xl font-bold text-orange-600">24/7</p>
              <p className="text-gray-600">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Enhanced Dashboard Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Analytics</h3>
              <p className="text-gray-600">Advanced analytics with live data visualization, county performance tracking, and trend analysis.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">County Management</h3>
              <p className="text-gray-600">Comprehensive county-level monitoring with performance metrics and resolution tracking.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Government Grade</h3>
              <p className="text-gray-600">Enterprise-level security, role-based access, and professional government interface design.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  // Login Component
  const LoginForm = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-600">Access the government dashboard</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Sign In to Dashboard
            </button>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium"
            >
              Demo Access (No Login Required)
            </button>
          </div>
          
          <button
            onClick={() => setShowLogin(false)}
            className="w-full text-gray-500 hover:text-gray-700"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  )

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">SEMA Dashboard</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-6">
          <div className="space-y-1">
            <a href="#" className="bg-green-50 text-green-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <BarChart3 className="text-green-500 mr-3 h-5 w-5" />
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <FileText className="text-gray-400 mr-3 h-5 w-5" />
              Services
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <Users className="text-gray-400 mr-3 h-5 w-5" />
              Citizens
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <MapPin className="text-gray-400 mr-3 h-5 w-5" />
              Counties
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Government Dashboard</h2>
                <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-lg font-mono font-bold text-gray-900">{formatTime(currentTime)}</p>
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTickets.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+12.5%</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeTickets.toLocaleString()}</p>
                  <p className="text-sm text-yellow-600 mt-1">+3.2%</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-500">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolvedTickets.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+8.7%</p>
                </div>
                <div className="p-3 rounded-full bg-green-500">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.criticalTickets}</p>
                  <p className="text-sm text-red-600 mt-1">-15.3%</p>
                </div>
                <div className="p-3 rounded-full bg-red-500">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* County Performance */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">County Performance</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {countiesData.map((county, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{county.name}</p>
                          <p className="text-sm text-gray-600">{county.tickets} cases</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{county.rate}%</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${county.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.priority === 'critical' ? 'bg-red-100' :
                        activity.priority === 'high' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <Activity className={`w-4 h-4 ${
                          activity.priority === 'critical' ? 'text-red-600' :
                          activity.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )

  // Main render logic
  if (!isLoggedIn && !showLogin) {
    return <LandingPage />
  }

  if (!isLoggedIn && showLogin) {
    return <LoginForm />
  }

  return <Dashboard />
}

export default StandaloneDashboard