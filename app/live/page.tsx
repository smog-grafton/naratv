import Link from 'next/link';
import ContentRail from '@/components/blocks/ContentRail';
import { IconPlay } from '@/components/icons';
import { getEvents } from '@/services/home';

export const revalidate = 60;

export default async function LivePage() {
  const [liveEvents, upcomingEvents] = await Promise.all([
    getEvents({ status: 'live', streamable: 1, per_page: 12 }),
    getEvents({ status: 'upcoming', streamable: 1, per_page: 12 }),
  ]);
  const featured = liveEvents[0] || upcomingEvents[0];
  const liveRail = {
    id: 'backend-live-upcoming',
    title: 'Live & Upcoming',
    titlePrefix: 'NaraTV',
    type: 'events' as const,
    layout: 'video' as const,
    items: [...liveEvents, ...upcomingEvents],
  };

  return (
    <main className="min-h-[80vh] bg-nara-black pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-nara-border pb-4">Live TV</h1>

        <div className="mb-12">
          <div className="w-full aspect-video bg-[#10141a] border border-nara-border/40 rounded-sm flex items-center justify-center flex-col shadow-2xl relative overflow-hidden">
            {featured?.poster_url && (
              <img src={featured.poster_url} alt={featured.title} className="absolute inset-0 w-full h-full object-cover opacity-35" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/80 to-transparent" />
            <span className="w-4 h-4 bg-nara-red rounded-full animate-pulse mb-4 z-10" />
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 z-10 uppercase tracking-tight text-center px-4">
              {featured?.title || 'Nara TV Live 24/7 Channel'}
            </h2>
            <p className="text-gray-300 z-10 mb-8 max-w-lg text-center font-medium px-4">
              {featured
                ? [featured.venue, featured.city, featured.country].filter(Boolean).join(', ') || featured.source_label
                : 'Live events will appear here as soon as they are enabled from the backend.'}
            </p>
            <Link
              href={featured ? `/watch/${featured.slug}` : '/schedule'}
              className="bg-white hover:bg-gray-200 text-nara-black font-bold py-3 px-12 rounded-sm transition-colors uppercase tracking-wide text-sm z-10 flex items-center gap-2"
            >
              <IconPlay className="w-5 h-5 fill-current" />
              {featured?.is_live ? 'Watch Stream' : 'View Schedule'}
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 border-b border-nara-border pb-2 inline-block">Live & Upcoming</h2>
        <ContentRail rail={liveRail} />
      </div>
    </main>
  );
}
