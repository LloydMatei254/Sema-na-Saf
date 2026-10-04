import React, { useState } from 'react'
import { MapPin, Search, Filter, Plus, Edit3, Trash2, Users, AlertTriangle } from 'lucide-react'
import { useFilter } from '../contexts/FilterContext'
import { allCounties, allDistricts } from '../data/kenyaAdministrative'

interface LocationData {
  id: string
  name: string
  type: 'county' | 'district' | 'division'
  parentId?: string
  coordinates?: { lat: number, lng: number }
  population: number
  officers: number
  incidents: number
  status: 'active' | 'inactive' | 'limited'
  coverage: number
}

const Locations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'county' | 'district' | 'division'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'limited'>('all')
  const { selectedCounty } = useFilter()

  // Generate location data from administrative structure
  const generateLocationData = (): LocationData[] => {
    const locations: LocationData[] = []
    
    // Add counties
    allCounties.forEach(county => {
      locations.push({
        id: county.id,
        name: county.name,
        type: 'county',
        coordinates: { lat: -1.2921, lng: 36.8219 }, // Placeholder coordinates
        population: county.population,
        officers: Math.floor(county.population * 0.0002), // 2 officers per 10k people
        incidents: Math.floor(Math.random() * 500) + 100,
        status: Math.random() > 0.8 ? 'limited' : (Math.random() > 0.1 ? 'active' : 'inactive'),
        coverage: Math.floor(Math.random() * 30) + 70 // 70-100% coverage
      })
    })
    
    // Add districts
    allDistricts.forEach(district => {
      locations.push({
        id: district.id,
        name: district.name,
        type: 'district',
        parentId: district.countyId,
        coordinates: { lat: -1.2921, lng: 36.8219 },
        population: district.population,
        officers: Math.floor(district.population * 0.0003),
        incidents: Math.floor(Math.random() * 200) + 50,
        status: Math.random() > 0.85 ? 'limited' : (Math.random() > 0.15 ? 'active' : 'inactive'),
        coverage: Math.floor(Math.random() * 40) + 60
      })
    })
    
    return locations
  }

  const [locations] = useState<LocationData[]>(generateLocationData())

  // Filter locations based on search and filters
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || location.type === filterType
    const matchesStatus = filterStatus === 'all' || location.status === filterStatus
    
    // Apply hierarchical filters from context
    let matchesHierarchy = true
    if (selectedCounty !== 'all') {
      if (location.type === 'county') {
        matchesHierarchy = location.id === selectedCounty
      } else if (location.type === 'district') {
        matchesHierarchy = location.parentId === selectedCounty
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesHierarchy
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-red-600 bg-red-100'
      case 'limited': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return 'text-green-600 bg-green-100'
    if (coverage >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations Management</h1>
          <p className="text-gray-600 mt-1">Manage service locations, coverage areas, and deployment</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Location</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Locations</p>
              <p className="text-2xl font-bold text-gray-900">{filteredLocations.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Locations</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredLocations.filter(l => l.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Officers</p>
              <p className="text-2xl font-bold text-safaricom-green">
                {filteredLocations.reduce((sum, l) => sum + l.officers, 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-safaricom-green" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Coverage</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(filteredLocations.reduce((sum, l) => sum + l.coverage, 0) / filteredLocations.length || 0)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green focus:border-transparent"
              />
            </div>
            
            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="county">Counties</option>
              <option value="district">Districts</option>
              <option value="division">Divisions</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-safaricom-green focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="limited">Limited</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <Filter size={18} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Population
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Officers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incidents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.slice(0, 50).map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        {location.parentId && (
                          <div className="text-sm text-gray-500">
                            {allCounties.find(c => c.id === location.parentId)?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {location.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {location.population.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {location.officers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {location.incidents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageColor(location.coverage)}`}>
                      {location.coverage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(location.status)}`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit3 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No locations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Locations