'use client'

import { useState } from 'react'

type Category = 'all' | 'lamrim' | 'mahamudra' | 'sutra' | 'tantra' | 'commentary'

interface Book {
  id: number
  title: string
  author: string
  category: Exclude<Category, 'all'>
  description: string
  annotations: number
  readers: number
}

const books: Book[] = [
  {
    id: 1,
    title: 'Lamrim Chenmo',
    author: 'Je Tsongkhapa',
    category: 'lamrim',
    description:
      'The Great Treatise on the Stages of the Path — comprehensive guide from relying on a spiritual guide to achieving enlightenment',
    annotations: 12,
    readers: 47,
  },
  {
    id: 2,
    title: 'Liberation in the Palm of Your Hand',
    author: 'Pabongka Rinpoche',
    category: 'lamrim',
    description:
      'A classic commentary on the stages of the path, based on oral teachings given over 24 days',
    annotations: 8,
    readers: 31,
  },
  {
    id: 3,
    title: 'Heart Sutra',
    author: 'Prajnaparamita Hridaya',
    category: 'sutra',
    description:
      'The essence of the Perfection of Wisdom teachings on emptiness',
    annotations: 15,
    readers: 62,
  },
  {
    id: 4,
    title: "Guide to the Bodhisattva's Way of Life",
    author: 'Shantideva',
    category: 'commentary',
    description:
      'The beloved guide to developing bodhicitta and the six perfections',
    annotations: 22,
    readers: 55,
  },
  {
    id: 5,
    title: 'Jewel Ornament of Liberation',
    author: 'Gampopa',
    category: 'lamrim',
    description:
      "The Kagyu tradition's presentation of the graduated path to enlightenment",
    annotations: 6,
    readers: 19,
  },
  {
    id: 6,
    title: 'Clear Light of Bliss',
    author: 'Geshe Kelsang Gyatso',
    category: 'tantra',
    description:
      'Introduction to Mahamudra practice in the Gelug tradition',
    annotations: 4,
    readers: 14,
  },
  {
    id: 7,
    title: 'Madhyamakavatara',
    author: 'Chandrakirti',
    category: 'commentary',
    description:
      'Supplement to the Middle Way — foundational Madhyamaka text on emptiness',
    annotations: 10,
    readers: 28,
  },
  {
    id: 8,
    title: 'Uttaratantra',
    author: 'Maitreya/Asanga',
    category: 'sutra',
    description:
      'The sublime continuum — on Buddha-nature and the potential for enlightenment',
    annotations: 7,
    readers: 23,
  },
  {
    id: 9,
    title: 'Pointing Out the Great Way',
    author: 'Daniel P. Brown',
    category: 'mahamudra',
    description:
      'The stages of meditation in the Mahamudra tradition — from preliminary practices through the Four Yogas of realization. A comprehensive map integrating Tibetan source texts with Western psychology.',
    annotations: 18,
    readers: 36,
  },
  {
    id: 10,
    title: 'Moonbeams of Mahamudra',
    author: 'Dakpo Tashi Namgyal',
    category: 'mahamudra',
    description:
      'The definitive Kagyu treatise on Mahamudra meditation — shamatha, vipashyana, and the stages of realization. A primary source text for Brown\'s work.',
    annotations: 5,
    readers: 12,
  },
]

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'lamrim', label: 'Lamrim' },
  { key: 'mahamudra', label: 'Mahamudra' },
  { key: 'sutra', label: 'Sutra' },
  { key: 'tantra', label: 'Tantra' },
  { key: 'commentary', label: 'Commentary' },
]

function getCategoryPillClass(category: Exclude<Category, 'all'>): string {
  switch (category) {
    case 'lamrim':
      return 'scope-pill-foundation'
    case 'mahamudra':
      return 'scope-pill-great'
    case 'sutra':
      return 'scope-pill-small'
    case 'tantra':
      return 'scope-pill-great'
    case 'commentary':
      return 'scope-pill-middle'
  }
}

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const featuredBook = books[0]

  const filteredBooks =
    selectedCategory === 'all'
      ? books
      : books.filter((book) => book.category === selectedCategory)

  return (
    <div className="min-h-screen bg-bodhi-bg-primary">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="max-w-[900px]">
          <p className="bodhi-label mb-2">LIBRARY</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-bodhi-text-primary mb-3">
            Sacred Texts
          </h1>
          <p className="font-sans text-base text-bodhi-text-tertiary">
            Read, study, and discuss together
          </p>
        </div>
      </header>

      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-[900px]">
          {/* Category filter */}
          <div className="mb-10 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`scope-pill whitespace-nowrap transition-all ${
                    selectedCategory === key
                      ? 'bg-bodhi-saffron text-white'
                      : 'bg-bodhi-bg-card text-bodhi-text-tertiary hover:text-bodhi-text-secondary border border-bodhi-border'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured text */}
          {(selectedCategory === 'all' || selectedCategory === 'lamrim') && (
            <div className="bodhi-card mb-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <span className="scope-pill-foundation mb-4 inline-block">
                    Lamrim
                  </span>
                  <h2 className="font-serif text-2xl font-light text-bodhi-text-primary mb-1">
                    {featuredBook.title}
                  </h2>
                  <p className="font-sans text-sm text-bodhi-text-tertiary mb-4">
                    {featuredBook.author}
                  </p>
                  <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed mb-4">
                    The Great Treatise on the Stages of the Path to Enlightenment
                    &mdash; the definitive guide to the graduated path
                  </p>
                  <p className="font-sans text-xs text-bodhi-gold mb-6">
                    {featuredBook.annotations} community annotations
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button className="gold-button">Read Now</button>
                    <p className="font-sans text-sm text-bodhi-text-tertiary">
                      Join {featuredBook.readers} readers discussing this text
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Books grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bodhi-card-hover flex flex-col">
                <span
                  className={`${getCategoryPillClass(book.category)} mb-4 inline-block self-start`}
                >
                  {book.category.charAt(0).toUpperCase() +
                    book.category.slice(1)}
                </span>
                <h3 className="font-serif text-xl font-light text-bodhi-text-primary mb-1">
                  {book.title}
                </h3>
                <p className="font-sans text-sm text-bodhi-text-tertiary mb-3">
                  {book.author}
                </p>
                <p className="font-sans text-sm text-bodhi-text-secondary leading-relaxed line-clamp-2 mb-4 flex-1">
                  {book.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-bodhi-border">
                  <span className="font-sans text-xs text-bodhi-text-tertiary">
                    {book.annotations} annotations
                  </span>
                  <button className="font-sans text-sm font-medium text-bodhi-gold hover:text-bodhi-gold-dark transition-colors">
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Community Feature Callout */}
          <div className="gold-border-left mb-16">
            <p className="bodhi-label mb-3">COMMUNITY</p>
            <p className="font-serif text-lg font-light text-bodhi-text-primary mb-3">
              Annotate passages, share insights, and study together
            </p>
            <p className="font-sans text-sm text-bodhi-text-tertiary leading-relaxed">
              When you read a text, your highlights and comments are shared with
              other readers &mdash; creating a living commentary tradition.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
