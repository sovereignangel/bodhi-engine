'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Color Palette ---
const GOLD = '#B8860B'
const BG_MAIN = '#FAFAFA'
const BG_SIDEBAR = '#F5F2ED'
const TEXT_PRIMARY = '#1a1a1a'
const TEXT_BODY = '#2a2a2a'
const TEXT_SECONDARY = '#555'
const TEXT_MUTED = '#6B6B6B'
const TEXT_FAINT = '#9B9B9B'
const BORDER_LIGHT = '#e5e5e5'
const BORDER_FAINT = '#f0f0f0'
const BORDER_TRACK = '#e0e0e0'

// --- Font Stacks ---
const SERIF = 'var(--font-cormorant), Georgia, "Times New Roman", serif'
const SANS = 'system-ui, -apple-system, -webkit-system-font, "Segoe UI", sans-serif'
const TIBETAN = 'var(--font-tibetan), "Noto Sans Tibetan", "Microsoft Himalaya", sans-serif'

// --- Data ---
const lenses = [
  {
    id: 'physics',
    label: 'PHYSICS',
    text: 'The anthropic principle suggests the conditions for conscious observers are extraordinarily rare.',
  },
  {
    id: 'cognitive',
    label: 'COGNITIVE SCIENCE',
    text: 'Metacognition \u2014 the ability to think about thinking \u2014 is evolutionarily rare.',
  },
  {
    id: 'ai',
    label: 'AI',
    text: 'Every inference cycle should generate value rather than waste resources.',
  },
]

const conceptNodes = [
  { id: 'enlightenment', label: 'Enlightenment', x: 350, y: 60, r: 18 },
  { id: 'emptiness', label: 'Emptiness', x: 180, y: 140, r: 13 },
  { id: 'bodhicitta', label: 'Bodhicitta', x: 520, y: 140, r: 13 },
  { id: 'renunciation', label: 'Renunciation', x: 100, y: 260, r: 12 },
  { id: 'karma', label: 'Karma', x: 280, y: 300, r: 11 },
  { id: 'impermanence', label: 'Impermanence', x: 460, y: 280, r: 11 },
  { id: 'refuge', label: 'Refuge', x: 600, y: 300, r: 11 },
]

const conceptEdges = [
  ['enlightenment', 'emptiness'],
  ['enlightenment', 'bodhicitta'],
  ['emptiness', 'renunciation'],
  ['emptiness', 'karma'],
  ['bodhicitta', 'impermanence'],
  ['bodhicitta', 'refuge'],
  ['renunciation', 'karma'],
  ['karma', 'impermanence'],
  ['impermanence', 'refuge'],
]

const dictionaryEntries = [
  {
    term: 'Bodhicitta',
    tibetan: '\u0F56\u0FB1\u0F44\u0F0B\u0F46\u0F74\u0F56\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F7A\u0F58\u0F66\u0F0D',
    scope: 'GREAT',
    definition: 'The mind of enlightenment; the aspiration to attain Buddhahood for the benefit of all sentient beings.',
  },
  {
    term: '\u015A\u016Bnyat\u0101',
    tibetan: '\u0F66\u0F9F\u0F7C\u0F44\u0F0B\u0F54\u0F0B\u0F49\u0F72\u0F51\u0F0D',
    scope: 'GREAT',
    definition: 'Emptiness; absence of inherent existence in all phenomena.',
  },
  {
    term: 'Karma',
    tibetan: '\u0F63\u0F66\u0F0D',
    scope: 'SMALL',
    definition: 'Intentional action; cause and effect governing moral actions.',
  },
  {
    term: 'Refuge',
    tibetan: '\u0F66\u0F90\u0FB1\u0F56\u0F66\u0F0B\u0F60\u0F42\u0FB2\u0F7C\u0F0D',
    scope: 'SMALL',
    definition: 'Entrusting oneself to the Three Jewels: Buddha, Dharma, and Sangha.',
  },
]

