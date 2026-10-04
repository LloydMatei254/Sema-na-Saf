import React from 'react'

// Simple debug component to test deployment
const DebugApp: React.FC = () => {
  const isProduction = import.meta.env.PROD
  const mode = import.meta.env.MODE
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Sema Dashboard
        </h1>
        <div className="space-y-2 text-left">
          <p className="text-gray-600">
            ✅ React app is working correctly!
          </p>
          <p className="text-gray-600">
            ✅ Tailwind CSS is loaded
          </p>
          <p className="text-gray-600">
            ✅ Vite build successful
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded text-sm text-gray-500">
          <div>Environment: {mode}</div>
          <div>Production: {isProduction ? 'Yes' : 'No'}</div>
          <div>Build time: {new Date().toLocaleTimeString()}</div>
        </div>
        
        <button 
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Reload App
        </button>
      </div>
    </div>
  )
}

export default DebugApp