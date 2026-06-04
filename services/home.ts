import { ContentRail, Event, Video } from './types';

// Mock data generator for the frontend prototype
const MOCK_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Generate some dummy content
const generateDummyVideos = (count: number, prefix: string): Video[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `v-${prefix}-${i}`,
    title: `${prefix} Fight Highlights ${i + 1}`,
    slug: `${prefix.toLowerCase().replace(/ /g, '-')}-highlights-${i + 1}`,
    thumbnail_url: `https://picsum.photos/seed/${prefix}${i}/800/450`,
    video_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    is_premium: i % 3 === 0,
    is_free: i % 3 !== 0,
    is_live: false,
    source_label: 'Nara Boxing',
    published_at: new Date().toISOString(),
  }));
};

export async function getHomeRails(): Promise<ContentRail[]> {
  return [
    {
      id: 'rail-dont-miss',
      title: "Don't Miss",
      type: 'mixed',
      layout: 'banner',
      items: generateDummyVideos(4, 'Don\'t Miss Event'),
    },
    {
      id: 'rail-biggest-fights',
      title: 'The Biggest Fights',
      type: 'events',
      layout: 'poster',
      items: generateDummyVideos(8, 'Fighter Title Match'),
    },
    {
      id: 'rail-locker-room',
      title: 'The Locker Room - Latest Features',
      type: 'videos',
      layout: 'video',
      items: generateDummyVideos(8, 'Fighter Feature').map(v => ({ ...v, category: 'Day In The Life' })),
    },
    {
      id: 'rail-live-tv',
      title: 'Live TV',
      type: 'videos',
      layout: 'video',
      items: generateDummyVideos(6, 'Live Channel').map(v => ({ ...v, is_live: true, durations_seconds: 3600 })),
    },
    {
      id: 'rail-highlights',
      title: 'Latest Fight Highlights',
      type: 'videos',
      layout: 'video',
      items: generateDummyVideos(8, 'Fight Highlights'),
    },
    {
      id: 'rail-featured-event',
      title: 'Undisputed World Championship',
      type: 'videos',
      layout: 'featured-event',
      badge: 'NARA.TV LIVE',
      description: "The road to undisputed glory. Watch exclusive behind-the-scenes access and the complete chase for boxing's ultimate prize.",
      backgroundImage: 'https://picsum.photos/seed/naratv-boxing/1920/1080',
      items: generateDummyVideos(6, 'Championship'),
    },
    {
      id: 'rail-replays',
      title: 'Full Event Replays & Highlights',
      type: 'videos',
      layout: 'video',
      items: generateDummyVideos(8, 'Full Event Replay'),
    },
    {
      id: 'rail-top-sports',
      title: 'Top Sports and Competitions',
      type: 'mixed',
      layout: 'square',
      items: [
        { id: 'cat-boxing', title: 'Boxing', slug: 'cat-boxing', thumbnail_url: 'https://picsum.photos/seed/cat-boxing/500/500', is_premium: false, is_live: false, is_free: true, video_url: '' },
        { id: 'cat-fifa', title: 'FIFA+', slug: 'cat-fifa', thumbnail_url: 'https://picsum.photos/seed/cat-fifa/500/500', is_premium: false, is_live: false, is_free: true, video_url: '' },
        { id: 'cat-nhl', title: 'NHL.TV', slug: 'cat-nhl', thumbnail_url: 'https://picsum.photos/seed/cat-nhl/500/500', is_premium: false, is_live: false, is_free: true, video_url: '' },
        { id: 'cat-rally', title: 'Rally TV', slug: 'cat-rally', thumbnail_url: 'https://picsum.photos/seed/cat-rally/500/500', is_premium: false, is_live: false, is_free: true, video_url: '' },
      ],
    }
  ];
}

export async function getHeroEvents(): Promise<Event[]> {
  return [
    {
      id: 'evt-1',
      title: 'Nara Fight Night: The Showdown',
      slug: 'nara-fight-night-showdown',
      poster_url: 'https://picsum.photos/seed/hero1/1920/1080',
      start_time: new Date().toISOString(),
      is_live: true,
      is_ppv: true,
      status: 'live',
      fighter_a: { id: 'f1', name: 'Mutebi', nickname: 'The Lion' },
      fighter_b: { id: 'f2', name: 'Oketcho', nickname: 'Storm' },
      price: 5000,
      currency: 'UGX'
    },
    {
      id: 'evt-2',
      title: 'Championship Bout: Kasirye vs Kato',
      slug: 'kasirye-vs-kato',
      poster_url: 'https://picsum.photos/seed/hero2/1920/1080',
      start_time: new Date(Date.now() + 86400000).toISOString(),
      is_live: false,
      is_ppv: true,
      status: 'upcoming',
      price: 10000,
      currency: 'UGX'
    }
  ];
}
