'use client'

import { useDailyTeaching } from '@/lib/hooks/useDailyTeaching'
import { DailyTeaching, ScientificLens, TeachingCycle, ReflectionPrompt } from '@/components/daily'
import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function DailyPage() {
  const {
    teaching,
    cycleInfo,
    currentDay,
    completedDays,
    isLoading,
    markDayCompleted,
    isDayCompleted,
    goToDay,
  } = useDailyTeaching()

  if (isLoading || !teaching || !cycleInfo) {
    return (
      <div className="min-h-screen bg-bodhi-bg-dark flex items-center justify-center">
        <div className="text-bodhi-gold animate-pulse">Loading teachings...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-bodhi-bg-dark pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bodhi-bg-dark/80 backdrop-blur-md border-b border-bodhi-gold/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-bodhi-gold hover:text-bodhi-gold/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-bodhi-gold" />
            <span className="text-lg font-semibold text-bodhi-gold">Daily Teaching</span>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Cycle {cycleInfo.cycleNumber}</div>
            <div className="text-sm font-semibold text-white">
              Day {currentDay} / 21
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teaching card */}
            <DailyTeaching
              teaching={teaching}
              onMarkComplete={markDayCompleted}
              isCompleted={isDayCompleted(currentDay)}
            />

            {/* Scientific lenses */}
            <ScientificLens lenses={teaching.lenses} />

            {/* Reflection prompt */}
            <ReflectionPrompt prompt={teaching.reflectionPrompt} />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Cycle progress */}
            <TeachingCycle
              currentDay={currentDay}
              completedDays={completedDays}
              onDayClick={goToDay}
            />

            {/* Related concept link */}
            <div className="thangka-card">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Related Concept
              </h3>
              <Link
                href={`/graph?highlight=${teaching.conceptId}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-bodhi-bg-dark/50 hover:bg-bodhi-bg-dark transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-bodhi-gold/20 flex items-center justify-center">
                  <span className="font-tibetan text-bodhi-gold text-lg">
                    {teaching.tibetan.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{teaching.title}</div>
                  <div className="text-xs text-gray-500">View in Knowledge Graph</div>
                </div>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="thangka-card">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Days Completed</span>
                  <span className="text-sm font-semibold text-bodhi-green">
                    {completedDays.length} / 21
                  </span>
                </div>
                <div className="h-2 bg-bodhi-bg-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bodhi-green transition-all duration-500"
                    style={{ width: `${(completedDays.length / 21) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Days Remaining: {21 - completedDays.length}</span>
                  <span>{Math.round((completedDays.length / 21) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
