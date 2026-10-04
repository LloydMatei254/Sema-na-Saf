import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import DebugApp from './App.debug.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Add debugging for production
if (import.meta.env.PROD) {
  console.log('Production build loaded')
  console.log('Environment:', import.meta.env)
}

const root = document.getElementById('root')
if (!root) {
  throw new Error('Failed to find the root element')
}

// Use debug app in production for testing, regular app in development
const AppComponent = import.meta.env.PROD ? DebugApp : App

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppComponent />
    </ErrorBoundary>
  </React.StrictMode>,
)