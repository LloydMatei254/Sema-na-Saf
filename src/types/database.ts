export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          role: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          role?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          role?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
          user_id: string
          assigned_to: string | null
          location: string | null
          county: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
          user_id: string
          assigned_to?: string | null
          location?: string | null
          county?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
          user_id?: string
          assigned_to?: string | null
          location?: string | null
          county?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
      }
      analytics: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          metric_type: string
          category: string | null
          county: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          metric_type: string
          category?: string | null
          county?: string | null
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          metric_type?: string
          category?: string | null
          county?: string | null
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ticket_priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
      ticket_status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
      user_role: 'CUSTOMER' | 'ADMIN' | 'OPERATOR' | 'ANALYST'
    }
  }
}