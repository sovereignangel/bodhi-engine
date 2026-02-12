'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCurriculum } from '@/lib/hooks/useCurriculum'
import { MONTH_INFO, SEASON_INFO } from '@/types/teaching'
import { TRADITION_LABELS, SEASON_LABELS } from '@/lib/data/teachings/index'
import { ViewModeSwitcher } from '@/components/daily/ViewModeSwitcher'
import { MeditationGuide } from '@/components/daily/MeditationGuide'
import { LineageQuote } from '@/components/daily/LineageQuote'
import { JournalEntry } from '@/components/daily/JournalEntry'
import { MonthOverview } from '@/components/daily/MonthOverview'

type LensKey = 'physics' | 'cogsci' | 'ai'

const lensLabels: Record<LensKey, string> = {
  physics: 'Physics',
  cogsci: 'Cognitive Science',
  ai: 'AI',
}

export default function DailyPage() {
  const {
    entry,
    currentDay,
    totalDays,
    viewMode,
    completedDays,
    isLoading,
    progressPercentage,
    goToDay,
    goToNext,
    goToPrevious,
    changeViewMode,
    markDayCompleted,
  } = useCurriculum()

  const [activeLens, setActiveLens] = useState<LensKey>('physics')

  if (isLoading || !entry) {
    return (
      <main className="min-h-screen bg-bodhi-bg-primary flex items-center justify-center">
        <div className="animate-breathe">
          <p className="font-serif text-lg text-bodhi-text-tertiary">Loading teaching...</p>
        </div>
      </main>
    )
  }

  const monthInfo = MONTH_INFO[entry.month]
  const seasonInfo = SEASON_INFO[entry.season]
  const traditionLabel = TRADITION_LABELS[entry.tradition]

  return (
    <main className="min-h-screen bg-bodhi-bg-primary px-6 md:px-12 lg:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-[700px] mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="font-sans text-sm text-bodhi-text-tertiary hover:text-bodhi-gold transition-colors"
          >
            &larr; Home
          </Link>
          <ViewModeSwitcher current={viewMode} onChange={changeViewMode} />
        </div>

        {/* Day / Month / Season context */}
        <div className="space-y-1">
          <p className="bodhi-label">DAILY TEACHING</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-bodhi-text-tertiary">
              Day {currentDay} of {totalDays}
            </span>
            <span className="text-bodhi-text-faint">&middot;</span>
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-bodhi-gold/70">
              {monthInfo.label}
            </span>
            <span className="text-bodhi-text-faint">&middot;</span>
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-bodhi-text-faint">
              {seasonInfo.label}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-[2px] bg-bodhi-text-faint/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-bodhi-saffron/60 to-bodhi-gold transition-all duration-500"
              style={{ width: `${(currentDay / totalDays) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Teaching Title */}
      <div className="max-w-[700px] mx-auto text-center mb-12">
        {/* Tradition + Scope badges */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="scope-pill text-[10px]">{traditionLabel}</span>
          <span className="scope-pill text-[10px]">{monthInfo.subtitle}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary mb-3">
          {entry.title}
        </h1>

        <p className="font-tibetan text-sm text-bodhi-text-tertiary mb-1">
          {entry.tibetan}
        </p>
        <p className="font-sans text-xs text-bodhi-text-faint italic tracking-wide">
          {entry.transliteration}
        </p>

        {/* Gold separator */}
        <div className="w-[40px] h-[1px] bg-bodhi-saffron mx-auto my-8" />

        {/* Teaching text */}
        <p className="font-serif text-xl leading-[1.9] text-bodhi-text-secondary text-left">
          {entry.teaching.text}
        </p>

        {/* Source */}
        <p className="font-serif text-sm italic text-bodhi-text-tertiary mt-4 text-left">
          &mdash; {entry.teaching.source}
        </p>

        {/* Commentary */}
        <p className="font-sans text-base text-bodhi-text-secondary leading-relaxed mt-6 text-left">
          {entry.teaching.commentary}
        </p>
      </div>

      {/* Scientific Lenses */}
      <div className="max-w-[700px] mx-auto mb-12">
        <p className="bodhi-label mb-4">LENSES</p>

        <div className="flex gap-2 mb-6">
          {(Object.keys(lensLabels) as LensKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveLens(key)}
              className={activeLens === key ? 'lens-tab-active' : 'lens-tab'}
            >
              {lensLabels[key]}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          <p className="font-sans text-base text-bodhi-text-secondary leading-relaxed">
            {entry.lenses[activeLens].bridge}
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary mt-2 leading-relaxed">
            {entry.lenses[activeLens].details}
          </p>
        </div>
      </div>

      {/* Meditation Guide */}
      <div className="max-w-[700px] mx-auto mb-12">
        <MeditationGuide meditation={entry.meditation} />
      </div>

      {/* Lineage Quote */}
      <div className="max-w-[700px] mx-auto mb-12">
        <p className="bodhi-label mb-4">FROM THE LINEAGE</p>
        <LineageQuote citation={entry.citation} />
      </div>

      {/* Journal Entry */}
      <div className="max-w-[700px] mx-auto mb-12">
        <JournalEntry day={currentDay} prompt={entry.journalPrompt} />
      </div>

      {/* Reflection Prompt */}
      <div className="max-w-[700px] mx-auto mb-12">
        <div className="gold-border-left">
          <p className="bodhi-label mb-3">REFLECTION</p>
          <p className="font-serif text-lg italic text-bodhi-text-secondary leading-relaxed">
            {entry.reflectionPrompt}
          </p>
        </div>
      </div>

      {/* Mark Complete */}
      <div className="max-w-[700px] mx-auto mb-12 text-center">
        <button
          onClick={markDayCompleted}
          className={`gold-button px-8 ${
            completedDays.includes(currentDay) ? 'opacity-50 cursor-default' : ''
          }`}
          disabled={completedDays.includes(currentDay)}
        >
          {completedDays.includes(currentDay)
            ? 'Day Completed'
            : 'Mark Day as Complete'}
        </button>
      </div>

      {/* Month Overview */}
      <div className="max-w-[700px] mx-auto mb-8">
        <MonthOverview
          currentDay={currentDay}
          currentMonth={entry.month}
          completedDays={completedDays}
          onDayClick={goToDay}
        />
      </div>

      {/* Day Navigation */}
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentDay <= 1}
            className={`ghost-button ${
              currentDay <= 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            &larr; Previous
          </button>
          <span className="font-sans text-sm text-bodhi-text-tertiary">
            {currentDay} / {totalDays}
          </span>
          <button
            onClick={goToNext}
            disabled={currentDay >= totalDays}
            className={`ghost-button ${
              currentDay >= totalDays ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </main>
  )
}
