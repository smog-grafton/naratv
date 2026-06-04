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
    <div className="min-h-[80vh] bg-nara-black pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-nara-border pb-4">Schedule</h1>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-12 pb-2">
          {days.map((day, idx) => (
            <button 
              key={idx}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                day.active 
                  ? 'bg-white text-nara-black' 
                  : 'bg-nara-surface border border-nara-border text-white hover:bg-white/10'
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 max-w-4xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 bg-nara-surface border border-nara-border rounded-lg p-4 hover:border-white/30 transition-colors">
              <div className="w-full sm:w-48 aspect-video bg-nara-black rounded-sm overflow-hidden flex-shrink-0">
                <img src={`https://picsum.photos/seed/sched${i}/400/225`} className="w-full h-full object-cover" alt="Schedule Item" />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/10 text-white text-xs font-medium px-2 py-1 rounded-sm">14:00 EAT</span>
                  <span className="text-nara-red text-xs font-bold uppercase tracking-wider border border-nara-red px-2 py-0.5 rounded-sm">Live</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Championship Weigh-ins</h3>
                <p className="text-sm text-nara-text-muted">Live coverage from the official press conference and weigh-ins ahead of the main event.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
