import React from 'react';
import Link from 'next/link';
import { Play, Trophy, Calendar, ChevronRight } from 'lucide-react';
import ScrollFadeOverlay from '@/components/blocks/ScrollFadeOverlay';
import ContentRail from '@/components/blocks/ContentRail';
import { getPromotionsRails } from '@/services/home';

export default async function BoxerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Use mock rails for now
  const rails = (await getPromotionsRails()).slice(1, 3); // some mock content
  
  // Format slug to readable name
  const fighterName = slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen bg-nara-black">
      {/* Cinematic Boxer Hero */}
      <div className="relative w-full h-[70vh] md:h-[80vh] flex flex-col justify-end bg-[#0a0a0c]">
        {/* Abstract dark gradients to compose a cool background */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
           <img src={`https://picsum.photos/seed/${slug}bg/1920/1080`} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
           {/* Gradient radial glow */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nara-black/40 via-nara-black/90 to-nara-black mix-blend-multiply" />
           <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-nara-black via-nara-black/80 to-transparent" />
        </div>

        {/* Big Fighter Image overlay */}
        <div className="absolute bottom-0 right-0 md:right-12 w-full max-w-[500px] md:max-w-[800px] h-full flex items-end justify-end opacity-80 z-10 pointer-events-none">
          {/* Using a placeholder for a masked fighter image */}
          <img src={`https://picsum.photos/seed/${slug}/800/800`} className="w-full h-auto object-cover mask-image-b" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 40%)'}} alt={fighterName} />
        </div>

        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-12 border-b border-white/5">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block bg-[#f0c800] text-black font-black uppercase text-xs md:text-sm tracking-widest px-3 py-1 mb-4 rounded-sm">
              Heavyweight
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.8] whitespace-nowrap">
              {fighterName}
            </h1>
            
            {/* Record Badges DAZN Style */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12">
               <div>
                 <div className="text-3xl md:text-4xl font-black text-green-500">12</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-t border-white/10 pt-1 mt-1">Wins</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-black text-[#f0c800]">8</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-t border-white/10 pt-1 mt-1">KOs</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-black text-blue-500">1</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-t border-white/10 pt-1 mt-1">Draws</div>
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-black text-nara-red">2</div>
                 <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-t border-white/10 pt-1 mt-1">Losses</div>
               </div>
            </div>

            {/* Fighter Attributes */}
            <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base border-t border-white/10 pt-6 mt-12 max-w-xl">
               <div className="flex flex-col">
                 <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">Stance</span>
                 <span className="text-white font-bold tracking-wide">Orthodox</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">Age</span>
                 <span className="text-white font-bold tracking-wide">28</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">Height</span>
                 <span className="text-white font-bold tracking-wide">188cm</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">Reach</span>
                 <span className="text-white font-bold tracking-wide">192cm</span>
               </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-12">
               <button className="bg-white text-black font-black uppercase tracking-widest px-8 py-3 rounded-sm text-sm hover:bg-gray-200 transition-colors">
                  Follow Fighter
               </button>
               <button className="bg-[#2A2B2E]/80 backdrop-blur-md text-white border border-[#3A3B3E] font-bold uppercase tracking-wider py-3 px-8 rounded-sm text-sm hover:bg-[#3A3B3E] transition-colors flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> View Rankings
               </button>
            </div>
            
          </div>
        </div>
      </div>
      
      <ScrollFadeOverlay />

      <div className="w-full relative z-20 pb-24 mt-8 space-y-2 lg:space-y-4">
        {rails.map((rail: any, idx: number) => (
          <ContentRail key={rail.id} rail={rail} index={idx} />
        ))}
      </div>
    </div>
  );
}
