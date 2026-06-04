'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconLock, IconPlay } from '@/components/icons';
import ContentRail from '@/components/blocks/ContentRail';
import { ContentRail as ContentRailType } from '@/services/types';

export default function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const [hasAccess, setHasAccess] = useState(false); // Toggle this to test paywall
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use React.use to unwrap the params promise if we want, or just wait for it in a server component.
  // Since it's a client component, we use React.use() in next 15
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  // Dummy related rail
  const relatedRail: ContentRailType = {
    id: 'related',
    title: 'More from Nara TV',
    type: 'videos',
    items: [
      { id: '1', title: 'Related 1', slug: 'r1', thumbnail_url: 'https://picsum.photos/seed/r1/800/450', video_url: 'd', is_free: true, is_premium: false, is_live: false },
      { id: '2', title: 'Related 2', slug: 'r2', thumbnail_url: 'https://picsum.photos/seed/r2/800/450', video_url: 'd', is_free: true, is_premium: false, is_live: false },
      { id: '3', title: 'Related 3', slug: 'r3', thumbnail_url: 'https://picsum.photos/seed/r3/800/450', video_url: 'd', is_free: true, is_premium: false, is_live: false },
      { id: '4', title: 'Related 4', slug: 'r4', thumbnail_url: 'https://picsum.photos/seed/r4/800/450', video_url: 'd', is_free: true, is_premium: false, is_live: false },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Player Section */}
      <div className="w-full bg-black relative aspect-video max-h-[85vh] flex items-center justify-center">
        {hasAccess ? (
          <div className="relative w-full h-full group">
            <video 
              className="w-full h-full object-contain"
              poster="https://picsum.photos/seed/watch-poster/1920/1080"
              controls
              autoPlay
            >
              <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-nara-black">
            <img src="https://picsum.photos/seed/watch-poster/1920/1080" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-nara-black via-nara-black/80 to-nara-black/40" />
            
            <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <IconLock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Premium Content</h1>
              <p className="text-nara-text-muted mb-8">
                Subscribe to Nara TV to watch this premium fight and get access to our full library.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <Link href="/subscriptions" className="bg-nara-red hover:bg-nara-red/90 text-white font-bold py-3 px-6 rounded-sm transition-colors w-full">
                  Subscribe Now
                </Link>
                <Link href="/checkout" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-sm transition-colors w-full">
                  Buy Single Pass
                </Link>
                <button onClick={() => setHasAccess(true)} className="text-nara-text-muted mt-4 text-sm hover:text-white underline">
                  [Debug] Bypass Paywall
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="max-w-[1920px] mx-auto w-full px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-nara-border pb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 capitalize">
              {slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center gap-4 text-sm text-nara-text-muted">
              <span>Nara Boxing</span>
              <span>•</span>
              <span>2024</span>
              <span>•</span>
              <span className="bg-nara-surface border border-nara-border px-2 rounded-sm text-white">Full Replay</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-nara-border hover:bg-white/10 px-6 py-2.5 rounded-sm font-medium transition-colors">
              Share
            </button>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-nara-text-muted max-w-3xl leading-relaxed">
            Experience the full fight from start to finish. Commentary by the official Nara TV team. 
            All rights reserved to Nara Promotionz.
          </p>
        </div>
      </div>

      {/* Related Content */}
      <div className="mt-8 pb-12">
        <ContentRail rail={relatedRail} />
      </div>
    </div>
  );
}
