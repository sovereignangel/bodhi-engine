'use client'

import { useState } from 'react'
import { nodeData, nodesByScope } from '@/lib/data/nodeData'
import type { NodeId } from '@/types/node'

type LensKey = 'physics' | 'cogsci' | 'ai'

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────

const GOLD = '#B8860B'
const GOLD_FAINT = 'rgba(184,134,11,0.08)'
const GOLD_SUBTLE = 'rgba(184,134,11,0.12)'
const GOLD_MID = 'rgba(184,134,11,0.25)'
const GOLD_STRONG = 'rgba(184,134,11,0.5)'

// ─────────────────────────────────────────────
// NODE LAYOUT — ascending mountain, carefully positioned
// ─────────────────────────────────────────────

const W = 700
const H = 1060

interface NodeMeta {
  x: number
  y: number
  r: number
  scope: string
}

type PathNodeId =
  | 'spiritualGuide' | 'preciousHuman' | 'impermanence'
  | 'lowerRealms' | 'refuge' | 'karma' | 'dependentOrigination'
  | 'renunciation' | 'shamatha'
  | 'tonglen' | 'bodhicitta' | 'sixPerfections'
  | 'emptiness' | 'vipashyana'
  | 'pointingOut' | 'fourYogas'
  | 'enlightenment'

const nodes: Record<PathNodeId, NodeMeta> = {
  // Foundation (bottom) — y: 960
  spiritualGuide: { x: 180, y: 960, r: 20, scope: 'foundation' },
  preciousHuman: { x: 350, y: 960, r: 20, scope: 'foundation' },
  impermanence: { x: 520, y: 960, r: 20, scope: 'foundation' },

  // Small Scope — y: 810
  lowerRealms: { x: 130, y: 810, r: 18, scope: 'small' },
  refuge: { x: 280, y: 810, r: 18, scope: 'small' },
  karma: { x: 420, y: 810, r: 18, scope: 'small' },
  dependentOrigination: { x: 570, y: 810, r: 18, scope: 'small' },

  // Middle Scope — y: 660
  renunciation: { x: 270, y: 660, r: 22, scope: 'middle' },
  shamatha: { x: 430, y: 660, r: 22, scope: 'middle' },

  // Great Scope — Method — y: 510
  tonglen: { x: 180, y: 510, r: 20, scope: 'great-method' },
  bodhicitta: { x: 350, y: 510, r: 24, scope: 'great-method' },
  sixPerfections: { x: 520, y: 510, r: 20, scope: 'great-method' },

  // Great Scope — Wisdom — y: 370
  emptiness: { x: 350, y: 370, r: 24, scope: 'great-wisdom' },
  vipashyana: { x: 530, y: 370, r: 22, scope: 'great-wisdom' },

  // Mahamudra — y: 240
  pointingOut: { x: 270, y: 240, r: 20, scope: 'mahamudra' },
  fourYogas: { x: 430, y: 240, r: 24, scope: 'mahamudra' },

  // Enlightenment (summit) — y: 100
  enlightenment: { x: 350, y: 100, r: 34, scope: 'enlightenment' },
}

// ─────────────────────────────────────────────
// EDGES — directed relationships
// ─────────────────────────────────────────────

const edges: [PathNodeId, PathNodeId][] = [
  ['spiritualGuide', 'preciousHuman'],
  ['preciousHuman', 'impermanence'],
  ['impermanence', 'lowerRealms'],
  ['lowerRealms', 'refuge'],
  ['refuge', 'karma'],
  ['karma', 'dependentOrigination'],
  ['karma', 'renunciation'],
  ['renunciation', 'shamatha'],
  ['renunciation', 'bodhicitta'],
  ['bodhicitta', 'tonglen'],
  ['bodhicitta', 'sixPerfections'],
  ['bodhicitta', 'emptiness'],
  ['shamatha', 'vipashyana'],
  ['vipashyana', 'emptiness'],
  ['vipashyana', 'pointingOut'],
  ['emptiness', 'pointingOut'],
  ['pointingOut', 'fourYogas'],
  ['fourYogas', 'enlightenment'],
  ['emptiness', 'enlightenment'],
  ['sixPerfections', 'enlightenment'],
]

