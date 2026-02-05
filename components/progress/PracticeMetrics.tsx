'use client'

import { useState } from 'react'
import { Clock, Target, TrendingUp, Calendar } from 'lucide-react'
import type { ShamathaSession } from '@/types/progress'

interface PracticeMetricsProps {
  totalSessions: number
  totalMinutes: number
  averageDuration: number
  averageFocus: string
  recentSessions: ShamathaSession[]
  onLogSession: (session: Omit<ShamathaSession, 'date'>) => void
}

export function PracticeMetrics({
  totalSessions,
  totalMinutes,
  averageDuration,
  averageFocus,
  recentSessions,
  onLogSession,
}: PracticeMetricsProps) {
  const [showLogForm, setShowLogForm] = useState(false)
  const [duration, setDuration] = useState(10)
  const [focusRating, setFocusRating] = useState(3)
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    onLogSession({
      durationMinutes: duration,
      focusRating,
      notes: notes || undefined,
    })
    setShowLogForm(false)
    setDuration(10)
    setFocusRating(3)
    setNotes('')
  }

  // Get sessions per day for the last 7 days
  const sessionsThisWeek = recentSessions.length

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="thangka-card">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Total Sessions</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalSessions}</div>
        </div>

        <div className="thangka-card">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Total Time</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalMinutes < 60
              ? `${totalMinutes}m`
              : `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`}
          </div>
        </div>

        <div className="thangka-card">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Avg Duration</span>
          </div>
          <div className="text-2xl font-bold text-white">{averageDuration}m</div>
        </div>

        <div className="thangka-card">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">This Week</span>
          </div>
          <div className="text-2xl font-bold text-white">{sessionsThisWeek}</div>
        </div>
      </div>

      {/* Log session button/form */}
      {!showLogForm ? (
        <button onClick={() => setShowLogForm(true)} className="gold-button w-full">
          Log Practice Session
        </button>
      ) : (
        <div className="thangka-card">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            Log Session
          </h4>

          {/* Duration slider */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-2">
              Duration: {duration} minutes
            </label>
            <input
              type="range"
              min="1"
              max="120"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-bodhi-bg-dark rounded-lg appearance-none cursor-pointer accent-bodhi-gold"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1 min</span>
              <span>60 min</span>
              <span>120 min</span>
            </div>
          </div>

          {/* Focus rating */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-2">
              Focus Quality: {focusRating}/5
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFocusRating(rating)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    rating <= focusRating
                      ? 'bg-bodhi-gold text-bodhi-bg-dark'
                      : 'bg-bodhi-bg-dark text-gray-500 hover:bg-bodhi-bg-light'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Distracted</span>
              <span>Focused</span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your practice today?"
              className="w-full bg-bodhi-bg-dark text-gray-300 text-sm rounded-lg p-3 resize-none outline-none border border-transparent focus:border-bodhi-gold/30 min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogForm(false)}
              className="flex-1 py-2 rounded-lg text-sm font-medium bg-bodhi-bg-dark text-gray-400 hover:bg-bodhi-bg-light transition-all"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="flex-1 gold-button py-2">
              Save Session
            </button>
          </div>
        </div>
      )}

      {/* Recent sessions */}
      {recentSessions.length > 0 && (
        <div className="thangka-card">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Recent Sessions
          </h4>
          <div className="space-y-2">
            {recentSessions.slice(-5).reverse().map((session, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-bodhi-bg-dark/50"
              >
                <div>
                  <div className="text-sm text-white">
                    {session.durationMinutes} minutes
                  </div>
                  <div className="text-xs text-gray-500">{session.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-2 h-2 rounded-full ${
                        star <= session.focusRating
                          ? 'bg-bodhi-gold'
                          : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
