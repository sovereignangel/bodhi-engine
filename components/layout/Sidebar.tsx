'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const VajraIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L8 8L12 6L16 8L12 2Z" fill="#B8860B" />
    <path d="M12 32L8 26L12 28L16 26L12 32Z" fill="#B8860B" />
    <rect x="11" y="8" width="2" height="18" rx="1" fill="#B8860B" />
    <ellipse cx="12" cy="17" rx="4" ry="1.5" stroke="#B8860B" strokeWidth="1.2" fill="none" />
    <circle cx="12" cy="17" r="2.5" fill="#B8860B" opacity="0.15" stroke="#B8860B" strokeWidth="1" />
  </svg>
)

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/daily', label: 'Daily' },
  { href: '/path', label: 'The Path' },
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/books', label: 'Books' },
  { href: '/practice', label: 'Practice' },
]

export function Sidebar() {
  const pathname = usePathname()

  // Hide sidebar on preview pages
  if (pathname?.startsWith('/preview')) return null

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[240px] bg-bodhi-bg-warm flex-col z-50">
      {/* Brand */}
      <div className="pt-10 px-8">
        <Link href="/" className="flex flex-col items-start gap-2">
          <VajraIcon size={22} />
          <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bodhi-saffron">
            Bodhi Engine
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-14 px-6 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname?.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    font-sans text-[13px] tracking-[0.04em]
                    transition-all duration-200
                    ${isActive
                      ? 'text-bodhi-text-primary font-medium'
                      : 'text-bodhi-text-tertiary hover:text-bodhi-text-secondary hover:bg-white/50'
                    }
                  `}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-bodhi-saffron flex-shrink-0" />
                  )}
                  {!isActive && (
                    <span className="w-1.5 h-1.5 flex-shrink-0" />
                  )}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom progress */}
      <div className="px-8 pb-8">
        <p className="font-sans text-[11px] text-bodhi-text-tertiary mb-2">
          Day 1 of 21
        </p>
        <div className="w-full h-[2px] bg-bodhi-text-faint/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-bodhi-saffron rounded-full transition-all duration-500"
            style={{ width: '5%' }}
          />
        </div>
      </div>
    </aside>
  )
}
