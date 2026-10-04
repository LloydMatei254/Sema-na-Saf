export interface CountyPerformanceData {
  id: string
  county: string
  totalCitizens: number
  registered: number
  unresolved: number
  resolved: number
  conversionRate: number
  targetAchieved: number
  status: 'unassigned' | 'assigned' | 'active' | 'inactive'
  trend: 'up' | 'down' | 'stable'
}

export const kenyaCountiesData: CountyPerformanceData[] = [
  {
    id: 'nairobi',
    county: 'Nairobi',
    totalCitizens: 4500000,
    registered: 218981,
    unresolved: 0,
    resolved: 218981,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'mombasa',
    county: 'Mombasa',
    totalCitizens: 1200000,
    registered: 142930,
    unresolved: 0,
    resolved: 142930,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'up'
  },
  {
    id: 'kiambu',
    county: 'Kiambu',
    totalCitizens: 2400000,
    registered: 147919,
    unresolved: 0,
    resolved: 147919,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'nakuru',
    county: 'Nakuru',
    totalCitizens: 2162202,
    registered: 152797,
    unresolved: 0,
    resolved: 152797,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'down'
  },
  {
    id: 'machakos',
    county: 'Machakos',
    totalCitizens: 1421932,
    registered: 218981,
    unresolved: 0,
    resolved: 218981,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'bungoma-south',
    county: 'Bungoma South',
    totalCitizens: 1670570,
    registered: 146969,
    unresolved: 0,
    resolved: 146969,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'siaya',
    county: 'Siaya',
    totalCitizens: 993183,
    registered: 197127,
    unresolved: 0,
    resolved: 197127,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'up'
  },
  {
    id: 'kilifi',
    county: 'Kilifi',
    totalCitizens: 1453787,
    registered: 147848,
    unresolved: 0,
    resolved: 147848,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'vihiga',
    county: 'Vihiga',
    totalCitizens: 590013,
    registered: 173877,
    unresolved: 0,
    resolved: 173877,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'kakamega',
    county: 'Kakamega',
    totalCitizens: 1867579,
    registered: 109692,
    unresolved: 0,
    resolved: 109692,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'down'
  },
  {
    id: 'murang-east',
    county: 'Murang\'a East',
    totalCitizens: 1056640,
    registered: 111963,
    unresolved: 0,
    resolved: 111963,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'gatundu-north',
    county: 'Gatundu North',
    totalCitizens: 157815,
    registered: 98682,
    unresolved: 0,
    resolved: 98682,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'jomba-south',
    county: 'Jomba South',
    totalCitizens: 180000,
    registered: 90369,
    unresolved: 0,
    resolved: 90369,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'stable'
  },
  {
    id: 'nyamira',
    county: 'Nyamira',
    totalCitizens: 605576,
    registered: 102714,
    unresolved: 0,
    resolved: 102714,
    conversionRate: 0,
    targetAchieved: 0,
    status: 'unassigned',
    trend: 'up'
  }
]

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