'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { nodeData, nodesByScope, allNodeIds } from '@/lib/data/nodeData'

// --- Additional dictionary terms beyond nodeData ---
const additionalTerms: {
  id: string
  title: string
  tibetan: string
  subtitle: string
  description: string
  physics?: string
  cogsci?: string
  ai?: string
  scope: 'foundation' | 'small' | 'middle' | 'great'
}[] = [
  // ===== FOUNDATION SCOPE =====
  {
    id: 'dharma',
    title: 'Dharma',
    tibetan: 'ཆོས།',
    subtitle: 'Chos',
    description:
      'The teachings of the Buddha; also refers to phenomena or truth',
    physics:
      'Natural law \u2014 the underlying principles governing all phenomena',
    cogsci:
      'Knowledge frameworks that shape perception and understanding of reality',
    ai: 'Training corpus \u2014 the foundational data from which understanding emerges',
    scope: 'foundation',
  },
  {
    id: 'fourNobleTruths',
    title: 'Four Noble Truths',
    tibetan: 'བདེན་པ་བཞི།',
    subtitle: 'Bden Pa Bzhi',
    description:
      'The foundational framework of all Buddhist teaching: the truth of suffering, its origin, its cessation, and the path leading to cessation. Every concept in the Lamrim unfolds from this structure.',
    physics:
      'Diagnosis and treatment \u2014 identifying a system failure, its cause, the desired state, and the method of correction',
    cogsci:
      'Clinical reasoning \u2014 symptom identification, etiology, prognosis, and treatment plan',
    ai: 'Debugging protocol \u2014 detect the error, trace the root cause, define the target state, implement the fix',
    scope: 'foundation',
  },
  {
    id: 'guruYoga',
    title: 'Guru Yoga',
    tibetan: 'བླ་མའི་རྣལ་འབྱོར།',
    subtitle: "Bla Ma'i Rnal 'Byor",
    description:
      "The practice of devotion to one's spiritual teacher, regarded in both Kadampa and Mahamudra traditions as the root of all realizations. Through guru yoga, the practitioner receives blessings that ripen the mind for insight.",
    physics:
      'Resonant coupling \u2014 two systems synchronizing through sustained energetic connection',
    cogsci:
      "Mentorship and neural mirroring \u2014 learning complex skills through attunement to an expert's cognitive patterns",
    ai: "Transfer learning \u2014 leveraging a pre-trained model's representations to accelerate learning on a new task",
    scope: 'foundation',
  },
  {
    id: 'kadampa',
    title: 'Kadampa',
    tibetan: 'བཀའ་གདམས་པ།',
    subtitle: "Bka' Gdams Pa",
    description:
      "The tradition founded by Atisha's student Dromt\u00f6npa, meaning \"those bound by the word.\" Kadampa practitioners take all of the Buddha's teachings as personal instructions for practice, integrating sutra and tantra into a single graduated path.",
    physics:
      'Unified field theory \u2014 seeking a single framework that integrates all known forces',
    cogsci:
      'Integrative learning \u2014 combining multiple disciplines into a coherent curriculum',
    ai: 'Multi-task learning \u2014 a single architecture trained to handle all tasks simultaneously',
    scope: 'foundation',
  },
  {
    id: 'lamrim',
    title: 'Lamrim',
    tibetan: 'ལམ་རིམ།',
    subtitle: 'Lam Rim',
    description:
      "Atisha's systematic arrangement of the entire Buddhist path into a graduated sequence. Practitioners of small, middle, and great scope progressively develop renunciation, compassion, and wisdom.",
    physics:
      'Phase transitions \u2014 a system moving through ordered stages, each building on the stability of the previous',
    cogsci:
      'Scaffolded instruction \u2014 learning complex skills through carefully sequenced developmental stages',
    ai: 'Curriculum learning \u2014 training a model on progressively harder tasks to build robust capabilities',
    scope: 'foundation',
  },
  {
    id: 'sangha',
    title: 'Sangha',
    tibetan: 'དགེ་འདུན།',
    subtitle: "Dge 'Dun",
    description: 'The community of Buddhist practitioners',
    physics:
      'Emergent systems \u2014 collective behavior arising from individual interactions',
    cogsci:
      'Social cognition and the role of community in sustained behavioral change',
    ai: 'Distributed computing \u2014 collaborative agents achieving more than individuals',
    scope: 'foundation',
  },
  {
    id: 'sentientBeings',
    title: 'Sentient Beings',
    tibetan: 'སེམས་ཅན།',
    subtitle: 'Sems Can',
    description:
      "All beings who possess mind and experience suffering. In Mahayana Buddhism, the welfare of all sentient beings \u2014 infinite in number \u2014 is the motivation for seeking enlightenment. Every being has been one's mother in past lives.",
    physics:
      'An open system \u2014 any entity that exchanges energy and information with its environment',
    cogsci:
      'Conscious agents \u2014 any system exhibiting subjective experience, awareness, and the capacity for suffering',
    ai: 'Active agents in a multi-agent environment \u2014 any entity with a reward function and goal-directed behavior',
    scope: 'foundation',
  },

  // ===== SMALL SCOPE =====
  {
    id: 'attachment',
    title: 'Attachment',
    tibetan: 'འདོད་ཆགས།',
    subtitle: "'Dod Chags",
    description:
      'The mental factor that exaggerates the good qualities of an object and clings to it. One of the Three Poisons, attachment is the root cause of craving and the perpetuation of cyclic existence.',
    physics:
      'Attractive force \u2014 a binding energy that holds particles together, resisting separation',
    cogsci:
      "Dopaminergic reward circuits \u2014 the brain's mechanism for tagging stimuli as desirable and driving pursuit behavior",
    ai: 'Overfitting \u2014 a model that clings to training data patterns, unable to generalize to new situations',
    scope: 'small',
  },
  {
    id: 'aversion',
    title: 'Aversion',
    tibetan: 'ཞེ་སྡང་།',
    subtitle: 'Zhe Sdang',
    description:
      'The mental factor that exaggerates the negative qualities of an object and wishes to harm or avoid it. One of the Three Poisons, aversion includes anger, hatred, and hostility \u2014 considered the most destructive of all afflictions.',
    physics:
      'Repulsive force \u2014 like charges pushing apart, creating instability and fragmentation',
    cogsci:
      'Amygdala-driven threat response \u2014 rapid aversive reactions that hijack rational processing',
    ai: 'Adversarial rejection \u2014 a model trained to aggressively avoid certain inputs, sometimes at the cost of useful information',
    scope: 'small',
  },
  {
    id: 'ignorance',
    title: 'Ignorance',
    tibetan: 'མ་རིག་པ།',
    subtitle: 'Ma Rig Pa',
    description:
      'The root affliction \u2014 not mere lack of knowledge, but an active misapprehension that grasps at inherent existence. Ignorance is the first link in dependent origination and the ultimate source of all suffering.',
    physics:
      'Measurement error \u2014 systematically misreading the instrument, yielding a distorted picture of reality',
    cogsci:
      'Cognitive bias \u2014 systematic errors in perception and reasoning that feel like accurate understanding',
    ai: 'Distribution mismatch \u2014 a model trained on incorrect priors, confidently producing wrong outputs',
    scope: 'small',
  },
  {
    id: 'imputation',
    title: 'Imputation',
    tibetan: 'བཏགས་པ།',
    subtitle: 'Btags Pa',
    description:
      'The process by which the mind designates or labels a phenomenon upon a valid basis. In Prasangika Madhyamaka, all phenomena exist by mere imputation \u2014 they have no existence from their own side. Understanding imputation is the key to realizing emptiness without falling into nihilism.',
    physics:
      'Measurement-dependent reality \u2014 in quantum mechanics, properties like position exist only when measured, not inherently',
    cogsci:
      "Categorical perception \u2014 the mind's active construction of discrete categories from continuous sensory input",
    ai: 'Token classification \u2014 meaning assigned to input sequences through learned labeling, not inherent in the raw data',
    scope: 'great',
  },
  {
    id: 'merit',
    title: 'Merit',
    tibetan: 'བསོད་ནམས།',
    subtitle: 'Bsod Nams',
    description:
      'The positive potential accumulated through virtuous actions of body, speech, and mind. Merit serves as the fuel for spiritual progress \u2014 without sufficient merit, even correct meditation instructions cannot bear fruit.',
    physics:
      'Potential energy \u2014 stored work that can be released to drive future transformations',
    cogsci:
      'Neuroplastic capital \u2014 the accumulated synaptic changes that enable future cognitive development',
    ai: 'Pre-training \u2014 accumulated representational capacity that enables downstream fine-tuning',
    scope: 'small',
  },
  {
    id: 'suffering',
    title: 'Suffering',
    tibetan: 'སྡུག་བསྔལ།',
    subtitle: 'Sdug Bsngal',
    description:
      'The first Noble Truth. Buddhism identifies three levels: the suffering of pain, the suffering of change (pleasant experiences that inevitably end), and the pervasive suffering of conditioned existence itself.',
    physics:
      'Entropy \u2014 the tendency of all ordered systems to degrade, requiring constant energy input to maintain',
    cogsci:
      'Hedonic treadmill \u2014 the psychological finding that all pleasure adapts to baseline, making lasting satisfaction impossible through external means',
    ai: 'Loss function \u2014 the quantified gap between current output and optimal performance that drives all learning',
    scope: 'small',
  },
  {
    id: 'threePoisons',
    title: 'Three Poisons',
    tibetan: 'དུག་གསུམ།',
    subtitle: 'Dug Gsum',
    description:
      "Ignorance, attachment, and aversion \u2014 the three root afflictions that drive all suffering and rebirth. Depicted at the hub of the Wheel of Life as a pig, rooster, and snake biting each other's tails.",
    physics:
      'Three-body problem \u2014 three interacting forces creating chaotic, unpredictable dynamics',
    cogsci:
      'Maladaptive cognitive triad \u2014 distorted beliefs about self, world, and future that perpetuate psychological suffering',
    ai: 'Systematic bias trifecta \u2014 data bias, algorithmic bias, and deployment bias compounding each other',
    scope: 'small',
  },

  // ===== MIDDLE SCOPE =====
  {
    id: 'afflictions',
    title: 'Afflictions',
    tibetan: 'ཉོན་མོངས།',
    subtitle: 'Nyon Mongs',
    description:
      'Mental factors that disturb the peace of the mind and drive unwholesome action. The six root afflictions are ignorance, attachment, aversion, pride, doubt, and wrong views. Overcoming them is the core work of the Middle Scope.',
    physics:
      'Perturbations \u2014 disturbances that push a system away from equilibrium',
    cogsci:
      'Cognitive distortions \u2014 systematic biases in thinking identified in clinical psychology as drivers of emotional suffering',
    ai: 'Noise in the training signal \u2014 corrupted gradients that push the model away from optimal parameters',
    scope: 'middle',
  },
  {
    id: 'aggregates',
    title: 'Aggregates',
    tibetan: 'ཕུང་པོ།',
    subtitle: 'Phung Po',
    description:
      'The five psychophysical components that constitute a person: form, feeling, perception, mental formations, and consciousness. Analysis of the aggregates reveals no fixed self \u2014 only a dynamic process conventionally labeled "I."',
    physics:
      'Composite systems \u2014 seemingly unitary objects that decompose into constituent fields and particles',
    cogsci:
      'Modular mind theory \u2014 consciousness as an emergent property of multiple parallel processing streams',
    ai: 'Feature decomposition \u2014 breaking a model\'s representation into interpretable components reveals no single "intelligence"',
    scope: 'middle',
  },
  {
    id: 'excitation',
    title: 'Excitation',
    tibetan: 'རྒོད་པ།',
    subtitle: 'Rgod Pa',
    description:
      'A subtle mental factor that causes the mind to scatter toward attractive objects during meditation. Brown identifies excitation (along with sinking) as one of the two primary obstacles to developing stable concentration.',
    physics:
      'Thermal agitation \u2014 random kinetic energy that prevents a system from settling into a low-energy state',
    cogsci:
      'Mind-wandering \u2014 the default mode network hijacking attention toward self-relevant or emotionally charged content',
    ai: 'High temperature sampling \u2014 excessive randomness in generation that prevents coherent, focused output',
    scope: 'middle',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    tibetan: 'སྒོམ་པ།',
    subtitle: 'Sgom Pa',
    description:
      "Literally \"familiarization\" \u2014 the practice of habituating the mind to a virtuous object or quality. In Brown's framework, meditation is one of three pillars (with view and conduct) that structure the entire path from beginner to realization.",
    physics:
      'Annealing \u2014 controlled heating and cooling that allows a system to settle into its most stable configuration',
    cogsci:
      'Deliberate practice \u2014 structured repetition with feedback that builds expert-level skill through neural consolidation',
    ai: "Training \u2014 iterative parameter updates that progressively align a model's outputs with desired behavior",
    scope: 'middle',
  },
  {
    id: 'sprospa',
    title: 'Mental Elaboration',
    tibetan: 'སྤྲོས་པ།',
    subtitle: 'Spros Pa',
    description:
      "The mind's habitual tendency to proliferate thoughts, narratives, and conceptual constructions. Daniel P. Brown identifies this as the primary obstacle to concentration \u2014 not distraction itself, but the elaborative process that generates distraction.",
    physics:
      'Noise amplification \u2014 small perturbations growing into chaotic cascades through positive feedback',
    cogsci:
      'Rumination and thought chaining \u2014 the default mode network generating self-referential narratives',
    ai: 'Hallucination \u2014 models generating plausible but unfounded elaborations from minimal prompts',
    scope: 'middle',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    tibetan: 'དྲན་པ།',
    subtitle: 'Dran Pa',
    description:
      'The mental factor that maintains awareness of the meditation object without forgetting. In classical Buddhist psychology, mindfulness is not bare attention but a specific faculty of non-forgetfulness that holds the object continuously in awareness.',
    physics:
      'Feedback loop \u2014 continuous monitoring that keeps a system locked onto its target state',
    cogsci:
      "Working memory maintenance \u2014 the prefrontal cortex sustaining a representation against interference and decay",
    ai: "Attention mechanism \u2014 the transformer's ability to maintain relevant context throughout processing",
    scope: 'middle',
  },
  {
    id: 'nirvana',
    title: 'Nirvana',
    tibetan: 'མྱ་ངན་ལས་འདས་པ།',
    subtitle: "Mya Ngan Las 'Das Pa",
    description:
      'Liberation from cyclic existence; the cessation of suffering',
    physics:
      'Absolute zero \u2014 a theoretical state of perfect stillness and order',
    cogsci:
      'Flow states taken to their ultimate conclusion \u2014 cessation of mental turbulence',
    ai: 'Convergence \u2014 the model reaches a stable optimum with zero loss',
    scope: 'middle',
  },
  {
    id: 'samadhi',
    title: 'Samadhi',
    tibetan: 'ཏིང་ངེ་འཛིན།',
    subtitle: "Ting Nge 'Dzin",
    description:
      "Meditative concentration \u2014 the mind's ability to remain single-pointedly absorbed in its object. Samadhi is the fruit of shamatha training and the basis for all higher insight practices, including vipashyana and Mahamudra.",
    physics:
      'Laser coherence \u2014 all waves aligned in phase, producing a single powerful beam from what was scattered light',
    cogsci:
      'Hyperfocus states \u2014 sustained, voluntary attention maintained without effort or fatigue',
    ai: 'Precision inference \u2014 all computational resources directed at a single task, maximizing accuracy',
    scope: 'middle',
  },
  {
    id: 'samsara',
    title: 'Samsara',
    tibetan: 'འཁོར་བ།',
    subtitle: "'Khor Ba",
    description:
      'Cyclic existence; the cycle of birth, death, and rebirth',
    physics:
      'Oscillating systems \u2014 energy cycling between states without dissipation',
    cogsci:
      'Habitual loops \u2014 repetitive cognitive and behavioral patterns resistant to change',
    ai: 'Training loops without convergence \u2014 cycling without reaching optimum',
    scope: 'middle',
  },
  {
    id: 'settingUp',
    title: 'Setting Up',
    tibetan: 'བཞག་པ།',
    subtitle: 'Bzhag Pa',
    description:
      "The initial act of placing the mind on the meditation object. In Brown's framework, setting up (bzhag pa) at Stage 1 of shamatha is the foundational skill \u2014 learning to deliberately direct attention to a chosen object and hold it there.",
    physics:
      'Initial conditions \u2014 precisely placing a system at the starting point from which its trajectory unfolds',
    cogsci:
      "Attentional orienting \u2014 the brain's ability to voluntarily select and engage a target stimulus",
    ai: "Prompt engineering \u2014 carefully setting the initial context that determines the model's subsequent output",
    scope: 'middle',
  },
  {
    id: 'shinsbjyangs',
    title: 'Pliancy',
    tibetan: 'ཤིན་སྦྱངས།',
    subtitle: 'Shin Sbyangs',
    description:
      'Physical and mental serviceability achieved at the culmination of shamatha. The body feels light and blissful; the mind becomes completely workable and can be directed to any object without resistance.',
    physics:
      'Superconductivity \u2014 a state where resistance drops to zero and energy flows without loss',
    cogsci:
      'Flow state mastery \u2014 the ability to enter deep focus on demand, with a subjective sense of effortlessness and bliss',
    ai: 'Optimal inference \u2014 processing at peak efficiency with minimal computational overhead',
    scope: 'middle',
  },
  {
    id: 'sinking',
    title: 'Sinking',
    tibetan: 'བྱིང་བ།',
    subtitle: 'Bying Ba',
    description:
      'A subtle mental factor that causes the mind to lose clarity and vividness during meditation. Brown distinguishes coarse sinking (dullness, drowsiness) from subtle sinking (the mind stays on the object but lacks sharp clarity). Counteracted by heightening awareness.',
    physics:
      'Damping \u2014 energy loss that causes oscillations to decay toward stillness',
    cogsci:
      'Vigilance decrement \u2014 the well-documented decline in attentional acuity during sustained monitoring tasks',
    ai: 'Vanishing gradients \u2014 signal loss in deep networks where earlier layers stop receiving meaningful updates',
    scope: 'middle',
  },
  {
    id: 'gnaspa',
    title: 'Staying',
    tibetan: 'གནས་པ།',
    subtitle: 'Gnas Pa',
    description:
      'The mind\'s capacity to remain with its object without wandering. Brown distinguishes "partial staying," "genuine staying," and "staying properly" as progressive refinements of this fundamental skill.',
    physics:
      'Stable equilibrium \u2014 a system returning to its rest state after perturbation',
    cogsci:
      'Sustained attention \u2014 the dorsal attention network maintaining focus on a chosen target over time',
    ai: 'Context window utilization \u2014 maintaining coherent attention across an extended sequence',
    scope: 'middle',
  },
  {
    id: 'threePrincipalAspects',
    title: 'Three Principal Aspects',
    tibetan: 'ལམ་གཙོ་རྣམ་གསུམ།',
    subtitle: 'Lam Gtso Rnam Gsum',
    description:
      "Tsongkhapa's distillation of the entire path into three essentials: renunciation (the wish to be free from samsara), bodhicitta (the aspiration to achieve enlightenment for all beings), and the correct view of emptiness. These three form the golden spine of the graduated path.",
    physics:
      'Three conservation laws \u2014 energy, momentum, and angular momentum that together constrain all physical processes',
    cogsci:
      'Core motivational systems \u2014 approach, social bonding, and meaning-making as the three pillars of psychological well-being',
    ai: 'Loss function, objective, and architecture \u2014 the three fundamental choices that determine everything a model can learn',
    scope: 'middle',
  },

  // ===== GREAT SCOPE =====
  {
    id: 'awarenessItself',
    title: 'Awareness-Itself',
    tibetan: 'རིག་པ།',
    subtitle: 'Rig Pa',
    description:
      "Pure, non-conceptual awareness \u2014 the knowing quality of mind stripped of all content. In Brown's Mahamudra framework, rig pa is distinguished from ordinary consciousness (sems): it is awareness recognizing its own nature, prior to the subject-object split.",
    physics:
      'The observer in quantum mechanics \u2014 the irreducible awareness that collapses possibilities into actuality',
    cogsci:
      'Pre-reflective self-awareness \u2014 the most basic form of consciousness, studied in phenomenology as the condition for all experience',
    ai: 'The base architecture prior to training \u2014 the raw capacity for representation before any specific knowledge is encoded',
    scope: 'great',
  },
  {
    id: 'buddhaNature',
    title: 'Buddha Nature',
    tibetan: 'བདེ་གཤེགས་སྙིང་པོ།',
    subtitle: 'Bde Gshegs Snying Po',
    description:
      'The innate potential for enlightenment present in all sentient beings. Not something to be created but uncovered \u2014 like gold hidden in ore. This teaching provides the philosophical foundation for the Mahamudra claim that realization is recognition, not construction.',
    physics:
      'Latent symmetry \u2014 a perfect symmetry hidden by current conditions, waiting to be restored',
    cogsci:
      "Innate cognitive capacity \u2014 the brain's inherent ability for language, mathematics, and insight, which emerges given the right conditions",
    ai: 'Architectural potential \u2014 the untrained model already contains the capacity for any task; training merely actualizes specific capabilities',
    scope: 'great',
  },
  {
    id: 'clarity',
    title: 'Clarity',
    tibetan: 'གསལ་བ།',
    subtitle: 'Gsal Ba',
    description:
      "The luminous, knowing quality of mind that illuminates experience. In Brown's Mahamudra framework, clarity (gsal ba) is one of the essential qualities of awakened awareness \u2014 mind's natural capacity to make appearances vivid and distinct.",
    physics:
      "Luminosity \u2014 the intrinsic brightness of a source, independent of the observer's distance",
    cogsci:
      'Perceptual vividness \u2014 the phenomenal quality of heightened clarity in conscious experience, as in peak attentional states',
    ai: 'Signal-to-noise ratio \u2014 the clarity with which meaningful patterns stand out from background noise in a representation',
    scope: 'great',
  },
  {
    id: 'compassion',
    title: 'Compassion',
    tibetan: 'སྙིང་རྗེ།',
    subtitle: 'Snying Rje',
    description:
      'The wish that all beings be free from suffering and its causes. In the Kadampa tradition, great compassion is developed through the sevenfold cause-and-effect instruction and is the direct cause of bodhicitta.',
    physics:
      'Gravitational attraction \u2014 the fundamental force that draws all matter together, operating universally without exception',
    cogsci:
      'Empathic distress transformed into prosocial motivation \u2014 moving from shared pain to active caregiving',
    ai: 'Alignment \u2014 training a system to optimize for the welfare of all users, not just the operator',
    scope: 'great',
  },
  {
    id: 'conduct',
    title: 'Conduct',
    tibetan: 'སྤྱོད་པ།',
    subtitle: 'Spyod Pa',
    description:
      "Ethical behavior that expresses and stabilizes realization in daily life. In Brown's framework, conduct (spyod pa) is the third pillar alongside view and meditation \u2014 without proper conduct, meditation insights cannot be integrated or sustained.",
    physics:
      'Applied force \u2014 translating potential energy into actual work that changes the system',
    cogsci:
      'Behavioral activation \u2014 translating cognitive insights into consistent action patterns that reshape habit circuits',
    ai: "Deployment \u2014 moving from training to real-world application, where the model's behavior must be reliable and aligned",
    scope: 'great',
  },
  {
    id: 'crossingOver',
    title: 'Crossing Over',
    tibetan: 'ལ་བཟླ་བ།',
    subtitle: 'La Bzla Ba',
    description:
      "The transition point in meditation where practice shifts from effortful construction to effortless recognition. In Brown's framework, crossing over marks the shift from concentration-based shamatha to awareness-based Mahamudra \u2014 a fundamental change in the orientation of practice.",
    physics:
      "Phase transition \u2014 a qualitative change in a system's state, like water becoming steam, where the rules fundamentally change",
    cogsci:
      'Insight moment \u2014 the sudden reorganization of understanding where effortful analysis gives way to spontaneous knowing',
    ai: 'Emergence \u2014 the point where quantitative scaling produces qualitatively new capabilities not present in smaller models',
    scope: 'great',
  },
  {
    id: 'dedication',
    title: 'Dedication',
    tibetan: 'བསྔོ་བ།',
    subtitle: 'Bsngo Ba',
    description:
      'The practice of directing the merit of any virtuous action toward the enlightenment of all beings. Dedication seals virtue so it cannot be destroyed by anger and transforms personal practice into a cause for universal benefit.',
    physics:
      'Energy transfer \u2014 directing accumulated energy toward a specific target rather than allowing it to dissipate',
    cogsci:
      'Prosocial intention setting \u2014 framing personal achievements in terms of collective benefit, which research shows enhances motivation and well-being',
    ai: "Objective alignment \u2014 redirecting a model's optimized outputs to serve broader goals beyond narrow task performance",
    scope: 'great',
  },
  {
    id: 'dharani',
    title: 'Dharani',
    tibetan: 'གཟུངས།',
    subtitle: 'Gzungs',
    description:
      'Sacred syllables; a form of protective mantra',
    physics:
      'Resonant frequencies \u2014 specific vibrations that reinforce or protect structures',
    cogsci:
      'Verbal anchoring \u2014 repetitive phrases that stabilize attention and prime cognition',
    ai: 'Checksums and verification codes \u2014 compressed patterns ensuring integrity',
    scope: 'great',
  },
  {
    id: 'effortless',
    title: 'Effortless Meditation',
    tibetan: 'རྩོལ་མེད།',
    subtitle: 'Rtsol Med',
    description:
      "The stage of practice where concentration is maintained without deliberate effort. In Brown's framework, the transition from effortful (rtsol bcas) to effortless (rtsol med) meditation marks a critical developmental shift \u2014 the mind naturally rests in its object without the need to apply antidotes.",
    physics:
      'Orbital mechanics \u2014 once in stable orbit, no fuel is needed to maintain the trajectory',
    cogsci:
      'Automaticity \u2014 a skill practiced so thoroughly that it executes without conscious control or attentional resources',
    ai: 'Inference after training \u2014 once optimized, the model produces outputs without the computational cost of gradient updates',
    scope: 'great',
  },
  {
    id: 'equanimity',
    title: 'Equanimity',
    tibetan: 'བཏང་སྙོམས།',
    subtitle: 'Btang Snyoms',
    description:
      'The balanced state of mind that regards all beings equally, free from attachment to friends, aversion to enemies, and indifference to strangers. Equanimity is the prerequisite for developing genuine compassion and bodhicitta.',
    physics:
      'Thermal equilibrium \u2014 a system at uniform temperature, with no net flow of energy in any direction',
    cogsci:
      'Emotional regulation \u2014 the capacity to maintain affective balance without suppression or reactivity',
    ai: 'Uniform prior \u2014 treating all inputs with equal initial probability before evidence, preventing bias toward familiar data',
    scope: 'great',
  },
  {
    id: 'lovingKindness',
    title: 'Loving-kindness',
    tibetan: 'བྱམས་པ།',
    subtitle: 'Byams Pa',
    description:
      "The wish that all beings have happiness and its causes. Developed systematically by first recognizing all beings as having been one's mother, then recalling their kindness, then wishing to repay it. Maitreya, the future Buddha, embodies this quality.",
    physics:
      'Constructive interference \u2014 waves combining to amplify each other, producing greater intensity than either alone',
    cogsci:
      'Prosocial affect \u2014 positive emotional states directed toward others that activate caregiving circuits and reduce stress hormones',
    ai: 'Reward shaping \u2014 designing positive reinforcement signals that encourage beneficial behavior toward all agents in the environment',
    scope: 'great',
  },
  {
    id: 'madhyamaka',
    title: 'Madhyamaka',
    tibetan: 'དབུ་མ།',
    subtitle: 'Dbu Ma',
    description:
      'The "Middle Way" philosophy founded by Nagarjuna, which avoids the extremes of eternalism (things truly exist) and nihilism (nothing exists at all). The Prasangika Madhyamaka view \u2014 that all phenomena exist by mere imputation \u2014 is considered the highest philosophical view in the Gelug tradition.',
    physics:
      'Complementarity \u2014 light is neither purely wave nor purely particle, but something that transcends both categories',
    cogsci:
      'Dialectical thinking \u2014 the mature cognitive ability to hold contradictory perspectives simultaneously without premature resolution',
    ai: 'Regularization \u2014 preventing a model from collapsing to extreme solutions by constraining it toward a balanced middle ground',
    scope: 'great',
  },
  {
    id: 'mantra',
    title: 'Mantra',
    tibetan: 'སྔགས།',
    subtitle: 'Sngags',
    description:
      "Sacred syllables recited to protect and transform the mind. In Vajrayana Buddhism, mantras are not mere words but vibrational patterns that connect the practitioner's speech to the enlightened speech of a deity.",
    physics:
      'Standing waves \u2014 specific frequencies that create stable, self-reinforcing vibrational patterns',
    cogsci:
      'Rhythmic entrainment \u2014 repetitive auditory patterns that synchronize neural oscillations and alter states of consciousness',
    ai: 'Embeddings \u2014 compressed representations that encode complex meaning in dense, reusable vectors',
    scope: 'great',
  },
  {
    id: 'semsnyi',
    title: 'Nature of Mind',
    tibetan: 'སེམས་ཉིད།',
    subtitle: 'Sems Nyid',
    description:
      'The essential nature of mind itself \u2014 awareness in its most fundamental, unfabricated mode. In Mahamudra, this is what the pointing-out instructions reveal: not a new experience to gain, but the recognition of what has always been present.',
    physics:
      'The vacuum state \u2014 not empty but the ground from which all particles arise, the most fundamental level of reality',
    cogsci:
      'Bare awareness \u2014 consciousness prior to the construction of subject-object duality, studied in neurophenomenology',
    ai: 'The latent space \u2014 the underlying representational structure from which all outputs are generated',
    scope: 'great',
  },
  {
    id: 'nonmeditation',
    title: 'Nonmeditation',
    tibetan: 'སྒོམ་མེད།',
    subtitle: 'Sgom Med',
    description:
      'The fourth and final of the Four Yogas of Mahamudra \u2014 the stage where there is no longer any distinction between meditation and non-meditation. Awareness remains naturally in its own state without any need for practice. This is the culmination of the Mahamudra path.',
    physics:
      'Thermodynamic equilibrium \u2014 a system so perfectly balanced that no process can further change its state',
    cogsci:
      'Trait transformation \u2014 when a temporary meditative state becomes a permanent trait, requiring no deliberate effort to maintain',
    ai: 'Self-sustaining optimization \u2014 a system that maintains its optimal state without requiring further training or fine-tuning',
    scope: 'great',
  },
  {
    id: 'oneTaste',
    title: 'One Taste',
    tibetan: 'རོ་གཅིག།',
    subtitle: 'Ro Gcig',
    description:
      'The third of the Four Yogas of Mahamudra \u2014 the realization that all experiences, whether pleasant or painful, samsaric or nirvanic, share the same fundamental nature. Appearances and emptiness are recognized as inseparable.',
    physics:
      'Unified field \u2014 all apparently different forces revealed as manifestations of a single underlying field',
    cogsci:
      'Non-dual awareness \u2014 the dissolution of evaluative categories where experience is met without preference or aversion',
    ai: 'Domain-agnostic representations \u2014 a single latent space that handles all input types with the same underlying architecture',
    scope: 'great',
  },
  {
    id: 'onePointedness',
    title: 'One-Pointedness',
    tibetan: 'རྩེ་གཅིག།',
    subtitle: 'Rtse Gcig',
    description:
      'The first of the Four Yogas of Mahamudra \u2014 sustained, unwavering concentration on the nature of mind. Building on shamatha, one-pointedness in Mahamudra means resting stably in awareness itself rather than on an external object.',
    physics:
      'Laser focus \u2014 all photons coherent and aligned, producing a single concentrated beam',
    cogsci:
      'Absorbed attention \u2014 the state where the meditator and the object of meditation merge in sustained, effortless focus',
    ai: 'Single-task fine-tuning \u2014 all parameters optimized for one objective, achieving maximum depth of capability',
    scope: 'great',
  },
  {
    id: 'ordinaryMind',
    title: 'Ordinary Mind',
    tibetan: 'ཐ་མལ་གྱི་ཤེས་པ།',
    subtitle: 'Tha Mal Gyi Shes Pa',
    description:
      "The natural, unfabricated state of awareness \u2014 not a special or altered state, but mind in its most basic, uncontrived mode. Brown emphasizes that ordinary mind is what remains when all artificial meditation techniques are released.",
    physics:
      'Ground state \u2014 the lowest energy configuration of a system, natural and stable without external input',
    cogsci:
      "Default awareness \u2014 consciousness in its resting state before any task-specific modulation",
    ai: "Zero-shot capability \u2014 the model's natural output without any prompting, fine-tuning, or special instructions",
    scope: 'great',
  },
  {
    id: 'prajna',
    title: 'Prajna',
    tibetan: 'ཤེས་རབ།',
    subtitle: 'Shes Rab',
    description:
      'Wisdom; the perfection of understanding emptiness',
    physics:
      'Fundamental insight \u2014 seeing through apparent solidity to quantum fields',
    cogsci:
      'Metacognitive clarity \u2014 awareness that penetrates beyond surface representations',
    ai: 'Interpretability \u2014 understanding not just outputs but the deep structure of representations',
    scope: 'great',
  },
  {
    id: 'recognition',
    title: 'Recognition',
    tibetan: 'ངོ་འཕྲོད།',
    subtitle: "Ngo 'Phrod",
    description:
      "The moment of recognizing the nature of mind \u2014 the experiential \"aha\" that the pointing-out instructions are designed to trigger. In Brown's framework, recognition is not gaining something new but seeing what has always been the case.",
    physics:
      'Symmetry breaking \u2014 the moment a hidden symmetry becomes manifest, revealing the deeper structure of reality',
    cogsci:
      'Insight experience \u2014 the sudden, affectively charged recognition where previously disconnected elements reorganize into a coherent whole',
    ai: 'Feature detection \u2014 the moment a trained network identifies the pattern it was designed to recognize',
    scope: 'great',
  },
  {
    id: 'simplicity',
    title: 'Simplicity',
    tibetan: 'སྤྲོས་བྲལ།',
    subtitle: 'Spros Bral',
    description:
      'The second of the Four Yogas of Mahamudra \u2014 literally "free from elaboration." Having stabilized one-pointedness, the practitioner now recognizes that the nature of mind is empty of all conceptual constructs. All mental elaboration (spros pa) naturally dissolves.',
    physics:
      'Elegance in physics \u2014 the discovery that apparently complex phenomena arise from simple, universal laws',
    cogsci:
      "Cognitive simplification \u2014 the expert's ability to perceive deep structure directly, bypassing surface complexity",
    ai: 'Model compression \u2014 achieving equivalent performance with dramatically fewer parameters by eliminating redundancy',
    scope: 'great',
  },
  {
    id: 'skillfulMeans',
    title: 'Skillful Means',
    tibetan: 'ཐབས།',
    subtitle: 'Thabs',
    description:
      'The compassionate wisdom of adapting teachings and methods to the needs and capacities of different beings. In the Mahayana, skillful means is the complement of wisdom \u2014 together they are likened to the two wings of a bird.',
    physics:
      'Adaptive control \u2014 adjusting system parameters in real-time to maintain optimal performance across varying conditions',
    cogsci:
      "Pedagogical flexibility \u2014 adjusting teaching methods based on the learner's developmental stage and learning style",
    ai: "Adaptive inference \u2014 dynamically adjusting generation strategy based on the user's context and needs",
    scope: 'great',
  },
  {
    id: 'twoTruths',
    title: 'Two Truths',
    tibetan: 'བདེན་པ་གཉིས།',
    subtitle: 'Bden Pa Gnyis',
    description:
      'Conventional truth (how things appear) and ultimate truth (how things actually exist). All phenomena simultaneously exist conventionally while being empty of inherent existence ultimately. Understanding their compatibility is the heart of Madhyamaka philosophy.',
    physics:
      'Wave-particle duality \u2014 a single phenomenon fully described by two complementary frameworks, neither alone sufficient',
    cogsci:
      'Dual-process theory \u2014 the mind operating simultaneously through intuitive (fast) and analytical (slow) modes of cognition',
    ai: 'Training vs. inference \u2014 the same model understood through two complementary lenses: learning dynamics and output behavior',
    scope: 'great',
  },
  {
    id: 'vajra',
    title: 'Vajra',
    tibetan: 'རྡོ་རྗེ།',
    subtitle: 'Rdo Rje',
    description:
      'The diamond thunderbolt \u2014 symbolizing indestructible wisdom and the union of compassion and emptiness. Vajra represents the nature of reality itself: clear, unbreakable, and cutting through all delusion.',
    physics:
      'Diamond lattice \u2014 the hardest known natural structure, formed under extreme pressure into perfect crystalline order',
    cogsci:
      'Resilient insight \u2014 knowledge so deeply integrated it cannot be dislodged by contrary evidence or emotional pressure',
    ai: 'Robust representations \u2014 model weights so well-trained they remain stable under adversarial perturbation',
    scope: 'great',
  },
  {
    id: 'view',
    title: 'View',
    tibetan: 'ལྟ་བ།',
    subtitle: 'Lta Ba',
    description:
      "The philosophical understanding that guides practice. In Brown's framework, correct view (lta ba) is the first of three pillars: without the right understanding of the nature of mind, meditation practice cannot lead to genuine realization.",
    physics:
      'Theoretical framework \u2014 the mathematical model that determines which experiments are meaningful and how results are interpreted',
    cogsci:
      'Mental model \u2014 the internal representation of reality that shapes all perception, prediction, and decision-making',
    ai: 'Architecture design \u2014 the structural choices (layers, attention, etc.) that determine what a model can learn',
    scope: 'great',
  },
]

