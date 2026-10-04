import React, { useState } from 'react'
import { kenyaCountiesData } from '../data/kenyaCountiesData'

interface TooltipData {
  county: string
  citizens: number
  registered: number
  resolved: number
  resolutionRate: number
  x: number
  y: number
}

const KenyaMap: React.FC = () => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)

  const handleMouseEnter = (countyId: string, event: React.MouseEvent) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (county) {
      const rect = (event.currentTarget as HTMLElement).closest('svg')?.getBoundingClientRect()
      if (rect) {
        const resolutionRate = (county.resolved / Math.max(county.registered, 1)) * 100
        setTooltip({
          county: county.county,
          citizens: county.totalCitizens,
          registered: county.registered,
          resolved: county.resolved,
          resolutionRate,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        })
        setHoveredCounty(countyId)
      }
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
    setHoveredCounty(null)
  }

  const getCountyColor = (countyId: string) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (!county) return '#374151'
    
    // Color based on citizen population and activity
    const populationLevel = county.totalCitizens / 1000000 // in millions
    
    if (populationLevel >= 3) return '#dc2626' // High population - red (Nairobi area)
    if (populationLevel >= 2) return '#ea580c' // High-medium population - orange  
    if (populationLevel >= 1) return '#0891b2' // Medium population - blue
    if (populationLevel >= 0.5) return '#059669' // Low-medium population - green
    return '#6b7280' // Low population - gray
  }

  const getCountyOpacity = (countyId: string) => {
    const county = kenyaCountiesData.find(c => c.id === countyId)
    if (!county) return 0.3
    
    // Opacity based on registered users activity
    const activityLevel = county.registered / county.totalCitizens
    return Math.max(0.4, Math.min(1.0, activityLevel * 5 + 0.4))
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibent text-white mb-4">Performance by County</h3>
      
      <div className="relative bg-gray-750 rounded-lg p-4" style={{ height: '420px' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 380"
          className="w-full h-full"
        >
          {/* Kenya outline for context */}
          <path
            d="M 80 120 Q 90 100 120 90 Q 150 85 180 88 Q 220 90 260 95 Q 300 100 340 110 Q 380 125 400 150 Q 410 180 405 210 Q 400 240 385 265 Q 365 285 340 295 Q 300 305 260 308 Q 220 310 180 305 Q 140 300 110 285 Q 90 265 85 240 Q 80 200 80 170 Q 78 145 80 120 Z"
            fill="none"
            stroke="#4b5563"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.4"
          />
          
          {/* County representations as interactive regions */}
          
          {/* Nairobi - Central, largest city */}
          <g>
            <circle
              cx="250"
              cy="200"
              r="12"
              fill={getCountyColor('nairobi')}
              stroke="#1f2937"
              strokeWidth="1.5"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('nairobi', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'nairobi' ? 0.9 : getCountyOpacity('nairobi')}
            />
            <text x="250" y="225" textAnchor="middle" className="fill-white text-xs font-medium">
              Nairobi
            </text>
          </g>
          
          {/* Kiambu - Adjacent to Nairobi */}
          <g>
            <circle
              cx="235"
              cy="185"
              r="8"
              fill={getCountyColor('kiambu')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('kiambu', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'kiambu' ? 0.9 : getCountyOpacity('kiambu')}
            />
            <text x="235" y="175" textAnchor="middle" className="fill-white text-xs">
              Kiambu
            </text>
          </g>
          
          {/* Mombasa - Coast */}
          <g>
            <circle
              cx="380"
              cy="240"
              r="8"
              fill={getCountyColor('mombasa')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('mombasa', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'mombasa' ? 0.9 : getCountyOpacity('mombasa')}
            />
            <text x="380" y="255" textAnchor="middle" className="fill-white text-xs">
              Mombasa
            </text>
          </g>
          
          {/* Nakuru - Rift Valley */}
          <g>
            <circle
              cx="200"
              cy="170"
              r="8"
              fill={getCountyColor('nakuru')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('nakuru', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'nakuru' ? 0.9 : getCountyOpacity('nakuru')}
            />
            <text x="200" y="160" textAnchor="middle" className="fill-white text-xs">
              Nakuru
            </text>
          </g>
          
          {/* Machakos - Eastern */}
          <g>
            <circle
              cx="280"
              cy="210"
              r="7"
              fill={getCountyColor('machakos')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('machakos', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'machakos' ? 0.9 : getCountyOpacity('machakos')}
            />
            <text x="280" y="225" textAnchor="middle" className="fill-white text-xs">
              Machakos
            </text>
          </g>
          
          {/* Kakamega - Western */}
          <g>
            <circle
              cx="150"
              cy="160"
              r="7"
              fill={getCountyColor('kakamega')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('kakamega', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'kakamega' ? 0.9 : getCountyOpacity('kakamega')}
            />
            <text x="150" y="150" textAnchor="middle" className="fill-white text-xs">
              Kakamega
            </text>
          </g>
          
          {/* Kilifi - Coastal */}
          <g>
            <circle
              cx="360"
              cy="220"
              r="6"
              fill={getCountyColor('kilifi')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('kilifi', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'kilifi' ? 0.9 : getCountyOpacity('kilifi')}
            />
            <text x="360" y="210" textAnchor="middle" className="fill-white text-xs">
              Kilifi
            </text>
          </g>
          
          {/* Siaya - Western */}
          <g>
            <circle
              cx="130"
              cy="150"
              r="6"
              fill={getCountyColor('siaya')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('siaya', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'siaya' ? 0.9 : getCountyOpacity('siaya')}
            />
            <text x="130" y="140" textAnchor="middle" className="fill-white text-xs">
              Siaya
            </text>
          </g>
          
          {/* Bungoma - Western */}
          <g>
            <circle
              cx="140"
              cy="135"
              r="6"
              fill={getCountyColor('bungoma-south')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('bungoma-south', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'bungoma-south' ? 0.9 : getCountyOpacity('bungoma-south')}
            />
            <text x="140" y="125" textAnchor="middle" className="fill-white text-xs">
              Bungoma
            </text>
          </g>
          
          {/* Vihiga - Western */}
          <g>
            <circle
              cx="145"
              cy="155"
              r="5"
              fill={getCountyColor('vihiga')}
              stroke="#1f2937"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-white transition-all"
              onMouseEnter={(e) => handleMouseEnter('vihiga', e)}
              onMouseLeave={handleMouseLeave}
              opacity={hoveredCounty === 'vihiga' ? 0.9 : getCountyOpacity('vihiga')}
            />
            <text x="145" y="170" textAnchor="middle" className="fill-white text-xs">
              Vihiga
            </text>
          </g>
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm z-10 pointer-events-none shadow-lg"
            style={{
              left: Math.min(tooltip.x + 10, 400),
              top: Math.max(tooltip.y - 80, 10)
            }}
          >
            <div className="font-semibold text-white mb-2">{tooltip.county}</div>
            <div className="space-y-1">
              <div className="text-gray-300">Population: {tooltip.citizens.toLocaleString()}</div>
              <div className="text-blue-400">Registered: {tooltip.registered.toLocaleString()}</div>
              <div className="text-green-400">Resolved: {tooltip.resolved.toLocaleString()}</div>
              <div className="text-orange-400">Resolution Rate: {tooltip.resolutionRate.toFixed(1)}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Population Size</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-300">3M+ (Metro)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-gray-300">2-3M (Major)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-300">1-2M (Large)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-gray-300">0.5-1M (Medium)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Activity Level</h4>
          <div className="space-y-1 text-xs text-gray-300">
            <div>Circle opacity indicates user engagement</div>
            <div>Hover for detailed statistics</div>
            <div>Click counties for drill-down</div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-white">
            {kenyaCountiesData.length}
          </div>
          <div className="text-xs text-gray-400">Counties Tracked</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">
            {kenyaCountiesData.reduce((sum, county) => sum + county.resolved, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Total Resolved</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-400">
            {((kenyaCountiesData.reduce((sum, county) => sum + county.resolved, 0) / 
               Math.max(kenyaCountiesData.reduce((sum, county) => sum + county.registered, 0), 1)) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Avg Resolution Rate</div>
        </div>
      </div>
    </div>
  )
}

export default KenyaMap