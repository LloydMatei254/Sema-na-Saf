import React, { useState, useEffect } from 'react'
import { ArrowRight, Phone, MessageSquare, TrendingUp, Users, MapPin, Clock, ChevronLeft, ChevronRight, Play, Pause, Search, Star, Shield, Award, CheckCircle, AlertTriangle, Filter, Zap, BookOpen, BarChart3 } from 'lucide-react'

// Service categories for consumer issues
const serviceCategories = [
  {
    name: "Mobile Network",
    description: "Coverage, call quality, data speed issues",
    icon: Phone,
    reviewCount: 2847,
    avgRating: 3.2,
    color: "bg-blue-500"
  },
  {
    name: "M-Pesa Services", 
    description: "Transaction failures, delays, fraud reports",
    icon: Shield,
    reviewCount: 1923,
    avgRating: 4.1,
    color: "bg-green-600"
  },
  {
    name: "Customer Care",
    description: "Support response times, resolution quality",
    icon: MessageSquare, 
    reviewCount: 1456,
    avgRating: 2.8,
    color: "bg-purple-500"
  },
  {
    name: "Billing & Plans",
    description: "Charges, plan changes, billing disputes", 
    icon: BarChart3,
    reviewCount: 1234,
    avgRating: 3.5,
    color: "bg-orange-500"
  },
  {
    name: "Internet Services",
    description: "Home fiber, business internet solutions",
    icon: Zap,
    reviewCount: 987,
    avgRating: 3.8,
    color: "bg-indigo-500"
  },
  {
    name: "Digital Services",
    description: "Apps, online platforms, digital products",
    icon: BookOpen,
    reviewCount: 756,
    avgRating: 3.4,
    color: "bg-teal-500"
  }
]

// Featured consumer insights
const consumerInsights = [
  {
    title: "Network Coverage Report 2024",
    excerpt: "Comprehensive analysis of mobile network performance across Kenya's 47 counties",
    author: "SEMA Research Team",
    readTime: "8 min read",
    category: "Research",
    featured: true
  },
  {
    title: "M-Pesa Security: What Consumers Need to Know", 
    excerpt: "Essential tips to protect yourself from mobile money fraud and scams",
    author: "Consumer Protection Desk",
    readTime: "5 min read",
    category: "Safety"
  },
  {
    title: "Rural Connectivity Gaps: A County-by-County Analysis",
    excerpt: "Identifying underserved areas and tracking infrastructure improvements",
    author: "Infrastructure Team",
    readTime: "12 min read", 
    category: "Analysis"
  },
  {
    title: "Customer Service Excellence Awards 2024",
    excerpt: "Recognizing outstanding service delivery and consumer satisfaction",
    author: "Awards Committee",
    readTime: "6 min read",
    category: "Recognition"
  }
]

// Trending consumer topics
const trendingTopics = [
  "5G Network Rollout",
  "Data Bundle Transparency", 
  "Rural Coverage Expansion",
  "Mobile Money Security",
  "Customer Service Standards",
  "Digital Inclusion Initiatives"
]
const customerComplaints = [
  {
    id: 1,
    name: "Vincent Yator",
    role: "Mechanical Plant Technologist", 
    location: "Muchukwo, Barwesa Ward",
    issue: "Network Coverage",
    complaint: "Calling on Safaricom PLC to help improve network coverage in Muchukwo, Barwesa Ward. Residents continue to experience frequent network disruptions, poor call quality, and unreliable mobile data.",
    impact: "Affecting everyday communication, mobile money transactions, and access to essential services for the community.",
    timestamp: "2 days ago",
    category: "Network Issues",
    severity: "High",
    hashtags: ["#Safaricom", "#NetworkCoverage", "#BarwesaWard", "#Muchukwo"]
  },
  {
    id: 2,
    name: "Esther Wanjiku",
    role: "Mechanical Engineering | Education Technology Enthusiast",
    location: "Kenya",
    issue: "Fraudulent Transaction",
    complaint: "I asked for reversal since morning and no communication so far. This person scammed me and here's his number: +254713279744",
    impact: "Financial loss and delayed response to fraudulent activities affecting customer trust.",
    timestamp: "3 days ago",
    category: "Fraud & Security", 
    severity: "Critical",
    hashtags: ["#SafaricomFraud", "#MobileMoney", "#CustomerService"]
  },
  {
    id: 3,
    name: "Nelson Mitei",
    role: "Monitoring, Evaluation, Accountability & Learning",
    location: "Kenya", 
    issue: "Network Response",
    complaint: "Safaricom PLC you never responded on network issue I raised earlier. Still experiencing connectivity problems in my area.",
    impact: "Ongoing network issues without proper customer support response affecting business operations.",
    timestamp: "2 days ago",
    category: "Customer Support",
    severity: "Medium",
    hashtags: ["#SafaricomSupport", "#NetworkIssues", "#CustomerCare"]
  }
]

