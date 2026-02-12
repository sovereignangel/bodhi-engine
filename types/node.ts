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

export type LensType = 'physics' | 'cogsci' | 'ai'
