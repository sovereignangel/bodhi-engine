// Daily teaching types

import type { NodeId } from './node'

export type TeachingScope =
  | 'foundation'
  | 'small'
  | 'middle'
  | 'great-method'
  | 'great-wisdom'

export interface LensContent {
  bridge: string // Main scientific bridge statement
  details: string // Expanded explanation
  source?: string // Academic reference if applicable
}

export interface DailyTeaching {
  day: number // 1-21
  scope: TeachingScope
  conceptId: NodeId
  title: string
  tibetan: string
  transliteration: string

  traditional: {
    source: string // e.g., "Lamrim Chenmo, Chapter 4"
    text: string // Original teaching text
    commentary: string // Brief commentary
  }

  lenses: {
    physics: LensContent
    cogsci: LensContent
    ai: LensContent
  }

  reflectionPrompt: string // Daily contemplation question
}

export interface TeachingCycleInfo {
  currentDay: number
  totalDays: 21
  scope: TeachingScope
  daysRemaining: number
  cycleNumber: number
}
