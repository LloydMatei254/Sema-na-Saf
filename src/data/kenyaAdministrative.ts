// Complete Kenya Administrative Structure for Filtering

export interface County {
  id: string
  name: string
  capital: string
  region: string
  population: number
}

export interface District {
  id: string
  name: string
  countyId: string
  population: number
}

export interface Division {
  id: string
  name: string
  districtId: string
  population: number
}

// All 47 Counties in Kenya
export const allCounties: County[] = [
  // Nairobi Region
  { id: 'nairobi', name: 'Nairobi', capital: 'Nairobi', region: 'Nairobi', population: 4397073 },
  
  // Coast Region
  { id: 'mombasa', name: 'Mombasa', capital: 'Mombasa', region: 'Coast', population: 1208333 },
  { id: 'kwale', name: 'Kwale', capital: 'Kwale', region: 'Coast', population: 866820 },
  { id: 'kilifi', name: 'Kilifi', capital: 'Kilifi', region: 'Coast', population: 1453787 },
  { id: 'tana-river', name: 'Tana River', capital: 'Hola', region: 'Coast', population: 315943 },
  { id: 'lamu', name: 'Lamu', capital: 'Lamu', region: 'Coast', population: 143920 },
  { id: 'taita-taveta', name: 'Taita Taveta', capital: 'Voi', region: 'Coast', population: 340671 },
  
  // North Eastern Region
  { id: 'garissa', name: 'Garissa', capital: 'Garissa', region: 'North Eastern', population: 841353 },
  { id: 'wajir', name: 'Wajir', capital: 'Wajir', region: 'North Eastern', population: 781263 },
  { id: 'mandera', name: 'Mandera', capital: 'Mandera', region: 'North Eastern', population: 1025756 },
  
  // Eastern Region
  { id: 'marsabit', name: 'Marsabit', capital: 'Marsabit', region: 'Eastern', population: 459785 },
  { id: 'isiolo', name: 'Isiolo', capital: 'Isiolo', region: 'Eastern', population: 268002 },
  { id: 'meru', name: 'Meru', capital: 'Meru', region: 'Eastern', population: 1545714 },
  { id: 'tharaka-nithi', name: 'Tharaka Nithi', capital: 'Kathwana', region: 'Eastern', population: 393177 },
  { id: 'embu', name: 'Embu', capital: 'Embu', region: 'Eastern', population: 608599 },
  { id: 'kitui', name: 'Kitui', capital: 'Kitui', region: 'Eastern', population: 1136187 },
  { id: 'machakos', name: 'Machakos', capital: 'Machakos', region: 'Eastern', population: 1421932 },
  { id: 'makueni', name: 'Makueni', capital: 'Wote', region: 'Eastern', population: 987653 },
  
  // Central Region
  { id: 'nyandarua', name: 'Nyandarua', capital: 'Ol Kalou', region: 'Central', population: 638289 },
  { id: 'nyeri', name: 'Nyeri', capital: 'Nyeri', region: 'Central', population: 759164 },
  { id: 'kirinyaga', name: 'Kirinyaga', capital: 'Kerugoya', region: 'Central', population: 610411 },
  { id: 'muranga', name: 'Murang\'a', capital: 'Murang\'a', region: 'Central', population: 1056640 },
  { id: 'kiambu', name: 'Kiambu', capital: 'Kiambu', region: 'Central', population: 2417735 },
  
  // Rift Valley Region
  { id: 'turkana', name: 'Turkana', capital: 'Lodwar', region: 'Rift Valley', population: 926976 },
  { id: 'west-pokot', name: 'West Pokot', capital: 'Kapenguria', region: 'Rift Valley', population: 621241 },
  { id: 'samburu', name: 'Samburu', capital: 'Maralal', region: 'Rift Valley', population: 310327 },
  { id: 'trans-nzoia', name: 'Trans Nzoia', capital: 'Kitale', region: 'Rift Valley', population: 990341 },
  { id: 'uasin-gishu', name: 'Uasin Gishu', capital: 'Eldoret', region: 'Rift Valley', population: 1163186 },
  { id: 'elgeyo-marakwet', name: 'Elgeyo Marakwet', capital: 'Iten', region: 'Rift Valley', population: 454480 },
  { id: 'nandi', name: 'Nandi', capital: 'Kapsabet', region: 'Rift Valley', population: 885711 },
  { id: 'baringo', name: 'Baringo', capital: 'Kabarnet', region: 'Rift Valley', population: 666763 },
  { id: 'laikipia', name: 'Laikipia', capital: 'Rumuruti', region: 'Rift Valley', population: 518560 },
  { id: 'nakuru', name: 'Nakuru', capital: 'Nakuru', region: 'Rift Valley', population: 2162202 },
  { id: 'narok', name: 'Narok', capital: 'Narok', region: 'Rift Valley', population: 1157873 },
  { id: 'kajiado', name: 'Kajiado', capital: 'Kajiado', region: 'Rift Valley', population: 1117840 },
  { id: 'kericho', name: 'Kericho', capital: 'Kericho', region: 'Rift Valley', population: 901777 },
  { id: 'bomet', name: 'Bomet', capital: 'Bomet', region: 'Rift Valley', population: 875689 },
  
  // Western Region
  { id: 'kakamega', name: 'Kakamega', capital: 'Kakamega', region: 'Western', population: 1867579 },
  { id: 'vihiga', name: 'Vihiga', capital: 'Vihiga', region: 'Western', population: 590013 },
  { id: 'bungoma', name: 'Bungoma', capital: 'Bungoma', region: 'Western', population: 1670570 },
  { id: 'busia', name: 'Busia', capital: 'Busia', region: 'Western', population: 893681 },
  
  // Nyanza Region
  { id: 'siaya', name: 'Siaya', capital: 'Siaya', region: 'Nyanza', population: 993183 },
  { id: 'kisumu', name: 'Kisumu', capital: 'Kisumu', region: 'Nyanza', population: 1155574 },
  { id: 'homa-bay', name: 'Homa Bay', capital: 'Homa Bay', region: 'Nyanza', population: 1131950 },
  { id: 'migori', name: 'Migori', capital: 'Migori', region: 'Nyanza', population: 1116436 },
  { id: 'kisii', name: 'Kisii', capital: 'Kisii', region: 'Nyanza', population: 1266860 },
  { id: 'nyamira', name: 'Nyamira', capital: 'Nyamira', region: 'Nyanza', population: 605576 }
]

