import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { FilterProvider } from './contexts/FilterContext'
import Login from './components/Login'
import SEMADashboardComplete from './pages/SEMADashboardComplete'
import StandaloneDashboard from './pages/StandaloneDashboard'
import CompleteLandingPage from './pages/CompleteLandingPage'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

// Main App Content Component
const AppContent: React.FC = () => {
  const { profile, isAuthenticated, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [appError, setAppError] = useState<string | null>(null)
  const [forceShowLanding, setForceShowLanding] = useState(true)
  const [useStandalone, setUseStandalone] = useState(false)

  // Error boundary effect
  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('App Error:', error)
      setAppError(error.message)
      setUseStandalone(true) // Fall back to standalone on any error
    }

    window.addEventListener('error', handleError)
    
    // Check if we should use standalone mode (env vars missing or other issues)
    const hasEnvVars = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!hasEnvVars) {
      console.log('Environment variables missing, using standalone dashboard')
      setUseStandalone(true)
    }
    
    // Auto-hide loading after 3 seconds to prevent infinite loading
    const timer = setTimeout(() => {
      setForceShowLanding(false)
    }, 3000)

    return () => {
      window.removeEventListener('error', handleError)
      clearTimeout(timer)
    }
  }, [])

  // If we should use standalone mode, render it
  if (useStandalone) {
    return <StandaloneDashboard />
  }

  // If there's a critical error, show error page with fallback option
  if (appError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Error</h2>
          <p className="text-gray-600 mb-4">There was an error loading the application.</p>
          <div className="space-y-2">
            <button 
              onClick={() => setUseStandalone(true)} 
              className="block w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-2"
            >
              Use Standalone Dashboard
            </button>
            <button 
              onClick={() => {setAppError(null); window.location.reload()}} 
              className="block w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Reload Application
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Always show landing page first or if loading and force flag is true
  if ((loading && forceShowLanding) || (!isAuthenticated && !showLogin)) {
    return (
      <CompleteLandingPage 
        onLoginClick={() => {
          setShowLogin(true)
          setForceShowLanding(false)
        }} 
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading Sema Dashboard...</p>
          <button 
            onClick={() => setUseStandalone(true)}
            className="mt-4 text-sm text-green-600 hover:text-green-700"
          >
            Switch to Standalone Mode
          </button>
        </div>
      </div>
    )
  }

  // Show login page if login requested but not authenticated
  if (!isAuthenticated && showLogin) {
    return <Login onBackClick={() => setShowLogin(false)} />
  }

  // Route based on user role after authentication
  if (profile?.role === 'ADMIN') {
    return (
      <FilterProvider>
        <SEMADashboardComplete />
      </FilterProvider>
    )
  } else {
    return <SEMADashboard />
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App