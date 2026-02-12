'use client'

import { useState } from 'react'
import Link from 'next/link'
import { teachings, getTeaching, getScopeDisplayName } from '@/lib/data/teachings'

type LensKey = 'physics' | 'cogsci' | 'ai'

const lensLabels: Record<LensKey, string> = {
  physics: 'Physics',
  cogsci: 'Cognitive Science',
  ai: 'AI',
}

export default function DailyPage() {
  const [activeLens, setActiveLens] = useState<LensKey>('physics')
  const [currentDay, setCurrentDay] = useState(1)

  const teaching = getTeaching(currentDay)
  const scopeLabel = getScopeDisplayName(teaching.scope).toUpperCase()
  const totalDays = teachings.length

  const goToPrevious = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1)
      setActiveLens('physics')
    }
  }

  const goToNext = () => {
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1)
      setActiveLens('physics')
    }
  }

  return (
    <main className="min-h-screen bg-bodhi-bg-primary px-6 md:px-12 lg:px-16 py-12 md:py-16">

      {/* Header area */}
      <div className="max-w-[700px] mx-auto mb-12">
        <Link
          href="/"
          className="font-sans text-sm text-bodhi-text-tertiary hover:text-bodhi-gold transition-colors inline-block mb-8"
        >
          &larr; Home
        </Link>

        <p className="bodhi-label mb-2">DAILY TEACHING</p>
        <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-bodhi-text-tertiary">
          {scopeLabel} &middot; DAY {currentDay}
        </p>
      </div>

      {/* Main teaching */}
      <div className="max-w-[700px] mx-auto text-center mb-16">
        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary mb-3">
          {teaching.title}
        </h1>

        {/* Tibetan + transliteration */}
        <p className="font-tibetan text-sm text-bodhi-text-tertiary mb-1">
          {teaching.tibetan}
        </p>
        <p className="font-sans text-xs text-bodhi-text-faint italic tracking-wide">
          {teaching.transliteration}
        </p>

        {/* Gold separator */}
        <div className="w-[40px] h-[1px] bg-bodhi-saffron mx-auto my-8" />

        {/* Teaching text */}
        <p className="font-serif text-xl leading-[1.9] text-bodhi-text-secondary text-left">
          {teaching.traditional.text}
        </p>

        {/* Source */}
        <p className="font-serif text-sm italic text-bodhi-text-tertiary mt-4 text-left">
          &mdash; {teaching.traditional.source}
        </p>

        {/* Commentary */}
        <p className="font-sans text-base text-bodhi-text-secondary leading-relaxed mt-8 text-left">
          {teaching.traditional.commentary}
        </p>
      </div>

      {/* Scientific Lenses */}
      <div className="max-w-[700px] mx-auto mb-16">
        <p className="bodhi-label mb-4">LENSES</p>

        {/* Lens tabs */}
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

        {/* Active lens content */}
        <div className="animate-fade-in">
          <p className="font-sans text-base text-bodhi-text-secondary leading-relaxed">
            {teaching.lenses[activeLens].bridge}
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary mt-2 leading-relaxed">
            {teaching.lenses[activeLens].details}
          </p>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[700px] mx-auto mb-16">
        <div className="gold-border-left">
          <p className="bodhi-label mb-3">REFLECTION</p>
          <p className="font-serif text-lg italic text-bodhi-text-secondary leading-relaxed">
            {teaching.reflectionPrompt}
          </p>
        </div>
      </div>

      {/* Day navigation */}
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-between mb-8">
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

        {/* Teaching cycle dots */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => {
                setCurrentDay(day)
                setActiveLens('physics')
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                day === currentDay
                  ? 'bg-bodhi-saffron scale-125'
                  : 'bg-bodhi-text-faint/30 hover:bg-bodhi-text-faint/60'
              }`}
              aria-label={`Go to day ${day}`}
            />
          ))}
        </div>
      </div>

    </main>
  )
}
