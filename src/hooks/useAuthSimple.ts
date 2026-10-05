import { useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Demo authentication for testing
      if (email === 'admin@sema.co.ke' && password === 'admin123') {
        const demoAdmin = {
          id: 'demo-admin-1',
          email: 'admin@sema.co.ke',
          user_metadata: {
            full_name: 'Admin User'
          }
        }
        const demoProfile = {
          id: 'demo-admin-profile',
          user_id: 'demo-admin-1',
          full_name: 'Admin User',
          role: 'ADMIN',
          phone: '+254700000000',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        setUser(demoAdmin)
        setProfile(demoProfile)
        return { user: demoAdmin, error: null }
      }
      
      if (email === 'user@sema.co.ke' && password === 'user123') {
        const demoUser = {
          id: 'demo-user-1',
          email: 'user@sema.co.ke',
          user_metadata: {
            full_name: 'Regular User'
          }
        }
        const demoProfile = {
          id: 'demo-user-profile',
          user_id: 'demo-user-1',
          full_name: 'Regular User',
          role: 'CUSTOMER',
          phone: '+254700000001',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        setUser(demoUser)
        setProfile(demoProfile)
        return { user: demoUser, error: null }
      }
      
      return { user: null, error: { message: 'Invalid credentials' } }
    } catch (error) {
      console.error('Error signing in:', error)
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    return { user: null, error: { message: 'Signup not implemented' } }
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    setSession(null)
  }

  const updateProfile = async (updates: any) => {
    return { data: null, error: { message: 'Update not implemented' } }
  }

  const isAdmin = () => {
    return profile && ['ADMIN', 'OPERATOR', 'ANALYST'].includes(profile.role)
  }

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    login: signIn,
    logout: signOut,
    updateProfile,
    isAdmin,
    refetchProfile: () => {}
  }
}