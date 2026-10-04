export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone?: string
          role: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone?: string
          role?: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone?: string
          role?: 'CUSTOMER' | 'ADMIN' | 'ANALYST' | 'OPERATOR'
          avatar_url?: string
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
          subcategory?: string
          description: string
          input_type: 'TEXT' | 'VOICE'
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name?: string
          latitude?: number
          longitude?: number
          network_type?: string
          assigned_team_id?: string
          created_at: string
          updated_at: string
          resolved_at?: string
        }
        Insert: {
          id?: string
          ticket_number?: string
          user_id: string
          category?: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string
          description: string
          input_type: 'TEXT' | 'VOICE'
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name?: string
          latitude?: number
          longitude?: number
          network_type?: string
          assigned_team_id?: string
          created_at?: string
          updated_at?: string
          resolved_at?: string
        }
        Update: {
          id?: string
          ticket_number?: string
          user_id?: string
          category?: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string
          description?: string
          input_type?: 'TEXT' | 'VOICE'
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          status?: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          location_name?: string
          latitude?: number
          longitude?: number
          network_type?: string
          assigned_team_id?: string
          created_at?: string
          updated_at?: string
          resolved_at?: string
        }
      }
      report_telemetry: {
        Row: {
          id: string
          report_id: string
          network_type?: string
          signal_strength?: number
          latency_ms?: number
          cell_id?: string
          device_model?: string
          os_version?: string
          app_screen?: string
          latitude?: number
          longitude?: number
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          network_type?: string
          signal_strength?: number
          latency_ms?: number
          cell_id?: string
          device_model?: string
          os_version?: string
          app_screen?: string
          latitude?: number
          longitude?: number
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          network_type?: string
          signal_strength?: number
          latency_ms?: number
          cell_id?: string
          device_model?: string
          os_version?: string
          app_screen?: string
          latitude?: number
          longitude?: number
          created_at?: string
        }
      }
      ai_analysis: {
        Row: {
          id: string
          report_id: string
          category: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          confidence: number
          sentiment?: string
          summary: string
          recommended_action: string
          assigned_team_id?: string
          model: string
          raw_response?: Json
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          category: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string
          severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          confidence: number
          sentiment?: string
          summary: string
          recommended_action: string
          assigned_team_id?: string
          model: string
          raw_response?: Json
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          category?: 'NETWORK' | 'MPESA' | 'BILLING' | 'APP_UX' | 'FEATURE_REQUEST' | 'OTHER'
          subcategory?: string
          severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          confidence?: number
          sentiment?: string
          summary?: string
          recommended_action?: string
          assigned_team_id?: string
          model?: string
          raw_response?: Json
          created_at?: string
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
      report_status_history: {
        Row: {
          id: string
          report_id: string
          status: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          changed_by?: string
          comment?: string
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          status: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          changed_by?: string
          comment?: string
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          status?: 'RECEIVED' | 'ANALYZING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
          changed_by?: string
          comment?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          report_id?: string
          title: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          report_id?: string
          title: string
          message: string
          type: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          report_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          created_at?: string
        }
      }
      attachments: {
        Row: {
          id: string
          report_id: string
          file_name: string
          file_type: string
          storage_path: string
          file_size: number
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          file_name: string
          file_type: string
          storage_path: string
          file_size: number
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          file_name?: string
          file_type?: string
          storage_path?: string
          file_size?: number
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          metadata?: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          metadata?: Json
          created_at?: string
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
          user_name: string
          user_email: string
          category: string
          subcategory?: string
          description: string
          severity: string
          status: string
          location_name?: string
          assigned_team?: string
          ai_confidence?: number
          ai_summary?: string
          created_at: string
          updated_at: string
          resolved_at?: string
        }
      }
    }
    Functions: {
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
  }
}

// Type helpers for the frontend
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Report = Database['public']['Tables']['reports']['Row']
export type ReportTelemetry = Database['public']['Tables']['report_telemetry']['Row']
export type AIAnalysis = Database['public']['Tables']['ai_analysis']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type ReportStatusHistory = Database['public']['Tables']['report_status_history']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type Attachment = Database['public']['Tables']['attachments']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

export type ReportWithAnalysis = Database['public']['Views']['reports_with_analysis']['Row']
export type DashboardSummary = Database['public']['Views']['dashboard_summary']['Row']