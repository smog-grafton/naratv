import React from 'react';
import ContentRail from '@/components/blocks/ContentRail';
import { getHomeRails } from '@/services/home';
import { IconPlay } from '@/components/icons';

export default async function LivePage() {
  const rails = await getHomeRails();
  const liveRail = rails[0]; // just mocking the rail

  return (
    <div className="min-h-[80vh] bg-nara-black pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-nara-border pb-4">Live TV</h1>
        
        <div className="mb-12">
          <div className="w-full aspect-video bg-[#10141a] border border-nara-border/40 rounded-sm flex items-center justify-center flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d2633] via-[#050b12] to-[#050b12] opacity-80" />
            <span className="w-4 h-4 bg-nara-red rounded-full animate-pulse mb-4 z-10"></span>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 z-10 uppercase tracking-tight">Nara TV Live 24/7 Channel</h2>
            <p className="text-gray-300 z-10 mb-8 max-w-lg text-center font-medium">Currently airing: Best of 2023 Knockouts. Tune in for non-stop boxing action.</p>
            <button className="bg-white hover:bg-gray-200 text-nara-black font-bold py-3 px-12 rounded-sm transition-colors uppercase tracking-wide text-sm z-10 flex items-center gap-2">
              <IconPlay className="w-5 h-5 fill-current" />
              Watch Stream
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 border-b border-nara-border pb-2 inline-block">Live & Upcoming</h2>
        {liveRail && <ContentRail rail={{...liveRail, title: ''}} />}
      </div>
    </div>
  );
}
