'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getJournalEntry,
  saveJournalEntry,
  getJournalHistory,
} from '@/lib/storage/localStorage'
import type { JournalEntry } from '@/types/teaching'

export function useJournal(day: number) {
  const currentYear = new Date().getFullYear()
  const [content, setContent] = useState('')
  const [history, setHistory] = useState<JournalEntry[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  // Load existing entry and history on mount / day change
  useEffect(() => {
    const existing = getJournalEntry(day, currentYear)
    if (existing) {
      setContent(existing.content)
      setLastSaved(existing.updatedAt)
    } else {
      setContent('')
      setLastSaved(null)
    }

    const allHistory = getJournalHistory(day)
    setHistory(allHistory)
  }, [day, currentYear])

  // Save journal entry
  const save = useCallback(() => {
    if (!content.trim()) return

    setIsSaving(true)
    const now = new Date().toISOString()
    const entry: JournalEntry = {
      day,
      date: now.split('T')[0],
      year: currentYear,
      content: content.trim(),
      updatedAt: now,
    }

    saveJournalEntry(entry)
    setLastSaved(now)
    setIsSaving(false)

    // Refresh history
    setHistory(getJournalHistory(day))
  }, [content, day, currentYear])

  // Auto-save after a debounce period
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  // Get entries from previous years for this same day
  const previousYearEntries = history.filter((e) => e.year !== currentYear)

  return {
    content,
    updateContent,
    save,
    isSaving,
    lastSaved,
    history,
    previousYearEntries,
    hasCurrentEntry: content.trim().length > 0,
  }
}
