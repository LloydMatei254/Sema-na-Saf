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
    title: 'TOTAL CITIZENS',
    value: '34.60M',
    subtitle: 'connected last month',
    color: 'blue',
    trend: 'up',
    trendValue: '+2.3%'
  },
  {
    title: 'UNRESOLVED INCIDENTS',
    value: '10.89M',
    subtitle: 'of all incidents to date-date',
    color: 'orange',
    trend: 'down',
    trendValue: '-1.2%'
  },
  {
    title: 'REGISTERED TODAY',
    value: '0',
    subtitle: 'registered today',
    color: 'gray',
    trend: 'neutral'
  },
  {
    title: 'CONVERTED TO DATE',
    value: '0.0%',
    subtitle: 'of registrations this day',
    color: 'red',
    trend: 'neutral'
  },
  {
    title: 'TARGET ACHIEVED',
    value: '0%',
    subtitle: 'of daily target',
    color: 'red',
    trend: 'neutral'
  },
  {
    title: 'OFFICERS REPORTING',
    value: '5',
    subtitle: 'reporting today',
    color: 'green',
    trend: 'up',
    trendValue: '+3'
  }
]

// Additional detailed metrics for Sema-specific data
export const semaMetrics = {
  totalTickets: 15847,
  resolvedToday: 1234,
  avgResolutionTime: '2.4 hours',
  customerSatisfaction: '4.2/5.0',
  networkIssues: 3456,
  appBugs: 1847,
  featureRequests: 892,
  activeUsers: '34.6M',
  churnPrevented: 15.7, // percentage
  costSavings: 'KES 2.4M' // daily savings from deflected calls
}