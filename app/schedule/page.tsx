import React from 'react';

export default function SchedulePage() {
  const days = [
    { date: 'Today', active: true },
    { date: 'Tomorrow', active: false },
    { date: 'Sat, Jun 6', active: false },
    { date: 'Sun, Jun 7', active: false },
    { date: 'Mon, Jun 8', active: false },
  ];

  return (
    <div className="min-h-[80vh] bg-nara-black pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-nara-border pb-4">Schedule</h1>

        
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-12 pb-2">
          {days.map((day, idx) => (
            <button 
              key={idx}
              className={`px-8 py-2.5 uppercase tracking-wider rounded-sm text-xs font-bold whitespace-nowrap transition-colors ${
                day.active 
                  ? 'bg-white text-nara-black border border-white' 
                  : 'bg-nara-black border border-[#2A2B2E] text-white hover:bg-[#2A2B2E]'
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 max-w-5xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-0 sm:gap-6 bg-[#10141a] rounded-[2px] p-0 sm:p-4 hover:bg-[#181d26] transition-colors border border-transparent hover:border-[#2A2B2E]">
              <div className="w-full sm:w-[220px] aspect-video bg-nara-black overflow-hidden flex-shrink-0">
                <img src={`https://picsum.photos/seed/sched${i}/400/225`} className="w-full h-full object-cover" alt="Schedule Item" />
              </div>
              <div className="flex flex-col justify-center flex-1 p-4 sm:p-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#2A2B2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px]">14:00 EAT</span>
                  <span className="text-white bg-nara-red text-[10px] uppercase font-bold px-2 py-0.5 rounded-[2px] tracking-wider flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                     Live
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Championship Weigh-ins</h3>
                <p className="text-sm text-gray-400 max-w-xl">Live coverage from the official press conference and weigh-ins ahead of the main event. Tune in to see the fighters face off.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
