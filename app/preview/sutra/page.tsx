'use client'

import { useState } from 'react'
import Link from 'next/link'

const GOLD = '#C9A227'
const IVORY = '#FEFCF7'
const NEAR_BLACK = '#1A1A1A'
const SERIF = 'var(--font-cormorant), Georgia, "Times New Roman", serif'
const SANS = 'system-ui, -apple-system, -webkit-system-font, "Segoe UI", sans-serif'
const TIBETAN = 'var(--font-tibetan), "Noto Sans Tibetan", "Microsoft Himalaya", sans-serif'

const lenses = [
  {
    id: 'physics',
    label: 'Physics',
    text: 'The anthropic principle suggests the conditions for conscious observers are extraordinarily rare in the universe.',
  },
  {
    id: 'cognitive',
    label: 'Cognitive Science',
    text: 'Metacognition -- the capacity to reflect on one\'s own mental processes -- appears to be unique among known forms of consciousness.',
  },
  {
    id: 'ai',
    label: 'AI',
    text: 'Training an aligned intelligence requires vast computational resources and precise conditions -- a digital parallel to the rarity of precious human birth.',
  },
]

const conceptTree = [
  { name: 'Enlightenment', depth: 0, connector: '' },
  { name: 'Emptiness', depth: 1, connector: '\u251C\u2500' },
  { name: 'Bodhicitta', depth: 1, connector: '\u251C\u2500' },
  { name: 'Six Perfections', depth: 2, connector: '\u251C\u2500', parent: 'Bodhicitta' },
  { name: 'Tonglen', depth: 2, connector: '\u2514\u2500', parent: 'Bodhicitta' },
  { name: 'Renunciation', depth: 1, connector: '\u2514\u2500' },
  { name: 'Karma', depth: 2, connector: '\u251C\u2500', parent: 'Renunciation' },
  { name: 'Impermanence', depth: 2, connector: '\u2514\u2500', parent: 'Renunciation' },
]

const dictionaryEntries = [
  {
    term: 'Bodhicitta',
    tibetan: '\u0F56\u0FB1\u0F44\u0F0B\u0F46\u0F74\u0F56\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F7A\u0F58\u0F66\u0F0D',
    definition: 'The mind of enlightenment; the aspiration to attain Buddhahood for the benefit of all sentient beings.',
  },
  {
    term: '\u015A\u016Bnyat\u0101',
    tibetan: null,
    definition: 'Emptiness; the absence of inherent existence in all phenomena.',
  },
  {
    term: 'Karma',
    tibetan: null,
    definition: 'Intentional action; the natural law of cause and effect governing moral actions.',
  },
]

function DharmaWheel({ size = 12, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.2" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 12 + 3 * Math.cos(rad)
        const y1 = 12 + 3 * Math.sin(rad)
        const x2 = 12 + 10 * Math.cos(rad)
        const y2 = 12 + 10 * Math.sin(rad)
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1"
          />
        )
      })}
    </svg>
  )
}

