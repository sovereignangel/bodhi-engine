// Shamatha (Elephant Path) stage types

export interface ShamathaStage {
  stage: number // 1-9
  name: string
  tibetan: string
  transliteration: string
  description: string
  phenomenology: string // What practitioner experiences
  challenges: string[]
  practices: string[]

  elephant: {
    color: string // CSS color value (black to white gradient)
    opacity: number // 0.3 to 1.0
    monkeyPresent: boolean
    monkeyActivity: string
  }

  metrics: {
    description: string
    proxy: string // App metric that approximates this stage
  }
}

export interface ElephantPathProgress {
  currentStage: number
  stageProgress: number // 0-100 within current stage
  totalSessions: number
  averageSessionLength: number
  consistencyScore: number // Based on practice regularity
}
