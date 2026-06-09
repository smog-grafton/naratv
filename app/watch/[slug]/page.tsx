import Link from 'next/link';
import { Lock, MessageSquare, Play, ShieldCheck } from 'lucide-react';
import ContentRail from '@/components/blocks/ContentRail';
import NaraVideoPlayer from '@/components/player/NaraVideoPlayer';
import { getEvent, getHomeRails, getVideo } from '@/services/home';

export const revalidate = 0;

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [video, event, rails] = await Promise.all([
    getVideo(slug).catch(() => null),
    getEvent(slug).catch(() => null),
    getHomeRails().catch(() => []),
  ]);
  const item = video || event;
  const title = item?.title || slug.replace(/-/g, ' ');
  const poster = video?.thumbnail_url || event?.poster_url || '/assets/images/banner/videos_banner.jpg';
  const playbackUrl = video?.video_url || video?.hls_url || video?.replay_url || null;
  const hasAccess = video ? Boolean(video.has_access || video.can_watch || video.is_free) : Boolean(event?.is_free);
  const isPremium = video ? Boolean(video.is_premium) : Boolean(event?.is_ppv || event?.access_type === 'ticket_holder');
  const relatedRail = rails.find((rail) => /highlight|replay|archive|coming|live/i.test(`${rail.id} ${rail.title}`));

  return (
    <main className="flex flex-col min-h-screen bg-[#050b12]">
      <section className="w-full bg-black relative flex items-center justify-center mt-[60px] md:mt-[72px] lg:mt-[80px] max-w-[1920px] mx-auto border-b border-white/5 shadow-2xl">
        {playbackUrl && hasAccess ? (
          <NaraVideoPlayer
            src={playbackUrl}
            poster={poster}
            title={title}
            isLive={Boolean(video?.is_live || event?.is_live)}
          />
        ) : (
          <div className="w-full relative aspect-[16/9] max-h-[85vh]">
            <img src={poster} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-[#050b12]/80 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
                {isPremium ? <Lock className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white fill-white" />}
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-3 max-w-3xl capitalize tracking-tight">
                {title}
              </h1>
              <p className="text-gray-400 mb-8 max-w-md">
                {isPremium
                  ? 'This content requires a valid ticket, PPV purchase, or subscription before playback unlocks.'
                  : 'Playback is not available yet. The stream or replay URL can be added from the backend admin panel.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-md">
                {isPremium ? (
                  <>
                    <Link href={`/checkout?${event ? 'event' : 'video'}=${slug}`} className="bg-[#eaff04] hover:bg-white text-black font-bold py-3.5 px-8 rounded-sm transition-colors text-center uppercase tracking-wider text-sm">
                      Buy Access
                    </Link>
                    <Link href="/subscriptions" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-sm transition-colors text-center uppercase tracking-wider text-sm">
                      Subscribe
                    </Link>
                  </>
                ) : (
                  <Link href="/schedule" className="bg-white text-black font-bold py-3.5 px-8 rounded-sm transition-colors text-center uppercase tracking-wider text-sm">
                    View Schedule
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-[1920px] mx-auto w-full px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-white/10">
              {video?.category || event?.status || 'NaraTV'}
            </span>
            {isPremium && <span className="bg-[#eaff04] text-black text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">Premium</span>}
            {event?.source_label || video?.source_label ? <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">{event?.source_label || video?.source_label}</span> : null}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-4 capitalize tracking-tight leading-tight">{title}</h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-4xl">
            {video?.description || event?.description || 'Backend-managed NaraTV content.'}
          </p>
        </div>

        <aside className="bg-[#0a1017] border border-white/5 rounded-sm p-5 h-fit">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">Live Interaction</h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Chat and comments are controlled by the backend live stream interaction tools. They will appear here when enabled for this event.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#eaff04]" />
            Access and payment checks are handled by Laravel.
          </div>
        </aside>
      </section>

      {relatedRail && (
        <div className="w-full pb-20 pt-4 bg-[#050b12]">
          <ContentRail rail={relatedRail} />
        </div>
      )}
    </main>
  );
}
