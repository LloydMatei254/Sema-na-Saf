import React from 'react'
import { Users, MapPin, TrendingUp, Shield, ArrowRight, Phone, Mail } from 'lucide-react'

interface PublicLandingPageProps {
  onLoginClick: () => void
}

const PublicLandingPage: React.FC<PublicLandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-safaricom-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sema</h1>
                <p className="text-sm text-gray-600">Community Feedback Platform</p>
              </div>
            </div>
            
            <button
              onClick={onLoginClick}
              className="bg-safaricom-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Login</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Voice,
            <span className="text-safaricom-green"> Our Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sema is Kenya's premier community feedback platform, connecting citizens with local authorities 
            to address infrastructure gaps and improve service delivery across all 47 counties.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onLoginClick}
              className="bg-safaricom-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>
            
            <a
              href="#learn-more"
              className="border-2 border-safaricom-green text-safaricom-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Empowering Communities Across Kenya
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-safaricom-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Geographic Coverage</h3>
              <p className="text-gray-600">
                Complete coverage across all 47 counties, 290+ districts, and thousands of divisions
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-safaricom-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Direct feedback from citizens to improve infrastructure and public services
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-safaricom-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Analytics</h3>
              <p className="text-gray-600">
                Real-time dashboards and insights for informed decision-making
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-safaricom-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Platform</h3>
              <p className="text-gray-600">
                Secure, reliable platform ensuring data privacy and system integrity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Making an Impact Across Kenya
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-safaricom-green mb-2">47</div>
              <div className="text-xl text-gray-600">Counties Covered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-safaricom-green mb-2">290+</div>
              <div className="text-xl text-gray-600">Districts Monitored</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-safaricom-green mb-2">1,000+</div>
              <div className="text-xl text-gray-600">Communities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How Sema Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Report Issues</h3>
              <p className="text-gray-600">
                Citizens report infrastructure gaps, service delivery issues, and community needs through our platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Administrators monitor reports, track resolution progress, and coordinate with relevant authorities
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-safaricom-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">See Results</h3>
              <p className="text-gray-600">
                Communities see real improvements as issues are resolved and infrastructure gaps are addressed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-safaricom-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans using Sema to improve their communities. 
            Your feedback drives positive change.
          </p>
          
          <button
            onClick={onLoginClick}
            className="bg-white text-safaricom-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Contributing</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-safaricom-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="text-xl font-bold">Sema</h3>
              </div>
              <p className="text-gray-400">
                Connecting communities across Kenya for better infrastructure and public service delivery.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span className="text-gray-400">info@sema.co.ke</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span className="text-gray-400">+254 700 000 000</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={onLoginClick}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Login / Register
                </button>
                <a href="#learn-more" className="block text-gray-400 hover:text-white transition-colors">
                  About Platform
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2024 Sema Platform. Built for Kenya's Digital Transformation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLandingPage