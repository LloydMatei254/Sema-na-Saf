// Temporary mock service until Supabase is fully configured
import type { Report } from '../types/database'

export interface CreateReportData {
  description: string
  inputType: 'TEXT' | 'VOICE'
  locationName?: string
  latitude?: number
  longitude?: number
  telemetry?: any
  attachmentFile?: File
}

let reportCounter = 1

export const mockReportsService = {
  async createReport(data: CreateReportData): Promise<Report> {
    const report: Report = {
      id: `report-${Date.now()}`,
      ticket_number: `SEM-2024-${String(reportCounter++).padStart(6, '0')}`,
      user_id: 'mock-user-id',
      category: 'OTHER',
      subcategory: null,
      description: data.description,
      input_type: data.inputType,
      severity: 'MEDIUM',
      status: 'RECEIVED',
      location_name: data.locationName || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      network_type: null,
      assigned_team_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      resolved_at: null
    }

    // Simulate AI processing
    setTimeout(() => {
      console.log('Mock AI analysis completed for', report.ticket_number)
    }, 2000)

    return report
  },

  async getMyReports(): Promise<Report[]> {
    return []
  }
}