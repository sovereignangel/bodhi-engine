'use client'

import { BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getScopeColor } from '@/lib/data/teachings'

interface TopicProgressProps {
  currentDay: number
  completedDays: number[]
}

const scopeRanges = [
  { name: 'Foundation', start: 1, end: 2, scope: 'foundation' as const },
  { name: 'Small Scope', start: 3, end: 6, scope: 'small' as const },
  { name: 'Middle Scope', start: 7, end: 8, scope: 'middle' as const },
  { name: 'Great Scope', start: 9, end: 21, scope: 'great-method' as const },
]

export function TopicProgress({ currentDay, completedDays }: TopicProgressProps) {
  const totalCompleted = completedDays.length
  const percentage = Math.round((totalCompleted / 21) * 100)

  return (
    <div className="thangka-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-bodhi-pink" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Daily Teachings
          </h3>
        </div>
        <Link
          href="/daily"
          className="text-xs text-bodhi-gold hover:text-bodhi-gold/80 transition-colors flex items-center gap-1"
        >
          View Today
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Current day highlight */}
      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-bodhi-bg-dark/50">
        <div>
          <div className="text-xs text-gray-500">Today</div>
          <div className="text-lg font-semibold text-white">Day {currentDay}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Completed</div>
          <div className="text-lg font-semibold text-bodhi-green">
            {totalCompleted} / 21
          </div>
        </div>
      </div>

      {/* Scope progress bars */}
      <div className="space-y-3">
        {scopeRanges.map(({ name, start, end, scope }) => {
          const totalInScope = end - start + 1
          const completedInScope = completedDays.filter(
            (d) => d >= start && d <= end
          ).length
          const scopePercentage = Math.round((completedInScope / totalInScope) * 100)
          const color = getScopeColor(scope)
          const isCurrentScope = currentDay >= start && currentDay <= end

          return (
            <div key={name}>
              <div className="flex justify-between text-xs mb-1">
                <span
                  className={isCurrentScope ? 'text-white font-medium' : 'text-gray-500'}
                >
                  {name}
                </span>
                <span className="text-gray-500">
                  {completedInScope}/{totalInScope}
                </span>
              </div>
              <div className="h-2 bg-bodhi-bg-dark rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${scopePercentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall progress */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Overall Progress</span>
          <span className="text-lg font-bold text-white">{percentage}%</span>
        </div>
      </div>
    </div>
  )
}
