import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Simple check for valid environment variables
const hasValidEnvVars = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

if (!hasValidEnvVars) {
  console.warn('⚠️  Supabase environment variables not configured, using fallback mode')
}

// Create Supabase client with error handling
let supabaseClient: any

try {
  if (hasValidEnvVars) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  } else {
    // Fallback mock client
    supabaseClient = createMockClient()
  }
} catch (error) {
  console.warn('Failed to create Supabase client, using mock client:', error)
  supabaseClient = createMockClient()
}

function createMockClient() {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      signInWithPassword: () => Promise.resolve({ 
        data: { user: null }, 
        error: { message: 'Demo mode - authentication disabled' } 
      }),
      signUp: () => Promise.resolve({ 
        data: { user: null }, 
        error: { message: 'Demo mode - registration disabled' } 
      }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null })
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      insert: (data: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } })
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } })
          })
        })
      })
    }),
    channel: (name: string) => ({
      on: (event: string, config: any, callback: Function) => ({
        subscribe: () => ({ unsubscribe: () => {} })
      })
    })
  }
}

export const supabase = supabaseClient