// --- Vajra SVG Component ---
function VajraSVG({ size = 28, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ display: 'block' }}
    >
      {/* Central orb */}
      <ellipse cx="32" cy="32" rx="5" ry="5" fill={color} />
      {/* Upper shaft */}
      <line x1="32" y1="27" x2="32" y2="8" stroke={color} strokeWidth="2" />
      {/* Lower shaft */}
      <line x1="32" y1="37" x2="32" y2="56" stroke={color} strokeWidth="2" />
      {/* Upper prongs - center */}
      <path d="M32 8 L32 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Upper prongs - left outer */}
      <path d="M32 12 Q24 6 22 2" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Upper prongs - right outer */}
      <path d="M32 12 Q40 6 42 2" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Upper prongs - left inner */}
      <path d="M32 14 Q27 9 26 5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Upper prongs - right inner */}
      <path d="M32 14 Q37 9 38 5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Lower prongs - center */}
      <path d="M32 56 L32 62" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Lower prongs - left outer */}
      <path d="M32 52 Q24 58 22 62" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Lower prongs - right outer */}
      <path d="M32 52 Q40 58 42 62" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Lower prongs - left inner */}
      <path d="M32 50 Q27 55 26 59" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Lower prongs - right inner */}
      <path d="M32 50 Q37 55 38 59" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Upper lotus petals */}
      <ellipse cx="28" cy="24" rx="3.5" ry="2" transform="rotate(-15 28 24)" stroke={color} strokeWidth="1" fill="none" />
      <ellipse cx="36" cy="24" rx="3.5" ry="2" transform="rotate(15 36 24)" stroke={color} strokeWidth="1" fill="none" />
      {/* Lower lotus petals */}
      <ellipse cx="28" cy="40" rx="3.5" ry="2" transform="rotate(15 28 40)" stroke={color} strokeWidth="1" fill="none" />
      <ellipse cx="36" cy="40" rx="3.5" ry="2" transform="rotate(-15 36 40)" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  )
}

// --- Dharma Wheel Node SVG ---
function DharmaNode({
  cx,
  cy,
  r,
  selected = false,
}: {
  cx: number
  cy: number
  r: number
  selected?: boolean
}) {
  const spokeCount = 8
  return (
    <g>
      {/* Outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={selected ? GOLD : GOLD}
        strokeWidth={selected ? 2 : 1}
        fill={selected ? 'rgba(184,134,11,0.08)' : 'white'}
      />
      {/* Inner hub */}
      <circle cx={cx} cy={cy} r={r * 0.3} stroke={GOLD} strokeWidth={0.8} fill="none" />
      {/* Spokes */}
      {Array.from({ length: spokeCount }).map((_, i) => {
        const angle = (i * 360) / spokeCount
        const rad = (angle * Math.PI) / 180
        const x1 = cx + r * 0.3 * Math.cos(rad)
        const y1 = cy + r * 0.3 * Math.sin(rad)
        const x2 = cx + r * 0.85 * Math.cos(rad)
        const y2 = cy + r * 0.85 * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={GOLD}
            strokeWidth={0.6}
          />
        )
      })}
    </g>
  )
}

