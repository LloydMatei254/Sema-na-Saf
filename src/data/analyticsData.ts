export interface HourlyTicketData {
  hour: string
  tickets: number
  resolved: number
  network: number
  app: number
  mpesa: number
}

export interface TrendData {
  date: string
  tickets: number
  resolution_rate: number
  satisfaction: number
}

export interface CategoryTrendData {
  date: string
  network: number
  app: number
  mpesa: number
  billing: number
  features: number
}

// Hourly ticket data for today
export const hourlyTicketData: HourlyTicketData[] = [
  { hour: '00', tickets: 45, resolved: 42, network: 20, app: 15, mpesa: 10 },
  { hour: '01', tickets: 32, resolved: 30, network: 15, app: 10, mpesa: 7 },
  { hour: '02', tickets: 28, resolved: 25, network: 12, app: 8, mpesa: 8 },
  { hour: '03', tickets: 25, resolved: 23, network: 10, app: 8, mpesa: 7 },
  { hour: '04', tickets: 30, resolved: 28, network: 12, app: 10, mpesa: 8 },
  { hour: '05', tickets: 42, resolved: 38, network: 18, app: 12, mpesa: 12 },
  { hour: '06', tickets: 78, resolved: 70, network: 35, app: 25, mpesa: 18 },
  { hour: '07', tickets: 124, resolved: 110, network: 55, app: 40, mpesa: 29 },
  { hour: '08', tickets: 156, resolved: 140, network: 70, app: 50, mpesa: 36 },
  { hour: '09', tickets: 189, resolved: 165, network: 85, app: 60, mpesa: 44 },
  { hour: '10', tickets: 203, resolved: 180, network: 95, app: 65, mpesa: 43 },
  { hour: '11', tickets: 198, resolved: 175, network: 90, app: 63, mpesa: 45 },
  { hour: '12', tickets: 215, resolved: 190, network: 100, app: 70, mpesa: 45 },
  { hour: '13', tickets: 187, resolved: 165, network: 85, app: 60, mpesa: 42 },
  { hour: '14', tickets: 172, resolved: 150, network: 78, app: 55, mpesa: 39 },
  { hour: '15', tickets: 165, resolved: 145, network: 75, app: 52, mpesa: 38 },
  { hour: '16', tickets: 158, resolved: 140, network: 72, app: 50, mpesa: 36 },
  { hour: '17', tickets: 145, resolved: 128, network: 66, app: 46, mpesa: 33 },
  { hour: '18', tickets: 132, resolved: 115, network: 60, app: 42, mpesa: 30 },
  { hour: '19', tickets: 95, resolved: 85, network: 43, app: 30, mpesa: 22 },
  { hour: '20', tickets: 78, resolved: 70, network: 35, app: 25, mpesa: 18 },
  { hour: '21', tickets: 68, resolved: 60, network: 30, app: 22, mpesa: 16 },
  { hour: '22', tickets: 58, resolved: 52, network: 26, app: 18, mpesa: 14 },
  { hour: '23', tickets: 48, resolved: 43, network: 22, app: 15, mpesa: 11 }
]

// Weekly trend data
export const weeklyTrendData: TrendData[] = [
  { date: 'Mon', tickets: 2847, resolution_rate: 89.2, satisfaction: 4.1 },
  { date: 'Tue', tickets: 3156, resolution_rate: 91.5, satisfaction: 4.3 },
  { date: 'Wed', tickets: 2934, resolution_rate: 88.7, satisfaction: 4.0 },
  { date: 'Thu', tickets: 3298, resolution_rate: 92.1, satisfaction: 4.4 },
  { date: 'Fri', tickets: 3567, resolution_rate: 87.3, satisfaction: 3.9 },
  { date: 'Sat', tickets: 2103, resolution_rate: 94.2, satisfaction: 4.6 },
  { date: 'Sun', tickets: 1892, resolution_rate: 95.1, satisfaction: 4.7 }
]

// Category trends over the past week
export const categoryTrendData: CategoryTrendData[] = [
  { date: 'Mon', network: 1248, app: 567, mpesa: 789, billing: 143, features: 100 },
  { date: 'Tue', network: 1389, app: 631, mpesa: 876, billing: 160, features: 100 },
  { date: 'Wed', network: 1289, app: 587, mpesa: 815, billing: 148, features: 95 },
  { date: 'Thu', network: 1449, app: 659, mpesa: 915, billing: 175, features: 100 },
  { date: 'Fri', network: 1567, app: 712, mpesa: 989, billing: 189, features: 110 },
  { date: 'Sat', network: 923, app: 420, mpesa: 583, billing: 111, features: 66 },
  { date: 'Sun', network: 831, app: 378, mpesa: 525, billing: 100, features: 58 }
]

// Resolution time distribution
export const resolutionTimeData = [
  { timeRange: '< 1 hour', count: 4567, percentage: 32.1 },
  { timeRange: '1-2 hours', count: 3892, percentage: 27.4 },
  { timeRange: '2-4 hours', count: 2847, percentage: 20.0 },
  { timeRange: '4-8 hours', count: 1756, percentage: 12.4 },
  { timeRange: '8-24 hours', count: 892, percentage: 6.3 },
  { timeRange: '> 24 hours', count: 256, percentage: 1.8 }
]

// Peak usage statistics
export const peakUsageStats = {
  peakHour: '12:00',
  peakDay: 'Friday',
  avgDailyTickets: 2857,
  peakHourTickets: 215,
  offPeakHourTickets: 25,
  weekendReduction: 35.2 // percentage
}