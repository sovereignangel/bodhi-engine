'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface GraphLegendProps {
  className?: string
}

export function GraphLegend({ className = '' }: GraphLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const lenses = [
    { icon: '⚛', label: 'Physics', color: '#00d9ff' },
    { icon: '🧠', label: 'Cognitive Science', color: '#00ff88' },
    { icon: '🤖', label: 'AI / ML', color: '#ff6b6b' },
  ]

  const stages = Array.from({ length: 9 }, (_, i) => ({
    stage: i + 1,
    color: `rgb(${30 + i * 25}, ${30 + i * 25}, ${30 + i * 25})`,
  }))

  return (
    <div className={`absolute top-4 left-4 z-20 ${className}`}>
      {/* Lens Legend */}
      <div className="bg-bodhi-bg-mid/80 backdrop-blur-sm rounded-lg p-3 border border-bodhi-gold/20 mb-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Modern Lenses
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-2">
            {lenses.map((lens) => (
              <div key={lens.label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: lens.color }}
                />
                <span style={{ color: lens.color }} className="text-xs">
                  {lens.icon} {lens.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shamatha Progress Legend */}
      <div className="bg-bodhi-bg-mid/80 backdrop-blur-sm rounded-lg p-3 border border-bodhi-gold/20 hidden md:block">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Shamatha Progress
        </div>
        <div className="space-y-1">
          {stages.map(({ stage, color }) => (
            <div key={stage} className="flex items-center gap-2">
              <div
                className="w-4 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-gray-500">Stage {stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
