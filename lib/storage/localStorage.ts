// localStorage wrapper with type safety and versioning

import { UserProgress, DEFAULT_USER_PROGRESS } from '@/types/progress'

import type { JournalEntry } from '@/types/teaching'

const STORAGE_KEYS = {
  USER_PROGRESS: 'bodhi_user_progress',
  SCHEMA_VERSION: 'bodhi_schema_version',
  JOURNAL_ENTRIES: 'bodhi_journal_entries',
} as const

const CURRENT_SCHEMA_VERSION = 2

// Generate a simple UUID for local user identity
function generateUserId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Check if we're in a browser environment
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

// Get user progress from localStorage
export function getUserProgress(): UserProgress {
  if (!isBrowser()) {
    return { ...DEFAULT_USER_PROGRESS, userId: generateUserId() }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS)
    if (!stored) {
      const newProgress = { ...DEFAULT_USER_PROGRESS, userId: generateUserId() }
      setUserProgress(newProgress)
      return newProgress
    }

    const parsed = JSON.parse(stored) as UserProgress

    // Handle schema migrations if needed
    if (parsed.version < CURRENT_SCHEMA_VERSION) {
      const migrated = migrateProgress(parsed)
      setUserProgress(migrated)
      return migrated
    }

    return parsed
  } catch (error) {
    console.error('Error reading user progress:', error)
    const newProgress = { ...DEFAULT_USER_PROGRESS, userId: generateUserId() }
    setUserProgress(newProgress)
    return newProgress
  }
}

// Save user progress to localStorage
export function setUserProgress(progress: UserProgress): void {
  if (!isBrowser()) return

  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving user progress:', error)
  }
}

// Update a specific part of user progress
export function updateUserProgress<K extends keyof UserProgress>(
  key: K,
  value: UserProgress[K]
): UserProgress {
  const current = getUserProgress()
  const updated = { ...current, [key]: value }
  setUserProgress(updated)
  return updated
}

// Migrate progress from older schema versions
function migrateProgress(progress: UserProgress): UserProgress {
  let migrated = { ...progress }

  // Version 0 -> 1 migration
  if (migrated.version < 1) {
    migrated = {
      ...DEFAULT_USER_PROGRESS,
      ...migrated,
      version: 1,
    }
  }

  // Version 1 -> 2 migration: add curriculum progress
  if (migrated.version < 2) {
    migrated = {
      ...migrated,
      curriculum: {
        currentDay: 1,
        yearStartDate: new Date().toISOString().split('T')[0],
        completedDays: [],
        lastViewedDate: '',
        viewMode: 'progressive',
      },
      version: 2,
    }
  }

  return migrated
}

// Clear all stored data (for testing/reset)
export function clearAllProgress(): void {
  if (!isBrowser()) return

  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS)
  localStorage.removeItem(STORAGE_KEYS.SCHEMA_VERSION)
  localStorage.removeItem(STORAGE_KEYS.JOURNAL_ENTRIES)
}

// ── Journal Entry Storage ──

function getAllJournalEntriesRaw(): JournalEntry[] {
  if (!isBrowser()) return []
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES)
    if (!stored) return []
    return JSON.parse(stored) as JournalEntry[]
  } catch {
    return []
  }
}

function saveAllJournalEntries(entries: JournalEntry[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries))
  } catch (error) {
    console.error('Error saving journal entries:', error)
  }
}

// Get a journal entry for a specific day and year
export function getJournalEntry(day: number, year: number): JournalEntry | null {
  const entries = getAllJournalEntriesRaw()
  return entries.find((e) => e.day === day && e.year === year) ?? null
}

// Save or update a journal entry
export function saveJournalEntry(entry: JournalEntry): void {
  const entries = getAllJournalEntriesRaw()
  const existingIndex = entries.findIndex(
    (e) => e.day === entry.day && e.year === entry.year
  )

  if (existingIndex >= 0) {
    entries[existingIndex] = entry
  } else {
    entries.push(entry)
  }

  saveAllJournalEntries(entries)
}

// Get all journal entries for a specific day across all years
export function getJournalHistory(day: number): JournalEntry[] {
  const entries = getAllJournalEntriesRaw()
  return entries
    .filter((e) => e.day === day)
    .sort((a, b) => b.year - a.year)
}

// Get all journal entries
export function getAllJournalEntries(): JournalEntry[] {
  return getAllJournalEntriesRaw().sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    return a.day - b.day
  })
}

// Get today's date in ISO format (YYYY-MM-DD)
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}

// Check if a date string is today
export function isToday(dateString: string): boolean {
  return dateString === getTodayISO()
}

// Check if a date string is yesterday
export function isYesterday(dateString: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateString === yesterday.toISOString().split('T')[0]
}
