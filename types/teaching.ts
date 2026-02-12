// Daily teaching types

import type { NodeId } from './node'

// ── Legacy Types (kept for backward compatibility with 21-day cycle) ──

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

// ── 365-Day Curriculum Types ──

export type TraditionSource =
  | 'kadampa'
  | 'mahamudra'
  | 'integral'
  | 'kadampa-mahamudra'
  | 'kadampa-integral'
  | 'mahamudra-integral'
  | 'all'

export type Season = 'foundation' | 'expansion' | 'depth' | 'integration'

export type ThematicMonth =
  | 'precious-human-life'       // Jan: The Rare Opportunity
  | 'impermanence'              // Feb: Embracing Change
  | 'refuge-and-karma'          // Mar: Finding Ground
  | 'renunciation'              // Apr: Turning the Mind
  | 'calm-abiding'              // May: Settling the Mind
  | 'deepening-concentration'   // Jun: The Still Ocean
  | 'compassion-and-love'       // Jul: The Open Heart
  | 'tonglen-and-exchange'      // Aug: The Courageous Heart
  | 'emptiness'                 // Sep: The Nature of Reality
  | 'pointing-out'              // Oct: Recognizing Awareness
  | 'four-yogas'                // Nov: The Mahamudra Path
  | 'integration'               // Dec: Living the Path

export type TeachingTag =
  | 'precious-human-life' | 'impermanence' | 'death' | 'karma' | 'refuge'
  | 'renunciation' | 'suffering' | 'ethics' | 'concentration' | 'shamatha'
  | 'equanimity' | 'compassion' | 'loving-kindness' | 'bodhicitta' | 'tonglen'
  | 'six-perfections' | 'emptiness' | 'dependent-origination' | 'two-truths'
  | 'vipashyana' | 'mahamudra' | 'pointing-out' | 'four-yogas' | 'awareness'
  | 'non-dual' | 'guru-devotion' | 'integration' | 'developmental'

export interface Citation {
  author: string
  work: string
  detail?: string
  quote: string
}

export interface MeditationInstruction {
  duration: string
  posture: string
  method: string
  closingDedication?: string
}

export interface CurriculumEntry {
  day: number               // 1-365
  month: ThematicMonth
  season: Season
  week: number              // 1-52

  // Identity
  title: string
  tibetan: string
  transliteration: string
  tradition: TraditionSource
  scope: TeachingScope
  tags: TeachingTag[]

  // Legacy mapping
  lamrimCycleDay?: number
  conceptId: NodeId

  // Teaching content
  teaching: {
    source: string
    text: string
    commentary: string
  }

  // Scientific lenses
  lenses: {
    physics: LensContent
    cogsci: LensContent
    ai: LensContent
  }

  // Rich fields
  meditation: MeditationInstruction
  citation: Citation
  journalPrompt: string
  reflectionPrompt: string
}

// Journal entry (user-generated, stored in localStorage)
export interface JournalEntry {
  day: number
  date: string              // ISO date YYYY-MM-DD
  year: number
  content: string
  updatedAt: string         // ISO datetime
}

// View mode for browsing
export type CurriculumViewMode = 'progressive' | 'thematic' | 'seasonal'

// Season display info
export const SEASON_INFO: Record<Season, { label: string; months: ThematicMonth[]; dayRange: [number, number] }> = {
  foundation: {
    label: 'Foundation',
    months: ['precious-human-life', 'impermanence', 'refuge-and-karma'],
    dayRange: [1, 90],
  },
  expansion: {
    label: 'Expansion',
    months: ['renunciation', 'calm-abiding', 'deepening-concentration'],
    dayRange: [91, 181],
  },
  depth: {
    label: 'Depth',
    months: ['compassion-and-love', 'tonglen-and-exchange', 'emptiness'],
    dayRange: [182, 273],
  },
  integration: {
    label: 'Integration',
    months: ['pointing-out', 'four-yogas', 'integration'],
    dayRange: [274, 365],
  },
}

export const MONTH_INFO: Record<ThematicMonth, { label: string; subtitle: string; dayRange: [number, number] }> = {
  'precious-human-life': { label: 'The Rare Opportunity', subtitle: 'Precious Human Life', dayRange: [1, 31] },
  'impermanence': { label: 'Embracing Change', subtitle: 'Death & Impermanence', dayRange: [32, 59] },
  'refuge-and-karma': { label: 'Finding Ground', subtitle: 'Refuge & Karma', dayRange: [60, 90] },
  'renunciation': { label: 'Turning the Mind', subtitle: 'Renunciation & Suffering', dayRange: [91, 120] },
  'calm-abiding': { label: 'Settling the Mind', subtitle: 'Shamatha', dayRange: [121, 151] },
  'deepening-concentration': { label: 'The Still Ocean', subtitle: 'Advanced Concentration', dayRange: [152, 181] },
  'compassion-and-love': { label: 'The Open Heart', subtitle: 'Compassion & Bodhicitta', dayRange: [182, 212] },
  'tonglen-and-exchange': { label: 'The Courageous Heart', subtitle: 'Tonglen & Six Perfections', dayRange: [213, 243] },
  'emptiness': { label: 'The Nature of Reality', subtitle: 'Emptiness & Two Truths', dayRange: [244, 273] },
  'pointing-out': { label: 'Recognizing Awareness', subtitle: 'Pointing-Out Instructions', dayRange: [274, 304] },
  'four-yogas': { label: 'The Mahamudra Path', subtitle: 'The Four Yogas', dayRange: [305, 334] },
  'integration': { label: 'Living the Path', subtitle: 'Integration & Return', dayRange: [335, 365] },
}