// Sample Districts (Major ones for each county)
export const allDistricts: District[] = [
  // Nairobi County Districts
  { id: 'nairobi-central', name: 'Nairobi Central', countyId: 'nairobi', population: 400000 },
  { id: 'westlands', name: 'Westlands', countyId: 'nairobi', population: 350000 },
  { id: 'kasarani', name: 'Kasarani', countyId: 'nairobi', population: 650000 },
  { id: 'embakasi', name: 'Embakasi', countyId: 'nairobi', population: 800000 },
  { id: 'kibra', name: 'Kibra', countyId: 'nairobi', population: 500000 },
  
  // Mombasa County Districts
  { id: 'mombasa-island', name: 'Mombasa Island', countyId: 'mombasa', population: 200000 },
  { id: 'changamwe', name: 'Changamwe', countyId: 'mombasa', population: 150000 },
  { id: 'kisauni', name: 'Kisauni', countyId: 'mombasa', population: 250000 },
  { id: 'likoni', name: 'Likoni', countyId: 'mombasa', population: 228000 },
  
  // Kiambu County Districts
  { id: 'kiambu-town', name: 'Kiambu Town', countyId: 'kiambu', population: 300000 },
  { id: 'thika', name: 'Thika', countyId: 'kiambu', population: 400000 },
  { id: 'limuru', name: 'Limuru', countyId: 'kiambu', population: 250000 },
  { id: 'ruiru', name: 'Ruiru', countyId: 'kiambu', population: 350000 },
  
  // Kitui County Districts
  { id: 'kitui-central', name: 'Kitui Central', countyId: 'kitui', population: 180000 },
  { id: 'kitui-west', name: 'Kitui West', countyId: 'kitui', population: 150000 },
  { id: 'kitui-south', name: 'Kitui South', countyId: 'kitui', population: 95000 },
  { id: 'kitui-east', name: 'Kitui East', countyId: 'kitui', population: 110000 },
  { id: 'mwingi-north', name: 'Mwingi North', countyId: 'kitui', population: 130000 },
  
  // Nakuru County Districts
  { id: 'nakuru-town', name: 'Nakuru Town', countyId: 'nakuru', population: 400000 },
  { id: 'naivasha', name: 'Naivasha', countyId: 'nakuru', population: 300000 },
  { id: 'gilgil', name: 'Gilgil', countyId: 'nakuru', population: 150000 },
  { id: 'molo', name: 'Molo', countyId: 'nakuru', population: 200000 },
  
  // Machakos County Districts
  { id: 'machakos-town', name: 'Machakos Town', countyId: 'machakos', population: 200000 },
  { id: 'kangundo', name: 'Kangundo', countyId: 'machakos', population: 150000 },
  { id: 'mavoko', name: 'Mavoko', countyId: 'machakos', population: 250000 },
  { id: 'yatta', name: 'Yatta', countyId: 'machakos', population: 160000 }
]

