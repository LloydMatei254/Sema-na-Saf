import { allCounties } from './kenyaAdministrative'

export interface CountyPerformanceData {
  id: string
  county: string
  totalCitizens: number
  registered: number // Reports submitted
  unresolved: number // Pending issues
  resolved: number   // Resolved issues
  conversionRate: number // Success rate
  targetAchieved: number // Goal achievement
  status: 'unassigned' | 'assigned' | 'active' | 'inactive'
  trend: 'up' | 'down' | 'stable'
  region: string
}

// Generate realistic performance data for all 47 counties
export const kenyaCountiesData: CountyPerformanceData[] = allCounties.map(county => {
  // Generate realistic report submissions (5-15% of population)
  const participationRate = 0.05 + Math.random() * 0.10
  const registered = Math.floor(county.population * participationRate)
  
  // Generate resolution data (80-95% resolution rate)
  const resolutionRate = 0.8 + Math.random() * 0.15
  const resolved = Math.floor(registered * resolutionRate)
  const unresolved = registered - resolved
  
  // Generate success rate and goal achievement data
  const conversionRate = Math.random() * 5 // 0-5%
  const targetAchieved = Math.random() * 100 // 0-100%
  
  // Determine status based on population and activity
  let status: 'unassigned' | 'assigned' | 'active' | 'inactive'
  if (county.population > 1000000) status = 'active'
  else if (county.population > 500000) status = 'assigned'
  else if (registered > 50000) status = 'assigned'
  else status = 'unassigned'
  
  // Determine trend
  const trendRandom = Math.random()
  let trend: 'up' | 'down' | 'stable'
  if (trendRandom < 0.3) trend = 'up'
  else if (trendRandom < 0.6) trend = 'stable'
  else trend = 'down'

  return {
    id: county.id,
    county: county.name,
    totalCitizens: county.population,
    registered,
    unresolved,
    resolved,
    conversionRate,
    targetAchieved,
    status,
    trend,
    region: county.region
  }
})

// Additional data for Sema feedback categorization
export const feedbackCategories = {
  network: {
    name: 'Network Issues',
    count: 5234,
    percentage: 33.2,
    avgResolutionTime: '4.2 hours',
    priority: 'high'
  },
  app: {
    name: 'App Bugs',
    count: 2847,
    percentage: 18.1,
    avgResolutionTime: '2.1 hours',
    priority: 'medium'
  },
  mpesa: {
    name: 'M-PESA Issues',
    count: 4156,
    percentage: 26.4,
    avgResolutionTime: '1.8 hours',
    priority: 'high'
  },
  features: {
    name: 'Feature Requests',
    count: 1892,
    percentage: 12.0,
    avgResolutionTime: 'N/A',
    priority: 'low'
  },
  billing: {
    name: 'Billing Issues',
    count: 1618,
    percentage: 10.3,
    avgResolutionTime: '3.5 hours',
    priority: 'medium'
  }
}