'use client'

import { useState } from 'react'
import Link from 'next/link'

// Gold gradient ID for reuse in SVGs
const GOLD_GRADIENT_ID = 'templeGoldGradient'
const GOLD_GRADIENT_ID2 = 'templeGoldGradient2'

// Shared constants
const goldBorder = '1px solid rgba(201,162,39,0.12)'
const cardRadius = 16
const stoneGray = '#9B9B9B'
const goldPrimary = '#D2AC47'
const bodyDark = '#2a2a2a'

function GoldGradientDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id={GOLD_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AE8625" />
          <stop offset="50%" stopColor="#F7EF8A" />
          <stop offset="100%" stopColor="#D2AC47" />
        </linearGradient>
        <linearGradient id={GOLD_GRADIENT_ID2} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#AE8625" />
          <stop offset="50%" stopColor="#F7EF8A" />
          <stop offset="100%" stopColor="#D2AC47" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function VajraIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central shaft */}
      <line x1="12" y1="4" x2="12" y2="28" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1.5" />
      {/* Central orb */}
      <circle cx="12" cy="16" r="2.5" fill={`url(#${GOLD_GRADIENT_ID})`} />
      {/* Top prongs */}
      <path d="M12 4 L12 2 M8 7 Q10 3 12 2 M16 7 Q14 3 12 2" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M6 9 Q9 4 12 2" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M18 9 Q15 4 12 2" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Top cross ring */}
      <ellipse cx="12" cy="7" rx="4" ry="1.2" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="0.8" fill="none" />
      {/* Bottom prongs */}
      <path d="M12 28 L12 30 M8 25 Q10 29 12 30 M16 25 Q14 29 12 30" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M6 23 Q9 28 12 30" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M18 23 Q15 28 12 30" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Bottom cross ring */}
      <ellipse cx="12" cy="25" rx="4" ry="1.2" stroke={`url(#${GOLD_GRADIENT_ID})`} strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function LotusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center petal */}
      <path d="M12 2 Q14 8 12 14 Q10 8 12 2Z" stroke={goldPrimary} strokeWidth="1" fill="none" />
      {/* Left petal */}
      <path d="M6 6 Q10 8 12 14 Q8 10 6 6Z" stroke={goldPrimary} strokeWidth="1" fill="none" />
      {/* Right petal */}
      <path d="M18 6 Q14 8 12 14 Q16 10 18 6Z" stroke={goldPrimary} strokeWidth="1" fill="none" />
      {/* Far left petal */}
      <path d="M3 10 Q8 10 12 14 Q6 12 3 10Z" stroke={goldPrimary} strokeWidth="0.8" fill="none" />
      {/* Far right petal */}
      <path d="M21 10 Q16 10 12 14 Q18 12 21 10Z" stroke={goldPrimary} strokeWidth="0.8" fill="none" />
      {/* Base curve */}
      <path d="M8 16 Q12 18 16 16" stroke={goldPrimary} strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function LotusWatermark() {
  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        opacity: 0.03,
        pointerEvents: 'none',
      }}
      width="120"
      height="100"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2 Q14 8 12 14 Q10 8 12 2Z" stroke={goldPrimary} strokeWidth="0.6" fill={goldPrimary} />
      <path d="M6 6 Q10 8 12 14 Q8 10 6 6Z" stroke={goldPrimary} strokeWidth="0.6" fill={goldPrimary} />
      <path d="M18 6 Q14 8 12 14 Q16 10 18 6Z" stroke={goldPrimary} strokeWidth="0.6" fill={goldPrimary} />
      <path d="M3 10 Q8 10 12 14 Q6 12 3 10Z" stroke={goldPrimary} strokeWidth="0.5" fill={goldPrimary} />
      <path d="M21 10 Q16 10 12 14 Q18 12 21 10Z" stroke={goldPrimary} strokeWidth="0.5" fill={goldPrimary} />
      <path d="M8 16 Q12 18 16 16" stroke={goldPrimary} strokeWidth="0.5" fill="none" />
    </svg>
  )
}

const navTabs = ['Daily', 'Map', 'Dictionary'] as const
const lensTabs = ['Physics', 'Cognitive Science', 'AI'] as const

const dictionaryTerms = [
  {
    tibetan: 'བྱང་ཆུབ་ཀྱི་སེམས།',
    english: 'Bodhicitta',
    definition: 'The mind of enlightenment; aspiration to attain Buddhahood for all beings.',
  },
  {
    tibetan: 'སྟོང་པ་ཉིད།',
    english: 'Śūnyatā',
    definition: 'Emptiness; the absence of inherent existence in all phenomena.',
  },
  {
    tibetan: 'ལས།',
    english: 'Karma',
    definition: 'Intentional action; the law of cause and effect governing moral actions.',
  },
]

