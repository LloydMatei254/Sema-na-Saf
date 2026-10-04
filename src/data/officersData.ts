export interface Officer {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'supervisor' | 'agent' | 'analyst'
  county: string
  district?: string
  division?: string
  department: 'customer-service' | 'technical' | 'management' | 'operations'
  status: 'active' | 'inactive' | 'on-leave' | 'training'
  joinDate: string
  lastLogin: string
  performance: {
    ticketsHandled: number
    resolutionRate: number
    avgResponseTime: string
    customerRating: number
  }
  permissions: string[]
  avatar?: string
}

export const officersData: Officer[] = [
  {
    id: 'off-001',
    name: 'James Kiprotich',
    email: 'j.kiprotich@safaricom.co.ke',
    phone: '+254712345001',
    role: 'admin',
    county: 'Nairobi',
    district: 'Nairobi Central',
    department: 'management',
    status: 'active',
    joinDate: '2020-03-15',
    lastLogin: '2024-10-04T08:30:00Z',
    performance: {
      ticketsHandled: 1247,
      resolutionRate: 94.8,
      avgResponseTime: '2.3 hours',
      customerRating: 4.7
    },
    permissions: ['all', 'user-management', 'system-config', 'reports']
  },
  {
    id: 'off-002',
    name: 'Grace Wanjiku',
    email: 'g.wanjiku@safaricom.co.ke',
    phone: '+254712345002',
    role: 'supervisor',
    county: 'Kiambu',
    district: 'Thika',
    department: 'customer-service',
    status: 'active',
    joinDate: '2021-01-20',
    lastLogin: '2024-10-04T07:45:00Z',
    performance: {
      ticketsHandled: 892,
      resolutionRate: 91.2,
      avgResponseTime: '3.1 hours',
      customerRating: 4.5
    },
    permissions: ['team-management', 'ticket-assignment', 'reports']
  },
  {
    id: 'off-003',
    name: 'Michael Otieno',
    email: 'm.otieno@safaricom.co.ke',
    phone: '+254712345003',
    role: 'agent',
    county: 'Mombasa',
    district: 'Mombasa Island',
    department: 'technical',
    status: 'active',
    joinDate: '2022-06-10',
    lastLogin: '2024-10-04T09:15:00Z',
    performance: {
      ticketsHandled: 634,
      resolutionRate: 87.6,
      avgResponseTime: '4.2 hours',
      customerRating: 4.3
    },
    permissions: ['ticket-handling', 'customer-contact']
  },
  {
    id: 'off-004',
    name: 'Faith Nyambura',
    email: 'f.nyambura@safaricom.co.ke',
    phone: '+254712345004',
    role: 'analyst',
    county: 'Nakuru',
    district: 'Nakuru Town',
    department: 'operations',
    status: 'active',
    joinDate: '2021-09-05',
    lastLogin: '2024-10-03T16:20:00Z',
    performance: {
      ticketsHandled: 1156,
      resolutionRate: 93.1,
      avgResponseTime: '1.8 hours',
      customerRating: 4.6
    },
    permissions: ['analytics', 'reports', 'data-export']
  },
  {
    id: 'off-005',
    name: 'David Mwangi',
    email: 'd.mwangi@safaricom.co.ke',
    phone: '+254712345005',
    role: 'agent',
    county: 'Machakos',
    district: 'Machakos Town',
    department: 'customer-service',
    status: 'training',
    joinDate: '2024-08-15',
    lastLogin: '2024-10-03T14:10:00Z',
    performance: {
      ticketsHandled: 89,
      resolutionRate: 78.9,
      avgResponseTime: '6.1 hours',
      customerRating: 4.0
    },
    permissions: ['ticket-handling']
  },
  {
    id: 'off-006',
    name: 'Susan Achieng',
    email: 's.achieng@safaricom.co.ke',
    phone: '+254712345006',
    role: 'supervisor',
    county: 'Kisumu',
    district: 'Kisumu Central',
    department: 'customer-service',
    status: 'active',
    joinDate: '2020-11-12',
    lastLogin: '2024-10-04T08:00:00Z',
    performance: {
      ticketsHandled: 1034,
      resolutionRate: 92.4,
      avgResponseTime: '2.9 hours',
      customerRating: 4.5
    },
    permissions: ['team-management', 'ticket-assignment', 'reports']
  },
  {
    id: 'off-007',
    name: 'Robert Kiprop',
    email: 'r.kiprop@safaricom.co.ke',
    phone: '+254712345007',
    role: 'agent',
    county: 'Uasin Gishu',
    district: 'Eldoret East',
    department: 'technical',
    status: 'on-leave',
    joinDate: '2022-02-28',
    lastLogin: '2024-09-28T17:30:00Z',
    performance: {
      ticketsHandled: 567,
      resolutionRate: 85.2,
      avgResponseTime: '4.8 hours',
      customerRating: 4.2
    },
    permissions: ['ticket-handling', 'technical-support']
  },
  {
    id: 'off-008',
    name: 'Mary Wambui',
    email: 'm.wambui@safaricom.co.ke',
    phone: '+254712345008',
    role: 'agent',
    county: 'Kakamega',
    district: 'Kakamega Central',
    department: 'customer-service',
    status: 'active',
    joinDate: '2023-04-03',
    lastLogin: '2024-10-04T09:45:00Z',
    performance: {
      ticketsHandled: 412,
      resolutionRate: 88.7,
      avgResponseTime: '3.8 hours',
      customerRating: 4.4
    },
    permissions: ['ticket-handling', 'customer-contact']
  },
  {
    id: 'off-009',
    name: 'Peter Mutua',
    email: 'p.mutua@safaricom.co.ke',
    phone: '+254712345009',
    role: 'analyst',
    county: 'Kilifi',
    district: 'Kilifi North',
    department: 'operations',
    status: 'active',
    joinDate: '2021-07-18',
    lastLogin: '2024-10-04T06:30:00Z',
    performance: {
      ticketsHandled: 923,
      resolutionRate: 90.8,
      avgResponseTime: '2.1 hours',
      customerRating: 4.6
    },
    permissions: ['analytics', 'reports', 'performance-monitoring']
  },
  {
    id: 'off-010',
    name: 'Catherine Njeri',
    email: 'c.njeri@safaricom.co.ke',
    phone: '+254712345010',
    role: 'supervisor',
    county: 'Nyeri',
    district: 'Nyeri Central',
    department: 'management',
    status: 'inactive',
    joinDate: '2019-12-05',
    lastLogin: '2024-09-15T12:00:00Z',
    performance: {
      ticketsHandled: 1567,
      resolutionRate: 95.2,
      avgResponseTime: '2.5 hours',
      customerRating: 4.8
    },
    permissions: ['team-management', 'performance-review', 'reports']
  }
]

// Summary statistics
export const officerStats = {
  totalOfficers: officersData.length,
  activeOfficers: officersData.filter(o => o.status === 'active').length,
  onLeave: officersData.filter(o => o.status === 'on-leave').length,
  inTraining: officersData.filter(o => o.status === 'training').length,
  avgResolutionRate: (
    officersData.reduce((sum, o) => sum + o.performance.resolutionRate, 0) / officersData.length
  ).toFixed(1),
  avgCustomerRating: (
    officersData.reduce((sum, o) => sum + o.performance.customerRating, 0) / officersData.length
  ).toFixed(1),
  totalTicketsHandled: officersData.reduce((sum, o) => sum + o.performance.ticketsHandled, 0)
}

// Role-based permissions
export const rolePermissions = {
  admin: ['all'],
  supervisor: ['team-management', 'ticket-assignment', 'reports', 'performance-review'],
  agent: ['ticket-handling', 'customer-contact'],
  analyst: ['analytics', 'reports', 'data-export', 'performance-monitoring']
}

// Department colors for UI
export const departmentColors = {
  'customer-service': '#00A651',
  'technical': '#0066CC', 
  'management': '#8B5CF6',
  'operations': '#F59E0B'
}