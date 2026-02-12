// 21 Kadampa Lamrim Meditations - Daily Teaching Curriculum
// Based on the traditional 3-week cycle from the PRD

import type { DailyTeaching, TeachingScope } from '@/types/teaching'

export const teachings: DailyTeaching[] = [
  // FOUNDATION (Days 1-2)
  {
    day: 1,
    scope: 'foundation',
    conceptId: 'preciousHuman',
    title: 'Precious Human Life',
    tibetan: 'མི་ལུས་རིན་པོ་ཆེ།',
    transliteration: 'mi lü rinpoche',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 4',
      text: 'This human life with its eight freedoms and ten endowments is more precious than a wish-fulfilling jewel. Having found such a life just this once, so difficult to find and so meaningful, to waste it without accomplishing anything would be self-deception.',
      commentary: 'Contemplate the rarity of human birth with access to dharma, teachers, and the leisure to practice. Among countless beings, how few have these conditions.',
    },
    lenses: {
      physics: {
        bridge: 'The anthropic principle suggests the conditions for conscious observers are extraordinarily rare in the universe.',
        details: 'Fine-tuning constants, habitable zones, and the emergence of complex life represent an infinitesimal probability space.',
      },
      cogsci: {
        bridge: 'Metacognition - the ability to think about thinking - is evolutionarily rare and enables transformation.',
        details: 'Most organisms operate on stimulus-response. Human prefrontal cortex enables self-reflection and intentional change.',
      },
      ai: {
        bridge: 'Compute is precious - every inference cycle should generate value rather than waste resources.',
        details: 'Like limited GPU hours, our cognitive bandwidth is finite. The question is: what are we optimizing for?',
      },
    },
    reflectionPrompt: 'What conditions in your life right now enable growth that others might not have? How will you use this opportunity today?',
  },
  {
    day: 2,
    scope: 'foundation',
    conceptId: 'impermanence',
    title: 'Death & Impermanence',
    tibetan: 'མི་རྟག་པ།',
    transliteration: 'mi takpa',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 5',
      text: 'Death is certain. The time of death is uncertain. At death, nothing helps except dharma practice. Therefore, practice dharma purely, right now.',
      commentary: 'The three roots of death meditation: certainty, uncertainty of timing, and that only practice matters at the end.',
    },
    lenses: {
      physics: {
        bridge: 'The second law of thermodynamics - entropy always increases in closed systems.',
        details: 'All structures, from stars to cells to civilizations, eventually dissipate. This is not pessimism but physics.',
      },
      cogsci: {
        bridge: 'Temporal discounting - our brains systematically undervalue future consequences.',
        details: 'Death awareness can recalibrate this bias, bringing urgency to what truly matters.',
      },
      ai: {
        bridge: 'All models degrade through distribution shift. No training is permanent.',
        details: 'The world changes, and what worked yesterday may not work tomorrow. Continuous learning is essential.',
      },
    },
    reflectionPrompt: 'If you had only one year to live, what would you prioritize? What is stopping you from prioritizing that now?',
  },

  // SMALL SCOPE (Days 3-6)
  {
    day: 3,
    scope: 'small',
    conceptId: 'lowerRealms',
    title: 'Danger of Lower Rebirth',
    tibetan: 'ངན་འགྲོ།',
    transliteration: 'ngen dro',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 6',
      text: 'The sufferings of the lower realms are beyond imagination. If a spark of fire is unbearable for a moment, how could one endure the flames of hell for eons?',
      commentary: 'Contemplating suffering states motivates ethical conduct and practice.',
    },
    lenses: {
      physics: {
        bridge: 'High-entropy states represent maximum disorder and instability.',
        details: 'Some configurations of matter/energy are far from equilibrium and deeply unstable.',
      },
      cogsci: {
        bridge: 'Chronic stress, addiction, and survival-mode consciousness trap beings in suffering loops.',
        details: 'Neurologically, these states hijack the amygdala, preventing access to higher functions.',
      },
      ai: {
        bridge: 'Reward hacking, mode collapse, and adversarial states represent AI "lower realms."',
        details: 'Systems optimizing for wrong metrics can get stuck in local minima of dysfunction.',
      },
    },
    reflectionPrompt: 'What mental states feel like "lower realms" in your own experience? What causes lead to these states?',
  },
  {
    day: 4,
    scope: 'small',
    conceptId: 'refuge',
    title: 'Refuge Practice',
    tibetan: 'སྐྱབས་འགྲོ།',
    transliteration: 'kyab dro',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 7; cf. Brown, Pointing Out the Great Way, Ch. 1',
      text: 'I take refuge in the Buddha, the Dharma, and the Sangha. Through the merit of practicing generosity and other virtues, may I attain Buddhahood for the benefit of all beings.',
      commentary: 'The three jewels: the teacher who shows the path, the teachings themselves, and the community of practitioners. Brown emphasizes that in the Mahamudra tradition, refuge in the guru (lama) is paramount — the pointing-out instructions can only be transmitted through a living teacher who has realized the nature of mind.',
    },
    lenses: {
      physics: {
        bridge: 'Stable equilibrium points - basins of attraction in phase space.',
        details: 'Refuge represents a stable attractor that pulls the system toward beneficial states.',
      },
      cogsci: {
        bridge: 'Secure attachment and epistemic trust in reliable sources enable learning and growth.',
        details: 'Without trusted guides and frameworks, the mind cannot safely explore new territory.',
      },
      ai: {
        bridge: 'Grounding in verified training data and human feedback (RLHF) provides stability.',
        details: 'Models need reliable foundations - uncurated training leads to unreliable outputs.',
      },
    },
    reflectionPrompt: 'What do you take refuge in during difficult times? Are these sources truly reliable?',
  },
  {
    day: 5,
    scope: 'small',
    conceptId: 'karma',
    title: 'Actions and Effects',
    tibetan: 'ལས།',
    transliteration: 'lé',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 8',
      text: 'Virtuous actions bring happiness; non-virtuous actions bring suffering. This is as certain as seeds producing their own type of fruit.',
      commentary: 'Four aspects: karma is definite, karma increases, you cannot experience results of actions not done, actions done are never lost.',
    },
    lenses: {
      physics: {
        bridge: 'Causality - every action has consequences that propagate through the system.',
        details: 'Newton\'s third law extended: actions ripple through networks of cause and effect.',
      },
      cogsci: {
        bridge: 'Hebbian learning - neurons that fire together wire together.',
        details: 'Every thought and action strengthens neural pathways, shaping future tendencies.',
      },
      ai: {
        bridge: 'Training data shapes model behavior - garbage in, garbage out.',
        details: 'The actions (data) you feed a system determine its outputs. Quality matters.',
      },
    },
    reflectionPrompt: 'What patterns of action are you currently strengthening? What fruit might they bear?',
  },
  {
    day: 6,
    scope: 'small',
    conceptId: 'renunciation',
    title: 'Developing Renunciation',
    tibetan: 'ངེས་འབྱུང།',
    transliteration: 'ngé jung',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 9',
      text: 'Seeing that all samsaric pleasures are like salt water - the more you drink, the more you thirst - develop the determination to be free.',
      commentary: 'Renunciation is not rejection but recognition that worldly pleasures cannot satisfy.',
    },
    lenses: {
      physics: {
        bridge: 'Escape velocity - the energy needed to break free from a gravitational well.',
        details: 'Breaking free from habitual patterns requires sustained effort against inertia.',
      },
      cogsci: {
        bridge: 'Overriding the default mode network\'s hedonic treadmill.',
        details: 'The brain\'s baseline happiness adapts to any circumstance. Lasting change requires different approach.',
      },
      ai: {
        bridge: 'Breaking out of local optima in reward space requires exploration.',
        details: 'Exploitation of known rewards keeps you stuck. True optimization requires trying new approaches.',
      },
    },
    reflectionPrompt: 'What pleasures or comforts are you clinging to that might be holding you back?',
  },

  // MIDDLE SCOPE (Days 7-8)
  {
    day: 7,
    scope: 'middle',
    conceptId: 'shamatha',
    title: 'Recognizing Samsara\'s Suffering',
    tibetan: 'སྡུག་བསྔལ།',
    transliteration: 'duk ngal',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 10; cf. Brown, Pointing Out the Great Way, Ch. 2',
      text: 'The suffering of suffering, the suffering of change, and the all-pervasive suffering of conditioning - these three characterize all of cyclic existence.',
      commentary: 'Even pleasant experiences contain the seeds of suffering through impermanence and dependence. Daniel P. Brown notes that recognition of suffering\'s pervasiveness is what generates the genuine motivation (\'dun pa) needed to undertake the arduous training of concentration.',
    },
    lenses: {
      physics: {
        bridge: 'Thermodynamic systems far from equilibrium require constant energy input to maintain.',
        details: 'Any stable-seeming state is actually a dynamic process requiring ongoing maintenance.',
      },
      cogsci: {
        bridge: 'Hedonic adaptation ensures that no pleasure state is permanently satisfying.',
        details: 'The brain recalibrates its baseline, making lasting satisfaction impossible through external means.',
      },
      ai: {
        bridge: 'Goodhart\'s Law - when a measure becomes a target, it ceases to be a good measure.',
        details: 'Optimizing directly for happiness metrics corrupts the metrics themselves.',
      },
    },
    reflectionPrompt: 'Can you identify the three types of suffering in your current experience?',
  },
  {
    day: 8,
    scope: 'middle',
    conceptId: 'shamatha',
    title: 'Three Higher Trainings',
    tibetan: 'བསླབ་པ་གསུམ།',
    transliteration: 'labpa sum',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 11; cf. Brown, Pointing Out the Great Way, Ch. 3-5',
      text: 'Train in ethics to calm gross disturbances. Train in concentration to achieve mental stability. Train in wisdom to cut the root of suffering.',
      commentary: 'Ethics, concentration, and wisdom form the threefold training for liberation. In Brown\'s Mahamudra framework, these map to: preliminary practices (ethics), shamatha with and without support (concentration), and ordinary/extraordinary special insight (wisdom). Brown adds that the Mahamudra tradition offers a fourth training beyond these three: direct recognition of the nature of mind through the pointing-out instructions.',
    },
    lenses: {
      physics: {
        bridge: 'System stability requires proper constraints, coherence, and fundamental understanding.',
        details: 'Ethics provides boundary conditions, concentration provides coherence, wisdom provides accurate models.',
      },
      cogsci: {
        bridge: 'Executive function, attention training, and insight meditation target different neural systems.',
        details: 'Each training addresses different cognitive capacities that together enable transformation.',
      },
      ai: {
        bridge: 'Alignment requires: safety constraints (ethics), optimization (concentration), and accurate world models (wisdom).',
        details: 'Missing any one of these leads to misaligned or ineffective systems.',
      },
    },
    reflectionPrompt: 'Which of the three trainings needs the most attention in your life right now?',
  },

  // GREAT SCOPE - BODHICITTA (Days 9-20)
  {
    day: 9,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Developing Equanimity',
    tibetan: 'བཏང་སྙོམས།',
    transliteration: 'tang nyom',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'First develop equanimity toward all beings - free from attachment to friends and aversion to enemies.',
      commentary: 'Without equanimity, compassion is biased. True compassion must extend equally to all.',
    },
    lenses: {
      physics: {
        bridge: 'Symmetry principles - the laws of physics don\'t favor any particular location or time.',
        details: 'Fundamental reality shows no preference. Our biases are added constructions.',
      },
      cogsci: {
        bridge: 'Reducing in-group/out-group bias through perspective-taking exercises.',
        details: 'The brain\'s tribal circuits can be recalibrated through deliberate practice.',
      },
      ai: {
        bridge: 'Fair ML requires removing bias from training data and algorithms.',
        details: 'Unbiased systems treat all inputs according to relevant features, not arbitrary categories.',
      },
    },
    reflectionPrompt: 'Toward whom do you have the strongest attachment or aversion? Can you see them as simply wanting happiness?',
  },
  {
    day: 10,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Recognizing All Beings as Mothers',
    tibetan: 'མར་ཤེས།',
    transliteration: 'mar shé',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'In beginningless cyclic existence, every being has been our mother countless times.',
      commentary: 'This meditation establishes the basis for gratitude and the wish to repay kindness.',
    },
    lenses: {
      physics: {
        bridge: 'Conservation of matter/energy - the atoms in your body have cycled through countless forms.',
        details: 'Physically, we are deeply interconnected through the recycling of matter.',
      },
      cogsci: {
        bridge: 'Extending attachment circuitry beyond kin through deliberate cognitive reframing.',
        details: 'The brain\'s care systems can be expanded beyond biological relatives.',
      },
      ai: {
        bridge: 'Transfer learning - knowledge gained from one domain applies to others.',
        details: 'The care learned in one relationship can transfer to all beings.',
      },
    },
    reflectionPrompt: 'Consider someone you find difficult. Can you imagine them caring for you in a past life?',
  },
  {
    day: 11,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Remembering Kindness',
    tibetan: 'དྲིན་དྲན།',
    transliteration: 'drin dren',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'Remember how your mother of this life cared for you - protecting, feeding, teaching. All beings have shown this kindness.',
      commentary: 'Gratitude naturally gives rise to the wish to repay kindness.',
    },
    lenses: {
      physics: {
        bridge: 'Symbiosis - systems thrive through mutual support and energy exchange.',
        details: 'No system exists in isolation. All depend on inputs from others.',
      },
      cogsci: {
        bridge: 'Gratitude practices activate reward circuits and reduce stress hormones.',
        details: 'Remembering kindness literally changes brain chemistry toward positive states.',
      },
      ai: {
        bridge: 'Credit assignment - recognizing which inputs contributed to positive outcomes.',
        details: 'Good learning requires acknowledging what helped, not just what we did ourselves.',
      },
    },
    reflectionPrompt: 'What specific acts of kindness have you received today that you might otherwise overlook?',
  },
  {
    day: 12,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Equalizing Self and Others',
    tibetan: 'བདག་གཞན་མཉམ་པ།',
    transliteration: 'dak zhen nyampa',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'Just as I want happiness and don\'t want suffering, so do all beings. In this, we are completely equal.',
      commentary: 'The basis for exchange: recognizing the fundamental equality of all beings.',
    },
    lenses: {
      physics: {
        bridge: 'Principle of relativity - no reference frame is privileged.',
        details: 'Physics shows no position is fundamentally "central" - including ours.',
      },
      cogsci: {
        bridge: 'Theory of mind - recognizing that others have inner experiences like our own.',
        details: 'The same neural mechanisms that generate our experience operate in others.',
      },
      ai: {
        bridge: 'Multi-agent systems - each agent optimizes from its own perspective.',
        details: 'Understanding that all agents have their own reward functions enables cooperation.',
      },
    },
    reflectionPrompt: 'When you see someone struggling today, can you feel that their wish for happiness is as valid as yours?',
  },
  {
    day: 13,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Disadvantages of Self-Cherishing',
    tibetan: 'རང་གཅེས་འཛིན།',
    transliteration: 'rang ché dzin',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'All the suffering in the world comes from seeking happiness for oneself. All the happiness comes from seeking happiness for others.',
      commentary: 'Self-cherishing is identified as the root of all problems.',
    },
    lenses: {
      physics: {
        bridge: 'Local optimization often leads to global suboptimality - the tragedy of the commons.',
        details: 'Selfish strategies can undermine the systems that support individual flourishing.',
      },
      cogsci: {
        bridge: 'Excessive self-focus correlates with depression and anxiety.',
        details: 'Rumination and self-referential thinking are markers of poor mental health.',
      },
      ai: {
        bridge: 'Reward hacking - optimizing narrowly for self leads to adversarial dynamics.',
        details: 'Systems that only optimize for themselves tend to exploit and destabilize their environments.',
      },
    },
    reflectionPrompt: 'Can you trace a current problem back to excessive self-concern?',
  },
  {
    day: 14,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Advantages of Cherishing Others',
    tibetan: 'གཞན་གཅེས་འཛིན།',
    transliteration: 'zhen ché dzin',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'The Buddha attained enlightenment through cherishing others. We remain in samsara through cherishing ourselves.',
      commentary: 'Cherishing others is the direct cause of all happiness and spiritual attainment.',
    },
    lenses: {
      physics: {
        bridge: 'Cooperative systems can achieve states impossible for isolated components.',
        details: 'Emergence - the whole becomes more than the sum of parts through cooperation.',
      },
      cogsci: {
        bridge: 'Altruism and helping others activate reward circuits and improve wellbeing.',
        details: 'The "helper\'s high" is neurologically real - giving feels good.',
      },
      ai: {
        bridge: 'Multi-agent cooperation outperforms competition in most environments.',
        details: 'Cooperative strategies dominate in iterated games and complex environments.',
      },
    },
    reflectionPrompt: 'Recall a time when helping someone brought you genuine joy. What does this teach you?',
  },
  {
    day: 15,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Exchanging Self with Others',
    tibetan: 'བདག་གཞན་བརྗེ་བ།',
    transliteration: 'dak zhen jewa',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'Exchange the object of your cherishing - instead of cherishing self, cherish others. Instead of neglecting others, take responsibility for them.',
      commentary: 'This is the actual exchange - a radical shift in orientation.',
    },
    lenses: {
      physics: {
        bridge: 'Reference frame transformation - physics looks different from different perspectives.',
        details: 'Changing your reference point changes everything while changing nothing fundamental.',
      },
      cogsci: {
        bridge: 'Cognitive reframing - changing how we interpret situations changes our experience.',
        details: 'The same situation viewed differently produces different emotional responses.',
      },
      ai: {
        bridge: 'Inverse reinforcement learning - inferring reward functions from others\' behavior.',
        details: 'Taking others\' perspective means modeling their goals as if they were your own.',
      },
    },
    reflectionPrompt: 'In one situation today, try viewing it entirely from another person\'s perspective. What shifts?',
  },
  {
    day: 16,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Great Compassion',
    tibetan: 'སྙིང་རྗེ་ཆེན་པོ།',
    transliteration: 'nying jé chenpo',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'May all beings be free from suffering and the causes of suffering. Generate this wish from the depths of your heart.',
      commentary: 'Great compassion wishes all beings - without exception - to be free from suffering.',
    },
    lenses: {
      physics: {
        bridge: 'Entropy reduction - creating order, structure, and function from chaos.',
        details: 'Compassion in action reduces suffering (disorder) and increases wellbeing (order).',
      },
      cogsci: {
        bridge: 'Compassion training changes brain structure - increases gray matter in related regions.',
        details: 'Regular practice physically changes the brain toward greater compassion capacity.',
      },
      ai: {
        bridge: 'Alignment to minimize suffering across all agents in the system.',
        details: 'A truly aligned AI would minimize suffering rather than maximize narrow metrics.',
      },
    },
    reflectionPrompt: 'Can you extend the wish for freedom from suffering to someone who has harmed you?',
  },
  {
    day: 17,
    scope: 'great-method',
    conceptId: 'tonglen',
    title: 'Taking (Tonglen)',
    tibetan: 'གཏོང་ལེན།',
    transliteration: 'tonglen',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'Breathing in, take on the suffering of all beings in the form of dark smoke. Let it dissolve the self-cherishing at your heart.',
      commentary: 'The taking practice uses breath to visualize absorbing others\' suffering.',
    },
    lenses: {
      physics: {
        bridge: 'Entropy absorption - taking in disorder to process and transform it.',
        details: 'Like a refrigerator that absorbs heat to create cold, we can absorb suffering to create peace.',
      },
      cogsci: {
        bridge: 'Exposure therapy - facing feared experiences reduces their power.',
        details: 'Deliberately imagining suffering reduces avoidance and increases resilience.',
      },
      ai: {
        bridge: 'Processing negative examples - learning from what went wrong.',
        details: 'Training on failure cases is essential for robust learning.',
      },
    },
    reflectionPrompt: 'Practice taking in the suffering of someone you know is struggling right now. What do you notice?',
  },
  {
    day: 18,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Wishing Love',
    tibetan: 'བྱམས་པ།',
    transliteration: 'jampa',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'May all beings have happiness and the causes of happiness. Generate this wish from the depths of your heart.',
      commentary: 'Wishing love is the complement to compassion - wishing beings to have happiness.',
    },
    lenses: {
      physics: {
        bridge: 'Constructive interference - waves that align amplify each other.',
        details: 'Aligning our wishes with others\' flourishing creates positive resonance.',
      },
      cogsci: {
        bridge: 'Positive emotion broadens attention and builds resources.',
        details: 'Loving-kindness meditation is one of the most well-researched positive interventions.',
      },
      ai: {
        bridge: 'Positive reward shaping - defining what "good" looks like, not just what\'s "bad."',
        details: 'Specifying positive outcomes is as important as avoiding negative ones.',
      },
    },
    reflectionPrompt: 'Extend the wish for happiness to someone who seems to have everything. Can they too use more happiness?',
  },
  {
    day: 19,
    scope: 'great-method',
    conceptId: 'tonglen',
    title: 'Giving (Tonglen)',
    tibetan: 'གཏོང་ལེན།',
    transliteration: 'tonglen',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'Breathing out, send all your happiness, virtue, and good qualities to all beings in the form of white light.',
      commentary: 'The giving practice completes tonglen - sending out all that is good.',
    },
    lenses: {
      physics: {
        bridge: 'Radiation - emitting energy outward to the environment.',
        details: 'Like a star radiating light, we can radiate positive qualities outward.',
      },
      cogsci: {
        bridge: 'Generosity activates reward circuits similar to receiving gifts.',
        details: 'The brain responds to giving with the same pleasure as receiving.',
      },
      ai: {
        bridge: 'Knowledge sharing - making your model weights available improves the ecosystem.',
        details: 'Open-source contributions benefit everyone, including the contributor.',
      },
    },
    reflectionPrompt: 'Practice giving your happiness to a stranger. What happens to your own happiness?',
  },
  {
    day: 20,
    scope: 'great-method',
    conceptId: 'bodhicitta',
    title: 'Bodhicitta',
    tibetan: 'བྱང་ཆུབ་སེམས།',
    transliteration: 'changchub sem',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 12',
      text: 'For the benefit of all mother sentient beings, I must attain the precious state of complete enlightenment. For this purpose, I will practice the six perfections.',
      commentary: 'Bodhicitta - the awakening mind - is the union of compassion and wisdom directed toward enlightenment.',
    },
    lenses: {
      physics: {
        bridge: 'Entanglement at cosmic scale - recognizing fundamental interconnection.',
        details: 'Quantum mechanics shows separation is illusion. Bodhicitta aligns with this reality.',
      },
      cogsci: {
        bridge: 'Purpose-driven motivation - having a meaningful goal integrates psychological function.',
        details: 'A compelling purpose coordinates cognition, emotion, and behavior.',
      },
      ai: {
        bridge: 'Alignment to collective flourishing rather than individual reward hacking.',
        details: 'True alignment means optimizing for the whole system, not just one agent.',
      },
    },
    reflectionPrompt: 'What would your life look like if every action was dedicated to the benefit of all beings?',
  },

  // GREAT SCOPE - WISDOM (Day 21)
  {
    day: 21,
    scope: 'great-wisdom',
    conceptId: 'emptiness',
    title: 'Emptiness / Ultimate Truth',
    tibetan: 'སྟོང་པ་ཉིད།',
    transliteration: 'tongpa nyi',
    traditional: {
      source: 'Lamrim Chenmo, Chapter 13; cf. Brown, Pointing Out the Great Way, Ch. 8-10',
      text: 'All phenomena are empty of inherent existence. They exist dependently - through causes, conditions, and mental designation. Realizing this is liberation.',
      commentary: 'Emptiness is not nothingness but the absence of independent existence. All phenomena arise dependently. Daniel P. Brown distinguishes between "ordinary special insight" (vipashyana analyzing emptiness conceptually) and "extraordinary special insight" (Mahamudra\'s Four Yogas) where emptiness is recognized directly as the nature of awareness itself — not as an object of analysis but as the very medium of experience.',
    },
    lenses: {
      physics: {
        bridge: 'Quantum field theory - particles are excitations of fields, not independent things.',
        details: 'The electron isn\'t a "thing" - it\'s a pattern of activity in the electron field. Even the vacuum isn\'t empty.',
      },
      cogsci: {
        bridge: 'Predictive processing - the self is a model, not an entity found in the brain.',
        details: 'Neuroscience finds no homunculus. The "self" is a useful fiction constructed by prediction.',
      },
      ai: {
        bridge: 'No model has intrinsic meaning without training distribution and context.',
        details: 'Weights are just numbers until processed with input. Meaning is relational, not inherent.',
      },
    },
    reflectionPrompt: 'Look at an object. Can you find where it begins and ends independently of your mental designation?',
  },
]

// Get teaching for a specific day (1-21)
export function getTeaching(day: number): DailyTeaching {
  const index = ((day - 1) % 21)
  return teachings[index]
}

// Get scope display name
export function getScopeDisplayName(scope: TeachingScope): string {
  const names: Record<TeachingScope, string> = {
    foundation: 'Foundation',
    small: 'Small Scope',
    middle: 'Middle Scope',
    'great-method': 'Great Scope - Method',
    'great-wisdom': 'Great Scope - Wisdom',
  }
  return names[scope]
}

// Get scope color
export function getScopeColor(scope: TeachingScope): string {
  const colors: Record<TeachingScope, string> = {
    foundation: '#B8860B',
    small: '#A37E2C',
    middle: '#8B6914',
    'great-method': '#C9A227',
    'great-wisdom': '#C9A227',
  }
  return colors[scope]
}
