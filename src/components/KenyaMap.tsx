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
      const rect = (event.currentTarget as HTMLElement).closest('svg')?.getBoundingClientRect()
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
      
      <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border" style={{ height: '500px' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 600"
          className="w-full h-full"
        >
          {/* Kenya country background with accurate shape */}
          <defs>
            <linearGradient id="kenyaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#00A651', stopOpacity:0.15}} />
              <stop offset="50%" style={{stopColor:'#00A651', stopOpacity:0.25}} />
              <stop offset="100%" style={{stopColor:'#00A651', stopOpacity:0.15}} />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Kenya country outline - more accurate shape */}
          <path
            d="M 75 85 
               C 85 75, 100 70, 120 65
               C 140 60, 160 55, 180 52
               C 200 48, 220 45, 240 42
               C 260 40, 280 38, 300 38
               C 320 38, 340 40, 355 45
               C 365 50, 372 58, 375 70
               C 378 85, 380 100, 382 120
               C 384 140, 385 160, 386 180
               C 387 200, 388 220, 388 240
               C 388 260, 387 280, 385 300
               C 383 320, 380 340, 376 360
               C 372 380, 367 400, 360 420
               C 353 440, 345 458, 335 475
               C 325 490, 312 502, 298 510
               C 284 518, 268 523, 252 526
               C 236 529, 220 530, 204 530
               C 188 530, 172 529, 157 526
               C 142 523, 128 518, 115 510
               C 103 502, 92 491, 83 478
               C 75 465, 69 450, 65 434
               C 61 418, 59 401, 58 384
               C 57 367, 57 350, 58 333
               C 59 316, 60 299, 62 282
               C 64 265, 66 248, 68 231
               C 70 214, 71 197, 72 180
               C 73 163, 73 146, 73 129
               C 73 112, 73 95, 74 87
               C 74.5 82, 75 85
               Z"
            fill="url(#kenyaGradient)"
            stroke="#00A651"
            strokeWidth="2"
            filter="url(#shadow)"
            opacity="0.8"
          />
          
          {/* Lake Victoria */}
          <ellipse
            cx="75"
            cy="280"
            rx="22"
            ry="35"
            fill="#2563eb"
            opacity="0.7"
          />
          
          {/* Lake Turkana */}
          <ellipse
            cx="150"
            cy="150"
            rx="12"
            ry="40"
            fill="#2563eb"
            opacity="0.7"
          />
          
          {/* Key Counties with accurate positioning */}
          
          {/* Nairobi - Central, Capital */}
          <g>
            <circle
              cx="210"
              cy="300"
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
            <text x="210" y="285" textAnchor="middle" className="fill-gray-900 text-sm font-bold pointer-events-none">
              NAIROBI
            </text>
          </g>
          
          {/* Kiambu - Central */}
          <g>
            <circle
              cx="195"
              cy="285"
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
            <text x="195" y="275" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Kiambu
            </text>
          </g>
          
          {/* Mombasa - Coast */}
          <g>
            <circle
              cx="340"
              cy="430"
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
            <text x="340" y="420" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Mombasa
            </text>
          </g>
          
          {/* Nakuru - Rift Valley */}
          <g>
            <circle
              cx="170"
              cy="260"
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
            <text x="170" y="250" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Nakuru
            </text>
          </g>
          
          {/* Kitui - Eastern (highlighted for filtering example) */}
          <g>
            <circle
              cx="270"
              cy="320"
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
            <text x="270" y="310" textAnchor="middle" className="fill-gray-900 text-xs font-medium pointer-events-none">
              Kitui
            </text>
          </g>
          
          {/* Machakos - Eastern */}
          <g>
            <circle
              cx="240"
              cy="320"
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
            <text x="240" y="310" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Machakos
            </text>
          </g>
          
          {/* Kakamega - Western */}
          <g>
            <circle
              cx="110"
              cy="250"
              r="7"
              fill={getCountyColor('kakamega')}
              stroke={getCountyStroke('kakamega')}
              strokeWidth={getCountyStrokeWidth('kakamega')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('kakamega', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('kakamega', e)}
              opacity={getCountyOpacity('kakamega')}
            />
            <text x="110" y="240" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Kakamega
            </text>
          </g>
          
          {/* Kisumu - Nyanza */}
          <g>
            <circle
              cx="90"
              cy="280"
              r="7"
              fill={getCountyColor('kisumu')}
              stroke={getCountyStroke('kisumu')}
              strokeWidth={getCountyStrokeWidth('kisumu')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('kisumu', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('kisumu', e)}
              opacity={getCountyOpacity('kisumu')}
            />
            <text x="90" y="270" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Kisumu
            </text>
          </g>
          
          {/* Eldoret/Uasin Gishu - Rift Valley */}
          <g>
            <circle
              cx="150"
              cy="220"
              r="7"
              fill={getCountyColor('uasin-gishu')}
              stroke={getCountyStroke('uasin-gishu')}
              strokeWidth={getCountyStrokeWidth('uasin-gishu')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('uasin-gishu', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('uasin-gishu', e)}
              opacity={getCountyOpacity('uasin-gishu')}
            />
            <text x="150" y="210" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Eldoret
            </text>
          </g>
          
          {/* Additional key counties */}
          {/* Turkana - North */}
          <g>
            <circle
              cx="150"
              cy="120"
              r="6"
              fill={getCountyColor('turkana')}
              stroke={getCountyStroke('turkana')}
              strokeWidth={getCountyStrokeWidth('turkana')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('turkana', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('turkana', e)}
              opacity={getCountyOpacity('turkana')}
            />
            <text x="150" y="110" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Turkana
            </text>
          </g>
          
          {/* Garissa - North Eastern */}
          <g>
            <circle
              cx="290"
              cy="250"
              r="6"
              fill={getCountyColor('garissa')}
              stroke={getCountyStroke('garissa')}
              strokeWidth={getCountyStrokeWidth('garissa')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('garissa', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('garissa', e)}
              opacity={getCountyOpacity('garissa')}
            />
            <text x="290" y="240" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Garissa
            </text>
          </g>
          
          {/* Meru - Eastern */}
          <g>
            <circle
              cx="260"
              cy="240"
              r="7"
              fill={getCountyColor('meru')}
              stroke={getCountyStroke('meru')}
              strokeWidth={getCountyStrokeWidth('meru')}
              className="cursor-pointer hover:stroke-safaricom-green transition-all"
              onMouseEnter={(e) => handleMouseEnter('meru', e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountyClick('meru', e)}
              opacity={getCountyOpacity('meru')}
            />
            <text x="260" y="230" textAnchor="middle" className="fill-gray-900 text-xs pointer-events-none">
              Meru
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
          <h4 className="text-sm font-medium text-gray-900 mb-2">Population & Performance</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-700">3M+ Population (Metro Areas)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-gray-700">2-3M Population (Major Cities)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3" style={{backgroundColor: '#00A651'}}></div>
              <span className="text-gray-700">1-2M Population (Large Counties)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-700 rounded-full"></div>
              <span className="text-gray-700">0.5-1M Population (Medium Counties)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Map Features</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 bg-blue-400 rounded"></div>
              <span>Lake Victoria & Lake Turkana</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 bg-green-100 border border-safaricom-green rounded"></div>
              <span>Kenya Country Boundaries</span>
            </div>
            <div>• Hover counties for detailed statistics</div>
            <div>• Circle size represents county importance</div>
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