'use client'

import { MONTH_INFO } from '@/types/teaching'
import type { ThematicMonth } from '@/types/teaching'

interface MonthOverviewProps {
  currentDay: number
  currentMonth: ThematicMonth
  completedDays: number[]
  onDayClick: (day: number) => void
}

export function MonthOverview({
  currentDay,
  currentMonth,
  completedDays,
  onDayClick,
}: MonthOverviewProps) {
  const monthInfo = MONTH_INFO[currentMonth]
  const [startDay, endDay] = monthInfo.dayRange
  const daysInMonth = endDay - startDay + 1

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-bodhi-text-faint">
          {monthInfo.label}
        </p>
        <p className="font-sans text-[10px] text-bodhi-text-faint">
          {completedDays.filter((d) => d >= startDay && d <= endDay).length} / {daysInMonth}
        </p>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {Array.from({ length: daysInMonth }, (_, i) => startDay + i).map((day) => {
          const isActive = day === currentDay
          const isCompleted = completedDays.includes(day)

          return (
            <button
              key={day}
              onClick={() => onDayClick(day)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-bodhi-saffron scale-150 ring-2 ring-bodhi-saffron/20'
                  : isCompleted
                    ? 'bg-bodhi-gold/60 hover:bg-bodhi-gold'
                    : 'bg-bodhi-text-faint/20 hover:bg-bodhi-text-faint/40'
              }`}
              aria-label={`Day ${day}${isCompleted ? ' (completed)' : ''}`}
              title={`Day ${day}`}
            />
          )
        })}
      </div>
    </div>
  )
}
