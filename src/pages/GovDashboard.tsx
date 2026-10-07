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
import { useAuth } from '../contexts/AuthContext'
import { useTickets } from '../hooks/useTickets'

// Mock data for government dashboard
const mockStats = {
  totalTickets: 15420,
  resolvedTickets: 13107,
  activeTickets: 2313,
  criticalTickets: 156,
  resolutionRate: 85,
  avgResolutionTime: 4.2,
  countiesActive: 47,
  monthlyGrowth: 12.5
}

const countiesData = [
  { name: 'Nairobi', tickets: 2840, resolved: 2456, rate: 86.5 },
  { name: 'Mombasa', tickets: 1520, resolved: 1298, rate: 85.4 },
  { name: 'Kisumu', tickets: 980, resolved: 834, rate: 85.1 },
  { name: 'Nakuru', tickets: 1200, resolved: 1020, rate: 85.0 },
  { name: 'Eldoret', tickets: 890, resolved: 756, rate: 84.9 },
  { name: 'Machakos', tickets: 750, resolved: 630, rate: 84.0 }
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