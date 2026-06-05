import Link from 'next/link';
import { Play, Filter, Search, Lock, Unlock, Clock, Trophy, BadgeAlert, ChevronRight } from 'lucide-react';
import ScrollFadeOverlay from '@/components/blocks/ScrollFadeOverlay';

export default function ReplaysPage() {
  const categories = [
    'Full Events', 'Main Events', 'Undercards', 'Highlights', 
    'Interviews', 'Weigh-ins', 'Press Conferences', 'Behind the Scenes'
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-nara-black">
      {/* 1. Hero Section - Sticky Background */}
      <div className="sticky top-0 left-0 w-full z-0 h-[100vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/replayshero2/1920/1080" className="w-full h-full object-cover object-top" alt="Hero Replay" />
          <div className="absolute inset-0 bg-gradient-to-t from-nara-black via-nara-black/70 to-nara-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-nara-black/80 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-12 flex flex-col justify-end h-[100vh] md:h-full pt-[80px] md:pt-[140px] pb-[8vh] md:pb-[10vh]">
          <div className="w-full xl:w-2/3 animate-in slide-in-from-bottom-5 duration-700 fade-in flex flex-col items-start mt-auto md:mt-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-4 md:mb-4 uppercase leading-[0.9]">Watch the fights<br/>you missed</h1>
            <p className="text-gray-300 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl font-medium">
              Full event replays, main events, undercards, interviews, weigh-ins, and post-fight coverage from Nara Promotionz.
            </p>
            
            {/* Featured Replay Banner in Hero */}
            <div className="bg-[#10141a]/90 backdrop-blur-md border border-nara-border/50 p-0 rounded-[2px] w-full max-w-3xl mb-6 md:mb-8 flex flex-row items-stretch hover:bg-nara-black transition-colors min-h-[100px] md:h-[160px]">
               <div className="w-[110px] md:w-[240px] relative flex-shrink-0 group cursor-pointer border-r border-[#2a2b2e] flex">
                 <img src="https://picsum.photos/seed/sweetscience6hero/800/450" className="w-full h-full object-cover" alt="Sweet Science 6" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 md:w-12 md:h-12 border-[1.5px] border-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform bg-black/20 backdrop-blur-sm">
                      <Play className="w-3 h-3 md:w-5 md:h-5 text-white fill-white translate-x-[2px]" />
                    </div>
                 </div>
               </div>
               <div className="flex-1 w-full text-left p-2.5 md:p-6 flex flex-col justify-center">
                 <div className="inline-flex items-center text-[#f0c800] text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1 flex gap-1">
                   <Trophy className="w-2.5 h-2.5 md:w-3 md:h-3" /> Latest Replay
                 </div>
                 <h3 className="text-xs md:text-2xl font-bold text-white mb-0.5 md:mb-2 uppercase tracking-tight leading-tight line-clamp-2 md:line-clamp-1">Sweet Science Season 6</h3>
                 <p className="hidden md:block text-xs text-gray-400 mb-4 line-clamp-2">Watch the full event, main card, and post-fight moments including Kabona Meddy vs Ken Da Mexico.</p>
                 <button className="hidden md:flex bg-nara-red text-white font-bold px-6 py-2 text-xs uppercase tracking-wider rounded-sm hover:bg-red-700 transition-colors items-center justify-center md:justify-start gap-2 w-full md:w-fit mt-auto md:mt-0">
                   <Play className="w-3 h-3 fill-current" /> Watch Replay
                 </button>
               </div>
            </div>

            <div className="flex flex-row md:flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none justify-center bg-white text-nara-black hover:bg-gray-200 font-bold px-4 md:px-8 py-3.5 text-xs md:text-sm uppercase tracking-wider rounded-[2px] transition-colors border border-transparent">
                Browse Latest
              </button>
              <Link href="/subscriptions" className="flex-1 sm:flex-none justify-center flex items-center bg-[#2A2B2E]/80 backdrop-blur-sm text-white hover:bg-[#3A3B3E] font-bold px-4 md:px-8 py-3.5 text-xs md:text-sm uppercase tracking-wider rounded-[2px] transition-colors border border-nara-border">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ScrollFadeOverlay />

      {/* Main Content Area */}
      <div className="relative z-20 bg-[linear-gradient(to_bottom,transparent,rgba(10,10,12,0.9)_5vh,#0a0a0c_12vh)] w-full min-h-screen pb-24 mt-[-5vh] md:mt-[-10vh]">
        
        {/* Navigation Tabs */}
        <div className="sticky top-[56px] md:top-16 z-30 bg-nara-black/95 backdrop-blur-md border-b border-nara-border w-full">
          <div className="max-w-[1920px] mx-auto px-4 md:px-12 hide-scrollbar overflow-x-auto whitespace-nowrap py-4 flex items-center gap-6 md:gap-8">
             {categories.map((cat, i) => (
               <button key={cat} className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors min-w-max ${i === 0 ? 'text-white border-b-2 border-nara-red pb-1' : 'text-gray-500 hover:text-white'}`}>
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto px-4 md:px-12 pt-8 md:pt-12 space-y-16 md:space-y-24">

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-nara-border/50 pb-6 w-full">
             <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
               <button className="flex items-center gap-2 bg-[#1A1C20] hover:bg-[#2A2B2E] px-4 py-2.5 rounded-sm text-xs font-bold text-white border border-nara-border transition-colors whitespace-nowrap">
                 <Filter className="w-3 h-3" /> FILTERS
               </button>
               <select className="bg-[#1A1C20] text-xs text-white font-bold uppercase tracking-wider border border-nara-border rounded-sm px-4 py-2.5 outline-none whitespace-nowrap appearance-none pr-8 relative">
                 <option>All Weight Classes</option>
                 <option>Heavyweight</option>
                 <option>Welterweight</option>
               </select>
               <select className="bg-[#1A1C20] text-xs text-white font-bold uppercase tracking-wider border border-nara-border rounded-sm px-4 py-2.5 outline-none whitespace-nowrap appearance-none pr-8">
                 <option>Newest First</option>
                 <option>Most Watched</option>
               </select>
             </div>
             <div className="relative w-full md:w-72 mt-2 md:mt-0">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
               <input type="text" placeholder="SEARCH REPLAYS..." className="w-full bg-[#1A1C20] border border-nara-border text-white font-bold tracking-wide text-xs px-10 py-2.5 rounded-sm outline-none focus:border-nara-red transition-colors placeholder:text-gray-600" />
             </div>
          </div>

          {/* Continue Watching Section */}
          <section className="w-full animate-in slide-in-from-bottom-8 duration-700 fade-in delay-200">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 uppercase flex items-center gap-2 tracking-tight">
              <Clock className="w-5 h-5 text-nara-red" strokeWidth={3} /> Continue Watching
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
               <div className="bg-[#10141a] border border-nara-border flex flex-row rounded-[2px] overflow-hidden group hover:border-[#4A4B4E] transition-colors cursor-pointer w-full">
                  <div className="w-32 sm:w-40 md:w-32 lg:w-40 aspect-video relative flex-shrink-0">
                    <img src="https://picsum.photos/seed/cw1/800/450" className="w-full h-full object-cover" alt="Continue" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="w-10 h-10 border-[1.5px] border-white text-white rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all">
                         <Play className="w-4 h-4 text-white fill-white translate-x-[2px]" />
                       </div>
                    </div>
                    {/* Progress Bar overlay on thumbnail for small screens */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50">
                       <div className="w-1/3 h-full bg-nara-red"></div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 flex-1 flex flex-col justify-between overflow-hidden">
                    <div>
                      <h3 className="text-white font-bold text-sm uppercase line-clamp-1 truncate tracking-tight">Sweet Science Season 6</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 truncate">You stopped at 1:24:18</p>
                    </div>
                    <div className="mt-2 hidden sm:block">
                       <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                         <div className="w-1/3 h-full bg-nara-red"></div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Full Event Replays */}
          <section className="w-full">
            <div className="flex items-end justify-between border-b-2 border-[#1A1C20] pb-2 mb-6">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                Full Event Replays
                <span className="text-nara-red ml-2 bg-nara-red/10 px-2 flex items-center text-[10px] py-0.5 tracking-widest border border-nara-red/20 transform skew-x-[-12deg]">
                  <span className="skew-x-[12deg]">ARCHIVE</span>
                </span>
              </h2>
              <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center mb-1">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
               {[
                 { title: 'Sweet Science Season 6', subtitle: 'Kabona Meddy vs Ken Da Mexico', date: 'DEC 14, 2025', duration: '4h 20m', access: 'Premium' },
                 { title: 'Fight Night: The Showdown', subtitle: 'Mutebi vs Oketcho', date: 'OCT 12, 2025', duration: '3h 50m', access: 'Premium' },
                 { title: 'Nara Championship 4', subtitle: 'Kasirye vs Kato', date: 'AUG 05, 2025', duration: '5h 10m', access: 'Free' },
                 { title: 'Rising Stars Tour', subtitle: 'Prelims & Main Card', date: 'JUN 22, 2025', duration: '3h 15m', access: 'Free' },
               ].map((item, i) => (
                 <div key={i} className="group cursor-pointer">
                   <div className="aspect-[16/9] relative overflow-hidden bg-nara-surface border border-nara-border rounded-[2px] mb-3 group-hover:border-nara-red/50 transition-colors">
                     <img src={`https://picsum.photos/seed/fullreplays${i}/800/450`} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-nara-black/90 via-transparent to-black/20" />
                     
                     <div className="absolute top-2 left-2 bg-nara-red text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm">
                       Full Event
                     </div>
                     
                     <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white text-[10px] font-mono bg-black/60 px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                       <Play className="w-3 h-3 fill-white" /> {item.duration}
                     </div>

                     <div className={`absolute top-2 right-2 flex gap-1 items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-sm ${item.access === 'Premium' ? 'bg-[#f0c800] text-black' : 'bg-white text-black'}`}>
                       {item.access === 'Premium' ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />} {item.access}
                     </div>
                     
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center">
                       <div className="w-12 h-12 md:w-16 md:h-16 border-[1.5px] border-white text-white rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all">
                         <Play className="w-5 h-5 md:w-6 md:h-6 fill-white translate-x-[2px]" />
                       </div>
                     </div>
                   </div>
                   <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-tight line-clamp-1 mb-0.5">{item.title}</h3>
                   <p className="text-gray-400 text-xs tracking-wide uppercase line-clamp-1 font-medium mb-1.5">{item.subtitle}</p>
                   <p className="text-nara-text-muted text-[10px] font-mono">{item.date}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Main Event Replays (VS Style) */}
          <section className="bg-gradient-to-b from-[#10141a] to-nara-black p-4 md:p-8 lg:p-12 border-y border-nara-border w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-12">
              <div className="flex items-end justify-between border-b-2 border-[#1A1C20] pb-2 mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-[#f0c800]" /> Main Event Fights
                </h2>
                 <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center mb-1">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {[
                  { event: 'Sweet Science 6', fa: 'Kabona Meddy', fb: 'Ken Da Mexico', res: 'KO R4', time: '36 MIN', locked: false, weight: 'Lightweight Bout' },
                  { event: 'Fight Night Showdown', fa: 'John Kato', fb: 'Mike Kasirye', res: 'TKO R2', time: '22 MIN', locked: true, weight: 'Heavyweight Bout' }
                ].map((fight, i) => (
                  <div key={i} className="bg-nara-black border border-nara-border rounded-[2px] p-4 md:p-6 flex flex-col justify-between group hover:border-[#f0c800]/50 transition-colors cursor-pointer relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f0c800]/10 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest border border-gray-700 px-2 py-0.5 rounded-sm">{fight.weight}</span>
                       <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm flex items-center gap-1 ${fight.locked ? 'bg-[#f0c800] text-black' : 'bg-white text-black'}`}>
                         {fight.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />} {fight.locked ? 'Requires Pass' : 'Included'}
                       </span>
                    </div>

                    <div className="flex items-center justify-between mb-8 relative">
                       <div className="text-center w-[35%] z-10 flex flex-col items-center">
                         <div className="relative">
                           <img src={`https://picsum.photos/seed/fighteranew${i}/200/200`} className="w-16 h-16 md:w-24 md:h-24 object-cover object-top rounded-full mx-auto mb-3 border-2 border-[#1A1C20] shadow-xl relative z-10 bg-nara-surface" alt={fight.fa} />
                           {fight.res && <div className="absolute -bottom-2 -right-2 bg-nara-red text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 z-20 shadow-md transform -rotate-6">Winner</div>}
                         </div>
                         <h4 className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-tight">{fight.fa}</h4>
                       </div>
                       
                       <div className="w-[30%] flex justify-center relative z-20">
                         <div className="bg-nara-red text-white text-2xl md:text-3xl font-black italic tracking-tighter px-3 h-10 md:h-12 flex items-center justify-center -skew-x-12 shadow-[5px_5px_0_0_rgb(0,0,0)] z-10 transform -translate-y-2">
                           <span className="skew-x-12 leading-none block pt-1">VS</span>
                         </div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-px bg-gradient-to-r from-transparent via-nara-red/50 to-transparent -z-10" />
                       </div>

                       <div className="text-center w-[35%] z-10 flex flex-col items-center">
                         <img src={`https://picsum.photos/seed/fighterbnew${i}/200/200`} className="w-16 h-16 md:w-24 md:h-24 object-cover object-top rounded-full mx-auto mb-3 border-2 border-[#1A1C20] opacity-60 grayscale shadow-xl bg-nara-surface" alt={fight.fb} />
                         <h4 className="text-gray-400 font-bold text-sm md:text-base uppercase tracking-tight leading-tight">{fight.fb}</h4>
                       </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-nara-border/50 pt-5 mt-auto">
                       <div>
                         <p className="text-white text-sm font-black uppercase tracking-tight">{fight.event}</p>
                         <p className="text-nara-red text-[10px] font-black uppercase tracking-widest mt-0.5">{fight.res} <span className="text-gray-500 ml-1 font-mono">| {fight.time}</span></p>
                       </div>
                       <button className="bg-white text-nara-black hover:bg-gray-200 px-4 py-2.5 text-xs uppercase font-black tracking-widest rounded-sm transition-colors flex items-center justify-center shadow-lg group-hover:scale-105 duration-300 border border-transparent">
                          <Play className="w-3.5 h-3.5 fill-black mr-1.5" /> Watch Fight
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          <section className="w-full">
            <div className="flex items-end justify-between border-b-2 border-[#1A1C20] pb-2 mb-6">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <BadgeAlert className="w-5 h-5 text-nara-red" strokeWidth={3} /> Highlights & Moments
              </h2>
              <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center mb-1">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 w-full">
              {[
                "Best Knockouts of 2025", 
                "Round 12 Drama: Sweet Science 6",
                "Kasirye's Post-Fight Reaction",
                "Weigh-in Chaos",
                "Top 5 Finishes"
              ].map((title, i) => (
                <div key={i} className="group cursor-pointer flex flex-col">
                   <div className="aspect-[4/5] md:aspect-square relative overflow-hidden bg-nara-surface border border-nara-border rounded-[2px] mb-2">
                     <img src={`https://picsum.photos/seed/hlnew${i}/600/800`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-nara-black via-nara-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="absolute bottom-2 left-2 right-2 z-10">
                        <div className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-sm text-[10px] font-mono text-white mb-2 border border-white/10">
                          <Play className="w-2.5 h-2.5 fill-white" /> 04:12
                        </div>
                     </div>
                     
                     <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                       Free
                     </div>
                     
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 border-[1.5px] border-white rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all">
                          <Play className="w-4 h-4 fill-white translate-x-[2px]" />
                        </div>
                     </div>
                   </div>
                   <h4 className="text-white font-bold text-xs md:text-sm uppercase leading-tight line-clamp-2 mt-1">{title}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription/Paywall block */}
          <section className="bg-[#10141a] border-l-4 border-l-nara-red border border-nara-border p-6 md:p-12 w-full flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden rounded-[2px]">
             <div className="relative z-10 w-full md:w-2/3">
               <h2 className="text-2xl md:text-4xl font-black text-white uppercase mb-3 tracking-tighter">Unlock Full Fight Replays</h2>
               <p className="text-gray-400 text-sm md:text-base mb-6 font-medium max-w-xl">Watch premium replays, live events, and exclusive fight-night videos. Upgrade to a Nara Promotionz pass to get instant access.</p>
               
               <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="bg-nara-surface border border-[#2A2B2E] px-5 py-3 rounded-sm flex items-center justify-between min-w-[180px] shadow-sm">
                    <div className="text-nara-text-muted uppercase text-xs font-black tracking-widest">Daily</div>
                    <div className="text-white font-black text-lg shadow-sm">UGX 1K</div>
                  </div>
                  <div className="bg-nara-surface border border-[#2A2B2E] px-5 py-3 rounded-sm flex items-center justify-between min-w-[180px] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-nara-red" />
                    <div className="text-nara-text-muted uppercase text-xs font-black tracking-widest">Monthly</div>
                    <div className="text-white font-black text-lg pr-4">UGX 8.5K</div>
                  </div>
               </div>

               <button className="w-full sm:w-auto bg-white text-nara-black font-black uppercase tracking-widest py-3.5 px-8 text-sm hover:bg-gray-200 transition-colors border border-transparent shadow-md flex items-center justify-center">
                 <Lock className="w-4 h-4 mr-2 text-black" /> Choose a Pass
               </button>
             </div>

             <div className="hidden md:block w-1/3 relative z-10 flex justify-center opacity-80 grayscale">
               <Trophy className="w-40 h-40 text-[#2A2B2E]" strokeWidth={1} />
             </div>
             
             {/* Background glows */}
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-nara-red/5 blur-[100px] rounded-full pointer-events-none" />
             <div className="absolute top-0 left-1/2 w-80 h-80 bg-blue-900/5 blur-[100px] rounded-full pointer-events-none" />
          </section>

        </div>
      </div>
    </div>
  );
}
