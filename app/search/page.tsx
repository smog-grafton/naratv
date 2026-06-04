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
    }
  ] : [];

  return (
    <div className="min-h-screen bg-nara-black pt-8 md:pt-16 pb-12 px-4 md:px-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Mobile Header / Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-nara-text-muted hover:text-white mb-8 md:hidden"
        >
          <IconClose className="w-6 h-6" />
          <span>Close</span>
        </button>

        {/* Search Input Centered */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative border-b border-nara-border focus-within:border-white transition-colors pb-2">
            <IconSearch className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-nara-text-muted" />
            <input 
              type="text" 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fights, fighters, events"
              className="w-full bg-transparent text-2xl md:text-4xl text-white outline-none pl-12 placeholder:text-nara-text-muted/50"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-nara-text-muted hover:text-white"
              >
                <IconClose className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Categories / Tabs */}
        {query.length > 2 && (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4 border-b border-nara-border pb-4 mb-8 overflow-x-auto hide-scrollbar">
              <button className="px-4 py-1.5 rounded-full bg-white text-nara-black font-medium text-sm whitespace-nowrap">
                All ({results.length})
              </button>
              <button className="px-4 py-1.5 rounded-full bg-nara-surface border border-nara-border text-white font-medium text-sm whitespace-nowrap hover:bg-white/10">
                Videos
              </button>
              <button className="px-4 py-1.5 rounded-full bg-nara-surface border border-nara-border text-white font-medium text-sm whitespace-nowrap hover:bg-white/10">
                Events
              </button>
              <button className="px-4 py-1.5 rounded-full bg-nara-surface border border-nara-border text-white font-medium text-sm whitespace-nowrap hover:bg-white/10">
                Fighters
              </button>
            </div>

            {/* Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map(item => (
                  <div key={item.id}>
                    <VideoCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-nara-text-muted">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
