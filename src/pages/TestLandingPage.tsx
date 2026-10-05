import React from 'react'

interface TestLandingPageProps {
  onLoginClick?: () => void
}

const TestLandingPage: React.FC<TestLandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          SEMA Test Page
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          This is a test page to check if the app loads correctly.
        </p>
        <div className="space-y-4">
          <button
            onClick={onLoginClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Submit Review
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          If you can see this, the app is working.
        </div>
      </div>
    </div>
  )
}

export default TestLandingPage