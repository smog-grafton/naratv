'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event } from '@/services/types';
import { IconChevronLeft, IconChevronRight, IconPlay, IconLock } from '@/components/icons';

export default function HeroCarousel({ events }: { events: Event[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [events.length]);

  const next = () => setCurrentIndex((p) => (p === events.length - 1 ? 0 : p + 1));
  const prev = () => setCurrentIndex((p) => (p === 0 ? events.length - 1 : p - 1));

  if (!events || events.length === 0) return null;

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-nara-navy overflow-hidden">
      {events.map((event, idx) => (
        <div 
          key={event.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-nara-black via-nara-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-nara-black via-nara-black/30 to-transparent hidden md:block" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 max-w-[1920px] mx-auto pb-12 md:pb-24">
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                {event.is_live && (
                  <span className="bg-nara-red text-white text-xs font-bold px-2 py-1 tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Live Now
                  </span>
                )}
                {event.status === 'upcoming' && (
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 tracking-wider uppercase">
                    Upcoming
                  </span>
                )}
                {event.is_ppv && (
                  <span className="bg-nara-blue-rich text-white text-xs font-bold px-2 py-1 tracking-wider uppercase">
                    PPV
                  </span>
                )}
              </div>

              {/* Title & Fighters */}
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-2 drop-shadow-lg">
                {event.fighter_a && event.fighter_b ? (
                  <div className="flex flex-col">
                    <span>{event.fighter_a.name}</span>
                    <span className="text-nara-text-muted text-xl md:text-3xl italic mx-1">vs</span>
                    <span>{event.fighter_b.name}</span>
                  </div>
                ) : (
                  event.title
                )}
              </h1>
              
              <p className="text-nara-text-muted text-sm md:text-lg mb-8 max-w-xl hidden md:block">
                {event.title}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href={`/events/${event.slug}`}
                  className="bg-nara-red hover:bg-nara-red/90 text-white font-bold py-3 px-8 rounded-sm transition-colors flex items-center gap-2 text-sm md:text-base"
                >
                  {event.status === 'live' ? 'Watch Live' : 'Get Tickets'}
                  {(event.status === 'live' || event.status === 'completed') && <IconPlay className="w-5 h-5 fill-current" />}
                </Link>
                
                {event.is_ppv && (
                  <Link 
                    href={`/checkout?event=${event.id}`}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-8 rounded-sm transition-colors flex items-center gap-2 text-sm md:text-base border border-white/10"
                  >
                    Buy PPV <span className="opacity-70 ml-1">UGX {event.price?.toLocaleString()}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      {events.length > 1 && (
        <>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 md:hidden">
            {events.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-nara-black/50 hover:bg-nara-black text-white rounded-full opacity-0 md:opacity-100 hover:scale-110 transition-all hidden md:flex backdrop-blur-sm border border-white/10"
          >
            <IconChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-nara-black/50 hover:bg-nara-black text-white rounded-full opacity-0 md:opacity-100 hover:scale-110 transition-all hidden md:flex backdrop-blur-sm border border-white/10"
          >
            <IconChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