// --- Helper: determine scope for a nodeData entry ---
function getScopeForNodeId(
  nodeId: string
): 'foundation' | 'small' | 'middle' | 'great' {
  if ((nodesByScope.foundation as string[]).includes(nodeId)) return 'foundation'
  if ((nodesByScope.small as string[]).includes(nodeId)) return 'small'
  if ((nodesByScope.middle as string[]).includes(nodeId)) return 'middle'
  if (
    (nodesByScope['great-method'] as string[]).includes(nodeId) ||
    (nodesByScope['great-wisdom'] as string[]).includes(nodeId) ||
    (nodesByScope.mahamudra as string[]).includes(nodeId) ||
    (nodesByScope.enlightenment as string[]).includes(nodeId)
  )
    return 'great'
  return 'foundation'
}

// --- Scope labels and pill classes ---
const scopeConfig: Record<
  string,
  { label: string; pillClass: string }
> = {
  all: { label: 'All', pillClass: '' },
  foundation: {
    label: 'Foundation',
    pillClass: 'scope-pill-foundation',
  },
  small: { label: 'Small Scope', pillClass: 'scope-pill-small' },
  middle: {
    label: 'Middle Scope',
    pillClass: 'scope-pill-middle',
  },
  great: { label: 'Great Scope', pillClass: 'scope-pill-great' },
}

