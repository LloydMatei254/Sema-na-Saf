import React from 'react'

const TestComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sema Dashboard Test
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-safaricom-green mb-4">
            Test Component Loaded Successfully!
          </h2>
          <p className="text-gray-700 mb-4">
            If you can see this message, the React app is working correctly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded border-l-4 border-safaricom-green">
              <h3 className="font-semibold text-gray-900">CSS Working</h3>
              <p className="text-sm text-gray-600">Tailwind classes are loading</p>
            </div>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900">JavaScript Working</h3>
              <p className="text-sm text-gray-600">React components rendering</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-900">Data Loading</h3>
              <p className="text-sm text-gray-600">Ready for full dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestComponent