'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ContentRail as ContentRailType } from '@/services/types';
import VideoCard from './VideoCard';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';

export default function ContentRail({ rail }: { rail: ContentRailType }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [rail.items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by 80% of container width to show previous/next item partially
      const scrollAmount = direction === 'left' ? -(clientWidth * 0.8) : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!rail.items || rail.items.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="flex items-center justify-between px-4 md:px-6 max-w-[1920px] mx-auto mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight border-l-4 border-nara-red pl-3">
          {rail.title}
        </h2>
        
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-nara-surface border border-nara-border text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-nara-border transition-colors"
            aria-label="Scroll left"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-nara-surface border border-nara-border text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-nara-border transition-colors"
            aria-label="Scroll right"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative group w-full max-w-[1920px] mx-auto">
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-4 px-4 md:px-6 pb-6 snap-x snap-mandatory hide-scrollbar overscroll-x-contain"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {rail.items.map((item) => (
            <div 
              key={item.id} 
              className="flex-none w-[260px] sm:w-[300px] lg:w-[340px] snap-start"
            >
              <VideoCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
