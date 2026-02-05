// 9 Stages of Shamatha (Calm Abiding) - The Elephant Path
// Based on traditional thangka paintings of the elephant turning white

import type { ShamathaStage } from '@/types/shamatha'

export const shamathaStages: ShamathaStage[] = [
  {
    stage: 1,
    name: 'Placement',
    tibetan: 'སེམས་འཇོག',
    transliteration: 'sem jok',
    description: 'Placing the mind on the meditation object',
    phenomenology: 'The mind wanders constantly. Brief moments of contact with the object are followed by long periods of distraction. It feels like trying to catch water.',
    challenges: [
      'Mind feels uncontrollable',
      'Constant thought proliferation',
      'Doubt about ability to meditate',
    ],
    practices: [
      'Short, frequent sessions (5-10 minutes)',
      'Simple breath counting',
      'Patience with wandering',
    ],
    elephant: {
      color: '#333333',
      opacity: 0.3,
      monkeyPresent: true,
      monkeyActivity: 'Monkey leads the black elephant, completely in control',
    },
    metrics: {
      description: 'Can you complete a session without giving up?',
      proxy: 'Session completion rate',
    },
  },
  {
    stage: 2,
    name: 'Continual Placement',
    tibetan: 'རྒྱུན་དུ་འཇོག',
    transliteration: 'gyün du jok',
    description: 'Occasionally resting on the object',
    phenomenology: 'Brief periods of stability emerge. The mind can stay with the object for a few seconds before wandering. Still mostly distracted.',
    challenges: [
      'Forgetting the object',
      'Drowsiness',
      'Subtle distractions',
    ],
    practices: [
      'Slightly longer sessions',
      'Noting when mind wanders',
      'Gentle return to object',
    ],
    elephant: {
      color: '#444444',
      opacity: 0.4,
      monkeyPresent: true,
      monkeyActivity: 'Monkey still leads, but elephant occasionally glances back',
    },
    metrics: {
      description: 'Can you notice when the mind wanders?',
      proxy: 'Self-reported awareness of distraction',
    },
  },
  {
    stage: 3,
    name: 'Patch-like Placement',
    tibetan: 'གླན་ཏེ་འཇོག',
    transliteration: 'len té jok',
    description: 'Quickly recognizing distraction and returning',
    phenomenology: 'Focus comes in patches. Can now recognize when distracted and return more quickly. The object is held for longer periods.',
    challenges: [
      'Subtle dullness',
      'Over-efforting',
      'Impatience with progress',
    ],
    practices: [
      'Developing introspective awareness',
      'Balanced effort',
      'Sessions of 15-20 minutes',
    ],
    elephant: {
      color: '#555555',
      opacity: 0.5,
      monkeyPresent: true,
      monkeyActivity: 'Meditator begins to use the hook, elephant shows white patches',
    },
    metrics: {
      description: 'How quickly do you return after distraction?',
      proxy: 'Average time to notice wandering',
    },
  },
  {
    stage: 4,
    name: 'Close Placement',
    tibetan: 'ཉེ་བར་འཇོག',
    transliteration: 'nyewar jok',
    description: 'Not losing the object',
    phenomenology: 'The object is never completely lost. Gross distraction ceases, though subtle movements continue. A new challenge: dullness.',
    challenges: [
      'Gross laxity',
      'Mental sinking',
      'False sense of stability',
    ],
    practices: [
      'Heightening clarity',
      'Strengthening introspection',
      'Checking for dullness',
    ],
    elephant: {
      color: '#666666',
      opacity: 0.6,
      monkeyPresent: true,
      monkeyActivity: 'Elephant follows the meditator, monkey now follows behind',
    },
    metrics: {
      description: 'Can you maintain the object throughout a session?',
      proxy: 'Consecutive sessions without losing object',
    },
  },
  {
    stage: 5,
    name: 'Taming',
    tibetan: 'དུལ་བར་བྱེད',
    transliteration: 'dulwar jé',
    description: 'Overcoming resistance to meditation',
    phenomenology: 'The mind becomes more workable. Joy and enthusiasm for practice emerge. Subtle excitation still present.',
    challenges: [
      'Subtle excitement',
      'Attachment to pleasant states',
      'Overconfidence',
    ],
    practices: [
      'Reflecting on benefits of meditation',
      'Balancing relaxation and alertness',
      'Longer sessions possible',
    ],
    elephant: {
      color: '#888888',
      opacity: 0.7,
      monkeyPresent: true,
      monkeyActivity: 'Elephant is now mostly white, meditator holds rope loosely',
    },
    metrics: {
      description: 'Do you look forward to practice?',
      proxy: 'Self-reported enjoyment and streak length',
    },
  },
  {
    stage: 6,
    name: 'Pacifying',
    tibetan: 'ཞི་བར་བྱེད',
    transliteration: 'zhiwar jé',
    description: 'No aversion to meditation',
    phenomenology: 'Resistance dissolves. Practice becomes natural and pleasant. Subtle dullness still needs to be overcome.',
    challenges: [
      'Subtle dullness',
      'Complacency',
      'Plateauing',
    ],
    practices: [
      'Cultivating vividness',
      'Increasing session length',
      'Deeper relaxation',
    ],
    elephant: {
      color: '#aaaaaa',
      opacity: 0.8,
      monkeyPresent: false,
      monkeyActivity: 'Monkey disappears, elephant follows willingly',
    },
    metrics: {
      description: 'Is practice free of struggle?',
      proxy: 'Session duration and self-reported ease',
    },
  },
  {
    stage: 7,
    name: 'Complete Pacification',
    tibetan: 'རྣམ་པར་ཞི་བྱེད',
    transliteration: 'nampar zhi jé',
    description: 'Eliminating subtle dullness and excitement',
    phenomenology: 'Only very subtle fluctuations remain. The mind is stable but still requires effort to maintain clarity.',
    challenges: [
      'Very subtle dullness',
      'Very subtle excitement',
      'Need for continued vigilance',
    ],
    practices: [
      'Refined introspection',
      'Minimal effort',
      'Extended sessions',
    ],
    elephant: {
      color: '#cccccc',
      opacity: 0.9,
      monkeyPresent: false,
      monkeyActivity: 'Elephant now leads, completely white',
    },
    metrics: {
      description: 'Can you maintain clarity without struggle?',
      proxy: 'Extended session length with maintained clarity',
    },
  },
  {
    stage: 8,
    name: 'Single-Pointed',
    tibetan: 'རྩེ་གཅིག་ཏུ་བྱེད',
    transliteration: 'tsé chik tu jé',
    description: 'Effortless stability with minimal effort to start',
    phenomenology: 'Only a small effort is needed at the start of the session. Once placed, attention remains stable without intervention.',
    challenges: [
      'Still requires initial effort',
      'Potential for attachment to the state',
    ],
    practices: [
      'Trusting the stability',
      'Releasing control',
      'Preparation for stage 9',
    ],
    elephant: {
      color: '#eeeeee',
      opacity: 0.95,
      monkeyPresent: false,
      monkeyActivity: 'Meditator sits peacefully while elephant rests nearby',
    },
    metrics: {
      description: 'Does stability arise with minimal effort?',
      proxy: 'Time to establish stability at session start',
    },
  },
  {
    stage: 9,
    name: 'Balanced Placement',
    tibetan: 'མཉམ་པར་འཇོག',
    transliteration: 'nyampar jok',
    description: 'Perfect Shamatha - effortless, spontaneous stability',
    phenomenology: 'Attention remains on the object spontaneously without any effort. Physical and mental pliancy. Bliss of body and mind.',
    challenges: [
      'Maintaining this state off cushion',
      'Not confusing this with liberation',
    ],
    practices: [
      'Integration with daily life',
      'Preparation for Vipassana',
      'Using stability for insight',
    ],
    elephant: {
      color: '#ffffff',
      opacity: 1.0,
      monkeyPresent: false,
      monkeyActivity: 'Meditator rides the white elephant, perfect harmony',
    },
    metrics: {
      description: 'Is stability completely effortless?',
      proxy: 'Effortless sustained attention',
    },
  },
]

