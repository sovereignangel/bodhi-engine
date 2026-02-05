'use client'

import type { ShamathaStage } from '@/types/shamatha'
import { Check, AlertCircle, Lightbulb } from 'lucide-react'

interface ElephantStageProps {
  stage: ShamathaStage
  isCurrentStage: boolean
}

export function ElephantStage({ stage, isCurrentStage }: ElephantStageProps) {
  return (
    <div
      className={`thangka-card ${
        isCurrentStage ? 'ring-2 ring-bodhi-gold border-bodhi-gold/50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Stage {stage.stage}
            </span>
            {isCurrentStage && (
              <span className="text-xs bg-bodhi-gold/20 text-bodhi-gold px-2 py-0.5 rounded">
                Current
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mt-1">{stage.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-tibetan text-bodhi-gold">{stage.tibetan}</span>
            <span className="text-xs text-gray-500 italic">
              {stage.transliteration}
            </span>
          </div>
        </div>

        {/* Elephant icon */}
        <div className="relative">
          <svg width="60" height="45" viewBox="0 0 40 30">
            <ellipse cx="20" cy="18" rx="12" ry="8" fill={stage.elephant.color} />
            <circle cx="10" cy="12" r="6" fill={stage.elephant.color} />
            <path
              d="M6 14 Q4 20 6 26"
              stroke={stage.elephant.color}
              strokeWidth="2"
              fill="none"
            />
            <ellipse cx="28" cy="22" rx="3" ry="4" fill={stage.elephant.color} />
            <ellipse cx="14" cy="22" rx="2" ry="3" fill={stage.elephant.color} />
          </svg>
          {isCurrentStage && (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle, ${stage.elephant.color}30 0%, transparent 70%)`,
                transform: 'scale(1.3)',
              }}
            />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4">{stage.description}</p>

      {/* Phenomenology */}
      <div className="bg-bodhi-bg-dark/50 rounded-lg p-3 mb-4">
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          What you experience
        </h4>
        <p className="text-sm text-gray-400 italic">{stage.phenomenology}</p>
      </div>

      {/* Elephant Path symbolism */}
      <div className="text-xs text-gray-500 mb-4">
        <span className="text-bodhi-gold">Elephant Path:</span>{' '}
        {stage.elephant.monkeyActivity}
      </div>

      {/* Challenges */}
      <div className="mb-4">
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Challenges
        </h4>
        <ul className="space-y-1">
          {stage.challenges.map((challenge, i) => (
            <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-bodhi-red mt-1">-</span>
              {challenge}
            </li>
          ))}
        </ul>
      </div>

      {/* Practices */}
      <div>
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Recommended Practices
        </h4>
        <ul className="space-y-1">
          {stage.practices.map((practice, i) => (
            <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
              <Check className="w-4 h-4 text-bodhi-green mt-0.5 flex-shrink-0" />
              {practice}
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics proxy */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          Progress Indicator
        </h4>
        <p className="text-sm text-bodhi-cyan">{stage.metrics.description}</p>
      </div>
    </div>
  )
}
