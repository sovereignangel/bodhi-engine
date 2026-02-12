import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bodhi: {
          gold: '#A37E2C',
          'gold-light': '#C9A227',
          'gold-dark': '#8B6914',
          saffron: '#B8860B',
          bg: {
            primary: '#FAFAFA',
            warm: '#F5F2ED',
            ivory: '#FEFCF7',
            card: '#FFFFFF',
          },
          text: {
            primary: '#1A1A1A',
            secondary: '#555555',
            tertiary: '#9B9B9B',
            faint: '#C5C5C5',
          },
          border: {
            DEFAULT: 'rgba(163,126,44,0.12)',
            hover: 'rgba(163,126,44,0.25)',
            strong: 'rgba(163,126,44,0.40)',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        tibetan: ['var(--font-tibetan)', 'serif'],
      },
      borderRadius: {
        card: '16px',
      },
      spacing: {
        section: '120px',
        'section-sm': '80px',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gold-shimmer': 'goldShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
