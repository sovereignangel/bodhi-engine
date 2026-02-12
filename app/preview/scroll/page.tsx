'use client'

import Link from 'next/link'

// ── Color & Typography Constants ──────────────────────────────────────────────
const GOLD = '#A37E2C'
const BG = '#FAF8F5'
const SERIF = 'var(--font-cormorant), Georgia, serif'
const SANS = 'system-ui, -apple-system, sans-serif'
const TIBETAN = 'var(--font-tibetan), serif'

// ── Inline SVG Components ─────────────────────────────────────────────────────

function LotusSVG({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Center petal */}
      <ellipse cx="16" cy="14" rx="4" ry="10" stroke={GOLD} strokeWidth="1.2" fill="none" />
      {/* Left petal */}
      <ellipse cx="16" cy="14" rx="4" ry="10" stroke={GOLD} strokeWidth="1.2" fill="none"
        transform="rotate(-30 16 14)" />
      {/* Right petal */}
      <ellipse cx="16" cy="14" rx="4" ry="10" stroke={GOLD} strokeWidth="1.2" fill="none"
        transform="rotate(30 16 14)" />
      {/* Far left petal */}
      <ellipse cx="16" cy="14" rx="3.5" ry="9" stroke={GOLD} strokeWidth="1" fill="none"
        transform="rotate(-55 16 14)" />
      {/* Far right petal */}
      <ellipse cx="16" cy="14" rx="3.5" ry="9" stroke={GOLD} strokeWidth="1" fill="none"
        transform="rotate(55 16 14)" />
    </svg>
  )
}

function EndlessKnotSVG({ size = 16 }: { size?: number }) {
  const s = size / 32
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Endless knot — interlocking rectangular loops */}
      <path
        d={`
          M 8 6 L 24 6 L 24 14 L 18 14 L 18 18 L 24 18 L 24 26 L 8 26 L 8 18 L 14 18 L 14 14 L 8 14 Z
        `}
        stroke={GOLD}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Inner cross connections */}
      <line x1="14" y1="6" x2="14" y2="14" stroke={GOLD} strokeWidth="1.2" />
      <line x1="18" y1="6" x2="18" y2="14" stroke={GOLD} strokeWidth="1.2" />
      <line x1="14" y1="18" x2="14" y2="26" stroke={GOLD} strokeWidth="1.2" />
      <line x1="18" y1="18" x2="18" y2="26" stroke={GOLD} strokeWidth="1.2" />
      <line x1="8" y1="10" x2="14" y2="10" stroke={GOLD} strokeWidth="1.2" />
      <line x1="18" y1="10" x2="24" y2="10" stroke={GOLD} strokeWidth="1.2" />
      <line x1="8" y1="22" x2="14" y2="22" stroke={GOLD} strokeWidth="1.2" />
      <line x1="18" y1="22" x2="24" y2="22" stroke={GOLD} strokeWidth="1.2" />
    </svg>
  )
}

// ── Section Divider ───────────────────────────────────────────────────────────

function SectionDivider({ variant = 'lotus' }: { variant?: 'lotus' | 'knot' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 0',
    }}>
      {/* Left line */}
      <div style={{
        width: 52,
        height: 1,
        background: GOLD,
        opacity: 0.4,
      }} />
      {/* Symbol */}
      <div style={{ margin: '0 12px', opacity: 0.7 }}>
        {variant === 'lotus' ? <LotusSVG size={16} /> : <EndlessKnotSVG size={16} />}
      </div>
      {/* Right line */}
      <div style={{
        width: 52,
        height: 1,
        background: GOLD,
        opacity: 0.4,
      }} />
    </div>
  )
}

// ── Mandala Concept Map ───────────────────────────────────────────────────────

