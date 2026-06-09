'use client';

import React from 'react';
import { X, Play, Lock } from 'lucide-react';

interface PlayerContentSwitcherProps {
  onClose: () => void;
}

// BACKEND INTEGRATION:
// Replace mock watch options with GET /api/v1/watch/{slug}/options.
// Expected fields: label, duration, is_locked, source_type, source_url, access_type.
const watchOptions = [
  { id: 'full', title: 'Full Event Replay', active: true, locked: false, duration: '02:45:10' },
  { id: 'highlights', title: 'Action Highlights', active: false, locked: false, duration: '15:20' },
  { id: 'main', title: 'Main Event Only', active: false, locked: true, duration: '45:00' },
  { id: 'interviews', title: 'Post-Fight Interviews', active: false, locked: false, duration: '22:15' },
];

export default function PlayerContentSwitcher({ onClose }: PlayerContentSwitcherProps) {
  return (
    <div className="bg-[#1c1d21] text-white w-[90%] md:w-[400px] border border-white/10 shadow-2xl rounded shadow-black/80 flex flex-col pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-200 border-t-2 border-t-[#eaff04]">
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h3 className="font-bold text-sm uppercase tracking-wide">Select what you want to watch</h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-2">
        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider px-3 pt-2 pb-1 mb-1">
          Joshua vs. Prenga - Fight Night
        </div>
        
        <div className="flex flex-col gap-1">
          {watchOptions.map((opt) => (
            <button 
              key={opt.id}
              className={`flex items-center justify-between px-3 py-3 rounded text-sm transition-all group ${
                opt.active 
                  ? 'bg-white/10 font-bold border-l-4 border-[#eaff04] -ml-1 pl-4' 
                  : 'hover:bg-white/5 text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {opt.active ? (
                   <span className="w-4 flex justify-center text-[#eaff04]">
                     <Play className="w-4 h-4 fill-current" />
                   </span>
                ) : (
                   <span className="w-4 flex justify-center text-gray-500 group-hover:text-white transition-colors">
                     <Play className="w-4 h-4" />
                   </span>
                )}
                <span>{opt.title}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-mono">{opt.duration}</span>
                {opt.locked && (
                  <Lock className="w-3 h-3 text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/5 bg-black/20 text-xs text-gray-400">
        Some content may require a premium subscription pass.
      </div>
    </div>
  );
}
