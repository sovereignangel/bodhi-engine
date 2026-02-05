'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Map, Compass } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/daily', icon: BookOpen, label: 'Daily' },
  { href: '/graph', icon: Map, label: 'Graph' },
  { href: '/progress', icon: Compass, label: 'Progress' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bodhi-bg-mid/95 backdrop-blur-md border-t border-bodhi-gold/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                isActive ? 'text-bodhi-gold' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-bodhi-gold' : ''}`} />
              <span className="text-xs mt-1">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-0.5 bg-bodhi-gold rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
