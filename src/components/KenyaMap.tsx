import React, { useState } from 'react'
import { kenyaCountiesData } from '../data/kenyaCountiesData'
import { getLocationPath } from '../data/kenyaAdministrative'

interface TooltipData {
  county: string
  citizens: number
  registered: number
  resolved: number
  resolutionRate: number
  x: number
  y: number
  region?: string
  path?: Array<{ type: string, name: string, id: string }>
}

interface KenyaMapProps {
  onCountyClick?: (countyId: string) => void
  selectedCounty?: string | null
}

const KenyaMap: React.FC<KenyaMapProps> = ({ onCountyClick, selectedCounty }) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)

  const handleMouseEnter = (countyId: string, event: React.MouseEvent) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (county) {
      const rect = (event.currentTarget as HTMLElement).closest('.relative')?.getBoundingClientRect()
      if (rect) {
        const resolutionRate = (county.resolved / Math.max(county.registered, 1)) * 100
        const locationPath = getLocationPath(undefined, undefined, countyId)
        
        setTooltip({
          county: county.county,
          citizens: county.totalCitizens,
          registered: county.registered,
          resolved: county.resolved,
          resolutionRate,
          region: county.region,
          path: locationPath,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        })
        setHoveredCounty(countyId)
      }
    }
  }

  const handleCountyClick = (countyId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (onCountyClick) {
      onCountyClick(countyId)
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
    setHoveredCounty(null)
  }

  const getCountyColor = (countyId: string) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (!county) return '#e5e7eb'
    
    // Color based on citizen population and activity for light theme
    const populationLevel = county.totalCitizens / 1000000 // in millions
    
    if (populationLevel >= 3) return '#dc2626' // High population - red (Nairobi area)
    if (populationLevel >= 2) return '#ea580c' // High-medium population - orange  
    if (populationLevel >= 1) return '#00A651' // Medium population - safaricom green
    if (populationLevel >= 0.5) return '#16a34a' // Low-medium population - dark green
    return '#6b7280' // Low population - gray
  }

  const getCountyStroke = (countyId: string) => {
    if (selectedCounty === countyId) return '#00A651'
    if (hoveredCounty === countyId) return '#00A651'
    return '#ffffff'
  }

  const getCountyStrokeWidth = (countyId: string) => {
    if (selectedCounty === countyId) return '4'
    if (hoveredCounty === countyId) return '3'
    return '2'
  }

  const getCountyOpacity = (countyId: string) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (!county) return 0.3
    
    if (selectedCounty === countyId) return 1.0
    if (hoveredCounty === countyId) return 0.9
    
    // Opacity based on registered users activity
    const activityLevel = county.registered / county.totalCitizens
    return Math.max(0.5, Math.min(0.8, activityLevel * 5 + 0.4))
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by County</h3>
      
      <div 
        className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border overflow-hidden" 
        style={{ height: '500px' }}
      >
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-green-300" />
        
        {/* Background Kenya Map Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('/images/kenya-map.jpg')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            filter: 'hue-rotate(15deg) saturate(1.1) sepia(0.2)'
          }}
          onError={(e) => {
            // Fallback to a solid green background if image fails to load
            e.currentTarget.style.display = 'none'
          }}
        />
        
        {/* Green overlay for Safaricom theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 to-green-200/40" />
        
        {/* Interactive SVG overlay for county interactions */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 500"
          className="w-full h-full relative z-10"
        >
          {/* Interactive county markers positioned over the background image */}
          {/* We'll keep the interactive circles but remove the SVG country outline */}
          
          {/* Nairobi - Central, Capital */}
          <g>
            <circle
              cx="200"
              cy="280"
              r="12"
              fill={getCountyColor('nairobi')}
              stroke={getCountyStroke('nairobi')}
              strokeWidth={getCountyStrokeWidth('nairobi')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('nairobi', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('nairobi', e)}
              opacity={getCountyOpacity('nairobi')}
            />
            <text x="200" y="265" textAnchor="middle" className="fill-gray-900 text-sm font-bold pointer-events-none">
              NAIROBI
            </text>
          </g>
          
          {/* Kiambu - Central */}
          <g>
            <circle
              cx="185"
              cy="265"
              r="8"
              fill={getCountyColor('kiambu')}
              stroke={getCountyStroke('kiambu')}
              strokeWidth={getCountyStrokeWidth('kiambu')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('kiambu', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('kiambu', e)}
              opacity={getCountyOpacity('kiambu')}
            />
            <text x="185" y="255" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Kiambu
            </text>
          </g>
          
          {/* Mombasa - Coast */}
          <g>
            <circle
              cx="320"
              cy="390"
              r="8"
              fill={getCountyColor('mombasa')}
              stroke={getCountyStroke('mombasa')}
              strokeWidth={getCountyStrokeWidth('mombasa')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('mombasa', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('mombasa', e)}
              opacity={getCountyOpacity('mombasa')}
            />
            <text x="320" y="380" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Mombasa
            </text>
          </g>
          
          {/* Nakuru - Rift Valley */}
          <g>
            <circle
              cx="150"
              cy="230"
              r="8"
              fill={getCountyColor('nakuru')}
              stroke={getCountyStroke('nakuru')}
              strokeWidth={getCountyStrokeWidth('nakuru')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('nakuru', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('nakuru', e)}
              opacity={getCountyOpacity('nakuru')}
            />
            <text x="150" y="220" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Nakuru
            </text>
          </g>
          
          {/* Kitui - Eastern (highlighted for filtering example) */}
          <g>
            <circle
              cx="250"
              cy="300"
              r="7"
              fill={getCountyColor('kitui')}
              stroke={getCountyStroke('kitui')}
              strokeWidth={getCountyStrokeWidth('kitui')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('kitui', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('kitui', e)}
              opacity={getCountyOpacity('kitui')}
            />
            <text x="250" y="290" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Kitui
            </text>
          </g>
          
          {/* Machakos - Eastern */}
          <g>
            <circle
              cx="220"
              cy="300"
              r="7"
              fill={getCountyColor('machakos')}
              stroke={getCountyStroke('machakos')}
              strokeWidth={getCountyStrokeWidth('machakos')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('machakos', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('machakos', e)}
              opacity={getCountyOpacity('machakos')}
            />
            <text x="220" y="290" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Machakos
            </text>
          </g>
          
          {/* Turkana - North */}
          <g>
            <circle
              cx="80"
              cy="80"
              r="8"
              fill={getCountyColor('turkana')}
              stroke={getCountyStroke('turkana')}
              strokeWidth={getCountyStrokeWidth('turkana')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('turkana', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('turkana', e)}
              opacity={getCountyOpacity('turkana')}
            />
            <text x="80" y="70" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Turkana
            </text>
          </g>
          
          {/* Marsabit - Eastern/Northern */}
          <g>
            <circle
              cx="180"
              cy="120"
              r="7"
              fill={getCountyColor('marsabit')}
              stroke={getCountyStroke('marsabit')}
              strokeWidth={getCountyStrokeWidth('marsabit')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('marsabit', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('marsabit', e)}
              opacity={getCountyOpacity('marsabit')}
            />
            <text x="180" y="110" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Marsabit
            </text>
          </g>
          
          {/* Mandera - North Eastern */}
          <g>
            <circle
              cx="300"
              cy="80"
              r="7"
              fill={getCountyColor('mandera')}
              stroke={getCountyStroke('mandera')}
              strokeWidth={getCountyStrokeWidth('mandera')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('mandera', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('mandera', e)}
              opacity={getCountyOpacity('mandera')}
            />
            <text x="300" y="70" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Mandera
            </text>
          </g>
          
          {/* Wajir - North Eastern */}
          <g>
            <circle
              cx="280"
              cy="150"
              r="7"
              fill={getCountyColor('wajir')}
              stroke={getCountyStroke('wajir')}
              strokeWidth={getCountyStrokeWidth('wajir')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('wajir', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('wajir', e)}
              opacity={getCountyOpacity('wajir')}
            />
            <text x="280" y="140" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Wajir
            </text>
          </g>
          
          {/* Isiolo - Eastern */}
          <g>
            <circle
              cx="220"
              cy="200"
              r="6"
              fill={getCountyColor('isiolo')}
              stroke={getCountyStroke('isiolo')}
              strokeWidth={getCountyStrokeWidth('isiolo')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('isiolo', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('isiolo', e)}
              opacity={getCountyOpacity('isiolo')}
            />
            <text x="220" y="190" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Isiolo
            </text>
          </g>
          
          {/* Samburu - Rift Valley */}
          <g>
            <circle
              cx="160"
              cy="180"
              r="6"
              fill={getCountyColor('samburu')}
              stroke={getCountyStroke('samburu')}
              strokeWidth={getCountyStrokeWidth('samburu')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('samburu', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('samburu', e)}
              opacity={getCountyOpacity('samburu')}
            />
            <text x="160" y="170" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Samburu
            </text>
          </g>
          
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg p-3 text-sm z-10 pointer-events-none shadow-lg"
            style={{
              left: Math.min(tooltip.x + 10, 300),
              top: Math.max(tooltip.y - 120, 10)
            }}
          >
            <div className="font-semibold text-gray-900 mb-2">{tooltip.county}</div>
            {tooltip.region && (
              <div className="text-xs text-gray-600 mb-2">Region: {tooltip.region}</div>
            )}
            {tooltip.path && tooltip.path.length > 0 && (
              <div className="text-xs text-blue-600 mb-2">
                Path: {tooltip.path.map(p => p.name).join(' → ')}
              </div>
            )}
            <div className="space-y-1">
              <div className="text-gray-700">Population: {tooltip.citizens.toLocaleString()}</div>
              <div className="text-blue-600">Registered: {tooltip.registered.toLocaleString()}</div>
              <div className="text-green-600">Resolved: {tooltip.resolved.toLocaleString()}</div>
              <div className="text-orange-600">Resolution Rate: {tooltip.resolutionRate.toFixed(1)}%</div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">Click to filter by this county</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Interactive Features</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-700">High Population Counties (3M+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-gray-700">Major Urban Centers (2-3M)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3" style={{backgroundColor: '#00A651'}}></div>
              <span className="text-gray-700">Medium Counties (1-2M)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-700 rounded-full"></div>
              <span className="text-gray-700">Smaller Counties (0.5-1M)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Map Features</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 bg-green-100 border border-safaricom-green rounded"></div>
              <span>Accurate Kenya boundaries from JPEG</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border-2 border-safaricom-green bg-white"></div>
              <span>Interactive county markers</span>
            </div>
            <div>• Click counties to filter dashboard data</div>
            <div>• Hover for detailed statistics</div>
            <div>• Green theme matches Safaricom branding</div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {kenyaCountiesData.length}
          </div>
          <div className="text-xs text-gray-500">Counties Tracked</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-600">
            {kenyaCountiesData.reduce((sum, county) => sum + county.resolved, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total Resolved</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-600">
            {((kenyaCountiesData.reduce((sum, county) => sum + county.resolved, 0) / 
               Math.max(kenyaCountiesData.reduce((sum, county) => sum + county.registered, 0), 1)) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Avg Resolution Rate</div>
        </div>
      </div>
    </div>
  )
}

export default KenyaMap