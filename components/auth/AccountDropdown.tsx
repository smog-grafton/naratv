'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, CreditCard, LogOut, Settings } from 'lucide-react';

interface AccountDropdownProps {
  onSignOut?: () => void;
}

export default function AccountDropdown({ onSignOut }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
      >
        <div className="hidden md:flex flex-col items-end mr-1">
           <span className="text-white text-xs font-bold leading-none tracking-wide">SMOG BIZ</span>
           <span className="text-[#f0c800] text-[9px] font-bold uppercase tracking-widest mt-1">Free Pass</span>
        </div>
        <div className="w-8 h-8 md:w-9 md:h-9 bg-nara-red text-white flex items-center justify-center rounded-full font-bold text-sm border-2 border-nara-black">
          S
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-[#1a1b1e] border border-[#2a2b2e] rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-[#2a2b2e] mb-2 md:hidden">
            <span className="block text-white text-sm font-bold truncate">smog biz</span>
            <span className="block text-[#f0c800] text-[10px] font-bold uppercase tracking-widest mt-1">Free Pass</span>
          </div>
          
          <Link 
            href="/my-account" 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#2a2b2e] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4" /> My Account
          </Link>
          <Link 
            href="/subscribe" 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#2a2b2e] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <CreditCard className="w-4 h-4" /> Manage Subscription
          </Link>
          <Link 
            href="/my-account/profile" 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#2a2b2e] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
          
          <div className="h-[1px] bg-[#2a2b2e] my-2"></div>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#2a2b2e] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
