import React, { useState } from 'react'
import { MessageSquare, Phone, MapPin, User, Mail, Send, CheckCircle, LogOut, AlertTriangle, FileText, Users, BarChart3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCreateReport, useMyReports } from '../hooks/useReports'

interface ComplaintData {
  name: string
  email: string
  location: string
  issueType: string
  description: string
}

const UserLandingPage: React.FC = () => {
  const { user, logout } = useAuth()
  const { createReport, loading: submitting } = useCreateReport()
  const { reports: myReports } = useMyReports()
  
  const [showComplaintForm, setShowComplaintForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedTicket, setSubmittedTicket] = useState<string>('')

  const [complaint, setComplaint] = useState<ComplaintData>({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    issueType: '',
    description: ''
  })

  const issueTypes = [
    'Network Issues',
    'M-PESA Problems', 
    'Billing Issues',
    'App Problems',
    'Service Quality',
    'Feature Request',
    'Emergency Services',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Simulate getting location
      let latitude: number | undefined
      let longitude: number | undefined
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
          })
          latitude = position.coords.latitude
          longitude = position.coords.longitude
        } catch (error) {
          console.log('Location access denied or unavailable')
        }
      }

      // Simulate telemetry data
      const telemetry = {
        networkType: '4G',
        signalStrength: -75 + Math.floor(Math.random() * 40), // -75 to -35 dBm
        latencyMs: 50 + Math.floor(Math.random() * 200), // 50-250ms
        deviceModel: navigator.userAgent.includes('iPhone') ? 'iPhone' : 
                    navigator.userAgent.includes('Samsung') ? 'Samsung Galaxy' : 
                    'Android Device',
        osVersion: navigator.userAgent.includes('iPhone') ? 'iOS 17' : 'Android 14',
        appScreen: 'complaint-form'
      }

      const report = await createReport({
        description: complaint.description,
        inputType: 'TEXT',
        locationName: complaint.location,
        latitude,
        longitude,
        telemetry: {
          network_type: '4G',
          signal_strength: -75 + Math.floor(Math.random() * 40),
          latency_ms: 50 + Math.floor(Math.random() * 200),
          device_model: navigator.userAgent.includes('iPhone') ? 'iPhone' : 
                       navigator.userAgent.includes('Samsung') ? 'Samsung Galaxy' : 
                       'Android Device',
          os_version: navigator.userAgent.includes('iPhone') ? 'iOS 17' : 'Android 14',
          app_screen: 'complaint-form'
        }
      })

      setSubmittedTicket(report.ticket_number)
      setSubmitted(true)

      // Reset after showing success
      setTimeout(() => {
        handleClose()
      }, 3000)

    } catch (error) {
      console.error('Failed to submit complaint:', error)
      alert('Failed to submit complaint. Please try again.')
    }
  }

  const handleClose = () => {
    setShowComplaintForm(false)
    setSubmitted(false)
    setSubmittedTicket('')
    setComplaint({
      name: user?.name || '',
      email: user?.email || '',
      location: user?.location || '',
      issueType: '',
      description: ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-safaricom-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sema Voice</h1>
                <p className="text-xs text-gray-500">Speak Up, Be Heard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-safaricom-green transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Voice Matters
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sema Voice is your platform to express concerns, report issues, and contribute to better service delivery across Kenya. Every complaint helps improve our community.
          </p>
          
          <button
            onClick={() => setShowComplaintForm(true)}
            className="bg-safaricom-green text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <MessageSquare size={24} />
            <span>Submit Your Complaint</span>
          </button>
        </div>

        {/* My Reports Section */}
        {myReports && myReports.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Recent Reports</h2>
            <div className="space-y-3">
              {myReports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{report.ticket_number}</p>
                    <p className="text-sm text-gray-600 truncate max-w-md">{report.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                      report.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      report.status === 'ASSIGNED' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'ANALYZING' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15,847</h3>
            <p className="text-gray-600">Citizens Registered</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
            <p className="text-gray-600">Issues Resolved</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">4.2/5.0</h3>
            <p className="text-gray-600">Satisfaction Rating</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Your Issue</h3>
              <p className="text-gray-600">Click the button above to submit your complaint with detailed information about your issue.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">We Review & Assign</h3>
              <p className="text-gray-600">Our team reviews your complaint and assigns it to the appropriate department for resolution.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Updates</h3>
              <p className="text-gray-600">Receive updates on your complaint status and resolution through email or SMS.</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Need Immediate Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-safaricom-green" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emergency Hotline</h3>
                <p className="text-gray-600">Call 999 for urgent matters</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Support</h3>
                <p className="text-gray-600">support@sema.co.ke</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Complaint Form Modal */}
      {showComplaintForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Submit Your Complaint</h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={complaint.name}
                        onChange={(e) => setComplaint({...complaint, name: e.target.value})}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={complaint.email}
                        onChange={(e) => setComplaint({...complaint, email: e.target.value})}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={complaint.location}
                        onChange={(e) => setComplaint({...complaint, location: e.target.value})}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
                        placeholder="e.g., Nairobi, Kiambu, Mombasa"
                      />
                    </div>
                  </div>

                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Issue *
                    </label>
                    <div className="relative">
                      <AlertTriangle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        required
                        value={complaint.issueType}
                        onChange={(e) => setComplaint({...complaint, issueType: e.target.value})}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
                      >
                        <option value="">Select issue type</option>
                        {issueTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={complaint.description}
                      onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green"
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-safaricom-green text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your feedback. Your report <strong>{submittedTicket}</strong> has been received and is being processed by our AI system.
                </p>
                <p className="text-sm text-gray-500">
                  You will receive updates via email and notifications. This window will close automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserLandingPage