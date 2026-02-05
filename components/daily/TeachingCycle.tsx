'use client'

import { useMemo } from 'react'
import type { TeachingScope } from '@/types/teaching'

interface TeachingCycleProps {
  currentDay: number
  completedDays: number[]
  onDayClick?: (day: number) => void
}

const scopeRanges: { scope: TeachingScope; start: number; end: number; color: string }[] = [
  { scope: 'foundation', start: 1, end: 2, color: '#ffd369' },
  { scope: 'small', start: 3, end: 6, color: '#e94560' },
  { scope: 'middle', start: 7, end: 8, color: '#00d9ff' },
  { scope: 'great-method', start: 9, end: 20, color: '#ff6b6b' },
  { scope: 'great-wisdom', start: 21, end: 21, color: '#00d9ff' },
]

function getScopeForDay(day: number): TeachingScope {
  const range = scopeRanges.find((r) => day >= r.start && day <= r.end)
  return range?.scope || 'foundation'
}

function getColorForDay(day: number): string {
  const range = scopeRanges.find((r) => day >= r.start && day <= r.end)
  return range?.color || '#ffd369'
}

export function TeachingCycle({ currentDay, completedDays, onDayClick }: TeachingCycleProps) {
  const days = useMemo(() => Array.from({ length: 21 }, (_, i) => i + 1), [])

  // Calculate SVG circle parameters
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const center = 100

  return (
    <div className="thangka-card">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
        21-Day Cycle
      </h3>

      <div className="relative flex items-center justify-center">
        {/* Circular progress */}
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="12"
          />

          {/* Progress segments */}
          {days.map((day) => {
            const isCompleted = completedDays.includes(day)
            const isCurrent = day === currentDay
            const color = getColorForDay(day)

            const segmentLength = circumference / 21
            const offset = circumference - (day - 1) * segmentLength

            return (
              <circle
                key={day}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={isCompleted ? color : isCurrent ? color : '#333'}
                strokeWidth={isCurrent ? '14' : '12'}
                strokeDasharray={`${segmentLength * 0.8} ${circumference - segmentLength * 0.8}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={`transition-all duration-300 ${
                  isCurrent ? 'opacity-100' : isCompleted ? 'opacity-80' : 'opacity-30'
                }`}
                style={{
                  filter: isCurrent ? `drop-shadow(0 0 6px ${color})` : undefined,
                }}
              />
            )
          })}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-bodhi-gold">{currentDay}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">of 21</div>
        </div>
      </div>

      {/* Day grid */}
      <div className="mt-4 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCompleted = completedDays.includes(day)
          const isCurrent = day === currentDay
          const color = getColorForDay(day)

          return (
            <button
              key={day}
              onClick={() => onDayClick?.(day)}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all ${
                isCurrent
                  ? 'ring-2 ring-offset-2 ring-offset-bodhi-bg-mid ring-bodhi-gold'
                  : ''
              } ${
                isCompleted
                  ? 'bg-opacity-80'
                  : 'bg-bodhi-bg-dark hover:bg-bodhi-bg-light'
              }`}
              style={{
                backgroundColor: isCompleted || isCurrent ? color : undefined,
                color: isCompleted || isCurrent ? '#0a0a0f' : '#666',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Scope legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {scopeRanges.map(({ scope, color }) => (
          <div key={scope} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-500 capitalize">
              {scope.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
