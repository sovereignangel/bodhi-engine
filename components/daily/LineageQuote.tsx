'use client'

import type { Citation } from '@/types/teaching'

interface LineageQuoteProps {
  citation: Citation
}

export function LineageQuote({ citation }: LineageQuoteProps) {
  return (
    <div className="relative pl-5 border-l-2 border-bodhi-saffron/40">
      <p className="font-serif text-lg italic text-bodhi-text-secondary leading-[1.8]">
        &ldquo;{citation.quote}&rdquo;
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-sans text-sm font-medium text-bodhi-gold">
          {citation.author}
        </span>
        <span className="font-sans text-xs text-bodhi-text-faint">
          {citation.work}
          {citation.detail && `, ${citation.detail}`}
        </span>
      </div>
    </div>
  )
}
