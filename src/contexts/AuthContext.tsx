import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  location?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Mock users database
const mockUsers = [
  {
    id: '1',
    email: 'admin@safaricom.co.ke',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  },
  {
    id: '2',
    email: 'admin@sema.co.ke',
    password: 'sema2024',
    name: 'Sema Administrator',
    role: 'admin' as const
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user' as const,
    location: 'Nairobi'
  }
]

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('sema_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('sema_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('sema_user', JSON.stringify(userWithoutPassword))
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sema_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}