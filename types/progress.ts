// User progress types for localStorage persistence

import type { LensType } from './node'
import type { CurriculumViewMode } from './teaching'

export interface UserProgress {
  version: number
  userId: string

  streak: StreakData
  dailyTeaching: DailyTeachingProgress
  curriculum: CurriculumProgress
  conceptEngagement: Record<string, ConceptEngagement>
  shamatha: ShamathaProgress
  preferences: UserPreferences
}

export interface StreakData {
  current: number
  longest: number
  lastActiveDate: string // ISO date string (YYYY-MM-DD)
  history: string[] // Last 30 days of activity dates
}

export interface DailyTeachingProgress {
  currentDay: number // 1-21 in cycle
  cycleStartDate: string // ISO date string
  completedDays: number[] // Array of completed day numbers
  lastViewedDate: string // ISO date string
}

export interface CurriculumProgress {
  currentDay: number // 1-365
  yearStartDate: string // When user started this year's cycle
  completedDays: number[] // Completed day numbers (1-365)
  lastViewedDate: string
  viewMode: CurriculumViewMode
}

export interface ConceptEngagement {
  firstViewed: string // ISO date string
  lastViewed: string // ISO date string
  totalTimeSeconds: number
  viewCount: number
  lensesExplored: LensType[]
}

export interface ShamathaProgress {
  currentStage: number // 1-9
  totalSessions: number
  totalMinutes: number
  sessionHistory: ShamathaSession[]
}

export interface ShamathaSession {
  date: string // ISO date string
  durationMinutes: number
  focusRating: number // 1-5 self-reported
  notes?: string
}

export interface UserPreferences {
  preferredLens: LensType | null
  notificationsEnabled: boolean
  theme: 'dark' // Only dark theme for now
}

// Default initial progress state
export const DEFAULT_USER_PROGRESS: UserProgress = {
  version: 2,
  userId: '',

  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: '',
    history: [],
  },

  dailyTeaching: {
    currentDay: 1,
    cycleStartDate: new Date().toISOString().split('T')[0],
    completedDays: [],
    lastViewedDate: '',
  },

  curriculum: {
    currentDay: 1,
    yearStartDate: new Date().toISOString().split('T')[0],
    completedDays: [],
    lastViewedDate: '',
    viewMode: 'progressive',
  },

  conceptEngagement: {},

  shamatha: {
    currentStage: 1,
    totalSessions: 0,
    totalMinutes: 0,
    sessionHistory: [],
  },

  preferences: {
    preferredLens: null,
    notificationsEnabled: false,
    theme: 'dark',
  },
}
