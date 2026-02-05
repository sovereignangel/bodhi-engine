'use client'

import type { DailyTeaching as DailyTeachingType } from '@/types/teaching'
import { getScopeColor, getScopeDisplayName } from '@/lib/data/teachings'

interface DailyTeachingProps {
  teaching: DailyTeachingType
  onMarkComplete?: () => void
  isCompleted?: boolean
}

export function DailyTeaching({ teaching, onMarkComplete, isCompleted }: DailyTeachingProps) {
  const scopeColor = getScopeColor(teaching.scope)
  const scopeName = getScopeDisplayName(teaching.scope)

  return (
    <div className="thangka-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: scopeColor }}
          >
            {scopeName} &bull; Day {teaching.day}
          </span>
        </div>
        {isCompleted && (
          <span className="text-xs bg-bodhi-green/20 text-bodhi-green px-2 py-1 rounded">
            Completed
          </span>
        )}
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-1">{teaching.title}</h2>
        <div className="flex items-center gap-3">
          <span className="font-tibetan text-xl text-bodhi-gold">{teaching.tibetan}</span>
          <span className="text-sm text-gray-500 italic">{teaching.transliteration}</span>
        </div>
      </div>

      {/* Traditional teaching */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {teaching.traditional.source}
        </div>
        <blockquote className="text-lg text-gray-200 leading-relaxed italic border-l-4 border-bodhi-gold/30 pl-4 mb-4">
          "{teaching.traditional.text}"
        </blockquote>
        <p className="text-sm text-gray-400 leading-relaxed">
          {teaching.traditional.commentary}
        </p>
      </div>

      {/* Mark complete button */}
      {onMarkComplete && !isCompleted && (
        <button
          onClick={onMarkComplete}
          className="gold-button w-full"
        >
          Mark as Completed
        </button>
      )}
    </div>
  )
}
