'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ScheduleItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isLocked: boolean;
  badge?: string; // e.g., "16:00", "01:30"
  tagLabel?: string; // e.g., "Press Conference", "Weigh-In", "Prelims"
  dateLabel: string;
};

type ScheduleDay = {
  id: string;
  dayOfWeek: string;
  dayOfMonth: string;
  month: string;
  isToday?: boolean;
  items: ScheduleItem[];
};

const SCHEDULE_DATA: ScheduleDay[] = [
  {
    id: 'day-1',
    dayOfWeek: 'THU',
    dayOfMonth: '28',
    month: 'MAY',
    items: [
      {
        id: 'ev-1',
        title: 'Eastern Conference Final - Game 4',
        subtitle: 'Sports Network',
        image: 'https://picsum.photos/seed/sched1/800/450',
        isLocked: true,
        tagLabel: 'Full Event',
        dateLabel: '28 MAY',
      },
      {
        id: 'ev-2',
        title: 'Raise the Flags - Ep.5',
        subtitle: 'Football Docs',
        image: 'https://picsum.photos/seed/sched2/800/450',
        isLocked: false,
        dateLabel: '28 MAY',
      },
      {
        id: 'ev-3',
        title: 'Raise the Flags - Ep.6',
        subtitle: 'Football Docs',
        image: 'https://picsum.photos/seed/sched3/800/450',
        isLocked: false,
        dateLabel: '28 MAY',
      },
      {
        id: 'ev-4',
        title: 'Golf Championship - Day 1',
        subtitle: 'Golf Network | Highlights',
        image: 'https://picsum.photos/seed/sched4/800/450',
        isLocked: false,
        tagLabel: 'Highlights',
        dateLabel: '28 MAY',
      },
    ],
  },
  {
    id: 'day-2',
    dayOfWeek: 'FRI',
    dayOfMonth: '29',
    month: 'MAY',
    items: [
      {
        id: 'ev-5',
        title: 'Foster vs. Ford: Press Conference',
        subtitle: 'Championship Boxing',
        image: 'https://picsum.photos/seed/sched5/800/450',
        isLocked: false,
        tagLabel: 'Press Conference',
        dateLabel: '29 MAY',
      },
      {
        id: 'ev-6',
        title: 'Raise the Flags - Ep.7',
        subtitle: 'Football Docs',
        image: 'https://picsum.photos/seed/sched6/800/450',
        isLocked: false,
        dateLabel: '29 MAY',
      },
      {
        id: 'ev-7',
        title: 'Raise the Flags - Ep.8',
        subtitle: 'Football Docs',
        image: 'https://picsum.photos/seed/sched7/800/450',
        isLocked: false,
        dateLabel: '29 MAY',
      },
      {
        id: 'ev-8',
        title: 'Golf Championship - Day 2',
        subtitle: 'Golf Network | Highlights',
        image: 'https://picsum.photos/seed/sched8/800/450',
        isLocked: true,
        dateLabel: '29 MAY',
      },
      {
        id: 'ev-8b',
        title: 'World Rally: Stage 7',
        subtitle: 'WRC',
        image: 'https://picsum.photos/seed/schedrt/800/450',
        isLocked: false,
        dateLabel: '29 MAY',
      },
    ],
  },
  {
    id: 'day-3',
    dayOfWeek: 'TODAY',
    dayOfMonth: '5',
    month: 'JUN',
    isToday: true,
    items: [
      {
        id: 'ev-9',
        title: 'Ramirez vs. Richards: Full Event Replay',
        subtitle: 'Eye of The Tiger',
        image: 'https://picsum.photos/seed/sched9/800/450',
        isLocked: true,
        badge: '01:30',
        dateLabel: '5 JUN',
      },
      {
        id: 'ev-10',
        title: 'Padley vs. Fiaz: Weigh-In',
        subtitle: 'Championship Boxing',
        image: 'https://picsum.photos/seed/sched10/800/450',
        isLocked: true,
        badge: '15:00',
        tagLabel: 'Weigh-In',
        dateLabel: '5 JUN',
      },
      {
        id: 'ev-11',
        title: 'Katie Taylor Press Conference',
        subtitle: 'Championship Boxing',
        image: 'https://picsum.photos/seed/sched11/800/450',
        isLocked: false,
        badge: '16:00',
        dateLabel: '5 JUN',
      },
    ],
  },
  {
    id: 'day-4',
    dayOfWeek: 'SAT',
    dayOfMonth: '6',
    month: 'JUN',
    items: [
      {
        id: 'ev-12',
        title: 'Padley vs. Fiaz: Prelims',
        subtitle: 'Championship Boxing',
        image: 'https://picsum.photos/seed/sched12/800/450',
        isLocked: true,
        badge: '19:15',
        tagLabel: 'Prelims',
        dateLabel: '6 JUN',
      },
      {
        id: 'ev-13',
        title: 'Padley vs. Fiaz',
        subtitle: 'Championship Boxing',
        image: 'https://picsum.photos/seed/sched13/800/450',
        isLocked: true,
        badge: '21:00',
        dateLabel: '6 JUN',
      },
    ],
  },
];

