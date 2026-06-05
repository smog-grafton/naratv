'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      localStorage.setItem('nara_auth', 'true');
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative font-sans">
      {/* Top Bar matching DAZN */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-10">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
        <Link href="/" className="flex items-center text-xl font-black uppercase tracking-tighter">
          <span className="bg-nara-red text-white py-1 px-2 leading-none mr-1.5 rounded-sm">NARA</span>
          <span className="text-white leading-none">TV</span>
        </Link>
        <div className="w-6 hidden md:block"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 w-full max-w-[440px] mx-auto z-10 pt-20 pb-12">
        <div className="w-full">
          <h1 className="text-2xl md:text-[28px] font-bold text-center mb-2 tracking-tight">Log in or sign up</h1>
          <p className="text-gray-400 text-sm md:text-base text-center mb-8 max-w-[320px] mx-auto">
            Get access to live fights, highlights, shows, and much more.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border border-[#2a2b2e] rounded-[4px] px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all text-sm"
                required
              />
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-transparent border border-[#2a2b2e] rounded-[4px] px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all text-sm"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#f0c800] text-black font-bold py-3.5 rounded-[4px] hover:bg-[#e6c000] transition-colors mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin text-black" />} Continue
            </button>
          </form>

          <div className="text-center mb-6">
            <Link href="/register" className="text-sm font-bold text-white hover:underline">
              New to NARA TV? Sign up
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] bg-[#2a2b2e] flex-1"></div>
            <span className="text-[11px] text-gray-500 font-medium tracking-wider">or</span>
            <div className="h-[1px] bg-[#2a2b2e] flex-1"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#2a2b2e] py-3.5 rounded-[4px] hover:bg-[#1a1b1e] transition-colors font-medium text-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 flex-shrink-0" />
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#2a2b2e] py-3.5 rounded-[4px] hover:bg-[#1a1b1e] transition-colors font-medium text-sm">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5 flex-shrink-0" />
              <span>Continue with Facebook</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#2a2b2e] py-3.5 rounded-[4px] hover:bg-[#1a1b1e] transition-colors font-medium text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current text-white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              <span>Continue with Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