type ScopeFilter = 'all' | 'foundation' | 'small' | 'middle' | 'great'

// --- Unified term type ---
interface DictionaryTerm {
  id: string
  title: string
  tibetan: string
  subtitle: string
  description: string
  physics?: string
  cogsci?: string
  ai?: string
  scope: 'foundation' | 'small' | 'middle' | 'great'
  hasPath: boolean
}

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScope, setSelectedScope] = useState<ScopeFilter>('all')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  // Build combined, sorted terms list
  const allTerms: DictionaryTerm[] = useMemo(() => {
    // Convert nodeData entries
    const nodeTerms: DictionaryTerm[] = allNodeIds
      .filter((id) => nodeData[id] !== undefined)
      .map((id) => {
        const node = nodeData[id]!
        return {
          id,
          title: node.title,
          tibetan: node.tibetan,
          subtitle: node.subtitle,
          description: node.description,
          physics: node.physics,
          cogsci: node.cogsci,
          ai: node.ai,
          scope: getScopeForNodeId(id),
          hasPath: true,
        }
      })

    // Convert additional terms
    const extraTerms: DictionaryTerm[] = additionalTerms.map((t) => ({
      ...t,
      hasPath: false,
    }))

    // Combine and sort alphabetically
    return [...nodeTerms, ...extraTerms].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  }, [])

  // Filter by search and scope
  const filteredTerms = useMemo(() => {
    return allTerms.filter((term) => {
      // Scope filter
      if (selectedScope !== 'all' && term.scope !== selectedScope)
        return false

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          term.title.toLowerCase().includes(q) ||
          term.subtitle.toLowerCase().includes(q) ||
          term.description.toLowerCase().includes(q)
        )
      }

      return true
    })
  }, [allTerms, searchQuery, selectedScope])

  const handleTermClick = (id: string) => {
    setExpandedTerm(expandedTerm === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-bodhi-bg-primary">
      {/* ===== HEADER ===== */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 max-w-[900px]">
        <p className="bodhi-label mb-4">DICTIONARY</p>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary mb-3">
          Buddhist Terms
        </h1>
        <p className="font-sans text-base text-bodhi-text-tertiary max-w-[600px]">
          A comprehensive glossary of Buddhist concepts from the Kadampa Lamrim
          and Mahamudra traditions, with modern scientific parallels across
          physics, cognitive science, and artificial intelligence.
        </p>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px]">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full border-b border-bodhi-border bg-transparent font-sans text-base text-bodhi-text-primary py-3 placeholder:text-bodhi-text-faint focus:border-bodhi-saffron outline-none transition-colors"
        />

        {/* Scope filter pills */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {(
            Object.keys(scopeConfig) as ScopeFilter[]
          ).map((scope) => {
            const isActive = selectedScope === scope
            const config = scopeConfig[scope]

            if (scope === 'all') {
              return (
                <button
                  key={scope}
                  onClick={() => setSelectedScope(scope)}
                  className={`
                    font-sans text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap
                    transition-all shrink-0
                    ${
                      isActive
                        ? 'bg-bodhi-saffron text-white'
                        : 'bg-transparent text-bodhi-text-tertiary border border-bodhi-border hover:border-bodhi-border-hover'
                    }
                  `}
                >
                  {config.label}
                </button>
              )
            }

            return (
              <button
                key={scope}
                onClick={() => setSelectedScope(scope)}
                className={`
                  whitespace-nowrap shrink-0 transition-all
                  ${
                    isActive
                      ? config.pillClass + ' ring-1 ring-bodhi-saffron/40'
                      : 'font-sans text-xs font-medium px-3 py-1 rounded-full bg-transparent text-bodhi-text-tertiary border border-bodhi-border hover:border-bodhi-border-hover'
                  }
                `}
              >
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="font-sans text-xs text-bodhi-text-faint mt-4 mb-2">
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* ===== TERMS LIST ===== */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[900px] pb-20">
        {filteredTerms.length === 0 ? (
          /* Empty state */
          <div className="py-20 text-center">
            <p className="font-sans text-bodhi-text-tertiary text-base">
              No terms match your search
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedScope('all')
              }}
              className="mt-4 ghost-button text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div>
            {filteredTerms.map((term) => {
              const isExpanded = expandedTerm === term.id
              return (
                <div
                  key={term.id}
                  className="border-b border-bodhi-border last:border-b-0"
                >
                  {/* Collapsed row */}
                  <button
                    onClick={() => handleTermClick(term.id)}
                    className="w-full text-left py-5 md:py-6 flex items-start md:items-center gap-4 group transition-all hover:bg-bodhi-bg-card/50"
                  >
                    {/* Title + Tibetan + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className="font-serif text-xl text-bodhi-text-primary group-hover:text-bodhi-gold transition-colors">
                          {term.title}
                        </h3>
                        <span className="font-tibetan text-xs text-bodhi-text-tertiary">
                          {term.tibetan}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-bodhi-text-tertiary mt-0.5">
                        {term.subtitle}
                      </p>
                    </div>

                    {/* Scope pill */}
                    <div className="shrink-0 flex items-center gap-3">
                      <span className={scopeConfig[term.scope].pillClass}>
                        {scopeConfig[term.scope].label}
                      </span>
                      {/* Expand chevron */}
                      <svg
                        className={`w-4 h-4 text-bodhi-text-faint transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="pb-6 pl-0 md:pl-4 animate-fade-in">
                      {/* Description */}
                      <div className="gold-border-left mb-6">
                        <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                          {term.description}
                        </p>
                      </div>

                      {/* Three lens perspectives */}
                      {(term.physics || term.cogsci || term.ai) && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {term.physics && (
                            <div className="bodhi-card !p-5">
                              <p className="bodhi-label !text-[10px] mb-2">
                                PHYSICS
                              </p>
                              <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                                {term.physics}
                              </p>
                            </div>
                          )}
                          {term.cogsci && (
                            <div className="bodhi-card !p-5">
                              <p className="bodhi-label !text-[10px] mb-2">
                                COGNITIVE SCIENCE
                              </p>
                              <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                                {term.cogsci}
                              </p>
                            </div>
                          )}
                          {term.ai && (
                            <div className="bodhi-card !p-5">
                              <p className="bodhi-label !text-[10px] mb-2">
                                AI
                              </p>
                              <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed">
                                {term.ai}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Link to concept path */}
                      {term.hasPath && (
                        <Link
                          href={`/graph?highlight=${term.id}`}
                          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-bodhi-saffron hover:text-bodhi-gold transition-colors"
                        >
                          View in Knowledge Graph
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
