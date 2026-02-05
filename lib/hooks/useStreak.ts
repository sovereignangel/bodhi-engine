'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getUserProgress,
  setUserProgress,
  getTodayISO,
  isToday,
  isYesterday,
} from '@/lib/storage/localStorage'
import type { StreakData } from '@/types/progress'

export function useStreak() {
  const [streak, setStreak] = useState<StreakData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load streak data on mount
  useEffect(() => {
    const progress = getUserProgress()
    setStreak(progress.streak)
    setIsLoading(false)
  }, [])

  // Check and update streak status
  const checkStreak = useCallback(() => {
    if (!streak) return streak

    const today = getTodayISO()
    const { lastActiveDate } = streak

    // If already active today, no changes needed
    if (isToday(lastActiveDate)) {
      return streak
    }

    // If last active was yesterday, streak continues (but needs activity today)
    // If last active was earlier, streak is broken
    if (!isYesterday(lastActiveDate) && lastActiveDate) {
      // Streak was broken - reset current to 0
      const updatedStreak = {
        ...streak,
        current: 0,
      }
      return updatedStreak
    }

    return streak
  }, [streak])

  // Record activity (call this when user does something)
  const recordActivity = useCallback(() => {
    if (!streak) return

    const today = getTodayISO()
    const { lastActiveDate, current, longest, history } = streak

    // Already active today
    if (isToday(lastActiveDate)) {
      return streak
    }

    let newCurrent = current
    let newLongest = longest

    if (isYesterday(lastActiveDate)) {
      // Continuing streak
      newCurrent = current + 1
    } else if (lastActiveDate) {
      // Streak was broken, starting fresh
      newCurrent = 1
    } else {
      // First ever activity
      newCurrent = 1
    }

    newLongest = Math.max(newLongest, newCurrent)

    // Update history (keep last 30 days)
    const newHistory = [...history.filter((d) => d !== today), today].slice(-30)

    const updatedStreak: StreakData = {
      current: newCurrent,
      longest: newLongest,
      lastActiveDate: today,
      history: newHistory,
    }

    setStreak(updatedStreak)

    // Persist to localStorage
    const progress = getUserProgress()
    setUserProgress({
      ...progress,
      streak: updatedStreak,
    })

    return updatedStreak
  }, [streak])

  // Check if user was active on a specific date
  const wasActiveOn = useCallback(
    (date: string): boolean => {
      return streak?.history.includes(date) ?? false
    },
    [streak]
  )

  // Get activity for last N days
  const getRecentActivity = useCallback(
    (days: number = 7): { date: string; active: boolean }[] => {
      const result: { date: string; active: boolean }[] = []
      const today = new Date()

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        result.push({
          date: dateStr,
          active: wasActiveOn(dateStr),
        })
      }

      return result
    },
    [wasActiveOn]
  )

  // Calculate streak status
  const streakStatus = useCallback((): 'active' | 'at-risk' | 'broken' => {
    if (!streak) return 'broken'

    const { lastActiveDate } = streak

    if (isToday(lastActiveDate)) {
      return 'active'
    } else if (isYesterday(lastActiveDate)) {
      return 'at-risk'
    } else {
      return 'broken'
    }
  }, [streak])

  return {
    streak,
    isLoading,
    recordActivity,
    checkStreak,
    wasActiveOn,
    getRecentActivity,
    streakStatus,
  }
}
