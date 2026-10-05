import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  user_id: string
  full_name: string
  role: string
  phone?: string
  created_at: string
  updated_at: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [dbError, setDbError] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Auth session error:', error)
      }
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          await createProfile(userId)
        } else if (error.message?.includes('relation "profiles" does not exist')) {
          // Database not set up, use fallback
          console.warn('Database not set up, using fallback profile')
          setDbError(true)
          setProfile({
            id: 'fallback',
            user_id: userId,
            full_name: 'User',
            role: 'CUSTOMER',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        } else {
          console.error('Error fetching profile:', error)
          setDbError(true)
        }
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setDbError(true)
      // Create fallback profile
      setProfile({
        id: 'fallback',
        user_id: userId,
        full_name: 'User',
        role: 'CUSTOMER',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const fullName = userData.user?.user_metadata?.full_name || userData.user?.email || 'User'
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          full_name: fullName,
          role: 'CUSTOMER'
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        setDbError(true)
        // Use fallback profile
        setProfile({
          id: 'fallback',
          user_id: userId,
          full_name: fullName,
          role: 'CUSTOMER',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error creating profile:', error)
      setDbError(true)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { user: null, error }
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (error) {
        return { user: null, error }
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      }
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        return { data: null, error: { message: 'No user logged in' } }
      }

      if (dbError) {
        // Update local profile only
        setProfile(prev => prev ? { ...prev, ...updates } : null)
        return { data: { ...profile, ...updates }, error: null }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        return { data: null, error }
      }

      setProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }
  }

  const isAdmin = () => {
    return profile && ['ADMIN', 'OPERATOR', 'ANALYST'].includes(profile.role)
  }

  const refetchProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
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
    refetchProfile,
    dbError
  }
}