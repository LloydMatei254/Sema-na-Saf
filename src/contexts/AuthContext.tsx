import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth as useSupabaseAuth } from '../hooks/useAuthSupabase'

interface AuthContextType {
  user: any | null
  session: any | null
  profile: any | null
  isAuthenticated: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ user: any, error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ user: any, error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<{ data: any, error: any }>
  isAdmin: () => boolean
  refetchProfile: () => void
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useSupabaseAuth()

  const value = {
    user: auth.user,
    session: auth.session,
    profile: auth.profile,
    isAuthenticated: !!auth.user,
    loading: auth.loading,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    updateProfile: auth.updateProfile,
    isAdmin: auth.isAdmin,
    refetchProfile: auth.refetchProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}