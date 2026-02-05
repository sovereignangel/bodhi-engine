'use client'

import { nodeData } from '@/lib/data/nodeData'
import type { NodeId, LensType } from '@/types/node'

interface NodeTooltipProps {
  nodeId: NodeId | null
  position: { x: number; y: number }
}

const lensIcons: Record<LensType, { icon: string; color: string; label: string }> = {
  physics: { icon: '⚛', color: '#00d9ff', label: 'Physics' },
  cogsci: { icon: '🧠', color: '#00ff88', label: 'CogSci' },
  ai: { icon: '🤖', color: '#ff6b6b', label: 'AI' },
}

export function NodeTooltip({ nodeId, position }: NodeTooltipProps) {
  if (!nodeId || !nodeData[nodeId]) return null

  const data = nodeData[nodeId]

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: Math.min(position.x + 20, typeof window !== 'undefined' ? window.innerWidth - 340 : position.x),
        top: Math.max(position.y - 100, 10),
      }}
    >
      <div className="bg-gradient-to-br from-bodhi-bg-mid to-bodhi-bg-light border border-bodhi-pink rounded-xl p-4 max-w-[320px] shadow-2xl shadow-bodhi-pink/30 backdrop-blur-sm">
        {/* Tibetan title */}
        <div className="font-tibetan text-lg text-bodhi-gold mb-1">
          {data.tibetan}
        </div>

        {/* English title */}
        <div className="text-base font-bold text-white mb-1">
          {data.title}
        </div>

        {/* Subtitle */}
        <div className="text-[11px] text-bodhi-pink uppercase tracking-wider mb-3">
          {data.subtitle}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-300 leading-relaxed mb-4">
          {data.description}
        </div>

        {/* Scientific lenses */}
        <div className="border-t border-gray-700 pt-3 space-y-2">
          {(Object.keys(lensIcons) as LensType[]).map((lens) => (
            <div key={lens} className="text-xs">
              <span style={{ color: lensIcons[lens].color }} className="font-bold">
                {lensIcons[lens].icon} {lensIcons[lens].label}:
              </span>
              <span className="text-gray-400 ml-1">{data[lens]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