// ─────────────────────────────────────────────
// SCOPE BANDS — subtle horizontal regions
// ─────────────────────────────────────────────

const scopeBands = [
  { label: 'FOUNDATION', y: 910, h: 110, opacity: 0.02 },
  { label: 'SMALL SCOPE', y: 760, h: 110, opacity: 0.025 },
  { label: 'MIDDLE SCOPE', y: 610, h: 110, opacity: 0.03 },
  { label: 'GREAT SCOPE', y: 440, h: 140, opacity: 0.035 },
  { label: 'WISDOM', y: 320, h: 110, opacity: 0.04 },
  { label: 'MAHĀMUDRĀ', y: 195, h: 100, opacity: 0.045 },
  { label: 'AWAKENING', y: 55, h: 100, opacity: 0.05 },
]

// Three Principal Aspects — the golden spine
const spineNodes: PathNodeId[] = ['renunciation', 'bodhicitta', 'emptiness', 'enlightenment']

// Mahamudra path — the meditation path from Brown's framework
const mahamudraNodes: PathNodeId[] = ['shamatha', 'vipashyana', 'pointingOut', 'fourYogas']

// ─────────────────────────────────────────────
// SVG COMPONENTS
// ─────────────────────────────────────────────

/** Dharma wheel node with internal spokes — from the Jewel */
function DharmaNode({
  cx,
  cy,
  r,
  selected,
  isSpine,
  isEnlightenment,
}: {
  cx: number
  cy: number
  r: number
  selected: boolean
  isSpine: boolean
  isEnlightenment: boolean
}) {
  const spokeCount = isEnlightenment ? 12 : 8
  const hubR = r * 0.28
  const spokeEnd = r * 0.82

  return (
    <g>
      {/* Glow for selected */}
      {selected && (
        <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={GOLD} strokeWidth={0.5} opacity={0.3} />
      )}

      {/* Outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={selected ? GOLD_FAINT : '#FFFFFF'}
        stroke={GOLD}
        strokeWidth={selected ? 2 : isSpine ? 1.5 : 1}
        opacity={selected ? 1 : isSpine ? 1 : 0.7}
      />

      {/* Inner hub */}
      <circle
        cx={cx}
        cy={cy}
        r={hubR}
        fill="none"
        stroke={GOLD}
        strokeWidth={selected ? 1 : 0.6}
        opacity={selected ? 0.8 : 0.4}
      />

      {/* Spokes */}
      {Array.from({ length: spokeCount }).map((_, i) => {
        const angle = (i * 360) / spokeCount
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={i}
            x1={cx + hubR * Math.cos(rad)}
            y1={cy + hubR * Math.sin(rad)}
            x2={cx + spokeEnd * Math.cos(rad)}
            y2={cy + spokeEnd * Math.sin(rad)}
            stroke={GOLD}
            strokeWidth={selected ? 0.8 : 0.4}
            opacity={selected ? 0.7 : 0.3}
          />
        )
      })}

      {/* Enlightenment — inner lotus pattern */}
      {isEnlightenment && (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const px = cx + r * 0.5 * Math.cos(rad)
            const py = cy + r * 0.5 * Math.sin(rad)
            return (
              <circle
                key={angle}
                cx={px}
                cy={py}
                r={3}
                fill="none"
                stroke={GOLD}
                strokeWidth={0.5}
                opacity={selected ? 0.5 : 0.2}
              />
            )
          })}
        </>
      )}
    </g>
  )
}

/** Curved edge path with gentle bezier */
function edgePath(from: NodeMeta, to: NodeMeta): string {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy) || 1

  // Shorten to stop at node edges
  const startX = from.x + (dx / len) * from.r
  const startY = from.y + (dy / len) * from.r
  const endX = to.x - (dx / len) * to.r
  const endY = to.y - (dy / len) * to.r

  // Control point offset for curve
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2
  const curvature = 0.12
  const cx = midX + (-dy / len) * len * curvature
  const cy = midY + (dx / len) * len * curvature

  return `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`
}

