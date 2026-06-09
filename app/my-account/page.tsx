import Link from "next/link";
import { ArrowLeft, User, Languages, Settings, CreditCard, ChevronRight, MonitorSmartphone, HelpCircle, LogOut } from "lucide-react";

export default function MyAccountPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      {/* Light Theme Header */}
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
            <Link href="/my-account" className="flex items-center gap-3 px-4 py-3 rounded-[4px] bg-[#1a1b1e] text-sm font-bold text-white border-l-4 border-white">
              Overview
            </Link>
            <Link href="/my-account/profile" className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white transition-colors">
              Profile and settings
            </Link>
            <Link href="/my-account/devices" className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white transition-colors">
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
          <Link href="/my-account" className="text-sm font-bold text-white border-b-2 border-white pb-1">Overview</Link>
          <Link href="/my-account/profile" className="text-sm font-medium text-gray-400 pb-1">Profile</Link>
          <Link href="/my-account/devices" className="text-sm font-medium text-gray-400 pb-1">Devices</Link>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-3xl mx-auto md:mx-0 px-4 md:px-0">
          
          {/* User Card */}
          <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] p-4 md:p-6 mb-8 flex items-center justify-between cursor-pointer hover:border-gray-500 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-[#f0c800] text-black text-[10px] font-bold uppercase px-3 py-0.5 tracking-wider">
              MEMBER SINCE JUN 2026
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#2a2b2e] flex items-center justify-center font-bold text-lg text-white bg-[#0a0a0c]">
                S
              </div>
              <div>
                <h2 className="font-bold text-base text-white">smog biz</h2>
                <p className="text-sm text-gray-400">smogbiz03@gmail.com</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>

          {/* Subscriptions */}
          <h3 className="font-bold text-lg mb-4 text-white">My Subscriptions</h3>
          <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] overflow-hidden mb-8">
            <div className="p-4 border-b border-[#2a2b2e] flex justify-between items-center">
               <h4 className="font-bold text-lg text-white">Free Pass</h4>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 m-4 rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                 <div className="text-white text-sm">
                   <span className="font-bold flex items-center gap-2"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Upgrade now</span> - Subscribe to watch live fights and premium replays.
                 </div>
               </div>
               <Link href="/subscribe" className="bg-[#f0c800] hover:bg-[#e0bb00] text-black font-bold text-sm px-6 py-2 rounded-[4px] transition-colors whitespace-nowrap">
                 Upgrade now
               </Link>
            </div>
          </div>

          {/* Quick Links */}
          <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
          <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] overflow-hidden mb-8 flex flex-col">
            <Link href="/my-account/devices" className="p-4 border-b border-[#2a2b2e] flex items-center justify-between hover:bg-[#2a2b2e] transition-colors">
               <div className="flex items-center gap-3">
                 <MonitorSmartphone className="w-5 h-5 text-gray-400" />
                 <span className="font-bold text-sm text-white">Manage devices</span>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
            <Link href="/my-account/profile" className="p-4 border-b border-[#2a2b2e] flex items-center justify-between hover:bg-[#2a2b2e] transition-colors">
               <div className="flex items-center gap-3">
                 <Settings className="w-5 h-5 text-gray-400" />
                 <span className="font-bold text-sm text-white">Change password</span>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
            <Link href="/subscribe" className="p-4 flex items-center justify-between hover:bg-[#2a2b2e] transition-colors">
               <div className="flex flex-col">
                 <div className="flex items-center gap-3 mb-1">
                   <CreditCard className="w-5 h-5 text-gray-400" />
                   <span className="font-bold text-sm border-b border-dashed border-gray-500 pb-0.5 text-white">Explore other available subscriptions</span>
                 </div>
               </div>
               <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
          </div>

          {/* Tickets / Pay-Per-View */}
          <h3 className="font-bold text-lg mb-4 text-white">Pay-Per-View & Tickets</h3>
          <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] overflow-hidden mb-8 flex flex-col">
            <div className="p-4 border-b border-[#2a2b2e] flex flex-col md:flex-row items-center gap-4 justify-between">
               <div className="flex items-center gap-4 w-full">
                 <div className="w-24 h-14 bg-[#2a2b2e] rounded-sm overflow-hidden flex-shrink-0">
                    <img src="/assets/images/banner/event_banner.jpg" className="w-full h-full object-cover" alt="Nara event" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-sm text-white">Nara Fight Night: The Showdown</h4>
                   <p className="text-xs text-gray-400">Sat 15th Jun</p>
                   <p className="text-sm font-bold mt-1 text-white">UGX 10,000</p>
                 </div>
               </div>
               <Link href="/subscribe?type=ppv" className="w-full md:w-auto border border-[#2a2b2e] font-bold text-sm px-6 py-2 rounded-[4px] hover:bg-[#2a2b2e] transition-colors text-center text-white">
                 Buy now
               </Link>
            </div>
            <Link href="/events" className="p-4 text-sm font-bold text-white border-t border-[#2a2b2e] flex justify-between items-center hover:bg-[#2a2b2e] transition-colors">
              Explore more PPV events <ChevronRight className="w-5 h-5 text-gray-500" />
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
