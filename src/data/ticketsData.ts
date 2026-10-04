export interface Ticket {
  id: string
  timestamp: string
  customerName: string
  phoneNumber: string
  category: 'network' | 'app' | 'mpesa' | 'billing' | 'features'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  subject: string
  description: string
  location: {
    county: string
    coordinates?: [number, number]
  }
  deviceInfo: {
    model: string
    os: string
    appVersion: string
    networkType: '4G' | '5G' | 'WiFi' | '3G'
    signalStrength: number
  }
  attachments: {
    screenshot?: string
    voiceNote?: string
  }
  assignedTo?: string
  resolutionTime?: number // in minutes
  satisfactionRating?: number // 1-5
  feedback?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const sampleTickets: Ticket[] = [
  {
    id: 'TKT-2024-001',
    timestamp: '2024-01-15 09:23:45',
    customerName: 'John Kamau',
    phoneNumber: '+254712345678',
    category: 'network',
    priority: 'high',
    status: 'open',
    subject: 'No network coverage in Kitengela area',
    description: 'I have been experiencing no network coverage in Kitengela area since yesterday morning. Unable to make calls or access data services.',
    location: {
      county: 'Kajiado',
      coordinates: [-1.367, 36.953]
    },
    deviceInfo: {
      model: 'Samsung Galaxy A54',
      os: 'Android 14',
      appVersion: '12.4.1',
      networkType: '4G',
      signalStrength: 0
    },
    attachments: {
      screenshot: '/screenshots/network_issue_001.png'
    },
    tags: ['network_outage', 'kitengela', 'urgent'],
    createdAt: '2024-01-15T09:23:45Z',
    updatedAt: '2024-01-15T09:23:45Z'
  },
  {
    id: 'TKT-2024-002',
    timestamp: '2024-01-15 10:15:32',
    customerName: 'Mary Wanjiku',
    phoneNumber: '+254798765432',
    category: 'mpesa',
    priority: 'urgent',
    status: 'in_progress',
    subject: 'M-PESA transaction failed but money deducted',
    description: 'Tried to send KES 5,000 to 0722123456 but transaction failed. However, the money was deducted from my account.',
    location: {
      county: 'Nairobi',
      coordinates: [-1.286, 36.817]
    },
    deviceInfo: {
      model: 'iPhone 14',
      os: 'iOS 17.2',
      appVersion: '12.4.1',
      networkType: '5G',
      signalStrength: -65
    },
    attachments: {
      screenshot: '/screenshots/mpesa_failure_002.png'
    },
    assignedTo: 'FinTech Support Team',
    tags: ['mpesa', 'failed_transaction', 'refund_needed'],
    createdAt: '2024-01-15T10:15:32Z',
    updatedAt: '2024-01-15T11:30:15Z'
  },
  {
    id: 'TKT-2024-003',
    timestamp: '2024-01-15 11:42:18',
    customerName: 'Peter Mwangi',
    phoneNumber: '+254701234567',
    category: 'app',
    priority: 'medium',
    status: 'resolved',
    subject: 'App crashes when trying to check balance',
    description: 'The MySafaricom app keeps crashing whenever I try to check my account balance. This started happening after the latest update.',
    location: {
      county: 'Kiambu',
      coordinates: [-1.174, 36.832]
    },
    deviceInfo: {
      model: 'Tecno Camon 20',
      os: 'Android 13',
      appVersion: '12.3.8',
      networkType: '4G',
      signalStrength: -78
    },
    attachments: {
      screenshot: '/screenshots/app_crash_003.png'
    },
    assignedTo: 'Mobile App Team',
    resolutionTime: 145,
    satisfactionRating: 4,
    feedback: 'Issue resolved quickly after app update. Thank you!',
    tags: ['app_crash', 'balance_check', 'android'],
    createdAt: '2024-01-15T11:42:18Z',
    updatedAt: '2024-01-15T14:07:23Z'
  },
  {
    id: 'TKT-2024-004',
    timestamp: '2024-01-15 13:28:55',
    customerName: 'Grace Akinyi',
    phoneNumber: '+254733456789',
    category: 'billing',
    priority: 'medium',
    status: 'open',
    subject: 'Incorrect charges on my bill',
    description: 'My monthly bill shows charges for international calls that I never made. Need clarification on these charges.',
    location: {
      county: 'Kisumu',
      coordinates: [-0.091, 34.768]
    },
    deviceInfo: {
      model: 'Infinix Note 30',
      os: 'Android 13',
      appVersion: '12.4.0',
      networkType: '4G',
      signalStrength: -82
    },
    attachments: {},
    tags: ['billing_dispute', 'international_calls', 'incorrect_charges'],
    createdAt: '2024-01-15T13:28:55Z',
    updatedAt: '2024-01-15T13:28:55Z'
  },
  {
    id: 'TKT-2024-005',
    timestamp: '2024-01-15 14:55:12',
    customerName: 'David Ochieng',
    phoneNumber: '+254756789012',
    category: 'features',
    priority: 'low',
    status: 'open',
    subject: 'Request for data rollover feature',
    description: 'Would like to request a feature that allows unused data to roll over to the next month instead of expiring.',
    location: {
      county: 'Mombasa',
      coordinates: [-4.043, 39.658]
    },
    deviceInfo: {
      model: 'Oppo A78',
      os: 'Android 13',
      appVersion: '12.4.1',
      networkType: '4G',
      signalStrength: -71
    },
    attachments: {},
    tags: ['feature_request', 'data_rollover', 'product_enhancement'],
    createdAt: '2024-01-15T14:55:12Z',
    updatedAt: '2024-01-15T14:55:12Z'
  },
  {
    id: 'TKT-2024-006',
    timestamp: '2024-01-15 16:30:45',
    customerName: 'Susan Njeri',
    phoneNumber: '+254722345678',
    category: 'network',
    priority: 'medium',
    status: 'in_progress',
    subject: 'Slow internet speeds during peak hours',
    description: 'Internet speeds become very slow between 7-9 PM daily in our area. Download speeds drop from 20Mbps to 2Mbps.',
    location: {
      county: 'Nakuru',
      coordinates: [-0.303, 36.080]
    },
    deviceInfo: {
      model: 'Huawei Y9s',
      os: 'Android 12',
      appVersion: '12.4.1',
      networkType: '4G',
      signalStrength: -75
    },
    attachments: {},
    assignedTo: 'Network Operations Center',
    tags: ['slow_speeds', 'peak_hours', 'bandwidth_issue'],
    createdAt: '2024-01-15T16:30:45Z',
    updatedAt: '2024-01-15T17:15:30Z'
  }
]

export const ticketCategories = [
  { value: 'all', label: 'All Categories', color: 'gray' },
  { value: 'network', label: 'Network Issues', color: 'red' },
  { value: 'mpesa', label: 'M-PESA Issues', color: 'green' },
  { value: 'app', label: 'App Bugs', color: 'orange' },
  { value: 'billing', label: 'Billing Issues', color: 'purple' },
  { value: 'features', label: 'Feature Requests', color: 'blue' }
]

export const ticketStatuses = [
  { value: 'all', label: 'All Status', color: 'gray' },
  { value: 'open', label: 'Open', color: 'blue' },
  { value: 'in_progress', label: 'In Progress', color: 'orange' },
  { value: 'resolved', label: 'Resolved', color: 'green' },
  { value: 'closed', label: 'Closed', color: 'gray' }
]

export const ticketPriorities = [
  { value: 'all', label: 'All Priorities', color: 'gray' },
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'high', label: 'High', color: 'red' },
  { value: 'urgent', label: 'Urgent', color: 'purple' }
]