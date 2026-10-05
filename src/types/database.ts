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
          priority: string
          status: string
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
          priority?: string
          status?: string
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
          priority?: string
          status?: string
          user_id?: string
          assigned_to?: string | null
          location?: string | null
          county?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
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
      [_ in never]: never
    }
  }
}