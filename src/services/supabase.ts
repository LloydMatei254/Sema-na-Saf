import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kysiymdpsvluylpnjtab.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5c2l5bWRwc3ZsdXlscG5qdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzM0NDAsImV4cCI6MjEwNjY0OTQ0MH0.3mly_bx7lEwfftgpsV_Ztc3yMhjWA6JuTjr0MVDDUWE'

console.log('Supabase Environment Check:', {
  url: supabaseUrl,
  keyPresent: !!supabaseAnonKey,
  environment: import.meta.env.MODE
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  console.error('URL:', supabaseUrl)
  console.error('Key:', supabaseAnonKey ? 'Present' : 'Missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string | null
          role: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone?: string | null
          role?: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone?: string | null
          role?: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          ticket_number: string
          user_id: string
          category: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory: string | null
          description: string
          input_type: 'TEXT' | 'VOICE'
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name: string | null
          latitude: number | null
          longitude: number | null
          network_type: string | null
          assigned_team_id: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          ticket_number?: string
          user_id: string
          category?: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string | null
          description: string
          input_type?: 'TEXT' | 'VOICE'
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name?: string | null
          latitude?: number | null
          longitude?: number | null
          network_type?: string | null
          assigned_team_id?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          ticket_number?: string
          user_id?: string
          category?: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string | null
          description?: string
          input_type?: 'TEXT' | 'VOICE'
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name?: string | null
          latitude?: number | null
          longitude?: number | null
          network_type?: string | null
          assigned_team_id?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string
          department: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          department: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          department?: string
          created_at?: string
        }
      }
      ai_analysis: {
        Row: {
          id: string
          report_id: string
          category: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory: string | null
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          confidence: number
          sentiment: string | null
          summary: string
          recommended_action: string
          assigned_team_id: string | null
          model: string
          raw_response: any
          created_at: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          report_id: string | null
          title: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
      }
    }
    Views: {
      dashboard_summary: {
        Row: {
          total_reports: number
          open_reports: number
          critical_reports: number
          resolved_reports: number
          avg_resolution_time: number
        }
      }
      reports_with_analysis: {
        Row: {
          id: string
          ticket_number: string
          user_name: string | null
          user_email: string | null
          category: string
          subcategory: string | null
          description: string
          severity: string
          status: string
          location_name: string | null
          assigned_team: string | null
          ai_confidence: number | null
          ai_summary: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
        }
      }
    }
  }
}