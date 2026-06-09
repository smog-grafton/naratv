import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Bell, Calendar, Lock, MapPin, Play, Ticket, Users } from 'lucide-react';
import ContentRail from '@/components/blocks/ContentRail';
import ScrollFadeOverlay from '@/components/blocks/ScrollFadeOverlay';
import { getEvent, getHomeRails } from '@/services/home';

export const revalidate = 60;

function formatDate(value?: string | null) {
  if (!value) return 'Date TBA';
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, rails] = await Promise.all([
    getEvent(slug).catch(() => null),
    getHomeRails().catch(() => []),
  ]);

  if (!event) notFound();

  const fighters = event.fighters || [event.fighter_a, event.fighter_b].filter(Boolean);
  const eventCoverage = event.videos?.length
    ? [{
        id: `event-${event.id}-coverage`,
        title: 'Event Coverage',
        titlePrefix: event.source_label,
        type: 'videos' as const,
        layout: 'video' as const,
        items: event.videos,
      }]
    : rails.filter((rail) => /highlight|interview|replay|archive/i.test(`${rail.id} ${rail.title}`)).slice(0, 2);
  const price = event.price && event.price > 0 ? `${event.currency || 'UGX'} ${Number(event.price).toLocaleString()}` : 'Free';

  return (
    <div className="flex flex-col min-h-screen bg-[#050b12]">
      <div className="relative w-full h-[68vh] md:h-[78vh] flex flex-col justify-end bg-black">
        <div className="absolute inset-0 z-0">
          <img src={event.banner_url || event.poster_url || '/assets/images/banner/event_banner.jpg'} alt={event.title} className="w-full h-full object-cover object-top opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-nara-black/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-16 pt-32 md:pt-44 flex flex-col md:flex-row gap-12 md:items-end justify-between">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-20 md:mt-0">
            <div className="bg-[#eaff04] text-black font-black uppercase text-xs md:text-sm tracking-widest px-3 py-1 mb-4 rounded-sm inline-block">
              {event.is_live ? 'Live Now' : event.status}
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">Presented by {event.source_label || 'Nara Promotionz'}</p>

            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {event.title}
            </h1>
            {fighters.length >= 2 && (
              <h2 className="text-xl md:text-3xl font-black text-nara-red uppercase mb-6 tracking-tight">
                {fighters[0]?.name} vs {fighters[1]?.name}
              </h2>
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300 font-bold tracking-wide mb-8 text-sm md:text-base">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(event.start_time)}</span>
              <span className="hidden md:inline text-white/20">|</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {[event.venue, event.city, event.country].filter(Boolean).join(', ') || 'Venue TBA'}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href={`/watch/${event.slug}`} className="bg-[#eaff04] text-black font-bold uppercase tracking-wider py-4 px-10 rounded-sm text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#eaff04]/20">
                <Play className="w-4 h-4 fill-black text-black" /> {event.is_live ? 'Watch Live' : event.status === 'completed' ? 'Watch Replay' : 'Unlock Stream'}
              </Link>
              <Link href={`/checkout?event=${event.slug}`} className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold uppercase tracking-wider py-4 px-10 rounded-sm text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4" /> {price}
              </Link>
              <button className="bg-transparent text-gray-400 font-bold uppercase tracking-wider py-4 px-6 rounded-sm text-sm hover:text-white transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-white/10">
                <Bell className="w-4 h-4" /> Remind Me
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScrollFadeOverlay />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 relative z-20 pb-24 mt-8 flex flex-col min-h-[40vh] gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Fight Card</h2>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Backend managed</span>
            </div>

            <div className="space-y-4">
              {fighters.length > 0 ? fighters.map((fighter, index) => (
                <Link
                  key={fighter?.id || index}
                  href={`/boxers/${fighter?.slug || ''}`}
                  className="bg-[#10141a] border border-nara-border rounded-md p-4 md:p-6 flex items-center justify-between gap-4 hover:border-white/20 transition-colors"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold">{index === 0 ? 'Main Event' : 'Featured Boxer'}</p>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mt-1">{fighter?.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{fighter?.weight_class || fighter?.country || 'Boxer profile'}</p>
                  </div>
                  <Users className="w-5 h-5 text-gray-500" />
                </Link>
              )) : (
                <div className="bg-[#10141a] border border-nara-border rounded-md p-6 text-gray-400">
                  No fighters have been attached to this event yet.
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#0a0f16] border border-nara-border p-6 rounded-md">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Watch Access</h3>
              <div className="p-4 border border-[#eaff04]/50 bg-[#eaff04]/5 rounded-sm">
                <div className="font-bold text-white">{event.access_type === 'free' ? 'Free Stream' : 'Event Pass'}</div>
                <div className="text-sm text-gray-400 mt-1 leading-relaxed">
                  {event.description || 'Watch this event on NaraTV. Access is controlled by your tickets, PPV purchase, or subscription.'}
                </div>
                <div className="text-lg font-black text-[#eaff04] mt-3">{price}</div>
              </div>
              <Link href={`/checkout?event=${event.slug}`} className="w-full mt-6 bg-white text-black hover:bg-gray-200 py-4 font-black uppercase tracking-widest text-sm rounded-sm transition-colors flex justify-center">
                Checkout
              </Link>
              {(event.is_ppv || event.access_type === 'ticket_holder') && (
                <p className="text-xs text-gray-500 mt-3 flex gap-2"><Lock className="w-3 h-3 mt-0.5" /> Paid access unlocks the stream and eligible replays.</p>
              )}
            </div>
          </aside>
        </div>

        <div className="w-full mt-12 space-y-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter border-b border-white/10 pb-4">Event Coverage</h2>
          {eventCoverage.map((rail, index) => (
            <ContentRail key={rail.id} rail={rail} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