interface SimpleLandingPageProps {
  onLoginClick?: () => void
}

const SimpleLandingPage: React.FC<SimpleLandingPageProps> = ({ onLoginClick }) => {
  const [currentComplaint, setCurrentComplaint] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setCurrentComplaint((prev) => (prev + 1) % customerComplaints.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [isPlaying])

  const nextComplaint = () => {
    setCurrentComplaint((prev) => (prev + 1) % customerComplaints.length)
  }

  const prevComplaint = () => {
    setCurrentComplaint((prev) => (prev - 1 + customerComplaints.length) % customerComplaints.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      default: return 'bg-gray-500 text-white'
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-safaricom-green rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SEMA</h1>
                <p className="text-xs text-gray-600">Voice of the Customer</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-safaricom-green transition-colors">Features</a>
              <a href="#complaints" className="text-gray-600 hover:text-safaricom-green transition-colors">Real Issues</a>
              <a href="#stats" className="text-gray-600 hover:text-safaricom-green transition-colors">Impact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-gray-600 hover:text-safaricom-green font-medium transition-colors"
              >
                Sign In
              </button>
              <button className="bg-safaricom-green hover:bg-safaricom-green/90 text-white px-6 py-2 rounded-lg font-medium transition-all">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-safaricom-green/10 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Voice Matters,
              <span className="text-safaricom-green"> Kenya Listens</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of Kenyans reporting telecommunications issues, tracking resolutions, 
              and driving improvements in network coverage and customer service across the country.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-safaricom-green hover:bg-safaricom-green/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg">
                <MessageSquare className="w-5 h-5" />
                <span>Submit Your Report</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-safaricom-green text-safaricom-green hover:bg-safaricom-green hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>View Dashboard</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-safaricom-green/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
      </section>
      {/* Real Customer Complaints Gallery */}
      <section id="complaints" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Issues from Real Customers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See actual complaints and feedback from Kenyans across the country. 
              These are real voices that drive meaningful changes in telecommunications services.
            </p>
          </div>

          {/* Complaints Slider */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Slider Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={prevComplaint}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextComplaint}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Complaint Content */}
            <div className="p-8 md:p-12 min-h-[500px] flex items-center">
              <div className="w-full">
                <div className="flex items-start space-x-6">
                  {/* Profile Section */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-safaricom-green rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {customerComplaints[currentComplaint].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {customerComplaints[currentComplaint].name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(customerComplaints[currentComplaint].severity)}`}>
                        {customerComplaints[currentComplaint].severity}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {customerComplaints[currentComplaint].category}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2 text-lg">
                      {customerComplaints[currentComplaint].role}
                    </p>
                    
                    <div className="flex items-center text-gray-500 mb-6 space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{customerComplaints[currentComplaint].location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{customerComplaints[currentComplaint].timestamp}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Issue Report:</h4>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        "{customerComplaints[currentComplaint].complaint}"
                      </p>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="text-gray-600 font-medium">Impact:</p>
                        <p className="text-gray-700">
                          {customerComplaints[currentComplaint].impact}
                        </p>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2">
                      {customerComplaints[currentComplaint].hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-safaricom-green font-medium text-sm hover:bg-safaricom-green/10 px-2 py-1 rounded transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 pb-6">
              {customerComplaints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentComplaint(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentComplaint 
                      ? 'bg-safaricom-green scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Have a similar experience? Your voice can make a difference.
            </p>
            <button className="bg-safaricom-green hover:bg-safaricom-green/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Empowering Your Voice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides the tools you need to report issues, track progress, 
              and drive meaningful improvements in telecommunications services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-safaricom-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-safaricom-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Your Concerns</h3>
              <p className="text-gray-600 leading-relaxed">Report network issues, service problems, and provide feedback directly to Safaricom through our streamlined platform.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-safaricom-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-safaricom-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Resolution</h3>
              <p className="text-gray-600 leading-relaxed">Monitor the progress of your complaints and see real-time updates on resolution status and estimated timelines.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-safaricom-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-safaricom-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600 leading-relaxed">Join thousands of Kenyans making their voices heard and driving improvements in telecommunications services.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-safaricom-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-safaricom-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location-Based Reports</h3>
              <p className="text-gray-600 leading-relaxed">Help identify network gaps and service issues across different regions in Kenya for targeted improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-safaricom-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Making Real Impact
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              See how the SEMA platform is driving positive changes in Kenya's telecommunications landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10,000+</div>
              <div className="text-green-100 text-lg">Reports Submitted</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">85%</div>
              <div className="text-green-100 text-lg">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">47</div>
              <div className="text-green-100 text-lg">Counties Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-green-100 text-lg">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SimpleLandingPage