// Get stage by number (1-9)
export function getStage(stageNum: number): ShamathaStage {
  const index = Math.max(0, Math.min(8, stageNum - 1))
  return shamathaStages[index]
}

// Get stage color (black to white progression)
export function getStageColor(stageNum: number): string {
  return shamathaStages[Math.max(0, Math.min(8, stageNum - 1))].elephant.color
}

// Estimate stage based on session metrics
export function estimateStage(metrics: {
  completionRate: number
  averageSessionMinutes: number
  streakDays: number
  totalSessions: number
}): number {
  const { completionRate, averageSessionMinutes, streakDays, totalSessions } = metrics

  // Simple heuristic - in reality this would be more nuanced
  if (totalSessions < 10) return 1
  if (completionRate < 0.5) return 1
  if (completionRate < 0.7) return 2
  if (averageSessionMinutes < 10) return 2
  if (averageSessionMinutes < 15) return 3
  if (streakDays < 7) return 3
  if (averageSessionMinutes < 20) return 4
  if (streakDays < 14) return 4
  if (averageSessionMinutes < 30) return 5
  if (streakDays < 30) return 5
  if (averageSessionMinutes < 45) return 6
  if (averageSessionMinutes < 60) return 7
  return 8 // Stage 9 requires teacher verification
}
