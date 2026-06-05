'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ContentNormalized } from '@/components/hooks/useContentAccess';
import { useRouter } from 'next/navigation';

interface Props {
  item: ContentNormalized;
  onClose: () => void;
}

export default function AccessPaywallModal({ item, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCTA = () => {
    // In real flow, redirect to auth or payment flow passing the item.id
    router.push('/subscribe');
    onClose();
  };

  const ctaText = item.access_type === 'ticket_holder' 
    ? 'Buy Fight Pass' 
    : item.access_type === 'ppv' 
      ? 'Unlock this fight' 
      : 'Subscribe';
      
  // Text for message
  const messageText = item.access_type === 'ppv'
    ? 'Get in on the action and don’t miss the best moments. Purchase the PPV to unlock the full replay.'
    : 'Get in on the action and don’t miss the best moments. Subscribe for the full experience.';

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="relative bg-[#0a0a0c] w-full max-w-[480px] rounded-[8px] overflow-hidden shadow-2xl flex flex-col scale-100 transition-transform duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative w-full aspect-[4/3] bg-[#1a1b1e]">
             <img 
              src={item.poster_url || item.thumbnail_url} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* Very strong bottom gradient to blend perfectly into the bg */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
          </div>

          <div className="px-6 pb-8 -mt-6 relative z-10 flex flex-col items-center text-center">
             {item.date_string && (
                <div className="mb-3">
                  <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase">
                    {item.date_string}
                  </span>
                </div>
              )}
             <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h2>
             <p className="text-[#f0c800] text-xs font-bold uppercase tracking-wider mb-6">
                {item.category || 'Nara Promotionz'}
             </p>

             <div className="w-full max-w-[80%] mx-auto h-[1px] bg-[#2a2b2e] mb-6" />

             <p className="text-[13px] text-gray-300 leading-relaxed mb-6">
               {messageText}
             </p>

             <button
               onClick={handleCTA}
               className="w-full max-w-xs bg-white text-black font-bold py-3.5 px-6 rounded-[4px] hover:bg-gray-200 transition-colors text-sm"
             >
               {ctaText}
             </button>
          </div>
        </div>
      </div>
    </>
  );
}
