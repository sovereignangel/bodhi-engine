'use client'

import { useState } from 'react'
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'

interface ReflectionPromptProps {
  prompt: string
}

export function ReflectionPrompt({ prompt }: ReflectionPromptProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="thangka-card bg-gradient-to-br from-bodhi-bg-mid to-bodhi-bg-light">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-bodhi-gold" />
          <h3 className="text-sm font-bold text-bodhi-gold uppercase tracking-wider">
            Daily Reflection
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4">
          <p className="text-base text-gray-200 leading-relaxed">
            {prompt}
          </p>
          <div className="mt-4 p-3 bg-bodhi-bg-dark/50 rounded-lg">
            <textarea
              placeholder="Write your reflection..."
              className="w-full bg-transparent text-gray-300 text-sm resize-none outline-none placeholder:text-gray-600 min-h-[100px]"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Your reflections are saved locally and never leave your device.
          </p>
        </div>
      )}
    </div>
  )
}
