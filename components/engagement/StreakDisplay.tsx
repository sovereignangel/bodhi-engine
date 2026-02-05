'use client'

import { Flame, TrendingUp } from 'lucide-react'

interface StreakDisplayProps {
  currentStreak: number
  longestStreak: number
  status: 'active' | 'at-risk' | 'broken'
  recentActivity: { date: string; active: boolean }[]
}

export function StreakDisplay({
  currentStreak,
  longestStreak,
  status,
  recentActivity,
}: StreakDisplayProps) {
  const statusColors = {
    active: 'text-bodhi-gold',
    'at-risk': 'text-yellow-500',
    broken: 'text-gray-500',
  }

  const statusMessages = {
    active: "You're on fire!",
    'at-risk': 'Practice today to keep your streak!',
    broken: 'Start a new streak today',
  }

  return (
    <div className="thangka-card">
      {/* Main streak display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-full ${
              status === 'active'
                ? 'bg-bodhi-gold/20'
                : status === 'at-risk'
                ? 'bg-yellow-500/20'
                : 'bg-gray-700/20'
            }`}
          >
            <Flame className={`w-6 h-6 ${statusColors[status]}`} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{currentStreak}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Day Streak
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Best: {longestStreak}</span>
          </div>
        </div>
      </div>

      {/* Status message */}
      <div
        className={`text-sm mb-4 ${
          status === 'at-risk' ? 'text-yellow-500' : 'text-gray-400'
        }`}
      >
        {statusMessages[status]}
      </div>

      {/* Activity grid (last 7 days) */}
      <div className="flex gap-1">
        {recentActivity.map(({ date, active }, i) => {
          const dayName = new Date(date).toLocaleDateString('en', {
            weekday: 'short',
          })
          const isToday = date === new Date().toISOString().split('T')[0]

          return (
            <div key={date} className="flex-1 text-center">
              <div
                className={`w-full aspect-square rounded-lg mb-1 flex items-center justify-center ${
                  active
                    ? 'bg-bodhi-gold'
                    : isToday
                    ? 'bg-bodhi-bg-light border-2 border-dashed border-bodhi-gold/50'
                    : 'bg-bodhi-bg-dark'
                }`}
              >
                {active && (
                  <Flame
                    className={`w-4 h-4 ${
                      active ? 'text-bodhi-bg-dark' : 'text-transparent'
                    }`}
                  />
                )}
              </div>
              <div
                className={`text-xs ${
                  isToday ? 'text-bodhi-gold font-medium' : 'text-gray-600'
                }`}
              >
                {dayName.charAt(0)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
