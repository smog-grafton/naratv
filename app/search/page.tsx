'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconSearch, IconClose } from '@/components/icons';
import { Video } from '@/services/types';
import VideoCard from '@/components/blocks/VideoCard';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  
  // Dummy local results
  const results: Video[] = query.length > 2 ? [
    {
      id: 's1',
      title: 'Mutebi vs Oketcho highlights',
      slug: 'mutebi-vs-oketcho',
      thumbnail_url: 'https://picsum.photos/seed/search1/800/450',
      video_url: 'dummy',
      is_premium: true,
      is_free: false,
      is_live: false,
      category: 'Highlights'
    },
    {
      id: 's2',
      title: 'Press Conference: Kasirye vs Kato',
      slug: 'kasirye-vs-kato-press',
      thumbnail_url: 'https://picsum.photos/seed/search2/800/450',
      video_url: 'dummy',
      is_premium: false,
      is_free: true,
      is_live: false,
      category: 'Press Conference'
    },
    {
      id: 'pf1',
      title: 'John Kato',
      slug: 'kato',
      thumbnail_url: 'https://picsum.photos/seed/pf1/800/1200',
      video_url: '',
      is_premium: false,
      is_free: true,
      category: 'Heavyweight',
      content_type: 'fighter'
    }
  ] : [];

  // BACKEND INTEGRATION:
  // Replace mock search results with GET /api/v1/search?q=.

  return (
    <div className="min-h-screen bg-[#050b12] pt-24 md:pt-28 pb-12 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Mobile Header / Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 md:hidden"
        >
          <IconClose className="w-6 h-6" />
          <span>Close</span>
        </button>

        {/* Search Input Centered */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4 border-b border-white/20 focus-within:border-white transition-colors pb-2">
            <div className="relative flex-1 flex items-center">
              <IconSearch className="w-6 h-6 text-gray-500 absolute left-0" />
              <input 
                type="text" 
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fights, fighters, events"
                className="w-full bg-transparent text-xl sm:text-2xl md:text-4xl text-white outline-none pl-10 pr-10 font-black placeholder:text-gray-600 tracking-tight"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-0 p-2 text-gray-400 hover:text-white"
                >
                  <IconClose className="w-6 h-6" />
                </button>
              )}
            </div>
            <button 
              onClick={() => router.back()} 
              className="text-gray-400 hover:text-white font-bold tracking-wide uppercase text-sm px-2 animate-in fade-in"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Categories / Tabs */}
        {query.length > 2 && (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4 border-b border-white/10 pb-4 mb-8 overflow-x-auto hide-scrollbar">
              <button className="px-4 py-1.5 rounded-sm bg-white text-black font-black uppercase tracking-widest text-[10px] whitespace-nowrap">
                All ({results.length})
              </button>
              <button className="px-4 py-1.5 rounded-sm bg-[#10141a] border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors">
                Fighters
              </button>
              <button className="px-4 py-1.5 rounded-sm bg-[#10141a] border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors">
                Events
              </button>
              <button className="px-4 py-1.5 rounded-sm bg-[#10141a] border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors">
                Replays
              </button>
              <button className="px-4 py-1.5 rounded-sm bg-[#10141a] border border-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors">
                News
              </button>
            </div>

            {/* Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {results.map(item => (
                  <div key={item.id}>
                    <VideoCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <IconSearch className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">No results found.</h3>
                <p className="text-sm font-bold tracking-wide">Try searching for a fighter, event, or replay.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
