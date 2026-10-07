import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { FilterProvider } from './contexts/FilterContext'
import Login from './components/Login'
import GovDashboard from './pages/GovDashboard'
import CompleteLandingPage from './pages/CompleteLandingPage'
import './App.css'

// Main App Content Component
const AppContent: React.FC = () => {
  const { profile, isAuthenticated, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading Sema Dashboard...</p>
        </div>
      </div>
    )
  }

  // Show public landing page if not authenticated and login not requested
  if (!isAuthenticated && !showLogin) {
    return <CompleteLandingPage onLoginClick={() => setShowLogin(true)} />
  }

  // Show login page if login requested but not authenticated
  if (!isAuthenticated && showLogin) {
    return <Login onBackClick={() => setShowLogin(false)} />
  }

  // Route based on user role after authentication
  if (profile?.role === 'ADMIN') {
    return (
      <FilterProvider>
        <GovDashboard />
      </FilterProvider>
    )
  } else {
    return <GovDashboard />
  }
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App