function MandalaMap() {
  const cx = 250
  const cy = 250
  const innerR = 120
  const outerR = 200

  // Inner ring nodes — evenly spaced at 120 degrees
  const innerNodes = [
    { label: 'Emptiness', angle: -90 },
    { label: 'Bodhicitta', angle: 30 },
    { label: 'Renunciation', angle: 150 },
  ]

  // Outer ring nodes — evenly spaced at 90 degrees
  const outerNodes = [
    { label: 'Karma', angle: -45 },
    { label: 'Refuge', angle: 45 },
    { label: 'Impermanence', angle: 135 },
    { label: 'Precious Human Life', angle: 225 },
  ]

  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  })

  // Curved path from center to node
  const curvedLine = (tx: number, ty: number) => {
    const mx = (cx + tx) / 2 + (ty - cy) * 0.15
    const my = (cy + ty) / 2 - (tx - cx) * 0.15
    return `M ${cx} ${cy} Q ${mx} ${my} ${tx} ${ty}`
  }

  // Connections from inner to outer
  const innerOuterConnections = [
    { inner: 0, outer: 0 }, // Emptiness -> Karma
    { inner: 0, outer: 1 }, // Emptiness -> Refuge
    { inner: 1, outer: 1 }, // Bodhicitta -> Refuge
    { inner: 1, outer: 3 }, // Bodhicitta -> Precious Human Life
    { inner: 2, outer: 2 }, // Renunciation -> Impermanence
    { inner: 2, outer: 3 }, // Renunciation -> Precious Human Life
  ]

  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
    >
      {/* Concentric guide circles */}
      <circle cx={cx} cy={cy} r={innerR} stroke={GOLD} strokeWidth="1"
        strokeDasharray="4 4" fill="none" opacity="0.05" />
      <circle cx={cx} cy={cy} r={outerR} stroke={GOLD} strokeWidth="1"
        strokeDasharray="4 4" fill="none" opacity="0.05" />

      {/* Lines from center to inner ring */}
      {innerNodes.map((n, i) => {
        const pos = toXY(n.angle, innerR)
        return (
          <path key={`c-i-${i}`} d={curvedLine(pos.x, pos.y)}
            stroke={GOLD} strokeWidth="1" fill="none" opacity="0.4" />
        )
      })}

      {/* Lines from inner to outer ring */}
      {innerOuterConnections.map((c, i) => {
        const from = toXY(innerNodes[c.inner].angle, innerR)
        const to = toXY(outerNodes[c.outer].angle, outerR)
        const mx = (from.x + to.x) / 2 + (to.y - from.y) * 0.1
        const my = (from.y + to.y) / 2 - (to.x - from.x) * 0.1
        return (
          <path key={`i-o-${i}`}
            d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
            stroke={GOLD} strokeWidth="1" fill="none" opacity="0.25" />
        )
      })}

      {/* Outer ring nodes */}
      {outerNodes.map((n, i) => {
        const pos = toXY(n.angle, outerR)
        return (
          <g key={`o-${i}`}>
            <circle cx={pos.x} cy={pos.y} r={16} stroke={GOLD} strokeWidth="1"
              fill="rgba(163,126,44,0.05)" />
            <text x={pos.x} y={pos.y + 28} textAnchor="middle"
              style={{ fontSize: 12, fontFamily: SANS, fill: '#555' }}>
              {n.label}
            </text>
          </g>
        )
      })}

      {/* Inner ring nodes */}
      {innerNodes.map((n, i) => {
        const pos = toXY(n.angle, innerR)
        return (
          <g key={`i-${i}`}>
            <circle cx={pos.x} cy={pos.y} r={20} stroke={GOLD} strokeWidth="1.5"
              fill="rgba(163,126,44,0.06)" />
            <text x={pos.x} y={pos.y + 32} textAnchor="middle"
              style={{ fontSize: 12, fontFamily: SANS, fill: '#555' }}>
              {n.label}
            </text>
          </g>
        )
      })}

      {/* Center node */}
      <circle cx={cx} cy={cy} r={30} stroke={GOLD} strokeWidth="2"
        fill="rgba(163,126,44,0.1)" />
      <text x={cx} y={cy - 4} textAnchor="middle"
        style={{ fontSize: 11, fontFamily: SANS, fill: '#555', fontWeight: 500 }}>
        Enlight-
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle"
        style={{ fontSize: 11, fontFamily: SANS, fill: '#555', fontWeight: 500 }}>
        enment
      </text>
    </svg>
  )
}

// ── Lens Cards ────────────────────────────────────────────────────────────────

const lensCards = [
  {
    icon: '\u269B',
    label: 'Physics',
    text: 'Like quantum superposition — potential collapses into meaning only through observation.',
  },
  {
    icon: '\uD83E\uDDE0',
    label: 'Cognitive Science',
    text: 'Metacognitive awareness transforms automatic patterns into conscious choices.',
  },
  {
    icon: '\u26A1',
    label: 'AI',
    text: 'Training data without purpose yields noise. Intention shapes the model.',
  },
]

// ── Dictionary Data ───────────────────────────────────────────────────────────

