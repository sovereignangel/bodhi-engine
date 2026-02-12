'use client'

import { useState } from 'react'
import { Timer, ChevronDown, ChevronUp } from 'lucide-react'
import type { MeditationInstruction } from '@/types/teaching'

interface MeditationGuideProps {
  meditation: MeditationInstruction
}

export function MeditationGuide({ meditation }: MeditationGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border border-bodhi-text-faint/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-bodhi-saffron/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Timer className="w-4 h-4 text-bodhi-gold" />
          <div>
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-bodhi-gold">
              Today&rsquo;s Practice
            </span>
            <span className="font-sans text-xs text-bodhi-text-tertiary ml-3">
              {meditation.duration}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-bodhi-text-tertiary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-bodhi-text-tertiary" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="border-t border-bodhi-text-faint/10 pt-4">
            {/* Posture */}
            <div className="mb-4">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-bodhi-text-faint mb-1">
                Posture
              </p>
              <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                {meditation.posture}
              </p>
            </div>

            {/* Method */}
            <div className="mb-4">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-bodhi-text-faint mb-1">
                Method
              </p>
              <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed whitespace-pre-line">
                {meditation.method}
              </p>
            </div>

            {/* Closing Dedication */}
            {meditation.closingDedication && (
              <div className="mt-4 pt-4 border-t border-bodhi-text-faint/10">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-bodhi-text-faint mb-1">
                  Dedication
                </p>
                <p className="font-serif text-sm italic text-bodhi-text-tertiary leading-relaxed">
                  {meditation.closingDedication}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
