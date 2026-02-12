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
    brownNotes: {
      technique: 'Setting up (bzhag pa): Begin by watching the breath as an "event" — observe each breath-moment as a discrete arising without trying to control it. Brown emphasizes distinguishing between watching the breath as an event versus searching for mind itself.',
      tibetanTerm: 'བཞག་པ',
      transliteration: 'bzhag pa',
      keyInsight: 'Brown identifies that most beginners fail because they try to concentrate on the breath rather than simply recognizing each breath-event. The shift from "doing" to "recognizing" is the key to placement.',
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
    brownNotes: {
      technique: 'Staying (gnas pa): Brown introduces "staying" as the key skill — the mind begins to stay with the object for brief intervals. The practitioner learns to recognize the difference between "staying" and "not staying" (ma gnas pa).',
      tibetanTerm: 'གནས་པ',
      transliteration: 'gnas pa',
      keyInsight: 'Brown distinguishes between "partial staying" and "genuine staying." At this stage, what feels like concentration is often just reduced mental elaboration (spros pa) rather than true single-pointed focus.',
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
    brownNotes: {
      technique: 'Recognizing mental elaboration (spros pa): Brown identifies this stage as when the practitioner first clearly sees how "mental elaboration" — the proliferation of thought chains — is the primary obstacle. The instruction is to "cut" elaboration at its root.',
      tibetanTerm: 'སྤྲོས་པ',
      transliteration: 'spros pa',
      keyInsight: 'Brown\'s key contribution: "mental elaboration" (spros pa) is not just distraction but the mind\'s habitual tendency to construct narratives. Recognizing this pattern is more important than forcing concentration.',
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
    brownNotes: {
      technique: 'Tightening (dam por bya ba): Brown describes "tightening" concentration — holding the object more firmly while maintaining clarity. The practitioner learns to distinguish between genuine stability and "sinking" (bying ba), where the mind appears still but has lost vividness.',
      tibetanTerm: 'དམ་པོར་བྱ་བ',
      transliteration: 'dam por bya ba',
      keyInsight: 'Brown warns that many meditators mistake dull stability for genuine shamatha. The critical test: is the object vivid and clear, or merely present? "Sinking" feels peaceful but lacks the luminous clarity of true concentration.',
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
    brownNotes: {
      technique: 'Staying properly (legs par gnas pa): Brown describes the transition from effortful to natural staying. The practitioner develops "skill" (rtsal) — the mind naturally inclines toward the object. He introduces "taking mind as the object" (sems nyid) as an alternative practice.',
      tibetanTerm: 'ལེགས་པར་གནས་པ',
      transliteration: 'legs par gnas pa',
      keyInsight: 'Brown identifies this as the pivotal stage where meditation shifts from "doing something" to "being a certain way." The practitioner discovers that the mind has its own momentum toward stillness when elaboration is released.',
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
    brownNotes: {
      technique: 'Intensifying (\'dzin pa): Brown describes "taking hold" of clarity with increasing precision. The practitioner works with three levels of mind: coarse (rags pa), subtle (phra ba), and very subtle (shin tu phra ba). At this stage, coarse mind settles and subtle mind becomes the focus.',
      tibetanTerm: 'འཛིན་པ',
      transliteration: '\'dzin pa',
      keyInsight: 'Brown\'s three-level model of mind is unique: most traditions only distinguish coarse and subtle. His "very subtle mind" corresponds to the substrate consciousness (alaya-vijnana) and becomes the basis for later Mahamudra recognition.',
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
    brownNotes: {
      technique: 'Concentration without support (rten med): Brown introduces "samadhi without support" — the practitioner releases the meditation object and rests in bare awareness itself. This prepares the mind for the transition to Mahamudra practice.',
      tibetanTerm: 'རྟེན་མེད',
      transliteration: 'rten med',
      keyInsight: 'Brown identifies this as the critical juncture between ordinary shamatha and Mahamudra. The practitioner discovers that awareness does not need an object to be stable — awareness itself is naturally luminous and stable.',
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
    brownNotes: {
      technique: 'Extraordinary samadhi (thun mong ma yin pa\'i ting nge \'dzin): Brown describes how at this stage the practitioner can access "extraordinary" states where the distinction between meditation and post-meditation begins to dissolve. The mind stream (rgyud) becomes continuous.',
      tibetanTerm: 'ཐུན་མོང་མ་ཡིན་པའི་ཏིང་ངེ་འཛིན',
      transliteration: 'thun mong ma yin pa\'i ting nge \'dzin',
      keyInsight: 'Brown notes that this stage maps to the first yoga of Mahamudra — One-Pointedness (rtse gcig). The practitioner\'s concentrated mind is now a suitable vessel for receiving the pointing-out instructions from the guru.',
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
    brownNotes: {
      technique: 'Automatic settling (rang bzhag): Brown describes this as the mind\'s natural settling into its own ground. Pliancy (shin sbyangs) arises — a physical and mental bliss that signals genuine shamatha has been achieved. This is the foundation for both ordinary vipashyana and the extraordinary Mahamudra path.',
      tibetanTerm: 'རང་བཞག',
      transliteration: 'rang bzhag',
      keyInsight: 'Brown emphasizes that completed shamatha is not the goal but the prerequisite. The perfectly still mind becomes like a clear lake in which the nature of mind can be directly recognized. This is where "Pointing Out the Great Way" truly begins.',
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
