'use client'

import { shamathaStages } from '@/lib/data/shamathaStages'
import type { ShamathaStage } from '@/types/shamatha'

interface ShamathaTrackerProps {
  currentStage: number
  onStageClick?: (stage: number) => void
}

export function ShamathaTracker({ currentStage, onStageClick }: ShamathaTrackerProps) {
  return (
    <div className="thangka-card">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
        Shamatha Progress - Elephant Path
      </h3>

      {/* Elephant progression */}
      <div className="flex items-end justify-between gap-1 mb-6 px-2">
        {shamathaStages.map((stage) => {
          const isActive = stage.stage === currentStage
          const isPast = stage.stage < currentStage
          const isFuture = stage.stage > currentStage

          return (
            <button
              key={stage.stage}
              onClick={() => onStageClick?.(stage.stage)}
              className={`relative flex flex-col items-center transition-all ${
                isActive ? 'scale-110' : ''
              }`}
            >
              {/* Elephant */}
              <div
                className={`relative transition-all duration-300 ${
                  isFuture ? 'opacity-30' : ''
                }`}
              >
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 40 30"
                  className={isActive ? 'animate-pulse' : ''}
                >
                  {/* Elephant body */}
                  <ellipse
                    cx="20"
                    cy="18"
                    rx="12"
                    ry="8"
                    fill={stage.elephant.color}
                  />
                  {/* Head */}
                  <circle cx="10" cy="12" r="6" fill={stage.elephant.color} />
                  {/* Trunk */}
                  <path
                    d="M6 14 Q4 20 6 26"
                    stroke={stage.elephant.color}
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Back leg */}
                  <ellipse
                    cx="28"
                    cy="22"
                    rx="3"
                    ry="4"
                    fill={stage.elephant.color}
                  />
                  {/* Front leg */}
                  <ellipse
                    cx="14"
                    cy="22"
                    rx="2"
                    ry="3"
                    fill={stage.elephant.color}
                  />
                </svg>

                {/* Current stage glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${stage.elephant.color}40 0%, transparent 70%)`,
                      transform: 'scale(1.5)',
                    }}
                  />
                )}
              </div>

              {/* Stage number */}
              <div
                className={`text-xs mt-1 font-medium ${
                  isActive
                    ? 'text-bodhi-gold'
                    : isPast
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {stage.stage}
              </div>
            </button>
          )
        })}
      </div>

      {/* Current stage info */}
      <div className="bg-bodhi-bg-dark/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Current Stage
          </span>
          <span className="font-tibetan text-bodhi-gold">
            {shamathaStages[currentStage - 1]?.tibetan}
          </span>
        </div>
        <h4 className="text-lg font-semibold text-white mb-1">
          Stage {currentStage}: {shamathaStages[currentStage - 1]?.name}
        </h4>
        <p className="text-sm text-gray-400">
          {shamathaStages[currentStage - 1]?.description}
        </p>
      </div>
    </div>
  )
}