const SPORT_FILTERS = [
  'All Events',
  'Title Fights',
  'Undercards',
  'Press Conferences',
  'Weigh-ins',
  'Documentaries',
  'Highlights',
];

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

  // Close modal on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-[#0E1015] pt-24 pb-24">
      {/* Top Filter Bar */}
      <div className="sticky top-16 z-30 bg-[#0E1015] border-b border-white/5 py-3">
        <div className="flex items-center gap-3 px-4 md:px-8 max-w-[1920px] mx-auto overflow-x-auto hide-scrollbar">
          <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-[#24262b] text-white hover:bg-white/20 transition-colors">
            <Calendar size={20} />
          </button>
          
          {SPORT_FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-4 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-black'
                    : 'bg-[#24262b] text-white hover:bg-white/20'
                }`}
              >
                {/* Dummy Icons depending on type if you like, but pure text is cleaner for most */}
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 mt-10">
        
        {SCHEDULE_DATA.map((day) => (
          <ScheduleRow 
            key={day.id} 
            day={day} 
            onItemClick={(item) => setSelectedItem(item)} 
          />
        ))}

      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#111317] rounded-[16px] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header Image Area with Fade */}
              <div className="relative w-full aspect-video">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/60 to-transparent" />
                
                {selectedItem.isLocked && (
                  <div className="absolute top-4 left-4 w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-md">
                    <Lock size={14} className="text-black" />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="relative z-10 px-6 pb-8 pt-0 text-center -mt-12">
                <div className="inline-block bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider mb-4">
                  {selectedItem.dateLabel}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {selectedItem.title}
                </h2>
                <p className="text-sm text-[#A0A2A7] mb-8">
                  {selectedItem.subtitle}
                </p>

                <div className="w-full h-[1px] bg-white/10 mb-8" />

                <p className="text-base text-white/80 mb-6 leading-relaxed px-4">
                  Get in on the action and don&apos;t miss the best moments. Subscribe for the full experience
                </p>

                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold text-base py-3.5 px-4 rounded-[4px] transition-colors uppercase tracking-wide">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScheduleRow({ day, onItemClick }: { day: ScheduleDay, onItemClick: (item: ScheduleItem) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slide = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Small timeout to allow checkScroll to run after animation
      setTimeout(checkScroll, 350); 
    }
  };

  // If it's today, we might style the date differently based on screenshots, "TODAY" is yellow
  const isToday = day.isToday;

  return (
    <div className="flex flex-col md:flex-row mb-12 relative group/row">
      {/* Date Column Sidebar (Desktop) / Topbar (Mobile) */}
      <div className="md:w-28 flex-shrink-0 flex md:flex-col items-baseline md:items-start gap-2 md:gap-0 mb-4 md:mb-0 md:pt-2">
        <span className={`text-sm font-bold tracking-wider ${isToday ? 'text-[#f0c800]' : 'text-white/60'}`}>
          {day.dayOfWeek}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-white tracking-widest leading-none">
          {day.dayOfMonth}
        </span>
        <span className="text-xs md:text-sm text-white/50 tracking-widest mt-0.5 md:mt-1">
          {day.month}
        </span>
      </div>

      {/* Cards Scroll Container */}
      <div className="relative flex-1 min-w-0">
        
        {/* Desktop Navigation Controls - Hidden when not hover on row, only if scrollable */}
        {(canScrollLeft || canScrollRight) && (
          <div className="absolute -top-10 md:-top-12 right-0 hidden md:flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
            <button
              onClick={() => slide('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-transparent transition-colors ${
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => slide('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-transparent transition-colors ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Scroll Track */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {day.items.map((item) => (
            <div 
              key={item.id} 
              className="w-[280px] md:w-[320px] flex-shrink-0 flex flex-col gap-3 cursor-pointer group"
              onClick={() => onItemClick(item)}
            >
              <div className="relative aspect-video rounded-md overflow-hidden bg-[#1A1C20]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                
                {/* Bottom dark gradient for tag label */}
                {item.tagLabel && (
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3">
                    <span className="text-white font-bold text-lg drop-shadow-md">
                      {item.tagLabel}
                    </span>
                  </div>
                )}
                
                {/* Top-left Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap max-w-[90%]">
                  {item.isLocked && (
                    <div className="w-5 h-5 bg-white rounded-[3px] flex items-center justify-center shadow-lg">
                      <Lock size={10} className="text-black" />
                    </div>
                  )}
                  {item.badge && (
                    <div className="bg-white text-black text-[10px] font-bold px-1.5 py-[3px] rounded-[3px] uppercase tracking-wider shadow-sm">
                      {item.badge}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-sm md:text-base font-bold text-white leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[#A0A2A7] text-xs mt-1 truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

