import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
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

console.log('Using Full App Component')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)