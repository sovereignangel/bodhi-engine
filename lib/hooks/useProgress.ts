'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getUserProgress,
  setUserProgress,
  getTodayISO,
  isToday,
  isYesterday,
} from '@/lib/storage/localStorage'
import type { UserProgress, ConceptEngagement, ShamathaSession } from '@/types/progress'
import type { LensType, NodeId } from '@/types/node'

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load progress on mount
  useEffect(() => {
    const loaded = getUserProgress()
    setProgress(loaded)
    setIsLoading(false)
  }, [])

  // Update streak based on activity
  const updateStreak = useCallback(() => {
    if (!progress) return

    const today = getTodayISO()
    const { lastActiveDate, current, longest, history } = progress.streak

    let newCurrent = current
    let newLongest = longest

    if (isToday(lastActiveDate)) {
      // Already active today, no change
      return
    } else if (isYesterday(lastActiveDate)) {
      // Consecutive day, increment streak
      newCurrent = current + 1
      newLongest = Math.max(newLongest, newCurrent)
    } else if (lastActiveDate) {
      // Streak broken, reset to 1
      newCurrent = 1
    } else {
      // First activity ever
      newCurrent = 1
    }

    // Update history (keep last 30 days)
    const newHistory = [...history, today].slice(-30)

    const updatedProgress = {
      ...progress,
      streak: {
        current: newCurrent,
        longest: newLongest,
        lastActiveDate: today,
        history: newHistory,
      },
    }

    setProgress(updatedProgress)
    setUserProgress(updatedProgress)
  }, [progress])

  // Record concept engagement
  const recordConceptView = useCallback(
    (conceptId: NodeId, lens?: LensType) => {
      if (!progress) return

      const today = getTodayISO()
      const existing = progress.conceptEngagement[conceptId]

      const lensesExplored = existing?.lensesExplored || []
      if (lens && !lensesExplored.includes(lens)) {
        lensesExplored.push(lens)
      }

      const engagement: ConceptEngagement = {
        firstViewed: existing?.firstViewed || today,
        lastViewed: today,
        totalTimeSeconds: (existing?.totalTimeSeconds || 0) + 1,
        viewCount: (existing?.viewCount || 0) + 1,
        lensesExplored,
      }

      const updatedProgress = {
        ...progress,
        conceptEngagement: {
          ...progress.conceptEngagement,
          [conceptId]: engagement,
        },
      }

      setProgress(updatedProgress)
      setUserProgress(updatedProgress)
      updateStreak()
    },
    [progress, updateStreak]
  )

  // Mark daily teaching as completed
  const completeDailyTeaching = useCallback(
    (day: number) => {
      if (!progress) return

      const today = getTodayISO()
      const completedDays = progress.dailyTeaching.completedDays.includes(day)
        ? progress.dailyTeaching.completedDays
        : [...progress.dailyTeaching.completedDays, day]

      const updatedProgress = {
        ...progress,
        dailyTeaching: {
          ...progress.dailyTeaching,
          completedDays,
          lastViewedDate: today,
        },
      }

      setProgress(updatedProgress)
      setUserProgress(updatedProgress)
      updateStreak()
    },
    [progress, updateStreak]
  )

  // Record a Shamatha session
  const recordShamathaSession = useCallback(
    (session: Omit<ShamathaSession, 'date'>) => {
      if (!progress) return

      const today = getTodayISO()
      const newSession: ShamathaSession = {
        ...session,
        date: today,
      }

      const updatedProgress = {
        ...progress,
        shamatha: {
          ...progress.shamatha,
          totalSessions: progress.shamatha.totalSessions + 1,
          totalMinutes: progress.shamatha.totalMinutes + session.durationMinutes,
          sessionHistory: [...progress.shamatha.sessionHistory, newSession].slice(-100),
        },
      }

      setProgress(updatedProgress)
      setUserProgress(updatedProgress)
      updateStreak()
    },
    [progress, updateStreak]
  )

  // Calculate concept coverage percentage
  const getConceptCoverage = useCallback(() => {
    if (!progress) return 0
    const totalConcepts = 14 // Total number of concepts in the knowledge graph
    const viewedConcepts = Object.keys(progress.conceptEngagement).length
    return Math.round((viewedConcepts / totalConcepts) * 100)
  }, [progress])

  return {
    progress,
    isLoading,
    updateStreak,
    recordConceptView,
    completeDailyTeaching,
    recordShamathaSession,
    getConceptCoverage,
  }
}