const dictionaryEntries = [
  {
    term: 'Bodhicitta',
    tibetan: 'བྱང་ཆུབ་ཀྱི་སེམས།',
    definition: 'The mind of enlightenment; the aspiration to attain Buddhahood for the benefit of all sentient beings.',
  },
  {
    term: 'Buddha',
    tibetan: 'སངས་རྒྱས།',
    definition: 'An awakened one; a being who has purified all obscurations and perfected all good qualities.',
  },
  {
    term: 'Bh\u016Bmi',
    tibetan: 'ས།',
    definition: 'Ground or stage; the ten progressive levels of a bodhisattva\u2019s spiritual development.',
  },
  {
    term: 'Bardo',
    tibetan: 'བར་དོ།',
    definition: 'Intermediate state; the transitional period between death and rebirth.',
  },
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// ── Main Page Component ───────────────────────────────────────────────────────

export default function ScrollPreview() {
  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      color: '#1a1a1a',
      fontFamily: SERIF,
      overflowX: 'hidden',
    }}>

      {/* ══════════════════════════════════════════════════════════════════════
          FLOATING NAVIGATION PILL
          ══════════════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 24,
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(163,126,44,0.08)',
      }}>
        {/* Dot 1 — Active (Daily) */}
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: GOLD,
        }} />
        {/* Dot 2 — Inactive (Map) */}
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '1.5px solid #BFBFBF',
          background: 'transparent',
        }} />
        {/* Dot 3 — Inactive (Dictionary) */}
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '1.5px solid #BFBFBF',
          background: 'transparent',
        }} />
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 1 — DAILY TEACHING
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 160,
        paddingBottom: 0,
        paddingLeft: 24,
        paddingRight: 24,
        position: 'relative',
      }}>
        {/* Chapter watermark */}
        <div style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 120,
          fontFamily: SERIF,
          fontWeight: 200,
          color: 'rgba(163,126,44,0.08)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          01
        </div>

        {/* Section label */}
        <div style={{
          fontSize: 11,
          fontFamily: SANS,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: GOLD,
          fontWeight: 500,
          marginBottom: 24,
          position: 'relative',
          zIndex: 1,
        }}>
          DAILY TEACHING
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 48,
          fontFamily: SERIF,
          fontWeight: 400,
          color: '#1a1a1a',
          margin: 0,
          marginBottom: 12,
          textAlign: 'center',
        }}>
          Precious Human Life
        </h1>

        {/* Tibetan */}
        <p style={{
          fontSize: 16,
          fontFamily: TIBETAN,
          color: GOLD,
          opacity: 0.6,
          margin: 0,
          marginBottom: 48,
          textAlign: 'center',
        }}>
          མི་ལུས་རིན་པོ་ཆེ།
        </p>

        {/* Teaching text */}
        <p style={{
          fontSize: 22,
          fontFamily: SERIF,
          lineHeight: 2.0,
          color: '#2a2a2a',
          maxWidth: 700,
          textAlign: 'center',
          margin: '0 auto',
          marginBottom: 20,
        }}>
          This human life with its eight freedoms and ten endowments is more precious
          than a wish-fulfilling jewel. Having found such a life just this once, so
          difficult to find and so meaningful, to waste it without accomplishing
          anything would be self-deception.
        </p>

        {/* Source */}
        <p style={{
          fontSize: 14,
          fontFamily: SERIF,
          fontStyle: 'italic',
          color: '#9B9B9B',
          margin: 0,
          marginBottom: 60,
          textAlign: 'center',
        }}>
          — Lamrim Chenmo, Chapter 4
        </p>

        {/* Lens Cards */}
        <div style={{
          display: 'flex',
          gap: 16,
          maxWidth: 700,
          width: '100%',
          marginBottom: 60,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {lensCards.map((card, i) => (
            <div key={i} style={{
              flex: '1 1 200px',
              border: '1px solid rgba(163,126,44,0.15)',
              borderRadius: 12,
              padding: 24,
              minWidth: 190,
              maxWidth: 240,
            }}>
              <div style={{
                fontSize: 11,
                fontFamily: SANS,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: GOLD,
                fontWeight: 500,
                marginBottom: 10,
              }}>
                {card.icon} {card.label}
              </div>
              <p style={{
                fontSize: 15,
                fontFamily: SANS,
                color: '#555',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Reflection */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          marginBottom: 40,
        }}>
          {/* Gold rule */}
          <div style={{
            width: 80,
            height: 1,
            background: GOLD,
            opacity: 0.4,
            marginBottom: 24,
          }} />
          <p style={{
            fontSize: 20,
            fontFamily: SERIF,
            fontStyle: 'italic',
            color: '#6B6B6B',
            lineHeight: 1.8,
            textAlign: 'center',
            margin: 0,
          }}>
            What would it mean to live this one life as though it were truly
            irreplaceable?
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION DIVIDER 1 — Lotus
          ══════════════════════════════════════════════════════════════════════ */}
      <SectionDivider variant="lotus" />

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 2 — CONCEPT MAP
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        position: 'relative',
      }}>
        {/* Chapter watermark */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 120,
          fontFamily: SERIF,
          fontWeight: 200,
          color: 'rgba(163,126,44,0.08)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          02
        </div>

        {/* Section label */}
        <div style={{
          fontSize: 11,
          fontFamily: SANS,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: GOLD,
          fontWeight: 500,
          marginBottom: 24,
          position: 'relative',
          zIndex: 1,
        }}>
          CONCEPT MAP
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 42,
          fontFamily: SERIF,
          fontWeight: 400,
          color: '#1a1a1a',
          margin: 0,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          The Graduated Path
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: 16,
          fontFamily: SANS,
          color: '#9B9B9B',
          margin: 0,
          marginBottom: 60,
          textAlign: 'center',
        }}>
          Interconnected teachings of the Lamrim
        </p>

        {/* Mandala Map */}
        <MandalaMap />

        {/* Tap instruction */}
        <p style={{
          fontSize: 13,
          fontFamily: SANS,
          color: '#9B9B9B',
          margin: 0,
          marginTop: 32,
          textAlign: 'center',
        }}>
          Tap any concept to explore its connections
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION DIVIDER 2 — Endless Knot
          ══════════════════════════════════════════════════════════════════════ */}
      <SectionDivider variant="knot" />

      {/* ══════════════════════════════════════════════════════════════════════
          SCENE 3 — DICTIONARY
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        position: 'relative',
      }}>
        {/* Chapter watermark */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 120,
          fontFamily: SERIF,
          fontWeight: 200,
          color: 'rgba(163,126,44,0.08)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          03
        </div>

        {/* Section label */}
        <div style={{
          fontSize: 11,
          fontFamily: SANS,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: GOLD,
          fontWeight: 500,
          marginBottom: 24,
          position: 'relative',
          zIndex: 1,
        }}>
          DICTIONARY
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 42,
          fontFamily: SERIF,
          fontWeight: 400,
          color: '#1a1a1a',
          margin: 0,
          marginBottom: 48,
          textAlign: 'center',
        }}>
          Buddhist Terms & Definitions
        </h2>

        {/* Alphabet filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 32,
          maxWidth: 640,
        }}>
          {alphabet.map((letter) => (
            <span key={letter} style={{
              fontSize: 13,
              fontFamily: SANS,
              letterSpacing: '0.05em',
              color: letter === 'B' ? GOLD : '#9B9B9B',
              fontWeight: letter === 'B' ? 600 : 400,
              cursor: 'pointer',
              padding: '4px 6px',
              borderBottom: letter === 'B' ? `2px solid ${GOLD}` : '2px solid transparent',
              transition: 'color 0.2s ease',
            }}>
              {letter}
            </span>
          ))}
        </div>

        {/* Dictionary entries */}
        <div style={{
          maxWidth: 640,
          width: '100%',
        }}>
          {dictionaryEntries.map((entry, i) => (
            <div key={i} style={{
              padding: '20px 0',
              borderBottom: i < dictionaryEntries.length - 1
                ? '1px solid #eee'
                : 'none',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 6,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: 22,
                  fontFamily: SERIF,
                  fontWeight: 700,
                  color: '#1a1a1a',
                }}>
                  {entry.term}
                </span>
                <span style={{
                  fontSize: 12,
                  fontFamily: TIBETAN,
                  color: '#9B9B9B',
                }}>
                  {entry.tibetan}
                </span>
              </div>
              <p style={{
                fontSize: 16,
                fontFamily: SANS,
                color: '#555',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {entry.definition}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        gap: 16,
      }}>
        {/* Endless Knot */}
        <EndlessKnotSVG size={20} />

        {/* Title */}
        <p style={{
          fontSize: 12,
          fontFamily: SANS,
          color: '#9B9B9B',
          margin: 0,
          letterSpacing: '0.05em',
        }}>
          The Scroll — Contemplative Journey
        </p>

        {/* Back link */}
        <Link href="/preview" style={{
          fontSize: 14,
          fontFamily: SANS,
          color: GOLD,
          textDecoration: 'none',
          transition: 'opacity 0.2s ease',
        }}>
          &larr; Back to Directions
        </Link>
      </footer>
    </div>
  )
}
