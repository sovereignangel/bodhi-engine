'use client'

import Link from 'next/link'

const directions = [
  {
    id: 'sutra',
    name: 'The Sutra',
    subtitle: 'Editorial Luxury',
    description: 'Single-column reading experience. Pure text navigation. Literary, intellectual, restrained.',
    accent: '#C9A227',
  },
  {
    id: 'temple',
    name: 'The Temple',
    subtitle: 'Sacred Minimalism',
    description: 'Floating gold-bordered cards on white. Centered vajra navigation. Spacious, reverent, still.',
    accent: '#D4AF37',
  },
  {
    id: 'scroll',
    name: 'The Scroll',
    subtitle: 'Contemplative Journey',
    description: 'Full-width scrolling sections. Parallax gold symbols. Mandala concept map. Flowing, meditative.',
    accent: '#A37E2C',
  },
  {
    id: 'jewel',
    name: 'The Jewel',
    subtitle: 'Precision Craft',
    description: 'Asymmetric sidebar layout. Luxury watch typography. Scholarly reference feel. Authoritative, crafted.',
    accent: '#B8860B',
  },
]

export default function PreviewIndex() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FEFCF7',
      color: '#1a1a1a',
      fontFamily: 'var(--font-cormorant), Georgia, serif',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: 8,
          color: '#1a1a1a',
        }}>
          Bodhi Engine
        </h1>
        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#9B9B9B',
          marginBottom: 64,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 400,
        }}>
          Choose a design direction
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {directions.map((d) => (
            <Link
              key={d.id}
              href={`/preview/${d.id}`}
              style={{
                display: 'block',
                padding: '32px 36px',
                border: `1px solid rgba(201,162,39,0.15)`,
                borderRadius: 16,
                textDecoration: 'none',
                color: '#1a1a1a',
                transition: 'all 0.3s ease',
                background: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = d.accent
                e.currentTarget.style.boxShadow = `0 4px 24px rgba(201,162,39,0.1)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,162,39,0.15)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                <span style={{
                  fontSize: 28,
                  fontWeight: 600,
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                }}>
                  {d.name}
                </span>
                <span style={{
                  fontSize: 13,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: d.accent,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 500,
                }}>
                  {d.subtitle}
                </span>
              </div>
              <p style={{
                fontSize: 16,
                color: '#6B6B6B',
                lineHeight: 1.6,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                margin: 0,
              }}>
                {d.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
