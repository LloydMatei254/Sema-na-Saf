import React from 'react'
import { Phone, MessageSquare, TrendingUp, Search, ArrowRight } from 'lucide-react'

interface TestSimpleLandingPageProps {
  onLoginClick?: () => void
}

const TestSimpleLandingPage: React.FC<TestSimpleLandingPageProps> = ({ onLoginClick }) => {
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
                <p className="text-xs text-gray-600">Voice of the Customer</p>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Your Concerns</h3>
              <p className="text-gray-600 leading-relaxed">Report network issues, service problems, and provide feedback directly through our platform.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Resolution</h3>
              <p className="text-gray-600 leading-relaxed">Monitor the progress of your complaints and see real-time updates on resolution status.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600 leading-relaxed">Join thousands of Kenyans making their voices heard and driving improvements.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location-Based Reports</h3>
              <p className="text-gray-600 leading-relaxed">Help identify network gaps and service issues across different regions in Kenya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
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
              <p className="text-gray-300 leading-relaxed mb-6">
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

export default TestSimpleLandingPage