// Comprehensive Divisions
export const allDivisions: Division[] = [
  // Kitui South District Divisions
  { id: 'kitui-south-central', name: 'Kitui South Central', districtId: 'kitui-south', population: 25000 },
  { id: 'ikanga-kyatune', name: 'Ikanga/Kyatune', districtId: 'kitui-south', population: 20000 },
  { id: 'mutomo', name: 'Mutomo', districtId: 'kitui-south', population: 18000 },
  { id: 'ikutha', name: 'Ikutha', districtId: 'kitui-south', population: 16000 },
  { id: 'kanziko', name: 'Kanziko', districtId: 'kitui-south', population: 16000 },
  
  // Kitui Central District Divisions
  { id: 'township', name: 'Township', districtId: 'kitui-central', population: 45000 },
  { id: 'mulango', name: 'Mulango', districtId: 'kitui-central', population: 35000 },
  { id: 'kyuso', name: 'Kyuso', districtId: 'kitui-central', population: 30000 },
  { id: 'kisasi', name: 'Kisasi', districtId: 'kitui-central', population: 25000 },
  { id: 'lower-yatta', name: 'Lower Yatta', districtId: 'kitui-central', population: 45000 },
  
  // Nairobi Central District Divisions
  { id: 'central-business-district', name: 'Central Business District', districtId: 'nairobi-central', population: 50000 },
  { id: 'ngara', name: 'Ngara', districtId: 'nairobi-central', population: 80000 },
  { id: 'pangani', name: 'Pangani', districtId: 'nairobi-central', population: 70000 },
  { id: 'ziwani-kariokor', name: 'Ziwani/Kariokor', districtId: 'nairobi-central', population: 90000 },
  { id: 'landhies-road', name: 'Landhies Road', districtId: 'nairobi-central', population: 60000 },
  { id: 'nairobi-south', name: 'Nairobi South', districtId: 'nairobi-central', population: 50000 },
  
  // Westlands District Divisions
  { id: 'westlands-division', name: 'Westlands', districtId: 'westlands', population: 120000 },
  { id: 'parklands-highridge', name: 'Parklands/Highridge', districtId: 'westlands', population: 100000 },
  { id: 'karura', name: 'Karura', districtId: 'westlands', population: 80000 },
  { id: 'kitisuru', name: 'Kitisuru', districtId: 'westlands', population: 50000 },
  
  // Kasarani District Divisions
  { id: 'kasarani-division', name: 'Kasarani', districtId: 'kasarani', population: 150000 },
  { id: 'clay-city', name: 'Clay City', districtId: 'kasarani', population: 120000 },
  { id: 'mwiki', name: 'Mwiki', districtId: 'kasarani', population: 180000 },
  { id: 'roysambu', name: 'Roysambu', districtId: 'kasarani', population: 200000 },
  
  // Embakasi District Divisions
  { id: 'embakasi-central', name: 'Embakasi Central', districtId: 'embakasi', population: 200000 },
  { id: 'embakasi-east', name: 'Embakasi East', districtId: 'embakasi', population: 150000 },
  { id: 'embakasi-north', name: 'Embakasi North', districtId: 'embakasi', population: 180000 },
  { id: 'embakasi-south', name: 'Embakasi South', districtId: 'embakasi', population: 170000 },
  { id: 'embakasi-west', name: 'Embakasi West', districtId: 'embakasi', population: 100000 },
  
  // Mombasa Island District Divisions
  { id: 'mvita', name: 'Mvita', districtId: 'mombasa-island', population: 100000 },
  { id: 'tudor', name: 'Tudor', districtId: 'mombasa-island', population: 100000 },
  
  // Changamwe District Divisions
  { id: 'changamwe-division', name: 'Changamwe', districtId: 'changamwe', population: 75000 },
  { id: 'port-reitz', name: 'Port Reitz', districtId: 'changamwe', population: 75000 },
  
  // Kisauni District Divisions
  { id: 'kisauni-division', name: 'Kisauni', districtId: 'kisauni', population: 125000 },
  { id: 'mjambere', name: 'Mjambere', districtId: 'kisauni', population: 125000 }
]

