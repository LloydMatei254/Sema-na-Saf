// Mock team data for development and fallback
// This data is used when Supabase teams table is not yet set up

export interface MockTeam {
  id: string
  name: string
  county: string
  specialization: string[]
  capacity: number
  currentLoad: number
  members: number
  email: string
  phone: string
  description: string
}

export const mockTeams: MockTeam[] = [
  // Major Cities
  {
    id: '1',
    name: 'Nairobi City Response Team',
    county: 'Nairobi',
    specialization: ['network', 'infrastructure', 'utilities'],
    capacity: 20,
    currentLoad: 8,
    members: 15,
    email: 'nairobi@sema.go.ke',
    phone: '+254-712-345-001',
    description: 'Main response team for Nairobi County covering all major incidents'
  },
  {
    id: '2',
    name: 'Nairobi Telecom Unit',
    county: 'Nairobi',
    specialization: ['network', 'telecommunications', 'mobile'],
    capacity: 15,
    currentLoad: 6,
    members: 10,
    email: 'nairobi-telecom@sema.go.ke',
    phone: '+254-712-345-002',
    description: 'Specialized team for network and telecom issues in Nairobi'
  },
  {
    id: '3',
    name: 'Mombasa Coastal Team',
    county: 'Mombasa',
    specialization: ['infrastructure', 'utilities', 'water'],
    capacity: 15,
    currentLoad: 7,
    members: 12,
    email: 'mombasa@sema.go.ke',
    phone: '+254-712-345-003',
    description: 'Primary response team for Mombasa County'
  },
  {
    id: '4',
    name: 'Kisumu Lake Region Team',
    county: 'Kisumu',
    specialization: ['water', 'environment', 'utilities'],
    capacity: 12,
    currentLoad: 5,
    members: 10,
    email: 'kisumu@sema.go.ke',
    phone: '+254-712-345-004',
    description: 'Covering Kisumu and lake region issues'
  },
  {
    id: '5',
    name: 'Nakuru Rift Valley Team',
    county: 'Nakuru',
    specialization: ['infrastructure', 'agriculture', 'utilities'],
    capacity: 12,
    currentLoad: 6,
    members: 9,
    email: 'nakuru@sema.go.ke',
    phone: '+254-712-345-005',
    description: 'Rift Valley response team based in Nakuru'
  },
  {
    id: '6',
    name: 'Kiambu Metro Team',
    county: 'Kiambu',
    specialization: ['network', 'infrastructure', 'transport'],
    capacity: 10,
    currentLoad: 4,
    members: 8,
    email: 'kiambu@sema.go.ke',
    phone: '+254-712-345-006',
    description: 'Metropolitan area response team'
  },
  {
    id: '7',
    name: 'Kakamega Western Team',
    county: 'Kakamega',
    specialization: ['infrastructure', 'agriculture', 'education'],
    capacity: 10,
    currentLoad: 5,
    members: 8,
    email: 'kakamega@sema.go.ke',
    phone: '+254-712-345-011',
    description: 'Western Kenya main team'
  },
  {
    id: '8',
    name: 'Meru Slopes Team',
    county: 'Meru',
    specialization: ['agriculture', 'water', 'infrastructure'],
    capacity: 8,
    currentLoad: 4,
    members: 6,
    email: 'meru@sema.go.ke',
    phone: '+254-712-345-041',
    description: 'Northern Mt Kenya response team'
  },
  {
    id: '9',
    name: 'Machakos Metro Team',
    county: 'Machakos',
    specialization: ['infrastructure', 'transport', 'trade'],
    capacity: 9,
    currentLoad: 4,
    members: 7,
    email: 'machakos@sema.go.ke',
    phone: '+254-712-345-037',
    description: 'Greater Machakos area'
  },
  {
    id: '10',
    name: 'Uasin Gishu Highlands Team',
    county: 'Uasin Gishu',
    specialization: ['agriculture', 'education', 'transport'],
    capacity: 9,
    currentLoad: 4,
    members: 7,
    email: 'uasingishu@sema.go.ke',
    phone: '+254-712-345-020',
    description: 'Eldoret based team'
  },
  {
    id: '11',
    name: 'Kilifi Beach Team',
    county: 'Kilifi',
    specialization: ['tourism', 'marine', 'infrastructure'],
    capacity: 8,
    currentLoad: 4,
    members: 6,
    email: 'kilifi@sema.go.ke',
    phone: '+254-712-345-032',
    description: 'Coastal tourism region'
  },
  {
    id: '12',
    name: 'Bungoma Border Team',
    county: 'Bungoma',
    specialization: ['transport', 'infrastructure', 'security'],
    capacity: 8,
    currentLoad: 4,
    members: 6,
    email: 'bungoma@sema.go.ke',
    phone: '+254-712-345-012',
    description: 'Border region response'
  },
  {
    id: '13',
    name: 'Homa Bay Lakeside Team',
    county: 'Homa Bay',
    specialization: ['water', 'fishing', 'transport'],
    capacity: 8,
    currentLoad: 4,
    members: 6,
    email: 'homabay@sema.go.ke',
    phone: '+254-712-345-016',
    description: 'Lakeside response unit'
  },
  {
    id: '14',
    name: 'Turkana Frontier Team',
    county: 'Turkana',
    specialization: ['oil', 'livestock', 'water'],
    capacity: 8,
    currentLoad: 3,
    members: 6,
    email: 'turkana@sema.go.ke',
    phone: '+254-712-345-045',
    description: 'Northwestern frontier'
  },
  {
    id: '15',
    name: 'Nyeri Central Team',
    county: 'Nyeri',
    specialization: ['infrastructure', 'utilities', 'agriculture'],
    capacity: 8,
    currentLoad: 3,
    members: 6,
    email: 'nyeri@sema.go.ke',
    phone: '+254-712-345-008',
    description: 'Central Kenya response unit'
  }
]

// Generate additional teams for all 47 counties if needed
export function generateTeamsForAllCounties(counties: string[]): MockTeam[] {
  const existingCounties = new Set(mockTeams.map(t => t.county))
  const additionalTeams: MockTeam[] = []
  
  counties.forEach((county, index) => {
    if (!existingCounties.has(county)) {
      additionalTeams.push({
        id: `${mockTeams.length + index + 1}`,
        name: `${county} Response Team`,
        county: county,
        specialization: ['general', 'infrastructure', 'utilities'],
        capacity: 8,
        currentLoad: Math.floor(Math.random() * 5),
        members: 5 + Math.floor(Math.random() * 3),
        email: `${county.toLowerCase().replace(/\s+/g, '')}@sema.go.ke`,
        phone: `+254-712-${String(345 + index).padStart(3, '0')}-${String(index + 50).padStart(3, '0')}`,
        description: `General response team for ${county} County`
      })
    }
  })
  
  return [...mockTeams, ...additionalTeams]
}
