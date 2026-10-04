import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Add debugging for production
console.log('Sema Dashboard starting...')
console.log('Environment:', import.meta.env.MODE)
console.log('Production:', import.meta.env.PROD)
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Has Supabase Key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found!')
  throw new Error('Failed to find the root element')
}

// Check if required environment variables are available
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables!')
  console.error('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
  console.error('VITE_SUPABASE_ANON_KEY present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
}

console.log('Using Full App Component')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)