import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import DebugApp from './App.debug.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Add debugging for production
console.log('Sema Dashboard starting...')
console.log('Environment:', import.meta.env.MODE)
console.log('Production:', import.meta.env.PROD)

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found!')
  throw new Error('Failed to find the root element')
}

// Switch between debug and full app
// Change this to false to use the full app
const USE_DEBUG_MODE = false

const AppComponent = USE_DEBUG_MODE ? DebugApp : App

console.log('Using component:', USE_DEBUG_MODE ? 'Debug' : 'Full App')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppComponent />
    </ErrorBoundary>
  </React.StrictMode>,
)