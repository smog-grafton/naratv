import React from 'react';
import Link from 'next/link';
import { Calendar, Play, Lock, Info, Users, MapPin, ChevronRight, Video, FileText, Bell } from 'lucide-react';
import ScrollFadeOverlay from '@/components/blocks/ScrollFadeOverlay';
import ContentRail from '@/components/blocks/ContentRail';
import { getPromotionsRails } from '@/services/home';

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const eventTitle = slug.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  // Use mock rails for "Related Videos" / "Highlights"
  const rails = (await getPromotionsRails()).slice(3, 5);

  return (
    <div className="flex flex-col min-h-screen bg-[#050b12]">
      {/* Cinematic Event Hero */}
      <div className="relative w-full h-[60vh] md:h-[75vh] flex flex-col justify-end bg-black">
        <div className="absolute inset-0 z-0">
          <img src={`https://picsum.photos/seed/${slug}/1920/1080`} alt={eventTitle} className="w-full h-full object-cover object-top opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-nara-black/90 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-16 pt-32 md:pt-44 flex flex-col md:flex-row gap-12 md:items-end justify-between">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-20 md:mt-0">
            <div className="bg-[#eaff04] text-black font-black uppercase text-xs md:text-sm tracking-widest px-3 py-1 mb-4 rounded-sm inline-block">
               Upcoming Event
            </div>
            {/* SPONSOR STRIP */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Presented by</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-4 opacity-50 grayscale brightness-200" alt="Sponsor" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
              {eventTitle}
            </h1>
            <h2 className="text-xl md:text-3xl font-black text-nara-red uppercase mb-6 tracking-tight">Kato vs Kasirye II</h2>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300 font-bold tracking-wide mb-8 text-sm md:text-base">
               <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> DEC 14, 2026 - 19:00 UTC</span>
               <span className="hidden md:inline text-white/20">|</span>
               <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lugogo Arena, Kampala</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
               <Link href={`/watch/${slug}`} className="bg-[#eaff04] text-black font-bold uppercase tracking-wider py-4 md:py-4 px-10 rounded-sm text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#eaff04]/20">
                 <Play className="w-4 h-4 fill-black text-black" /> Unlock Stream
               </Link>
               <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold uppercase tracking-wider py-4 md:py-4 px-10 rounded-sm text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                 <Lock className="w-4 h-4" /> VIP Tickets
               </button>
               <button className="bg-transparent text-gray-400 font-bold uppercase tracking-wider py-4 md:py-4 px-6 rounded-sm text-sm hover:text-white transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-white/10">
                 <Bell className="w-4 h-4" /> Remind Me
               </button>
            </div>
          </div>
          
          {/* FIGHT NIGHT COUNTDOWN */}
          <div className="hidden lg:flex flex-col items-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-sm min-w-[300px]">
             <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">Fight starts in</span>
             <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col"><span className="text-4xl font-black text-white">12</span><span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Days</span></div>
                <div className="text-2xl font-black text-white/20">:</div>
                <div className="flex flex-col"><span className="text-4xl font-black text-white">05</span><span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Hrs</span></div>
                <div className="text-2xl font-black text-white/20">:</div>
                <div className="flex flex-col"><span className="text-4xl font-black text-white">42</span><span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Mins</span></div>
             </div>
          </div>
        </div>
      </div>
      
      <ScrollFadeOverlay />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 relative z-20 pb-24 mt-8 flex flex-col min-h-[40vh] gap-12">
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* LEFT COL: FIGHT CARD */}
           <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Fight Card</h2>
               <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Subject to change</span>
             </div>
             
             <div className="space-y-4">
                {/* Main Event Card */}
                <div className="bg-[#10141a] border-2 border-[#eaff04]/20 rounded-md p-6 relative overflow-hidden group cursor-pointer hover:border-[#eaff04]/50 transition-colors">
                  <div className="absolute top-0 right-0 bg-[#eaff04] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-sm z-10">Main Event</div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                     <div className="flex-1 text-center md:text-right">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">John Kato</h3>
                        <p className="text-sm text-gray-400 font-bold">12-2-1 (8 KOs)</p>
                     </div>
                     <div className="text-2xl font-black text-nara-red tracking-widest uppercase">VS</div>
                     <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Mike Kasirye</h3>
                        <p className="text-sm text-gray-400 font-bold">14-0-0 (11 KOs)</p>
                     </div>
                  </div>
                  <div className="text-center mt-6 pt-4 border-t border-white/10">
                     <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Heavyweight Championship • 12 Rounds</p>
                  </div>
                </div>

                {/* Co-Main */}
                <div className="bg-[#10141a] border border-nara-border rounded-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="flex-1 text-center md:text-right">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Kabona Meddy</h3>
                  </div>
                  <div className="text-sm font-black text-gray-600 tracking-widest uppercase px-4">VS</div>
                  <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Ken Da Mexico</h3>
                  </div>
                </div>
                
                {/* Undercard */}
                <div className="bg-[#10141a] border border-nara-border rounded-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:border-white/20 transition-colors">
                  <div className="flex-1 text-center md:text-right">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Sarah Nabu</h3>
                  </div>
                  <div className="text-sm font-black text-gray-600 tracking-widest uppercase px-4">VS</div>
                  <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Anita Jones</h3>
                  </div>
                </div>
             </div>
           </div>

           {/* RIGHT COL: TICKETS & EXTRAS */}
           <div className="space-y-6">
              <div className="bg-[#0a0f16] border border-nara-border p-6 rounded-md">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Select Watch Pass</h3>
                 
                 <div className="space-y-3">
                   <label className="flex items-start gap-3 p-4 border border-[#eaff04]/50 bg-[#eaff04]/5 rounded-sm cursor-pointer relative">
                      <div className="absolute -top-2 right-4 bg-[#eaff04] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">Popular</div>
                      <input type="radio" name="pass" className="mt-1" defaultChecked />
                      <div>
                         <div className="font-bold text-white">Event Pass (Digital)</div>
                         <div className="text-sm text-gray-400 mt-1 leading-relaxed">Watch live stream in 1080p, plus unlimited replays for 7 days.</div>
                         <div className="text-lg font-black text-[#eaff04] mt-2">$19.99</div>
                      </div>
                   </label>
                   
                   <label className="flex items-start gap-3 p-4 border border-white/10 hover:border-white/30 rounded-sm cursor-pointer transition-colors">
                      <input type="radio" name="pass" className="mt-1" />
                      <div>
                         <div className="font-bold text-white">Annual Sub + PPV</div>
                         <div className="text-sm text-gray-400 mt-1 leading-relaxed">Save 20% on next 5 PPVs and get all weekly Fight Night events.</div>
                         <div className="text-lg font-black text-white mt-2">$99.99/yr</div>
                      </div>
                   </label>
                 </div>
                 
                 <button className="w-full mt-6 bg-white text-black hover:bg-gray-200 py-4 font-black uppercase tracking-widest text-sm rounded-sm transition-colors">
                   Checkout • $19.99
                 </button>
              </div>

              {/* News / Weigh-in */}
              <div className="group cursor-pointer">
                 <div className="aspect-video relative overflow-hidden rounded-md border border-nara-border flex items-center justify-center bg-[#10141a] group-hover:border-[#eaff04]/50 transition-colors">
                    <img src={`https://picsum.photos/seed/${slug}weigh/800/450`} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" alt="Weigh-in" />
                    <Play className="w-12 h-12 text-white/50 group-hover:text-white transition-colors relative z-10" strokeWidth={1} />
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                       <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">Live now</span>
                       <span className="text-sm font-bold text-white text-shadow-sm">Official Weigh-In</span>
                    </div>
                 </div>
              </div>
           </div>
         </div>

         {/* RELATED VOD RAILS */}
         <div className="w-full mt-12 space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter border-b border-white/10 pb-4">Event Coverage</h2>
            {rails.map((rail, idx) => (
              <ContentRail key={rail.id} rail={rail} index={idx} />
            ))}
         </div>
      </div>
    </div>
  );
}
