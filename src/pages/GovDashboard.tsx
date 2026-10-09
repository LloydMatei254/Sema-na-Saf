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
import { useTickets } from '../hooks/useTickets'

// Mock data for government dashboard - matching DHA structure
const mockStats = {
  totalServices: 15420,
  functionalServices: 13107,
  semiFunctionalServices: 1935,
  nonFunctionalServices: 378,
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
  { name: 'Turkana', total: 333, functionalRate: 94, workforce: 608, households: 352200 },
  { name: 'Nairobi City', total: 886, functionalRate: 76, workforce: 1200, households: 2840000 },
  { name: 'Kiambu', total: 493, functionalRate: 85, workforce: 890, households: 1520000 },
  { name: 'Kakanega', total: 436, functionalRate: 87, workforce: 756, households: 980000 },
  { name: 'Nakuru', total: 414, functionalRate: 85, workforce: 630, households: 1200000 },
  { name: 'Meru', total: 370, functionalRate: 84, workforce: 520, households: 890000 },
  { name: 'Bungoma', total: 367, functionalRate: 82, workforce: 480, households: 750000 }
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

const recentActivities = [
  { id: 1, type: 'ticket', message: 'New high priority ticket submitted in Nairobi County', time: '2 mins ago', priority: 'high' },
  { id: 2, type: 'resolution', message: 'Network issue resolved in Mombasa County', time: '15 mins ago', priority: 'normal' },
  { id: 3, type: 'assignment', message: 'Ticket assigned to Technical Team', time: '32 mins ago', priority: 'normal' },
  { id: 4, type: 'escalation', message: 'Critical M-Pesa issue escalated', time: '1 hour ago', priority: 'critical' },
  { id: 5, type: 'report', message: 'Weekly report generated for Central Region', time: '2 hours ago', priority: 'normal' }
]

const categoryStats = [
  { name: 'Mobile Network', count: 4520, trend: 'up', change: '+8.2%' },
  { name: 'M-Pesa Services', count: 3820, trend: 'up', change: '+12.1%' },
  { name: 'Customer Care', count: 2990, trend: 'down', change: '-3.4%' },
  { name: 'Billing Issues', count: 2450, trend: 'up', change: '+5.7%' },
  { name: 'Internet Services', count: 1640, trend: 'up', change: '+15.3%' }
]

const GovDashboard: React.FC = () => {
  const { user, profile, isAdmin } = useAuth()
  const { tickets, loading } = useTickets()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedCounty, setSelectedCounty] = useState('all')

  // Real-time clock
  const [currentTime, setCurrentTime] = useState(new Date())
  
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

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ml-1 ${trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

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
              Tickets
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <Users className="text-gray-400 mr-3 h-5 w-5" />
              Users
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <MapPin className="text-gray-400 mr-3 h-5 w-5" />
              Counties
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <TrendingUp className="text-gray-400 mr-3 h-5 w-5" />
              Analytics
            </a>
            <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <Settings className="text-gray-400 mr-3 h-5 w-5" />
              Settings
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top Header */}
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
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {profile?.full_name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{profile?.full_name || 'Administrator'}</p>
                  <p className="text-xs text-gray-500">{profile?.role || 'ADMIN'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Counties</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
                <option value="nakuru">Nakuru</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Tickets"
              value={mockStats.totalTickets.toLocaleString()}
              subtitle="All time submissions"
              icon={FileText}
              color="bg-blue-500"
              trend="+12.5%"
            />
            <StatCard
              title="Active Tickets"
              value={mockStats.activeTickets.toLocaleString()}
              subtitle="Pending resolution"
              icon={Clock}
              color="bg-yellow-500"
              trend="+3.2%"
            />
            <StatCard
              title="Resolved Tickets"
              value={mockStats.resolvedTickets.toLocaleString()}
              subtitle={`${mockStats.resolutionRate}% resolution rate`}
              icon={CheckCircle}
              color="bg-green-500"
              trend="+8.7%"
            />
            <StatCard
              title="Critical Issues"
              value={mockStats.criticalTickets}
              subtitle="Requires immediate attention"
              icon={AlertCircle}
              color="bg-red-500"
              trend="-15.3%"
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* County Performance */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">County Performance</h3>
                <p className="text-sm text-gray-600">Resolution rates by county</p>
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
                          <p className="text-sm text-gray-600">{county.tickets} tickets</p>
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
                <p className="text-sm text-gray-600">Latest system events</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
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

          {/* Category Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Issue Categories</h3>
              <p className="text-sm text-gray-600">Breakdown by service type</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {categoryStats.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        category.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{category.count.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 ${category.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="text-sm text-gray-600 ml-1">vs last period</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GovDashboard