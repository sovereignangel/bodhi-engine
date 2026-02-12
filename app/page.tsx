'use client'

import Link from 'next/link'
import { teachings } from '@/lib/data/teachings'

const DharmaWheel = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#B8860B" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="3" stroke="#B8860B" strokeWidth="1" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="12"
        y1="12"
        x2={12 + 10 * Math.cos((angle * Math.PI) / 180)}
        y2={12 + 10 * Math.sin((angle * Math.PI) / 180)}
        stroke="#B8860B"
        strokeWidth="0.8"
      />
    ))}
  </svg>
)

const LotusIcon = () => (
  <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
    <path d="M12 16C12 16 8 12 8 8C8 4 12 2 12 2C12 2 16 4 16 8C16 12 12 16 12 16Z" stroke="#B8860B" strokeWidth="1.2" fill="none" />
    <path d="M12 16C12 16 5 13 4 8C3 3 7 1 7 1" stroke="#B8860B" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M12 16C12 16 19 13 20 8C21 3 17 1 17 1" stroke="#B8860B" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
)

export default function Home() {
  const todayTeaching = teachings[0]

  return (
    <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 max-w-[900px]">

      {/* Hero */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <DharmaWheel size={20} />
          <span className="bodhi-label">Welcome Back</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-bodhi-text-primary leading-tight mb-4">
          Bodhi Engine
        </h1>
        <p className="font-sans text-base text-bodhi-text-tertiary max-w-lg leading-relaxed">
          Navigate 2,500 years of Buddhist wisdom through the graduated path.
        </p>
      </div>

      {/* Streak */}
      <div className="bodhi-card mb-6 flex items-center justify-between">
        <div>
          <p className="bodhi-label mb-1">Current Streak</p>
          <p className="font-serif text-3xl font-light text-bodhi-text-primary">1 day</p>
        </div>
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i === 0 ? 'bg-bodhi-saffron' : 'bg-bodhi-text-faint/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Today's Teaching Card */}
      <Link href="/daily" className="block group">
        <div className="bodhi-card-hover mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LotusIcon />
            <span className="bodhi-label">Today&apos;s Teaching</span>
          </div>

          <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-bodhi-text-tertiary mb-2">
            Day {todayTeaching.day} · Foundation
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-bodhi-text-primary mb-2">
            {todayTeaching.title}
          </h2>
          <p className="font-tibetan text-sm text-bodhi-text-tertiary mb-4">
            {todayTeaching.tibetan}
          </p>

          <p className="font-serif text-lg text-bodhi-text-secondary leading-relaxed line-clamp-3">
            {todayTeaching.traditional.text}
          </p>

          <p className="font-sans text-sm text-bodhi-gold mt-4 group-hover:text-bodhi-saffron transition-colors">
            Read today&apos;s teaching →
          </p>
        </div>
      </Link>

      {/* Quick links grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Link href="/path" className="bodhi-card-hover">
          <p className="bodhi-label mb-3">The Path</p>
          <p className="font-serif text-xl font-normal text-bodhi-text-primary mb-1">
            Knowledge Graph
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary">
            17 concepts · 7 scopes
          </p>
        </Link>

        <Link href="/practice" className="bodhi-card-hover">
          <p className="bodhi-label mb-3">Practice</p>
          <p className="font-serif text-xl font-normal text-bodhi-text-primary mb-1">
            Shamatha Tracker
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary">
            9 stages · Elephant Path
          </p>
        </Link>

        <Link href="/dictionary" className="bodhi-card-hover">
          <p className="bodhi-label mb-3">Dictionary</p>
          <p className="font-serif text-xl font-normal text-bodhi-text-primary mb-1">
            Buddhist Terms
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary">
            Searchable glossary
          </p>
        </Link>

        <Link href="/books" className="bodhi-card-hover">
          <p className="bodhi-label mb-3">Library</p>
          <p className="font-serif text-xl font-normal text-bodhi-text-primary mb-1">
            Sacred Texts
          </p>
          <p className="font-sans text-sm text-bodhi-text-tertiary">
            Read & discuss together
          </p>
        </Link>
      </div>

      {/* Reflection */}
      <div className="gold-border-left py-2">
        <p className="bodhi-label mb-3">Today&apos;s Reflection</p>
        <p className="font-serif text-lg italic text-bodhi-text-secondary leading-relaxed">
          {todayTeaching.reflectionPrompt}
        </p>
      </div>
    </div>
  )
}
