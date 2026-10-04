import React, { createContext, useContext, useState, ReactNode } from 'react'
import { allCounties } from '../data/kenyaAdministrative'

interface FilterContextType {
  selectedRegion: string
  selectedCounty: string
  selectedDistrict: string
  selectedDivision: string
  setSelectedRegion: (region: string) => void
  setSelectedCounty: (county: string) => void
  setSelectedDistrict: (district: string) => void
  setSelectedDivision: (division: string) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedDivision, setSelectedDivision] = useState('all')

  const handleSetSelectedRegion = (region: string) => {
    setSelectedRegion(region)
    setSelectedCounty('all')
    setSelectedDistrict('all')
    setSelectedDivision('all')
  }

  const handleSetSelectedCounty = (county: string) => {
    setSelectedCounty(county)
    setSelectedDistrict('all')
    setSelectedDivision('all')
    
    // Also update region if county is selected
    if (county !== 'all') {
      const countyData = allCounties.find((c) => c.id === county)
      if (countyData) {
        const regionValue = countyData.region.toLowerCase().replace(' ', '-')
        setSelectedRegion(regionValue)
      }
    }
  }

  const handleSetSelectedDistrict = (district: string) => {
    setSelectedDistrict(district)
    setSelectedDivision('all')
  }

  const resetFilters = () => {
    setSelectedRegion('all')
    setSelectedCounty('all')
    setSelectedDistrict('all')
    setSelectedDivision('all')
  }

  const value = {
    selectedRegion,
    selectedCounty,
    selectedDistrict,
    selectedDivision,
    setSelectedRegion: handleSetSelectedRegion,
    setSelectedCounty: handleSetSelectedCounty,
    setSelectedDistrict: handleSetSelectedDistrict,
    setSelectedDivision,
    resetFilters
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}