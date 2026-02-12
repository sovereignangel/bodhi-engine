'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/daily', label: 'Daily', icon: SunIcon },
  { href: '/path', label: 'Path', icon: PathIcon },
  { href: '/more', label: 'More', icon: MoreIcon },
]

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 8L10 2L17 8V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V8Z"
        stroke={active ? '#B8860B' : '#9B9B9B'}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="4" stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.5" />
      <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M4.93 15.07L6.34 13.66M13.66 6.34L15.07 4.93"
        stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PathIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="2.5" stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.5" />
      <circle cx="5" cy="14" r="2" stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.5" />
      <circle cx="15" cy="14" r="2" stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.5" />
      <path d="M10 6.5V10L5.5 12M10 10L14.5 12" stroke={active ? '#B8860B' : '#9B9B9B'} strokeWidth="1.2" />
    </svg>
  )
}

function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="4" cy="10" r="1.5" fill={active ? '#B8860B' : '#9B9B9B'} />
      <circle cx="10" cy="10" r="1.5" fill={active ? '#B8860B' : '#9B9B9B'} />
      <circle cx="16" cy="10" r="1.5" fill={active ? '#B8860B' : '#9B9B9B'} />
    </svg>
  )
}

const moreItems = [
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/books', label: 'Books' },
  { href: '/practice', label: 'Practice' },
]

export function MobileNav() {
  const pathname = usePathname()
  const [showMore, setShowMore] = useState(false)

  // Hide on preview pages
  if (pathname?.startsWith('/preview')) return null

  const isMoreActive = ['/dictionary', '/books', '/practice'].some(p => pathname?.startsWith(p))

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-[72px] right-4 left-4 bg-white rounded-2xl shadow-lg border border-bodhi-border p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {moreItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMore(false)}
                  className={`
                    block px-4 py-3 rounded-xl font-sans text-sm transition-all
                    ${isActive
                      ? 'text-bodhi-saffron font-medium bg-bodhi-bg-ivory'
                      : 'text-bodhi-text-secondary hover:bg-bodhi-bg-ivory'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-bodhi-border">
        <div className="flex items-center justify-around h-[64px] px-4">
          {navItems.map((item) => {
            const isMore = item.href === '/more'
            const isActive = isMore
              ? isMoreActive
              : (item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href))
            const Icon = item.icon

            if (isMore) {
              return (
                <button
                  key="more"
                  onClick={() => setShowMore(!showMore)}
                  className="flex flex-col items-center gap-1 py-1 min-w-[56px]"
                >
                  <Icon active={!!isActive || showMore} />
                  <span className={`font-sans text-[10px] tracking-wide ${
                    isActive || showMore ? 'text-bodhi-saffron font-medium' : 'text-bodhi-text-tertiary'
                  }`}>
                    {item.label}
                  </span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMore(false)}
                className="flex flex-col items-center gap-1 py-1 min-w-[56px]"
              >
                <Icon active={!!isActive} />
                <span className={`font-sans text-[10px] tracking-wide ${
                  isActive ? 'text-bodhi-saffron font-medium' : 'text-bodhi-text-tertiary'
                }`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Safe area for iPhone */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  )
}
