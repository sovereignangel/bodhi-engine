'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getUserProgress, setUserProgress, getTodayISO } from '@/lib/storage/localStorage'
import { getStage, estimateStage } from '@/lib/data/shamathaStages'
import type { ShamathaProgress, ShamathaSession } from '@/types/progress'
import type { ShamathaStage } from '@/types/shamatha'

export function useShamatha() {
  const [progress, setProgress] = useState<ShamathaProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress.shamatha)
    setIsLoading(false)
  }, [])

  // Current stage info
  const currentStage: ShamathaStage | null = useMemo(() => {
    if (!progress) return null
    return getStage(progress.currentStage)
  }, [progress])

  // Record a new session
  const recordSession = useCallback(
    (session: Omit<ShamathaSession, 'date'>) => {
      if (!progress) return

      const today = getTodayISO()
      const newSession: ShamathaSession = {
        ...session,
        date: today,
      }

      const newHistory = [...progress.sessionHistory, newSession].slice(-100)
      const newProgress: ShamathaProgress = {
        ...progress,
        totalSessions: progress.totalSessions + 1,
        totalMinutes: progress.totalMinutes + session.durationMinutes,
        sessionHistory: newHistory,
      }

      // Update estimated stage based on new metrics
      const completionRate =
        newHistory.filter((s) => s.durationMinutes >= 5).length / newHistory.length
      const avgMinutes =
        newHistory.reduce((sum, s) => sum + s.durationMinutes, 0) / newHistory.length

      // Count unique days for streak estimate
      const uniqueDays = new Set(newHistory.map((s) => s.date)).size

      const estimatedStage = estimateStage({
        completionRate,
        averageSessionMinutes: avgMinutes,
        streakDays: uniqueDays,
        totalSessions: newProgress.totalSessions,
      })

      // Only advance stage, never decrease
      newProgress.currentStage = Math.max(progress.currentStage, estimatedStage)

      setProgress(newProgress)

      const userProgress = getUserProgress()
      setUserProgress({
        ...userProgress,
        shamatha: newProgress,
      })

      return newProgress
    },
    [progress]
  )

  // Get average session duration
  const averageSessionDuration = useMemo(() => {
    if (!progress || progress.sessionHistory.length === 0) return 0
    return Math.round(
      progress.sessionHistory.reduce((sum, s) => sum + s.durationMinutes, 0) /
        progress.sessionHistory.length
    )
  }, [progress])

  // Get average focus rating
  const averageFocusRating = useMemo((): string => {
    if (!progress || progress.sessionHistory.length === 0) return '0'
    return (
      progress.sessionHistory.reduce((sum, s) => sum + s.focusRating, 0) /
      progress.sessionHistory.length
    ).toFixed(1)
  }, [progress])

  // Get recent sessions (last 7 days)
  const recentSessions = useMemo(() => {
    if (!progress) return []
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const cutoff = sevenDaysAgo.toISOString().split('T')[0]
    return progress.sessionHistory.filter((s) => s.date >= cutoff)
  }, [progress])

  // Manually set stage (for user override)
  const setStage = useCallback(
    (stage: number) => {
      if (!progress) return

      const validStage = Math.max(1, Math.min(9, stage))
      const newProgress = { ...progress, currentStage: validStage }
      setProgress(newProgress)

      const userProgress = getUserProgress()
      setUserProgress({
        ...userProgress,
        shamatha: newProgress,
      })
    },
    [progress]
  )

  return {
    progress,
    currentStage,
    isLoading,
    recordSession,
    setStage,
    averageSessionDuration,
    averageFocusRating,
    recentSessions,
  }
}
