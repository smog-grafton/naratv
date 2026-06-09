'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconLock } from '@/components/icons';
import ContentRail from '@/components/blocks/ContentRail';
import { ContentRail as ContentRailType, Video, Event } from '@/services/types';
import NaraVideoPlayer from '@/components/player/NaraVideoPlayer';
import ChatTab from '@/components/watch/ChatTab';
import CommentsTab from '@/components/watch/CommentsTab';

// Mock generator for rails
const createMockRail = (id: string, title: string, titlePrefix: string | undefined, layout: 'video' | 'poster', badge: string | undefined, count: number): ContentRailType => {
  const items: (Video | Event)[] = Array.from({ length: count }).map((_, i) => {
    if (layout === 'poster') {
      return {
        id: `${id}-event-${i}`,
        title: `Fight Night: ${id} Part ${i + 1}`,
        slug: `${id}-fight-${i}`,
        poster_url: `https://picsum.photos/seed/${id}p${i}/800/1200`,
        start_time: '2024-06-15T20:00:00Z',
        is_live: false,
        is_ppv: i % 3 === 0,
        status: 'completed',
        category: 'Replay'
      } as Event;
    }
    return {
      id: `${id}-video-${i}`,
      title: `${id} highlight reel ${i + 1}`,
      slug: `${id}-vol-${i}`,
      thumbnail_url: `https://picsum.photos/seed/${id}v${i}/800/450`,
      video_url: 'd',
      is_free: i % 2 !== 0,
      is_premium: i % 2 === 0,
      is_live: false,
      source_label: badge,
      durations_seconds: 120 + i * 40
    } as Video;
  });

  return { id, title, titlePrefix, type: layout === 'poster' ? 'events' : 'videos', layout, badge, items };
};

const rails: ContentRailType[] = [
  createMockRail('free-highlights', 'Highlights', 'Free to watch', 'video', 'Highlights', 6),
  createMockRail('undercard', 'Undercard Action', 'Fight Night', 'video', 'Undercard', 5),
  createMockRail('weighin', 'Weigh-Ins & Face-Offs', 'Behind the scenes', 'video', 'Free', 4),
  createMockRail('comingup', 'Live and Coming Up', 'Free to watch', 'video', 'Upcoming', 4),
  createMockRail('bestof', 'Best of Nara TV', 'Classics', 'poster', 'Replay', 8),
  createMockRail('news', 'Latest Boxing News', undefined, 'video', 'News', 5),
];

