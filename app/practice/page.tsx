'use client'

import { useState } from 'react'
import Link from 'next/link'
import { shamathaStages, getStage } from '@/lib/data/shamathaStages'

// Simple elephant SVG for path nodes
function ElephantNode({
  color,
  selected,
  size = 48,
}: {
  color: string
  selected: boolean
  size?: number
}) {
  // Determine if elephant color is very light (needs a visible outline)
  const isLight =
    color === '#ffffff' || color === '#eeeeee' || color === '#cccccc'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring - gold when selected */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke={selected ? '#B8860B' : isLight ? '#ddd' : 'transparent'}
        strokeWidth={selected ? 2.5 : 1}
        fill="none"
      />
      {/* Elephant body circle */}
      <circle cx="24" cy="24" r="18" fill={color} />
      {/* Minimal elephant silhouette */}
      <g opacity={isLight ? 0.25 : 0.5}>
        {/* Body */}
        <ellipse cx="24" cy="26" rx="8" ry="6" fill={isLight ? '#999' : '#fff'} />
        {/* Head */}
        <circle cx="18" cy="22" r="4.5" fill={isLight ? '#999' : '#fff'} />
        {/* Trunk */}
        <path
          d="M14 23 C12 25, 11 28, 12 30"
          stroke={isLight ? '#999' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ear */}
        <ellipse cx="19" cy="20" rx="2" ry="3" fill={isLight ? '#999' : '#fff'} opacity="0.6" />
        {/* Legs */}
        <line x1="20" y1="31" x2="20" y2="35" stroke={isLight ? '#999' : '#fff'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="31" x2="28" y2="35" stroke={isLight ? '#999' : '#fff'} strokeWidth="1.5" strokeLinecap="round" />
        {/* Tail */}
        <path
          d="M32 26 C34 25, 35 27, 34 29"
          stroke={isLight ? '#999' : '#fff'}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

export default function PracticePage() {
  const [selectedStage, setSelectedStage] = useState(1)
  const [showLogForm, setShowLogForm] = useState(false)
  const [focusRating, setFocusRating] = useState(0)
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  const stage = getStage(selectedStage)

  const handleSave = () => {
    // Placeholder: would save to backend/local storage
    setShowLogForm(false)
    setFocusRating(0)
    setDuration('')
    setNotes('')
  }

  const handleCancel = () => {
    setShowLogForm(false)
    setFocusRating(0)
    setDuration('')
    setNotes('')
  }

  return (
    <main className="min-h-screen bg-bodhi-bg-primary">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 max-w-[900px] mx-auto">
        <Link
          href="/"
          className="font-sans text-sm text-bodhi-text-tertiary hover:text-bodhi-gold transition-colors inline-block mb-8"
        >
          &larr; Home
        </Link>

        <p className="bodhi-label mb-2">PRACTICE</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary mb-3">
          The Elephant Path
        </h1>
        <p className="font-sans text-base text-bodhi-text-tertiary leading-relaxed">
          Nine stages of calm abiding meditation
        </p>
      </div>

      {/* Elephant Path Visualization */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px] mx-auto mb-12">
        <div className="bodhi-card">
          {/* Horizontally scrollable elephant row */}
          <div className="overflow-x-auto pb-2">
            <div className="relative min-w-[600px]">
              {/* Connecting line */}
              <div
                className="absolute top-[24px] left-[24px] right-[24px] h-[1px]"
                style={{ background: 'rgba(184,134,11,0.2)' }}
              />

              {/* Elephant nodes */}
              <div className="relative flex items-center justify-between">
                {shamathaStages.map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => setSelectedStage(s.stage)}
                    className="flex flex-col items-center gap-2 group focus:outline-none"
                    aria-label={`Stage ${s.stage}: ${s.name}`}
                  >
                    <div
                      className={`relative rounded-full transition-all duration-300 ${
                        selectedStage === s.stage
                          ? 'scale-110 drop-shadow-md'
                          : 'hover:scale-105'
                      }`}
                    >
                      <ElephantNode
                        color={s.elephant.color}
                        selected={selectedStage === s.stage}
                        size={48}
                      />
                    </div>
                    <span
                      className={`font-sans text-[10px] transition-colors duration-200 ${
                        selectedStage === s.stage
                          ? 'text-bodhi-saffron font-medium'
                          : 'text-bodhi-text-tertiary group-hover:text-bodhi-text-secondary'
                      }`}
                    >
                      {s.stage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Direction label */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="font-sans text-[10px] text-bodhi-text-faint uppercase tracking-widest">
              Distraction
            </span>
            <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-bodhi-text-faint/20 to-bodhi-saffron/20" />
            <span className="font-sans text-[10px] text-bodhi-saffron/60 uppercase tracking-widest">
              Calm Abiding
            </span>
          </div>
        </div>
      </div>

      {/* Selected Stage Detail */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px] mx-auto mb-12 animate-fade-in" key={selectedStage}>
        <div className="bodhi-card">
          {/* Stage header */}
          <h2 className="font-serif text-2xl font-light text-bodhi-text-primary mb-1">
            Stage {stage.stage} &middot; {stage.name}
          </h2>
          <p className="font-tibetan text-sm text-bodhi-text-tertiary mb-1">
            {stage.tibetan}
          </p>
          <p className="font-sans text-xs text-bodhi-text-faint italic tracking-wide mb-4">
            {stage.transliteration}
          </p>

          {/* Description */}
          <p className="font-sans text-base text-bodhi-text-secondary leading-relaxed mb-6">
            {stage.description}
          </p>

          {/* Gold separator */}
          <div className="w-[40px] h-[1px] bg-bodhi-saffron mb-6" />

          {/* Phenomenology */}
          <div className="mb-6">
            <p className="bodhi-label mb-2">PHENOMENOLOGY</p>
            <p className="font-serif text-base italic text-bodhi-text-secondary leading-relaxed">
              {stage.phenomenology}
            </p>
          </div>

          {/* Elephant status */}
          <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(184,134,11,0.04)' }}>
            <p className="bodhi-label mb-2">THE ELEPHANT</p>
            <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
              {stage.elephant.monkeyActivity}
            </p>
            {stage.elephant.monkeyPresent && (
              <p className="font-sans text-xs text-bodhi-text-tertiary mt-1">
                The monkey mind is still present at this stage.
              </p>
            )}
            {!stage.elephant.monkeyPresent && (
              <p className="font-sans text-xs text-bodhi-saffron mt-1">
                The monkey mind has been pacified.
              </p>
            )}
          </div>

          {/* Challenges */}
          <div className="mb-6">
            <p className="bodhi-label mb-3">CHALLENGES</p>
            <ul className="space-y-2">
              {stage.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: '#B8860B' }}
                  />
                  <span className="font-sans text-sm text-bodhi-text-secondary">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practices */}
          <div className="mb-6">
            <p className="bodhi-label mb-3">PRACTICES</p>
            <ul className="space-y-2">
              {stage.practices.map((practice, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: '#A37E2C', opacity: 0.5 }}
                  />
                  <span className="font-sans text-sm text-bodhi-text-secondary">
                    {practice}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div className="mb-6">
            <p className="bodhi-label mb-2">METRICS</p>
            <p className="font-sans text-sm text-bodhi-text-secondary">
              {stage.metrics.description}
            </p>
            <p className="font-sans text-xs text-bodhi-text-tertiary mt-1">
              Proxy: {stage.metrics.proxy}
            </p>
          </div>

          {/* Brown's Mahamudra Notes */}
          {stage.brownNotes && (
            <div className="border-t border-bodhi-border pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-[3px] h-4 rounded-full bg-bodhi-saffron" />
                <p className="bodhi-label !mb-0">FROM &ldquo;POINTING OUT THE GREAT WAY&rdquo;</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-sans text-xs font-medium text-bodhi-gold uppercase tracking-wider mb-1">
                    Tibetan: <span className="font-tibetan text-sm normal-case tracking-normal">{stage.brownNotes.tibetanTerm}</span>
                    <span className="text-bodhi-text-tertiary ml-2 normal-case italic">{stage.brownNotes.transliteration}</span>
                  </p>
                </div>

                <div>
                  <p className="bodhi-label mb-1 !text-[10px]">TECHNIQUE</p>
                  <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                    {stage.brownNotes.technique}
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ background: 'rgba(184,134,11,0.04)' }}>
                  <p className="bodhi-label mb-1 !text-[10px]">KEY INSIGHT</p>
                  <p className="font-serif text-sm italic text-bodhi-text-secondary leading-relaxed">
                    {stage.brownNotes.keyInsight}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Practice Log Section */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px] mx-auto mb-12">
        <p className="bodhi-label mb-4">SESSION LOG</p>

        {!showLogForm && (
          <button
            onClick={() => setShowLogForm(true)}
            className="gold-button"
          >
            Log a Session
          </button>
        )}

        {showLogForm && (
          <div className="bodhi-card mt-4 animate-fade-in">
            {/* Duration */}
            <div className="mb-6">
              <label className="font-sans text-sm font-medium text-bodhi-text-primary block mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="240"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 20"
                className="w-full max-w-[200px] px-4 py-2.5 rounded-lg font-sans text-sm text-bodhi-text-primary bg-bodhi-bg-primary border border-bodhi-border focus:border-bodhi-saffron focus:outline-none transition-colors"
              />
            </div>

            {/* Focus Rating */}
            <div className="mb-6">
              <label className="font-sans text-sm font-medium text-bodhi-text-primary block mb-2">
                Focus Rating
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFocusRating(rating)}
                    className="focus:outline-none transition-all duration-200"
                    aria-label={`Rating ${rating}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm transition-all duration-200 ${
                        focusRating >= rating
                          ? 'text-white scale-110'
                          : 'text-bodhi-text-tertiary hover:scale-105'
                      }`}
                      style={{
                        background:
                          focusRating >= rating
                            ? '#B8860B'
                            : 'rgba(163,126,44,0.08)',
                        border:
                          focusRating >= rating
                            ? '2px solid #B8860B'
                            : '1px solid rgba(163,126,44,0.15)',
                      }}
                    >
                      {rating}
                    </div>
                  </button>
                ))}
                <span className="font-sans text-xs text-bodhi-text-faint ml-2">
                  {focusRating === 0 && 'Select a rating'}
                  {focusRating === 1 && 'Very distracted'}
                  {focusRating === 2 && 'Mostly distracted'}
                  {focusRating === 3 && 'Balanced'}
                  {focusRating === 4 && 'Mostly focused'}
                  {focusRating === 5 && 'Deep focus'}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="font-sans text-sm font-medium text-bodhi-text-primary block mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How was your session? Any insights or observations..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg font-sans text-sm text-bodhi-text-primary bg-bodhi-bg-primary border border-bodhi-border focus:border-bodhi-saffron focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={handleSave} className="gold-button">
                Save
              </button>
              <button onClick={handleCancel} className="ghost-button">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Recent sessions placeholder */}
        <div className="mt-8">
          <p className="font-sans text-sm font-medium text-bodhi-text-primary mb-3">
            Recent Sessions
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary italic">
            No sessions logged yet. Begin your practice and track your progress here.
          </p>
        </div>
      </div>

      {/* All 9 Stages Overview */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px] mx-auto pb-16">
        <p className="bodhi-label mb-6">ALL NINE STAGES</p>

        <div className="space-y-1">
          {shamathaStages.map((s) => {
            const isSelected = selectedStage === s.stage

            return (
              <button
                key={s.stage}
                onClick={() => setSelectedStage(s.stage)}
                className={`w-full text-left transition-all duration-300 rounded-lg px-5 py-4 group ${
                  isSelected
                    ? 'bg-bodhi-bg-card'
                    : 'hover:bg-bodhi-bg-card/50'
                }`}
              >
                <div className={isSelected ? 'gold-border-left' : 'pl-[23px]'}>
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-serif text-2xl font-light transition-colors duration-200 ${
                        isSelected
                          ? 'text-bodhi-gold'
                          : 'text-bodhi-text-faint group-hover:text-bodhi-text-tertiary'
                      }`}
                    >
                      {s.stage}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className={`font-serif text-lg transition-colors duration-200 ${
                            isSelected
                              ? 'text-bodhi-text-primary'
                              : 'text-bodhi-text-secondary group-hover:text-bodhi-text-primary'
                          }`}
                        >
                          {s.name}
                        </span>
                        <span className="font-tibetan text-xs text-bodhi-text-faint">
                          {s.tibetan}
                        </span>
                      </div>
                      <p
                        className={`font-sans text-sm mt-0.5 transition-colors duration-200 ${
                          isSelected
                            ? 'text-bodhi-text-secondary'
                            : 'text-bodhi-text-tertiary'
                        }`}
                      >
                        {s.description}
                      </p>
                    </div>
                    {/* Small elephant color indicator */}
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 border"
                      style={{
                        background: s.elephant.color,
                        borderColor:
                          s.elephant.color === '#ffffff'
                            ? '#ddd'
                            : s.elephant.color,
                      }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