// Filter options for the dashboard
export const filterOptions = {
  regions: [
    { value: 'all', label: 'All Regions' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'coast', label: 'Coast' },
    { value: 'north-eastern', label: 'North Eastern' },
    { value: 'eastern', label: 'Eastern' },
    { value: 'central', label: 'Central' },
    { value: 'rift-valley', label: 'Rift Valley' },
    { value: 'western', label: 'Western' },
    { value: 'nyanza', label: 'Nyanza' }
  ],
  counties: [
    { value: 'all', label: 'All Counties' },
    ...allCounties.map(county => ({
      value: county.id,
      label: county.name
    }))
  ]
}

// Helper functions
export const getCountiesByRegion = (region: string) => {
  if (region === 'all') return allCounties
  return allCounties.filter(county => 
    county.region.toLowerCase().replace(' ', '-') === region
  )
}

export const getDistrictsByCounty = (countyId: string) => {
  if (countyId === 'all') return allDistricts
  return allDistricts.filter(district => district.countyId === countyId)
}

export const getDivisionsByDistrict = (districtId: string) => {
  if (districtId === 'all') return allDivisions
  return allDivisions.filter(division => division.districtId === districtId)
}

// Get hierarchical path information
export const getLocationPath = (divisionId?: string, districtId?: string, countyId?: string) => {
  const path: { type: string, name: string, id: string }[] = []
  
  if (countyId) {
    const county = allCounties.find(c => c.id === countyId)
    if (county) {
      path.push({ type: 'county', name: county.name, id: county.id })
    }
  }
  
  if (districtId) {
    const district = allDistricts.find(d => d.id === districtId)
    if (district) {
      path.push({ type: 'district', name: district.name, id: district.id })
      if (!countyId) {
        const county = allCounties.find(c => c.id === district.countyId)
        if (county) {
          path.unshift({ type: 'county', name: county.name, id: county.id })
        }
      }
    }
  }
  
  if (divisionId) {
    const division = allDivisions.find(d => d.id === divisionId)
    if (division) {
      path.push({ type: 'division', name: division.name, id: division.id })
      if (!districtId) {
        const district = allDistricts.find(d => d.id === division.districtId)
        if (district) {
          path.splice(-1, 0, { type: 'district', name: district.name, id: district.id })
          if (!countyId) {
            const county = allCounties.find(c => c.id === district.countyId)
            if (county) {
              path.unshift({ type: 'county', name: county.name, id: county.id })
            }
          }
        }
      }
    }
  }
  
  return path
}

// Generate performance data for districts and divisions
export const generateDistrictData = (districtId: string) => {
  const district = allDistricts.find(d => d.id === districtId)
  if (!district) return null
  
  const registrationRate = 0.08 + Math.random() * 0.12
  const registered = Math.floor(district.population * registrationRate)
  const resolutionRate = 0.75 + Math.random() * 0.20
  const resolved = Math.floor(registered * resolutionRate)
  
  return {
    id: district.id,
    name: district.name,
    population: district.population,
    registered,
    resolved,
    unresolved: registered - resolved,
    resolutionRate: (resolved / registered) * 100,
    type: 'district'
  }
}

export const generateDivisionData = (divisionId: string) => {
  const division = allDivisions.find(d => d.id === divisionId)
  if (!division) return null
  
  const registrationRate = 0.06 + Math.random() * 0.14
  const registered = Math.floor(division.population * registrationRate)
  const resolutionRate = 0.70 + Math.random() * 0.25
  const resolved = Math.floor(registered * resolutionRate)
  
  return {
    id: division.id,
    name: division.name,
    population: division.population,
    registered,
    resolved,
    unresolved: registered - resolved,
    resolutionRate: (resolved / registered) * 100,
    type: 'division'
  }
}