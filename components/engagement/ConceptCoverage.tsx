'use client'

import { Map } from 'lucide-react'
import Link from 'next/link'
import { allNodeIds } from '@/lib/data/nodeData'

interface ConceptCoverageProps {
  engagedConcepts: string[]
}

export function ConceptCoverage({ engagedConcepts }: ConceptCoverageProps) {
  const totalConcepts = allNodeIds.length
  const engaged = engagedConcepts.length
  const percentage = Math.round((engaged / totalConcepts) * 100)

  return (
    <div className="thangka-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-bodhi-cyan" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Knowledge Coverage
          </h3>
        </div>
        <Link
          href="/graph"
          className="text-xs text-bodhi-gold hover:text-bodhi-gold/80 transition-colors"
        >
          View Graph
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Concepts Explored</span>
          <span className="text-white font-medium">
            {engaged} / {totalConcepts}
          </span>
        </div>
        <div className="h-3 bg-bodhi-bg-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bodhi-cyan to-bodhi-green transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Percentage */}
      <div className="text-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-gray-500 text-sm ml-1">complete</span>
      </div>

      {/* Mini concept grid */}
      <div className="mt-4 grid grid-cols-7 gap-1">
        {allNodeIds.map((id) => {
          const isEngaged = engagedConcepts.includes(id)
          return (
            <div
              key={id}
              className={`aspect-square rounded-sm ${
                isEngaged ? 'bg-bodhi-green' : 'bg-bodhi-bg-dark'
              }`}
              title={id}
            />
          )
        })}
      </div>
    </div>
  )
}
