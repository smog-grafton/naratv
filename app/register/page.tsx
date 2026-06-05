'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, Mail, Chrome, Apple, Facebook } from "lucide-react";

export default function RegisterInitialPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/register/details?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative font-sans">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-10 bg-[#0a0a0c]">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
        <span className="text-[14px] md:text-sm font-bold tracking-wide">Sign up</span>
        <Link href="/" className="flex items-center text-lg font-black uppercase tracking-tighter">
          <span className="bg-white text-black py-0.5 px-1.5 leading-none mr-1 rounded-sm">NARA</span>
          <span className="text-white leading-none">TV</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-[400px] mx-auto z-10 pt-20">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-400 mb-8 text-sm">Enter your email to get started.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[#2a2b2e] rounded-[4px] px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all text-sm"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`w-full font-bold py-3.5 rounded-[4px] transition-colors flex items-center justify-center gap-2 text-sm ${email ? 'bg-[#f0c800] text-black hover:bg-[#e6c000]' : 'bg-[#3a3b3e] text-[#848485] pointer-events-none'}`}
              disabled={!email}
            >
              Continue with Email
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-[1px] bg-[#2a2b2e] flex-1"></div>
            <span className="text-[11px] text-gray-500 font-bold tracking-wider uppercase">or sign up with</span>
            <div className="h-[1px] bg-[#2a2b2e] flex-1"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-white text-black font-bold py-3.5 rounded-[4px] hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 text-sm">
              <Chrome className="w-5 h-5" /> Google
            </button>
            <button className="w-full bg-[#1a1b1e] text-white border border-[#2a2b2e] font-bold py-3.5 rounded-[4px] hover:bg-[#2a2b2e] transition-colors flex items-center justify-center gap-3 text-sm">
              <Apple className="w-5 h-5" /> Apple
            </button>
            <button className="w-full bg-[#1877F2] text-white font-bold py-3.5 rounded-[4px] hover:bg-[#166fe5] transition-colors flex items-center justify-center gap-3 text-sm">
              <Facebook className="w-5 h-5" /> Facebook
            </button>
          </div>

          <div className="text-center mt-8">
            <Link href="/login" className="text-sm font-bold text-white hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
