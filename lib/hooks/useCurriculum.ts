'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getUserProgress, setUserProgress, getTodayISO } from '@/lib/storage/localStorage'
import { getCurriculumEntry, getTotalEntries } from '@/lib/data/teachings/index'
import type { CurriculumEntry, CurriculumViewMode, ThematicMonth, Season, MONTH_INFO, SEASON_INFO } from '@/types/teaching'

export function useCurriculum() {
  const [currentDay, setCurrentDay] = useState(1)
  const [viewMode, setViewMode] = useState<CurriculumViewMode>('progressive')
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const progress = getUserProgress()
    const { curriculum } = progress

    // Calculate current day based on year start date
    const today = new Date()
    const startDate = curriculum.yearStartDate
      ? new Date(curriculum.yearStartDate)
      : today

    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    const calculatedDay = Math.min(Math.max((daysSinceStart % 365) + 1, 1), 365)

    setCurrentDay(calculatedDay)
    setViewMode(curriculum.viewMode || 'progressive')
    setCompletedDays(curriculum.completedDays || [])
    setIsLoading(false)
  }, [])

  // Get current teaching entry
  const entry: CurriculumEntry | null = useMemo(() => {
    if (isLoading) return null
    try {
      return getCurriculumEntry(currentDay)
    } catch {
      return null
    }
  }, [currentDay, isLoading])

  // Mark current day as completed
  const markDayCompleted = useCallback(() => {
    if (completedDays.includes(currentDay)) return

    const newCompletedDays = [...completedDays, currentDay]
    setCompletedDays(newCompletedDays)

    const progress = getUserProgress()
    setUserProgress({
      ...progress,
      curriculum: {
        ...progress.curriculum,
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

  // Navigate to specific day
  const goToDay = useCallback((day: number) => {
    const validDay = Math.max(1, Math.min(365, day))
    setCurrentDay(validDay)
  }, [])

  // Navigate forward/backward
  const goToNext = useCallback(() => {
    if (currentDay < 365) setCurrentDay(currentDay + 1)
  }, [currentDay])

  const goToPrevious = useCallback(() => {
    if (currentDay > 1) setCurrentDay(currentDay - 1)
  }, [currentDay])

  // Change view mode
  const changeViewMode = useCallback((mode: CurriculumViewMode) => {
    setViewMode(mode)
    const progress = getUserProgress()
    setUserProgress({
      ...progress,
      curriculum: {
        ...progress.curriculum,
        viewMode: mode,
      },
    })
  }, [])

  // Progress percentage
  const progressPercentage = useMemo(() => {
    return Math.round((completedDays.length / 365) * 100)
  }, [completedDays])

  // Total entries
  const totalDays = 365

  return {
    entry,
    currentDay,
    totalDays,
    viewMode,
    completedDays,
    isLoading,
    progressPercentage,
    markDayCompleted,
    isDayCompleted,
    goToDay,
    goToNext,
    goToPrevious,
    changeViewMode,
  }
}
