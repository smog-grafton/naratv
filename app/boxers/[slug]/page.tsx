import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Trophy } from 'lucide-react';
import ContentRail from '@/components/blocks/ContentRail';
import ScrollFadeOverlay from '@/components/blocks/ScrollFadeOverlay';
import { getFighter, getHomeRails } from '@/services/home';

export const revalidate = 60;

export default async function BoxerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [fighter, fallbackRails] = await Promise.all([
    getFighter(slug).catch(() => null),
    getHomeRails().catch(() => []),
  ]);

  if (!fighter) notFound();

  const record = fighter.record || {
    wins: fighter.record_wins || 0,
    losses: fighter.record_losses || 0,
    draws: fighter.record_draws || 0,
    knockouts: fighter.knockouts || 0,
    display: `${fighter.record_wins || 0}-${fighter.record_losses || 0}-${fighter.record_draws || 0}`,
  };
  const videoRail = fighter.videos?.length
    ? [{
        id: `fighter-${fighter.id}-videos`,
        title: `${fighter.name} on NaraTV`,
        titlePrefix: 'Featured',
        type: 'videos' as const,
        layout: 'video' as const,
        items: fighter.videos,
      }]
    : fallbackRails.filter((rail) => /fighter|highlight|interview/i.test(`${rail.id} ${rail.title}`)).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-nara-black">
      <div className="relative w-full min-h-[76vh] md:min-h-[82vh] flex flex-col justify-end bg-[#0a0a0c] overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
          <img src={fighter.image_url || '/assets/images/boxers/boxer-1.jpg'} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nara-black/35 via-nara-black/90 to-nara-black mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-nara-black via-nara-black/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 right-0 md:right-12 w-full max-w-[500px] md:max-w-[760px] h-full flex items-end justify-end opacity-85 z-10 pointer-events-none">
          <img
            src={fighter.image_url || '/assets/images/boxers/boxer-1.jpg'}
            className="w-full h-auto object-cover mask-image-b"
            style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 40%)' }}
            alt={fighter.name}
          />
        </div>

        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-12 border-b border-white/5">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block bg-[#f0c800] text-black font-black uppercase text-xs md:text-sm tracking-widest px-3 py-1 mb-4 rounded-sm">
              {fighter.weight_class || 'Boxer Profile'}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]">
              {fighter.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10">
              {[
                ['Wins', record.wins, 'text-green-500'],
                ['KOs', record.knockouts, 'text-[#f0c800]'],
                ['Draws', record.draws, 'text-blue-500'],
                ['Losses', record.losses, 'text-nara-red'],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className={`text-3xl md:text-4xl font-black ${color}`}>{value}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-t border-white/10 pt-1 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base border-t border-white/10 pt-6 max-w-3xl">
              {[
                ['Stance', fighter.stance],
                ['Age', fighter.age],
                ['Height', fighter.height],
                ['Reach', fighter.reach],
                ['Country', fighter.country || fighter.nationality],
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">{label}</span>
                  <span className="text-white font-bold tracking-wide">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link href="/leaderboards" className="bg-white text-black font-black uppercase tracking-widest px-8 py-3 rounded-sm text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Trophy className="w-4 h-4" /> View Rankings
              </Link>
              <Link href="/schedule" className="bg-[#2A2B2E]/80 backdrop-blur-md text-white border border-[#3A3B3E] font-bold uppercase tracking-wider py-3 px-8 rounded-sm text-sm hover:bg-[#3A3B3E] transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScrollFadeOverlay />

      <div className="w-full relative z-20 pb-24 mt-8 space-y-8">
        {fighter.bio && (
          <section className="max-w-[1100px] mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Profile</h2>
            <p className="text-gray-300 leading-7">{fighter.bio}</p>
          </section>
        )}

        {fighter.related_events && fighter.related_events.length > 0 && (
          <section className="max-w-[1100px] mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Event History</h2>
            <div className="grid gap-3">
              {fighter.related_events.map((event: any) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="border border-white/10 bg-[#10141a] p-4 hover:border-[#eaff04]/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-white font-black uppercase">{event.name || event.title}</h3>
                      <p className="text-gray-400 text-sm">{[event.venue, event.city].filter(Boolean).join(', ') || event.status}</p>
                    </div>
                    <span className="text-xs text-gray-500 font-bold uppercase">{event.event_date || event.start_time || 'Date TBA'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {videoRail.map((rail, index) => (
          <ContentRail key={rail.id} rail={rail} index={index} />
        ))}
      </div>
    </div>
  );
}