// Concept map node positions (arranged in a gentle arc)
const conceptNodes = [
  { label: 'Emptiness', x: 60, y: 80 },
  { label: 'Bodhicitta', x: 140, y: 40 },
  { label: 'Karma', x: 240, y: 30 },
  { label: 'Refuge', x: 340, y: 50 },
  { label: 'Impermanence', x: 170, y: 140 },
  { label: 'Renunciation', x: 310, y: 140 },
  { label: 'Enlightenment', x: 430, y: 70 },
]

// Connections between nodes (index pairs)
const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [3, 5], [5, 6], [3, 6], [1, 4], [2, 5],
]

function ConceptMap() {
  return (
    <svg
      width="500"
      height="200"
      viewBox="0 0 500 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
    >
      <defs>
        <linearGradient id="nodeGoldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AE8625" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#F7EF8A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D2AC47" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Connection lines */}
      {connections.map(([from, to], i) => {
        const a = conceptNodes[from]
        const b = conceptNodes[to]
        const midX = (a.x + b.x) / 2
        const midY = (a.y + b.y) / 2 - 15
        return (
          <path
            key={`conn-${i}`}
            d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
            stroke="rgba(210,172,71,0.25)"
            strokeWidth="1"
            fill="none"
          />
        )
      })}
      {/* Nodes */}
      {conceptNodes.map((node, i) => {
        const isEnlightenment = node.label === 'Enlightenment'
        const r = isEnlightenment ? 25 : 20
        return (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={isEnlightenment ? 'url(#nodeGoldFill)' : '#FFFFFF'}
              stroke={goldPrimary}
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.y + r + 14}
              textAnchor="middle"
              style={{
                fontSize: '10px',
                fontFamily: 'sans-serif',
                fill: stoneGray,
                fontWeight: 300,
              }}
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function TemplePreview() {
  const [activeNav, setActiveNav] = useState<string>('Daily')
  const [activeLens, setActiveLens] = useState<string>('Physics')

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 300,
      color: bodyDark,
    }}>
      <GoldGradientDefs />

      {/* ===================== NAVIGATION ===================== */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 1px 0 rgba(201,162,39,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 20,
      }}>
        {/* Vajra icon */}
        <div style={{ cursor: 'pointer', marginBottom: 12 }}>
          <VajraIcon size={24} />
        </div>

        {/* Nav tabs */}
        <div style={{
          display: 'flex',
          gap: 32,
          alignItems: 'center',
        }}>
          {navTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveNav(tab)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeNav === tab ? bodyDark : stoneGray,
                padding: '4px 0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                borderBottom: activeNav === tab ? `1px solid ${goldPrimary}` : '1px solid transparent',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {tab}
              {activeNav === tab && (
                <span style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: goldPrimary,
                }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section style={{
        paddingTop: 120 + 80, // nav height + breathing room
        textAlign: 'center',
        paddingBottom: 80,
      }}>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
          fontSize: 52,
          fontWeight: 300,
          color: '#1a1a1a',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Bodhi Engine
        </h1>
        <p style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 16,
          color: stoneGray,
          letterSpacing: '0.1em',
          marginTop: 16,
          fontWeight: 300,
        }}>
          Buddhist Wisdom Platform
        </p>
      </section>

      {/* ===================== DAILY TEACHING CARD ===================== */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px',
      }}>
        <div style={{
          position: 'relative',
          maxWidth: 640,
          width: '100%',
          background: '#FFFFFF',
          border: goldBorder,
          borderRadius: cardRadius,
          padding: 48,
          overflow: 'hidden',
        }}>
          {/* Lotus watermark */}
          <LotusWatermark />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Lotus icon */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <LotusIcon size={16} />
            </div>

            {/* Day label */}
            <p style={{
              textAlign: 'center',
              fontSize: 11,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: goldPrimary,
              margin: '0 0 12px 0',
              fontWeight: 500,
            }}>
              DAY 1
            </p>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
              fontSize: 32,
              fontWeight: 400,
              textAlign: 'center',
              margin: '0 0 8px 0',
              color: '#1a1a1a',
            }}>
              Precious Human Life
            </h2>

            {/* Tibetan */}
            <p style={{
              textAlign: 'center',
              fontFamily: 'var(--font-tibetan), "Microsoft Himalaya", "Tibetan Machine Uni", sans-serif',
              fontSize: 14,
              color: stoneGray,
              margin: '0 0 24px 0',
            }}>
              མི་ལུས་རིན་པོ་ཆེ།
            </p>

            {/* Teaching text */}
            <p style={{
              fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
              fontSize: 19,
              lineHeight: 1.8,
              color: bodyDark,
              textAlign: 'center',
              margin: '0 0 16px 0',
            }}>
              This human life with its eight freedoms and ten endowments is more precious than a wish-fulfilling jewel. Having found it just this once, and considering how difficult it is to find and how meaningful it is, generate the mind to take its essence without wasting it.
            </p>

            {/* Source */}
            <p style={{
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 13,
              fontStyle: 'italic',
              color: stoneGray,
              margin: '0 0 32px 0',
            }}>
              Lamrim Chenmo, Chapter 4
            </p>

            {/* Lens tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}>
              {lensTabs.map((lens) => (
                <button
                  key={lens}
                  onClick={() => setActiveLens(lens)}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 13,
                    fontWeight: 400,
                    padding: '6px 16px',
                    borderRadius: 20,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: activeLens === lens ? '1px solid transparent' : goldBorder,
                    background: activeLens === lens
                      ? 'linear-gradient(135deg, #AE8625, #F7EF8A, #D2AC47)'
                      : 'transparent',
                    color: activeLens === lens ? '#FFFFFF' : stoneGray,
                  }}
                >
                  {lens}
                </button>
              ))}
            </div>

            {/* Lens content */}
            <p style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 15,
              color: '#555',
              lineHeight: 1.7,
              textAlign: 'center',
              margin: 0,
            }}>
              {activeLens === 'Physics' &&
                'The anthropic principle suggests the conditions for conscious observers are extraordinarily rare in the universe. The fine-tuning of physical constants that permits complex life mirrors the Buddhist teaching on the precious rarity of human birth.'}
              {activeLens === 'Cognitive Science' &&
                'Metacognition research reveals that the capacity for self-reflective awareness is a uniquely sophisticated cognitive ability. Recognizing one\'s own mental states parallels the Buddhist emphasis on appreciating conscious human experience.'}
              {activeLens === 'AI' &&
                'Current AI systems process information without subjective experience. The gap between artificial intelligence and conscious awareness illuminates what makes sentient human life uniquely precious from a Buddhist perspective.'}
            </p>
          </div>
        </div>
      </section>

      {/* ===================== REFLECTION CARD ===================== */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 24px 0 24px',
      }}>
        <div style={{
          maxWidth: 640,
          width: '100%',
          background: '#FEFCF7',
          border: goldBorder,
          borderLeft: `3px solid ${goldPrimary}`,
          borderRadius: cardRadius,
          padding: '36px 40px',
        }}>
          <p style={{
            fontSize: 11,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: goldPrimary,
            margin: '0 0 16px 0',
            fontWeight: 500,
          }}>
            Today&apos;s Reflection
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
            fontSize: 20,
            fontStyle: 'italic',
            color: '#555',
            lineHeight: 1.7,
            margin: 0,
          }}>
            What conditions in your life right now enable growth that others might not have?
          </p>
        </div>
      </section>

      {/* ===================== CONCEPT MAP ===================== */}
      <section style={{
        paddingTop: 120,
        textAlign: 'center',
        padding: '120px 24px 0 24px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
          fontSize: 28,
          fontWeight: 300,
          color: '#1a1a1a',
          margin: 0,
        }}>
          Concept Map
        </h2>
        <p style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 14,
          color: stoneGray,
          marginTop: 12,
          marginBottom: 40,
          fontWeight: 300,
        }}>
          Explore the interconnected path
        </p>

        <ConceptMap />

        <p style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 13,
          color: stoneGray,
          marginTop: 32,
          fontWeight: 300,
        }}>
          14 concepts &middot; 5 scopes &middot; Infinite connections
        </p>
      </section>

      {/* ===================== DICTIONARY ===================== */}
      <section style={{
        paddingTop: 120,
        textAlign: 'center',
        padding: '120px 24px 0 24px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
          fontSize: 28,
          fontWeight: 300,
          color: '#1a1a1a',
          margin: '0 0 40px 0',
        }}>
          Dictionary
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {dictionaryTerms.map((term) => (
            <div
              key={term.english}
              style={{
                background: '#FFFFFF',
                border: goldBorder,
                borderLeft: `3px solid ${goldPrimary}`,
                borderRadius: cardRadius,
                padding: 28,
                textAlign: 'left',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-tibetan), "Microsoft Himalaya", "Tibetan Machine Uni", sans-serif',
                fontSize: 11,
                color: stoneGray,
                margin: '0 0 8px 0',
              }}>
                {term.tibetan}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 10px 0',
              }}>
                {term.english}
              </h3>
              <p style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 14,
                color: '#6B6B6B',
                lineHeight: 1.5,
                margin: 0,
                fontWeight: 300,
              }}>
                {term.definition}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer style={{
        paddingTop: 120,
        paddingBottom: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        <VajraIcon size={16} />
        <p style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 12,
          color: stoneGray,
          margin: 0,
          fontWeight: 300,
        }}>
          The Temple &mdash; Sacred Minimalism
        </p>
        <Link
          href="/preview"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 14,
            color: goldPrimary,
            textDecoration: 'none',
            fontWeight: 400,
            transition: 'opacity 0.2s ease',
          }}
        >
          &larr; Back to Directions
        </Link>
      </footer>
    </div>
  )
}
