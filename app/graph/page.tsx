'use client'

import { useCallback, useEffect, useState } from 'react'
import { LamrimKnowledgeGraph } from '@/components/graph'
import { useProgress } from '@/lib/hooks/useProgress'
import type { NodeId } from '@/types/node'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GraphPage() {
  const { progress, recordConceptView } = useProgress()
  const [engagedNodes, setEngagedNodes] = useState<Set<string>>(new Set())

  // Update engaged nodes when progress changes
  useEffect(() => {
    if (progress?.conceptEngagement) {
      setEngagedNodes(new Set(Object.keys(progress.conceptEngagement)))
    }
  }, [progress])

  const handleNodeClick = useCallback(
    (nodeId: NodeId) => {
      recordConceptView(nodeId)
      // Could open a modal or navigate to concept detail page
      console.log('Node clicked:', nodeId)
    },
    [recordConceptView]
  )

  return (
    <main className="min-h-screen bg-bodhi-bg-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-bodhi-bg-dark/80 backdrop-blur-md border-b border-bodhi-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-bodhi-gold hover:text-bodhi-gold/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-bodhi-gold">Lamrim Knowledge Graph</h1>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Concepts Explored</div>
            <div className="text-sm font-semibold text-bodhi-green">
              {engagedNodes.size} / 14
            </div>
          </div>
        </div>
      </header>

      {/* Graph */}
      <div className="pt-16">
        <LamrimKnowledgeGraph
          onNodeClick={handleNodeClick}
          engagedNodes={engagedNodes}
          showLegend={true}
        />
      </div>
    </main>
  )
}
