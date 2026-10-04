import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SimpleDashboard from './pages/SimpleDashboard'
import TestComponent from './components/TestComponent'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SimpleDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simple" element={<SimpleDashboard />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App