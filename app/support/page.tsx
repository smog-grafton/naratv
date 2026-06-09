import React from 'react';
import Link from 'next/link';
import { Search, ChevronRight, HelpCircle, Mail, MessageSquare, Play } from 'lucide-react';
import { IconLogo } from '@/components/icons';

export default function SupportPage() {
  const faqs = [
    { q: 'I paid for a ticket but it is not showing', a: 'Payments via mobile money can sometimes take a few minutes to process. Please refresh the page. If it still does not show after 10 minutes, contact support with your mobile number.' },
    { q: 'How to watch Fight Night Live', a: 'Once you purchase a Fight Pass, log in and go to the event page. A "Watch Live" option will appear when the broadcast begins.' },
    { q: 'The stream is buffering', a: 'Check your internet connection connection. For best experience on mobile networks, select Auto Quality on the video player.' },
    { q: 'Refund policy', a: 'Refunds are generally not provided for digital pay-per-view events. If you experienced a technical fault on our end, please reach out to support.' }
  ];

  return (
    <div className="min-h-screen bg-[#050b12] pt-24 md:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
         <div className="flex flex-col items-center text-center mb-16">
            <IconLogo className="w-12 h-12 text-white mb-6" />
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Nara TV Help Center</h1>
            <p className="text-gray-400 font-bold max-w-lg">How can we help you today? Find answers to common issues or speak directly with our ringside support team.</p>
         </div>

         <div className="relative w-full mb-16">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full bg-[#10141a] border border-white/10 text-white px-16 py-6 rounded-sm outline-none focus:border-white transition-colors text-lg font-bold placeholder:text-gray-600"
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <a href="#" className="bg-[#10141a] border border-white/10 p-6 rounded-sm hover:border-[#eaff04]/50 transition-colors group">
               <HelpCircle className="w-8 h-8 text-[#eaff04] mb-4" />
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Payment Issues</h3>
               <p className="text-sm text-gray-400 font-bold">Failed transactions, missing tickets, billing.</p>
            </a>
            <a href="#" className="bg-[#10141a] border border-white/10 p-6 rounded-sm hover:border-[#eaff04]/50 transition-colors group">
               <Play className="w-8 h-8 text-[#eaff04] mb-4" />
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Streaming Issues</h3>
               <p className="text-sm text-gray-400 font-bold">Buffering, audio sync, device compatibility.</p>
            </a>
         </div>

         <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 border-b border-white/10 pb-4">Common Questions</h2>
         <div className="space-y-4 mb-16">
            {faqs.map((faq, i) => (
               <details key={i} className="group bg-[#10141a] border border-white/10 rounded-sm">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-black text-white tracking-wide marker:content-none select-none">
                     {faq.q}
                     <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 font-medium leading-relaxed">
                     {faq.a}
                  </div>
               </details>
            ))}
         </div>
         
         <div className="bg-[#10141a] border border-white/10 p-8 md:p-12 text-center rounded-sm">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Still need help?</h2>
            <p className="text-gray-400 font-bold mb-8">Our support team is available 24/7 during fight nights.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="bg-[#2A2B2E] hover:bg-[#3A3B3E] text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                  <MessageSquare className="w-4 h-4" /> Live Chat
               </button>
               <button className="bg-transparent border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Mail className="w-4 h-4" /> Email Us
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
