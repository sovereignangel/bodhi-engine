'use client'

import { useState } from 'react'
import { useShamatha } from '@/lib/hooks/useShamatha'
import { shamathaStages } from '@/lib/data/shamathaStages'
import { ShamathaTracker, ElephantStage, PracticeMetrics } from '@/components/progress'
import { ArrowLeft, Compass } from 'lucide-react'
import Link from 'next/link'

export default function ProgressPage() {
  const {
    progress,
    currentStage,
    isLoading,
    recordSession,
    averageSessionDuration,
    averageFocusRating,
    recentSessions,
  } = useShamatha()

  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  if (isLoading || !progress || !currentStage) {
    return (
      <div className="min-h-screen bg-bodhi-bg-dark flex items-center justify-center">
        <div className="text-bodhi-gold animate-pulse">Loading progress...</div>
      </div>
    )
  }

  const displayStage = selectedStage
    ? shamathaStages[selectedStage - 1]
    : currentStage

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
            <Compass className="w-5 h-5 text-bodhi-gold" />
            <span className="text-lg font-semibold text-bodhi-gold">
              Shamatha Progress
            </span>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Current Stage</div>
            <div className="text-sm font-semibold text-white">
              {progress.currentStage} / 9
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <div className="bg-gradient-to-b from-bodhi-bg-mid to-bodhi-bg-dark py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-light text-bodhi-gold tracking-wide mb-2">
            The Elephant Path
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Track your progress through the 9 stages of Shamatha, the Buddhist
            practice of calm abiding. As the elephant of the mind turns from black
            to white, stability deepens.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Elephant path tracker */}
            <ShamathaTracker
              currentStage={progress.currentStage}
              onStageClick={(stage) =>
                setSelectedStage(stage === selectedStage ? null : stage)
              }
            />

            {/* Selected/current stage detail */}
            <ElephantStage
              stage={displayStage}
              isCurrentStage={
                selectedStage === null ||
                selectedStage === progress.currentStage
              }
            />
          </div>

          {/* Sidebar - 1 column */}
          <div>
            <PracticeMetrics
              totalSessions={progress.totalSessions}
              totalMinutes={progress.totalMinutes}
              averageDuration={averageSessionDuration}
              averageFocus={averageFocusRating}
              recentSessions={recentSessions}
              onLogSession={recordSession}
            />
          </div>
        </div>

        {/* All stages overview */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-bodhi-gold mb-6">
            All 9 Stages of Shamatha
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {shamathaStages.map((stage) => (
              <button
                key={stage.stage}
                onClick={() => setSelectedStage(stage.stage)}
                className={`text-left p-4 rounded-lg transition-all ${
                  stage.stage === progress.currentStage
                    ? 'bg-bodhi-gold/20 border border-bodhi-gold/50'
                    : stage.stage < progress.currentStage
                    ? 'bg-bodhi-bg-mid hover:bg-bodhi-bg-light'
                    : 'bg-bodhi-bg-mid/50 opacity-50 hover:opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Stage {stage.stage}</span>
                  <svg width="24" height="18" viewBox="0 0 40 30">
                    <ellipse
                      cx="20"
                      cy="18"
                      rx="12"
                      ry="8"
                      fill={stage.elephant.color}
                    />
                    <circle cx="10" cy="12" r="6" fill={stage.elephant.color} />
                    <path
                      d="M6 14 Q4 20 6 26"
                      stroke={stage.elephant.color}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="text-sm font-medium text-white">{stage.name}</div>
                <div className="font-tibetan text-xs text-bodhi-gold mt-1">
                  {stage.tibetan}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Traditional teaching note */}
        <div className="mt-8 p-6 bg-bodhi-bg-mid/50 rounded-xl border border-bodhi-gold/10">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Important Note
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            The 9 stages of Shamatha are based on traditional Buddhist teachings,
            particularly as described in Kamalashila&apos;s <em>Stages of Meditation</em> and
            visualized in Tibetan &ldquo;elephant path&rdquo; thangka paintings. Progress through
            these stages is a gradual process that unfolds over months and years of
            consistent practice. The app&apos;s stage estimates are approximations based
            on practice metrics - true attainment should be verified with a qualified
            meditation teacher.
          </p>
        </div>
      </div>
    </main>
  )
}
