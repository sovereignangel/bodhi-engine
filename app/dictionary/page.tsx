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
  {
    id: 'dharma',
    title: 'Dharma',
    tibetan: '\u0F46\u0F7C\u0F66\u0F0D',
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
    id: 'sangha',
    title: 'Sangha',
    tibetan: '\u0F51\u0F42\u0F7A\u0F0B\u0F60\u0F51\u0F74\u0F53\u0F0D',
    subtitle: 'Community',
    description: 'The community of Buddhist practitioners',
    physics:
      'Emergent systems \u2014 collective behavior arising from individual interactions',
    cogsci:
      'Social cognition and the role of community in sustained behavioral change',
    ai: 'Distributed computing \u2014 collaborative agents achieving more than individuals',
    scope: 'foundation',
  },
  {
    id: 'nirvana',
    title: 'Nirvana',
    tibetan:
      '\u0F58\u0FB1\u0F0B\u0F44\u0F53\u0F0B\u0F63\u0F66\u0F0B\u0F60\u0F51\u0F66\u0F0B\u0F54\u0F0D',
    subtitle: 'Liberation',
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
    id: 'samsara',
    title: 'Samsara',
    tibetan: '\u0F60\u0F41\u0F7C\u0F62\u0F0B\u0F56\u0F0D',
    subtitle: 'Cyclic Existence',
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
    id: 'prajna',
    title: 'Prajna',
    tibetan: '\u0F64\u0F7A\u0F66\u0F0B\u0F62\u0F56\u0F0D',
    subtitle: 'Transcendent Wisdom',
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
    id: 'dharani',
    title: 'Dharani',
    tibetan: '\u0F42\u0F5F\u0F74\u0F44\u0F66\u0F0D',
    subtitle: 'Protective Mantra',
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
    id: 'sprospa',
    title: 'Mental Elaboration',
    tibetan: '\u0F66\u0FA4\u0FB2\u0F7C\u0F66\u0F0B\u0F54',
    subtitle: 'Spros Pa',
    description:
      'The mind\'s habitual tendency to proliferate thoughts, narratives, and conceptual constructions. Daniel P. Brown identifies this as the primary obstacle to concentration — not distraction itself, but the elaborative process that generates distraction.',
    physics:
      'Noise amplification \u2014 small perturbations growing into chaotic cascades through positive feedback',
    cogsci:
      'Rumination and thought chaining \u2014 the default mode network generating self-referential narratives',
    ai: 'Hallucination \u2014 models generating plausible but unfounded elaborations from minimal prompts',
    scope: 'middle',
  },
  {
    id: 'gnaspa',
    title: 'Staying',
    tibetan: '\u0F42\u0F53\u0F66\u0F0B\u0F54',
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
    id: 'semsnyi',
    title: 'Nature of Mind',
    tibetan: '\u0F66\u0F7A\u0F58\u0F66\u0F0B\u0F49\u0F72\u0F51',
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
    id: 'shinsbjyangs',
    title: 'Pliancy',
    tibetan: '\u0F64\u0F72\u0F53\u0F0B\u0F66\u0F56\u0FB1\u0F44\u0F66',
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
    const nodeTerms: DictionaryTerm[] = allNodeIds.map((id) => {
      const node = nodeData[id]
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
          tradition, with modern scientific parallels across physics, cognitive
          science, and artificial intelligence.
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
