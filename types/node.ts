// Knowledge graph node types

export interface NodeData {
  title: string
  tibetan: string
  subtitle: string
  description: string
  physics: string
  cogsci: string
  ai: string
}

export interface NodePosition {
  x: number
  y: number
}

export interface GraphNode extends NodeData {
  id: string
  position: NodePosition
  scope: 'foundation' | 'small' | 'middle' | 'great-method' | 'great-wisdom' | 'mahamudra' | 'enlightenment'
  color: string
  connections: string[]
}

export type NodeId =
  | 'enlightenment'
  | 'emptiness'
  | 'bodhicitta'
  | 'sixPerfections'
  | 'tonglen'
  | 'renunciation'
  | 'shamatha'
  | 'karma'
  | 'refuge'
  | 'preciousHuman'
  | 'impermanence'
  | 'dependentOrigination'
  | 'lowerRealms'
  | 'spiritualGuide'
  | 'vipashyana'
  | 'pointingOut'
  | 'fourYogas'
  // Extended for 365-day curriculum
  | 'eightFreedoms'
  | 'tenEndowments'
  | 'deathMeditation'
  | 'threeJewels'
  | 'buddhaNature'
  | 'purification'
  | 'twelveLinks'
  | 'threeSufferings'
  | 'sixRealms'
  | 'threeTrainings'
  | 'equanimity'
  | 'lovingKindness'
  | 'greatCompassion'
  | 'bodhisattvaVow'
  | 'selfCherishing'
  | 'cherishingOthers'
  | 'exchangeSelfOther'
  | 'generosity'
  | 'patience'
  | 'joyousEffort'
  | 'concentration'
  | 'wisdom'
  | 'twoTruths'
  | 'madhyamaka'
  | 'awarenessItself'
  | 'oceanMind'
  | 'eventPerspective'
  | 'onePointedness'
  | 'simplicity'
  | 'oneTaste'
  | 'nonMeditation'
  | 'postMeditation'
  | 'dedicationOfMerit'

export type LensType = 'physics' | 'cogsci' | 'ai'
