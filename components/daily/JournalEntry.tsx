'use client'

import { useState, useEffect, useRef } from 'react'
import { BookOpen, Save, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useJournal } from '@/lib/hooks/useJournal'

interface JournalEntryProps {
  day: number
  prompt: string
}

export function JournalEntry({ day, prompt }: JournalEntryProps) {
  const {
    content,
    updateContent,
    save,
    isSaving,
    lastSaved,
    previousYearEntries,
  } = useJournal(day)

  const [showHistory, setShowHistory] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-save after 2 seconds of inactivity
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    if (content.trim()) {
      saveTimeoutRef.current = setTimeout(() => {
        save()
      }, 2000)
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [content, save])

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      {/* Journal prompt */}
      <div className="flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-bodhi-gold mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-bodhi-gold mb-2">
            Journal
          </p>
          <p className="font-serif text-base italic text-bodhi-text-secondary leading-relaxed">
            {prompt}
          </p>
        </div>
      </div>

      {/* Text area */}
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          placeholder="Write your reflection..."
          className="w-full bg-bodhi-bg-primary/50 border border-bodhi-text-faint/10 rounded-lg p-4 text-bodhi-text-secondary text-sm font-sans leading-relaxed resize-none outline-none placeholder:text-bodhi-text-faint/50 min-h-[160px] focus:border-bodhi-saffron/30 transition-colors"
        />

        {/* Save status */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-bodhi-text-faint font-sans">
            Your reflections are saved locally and never leave your device.
          </p>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-[10px] text-bodhi-text-faint flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Saved {formatDate(lastSaved)}
              </span>
            )}
            <button
              onClick={save}
              disabled={isSaving || !content.trim()}
              className="flex items-center gap-1 text-xs text-bodhi-gold hover:text-bodhi-gold-light transition-colors disabled:opacity-30"
            >
              <Save className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Previous year entries */}
      {previousYearEntries.length > 0 && (
        <div className="border-t border-bodhi-text-faint/10 pt-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-xs text-bodhi-text-tertiary hover:text-bodhi-gold transition-colors"
          >
            {showHistory ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
            {previousYearEntries.length} previous{' '}
            {previousYearEntries.length === 1 ? 'entry' : 'entries'} for this day
          </button>

          {showHistory && (
            <div className="mt-3 space-y-3">
              {previousYearEntries.map((entry) => (
                <div
                  key={`${entry.day}-${entry.year}`}
                  className="pl-4 border-l border-bodhi-text-faint/20"
                >
                  <p className="text-[10px] text-bodhi-text-faint font-sans mb-1">
                    {entry.year} &middot; {formatDate(entry.date)}
                  </p>
                  <p className="text-sm text-bodhi-text-tertiary leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
