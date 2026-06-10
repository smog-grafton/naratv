import WatchExperience from '@/components/watch/WatchExperience';
import type { Metadata } from 'next';
import { getEvent, getHomeRails, getVideo } from '@/services/home';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [video, event] = await Promise.all([
    getVideo(slug).catch(() => null),
    getEvent(slug).catch(() => null),
  ]);
  const content = video || event;

  if (!content) {
    return { title: 'Watch | Nara TV' };
  }

  const title = content.seo?.title || `${content.title} | Nara TV`;
  const description = content.seo?.description || content.description || `Watch ${content.title} on Nara TV.`;
  const image = content.seo?.og_image || ('thumbnail_url' in content ? content.thumbnail_url : content.banner_url || content.poster_url);
  const url = content.seo?.canonical || `/watch/${content.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [video, event, rails] = await Promise.all([
    getVideo(slug).catch(() => null),
    getEvent(slug).catch(() => null),
    getHomeRails().catch(() => []),
  ]);
  const relatedRail = rails.find((rail) => /highlight|replay|archive|coming|live/i.test(`${rail.id} ${rail.title}`));

  return <WatchExperience slug={slug} initialVideo={video} initialEvent={event} relatedRail={relatedRail} />;
}
