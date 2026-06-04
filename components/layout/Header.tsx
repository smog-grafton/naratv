'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconLogo, IconSearch, IconMenu, IconClose } from '@/components/icons';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Events', href: '/events' },
    { name: 'Replays', href: '/replays' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-nara-black/95 backdrop-blur-sm border-b border-nara-border">
        <div className="flex h-16 items-center px-4 md:px-6 max-w-[1920px] mx-auto">
          <Link href="/" className="flex items-center gap-2 mr-6 text-white hover:text-white/80 transition-colors">
            <IconLogo className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">NARA<span className="text-nara-red">TV</span></span>
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-white ${
                  pathname === link.href ? 'text-white border-b-2 border-nara-red py-5' : 'text-nara-text-muted py-5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/search" className="p-2 text-nara-text-muted hover:text-white transition-colors" aria-label="Search">
              <IconSearch className="w-5 h-5" />
            </Link>
            
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-white hover:bg-white/10 px-4 py-2 rounded-md transition-colors bg-white/5">
                Log in
              </Link>
              <Link href="/register" className="text-sm font-medium text-nara-black bg-white hover:bg-white/90 px-4 py-2 rounded-md transition-colors">
                Get started
              </Link>
            </div>

            <button 
              className="p-2 text-nara-text-muted hover:text-white md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <IconMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-nara-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-[80%] max-w-sm h-full bg-nara-surface border-r border-nara-border shadow-2xl animate-in slide-in-from-left">
            <div className="flex h-16 items-center px-4 border-b border-nara-border justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <IconLogo className="w-8 h-8 text-white" />
                <span className="font-bold text-xl tracking-tight text-white">NARA<span className="text-nara-red">TV</span></span>
              </Link>
              <button className="p-2 text-nara-text-muted hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col px-2 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      pathname === link.href ? 'bg-white/10 text-white' : 'text-nara-text-muted hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 px-6 border-t border-nara-border pt-8 flex flex-col gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-md font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-md font-medium text-nara-black bg-white hover:bg-white/90 transition-colors"
                >
                  Get started
                </Link>
              </div>

              <div className="mt-8 px-6 flex flex-col gap-4 text-sm text-nara-text-muted">
                <Link href="/help" className="hover:text-white">Help</Link>
                <Link href="/terms" className="hover:text-white">Terms & conditions</Link>
                <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
