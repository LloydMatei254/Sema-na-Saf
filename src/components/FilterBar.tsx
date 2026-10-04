import React from 'react'
import { RefreshCw } from 'lucide-react'
import { 
  filterOptions, 
  getCountiesByRegion, 
  getDistrictsByCounty, 
  getDivisionsByDistrict 
} from '../data/kenyaAdministrative'
import { useFilter } from '../contexts/FilterContext'

const FilterBar: React.FC = () => {
  const {
    selectedRegion,
    selectedCounty,
    selectedDistrict,
    selectedDivision,
    setSelectedRegion,
    setSelectedCounty,
    setSelectedDistrict,
    setSelectedDivision,
    resetFilters
  } = useFilter()

  const availableCounties = getCountiesByRegion(selectedRegion)
  const availableDistricts = getDistrictsByCounty(selectedCounty)
  const availableDivisions = getDivisionsByDistrict(selectedDistrict)

  const totalCounties = selectedRegion === 'all' ? 47 : availableCounties.length

  // Generate breadcrumb path
  const getBreadcrumbPath = () => {
    const path = []
    if (selectedRegion !== 'all') {
      const region = filterOptions.regions.find(r => r.value === selectedRegion)
      if (region) path.push(region.label)
    }
    if (selectedCounty !== 'all') {
      const county = availableCounties.find(c => c.id === selectedCounty)
      if (county) path.push(county.name)
    }
    if (selectedDistrict !== 'all') {
      const district = availableDistricts.find(d => d.id === selectedDistrict)
      if (district) path.push(district.name)
    }
    if (selectedDivision !== 'all') {
      const division = availableDivisions.find(d => d.id === selectedDivision)
      if (division) path.push(division.name)
    }
    return path
  }

  const breadcrumbPath = getBreadcrumbPath()

  return (
    <div className="bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-700 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="text-safaricom-green font-semibold">KENYA ADMIN</span>
            <span className="hidden sm:inline">- {totalCounties} counties</span>
            {(selectedRegion !== 'all' || selectedCounty !== 'all' || selectedDistrict !== 'all' || selectedDivision !== 'all') && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Filtered
              </span>
            )}
          </div>
          
          {/* Breadcrumb Path */}
          {breadcrumbPath.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <span>Current Filter:</span>
              <div className="flex items-center space-x-1">
                {breadcrumbPath.map((item, index) => (
                  <React.Fragment key={index}>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{item}</span>
                    {index < breadcrumbPath.length - 1 && <span>→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-gray-700 text-xs sm:text-sm focus:outline-none focus:border-safaricom-green focus:ring-1 focus:ring-safaricom-green"
            >
              {filterOptions.regions.map(region => (
                <option key={region.value} value={region.value}>{region.label}</option>
              ))}
            </select>
            
            <select 
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-gray-700 text-xs sm:text-sm focus:outline-none focus:border-safaricom-green focus:ring-1 focus:ring-safaricom-green"
            >
              <option value="all">All Counties</option>
              {availableCounties.map(county => (
                <option key={county.id} value={county.id}>{county.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-gray-700 text-xs sm:text-sm focus:outline-none focus:border-safaricom-green focus:ring-1 focus:ring-safaricom-green"
            >
              <option value="all">All Districts</option>
              {availableDistricts.map(district => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-gray-700 text-xs sm:text-sm focus:outline-none focus:border-safaricom-green focus:ring-1 focus:ring-safaricom-green"
            >
              <option value="all">All Divisions</option>
              {availableDivisions.map(division => (
                <option key={division.id} value={division.id}>{division.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <button className="btn-primary text-xs sm:text-sm px-3 py-1">
              Apply Filters
            </button>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 overflow-x-auto">
              <span className="whitespace-nowrap">This week</span>
              <span className="hidden sm:inline whitespace-nowrap">Last 7 days</span>
              <span className="hidden md:inline whitespace-nowrap">Last 30 days</span>
              <span className="hidden lg:inline whitespace-nowrap">Since 30 days</span>
            </div>
            <button 
              onClick={resetFilters}
              className="p-1 sm:p-2 text-gray-500 hover:text-safaricom-green transition-colors hover:bg-safaricom-lightGreen/30 rounded"
              title="Reset all filters"
            >
              <RefreshCw size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar