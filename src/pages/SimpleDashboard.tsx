import React, { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import SemaMetrics from '../components/SemaMetrics'
import KenyaMap from '../components/KenyaMap'

const SimpleDashboard: React.FC = () => {
  const [loadedComponents, setLoadedComponents] = useState<string[]>([])

  const loadComponent = (componentName: string) => {
    setLoadedComponents(prev => [...prev, componentName])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sema Dashboard - Component Testing
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => loadComponent('header')}
            className="bg-safaricom-green text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Load Header
          </button>
          <button 
            onClick={() => loadComponent('navigation')}
            className="bg-safaricom-green text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Load Navigation
          </button>
          <button 
            onClick={() => loadComponent('metrics')}
            className="bg-safaricom-green text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Load Metrics
          </button>
          <button 
            onClick={() => loadComponent('map')}
            className="bg-safaricom-green text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Load Map
          </button>
        </div>

        <div className="space-y-8">
          {loadedComponents.includes('header') && (
            <ErrorBoundary>
              <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-4">Header Component</h2>
                <Header onMobileMenuToggle={() => {}} />
              </div>
            </ErrorBoundary>
          )}

          {loadedComponents.includes('navigation') && (
            <ErrorBoundary>
              <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-4">Navigation Component</h2>
                <Navigation 
                  activeTab="dashboard" 
                  setActiveTab={() => {}}
                  isMobileMenuOpen={false}
                  onMobileMenuClose={() => {}}
                />
              </div>
            </ErrorBoundary>
          )}

          {loadedComponents.includes('metrics') && (
            <ErrorBoundary>
              <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-4">Metrics Component</h2>
                <SemaMetrics />
              </div>
            </ErrorBoundary>
          )}

          {loadedComponents.includes('map') && (
            <ErrorBoundary>
              <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-4">Kenya Map Component</h2>
                <KenyaMap />
              </div>
            </ErrorBoundary>
          )}
        </div>

        <div className="mt-8 p-4 bg-white rounded border">
          <h3 className="font-semibold mb-2">Loaded Components:</h3>
          <p>{loadedComponents.length > 0 ? loadedComponents.join(', ') : 'None'}</p>
        </div>
      </div>
    </div>
  )
}

export default SimpleDashboard