export default function SutraPreview() {
  const [activeLens, setActiveLens] = useState('physics')
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const activeLensData = lenses.find((l) => l.id === activeLens)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: IVORY,
        color: NEAR_BLACK,
        fontFamily: SERIF,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {/* ─── Navigation ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 32px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontSize: 22,
              fontWeight: 500,
              color: NEAR_BLACK,
              letterSpacing: '-0.01em',
            }}
          >
            Bodhi Engine
          </span>
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 400,
              color: '#6B6B6B',
            }}
          >
            {['Daily', 'Map', 'Dictionary'].map((item) => (
              <span
                key={item}
                style={{
                  cursor: 'pointer',
                  color: hoveredNav === item ? NEAR_BLACK : '#6B6B6B',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '140px 24px 120px',
        }}
      >
        {/* ─── Daily Teaching Section ─── */}
        <section>
          {/* Day Label */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: GOLD,
              margin: '0 0 20px 0',
              textAlign: 'center',
            }}
          >
            DAY 1 &middot; FOUNDATION
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 40,
              fontWeight: 300,
              lineHeight: 1.2,
              margin: '0 0 12px 0',
              textAlign: 'center',
              color: NEAR_BLACK,
              letterSpacing: '-0.01em',
            }}
          >
            Precious Human Life
          </h1>

          {/* Tibetan */}
          <p
            style={{
              fontFamily: TIBETAN,
              fontSize: 16,
              color: '#9B9B9B',
              textAlign: 'center',
              margin: '0 0 40px 0',
              fontWeight: 400,
            }}
          >
            {'\u0F58\u0F72\u0F0B\u0F63\u0F74\u0F66\u0F0B\u0F62\u0F72\u0F53\u0F0B\u0F54\u0F7C\u0F0B\u0F46\u0F7A\u0F0D'}
          </p>

          {/* Gold Rule */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0 0 48px 0',
            }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                background: GOLD,
              }}
            />
          </div>

          {/* Teaching Text */}
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 22,
              lineHeight: 1.8,
              color: '#2a2a2a',
              margin: '0 0 16px 0',
              textAlign: 'left',
            }}
          >
            This human life with its eight freedoms and ten endowments is more
            precious than a wish-fulfilling jewel. Having found such a life just
            this once, so difficult to find and so meaningful, to waste it
            without accomplishing anything would be self-deception.
          </p>

          {/* Source Attribution */}
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 14,
              fontStyle: 'italic',
              color: '#9B9B9B',
              margin: '0 0 48px 0',
            }}
          >
            &mdash; Lamrim Chenmo, Chapter 4
          </p>

          {/* Commentary */}
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 18,
              lineHeight: 1.8,
              color: '#555555',
              margin: '0 0 48px 0',
            }}
          >
            Contemplate the rarity of human birth with access to dharma,
            teachers, and the leisure to practice. Among countless beings, how
            few have these conditions.
          </p>

          {/* ─── Explore Lenses ─── */}
          <div style={{ margin: '0 0 48px 0' }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                color: GOLD,
                margin: '0 0 20px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Explore Lenses
              <span
                style={{
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                &rsaquo;
              </span>
            </p>

            {/* Lens Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: 20,
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                paddingBottom: 12,
              }}
            >
              {lenses.map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => setActiveLens(lens.id)}
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    fontWeight: 400,
                    color: activeLens === lens.id ? NEAR_BLACK : '#9B9B9B',
                    background: 'none',
                    border: 'none',
                    borderBottom:
                      activeLens === lens.id
                        ? `2px solid ${GOLD}`
                        : '2px solid transparent',
                    paddingBottom: 0,
                    marginBottom: -13,
                    cursor: 'pointer',
                    padding: '0 0 12px 0',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {lens.label}
                </button>
              ))}
            </div>

            {/* Active Lens Content */}
            <p
              style={{
                fontFamily: SANS,
                fontSize: 16,
                lineHeight: 1.7,
                color: '#555555',
                margin: 0,
              }}
            >
              {activeLensData?.text}
            </p>
          </div>

          {/* ─── Reflection Prompt ─── */}
          <div
            style={{
              borderLeft: `3px solid ${GOLD}`,
              paddingLeft: 24,
              margin: '0 0 0 0',
            }}
          >
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 18,
                fontStyle: 'italic',
                lineHeight: 1.8,
                color: '#6B6B6B',
                margin: 0,
              }}
            >
              What conditions in your life right now enable growth that others
              might not have? How will you use this opportunity today?
            </p>
          </div>
        </section>

        {/* ─── Dharma Wheel Separator ─── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '80px 0',
          }}
        >
          <DharmaWheel size={12} color={GOLD} />
          <div
            style={{
              width: 40,
              height: 1,
              background: GOLD,
            }}
          />
        </div>

        {/* ─── Concept Map Preview ─── */}
        <section>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: GOLD,
              margin: '0 0 24px 0',
              textAlign: 'center',
            }}
          >
            CONCEPT MAP
          </p>

          <div
            style={{
              maxWidth: 360,
              margin: '0 auto',
              padding: '0 0 0 0',
            }}
          >
            {conceptTree.map((node, i) => {
              const indent = node.depth * 28
              const isHovered = hoveredConcept === node.name

              // Build the visual tree prefix
              let prefix = ''
              if (node.depth === 1) {
                prefix = node.connector + ' '
              } else if (node.depth === 2) {
                // Show the vertical line from parent
                prefix = '\u2502    ' + node.connector + ' '
              }

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    paddingLeft: node.depth === 2 ? 28 : node.depth === 1 ? 0 : 0,
                    marginBottom: 6,
                    lineHeight: 1.9,
                  }}
                >
                  {node.depth > 0 && (
                    <span
                      style={{
                        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                        fontSize: 14,
                        color: GOLD,
                        whiteSpace: 'pre',
                        userSelect: 'none',
                        opacity: 0.7,
                      }}
                    >
                      {node.connector}{' '}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: node.depth === 0 ? 20 : node.depth === 1 ? 17 : 15,
                      fontWeight: node.depth === 0 ? 500 : 400,
                      color: isHovered ? GOLD : node.depth === 0 ? NEAR_BLACK : '#444',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={() => setHoveredConcept(node.name)}
                    onMouseLeave={() => setHoveredConcept(null)}
                  >
                    {node.name}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── Dharma Wheel Separator ─── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '80px 0',
          }}
        >
          <DharmaWheel size={12} color={GOLD} />
          <div
            style={{
              width: 40,
              height: 1,
              background: GOLD,
            }}
          />
        </div>

        {/* ─── Dictionary Preview ─── */}
        <section>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: GOLD,
              margin: '0 0 24px 0',
              textAlign: 'center',
            }}
          >
            DICTIONARY
          </p>

          {/* Search Input */}
          <div style={{ margin: '0 0 40px 0' }}>
            <input
              type="text"
              placeholder="Search terms..."
              style={{
                width: '100%',
                fontFamily: SANS,
                fontSize: 16,
                padding: '12px 0',
                border: 'none',
                borderBottom: '1px solid #ddd',
                background: 'transparent',
                color: NEAR_BLACK,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Dictionary Entries */}
          <div>
            {dictionaryEntries.map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: 20,
                      fontWeight: 600,
                      margin: 0,
                      color: NEAR_BLACK,
                    }}
                  >
                    {entry.term}
                  </h3>
                  {entry.tibetan && (
                    <span
                      style={{
                        fontFamily: TIBETAN,
                        fontSize: 12,
                        color: '#9B9B9B',
                      }}
                    >
                      {entry.tibetan}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#555555',
                    margin: 0,
                  }}
                >
                  {entry.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          style={{
            textAlign: 'center',
            paddingTop: 120,
            paddingBottom: 80,
          }}
        >
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 18,
              color: GOLD,
              margin: '0 0 8px 0',
              fontWeight: 500,
            }}
          >
            Bodhi Engine
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 12,
              color: '#9B9B9B',
              margin: '0 0 32px 0',
              fontWeight: 400,
            }}
          >
            The Sutra &mdash; Editorial Luxury
          </p>
          <Link
            href="/preview"
            style={{
              fontFamily: SANS,
              fontSize: 14,
              color: GOLD,
              textDecoration: 'none',
              fontWeight: 400,
              transition: 'opacity 0.2s ease',
            }}
          >
            &larr; Back to Directions
          </Link>
        </footer>
      </main>
    </div>
  )
}
