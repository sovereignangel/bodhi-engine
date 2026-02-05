'use client'

import { useState, useCallback } from 'react'
import { nodeData } from '@/lib/data/nodeData'
import { NodeTooltip } from './NodeTooltip'
import { GraphLegend } from './GraphLegend'
import type { NodeId } from '@/types/node'

interface LamrimKnowledgeGraphProps {
  showLegend?: boolean
  onNodeClick?: (nodeId: NodeId) => void
  engagedNodes?: Set<string>
}

export function LamrimKnowledgeGraph({
  showLegend = true,
  onNodeClick,
  engagedNodes = new Set(),
}: LamrimKnowledgeGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleNodeHover = useCallback(
    (nodeId: NodeId | null, event?: React.MouseEvent) => {
      setHoveredNode(nodeId)
      if (event) {
        setMousePosition({ x: event.clientX, y: event.clientY })
      }
    },
    []
  )

  const handleNodeClick = useCallback(
    (nodeId: NodeId) => {
      onNodeClick?.(nodeId)
    },
    [onNodeClick]
  )

  // Helper to check if node is engaged
  const isEngaged = (nodeId: string) => engagedNodes.has(nodeId)

  return (
    <div className="relative w-full min-h-screen bg-bodhi-gradient font-serif overflow-hidden">
      {/* Background sacred geometry */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern
            id="mandala"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd369" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#ffd369" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#ffd369" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="20" fill="none" stroke="#ffd369" strokeWidth="0.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="100"
                y1="100"
                x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                stroke="#ffd369"
                strokeWidth="0.3"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mandala)" />
      </svg>

      {/* Title */}
      <div className="text-center pt-10 pb-5 relative z-10">
        <h1 className="text-5xl font-light text-bodhi-gold tracking-[8px] uppercase">
          Lamrim
        </h1>
        <p className="text-sm text-gray-500 tracking-[4px] uppercase mt-2">
          The Stages of the Path to Enlightenment
        </p>
        <p className="font-tibetan text-2xl text-bodhi-pink mt-1">
          ལམ་རིམ་ཆེན་མོ།
        </p>
      </div>

      {/* Legend */}
      {showLegend && <GraphLegend />}

      {/* Main SVG Graph */}
      <svg
        viewBox="0 0 1200 1400"
        className="w-full max-w-[1200px] mx-auto block"
        style={{ height: 'auto', minHeight: '800px' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd369" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <linearGradient id="enlightenmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="50%" stopColor="#ffd369" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#e94560" />
            <stop offset="100%" stopColor="#ffd369" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Elephant symbol */}
          <symbol id="elephant" viewBox="0 0 40 30">
            <ellipse cx="20" cy="18" rx="12" ry="8" fill="currentColor" />
            <circle cx="10" cy="12" r="6" fill="currentColor" />
            <path d="M6 14 Q4 20 6 26" stroke="currentColor" strokeWidth="2" fill="none" />
            <ellipse cx="28" cy="22" rx="3" ry="4" fill="currentColor" />
            <ellipse cx="14" cy="22" rx="2" ry="3" fill="currentColor" />
          </symbol>
        </defs>

        {/* Winding path from bottom to top */}
        <path
          d="M 600 1350
             C 400 1300, 300 1200, 350 1100
             C 400 1000, 700 950, 750 850
             C 800 750, 500 700, 450 600
             C 400 500, 600 450, 650 350
             C 700 250, 550 200, 600 100"
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* FOUNDATION LEVEL */}
        <g>
          <text x="600" y="1320" textAnchor="middle" fill="#666" fontSize="14" letterSpacing="4">
            FOUNDATION
          </text>

          {/* Spiritual Guide */}
          <g
            transform="translate(250, 1220)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('spiritualGuide', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('spiritualGuide')}
          >
            <circle r="45" fill="#1a1a2e" stroke={isEngaged('spiritualGuide') ? '#00ff88' : '#ffd369'} strokeWidth="2" />
            <text y="-8" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">SPIRITUAL</text>
            <text y="8" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">GUIDE</text>
            <text y="24" textAnchor="middle" fill="#888" fontSize="9">བླ་མ།</text>
            {isEngaged('spiritualGuide') && <circle r="8" cx="30" cy="-30" fill="#00ff88" />}
          </g>

          {/* Precious Human Life */}
          <g
            transform="translate(480, 1250)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('preciousHuman', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('preciousHuman')}
          >
            <circle r="50" fill="#1a1a2e" stroke={isEngaged('preciousHuman') ? '#00ff88' : '#ffd369'} strokeWidth="2" />
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">PRECIOUS</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">HUMAN LIFE</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="9">མི་ལུས་རིན་པོ་ཆེ།</text>
            {isEngaged('preciousHuman') && <circle r="8" cx="35" cy="-35" fill="#00ff88" />}
          </g>

          {/* Death & Impermanence */}
          <g
            transform="translate(720, 1250)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('impermanence', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('impermanence')}
          >
            <circle r="50" fill="#1a1a2e" stroke={isEngaged('impermanence') ? '#00ff88' : '#ffd369'} strokeWidth="2" />
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">DEATH &</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">IMPERMANENCE</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="9">མི་རྟག་པ།</text>
            {isEngaged('impermanence') && <circle r="8" cx="35" cy="-35" fill="#00ff88" />}
          </g>

          {/* Elephant Stage 1-2 */}
          <use href="#elephant" x="880" y="1220" width="50" height="40" fill="#333" opacity="0.8" />
          <text x="905" y="1275" textAnchor="middle" fill="#555" fontSize="10">Stage 1-2</text>
        </g>

        {/* SMALL SCOPE */}
        <g>
          <text x="600" y="1080" textAnchor="middle" fill="#e94560" fontSize="16" letterSpacing="4" fontWeight="bold">
            SMALL SCOPE
          </text>
          <text x="600" y="1100" textAnchor="middle" fill="#888" fontSize="11">
            Fortunate Rebirth
          </text>

          {/* Lower Realms */}
          <g
            transform="translate(200, 1020)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('lowerRealms', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('lowerRealms')}
          >
            <circle r="40" fill="#2a0a0a" stroke={isEngaged('lowerRealms') ? '#00ff88' : '#ff4444'} strokeWidth="2" />
            <text y="-8" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">LOWER</text>
            <text y="8" textAnchor="middle" fill="#ff6666" fontSize="10" fontWeight="bold">REALMS</text>
            <text y="22" textAnchor="middle" fill="#884444" fontSize="8">ངན་འགྲོ།</text>
            {isEngaged('lowerRealms') && <circle r="8" cx="28" cy="-28" fill="#00ff88" />}
          </g>

          {/* Refuge */}
          <g
            transform="translate(400, 1000)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('refuge', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('refuge')}
          >
            <circle r="45" fill="#1a1a2e" stroke={isEngaged('refuge') ? '#00ff88' : '#00d9ff'} strokeWidth="2" />
            <text y="-8" textAnchor="middle" fill="#00d9ff" fontSize="11" fontWeight="bold">REFUGE</text>
            <text y="8" textAnchor="middle" fill="#00d9ff" fontSize="10">Three Jewels</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">སྐྱབས་འགྲོ།</text>
            {isEngaged('refuge') && <circle r="8" cx="32" cy="-32" fill="#00ff88" />}
          </g>

          {/* Karma */}
          <g
            transform="translate(600, 980)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('karma', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('karma')}
          >
            <circle r="50" fill="#1a1a2e" stroke={isEngaged('karma') ? '#00ff88' : '#00ff88'} strokeWidth="2" filter="url(#glow)" />
            <text y="-8" textAnchor="middle" fill="#00ff88" fontSize="12" fontWeight="bold">KARMA</text>
            <text y="8" textAnchor="middle" fill="#00ff88" fontSize="10">Action & Result</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">ལས།</text>
            {isEngaged('karma') && <circle r="8" cx="35" cy="-35" fill="#00ff88" />}
          </g>

          {/* Dependent Origination */}
          <g
            transform="translate(820, 1020)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('dependentOrigination', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('dependentOrigination')}
          >
            <circle r="45" fill="#1a1a2e" stroke={isEngaged('dependentOrigination') ? '#00ff88' : '#ff6b6b'} strokeWidth="2" />
            <text y="-12" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="bold">DEPENDENT</text>
            <text y="2" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="bold">ORIGINATION</text>
            <text y="16" textAnchor="middle" fill="#888" fontSize="8">རྟེན་འབྲེལ།</text>
            {isEngaged('dependentOrigination') && <circle r="8" cx="32" cy="-32" fill="#00ff88" />}
          </g>

          {/* Elephant Stage 3-4 */}
          <use href="#elephant" x="920" y="970" width="50" height="40" fill="#555" />
          <text x="945" y="1025" textAnchor="middle" fill="#666" fontSize="10">Stage 3-4</text>
        </g>

        {/* MIDDLE SCOPE */}
        <g>
          <text x="600" y="820" textAnchor="middle" fill="#00d9ff" fontSize="16" letterSpacing="4" fontWeight="bold">
            MIDDLE SCOPE
          </text>
          <text x="600" y="840" textAnchor="middle" fill="#888" fontSize="11">
            Liberation from Samsara
          </text>

          {/* Renunciation */}
          <g
            transform="translate(350, 760)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('renunciation', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('renunciation')}
          >
            <circle r="50" fill="#1a1a2e" stroke={isEngaged('renunciation') ? '#00ff88' : '#00d9ff'} strokeWidth="2" filter="url(#glow)" />
            <text y="-8" textAnchor="middle" fill="#00d9ff" fontSize="12" fontWeight="bold">RENUNCIATION</text>
            <text y="8" textAnchor="middle" fill="#00d9ff" fontSize="10">Complete</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="9">ངེས་འབྱུང།</text>
            {isEngaged('renunciation') && <circle r="8" cx="35" cy="-35" fill="#00ff88" />}
          </g>

          {/* Shamatha - 9 Stages */}
          <g
            transform="translate(600, 740)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('shamatha', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('shamatha')}
          >
            <rect x="-80" y="-45" width="160" height="90" rx="10" fill="#1a1a2e" stroke={isEngaged('shamatha') ? '#00ff88' : '#ffd369'} strokeWidth="2" filter="url(#glow)" />
            <text y="-20" textAnchor="middle" fill="#ffd369" fontSize="12" fontWeight="bold">SHAMATHA</text>
            <text y="-4" textAnchor="middle" fill="#ffd369" fontSize="10">9 Elephant Stages</text>
            <text y="12" textAnchor="middle" fill="#888" fontSize="9">ཞི་གནས།</text>
            {/* Mini elephant progression */}
            <g transform="translate(-60, 25)">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <rect
                  key={i}
                  x={i * 14}
                  y="0"
                  width="10"
                  height="10"
                  rx="2"
                  fill={`rgb(${50 + i * 22}, ${50 + i * 22}, ${50 + i * 22})`}
                />
              ))}
            </g>
            {isEngaged('shamatha') && <circle r="8" cx="70" cy="-35" fill="#00ff88" />}
          </g>

          {/* Elephant Stage 5-6 */}
          <use href="#elephant" x="950" y="720" width="50" height="40" fill="#888" />
          <text x="975" y="775" textAnchor="middle" fill="#777" fontSize="10">Stage 5-6</text>
        </g>

        {/* GREAT SCOPE - METHOD */}
        <g>
          <text x="380" y="580" textAnchor="middle" fill="#ff6b6b" fontSize="14" letterSpacing="2" fontWeight="bold">
            METHOD
          </text>
          <text x="380" y="598" textAnchor="middle" fill="#888" fontSize="10">
            Bodhicitta Training
          </text>

          {/* Tonglen */}
          <g
            transform="translate(250, 520)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('tonglen', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('tonglen')}
          >
            <circle r="40" fill="#1a1a2e" stroke={isEngaged('tonglen') ? '#00ff88' : '#ff6b6b'} strokeWidth="2" />
            <text y="-8" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="bold">TONGLEN</text>
            <text y="8" textAnchor="middle" fill="#ff6b6b" fontSize="9">Taking & Giving</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="8">གཏོང་ལེན།</text>
            {isEngaged('tonglen') && <circle r="8" cx="28" cy="-28" fill="#00ff88" />}
          </g>

          {/* Six Perfections */}
          <g
            transform="translate(450, 480)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('sixPerfections', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('sixPerfections')}
          >
            <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" fill="#1a1a2e" stroke={isEngaged('sixPerfections') ? '#00ff88' : '#ffd369'} strokeWidth="2" />
            <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="10" fontWeight="bold">SIX</text>
            <text y="4" textAnchor="middle" fill="#ffd369" fontSize="10" fontWeight="bold">PERFECTIONS</text>
            <text y="20" textAnchor="middle" fill="#888" fontSize="8">ཕ་རོལ་ཏུ་ཕྱིན་པ།</text>
            {isEngaged('sixPerfections') && <circle r="8" cx="35" cy="-40" fill="#00ff88" />}
          </g>

          {/* Bodhicitta */}
          <g
            transform="translate(350, 380)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('bodhicitta', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('bodhicitta')}
          >
            <circle r="55" fill="#1a1a2e" stroke={isEngaged('bodhicitta') ? '#00ff88' : '#e94560'} strokeWidth="3" filter="url(#glow)" />
            <text y="-12" textAnchor="middle" fill="#e94560" fontSize="14" fontWeight="bold">BODHICITTA</text>
            <text y="6" textAnchor="middle" fill="#e94560" fontSize="10">Awakening Mind</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="10">བྱང་ཆུབ་སེམས།</text>
            {isEngaged('bodhicitta') && <circle r="8" cx="40" cy="-40" fill="#00ff88" />}
          </g>
        </g>

        {/* GREAT SCOPE - WISDOM */}
        <g>
          <text x="820" y="580" textAnchor="middle" fill="#00d9ff" fontSize="14" letterSpacing="2" fontWeight="bold">
            WISDOM
          </text>
          <text x="820" y="598" textAnchor="middle" fill="#888" fontSize="10">
            Emptiness Training
          </text>

          {/* Emptiness */}
          <g
            transform="translate(850, 380)"
            className="cursor-pointer transition-all hover:scale-105"
            onMouseEnter={(e) => handleNodeHover('emptiness', e)}
            onMouseLeave={() => handleNodeHover(null)}
            onClick={() => handleNodeClick('emptiness')}
          >
            <circle r="55" fill="#1a1a2e" stroke={isEngaged('emptiness') ? '#00ff88' : '#00d9ff'} strokeWidth="3" filter="url(#glow)" />
            <text y="-12" textAnchor="middle" fill="#00d9ff" fontSize="14" fontWeight="bold">EMPTINESS</text>
            <text y="6" textAnchor="middle" fill="#00d9ff" fontSize="10">Sunyata</text>
            <text y="22" textAnchor="middle" fill="#888" fontSize="10">སྟོང་པ་ཉིད།</text>
            {isEngaged('emptiness') && <circle r="8" cx="40" cy="-40" fill="#00ff88" />}
          </g>

          {/* Elephant Stage 7-8 */}
          <use href="#elephant" x="950" y="480" width="50" height="40" fill="#ccc" />
          <text x="975" y="535" textAnchor="middle" fill="#999" fontSize="10">Stage 7-8</text>
        </g>

        {/* GREAT SCOPE LABEL */}
        <text x="600" y="620" textAnchor="middle" fill="#ffd369" fontSize="18" letterSpacing="4" fontWeight="bold">
          GREAT SCOPE
        </text>
        <text x="600" y="642" textAnchor="middle" fill="#888" fontSize="12">
          Bodhisattva Path
        </text>

        {/* ENLIGHTENMENT */}
        <g
          transform="translate(600, 120)"
          className="cursor-pointer transition-all hover:scale-105"
          onMouseEnter={(e) => handleNodeHover('enlightenment', e)}
          onMouseLeave={() => handleNodeHover(null)}
          onClick={() => handleNodeClick('enlightenment')}
        >
          {/* Radiating rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1={Math.cos((angle * Math.PI) / 180) * 70}
              y1={Math.sin((angle * Math.PI) / 180) * 70}
              x2={Math.cos((angle * Math.PI) / 180) * 100}
              y2={Math.sin((angle * Math.PI) / 180) * 100}
              stroke="#ffd369"
              strokeWidth="2"
              opacity="0.6"
            />
          ))}
          <circle r="65" fill="url(#enlightenmentGrad)" filter="url(#strongGlow)" />
          <circle r="55" fill="#1a1a2e" />
          <text y="-12" textAnchor="middle" fill="#ffd369" fontSize="16" fontWeight="bold">ENLIGHTENMENT</text>
          <text y="8" textAnchor="middle" fill="#ffd369" fontSize="11">Buddhahood</text>
          <text y="26" textAnchor="middle" fill="#c9a227" fontSize="12">སངས་རྒྱས།</text>
          {isEngaged('enlightenment') && <circle r="10" cx="45" cy="-45" fill="#00ff88" />}
        </g>

        {/* Stage 9 - White Elephant at top */}
        <g transform="translate(750, 180)">
          <use href="#elephant" width="60" height="45" fill="#fff" filter="url(#glow)" />
          <text x="30" y="55" textAnchor="middle" fill="#ffd369" fontSize="11" fontWeight="bold">Stage 9</text>
          <text x="30" y="68" textAnchor="middle" fill="#888" fontSize="9">Perfect Calm</text>
        </g>

        {/* Rainbow path to enlightenment */}
        <path
          d="M 780 200 Q 700 150, 665 120"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="4"
          strokeDasharray="8,4"
          opacity="0.8"
        />

        {/* Connecting lines */}
        <g stroke="#333" strokeWidth="1" opacity="0.5">
          {/* Foundation to Small Scope */}
          <line x1="480" y1="1200" x2="400" y2="1045" />
          <line x1="720" y1="1200" x2="600" y2="1030" />
          <line x1="480" y1="1200" x2="600" y2="1030" />

          {/* Small to Middle */}
          <line x1="600" y1="930" x2="350" y2="810" />
          <line x1="600" y1="930" x2="600" y2="785" />
          <line x1="600" y1="930" x2="850" y2="805" />

          {/* Middle to Great */}
          <line x1="350" y1="710" x2="350" y2="435" />
          <line x1="600" y1="695" x2="450" y2="530" />
          <line x1="600" y1="695" x2="750" y2="535" />
          <line x1="850" y1="715" x2="850" y2="435" />

          {/* Great Scope to Enlightenment */}
          <line x1="350" y1="325" x2="545" y2="150" />
          <line x1="850" y1="325" x2="655" y2="150" />
        </g>
      </svg>

      {/* Tooltip */}
      <NodeTooltip nodeId={hoveredNode} position={mousePosition} />

      {/* Footer */}
      <div className="text-center py-10 text-gray-600 text-xs">
        <p>Based on Atisha&apos;s Lamp for the Path (11th century) and Tsongkhapa&apos;s Lamrim Chenmo</p>
        <p className="mt-2 text-gray-700">
          Interactive knowledge graph &bull; Hover over nodes for modern scientific bridges
        </p>
      </div>
    </div>
  )
}
