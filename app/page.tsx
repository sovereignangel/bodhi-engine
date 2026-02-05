'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Map, BookOpen, Compass } from 'lucide-react'
import { Header, BottomNav } from '@/components/layout'
import { StreakDisplay, ConceptCoverage, TopicProgress } from '@/components/engagement'
import { useStreak } from '@/lib/hooks/useStreak'
import { useDailyTeaching } from '@/lib/hooks/useDailyTeaching'
import { useProgress } from '@/lib/hooks/useProgress'
import { useShamatha } from '@/lib/hooks/useShamatha'
import { getScopeColor } from '@/lib/data/teachings'

export default function DashboardPage() {
  const { streak, getRecentActivity, streakStatus, isLoading: streakLoading } = useStreak()
  const { teaching, currentDay, completedDays, isLoading: teachingLoading } = useDailyTeaching()
  const { progress: userProgress, isLoading: progressLoading } = useProgress()
  const { progress: shamathaProgress, currentStage, isLoading: shamathaLoading } = useShamatha()

  const isLoading = streakLoading || teachingLoading || progressLoading || shamathaLoading

  // Get engaged concepts
  const [engagedConcepts, setEngagedConcepts] = useState<string[]>([])
  useEffect(() => {
    if (userProgress?.conceptEngagement) {
      setEngagedConcepts(Object.keys(userProgress.conceptEngagement))
    }
  }, [userProgress])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bodhi-bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-bodhi-gold/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-bodhi-gold" />
          </div>
          <div className="text-bodhi-gold">Loading Bodhi Engine...</div>
        </div>
      </div>
    )
  }

  const recentActivity = getRecentActivity(7)

  return (
    <div className="min-h-screen bg-bodhi-bg-dark pb-20 md:pb-0">
      <Header currentStreak={streak?.current || 0} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-bodhi-gold tracking-wide mb-2">
            Bodhi Engine
          </h1>
          <p className="font-tibetan text-xl text-bodhi-pink mb-4">
            བྱང་ཆུབ་འཕྲུལ་འཁོར།
          </p>
          <p className="text-gray-400 max-w-xl mx-auto">
            Navigate 2,500 years of Buddhist wisdom through the lenses of
            physics, cognitive science, and AI.
          </p>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/daily"
            className="thangka-card-hover group flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${getScopeColor(teaching?.scope || 'foundation')}20` }}
            >
              <BookOpen
                className="w-6 h-6"
                style={{ color: getScopeColor(teaching?.scope || 'foundation') }}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Today&apos;s Teaching
              </div>
              <div className="text-lg font-semibold text-white">
                Day {currentDay}: {teaching?.title || 'Loading...'}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-bodhi-gold transition-colors" />
          </Link>

          <Link
            href="/graph"
            className="thangka-card-hover group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-bodhi-cyan/20 flex items-center justify-center">
              <Map className="w-6 h-6 text-bodhi-cyan" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Knowledge Graph
              </div>
              <div className="text-lg font-semibold text-white">
                {engagedConcepts.length} / 14 Concepts
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-bodhi-gold transition-colors" />
          </Link>

          <Link
            href="/progress"
            className="thangka-card-hover group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-bodhi-green/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-bodhi-green" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">
                Shamatha Progress
              </div>
              <div className="text-lg font-semibold text-white">
                Stage {shamathaProgress?.currentStage || 1}: {currentStage?.name || 'Placement'}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-bodhi-gold transition-colors" />
          </Link>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Streak and Daily Teaching */}
          <div className="space-y-6">
            <StreakDisplay
              currentStreak={streak?.current || 0}
              longestStreak={streak?.longest || 0}
              status={streakStatus()}
              recentActivity={recentActivity}
            />

            <TopicProgress
              currentDay={currentDay}
              completedDays={completedDays}
            />
          </div>

          {/* Middle column - Today's teaching preview */}
          <div className="space-y-6">
            {teaching && (
              <div className="thangka-card">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: getScopeColor(teaching.scope) }}
                  >
                    Day {teaching.day} of 21
                  </span>
                  {completedDays.includes(currentDay) && (
                    <span className="text-xs bg-bodhi-green/20 text-bodhi-green px-2 py-1 rounded">
                      Completed
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-white mb-1">
                  {teaching.title}
                </h2>
                <div className="font-tibetan text-lg text-bodhi-gold mb-4">
                  {teaching.tibetan}
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {teaching.traditional.text}
                </p>

                <Link href="/daily" className="gold-button w-full text-center block">
                  Read Full Teaching
                </Link>
              </div>
            )}

            {/* Shamatha mini-tracker */}
            <div className="thangka-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Elephant Path
                </h3>
                <Link
                  href="/progress"
                  className="text-xs text-bodhi-gold hover:text-bodhi-gold/80"
                >
                  View Details
                </Link>
              </div>

              {/* Mini elephant progression */}
              <div className="flex items-end justify-between gap-1 mb-4">
                {Array.from({ length: 9 }, (_, i) => {
                  const stage = i + 1
                  const isActive = stage === (shamathaProgress?.currentStage || 1)
                  const isPast = stage < (shamathaProgress?.currentStage || 1)
                  const color = `rgb(${30 + i * 25}, ${30 + i * 25}, ${30 + i * 25})`

                  return (
                    <div
                      key={stage}
                      className={`flex-1 transition-all ${isActive ? 'scale-110' : ''}`}
                    >
                      <svg viewBox="0 0 40 30" className="w-full h-auto">
                        <ellipse
                          cx="20"
                          cy="18"
                          rx="12"
                          ry="8"
                          fill={color}
                          opacity={isPast || isActive ? 1 : 0.3}
                        />
                        <circle
                          cx="10"
                          cy="12"
                          r="6"
                          fill={color}
                          opacity={isPast || isActive ? 1 : 0.3}
                        />
                      </svg>
                    </div>
                  )
                })}
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-400">
                  Stage {shamathaProgress?.currentStage || 1}:{' '}
                  <span className="text-white font-medium">
                    {currentStage?.name || 'Placement'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {shamathaProgress?.totalSessions || 0} sessions &bull;{' '}
                  {shamathaProgress?.totalMinutes || 0} minutes total
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Knowledge coverage */}
          <div className="space-y-6">
            <ConceptCoverage engagedConcepts={engagedConcepts} />

            {/* Getting started tips */}
            <div className="thangka-card bg-gradient-to-br from-bodhi-bg-mid to-bodhi-bg-light">
              <h3 className="text-sm font-bold text-bodhi-gold uppercase tracking-wider mb-3">
                Getting Started
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-bodhi-gold mt-1">1.</span>
                  <span>
                    Read today&apos;s teaching and explore the scientific bridges
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bodhi-gold mt-1">2.</span>
                  <span>
                    Explore the knowledge graph to see how concepts connect
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bodhi-gold mt-1">3.</span>
                  <span>
                    Log a meditation session to track your Shamatha progress
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bodhi-gold mt-1">4.</span>
                  <span>
                    Return daily to build your streak and deepen practice
                  </span>
                </li>
              </ul>
            </div>

            {/* Quote */}
            <div className="thangka-card border-l-4 border-bodhi-gold">
              <blockquote className="text-sm text-gray-300 italic leading-relaxed">
                &ldquo;The human body, at peace with itself, is more precious than the
                rarest gem. Cherish your body, it is yours this one time only.&rdquo;
              </blockquote>
              <cite className="text-xs text-gray-500 mt-2 block">
                — Tsongkhapa, Lamrim Chenmo
              </cite>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