export default function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const [hasAccess, setHasAccess] = useState(false); // Toggle this to test paywall
  const [activeTab, setActiveTab] = useState<'details' | 'chat' | 'comments' | 'fightcard' | 'replays'>('details');
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;
  const title = slug.replace(/-/g, ' ');

  // BACKEND INTEGRATION:
  // Replace mock access state with GET /api/v1/watch/{slug}/access.
  // Expected: has_access, access_source, allowed_actions, payment_options.

  return (
    <div className="flex flex-col min-h-screen bg-[#050b12]">
      {/* Player Section - DAZN style full width */}
      <div className="w-full bg-black relative flex items-center justify-center mt-[60px] md:mt-[72px] lg:mt-[80px] max-w-[1920px] mx-auto border-b border-white/5 shadow-2xl">
        {hasAccess ? (
          <NaraVideoPlayer 
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            poster="https://picsum.photos/seed/watch-poster/1920/1080"
            title={title}
            isLive={false} // Switch this to true to test the live badge/chat orientation
          />
        ) : (
          <div className="w-full relative aspect-[16/9] max-h-[85vh]">
            {/* Using regular img here intentionally for background fill simplicity, priority can be added if next/image used */}
            <img src="https://picsum.photos/seed/watch-poster/1920/1080" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/80 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <IconLock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 max-w-lg capitalize tracking-tight">
                {title || 'Premium Fight Replay'}
              </h1>
              <p className="text-gray-400 mb-8 max-w-md">
                Buy a fight pass or subscribe to watch this premium replay.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-sm">
                <button className="bg-[#eaff04] hover:bg-white text-black font-bold py-3.5 px-8 rounded-sm transition-colors text-center uppercase tracking-wider text-sm">
                  Subscribe Now
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-sm transition-colors text-center uppercase tracking-wider text-sm">
                  Buy Fight Pass
                </button>
              </div>
              
              {process.env.NODE_ENV === 'development' && (
                <button onClick={() => setHasAccess(true)} className="text-gray-700 mt-8 text-xs hover:text-gray-500 transition-colors">
                  [Debug] Bypass Paywall
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Layout with Sidebar for Chat on Desktop */}
      <div className="max-w-[1920px] mx-auto w-full px-4 md:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        
        {/* Left Column: Title & Info */}
        <div className="w-full flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className="bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-white/10">Full Replay</span>
                 <span className="bg-[#eaff04] text-black text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">Premium</span>
                 <span className="text-gray-400 text-xs font-bold uppercase tracking-wide ml-2">Nara Boxing</span>
                 <span className="text-gray-600 font-bold uppercase tracking-wide">•</span>
                 <span className="text-gray-400 text-xs font-bold tracking-wide">2024</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 capitalize tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            <div className="flex w-full md:w-auto items-center gap-3 mt-4 md:mt-0">
               <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-wider text-xs transition-colors">
                 Share
               </button>
               <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-wider text-xs transition-colors">
                 Follow
               </button>
            </div>
          </div>

          <div className="flex items-center gap-6 border-b border-white/5 pt-4 pb-0 mb-6 sticky top-16 md:top-24 bg-[#050b12] z-10 lg:hidden overflow-x-auto no-scrollbar whitespace-nowrap px-4 -mx-4 md:px-0 md:mx-0">
            <button 
              onClick={() => setActiveTab('details')}
              className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors ${activeTab === 'details' ? 'border-[#eaff04] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Details
            </button>
            <button 
              onClick={() => setActiveTab('fightcard')}
              className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors ${activeTab === 'fightcard' ? 'border-[#eaff04] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Fight Card
            </button>
            <button 
              onClick={() => setActiveTab('replays')}
              className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors ${activeTab === 'replays' ? 'border-[#eaff04] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Replays
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'chat' ? 'border-[#eaff04] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Live Chat
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors ${activeTab === 'comments' ? 'border-[#eaff04] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Comments
            </button>
          </div>

          <div className={`${activeTab === 'details' ? 'block' : 'hidden'} lg:block`}>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              Experience the full fight action from the main event. Catch all the blows, knockdowns, and the final decision. Commentary provided by the official Nara Promotionz team.
            </p>
          </div>
          
          <div className={`${activeTab === 'fightcard' ? 'block' : 'hidden'} lg:hidden`}>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 py-4">
              [ Fight Card view will appear here. Full lineup and stats. ]
            </p>
          </div>

          <div className={`${activeTab === 'replays' ? 'block' : 'hidden'} lg:hidden`}>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 py-4">
              [ Full event replays and multi-cam angles will appear here. ]
            </p>
          </div>

          <div className={`mt-8 ${activeTab === 'comments' ? 'block' : 'hidden'} lg:block`}>
             <span className="hidden lg:inline-flex mb-2 bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-white/10">Discussion</span>
             <CommentsTab />
          </div>

          {/* Mobile Chat View */}
          <div className={`mt-2 ${activeTab === 'chat' ? 'block' : 'hidden'} lg:hidden`}>
            <ChatTab />
          </div>

        </div>

        {/* Right Column: Persistent Chat on Desktop */}
        <div className="hidden lg:flex flex-col w-full h-full max-h-[800px] sticky top-32">
          <ChatTab />
        </div>

      </div>

      {/* Infinite-scroll Content Sections */}
      <div className="flex-grow w-full pb-20 pt-4 bg-[#050b12] mt-4">
        {rails.map((rail, idx) => (
          <ContentRail key={rail.id} rail={rail} index={idx} />
        ))}
      </div>
    </div>
  );
}
