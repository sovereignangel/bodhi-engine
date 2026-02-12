// 365-Day Curriculum Data Loader
// Imports monthly JSON files and provides lookup functions

import type {
  CurriculumEntry,
  ThematicMonth,
  Season,
  TeachingTag,
  TraditionSource,
} from '@/types/teaching'

import januaryData from './january.json'
import februaryData from './february.json'
import marchData from './march.json'
import aprilData from './april.json'
import mayData from './may.json'
import juneData from './june.json'
import julyData from './july.json'
import augustData from './august.json'
import septemberData from './september.json'
import octoberData from './october.json'
import novemberData from './november.json'
import decemberData from './december.json'

// Cast JSON imports to typed arrays
const allEntries: CurriculumEntry[] = [
  ...(januaryData as unknown as CurriculumEntry[]),
  ...(februaryData as unknown as CurriculumEntry[]),
  ...(marchData as unknown as CurriculumEntry[]),
  ...(aprilData as unknown as CurriculumEntry[]),
  ...(mayData as unknown as CurriculumEntry[]),
  ...(juneData as unknown as CurriculumEntry[]),
  ...(julyData as unknown as CurriculumEntry[]),
  ...(augustData as unknown as CurriculumEntry[]),
  ...(septemberData as unknown as CurriculumEntry[]),
  ...(octoberData as unknown as CurriculumEntry[]),
  ...(novemberData as unknown as CurriculumEntry[]),
  ...(decemberData as unknown as CurriculumEntry[]),
]

// Pre-build lookup map for O(1) day access
const dayMap = new Map<number, CurriculumEntry>()
for (const entry of allEntries) {
  dayMap.set(entry.day, entry)
}

// Get a single curriculum entry by day number (1-365)
export function getCurriculumEntry(day: number): CurriculumEntry {
  const validDay = Math.max(1, Math.min(365, day))
  const entry = dayMap.get(validDay)
  if (!entry) {
    throw new Error(`No curriculum entry found for day ${validDay}`)
  }
  return entry
}

// Get today's entry based on day-of-year
export function getTodayEntry(): CurriculumEntry {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return getCurriculumEntry(Math.min(dayOfYear, 365))
}

// Get all entries for a thematic month
export function getEntriesByMonth(month: ThematicMonth): CurriculumEntry[] {
  return allEntries.filter((e) => e.month === month)
}

// Get all entries for a season
export function getEntriesBySeason(season: Season): CurriculumEntry[] {
  return allEntries.filter((e) => e.season === season)
}

// Get all entries with a specific tag
export function getEntriesByTag(tag: TeachingTag): CurriculumEntry[] {
  return allEntries.filter((e) => e.tags.includes(tag))
}

// Get all entries from a specific tradition
export function getEntriesByTradition(tradition: TraditionSource): CurriculumEntry[] {
  return allEntries.filter((e) => e.tradition === tradition || e.tradition === 'all')
}

// Get all entries for a specific week (1-52)
export function getEntriesByWeek(week: number): CurriculumEntry[] {
  return allEntries.filter((e) => e.week === week)
}

// Get total count
export function getTotalEntries(): number {
  return allEntries.length
}

// Get all entries (for iteration)
export function getAllEntries(): CurriculumEntry[] {
  return allEntries
}

// Season labels for display
export const SEASON_LABELS: Record<Season, string> = {
  foundation: 'Foundation',
  expansion: 'Expansion',
  depth: 'Depth',
  integration: 'Integration',
}

// Tradition labels for display
export const TRADITION_LABELS: Record<TraditionSource, string> = {
  kadampa: 'Kadampa',
  mahamudra: 'Mahamudra',
  integral: 'Integral',
  'kadampa-mahamudra': 'Kadampa & Mahamudra',
  'kadampa-integral': 'Kadampa & Integral',
  'mahamudra-integral': 'Mahamudra & Integral',
  all: 'All Traditions',
}
