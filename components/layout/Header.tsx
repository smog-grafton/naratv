'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconLogo, IconSearch, IconMenu, IconClose } from '@/components/icons';
import AccountDropdown from '@/components/auth/AccountDropdown';
import { Bell, PlayCircle, LogIn } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPass, setHasPass] = useState(false); // Simulate user access
  
  // Simulated Global Live State
  const globalEventLive = true; 

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(localStorage.getItem('nara_auth') === 'true');
    setHasPass(localStorage.getItem('nara_has_pass') === 'true');
  }, [pathname]);

  const handleSimulatedLogout = () => {
    localStorage.removeItem('nara_auth');
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    window.location.href = '/';
  };

  const isTransparentHeader = ['/', '/events', '/replays'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `fixed w-full top-0 z-50 transition-colors duration-300 ${
    isTransparentHeader && !scrolled ? 'bg-transparent' : 'bg-nara-surface border-b border-nara-border'
  }`;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Events', href: '/events' },
    { name: 'Replays', href: '/replays' },
  ];

  return (
    <>
      <header className={headerClass}>
        <div className="flex h-16 items-center px-4 md:px-6 w-full mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-6 md:mr-10 text-white hover:text-white/80 transition-colors">
              <IconLogo className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight hidden sm:inline-block">NARA<span className="text-nara-red">TV</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {globalEventLive && mounted && (
                 <Link href="/watch/kato-kasirye-2" className="flex items-center gap-2 text-nara-red font-black uppercase tracking-widest text-[10px] sm:text-xs mr-2 relative">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nara-red opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-nara-red"></span>
                    </span>
                    Live Now
                 </Link>
              )}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors py-5 ${
                      isActive ? 'text-white font-bold' : 'text-nara-text-muted hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-4">
            {mounted && isLoggedIn && (
               <button className="p-2 text-white hover:text-gray-300 relative" aria-label="Notifications">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-nara-red rounded-full ring-2 ring-[#050b12]" />
               </button>
            )}
            
            <Link href="/search" className="p-2 text-white hover:text-nara-text-muted transition-colors" aria-label="Search">
              <IconSearch className="w-5 h-5" />
            </Link>
            
            {mounted && globalEventLive && !isLoggedIn && (
               <Link href="/register" className="hidden lg:flex items-center gap-1.5 bg-[#eaff04] hover:bg-white text-black px-4 py-1.5 font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-sm transition-colors">
                  <PlayCircle className="w-3.5 h-3.5" /> Watch Live
               </Link>
            )}

            {mounted && globalEventLive && isLoggedIn && !hasPass && (
               <Link href="/events/kato-kasirye-2" className="hidden lg:flex items-center gap-1.5 bg-[#eaff04] hover:bg-white text-black px-4 py-1.5 font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-sm transition-colors">
                  <PlayCircle className="w-3.5 h-3.5" /> Unlock Stream
               </Link>
            )}

            <div className="hidden sm:flex items-center gap-3">
              {mounted && isLoggedIn ? (
                <AccountDropdown onSignOut={handleSimulatedLogout} />
              ) : mounted ? (
                <>
                  <Link 
                    href="/login" 
                    className="text-xs sm:text-sm font-bold text-white bg-[#2A2B2E] hover:bg-[#3A3B3E] px-4 py-2 rounded-sm transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="text-sm font-bold text-nara-black bg-white hover:bg-gray-200 px-4 py-2 rounded-sm transition-colors"
                  >
                    Get started
                  </Link>
                </>
              ) : null}
            </div>

            <div className="md:hidden flex items-center">
              {isLoggedIn && <div className="mr-2"><AccountDropdown onSignOut={handleSimulatedLogout} /></div>}
              <button 
                className="p-2 text-white hover:text-nara-text-muted"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Menu"
              >
                <IconMenu className="w-6 h-6" />
              </button>
            </div>
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
              <nav className="flex flex-col px-0 gap-0">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-6 py-4 border-b border-nara-border text-base font-medium transition-colors ${
                      pathname === link.href ? 'bg-white/5 text-white border-l-4 border-l-nara-red' : 'text-nara-text-muted hover:bg-white/5 hover:text-white border-l-4 border-l-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-8 px-6 border-t border-nara-border pt-8 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <Link 
                      href="/my-account" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center rounded-sm font-bold text-nara-black bg-white hover:bg-gray-200 transition-colors"
                    >
                      My Account
                    </Link>
                    <button 
                      onClick={handleSimulatedLogout}
                      className="w-full py-3 text-center rounded-sm font-bold text-white bg-[#2A2B2E] hover:bg-[#3A3B3E] transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center rounded-sm font-bold text-white bg-[#2A2B2E] hover:bg-[#3A3B3E] transition-colors"
                    >
                      Log in
                    </Link>
                    <Link 
                      href="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center rounded-sm font-bold text-nara-black bg-white hover:bg-gray-200 transition-colors"
                    >
                      Get started
                    </Link>
                  </>
                )}
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
