import React, { useState } from 'react'
import { ArrowRight, Phone, MessageSquare, Search, Star, Shield, Award, CheckCircle } from 'lucide-react'

interface NewSimpleLandingPageProps {
  onLoginClick?: () => void
}

const NewSimpleLandingPage: React.FC<NewSimpleLandingPageProps> = ({ onLoginClick }) => {
  const [searchTerm, setSearchTerm] = useState('')

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
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

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
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Sign In
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <button className="text-sm bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-3 py-1 rounded-full transition-colors">
                5G Network Rollout
              </button>
              <button className="text-sm bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-3 py-1 rounded-full transition-colors">
                Data Bundle Transparency
              </button>
              <button className="text-sm bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-3 py-1 rounded-full transition-colors">
                Mobile Money Security
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15K+</div>
              <div className="text-gray-600 text-sm">Consumer Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">47</div>
              <div className="text-gray-600 text-sm">Counties Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600 text-sm">Issue Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600 text-sm">Consumer Support</div>
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
                        {renderStars(category.avgRating)}
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
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                All reviews are verified through our authentication system to ensure authenticity and prevent fraud.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our research team provides in-depth analysis and consumer guidance based on market data and trends.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
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
          
          <p className="text-sm text-green-200">
            Join 25,000+ consumers who trust SEMA for telecommunications insights and protection.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SEMA</h3>
                  <p className="text-sm text-gray-400">Consumer Advocacy Platform</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Empowering Kenyan consumers with research, reviews, and resources to make informed 
                telecommunications decisions and protect their rights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Service Reviews</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consumer Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Issue Resolution</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consumer Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 SEMA Consumer Advocacy Platform. Protecting consumer rights across Kenya.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NewSimpleLandingPage