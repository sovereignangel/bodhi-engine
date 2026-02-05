'use client'

import { useState } from 'react'
import type { LensType } from '@/types/node'
import type { LensContent } from '@/types/teaching'

interface ScientificLensProps {
  lenses: {
    physics: LensContent
    cogsci: LensContent
    ai: LensContent
  }
  defaultLens?: LensType
}

const lensConfig: Record<LensType, { icon: string; label: string; color: string }> = {
  physics: { icon: '⚛', label: 'Physics', color: '#00d9ff' },
  cogsci: { icon: '🧠', label: 'CogSci', color: '#00ff88' },
  ai: { icon: '🤖', label: 'AI', color: '#ff6b6b' },
}

export function ScientificLens({ lenses, defaultLens = 'physics' }: ScientificLensProps) {
  const [activeLens, setActiveLens] = useState<LensType>(defaultLens)

  const currentLens = lenses[activeLens]
  const config = lensConfig[activeLens]

  return (
    <div className="thangka-card">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
        Scientific Bridges
      </h3>

      {/* Lens tabs */}
      <div className="flex gap-2 mb-4">
        {(Object.keys(lensConfig) as LensType[]).map((lens) => {
          const { icon, label, color } = lensConfig[lens]
          const isActive = lens === activeLens

          return (
            <button
              key={lens}
              onClick={() => setActiveLens(lens)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-bodhi-bg-light'
                  : 'bg-transparent hover:bg-bodhi-bg-light/50'
              }`}
              style={{ color: isActive ? color : '#888' }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Lens content */}
      <div
        className="p-4 rounded-lg bg-bodhi-bg-dark/50 border-l-4"
        style={{ borderColor: config.color }}
      >
        <p className="text-base text-gray-200 leading-relaxed mb-3">
          {currentLens.bridge}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          {currentLens.details}
        </p>
        {currentLens.source && (
          <p className="text-xs text-gray-500 mt-3 italic">
            Source: {currentLens.source}
          </p>
        )}
      </div>
    </div>
  )
}
