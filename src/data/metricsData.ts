export interface MetricData {
  title: string
  value: string
  subtitle: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'red' | 'orange' | 'gray'
}

export const metricsData: MetricData[] = [
  {
    title: 'TOTAL POPULATION',
    value: '34.60M',
    subtitle: 'citizens across Kenya',
    color: 'blue',
    trend: 'up',
    trendValue: '+2.3%'
  },
  {
    title: 'ACTIVE COMPLAINTS',
    value: '10.89K',
    subtitle: 'pending resolution',
    color: 'orange',
    trend: 'down',
    trendValue: '-1.2%'
  },
  {
    title: 'REPORTS SUBMITTED',
    value: '247',
    subtitle: 'received today',
    color: 'gray',
    trend: 'up',
    trendValue: '+12'
  },
  {
    title: 'RESOLUTION RATE',
    value: '87.3%',
    subtitle: 'this month',
    color: 'green',
    trend: 'up',
    trendValue: '+5.2%'
  },
  {
    title: 'SERVICE QUALITY',
    value: '4.2',
    subtitle: 'average rating',
    color: 'green',
    trend: 'up',
    trendValue: '+0.3'
  },
  {
    title: 'FIELD OFFICERS',
    value: '127',
    subtitle: 'active nationwide',
    color: 'green',
    trend: 'up',
    trendValue: '+8'
  }
]

// Additional detailed metrics for Sema-specific data
export const semaMetrics = {
  totalComplaints: 15847,
  resolvedToday: 1234,
  avgResolutionTime: '2.4 hours',
  customerSatisfaction: '4.2/5.0',
  infrastructureIssues: 3456,
  serviceRequests: 1847,
  emergencyReports: 892,
  activeCitizens: '34.6M',
  satisfactionImprovement: 15.7, // percentage
  costSavings: 'KES 2.4M' // monthly savings from improved efficiency
}