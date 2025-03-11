'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">AIDev</span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium">
            Home
          </a>
          <a href="/projects" className="text-sm font-medium">
            Projects
          </a>
          <a href="/docs" className="text-sm font-medium">
            Documentation
          </a>
        </nav>

        {/* Connect Button */}
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Connect Wallet
        </button>
      </div>
    </header>
  )
} 