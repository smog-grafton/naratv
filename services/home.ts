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
  // In a real app we'd fetch from MOCK_API_BASE + '/home/rails'
  // For the AI Studio prototype, we'll return structured dummy data
  
  return [
    {
      id: 'rail-free',
      title: 'Free to watch',
      type: 'videos',
      items: generateDummyVideos(8, 'Free Action'),
    },
    {
      id: 'rail-biggest',
      title: 'Biggest Fights',
      type: 'videos',
      items: generateDummyVideos(8, 'Championship'),
    },
    {
      id: 'rail-replays',
      title: 'Premium Replays',
      type: 'videos',
      items: generateDummyVideos(6, 'Full Replay').map(v => ({ ...v, is_premium: true, is_free: false })),
    },
    {
      id: 'rail-interviews',
      title: 'Interviews & Press Conferences',
      type: 'videos',
      items: generateDummyVideos(6, 'Interview'),
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
