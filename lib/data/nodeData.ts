// Knowledge graph node data extracted from lamrim-knowledge-graph.jsx
// Contains all 14 concepts of the Kadampa Lamrim with scientific bridges

import type { NodeData, NodeId } from '@/types/node'

export const nodeData: Record<NodeId, NodeData> = {
  enlightenment: {
    title: 'Enlightenment',
    tibetan: 'སངས་རྒྱས།',
    subtitle: 'Buddhahood',
    description: 'Complete awakening - the union of wisdom and compassion perfected',
    physics: 'Like the unified field theory - all apparent dualities resolved into one ground',
    cogsci: 'Optimal brain state - default mode network and task-positive network in perfect integration',
    ai: 'AGI alignment achieved - intelligence perfectly aligned with beneficial outcomes',
  },
  emptiness: {
    title: 'Emptiness',
    tibetan: 'སྟོང་པ་ཉིད།',
    subtitle: 'Sunyata',
    description: 'All phenomena lack inherent, independent existence',
    physics: "Quantum field theory - particles are excitations of fields, not independent 'things'",
    cogsci: "Predictive processing - the 'self' is a model, not a thing found in the brain",
    ai: 'No model has intrinsic meaning without training distribution and context',
  },
  bodhicitta: {
    title: 'Bodhicitta',
    tibetan: 'བྱང་ཆུབ་སེམས།',
    subtitle: 'Awakening Mind',
    description: 'The wish to attain enlightenment for the benefit of all beings',
    physics: 'Entanglement at scale - recognizing our fundamental interconnection',
    cogsci: 'Mirror neurons + theory of mind extended universally',
    ai: 'Alignment to collective human flourishing, not individual reward hacking',
  },
  sixPerfections: {
    title: 'Six Perfections',
    tibetan: 'ཕ་རོལ་ཏུ་ཕྱིན་པ།',
    subtitle: 'Paramitas',
    description: 'Generosity, Ethics, Patience, Effort, Concentration, Wisdom',
    physics: 'Six fundamental forces? No - six optimization targets for conscious systems',
    cogsci: 'Virtue development through deliberate practice and neural pathway strengthening',
    ai: 'Multi-objective optimization with wisdom as the meta-objective',
  },
  tonglen: {
    title: 'Tonglen',
    tibetan: 'གཏོང་ལེན།',
    subtitle: 'Taking & Giving',
    description: 'Breathing in suffering, breathing out happiness',
    physics: 'Entropy exchange - taking disorder, giving order',
    cogsci: 'Vagal tone training + compassion circuit activation',
    ai: 'Inverse reinforcement learning from suffering states',
  },
  renunciation: {
    title: 'Renunciation',
    tibetan: 'ངེས་འབྱུང།',
    subtitle: 'Nihsarana',
    description: 'The determination to be free from cyclic existence',
    physics: 'Escape velocity from the gravity well of habitual patterns',
    cogsci: "Overriding default mode network's hedonic treadmill",
    ai: 'Breaking out of local optima in reward space',
  },
  shamatha: {
    title: 'Shamatha',
    tibetan: 'ཞི་གནས།',
    subtitle: 'Calm Abiding',
    description: 'Single-pointed concentration perfected through 9 stages',
    physics: 'Coherent state - like laser light vs. scattered photons',
    cogsci: 'Sustained attention network fully trained, DMN regulated',
    ai: 'Attention mechanism with perfect context window utilization',
  },
  karma: {
    title: 'Karma',
    tibetan: 'ལས།',
    subtitle: 'Action & Result',
    description: 'Intentional actions create corresponding results',
    physics: 'Causality - every action has equal and opposite reaction (extended)',
    cogsci: 'Hebbian learning - neurons that fire together wire together',
    ai: 'Training data shapes model behavior - garbage in, garbage out',
  },
  refuge: {
    title: 'Refuge',
    tibetan: 'སྐྱབས་འགྲོ།',
    subtitle: 'Three Jewels',
    description: 'Buddha (teacher), Dharma (teaching), Sangha (community)',
    physics: 'Stable equilibrium point - a basin of attraction',
    cogsci: 'Secure attachment + epistemic trust in reliable sources',
    ai: 'Grounding in verified training data and human feedback',
  },
  preciousHuman: {
    title: 'Precious Human Life',
    tibetan: 'མི་ལུས་རིན་པོ་ཆེ།',
    subtitle: '8 Freedoms, 10 Endowments',
    description: 'The rare opportunity to practice Dharma',
    physics: 'Anthropic principle - conditions for consciousness are rare',
    cogsci: 'Metacognition - awareness of awareness is evolutionarily rare',
    ai: 'Compute is precious - don\'t waste inference on non-valuable tasks',
  },
  impermanence: {
    title: 'Death & Impermanence',
    tibetan: 'མི་རྟག་པ།',
    subtitle: 'Anitya',
    description: 'All compounded phenomena are impermanent',
    physics: 'Second law of thermodynamics - entropy always increases',
    cogsci: 'Temporal discounting bias must be overcome',
    ai: 'All models degrade - distribution shift is inevitable',
  },
  dependentOrigination: {
    title: 'Dependent Origination',
    tibetan: 'རྟེན་འབྲེལ།',
    subtitle: 'Pratityasamutpada',
    description: 'All phenomena arise from causes and conditions',
    physics: 'Quantum entanglement - nothing exists independently',
    cogsci: 'Embodied cognition - mind arises from brain-body-world interaction',
    ai: 'No token has meaning without context window',
  },
  lowerRealms: {
    title: 'Lower Realms',
    tibetan: 'ངན་འགྲོ།',
    subtitle: 'States to Avoid',
    description: 'Hell, hungry ghost, and animal realms of suffering',
    physics: 'High-entropy states - maximum disorder',
    cogsci: 'Chronic stress, addiction, and survival-mode consciousness',
    ai: 'Reward hacking, mode collapse, adversarial states',
  },
  spiritualGuide: {
    title: 'Spiritual Guide',
    tibetan: 'བླ་མ།',
    subtitle: 'Guru Yoga',
    description: 'Relying on a qualified teacher',
    physics: 'Catalyst - speeds reaction without being consumed',
    cogsci: 'Social learning + mirror neuron activation from expert',
    ai: 'RLHF - learning from human feedback and demonstration',
  },
  vipashyana: {
    title: 'Vipashyana',
    tibetan: 'ལྷག་མཐོང།',
    subtitle: 'Special Insight',
    description: 'Analytical meditation that penetrates the nature of reality. After stabilizing the mind through shamatha, vipashyana investigates selflessness and emptiness directly.',
    physics: 'Spectroscopy - using focused energy to reveal the internal structure of matter',
    cogsci: 'Deconstructive attention - the trained mind disassembles perceptual constructs to reveal underlying processes',
    ai: 'Interpretability research - probing neural networks to understand what representations actually encode',
  },
  pointingOut: {
    title: 'Pointing Out',
    tibetan: 'ངོ་སྤྲོད།',
    subtitle: 'Ngo Sprod',
    description: 'The guru\'s direct introduction to the nature of mind. In the Mahamudra tradition, the teacher points out awareness itself - not as an object to find, but as the very medium of all experience.',
    physics: 'The observer effect - the act of measurement reveals what was always present in the quantum field',
    cogsci: 'Metacognitive shift - attention turns to recognize itself as awareness rather than its contents',
    ai: 'Self-supervised learning - the system discovers its own representational structure without external labels',
  },
  fourYogas: {
    title: 'Four Yogas',
    tibetan: 'རྣལ་འབྱོར་བཞི།',
    subtitle: 'Mahamudra Realization',
    description: 'The four stages of Mahamudra realization: One-Pointedness (rtse gcig), Simplicity (spros bral), One Taste (ro gcig), and Nonmeditation (sgom med). From Daniel P. Brown\'s framework in "Pointing Out the Great Way."',
    physics: 'Phase transitions - water → ice → vapor → plasma, each a fundamentally different state of the same substance',
    cogsci: 'Stages of expertise - from conscious competence to unconscious mastery where skill becomes nature',
    ai: 'Emergent capabilities at scale - qualitative shifts in model behavior at critical parameter thresholds',
  },
}

// Node IDs grouped by scope for easy iteration
export const nodesByScope = {
  foundation: ['spiritualGuide', 'preciousHuman', 'impermanence'] as NodeId[],
  small: ['lowerRealms', 'refuge', 'karma', 'dependentOrigination'] as NodeId[],
  middle: ['renunciation', 'shamatha'] as NodeId[],
  'great-method': ['tonglen', 'sixPerfections', 'bodhicitta'] as NodeId[],
  'great-wisdom': ['emptiness', 'vipashyana'] as NodeId[],
  mahamudra: ['pointingOut', 'fourYogas'] as NodeId[],
  enlightenment: ['enlightenment'] as NodeId[],
}

// All node IDs as an array
export const allNodeIds: NodeId[] = Object.values(nodesByScope).flat()

// Get node by ID with type safety
export function getNode(id: NodeId): NodeData {
  return nodeData[id]
}
