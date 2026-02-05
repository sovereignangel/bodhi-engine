'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getUserProgress, setUserProgress, getTodayISO } from '@/lib/storage/localStorage'
import { getTeaching, getScopeDisplayName, getScopeColor } from '@/lib/data/teachings'
import type { DailyTeaching, TeachingCycleInfo } from '@/types/teaching'

export function useDailyTeaching() {
  const [currentDay, setCurrentDay] = useState(1)
  const [cycleStartDate, setCycleStartDate] = useState<string>('')
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const progress = getUserProgress()
    const { dailyTeaching } = progress

    // Calculate current day based on cycle start date
    const today = new Date()
    const startDate = dailyTeaching.cycleStartDate
      ? new Date(dailyTeaching.cycleStartDate)
      : today

    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    const calculatedDay = (daysSinceStart % 21) + 1

    setCurrentDay(calculatedDay)
    setCycleStartDate(dailyTeaching.cycleStartDate || getTodayISO())
    setCompletedDays(dailyTeaching.completedDays || [])
    setIsLoading(false)
  }, [])

  // Get current teaching
  const teaching: DailyTeaching | null = useMemo(() => {
    if (isLoading) return null
    return getTeaching(currentDay)
  }, [currentDay, isLoading])

  // Get cycle info
  const cycleInfo: TeachingCycleInfo | null = useMemo(() => {
    if (isLoading || !teaching) return null

    const daysSinceStart = cycleStartDate
      ? Math.floor(
          (new Date().getTime() - new Date(cycleStartDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0
    const cycleNumber = Math.floor(daysSinceStart / 21) + 1

    return {
      currentDay,
      totalDays: 21,
      scope: teaching.scope,
      daysRemaining: 21 - currentDay,
      cycleNumber,
    }
  }, [currentDay, cycleStartDate, teaching, isLoading])

  // Mark current day as completed
  const markDayCompleted = useCallback(() => {
    if (completedDays.includes(currentDay)) return

    const newCompletedDays = [...completedDays, currentDay]
    setCompletedDays(newCompletedDays)

    const progress = getUserProgress()
    setUserProgress({
      ...progress,
      dailyTeaching: {
        ...progress.dailyTeaching,
        completedDays: newCompletedDays,
        lastViewedDate: getTodayISO(),
      },
    })
  }, [completedDays, currentDay])

  // Check if a day is completed
  const isDayCompleted = useCallback(
    (day: number) => completedDays.includes(day),
    [completedDays]
  )

  // Get progress percentage
  const progressPercentage = useMemo(() => {
    return Math.round((completedDays.length / 21) * 100)
  }, [completedDays])

  // Navigate to specific day (for review)
  const goToDay = useCallback((day: number) => {
    const validDay = Math.max(1, Math.min(21, day))
    setCurrentDay(validDay)
  }, [])

  return {
    teaching,
    cycleInfo,
    currentDay,
    completedDays,
    isLoading,
    markDayCompleted,
    isDayCompleted,
    progressPercentage,
    goToDay,
    getScopeDisplayName,
    getScopeColor,
  }
}
