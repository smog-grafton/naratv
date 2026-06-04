import React from 'react';
import Link from 'next/link';
import { Video, Event } from '@/services/types';
import { IconPlay, IconLock } from '@/components/icons';

// Type guard
const isVideo = (item: Video | Event): item is Video => {
  return (item as Video).video_url !== undefined;
};

export default function VideoCard({ item }: { item: Video | Event }) {
  const isVid = isVideo(item);
  const title = item.title;
  const image = isVid ? item.thumbnail_url : (item as Event).poster_url;
  const link = isVid ? `/watch/${item.slug}` : `/events/${item.slug}`;

  return (
    <Link href={link} className="group flex flex-col w-full h-full outline-none">
      <div className="relative w-full aspect-video bg-nara-navy rounded-sm overflow-hidden mb-2 border border-nara-border">
        {/* Image */}
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105" 
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-nara-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.is_live && (
            <span className="bg-nara-red text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-sm flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
              Live
            </span>
          )}
          {isVid && !item.is_live && (
            <span className="bg-nara-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 tracking-wider rounded-sm">
              Replay
            </span>
          )}
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-2 right-2 flex gap-1">
          {isVid && item.is_premium ? (
            <div className="bg-nara-black/80 backdrop-blur-sm p-1 rounded-sm text-white">
              <IconLock className="w-3 h-3" />
            </div>
          ) : null}
          {!isVid && (item as Event).is_ppv ? (
            <span className="bg-nara-blue-rich text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              PPV
            </span>
          ) : null}
        </div>

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-90 group-hover:scale-100 transition-transform">
            <IconPlay className="w-6 h-6 fill-current ml-1" />
          </div>
        </div>

        {/* Bottom Left Duration/Status */}
        {isVid && item.durations_seconds ? (
          <div className="absolute bottom-2 left-2 bg-nara-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 rounded-sm">
            {Math.floor(item.durations_seconds / 60)}:{String(item.durations_seconds % 60).padStart(2, '0')}
          </div>
        ) : null}
        
        {/* Source Label overlay (DAZN style bottom right logo/text) */}
        {isVid && item.source_label && (
           <div className="absolute bottom-2 right-2 text-white/80 text-[10px] font-bold tracking-wider uppercase drop-shadow-md">
             {item.source_label}
           </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight group-hover:text-nara-red group-focus-visible:text-nara-red transition-colors">
          {title}
        </h3>
        {isVid && item.category && (
          <p className="text-xs text-nara-text-muted mt-1">{item.category}</p>
        )}
        {!isVid && (item as Event).start_time && (
          <p className="text-xs text-nara-text-muted mt-1">
            {new Date((item as Event).start_time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>
    </Link>
  );
}
