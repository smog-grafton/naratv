'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconLock, IconPlay } from '@/components/icons';
import ContentRail from '@/components/blocks/ContentRail';
import { ContentRail as ContentRailType } from '@/services/types';

export default function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const [hasAccess, setHasAccess] = useState(false); // Toggle this to test paywall
  
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
    <div className="flex flex-col min-h-screen bg-nara-black">
      {/* Player Section */}
      <div className="w-full bg-black relative aspect-[16/9] max-h-[85vh] flex items-center justify-center mt-16 md:mt-0">
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
              
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <Link href="/subscriptions" className="bg-white hover:bg-gray-200 focus:bg-gray-200 text-nara-black font-bold py-3.5 px-8 rounded-sm transition-colors text-center">
                  Subscribe Now
                </Link>
                <Link href="/checkout" className="bg-[#2A2B2E] hover:bg-[#3A3B3E] text-white font-bold py-3.5 px-8 rounded-sm transition-colors text-center">
                  Buy Single Pass
                </Link>
              </div>
              <button onClick={() => setHasAccess(true)} className="text-nara-text-muted mt-6 text-xs hover:text-white underline">
                [Debug] Bypass Paywall
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="max-w-[1920px] mx-auto w-full px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-[#2A2B2E] pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 capitalize tracking-tight">
              {slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center gap-3 text-xs md:text-sm text-nara-text-muted font-medium uppercase tracking-wider">
              <span>Nara Boxing</span>
              <span className="text-gray-600">|</span>
              <span>2024</span>
              <span className="text-gray-600">|</span>
              <span className="bg-white text-nara-black px-2 py-0.5 rounded-[2px] font-bold">Full Replay</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-[#2A2B2E] bg-nara-black hover:bg-[#2A2B2E] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider text-xs transition-colors">
              Share
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-300 max-w-3xl leading-relaxed text-sm md:text-base">
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
