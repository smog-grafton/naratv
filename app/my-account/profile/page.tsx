import Link from "next/link";
import { ArrowLeft, User, Languages, Settings, CreditCard, ChevronRight, MonitorSmartphone, HelpCircle, LogOut } from "lucide-react";

export default function MyAccountProfilePage() {
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
            <Link href="/" className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white mb-8 px-4">
              <ArrowLeft className="w-4 h-4" /> Back to NARA TV
            </Link>
          </div>
          
          <nav className="flex flex-col gap-1 pr-4">
            <Link href="/my-account" className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white">
              Overview
            </Link>
            <Link href="/my-account/profile" className="flex items-center gap-3 px-4 py-3 rounded-md bg-[#1a1b1e] text-sm font-bold text-white border-l-4 border-white">
              Profile and settings
            </Link>
            <Link href="/my-account/devices" className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-400 hover:bg-[#1a1b1e] hover:text-white">
              Manage devices
            </Link>
            <Link href="/help" className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-blue-400 hover:bg-blue-500/10 mt-4">
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
          <Link href="/my-account/profile" className="text-sm font-bold text-white border-b-2 border-white pb-1">Profile</Link>
          <Link href="/my-account/devices" className="text-sm font-medium text-gray-400 pb-1">Devices</Link>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-3xl mx-auto md:mx-0 px-4 md:px-0">
           <h1 className="text-2xl font-bold mb-6 text-white">Profile & Settings</h1>

           <div className="bg-[#1a1b1e] rounded-[4px] border border-[#2a2b2e] overflow-hidden mb-8">
              <div className="p-6 border-b border-[#2a2b2e]">
                 <h3 className="font-bold text-base mb-4 text-white">Personal Details</h3>
                 <div className="flex flex-col gap-4 max-w-md">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                       <div className="flex justify-between items-center bg-[#0a0a0c] px-3 py-2 rounded-md border border-[#2a2b2e]">
                          <span className="text-sm font-bold text-white">smog biz</span>
                          <button className="text-sm font-bold text-blue-400 hover:underline">Edit</button>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                       <div className="flex justify-between items-center bg-[#0a0a0c] px-3 py-2 rounded-md border border-[#2a2b2e]">
                          <span className="text-sm font-bold text-white">smogbiz03@gmail.com</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 border-b border-[#2a2b2e]">
                 <h3 className="font-bold text-base mb-4 text-white">Security</h3>
                 <div className="flex justify-between items-center bg-[#0a0a0c] px-3 py-3 rounded-md border border-[#2a2b2e] max-w-md">
                    <div>
                      <span className="block text-sm font-bold mb-0.5 text-white">Password</span>
                      <span className="block text-xs text-gray-500">Last changed: Never</span>
                    </div>
                    <button className="text-sm font-bold text-blue-400 hover:underline">Change</button>
                 </div>
              </div>

              <div className="p-6">
                 <h3 className="font-bold text-base mb-4 text-white">Preferences</h3>
                 <div className="flex items-center justify-between py-2 border-b border-[#2a2b2e] max-w-md">
                   <div className="flex flex-col">
                     <span className="text-sm font-bold text-white">Email Notifications</span>
                     <span className="text-xs text-gray-500">Receive schedule updates and offers</span>
                   </div>
                   <div className="w-11 h-6 bg-green-500 rounded-full relative flex-shrink-0 cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                   </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
