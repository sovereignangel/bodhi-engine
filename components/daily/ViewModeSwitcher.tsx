'use client'

import type { CurriculumViewMode } from '@/types/teaching'

interface ViewModeSwitcherProps {
  current: CurriculumViewMode
  onChange: (mode: CurriculumViewMode) => void
}

const modes: { key: CurriculumViewMode; label: string }[] = [
  { key: 'progressive', label: 'Progressive' },
  { key: 'thematic', label: 'Thematic' },
  { key: 'seasonal', label: 'Seasonal' },
]

export function ViewModeSwitcher({ current, onChange }: ViewModeSwitcherProps) {
  return (
    <div className="flex gap-1 bg-bodhi-bg-primary/50 rounded-full p-1 border border-bodhi-text-faint/10">
      {modes.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
            current === key
              ? 'bg-bodhi-saffron/15 text-bodhi-gold border border-bodhi-saffron/30'
              : 'text-bodhi-text-tertiary hover:text-bodhi-text-secondary border border-transparent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
