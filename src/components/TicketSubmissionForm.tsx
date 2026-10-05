import React, { useState } from 'react'
import { MessageSquare, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { ticketsService, CreateTicketData } from '../services/tickets.service'
import { useAuth } from '../contexts/AuthContext'

const categories = [
  'Mobile Network',
  'M-Pesa Services', 
  'Customer Care',
  'Billing & Plans',
  'Internet Services',
  'Digital Services'
]

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const counties = [
  'Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Machakos', 'Kajiado',
  'Uasin Gishu', 'Meru', 'Kisumu', 'Murang\'a', 'Nyandarua', 'Nyeri',
  'Kirinyaga', 'Embu', 'Tharaka Nithi', 'Kitui', 'Makueni', 'Nzoia',
  'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisii', 'Homa Bay',
  'Migori', 'Nyamira', 'Narok', 'Bomet', 'Kericho', 'Nandi',
  'Baringo', 'Laikipia', 'Samburu', 'Trans Nzoia', 'West Pokot',
  'Elgeyo Marakwet', 'Turkana', 'Marsabit', 'Isiolo', 'Mwingi',
  'Garissa', 'Wajir', 'Mandera', 'Lamu', 'Tana River', 'Taita Taveta'
]

interface TicketSubmissionFormProps {
  onSubmitSuccess?: () => void
}

const TicketSubmissionForm: React.FC<TicketSubmissionFormProps> = ({ onSubmitSuccess }) => {
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState<CreateTicketData>({
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM',
    location: '',
    county: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated || !user) {
      setError('Please sign in to submit a ticket')
      return
    }

    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: submitError } = await ticketsService.createTicket(formData, user.id)
      
      if (submitError) {
        throw submitError
      }

      setSuccess(true)
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'MEDIUM',
        location: '',
        county: ''
      })
      
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit ticket. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof CreateTicketData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Sign In Required
          </h3>
          <p className="text-gray-600">
            Please sign in to submit a service complaint or feedback.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Submit Service Report</h2>
          <p className="text-sm text-gray-600">Report issues and provide feedback</p>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Ticket submitted successfully! We'll review it and get back to you.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Issue Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Brief description of the issue"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Service Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value as string)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Provide detailed information about the issue, including when it occurred, what you expected, and any error messages..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
              County
            </label>
            <select
              id="county"
              value={formData.county}
              onChange={(e) => handleChange('county', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            >
              <option value="">Select your county</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Specific Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., CBD, Westlands, Karen"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500">
            * Required fields
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:transform-none flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-5 h-5" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TicketSubmissionForm