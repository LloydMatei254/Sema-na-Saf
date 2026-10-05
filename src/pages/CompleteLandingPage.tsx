import React from 'react'
import { ArrowRight, Phone, MessageSquare, TrendingUp, Users, MapPin, Search, Star, Shield, Award, CheckCircle, Zap, BookOpen, BarChart3, Mail, Globe, Clock } from 'lucide-react'

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

const trendingTopics = [
  "5G Network Rollout",
  "Data Bundle Transparency", 
  "Rural Coverage Expansion",
  "Mobile Money Security"
]

const customerReviews = [
  {
    name: "Vincent Yator",
    location: "Barwesa Ward",
    issue: "Network Coverage Issue",
    review: "Calling on Safaricom to improve network coverage in Muchukwo, Barwesa Ward. Residents experience frequent disruptions and poor call quality.",
    priority: "High Priority",
    priorityColor: "orange",
    initials: "VY"
  },
  {
    name: "Esther Wanjiku", 
    location: "Nairobi",
    issue: "Fraud Protection",
    review: "Asked for transaction reversal since morning with no communication. Need better fraud protection and customer response times.",
    priority: "Critical",
    priorityColor: "red",
    initials: "EW"
  },
  {
    name: "Nelson Mitei",
    location: "Eldoret", 
    issue: "Customer Support",
    review: "Safaricom never responded to the network issue I raised earlier. Still experiencing connectivity problems in my area.",
    priority: "Medium",
    priorityColor: "yellow",
    initials: "NM"
  }
]

const footerLinks = {
  services: [
    "Service Reviews",
    "Consumer Research", 
    "Issue Resolution",
    "Consumer Guides",
    "Mobile Network Analysis",
    "Billing Dispute Help"
  ],
  support: [
    "Help Center",
    "Contact Us",
    "Privacy Policy",
    "Terms of Service",
    "Consumer Rights",
    "Report Fraud"
  ],
  resources: [
    "Research Reports",
    "Industry Insights", 
    "Consumer Education",
    "Service Comparisons",
    "Coverage Maps",
    "Price Guides"
  ]
}

interface CompleteLandingPageProps {
  onLoginClick?: () => void
}

const CompleteLandingPage: React.FC<CompleteLandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SEMA</h1>
                <p className="text-xs text-gray-600">Consumer Advocacy Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-green-600 transition-colors">Services</a>
              <a href="#reviews" className="text-gray-600 hover:text-green-600 transition-colors">Reviews</a>
              <a href="#research" className="text-gray-600 hover:text-green-600 transition-colors">Research</a>
              <a href="#insights" className="text-gray-600 hover:text-green-600 transition-colors">Insights</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Sign In
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Research. Review. Resolve.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Make informed decisions about telecommunications services in Kenya. 
              Read authentic reviews, access consumer research, and get expert guidance.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services, reviews, or consumer guides..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-sm text-gray-500 mr-3">Trending:</span>
              {trendingTopics.map((topic, index) => (
                <button
                  key={index}
                  className="text-sm bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg">
                <MessageSquare className="w-5 h-5" />
                <span>Submit Your Report</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>View Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Telecommunications Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare services, read authentic consumer reviews, and make informed decisions 
              about your telecommunications needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1 mb-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(category.avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          {category.avgRating.toFixed(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.reviewCount.toLocaleString()} reviews
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <button className="w-full bg-gray-50 hover:bg-green-600 hover:text-white text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <span>View Reviews</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Reviews from Real Customers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See authentic feedback from Kenyans across the country about telecommunications services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{review.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.issue}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <span className={`inline-block ${
                  review.priorityColor === 'red' ? 'bg-red-100 text-red-800' :
                  review.priorityColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                } text-xs px-2 py-1 rounded-full`}>
                  {review.priority}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="research" className="py-20 bg-white">
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
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Your Concerns</h3>
              <p className="text-gray-600 leading-relaxed">Report network issues, service problems, and provide feedback directly through our streamlined platform.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Resolution</h3>
              <p className="text-gray-600 leading-relaxed">Monitor the progress of your complaints and see real-time updates on resolution status and estimated timelines.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600 leading-relaxed">Join thousands of Kenyans making their voices heard and driving improvements in telecommunications services.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location-Based Reports</h3>
              <p className="text-gray-600 leading-relaxed">Help identify network gaps and service issues across different regions in Kenya for targeted improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="insights" className="py-20 bg-green-600">
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
              <p className="text-green-200 text-sm mt-2">Growing daily</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">85%</div>
              <div className="text-green-100 text-lg">Resolution Rate</div>
              <p className="text-green-200 text-sm mt-2">Average 7 days</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">47</div>
              <div className="text-green-100 text-lg">Counties Covered</div>
              <p className="text-green-200 text-sm mt-2">Nationwide reach</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-green-100 text-lg">Support Available</div>
              <p className="text-green-200 text-sm mt-2">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted Consumer Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your voice matters. We ensure authentic reviews and provide resources to protect consumer rights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                All reviews are verified through our authentication system to ensure authenticity and prevent fraud.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our research team provides in-depth analysis and consumer guidance based on market data and trends.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resolution Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We help consumers resolve disputes and connect with service providers for faster issue resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Informed, Stay Protected
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get the latest consumer insights, service updates, and protection tips delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-80 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-green-200 mb-8">
            Join 25,000+ consumers who trust SEMA for telecommunications insights and protection.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <Mail className="w-8 h-8 text-green-200 mx-auto mb-2" />
              <p className="text-green-100 text-sm">Weekly Reports</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-green-200 mx-auto mb-2" />
              <p className="text-green-100 text-sm">Industry News</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-green-200 mx-auto mb-2" />
              <p className="text-green-100 text-sm">Real-time Alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SEMA</h3>
                  <p className="text-sm text-gray-400">Consumer Advocacy Platform</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Empowering Kenyan consumers with research, reviews, and resources to make informed 
                telecommunications decisions and protect their rights.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SEMA Consumer Advocacy Platform. Protecting consumer rights across Kenya.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CompleteLandingPage