/** Short label for compact SVG display */
function shortLabel(id: NodeId): string {
  const map: Partial<Record<NodeId, string>> = {
    preciousHuman: 'Precious Human',
    spiritualGuide: 'Spiritual Guide',
    dependentOrigination: 'Dependent Orig.',
    sixPerfections: 'Six Perfections',
    lowerRealms: 'Lower Realms',
    pointingOut: 'Pointing Out',
    fourYogas: 'Four Yogas',
  }
  return map[id] ?? nodeData[id]?.title ?? id
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function PathPage() {
  const [selectedNode, setSelectedNode] = useState<PathNodeId | null>(null)
  const [activeLens, setActiveLens] = useState<LensKey | null>(null)

  const selected = selectedNode ? nodeData[selectedNode] : null

  const connectedNodes = selectedNode
    ? edges
        .filter(([a, b]) => a === selectedNode || b === selectedNode)
        .map(([a, b]) => (a === selectedNode ? b : a))
    : []

  return (
    <div className="min-h-screen bg-bodhi-bg-primary">

      {/* ═══════ HEADER ═══════ */}
      <div className="px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-4">
        <div className="flex items-center justify-between max-w-[1100px]">
          <div>
            <p className="bodhi-label mb-2">THE PATH</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary">
              The Graduated Path
            </h1>
            <p className="font-sans text-sm text-bodhi-text-tertiary mt-1">
              Lamrim + Mahamudra &middot; 17 concepts &middot; 7 scopes
            </p>
          </div>

          {/* Scope legend — desktop */}
          <div className="hidden md:flex items-center gap-5">
            {scopeBands.map((band) => (
              <div key={band.label} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: GOLD, opacity: band.opacity * 10 }}
                />
                <span className="font-sans text-[9px] tracking-[0.12em] uppercase text-bodhi-text-tertiary">
                  {band.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ MAIN: Graph + Detail ═══════ */}
      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 pb-16 gap-0 max-w-[1200px]">

        {/* ──── GRAPH ──── */}
        <div className="flex-1 min-w-0">
          <div className="w-full overflow-x-auto overflow-y-visible">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full max-w-[700px] mx-auto block"
              style={{ minWidth: 480, touchAction: 'pan-y' }}
            >
              <defs>
                {/* Gold gradient for the spine edges */}
                <linearGradient id="spineGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.1} />
                  <stop offset="50%" stopColor={GOLD} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0.5} />
                </linearGradient>

                {/* Glow filter */}
                <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                  <feFlood floodColor={GOLD} floodOpacity="0.2" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="shadow" />
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Scope bands ── */}
              {scopeBands.map((band) => (
                <g key={band.label}>
                  <rect
                    x={60}
                    y={band.y}
                    width={W - 80}
                    height={band.h}
                    rx={20}
                    fill={GOLD}
                    opacity={band.opacity}
                  />
                  <text
                    x={75}
                    y={band.y + 18}
                    fontSize={8.5}
                    letterSpacing="0.18em"
                    fill="#9B9B9B"
                    fontFamily="system-ui, sans-serif"
                    opacity={0.7}
                  >
                    {band.label}
                  </text>
                </g>
              ))}

              {/* ── Three Principal Aspects spine (dashed) ── */}
              <path
                d={`M 350 ${nodes.renunciation.y - nodes.renunciation.r} L 350 ${nodes.enlightenment.y + nodes.enlightenment.r}`}
                stroke="url(#spineGrad)"
                strokeWidth={2}
                strokeDasharray="6 4"
                fill="none"
              />

              {/* ── Mahamudra path (dotted, right side) ── */}
              <path
                d={`M ${nodes.shamatha.x} ${nodes.shamatha.y - nodes.shamatha.r}
                    Q ${nodes.vipashyana.x + 30} ${(nodes.shamatha.y + nodes.vipashyana.y) / 2} ${nodes.vipashyana.x} ${nodes.vipashyana.y + nodes.vipashyana.r}
                    M ${nodes.vipashyana.x} ${nodes.vipashyana.y - nodes.vipashyana.r}
                    Q ${nodes.fourYogas.x + 30} ${(nodes.vipashyana.y + nodes.fourYogas.y) / 2} ${nodes.fourYogas.x} ${nodes.fourYogas.y + nodes.fourYogas.r}`}
                stroke={GOLD}
                strokeWidth={1.2}
                strokeDasharray="3 5"
                fill="none"
                opacity={0.2}
              />

              {/* ── Edges ── */}
              {edges.map(([fromId, toId]) => {
                const from = nodes[fromId]
                const to = nodes[toId]
                const isSpineEdge =
                  spineNodes.includes(fromId) && spineNodes.includes(toId)
                const isMahamudraEdge =
                  mahamudraNodes.includes(fromId) && mahamudraNodes.includes(toId)
                const isHighlighted =
                  selectedNode === fromId || selectedNode === toId

                return (
                  <path
                    key={`${fromId}-${toId}`}
                    d={edgePath(from, to)}
                    stroke={
                      isHighlighted
                        ? GOLD_STRONG
                        : (isSpineEdge || isMahamudraEdge)
                          ? GOLD_MID
                          : GOLD_SUBTLE
                    }
                    strokeWidth={isHighlighted ? 2 : (isSpineEdge || isMahamudraEdge) ? 1.5 : 0.8}
                    fill="none"
                    className="transition-all duration-500"
                  />
                )
              })}

              {/* ── Nodes ── */}
              {(Object.keys(nodes) as PathNodeId[]).map((id) => {
                const n = nodes[id]
                const isSelected = selectedNode === id
                const isSpine = spineNodes.includes(id)
                const isMahamudra = mahamudraNodes.includes(id)
                const isEnlightenment = id === 'enlightenment'

                return (
                  <g
                    key={id}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedNode(isSelected ? null : id)
                      setActiveLens(null)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedNode(isSelected ? null : id)
                        setActiveLens(null)
                      }
                    }}
                    aria-label={nodeData[id]?.title}
                  >
                    {/* Larger tap target */}
                    <circle cx={n.x} cy={n.y} r={n.r + 14} fill="transparent" />

                    <DharmaNode
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      selected={isSelected}
                      isSpine={isSpine || isMahamudra}
                      isEnlightenment={isEnlightenment}
                    />

                    {/* Label */}
                    <text
                      x={n.x}
                      y={n.y + n.r + 16}
                      textAnchor="middle"
                      fontSize={isEnlightenment ? 12 : 10.5}
                      fontWeight={isSelected ? 500 : (isSpine || isMahamudra) ? 500 : 400}
                      fill={isSelected ? GOLD : (isSpine || isMahamudra) ? '#555' : '#888'}
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="0.02em"
                      className="select-none pointer-events-none transition-all duration-300"
                    >
                      {shortLabel(id)}
                    </text>
                  </g>
                )
              })}

              {/* ── "Three Principal Aspects" annotation ── */}
              <text
                x={40}
                y={380}
                fontSize={7.5}
                letterSpacing="0.18em"
                fill={GOLD}
                fontFamily="system-ui, sans-serif"
                opacity={0.5}
                transform="rotate(-90, 40, 380)"
                textAnchor="middle"
              >
                THREE PRINCIPAL ASPECTS
              </text>

              {/* ── "Mahamudra Path" annotation ── */}
              <text
                x={660}
                y={380}
                fontSize={7.5}
                letterSpacing="0.18em"
                fill={GOLD}
                fontFamily="system-ui, sans-serif"
                opacity={0.4}
                transform="rotate(-90, 660, 380)"
                textAnchor="middle"
              >
                MAHĀMUDRĀ PATH
              </text>
            </svg>
          </div>
        </div>

        {/* ──── DETAIL PANEL — Desktop ──── */}
        <div
          className={`
            hidden lg:block w-[360px] flex-shrink-0 transition-all duration-500
            ${selectedNode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'}
          `}
        >
          {selected && selectedNode && (
            <div className="sticky top-8 bg-white rounded-card border border-bodhi-border max-h-[calc(100vh-80px)] overflow-y-auto">

              {/* Top gold accent bar */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-bodhi-saffron to-transparent" />

              <div className="p-8">
                {/* Close */}
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full text-bodhi-text-faint hover:text-bodhi-text-primary transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Scope pill */}
                <span className={`inline-block mb-3 scope-pill-${
                  nodes[selectedNode].scope === 'great-method' || nodes[selectedNode].scope === 'great-wisdom' || nodes[selectedNode].scope === 'mahamudra'
                    ? 'great'
                    : nodes[selectedNode].scope === 'enlightenment'
                      ? 'great'
                      : nodes[selectedNode].scope
                }`}>
                  {nodes[selectedNode].scope === 'foundation' && 'Foundation'}
                  {nodes[selectedNode].scope === 'small' && 'Small Scope'}
                  {nodes[selectedNode].scope === 'middle' && 'Middle Scope'}
                  {nodes[selectedNode].scope === 'great-method' && 'Great Scope'}
                  {nodes[selectedNode].scope === 'great-wisdom' && 'Wisdom'}
                  {nodes[selectedNode].scope === 'mahamudra' && 'Mahāmudrā'}
                  {nodes[selectedNode].scope === 'enlightenment' && 'Awakening'}
                </span>

                {/* Title */}
                <h2 className="font-serif text-2xl text-bodhi-text-primary leading-tight pr-6">
                  {selected.title}
                </h2>

                {/* Tibetan */}
                <p className="font-tibetan text-sm text-bodhi-text-tertiary mt-1">
                  {selected.tibetan}
                </p>

                {/* Subtitle */}
                <p className="font-sans text-xs tracking-[0.08em] text-bodhi-gold mt-1">
                  {selected.subtitle}
                </p>

                {/* Gold accent */}
                <div className="w-10 h-[1.5px] bg-bodhi-saffron mt-6 mb-6" />

                {/* DEFINITION */}
                <p className="bodhi-label mb-2 text-[10px]">DEFINITION</p>
                <p className="font-sans text-[14px] text-bodhi-text-secondary leading-relaxed mb-8">
                  {selected.description}
                </p>

                {/* LENSES */}
                <p className="bodhi-label mb-3 text-[10px]">LENSES</p>
                <div className="space-y-3 mb-8">
                  {(['physics', 'cogsci', 'ai'] as LensKey[]).map((key) => {
                    const isActive = activeLens === key
                    const labels: Record<LensKey, string> = {
                      physics: 'PHYSICS',
                      cogsci: 'COGNITIVE SCIENCE',
                      ai: 'AI',
                    }
                    return (
                      <div key={key}>
                        <button
                          onClick={() => setActiveLens(isActive ? null : key)}
                          className="flex items-center gap-2 group"
                        >
                          <span
                            className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-all"
                            style={{
                              background: isActive ? GOLD : 'transparent',
                              border: isActive ? 'none' : '1px solid #ddd',
                            }}
                          />
                          <span className={`font-sans text-[10px] tracking-[0.08em] uppercase transition-all ${
                            isActive ? 'text-bodhi-text-primary font-medium' : 'text-bodhi-text-tertiary group-hover:text-bodhi-text-secondary'
                          }`}>
                            {labels[key]}
                          </span>
                        </button>
                        {isActive && (
                          <p className="font-sans text-[13px] text-bodhi-text-secondary leading-relaxed mt-1.5 pl-[13px] animate-fade-in">
                            {selected[key]}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* CONNECTIONS */}
                {connectedNodes.length > 0 && (
                  <>
                    <p className="bodhi-label mb-3 text-[10px]">CONNECTIONS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {connectedNodes.map((otherId) => (
                        <button
                          key={otherId}
                          onClick={() => {
                            setSelectedNode(otherId)
                            setActiveLens(null)
                          }}
                          className="font-sans text-[11px] px-3 py-1.5 rounded-full border border-bodhi-border hover:border-bodhi-saffron text-bodhi-text-secondary hover:text-bodhi-saffron transition-all"
                        >
                          {nodeData[otherId]?.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!selectedNode && (
            <div className="flex flex-col items-center justify-center h-60 opacity-50">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-3">
                <circle cx="12" cy="12" r="10" stroke={GOLD} strokeWidth="1" />
                <circle cx="12" cy="12" r="3" stroke={GOLD} strokeWidth="0.8" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1="12" y1="12" x2={12 + 10 * Math.cos(a * Math.PI / 180)} y2={12 + 10 * Math.sin(a * Math.PI / 180)} stroke={GOLD} strokeWidth="0.4" />
                ))}
              </svg>
              <p className="font-sans text-xs text-bodhi-text-tertiary">
                Select a concept to explore
              </p>
            </div>
          )}
        </div>

        {/* ──── DETAIL PANEL — Mobile bottom sheet ──── */}
        {selectedNode && selected && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/15" onClick={() => setSelectedNode(null)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[65vh] overflow-y-auto border-t border-bodhi-border shadow-2xl animate-slide-up">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-bodhi-text-faint/40" />
              </div>
              {/* Top accent */}
              <div className="h-[1.5px] mx-8 bg-gradient-to-r from-transparent via-bodhi-saffron to-transparent mb-4" />

              <div className="px-6 pb-8">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-5 w-7 h-7 flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="#9B9B9B" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                <h2 className="font-serif text-2xl text-bodhi-text-primary pr-8">{selected.title}</h2>
                <p className="font-tibetan text-sm text-bodhi-text-tertiary mt-1">{selected.tibetan}</p>
                <p className="font-sans text-xs tracking-[0.08em] text-bodhi-gold mt-1">{selected.subtitle}</p>
                <div className="w-10 h-[1.5px] bg-bodhi-saffron mt-5 mb-5" />

                <p className="bodhi-label mb-2 text-[10px]">DEFINITION</p>
                <p className="font-sans text-[14px] text-bodhi-text-secondary leading-relaxed mb-6">
                  {selected.description}
                </p>

                <p className="bodhi-label mb-3 text-[10px]">LENSES</p>
                <div className="space-y-2.5 mb-6">
                  {(['physics', 'cogsci', 'ai'] as LensKey[]).map((key) => {
                    const isActive = activeLens === key
                    const labels: Record<LensKey, string> = { physics: 'PHYSICS', cogsci: 'COGNITIVE SCIENCE', ai: 'AI' }
                    return (
                      <div key={key}>
                        <button onClick={() => setActiveLens(isActive ? null : key)} className="flex items-center gap-2">
                          <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: isActive ? GOLD : 'transparent', border: isActive ? 'none' : '1px solid #ddd' }} />
                          <span className={`font-sans text-[10px] tracking-[0.08em] uppercase ${isActive ? 'text-bodhi-text-primary font-medium' : 'text-bodhi-text-tertiary'}`}>{labels[key]}</span>
                        </button>
                        {isActive && (
                          <p className="font-sans text-[13px] text-bodhi-text-secondary leading-relaxed mt-1 pl-[13px] animate-fade-in">{selected[key]}</p>
                        )}
                      </div>
                    )
                  })}
                </div>

                {connectedNodes.length > 0 && (
                  <>
                    <p className="bodhi-label mb-3 text-[10px]">CONNECTIONS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {connectedNodes.map((otherId) => (
                        <button key={otherId} onClick={() => { setSelectedNode(otherId); setActiveLens(null) }} className="font-sans text-[11px] px-3 py-1.5 rounded-full border border-bodhi-border text-bodhi-text-secondary hover:text-bodhi-saffron transition-all">
                          {nodeData[otherId]?.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