// --- Main Page ---
export default function JewelPreview() {
  const [activeNav, setActiveNav] = useState('daily')
  const [activeLens, setActiveLens] = useState('physics')
  const [selectedNode, setSelectedNode] = useState('enlightenment')
  const [filterText, setFilterText] = useState('')

  const filteredEntries = dictionaryEntries.filter(
    (entry) =>
      entry.term.toLowerCase().includes(filterText.toLowerCase()) ||
      entry.definition.toLowerCase().includes(filterText.toLowerCase())
  )

  const nodeMap = Object.fromEntries(conceptNodes.map((n) => [n.id, n]))

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: BG_MAIN }}>
      {/* ===== LEFT SIDEBAR ===== */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 240,
          height: '100vh',
          background: BG_SIDEBAR,
          padding: '40px 28px',
          boxSizing: 'border-box',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Vajra + Brand */}
        <div>
          <VajraSVG size={28} color={GOLD} />
          <div
            style={{
              marginTop: 8,
              fontSize: 10,
              fontFamily: SANS,
              letterSpacing: '0.2em',
              color: GOLD,
              fontWeight: 500,
            }}
          >
            BODHI ENGINE
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: 60 }}>
          {[
            { id: 'daily', label: 'DAILY TEACHING' },
            { id: 'concept', label: 'CONCEPT MAP' },
            { id: 'dictionary', label: 'DICTIONARY' },
          ].map((item) => {
            const isActive = activeNav === item.id
            return (
              <div
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 20,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
              >
                {/* Gold dot indicator */}
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isActive ? GOLD : 'transparent',
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: SANS,
                    color: isActive ? TEXT_PRIMARY : TEXT_MUTED,
                    letterSpacing: '0.05em',
                    fontWeight: isActive ? 500 : 400,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                </span>
              </div>
            )
          })}
        </nav>

        {/* Bottom Progress */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 28,
            right: 28,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontFamily: SANS,
              color: TEXT_FAINT,
              marginBottom: 10,
            }}
          >
            Day 1 of 21
          </div>
          {/* Progress track */}
          <div
            style={{
              width: '100%',
              height: 2,
              background: BORDER_TRACK,
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '5%',
                height: '100%',
                background: GOLD,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main
        style={{
          marginLeft: 240,
          flex: 1,
          minHeight: '100vh',
          padding: 60,
          boxSizing: 'border-box',
          background: BG_MAIN,
        }}
      >
        {/* --- Header Row --- */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 60,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: SANS,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: GOLD,
              fontWeight: 500,
            }}
          >
            DAILY TEACHING
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: SANS,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: TEXT_FAINT,
            }}
          >
            FOUNDATION &middot; DAY 1
          </span>
        </div>

        {/* --- Teaching Content: Two Columns --- */}
        <div style={{ display: 'flex', gap: 0 }}>
          {/* Left Column (60%) */}
          <div style={{ width: '60%', paddingRight: 40 }}>
            {/* Faint Day Number Watermark */}
            <div
              style={{
                fontSize: 64,
                fontFamily: SERIF,
                fontWeight: 200,
                color: 'rgba(184,134,11,0.12)',
                lineHeight: 1,
                marginBottom: -8,
              }}
            >
              Day 01
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 36,
                fontFamily: SERIF,
                fontWeight: 400,
                color: TEXT_PRIMARY,
                margin: '8px 0 4px 0',
                lineHeight: 1.2,
              }}
            >
              Precious Human Life
            </h1>

            {/* Tibetan */}
            <div
              style={{
                fontSize: 13,
                fontFamily: TIBETAN,
                color: TEXT_FAINT,
                marginBottom: 12,
              }}
            >
              {'\u0F58\u0F72\u0F0B\u0F63\u0F74\u0F66\u0F0B\u0F62\u0F72\u0F53\u0F0B\u0F54\u0F7C\u0F0B\u0F46\u0F7A\u0F0D'}
            </div>

            {/* Gold underline accent */}
            <div
              style={{
                width: 40,
                height: 2,
                background: GOLD,
                marginBottom: 32,
              }}
            />

            {/* Teaching Text */}
            <p
              style={{
                fontSize: 18,
                fontFamily: SERIF,
                lineHeight: 1.8,
                color: TEXT_BODY,
                margin: '0 0 12px 0',
                maxWidth: 560,
              }}
            >
              This human life with its eight freedoms and ten endowments is more
              precious than a wish-fulfilling jewel. Having found such a life just
              this once, so difficult to find and so meaningful, to waste it without
              accomplishing anything would be self-deception.
            </p>

            {/* Source */}
            <div
              style={{
                fontSize: 12,
                fontFamily: SANS,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: TEXT_FAINT,
                marginBottom: 32,
              }}
            >
              Lamrim Chenmo, Chapter 4
            </div>

            {/* Commentary */}
            <p
              style={{
                fontSize: 16,
                fontFamily: SANS,
                lineHeight: 1.7,
                color: TEXT_SECONDARY,
                margin: 0,
                maxWidth: 520,
              }}
            >
              Contemplate the rarity of human birth with access to dharma, teachers,
              and the leisure to practice.
            </p>
          </div>

          {/* Right Column (40%) */}
          <div
            style={{
              width: '40%',
              paddingLeft: 40,
              borderLeft: `1px solid ${BORDER_LIGHT}`,
            }}
          >
            {/* LENSES Label */}
            <div
              style={{
                fontSize: 10,
                fontFamily: SANS,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: GOLD,
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              LENSES
            </div>

            {/* Lens Sections */}
            {lenses.map((lens, idx) => {
              const isActive = activeLens === lens.id
              return (
                <div key={lens.id} style={{ marginBottom: idx < lenses.length - 1 ? 16 : 0 }}>
                  <div
                    onClick={() => setActiveLens(lens.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: isActive ? GOLD : 'transparent',
                        border: isActive ? 'none' : `1px solid ${BORDER_TRACK}`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: SANS,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: isActive ? TEXT_PRIMARY : TEXT_FAINT,
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {lens.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: SANS,
                      color: TEXT_SECONDARY,
                      lineHeight: 1.6,
                      margin: 0,
                      paddingLeft: 13,
                    }}
                  >
                    {lens.text}
                  </p>
                </div>
              )
            })}

            {/* Reflection */}
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  fontSize: 10,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: GOLD,
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                REFLECTION
              </div>
              <div
                style={{
                  borderLeft: `2px solid ${GOLD}`,
                  paddingLeft: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    color: TEXT_MUTED,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  What conditions in your life right now enable growth?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: BORDER_LIGHT,
            margin: '80px 0',
          }}
        />

        {/* ===== CONCEPT MAP SECTION ===== */}
        <div>
          {/* Header */}
          <div
            style={{
              fontSize: 11,
              fontFamily: SANS,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: GOLD,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            CONCEPT MAP
          </div>
          <h2
            style={{
              fontSize: 32,
              fontFamily: SERIF,
              fontWeight: 300,
              color: TEXT_PRIMARY,
              margin: '0 0 40px 0',
            }}
          >
            The Graduated Path
          </h2>

          {/* Graph + Detail Panel */}
          <div style={{ display: 'flex', gap: 40 }}>
            {/* SVG Graph */}
            <div style={{ flex: '0 0 700px' }}>
              <svg
                width={700}
                height={400}
                viewBox="0 0 700 400"
                style={{ display: 'block', overflow: 'visible' }}
              >
                {/* Background */}
                <rect width="700" height="400" fill="transparent" />

                {/* Edges */}
                {conceptEdges.map(([fromId, toId], idx) => {
                  const from = nodeMap[fromId]
                  const to = nodeMap[toId]
                  if (!from || !to) return null
                  return (
                    <line
                      key={idx}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={GOLD}
                      strokeWidth={0.8}
                      opacity={0.4}
                    />
                  )
                })}

                {/* Nodes */}
                {conceptNodes.map((node) => {
                  const isSelected = selectedNode === node.id
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <DharmaNode
                        cx={node.x}
                        cy={node.y}
                        r={node.id === 'enlightenment' ? 18 : node.r}
                        selected={isSelected}
                      />
                      <text
                        x={node.x}
                        y={node.y + (node.id === 'enlightenment' ? 30 : node.r + 14)}
                        textAnchor="middle"
                        style={{
                          fontSize: 11,
                          fontFamily: SANS,
                          fill: isSelected ? TEXT_PRIMARY : TEXT_MUTED,
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        {node.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Detail Panel */}
            <div
              style={{
                flex: 1,
                borderLeft: `1px solid ${BORDER_LIGHT}`,
                paddingLeft: 40,
                minWidth: 240,
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontFamily: SERIF,
                  fontWeight: 400,
                  color: TEXT_PRIMARY,
                  margin: '0 0 4px 0',
                }}
              >
                {nodeMap[selectedNode]?.label || 'Enlightenment'}
              </h3>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: TIBETAN,
                  color: TEXT_FAINT,
                  marginBottom: 20,
                }}
              >
                {selectedNode === 'enlightenment' && '\u0F56\u0FB1\u0F44\u0F0B\u0F46\u0F74\u0F56\u0F0D'}
                {selectedNode === 'emptiness' && '\u0F66\u0F9F\u0F7C\u0F44\u0F0B\u0F54\u0F0B\u0F49\u0F72\u0F51\u0F0D'}
                {selectedNode === 'bodhicitta' && '\u0F56\u0FB1\u0F44\u0F0B\u0F46\u0F74\u0F56\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F7A\u0F58\u0F66\u0F0D'}
                {selectedNode === 'renunciation' && '\u0F44\u0F7A\u0F66\u0F0B\u0F60\u0F56\u0FB1\u0F74\u0F44\u0F0D'}
                {selectedNode === 'karma' && '\u0F63\u0F66\u0F0D'}
                {selectedNode === 'impermanence' && '\u0F58\u0F72\u0F0B\u0F62\u0F9F\u0F42\u0F0B\u0F54\u0F0D'}
                {selectedNode === 'refuge' && '\u0F66\u0F90\u0FB1\u0F56\u0F66\u0F0B\u0F60\u0F42\u0FB2\u0F7C\u0F0D'}
              </div>

              {/* Definition */}
              <div
                style={{
                  fontSize: 10,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: GOLD,
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                DEFINITION
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontFamily: SANS,
                  color: TEXT_SECONDARY,
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                }}
              >
                {selectedNode === 'enlightenment' &&
                  'The complete awakening of a Buddha; the full realization of the nature of reality and the perfection of compassion.'}
                {selectedNode === 'emptiness' &&
                  'The absence of inherent existence in all phenomena; the ultimate nature of reality.'}
                {selectedNode === 'bodhicitta' &&
                  'The mind of enlightenment; the aspiration to attain Buddhahood for the benefit of all sentient beings.'}
                {selectedNode === 'renunciation' &&
                  'The determination to be free from cyclic existence and its causes.'}
                {selectedNode === 'karma' &&
                  'Intentional action and its results; the natural law of cause and effect governing moral actions.'}
                {selectedNode === 'impermanence' &&
                  'The transient nature of all conditioned phenomena; nothing remains static.'}
                {selectedNode === 'refuge' &&
                  'Entrusting oneself to the Three Jewels: Buddha, Dharma, and Sangha as the path to liberation.'}
              </p>

              {/* Related Concepts */}
              <div
                style={{
                  fontSize: 10,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: GOLD,
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                RELATED CONCEPTS
              </div>
              <div style={{ marginBottom: 24 }}>
                {selectedNode === 'enlightenment' &&
                  ['Emptiness', 'Bodhicitta', 'Six Perfections'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'emptiness' &&
                  ['Enlightenment', 'Renunciation', 'Dependent Origination'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'bodhicitta' &&
                  ['Enlightenment', 'Six Perfections', 'Tonglen'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'renunciation' &&
                  ['Emptiness', 'Karma', 'Four Noble Truths'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'karma' &&
                  ['Renunciation', 'Impermanence', 'Ethics'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'impermanence' &&
                  ['Karma', 'Refuge', 'Suffering'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                {selectedNode === 'refuge' &&
                  ['Bodhicitta', 'Impermanence', 'Three Jewels'].map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontFamily: SANS,
                        color: TEXT_MUTED,
                        marginRight: 16,
                        marginBottom: 4,
                      }}
                    >
                      {c}
                    </span>
                  ))}
              </div>

              {/* Lenses */}
              <div
                style={{
                  fontSize: 10,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: GOLD,
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                LENSES
              </div>
              {[
                {
                  label: 'Physics',
                  text:
                    selectedNode === 'enlightenment'
                      ? 'A unified field theory unifying all forces of nature.'
                      : 'Quantum vacuum \u2014 apparent emptiness contains all potentiality.',
                },
                {
                  label: 'Cognitive Science',
                  text:
                    selectedNode === 'enlightenment'
                      ? 'Optimal cognitive integration across all neural systems.'
                      : 'Neural plasticity and the capacity for fundamental perceptual shifts.',
                },
                {
                  label: 'AI',
                  text:
                    selectedNode === 'enlightenment'
                      ? 'Artificial general intelligence aligned with human values.'
                      : 'Alignment and emergent properties in complex systems.',
                },
              ].map((l) => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: SANS,
                      textTransform: 'uppercase',
                      color: TEXT_FAINT,
                      letterSpacing: '0.05em',
                      marginBottom: 2,
                    }}
                  >
                    {l.label}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      fontFamily: SANS,
                      color: TEXT_SECONDARY,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {l.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: BORDER_LIGHT,
            margin: '80px 0',
          }}
        />

        {/* ===== DICTIONARY SECTION ===== */}
        <div>
          {/* Header */}
          <div
            style={{
              fontSize: 11,
              fontFamily: SANS,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: GOLD,
              fontWeight: 500,
              marginBottom: 32,
            }}
          >
            DICTIONARY
          </div>

          {/* Filter Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter terms..."
              style={{
                width: 280,
                padding: '8px 0',
                border: 'none',
                borderBottom: `1px solid ${BORDER_LIGHT}`,
                background: 'transparent',
                fontSize: 14,
                fontFamily: SANS,
                color: TEXT_PRIMARY,
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: TEXT_FAINT,
                  cursor: 'pointer',
                }}
              >
                A\u2013Z
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: TEXT_FAINT,
                  cursor: 'pointer',
                }}
              >
                SCOPE
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 160px 100px 1fr',
              gap: 16,
              paddingBottom: 12,
              borderBottom: `1px solid ${BORDER_LIGHT}`,
              marginBottom: 0,
            }}
          >
            {['TERM', 'TIBETAN', 'SCOPE', 'DEFINITION'].map((col) => (
              <div
                key={col}
                style={{
                  fontSize: 10,
                  fontFamily: SANS,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: TEXT_FAINT,
                  fontWeight: 500,
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {filteredEntries.map((entry, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 160px 100px 1fr',
                gap: 16,
                padding: '16px 0',
                borderBottom: `1px solid ${BORDER_FAINT}`,
                alignItems: 'center',
              }}
            >
              {/* Term */}
              <div
                style={{
                  fontSize: 15,
                  fontFamily: SERIF,
                  color: TEXT_PRIMARY,
                  fontWeight: 400,
                }}
              >
                {entry.term}
              </div>
              {/* Tibetan */}
              <div
                style={{
                  fontSize: 13,
                  fontFamily: TIBETAN,
                  color: TEXT_MUTED,
                }}
              >
                {entry.tibetan}
              </div>
              {/* Scope Pill */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 9,
                    fontFamily: SANS,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '3px 10px',
                    borderRadius: 10,
                    background: entry.scope === 'GREAT' ? GOLD : '#e8e8e8',
                    color: entry.scope === 'GREAT' ? '#fff' : TEXT_MUTED,
                    fontWeight: 500,
                  }}
                >
                  {entry.scope}
                </span>
              </div>
              {/* Definition */}
              <div
                style={{
                  fontSize: 14,
                  fontFamily: SANS,
                  color: TEXT_SECONDARY,
                  lineHeight: 1.5,
                }}
              >
                {entry.definition}
              </div>
            </div>
          ))}
        </div>

        {/* ===== FOOTER ===== */}
        <div
          style={{
            marginTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 40,
          }}
        >
          {/* Thin gold line */}
          <div
            style={{
              width: 40,
              height: 1,
              background: GOLD,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontFamily: SANS,
              color: TEXT_FAINT,
              marginBottom: 16,
            }}
          >
            The Jewel &mdash; Precision Craft
          </div>
          <Link
            href="/preview"
            style={{
              fontSize: 13,
              fontFamily: SANS,
              color: GOLD,
              textDecoration: 'none',
            }}
          >
            &larr; Back to Directions
          </Link>
        </div>
      </main>
    </div>
  )
}
