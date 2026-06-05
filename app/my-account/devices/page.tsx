'use client';

import Link from "next/link";
import { ArrowLeft, MonitorSmartphone } from "lucide-react";

export default function MyAccountDevicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      <header className="bg-[#0a0a0c] border-b border-[#2a2b2e]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-lg font-black uppercase tracking-tighter">
            <span className="bg-nara-red text-white py-0.5 px-1.5 leading-none mr-1 rounded-sm">NARA</span>
            <span className="text-white leading-none">TV</span>
            <span className="ml-2 font-normal text-sm capitalize text-gray-400 border-l border-[#2a2b2e] pl-2">My Account</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
            S
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-0 md:px-8 py-0 md:py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-[#0a0a0c] md:bg-transparent md:border-r border-[#2a2b2e] sticky top-0 z-10 hidden md:block">
          <div className="p-4 md:p-0 border-b border-[#2a2b2e] md:border-b-0 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white mb-8 px-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to NARA TV
            </Link>
          </div>
          
          <nav className="flex flex-col gap-1 pr-4">
            <Link href="/my-account" className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/my-account/profile" className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white transition-colors">
              Profile and settings
            </Link>
            <Link href="/my-account/devices" className="flex items-center gap-3 px-4 py-3 rounded-[4px] bg-[#1a1b1e] text-sm font-bold text-white border-l-4 border-white">
              Manage devices
            </Link>
            <Link href="/help" className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-sm font-medium text-blue-400 hover:bg-blue-500/10 mt-4 transition-colors">
              Need help?
            </Link>
          </nav>
        </aside>

        {/* Mobile Header / Quick Nav */}
        <div className="md:hidden bg-[#0a0a0c] p-4 border-b border-[#2a2b2e] mb-4 flex gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-400 pr-4 border-r border-[#2a2b2e]">
             Back
          </Link>
          <Link href="/my-account" className="text-sm font-medium text-gray-400 pb-1">Overview</Link>
          <Link href="/my-account/profile" className="text-sm font-medium text-gray-400 pb-1">Profile</Link>
          <Link href="/my-account/devices" className="text-sm font-bold text-white border-b-2 border-white pb-1">Devices</Link>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-3xl mx-auto md:mx-0 px-4 md:px-0">
           <h1 className="text-2xl font-bold mb-6 text-white">Manage Devices</h1>

           <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] overflow-hidden mb-8">
              <div className="p-6 border-b border-[#2a2b2e]">
                 <h3 className="font-bold text-lg mb-2 text-white">My Registered Devices</h3>
                 <p className="text-sm text-gray-400 mb-6">You can watch NARA TV on up to 3 devices simultaneously.</p>
                 
                 <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-[#0a0a0c] border border-[#2a2b2e] rounded-[4px]">
                       <div className="flex items-center gap-4">
                          <MonitorSmartphone className="w-8 h-8 text-gray-500" />
                          <div>
                            <span className="block font-bold text-sm text-white">Chrome - Mac OS</span>
                            <span className="block text-xs text-green-500 font-bold mt-0.5">Currently active</span>
                          </div>
                       </div>
                       <button className="text-sm font-bold border border-[#2a2b2e] text-gray-300 px-4 py-1.5 rounded-[4px] hover:bg-[#2a2b2e] transition-colors">
                         Remove
                       </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#0a0a0c] border border-[#2a2b2e] rounded-[4px]">
                       <div className="flex items-center gap-4">
                          <MonitorSmartphone className="w-8 h-8 text-gray-500" />
                          <div>
                            <span className="block font-bold text-sm text-white">NARA TV App - iOS</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Last used: 2 days ago</span>
                          </div>
                       </div>
                       <button className="text-sm font-bold border border-[#2a2b2e] text-gray-300 px-4 py-1.5 rounded-[4px] hover:bg-[#2a2b2e] transition-colors">
                         Remove
                       </button>
                    </div>
                 </div>
              </div>
              
              <div className="p-6 bg-[#1a1b1e] flex justify-between items-center">
                 <span className="text-sm font-medium text-gray-400">Want to sign out of all devices?</span>
                 <button 
                   onClick={() => {
                     localStorage.removeItem('nara_auth');
                     window.location.href = '/';
                   }}
                   className="text-sm font-bold text-red-500 hover:underline"
                 >
                   Sign out everywhere
                 </button>
              </div>
           </div>

        </main>
      </div>
    </div>
  );
}
