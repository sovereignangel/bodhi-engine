'use client'

import Link from 'next/link'
import { Flame, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  currentStreak?: number
}

export function Header({ currentStreak = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/daily', label: 'Daily Teaching' },
    { href: '/graph', label: 'Knowledge Graph' },
    { href: '/progress', label: 'Shamatha' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-bodhi-bg-dark/80 backdrop-blur-md border-b border-bodhi-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bodhi-gold to-bodhi-gold-dark flex items-center justify-center">
              <span className="font-tibetan text-bodhi-bg-dark text-lg font-bold">བྱ</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-bodhi-gold">Bodhi Engine</div>
              <div className="text-xs text-gray-500 font-tibetan">བྱང་ཆུབ་འཕྲུལ་འཁོར།</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-bodhi-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Streak badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bodhi-bg-mid border border-bodhi-gold/20">
              <Flame className="w-4 h-4 text-bodhi-gold" />
              <span className="text-sm font-semibold text-white">{currentStreak}</span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-gray-400 hover:text-bodhi-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
