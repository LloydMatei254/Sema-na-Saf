import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'
import type { Profile } from '../types/database'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'analyst' | 'operator'
  location?: string
  profile?: Profile
}

class AuthService {
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    return data
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    // Get the user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!profile) return null

    return {
      id: user.id,
      email: user.email!,
      name: profile.full_name,
      role: this.mapRole(profile.role),
      location: profile.phone || undefined,
      profile
    }
  }

  async getSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }

  async updateProfile(updates: Partial<Profile>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    if (error) throw error
  }

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) throw error
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  private mapRole(role: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'): 'admin' | 'user' | 'analyst' | 'operator' {
    switch (role) {
      case 'ADMIN':
        return 'admin'
      case 'ANALYST':
        return 'analyst'
      case 'OPERATOR':
        return 'operator'
      default:
        return 'user'
    }
  }

  // Demo users for development
  async createDemoUsers() {
    const demoUsers = [
      {
        email: 'admin@safaricom.co.ke',
        password: 'admin123',
        fullName: 'Admin User',
        role: 'ADMIN'
      },
      {
        email: 'admin@sema.co.ke',
        password: 'sema2024',
        fullName: 'Sema Administrator',
        role: 'ADMIN'
      },
      {
        email: 'user@example.com',
        password: 'user123',
        fullName: 'John Doe',
        role: 'CUSTOMER'
      }
    ]

    const results = []
    for (const user of demoUsers) {
      try {
        const { data } = await this.signUp(user.email, user.password, user.fullName)
        if (data.user && user.role !== 'CUSTOMER') {
          // Update role for admin users
          await supabase
            .from('profiles')
            .update({ role: user.role as any })
            .eq('user_id', data.user.id)
        }
        results.push({ email: user.email, success: true })
      } catch (error) {
        console.warn(`Demo user ${user.email} might already exist`)
        results.push({ email: user.email, success: false, error })
      }
    }
    return results
  }
}

export const authService = new AuthService()