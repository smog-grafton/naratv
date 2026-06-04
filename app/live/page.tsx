import React from 'react';
import ContentRail from '@/components/blocks/ContentRail';
import { getHomeRails } from '@/services/home';

export default async function LivePage() {
  const rails = await getHomeRails();
  const liveRail = rails[0]; // just mocking the rail

  return (
    <div className="min-h-[80vh] bg-nara-black pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-nara-border pb-4">Live TV</h1>
        
        <div className="mb-12">
          <div className="w-full aspect-video bg-nara-surface border border-nara-border rounded-lg flex items-center justify-center flex-col shadow-2xl">
            <span className="w-4 h-4 bg-nara-red rounded-full animate-pulse mb-4"></span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Nara TV Live 24/7 Channel</h2>
            <p className="text-nara-text-muted">Currently airing: Best of 2023 Knockouts</p>
            <button className="mt-6 bg-white hover:bg-white/90 text-nara-black font-bold py-3 px-8 rounded-sm transition-colors uppercase tracking-wide text-sm">
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
