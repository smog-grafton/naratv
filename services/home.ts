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
      id: 'rail-free-best',
      title: 'Best of Nara TV',
      titlePrefix: 'Free to watch',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'fb1', title: 'Greatest Knockouts of 2024', slug: 'fb1', thumbnail_url: 'https://picsum.photos/seed/fb1/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Best of Nara TV' },
        { id: 'fb2', title: 'Top 10 Rivalries', slug: 'fb2', thumbnail_url: 'https://picsum.photos/seed/fb2/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Nara Classics' },
        { id: 'fb3', title: 'Day in the Life: Champ Training', slug: 'fb3', thumbnail_url: 'https://picsum.photos/seed/fb3/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Behind The Scenes' },
        { id: 'fb4', title: 'Ultimate Upsets in Boxing History', slug: 'fb4', thumbnail_url: 'https://picsum.photos/seed/fb4/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Nara Originals' },
        { id: 'fb5', title: 'Fastest Finishes Collection', slug: 'fb5', thumbnail_url: 'https://picsum.photos/seed/fb5/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Highlights' },
      ],
    },
    {
      id: 'rail-free-coming-up',
      title: 'Live and Coming Up',
      titlePrefix: 'Free to watch',
      type: 'events',
      layout: 'video',
      items: [
        { id: 'fc1', title: 'Weigh-ins: Mutebi vs Oketcho', slug: 'fc1', poster_url: 'https://picsum.photos/seed/fc1/800/450', start_time: new Date().toISOString(), is_live: true, is_ppv: false, is_free: true, status: 'live' } as Event,
        { id: 'fc2', title: 'Press Conference', slug: 'fc2', poster_url: 'https://picsum.photos/seed/fc2/800/450', start_time: new Date(Date.now() + 3600000).toISOString(), is_live: false, is_ppv: false, is_free: true, status: 'upcoming' } as Event,
        { id: 'fc3', title: 'Undercard Prelims', slug: 'fc3', poster_url: 'https://picsum.photos/seed/fc3/800/450', start_time: new Date(Date.now() + 86400000).toISOString(), is_live: false, is_ppv: false, is_free: true, status: 'upcoming' } as Event,
        { id: 'fc4', title: 'Fighter Open Workouts', slug: 'fc4', poster_url: 'https://picsum.photos/seed/fc4/800/450', start_time: new Date(Date.now() + 172800000).toISOString(), is_live: false, is_ppv: false, is_free: true, status: 'upcoming' } as Event,
        { id: 'fc5', title: 'Amateur Showcase', slug: 'fc5', poster_url: 'https://picsum.photos/seed/fc5/800/450', start_time: new Date(Date.now() + 259200000).toISOString(), is_live: false, is_ppv: false, is_free: true, status: 'upcoming' } as Event,
      ]
    },
    {
      id: 'rail-free-highlights',
      title: 'Highlights',
      titlePrefix: 'Free to watch',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'fh1', title: 'Kasirye vs Kato: Top Moments', slug: 'fh1', thumbnail_url: 'https://picsum.photos/seed/fh1/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Title Bout Highlights' },
        { id: 'fh2', title: 'Round of the Year Contenders', slug: 'fh2', thumbnail_url: 'https://picsum.photos/seed/fh2/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Fight of the Night' },
        { id: 'fh3', title: 'Bantamweight Unification Recap', slug: 'fh3', thumbnail_url: 'https://picsum.photos/seed/fh3/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Division Review' },
        { id: 'fh4', title: 'Best Angles: Knockout Reel', slug: 'fh4', thumbnail_url: 'https://picsum.photos/seed/fh4/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Slow Motion' },
        { id: 'fh5', title: 'Main Event Summary', slug: 'fh5', thumbnail_url: 'https://picsum.photos/seed/fh5/800/450', video_url: 'dummy', is_premium: false, is_free: true, source_label: 'Post-Fight' },
      ],
    },
    {
      id: 'rail-best-boxing',
      title: 'Best of Boxing',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'v1', title: 'Ramirez vs. Richards: Full Event Replay', slug: 'v1', thumbnail_url: 'https://picsum.photos/seed/bb1/800/450', video_url: 'dummy', is_premium: true, source_label: 'Eye of The Tiger', published_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 'v2', title: 'Zayas vs. Ennis: Run the Tape', slug: 'v2', thumbnail_url: 'https://picsum.photos/seed/bb2/800/450', video_url: 'dummy', is_premium: false, source_label: 'Matchroom Boxing' },
        { id: 'v3', title: 'Padley vs. Fiaz: Press Conference', slug: 'v3', thumbnail_url: 'https://picsum.photos/seed/bb3/800/450', video_url: 'dummy', is_premium: true, source_label: 'Matchroom Boxing', published_at: new Date(Date.now() - 186400000).toISOString() },
        { id: 'v4', title: "Top 10 Boxers in the 2010's", slug: 'v4', thumbnail_url: 'https://picsum.photos/seed/bb4/800/450', video_url: 'dummy', is_premium: false, source_label: "Rummy's Corner" },
        { id: 'v5', title: 'Christian Mbilli: The Ascent', slug: 'v5', thumbnail_url: 'https://picsum.photos/seed/bb5/800/450', video_url: 'dummy', is_premium: false, source_label: 'Riyadh Season' },
      ],
    },
    {
      id: 'rail-dont-miss',
      title: "Don't Miss",
      type: 'mixed',
      layout: 'banner',
      items: [
        { id: 'dm1', title: 'Fury vs Hall', slug: 'fury-hall', thumbnail_url: 'https://picsum.photos/seed/dm1/1200/450', is_premium: true, is_live: false, is_free: false, video_url: 'dummy', category: 'June 13' },
        { id: 'dm2', title: 'Zayas vs Boots', slug: 'zayas-boots', thumbnail_url: 'https://picsum.photos/seed/dm2/1200/450', is_premium: true, is_live: false, is_free: false, video_url: 'dummy', category: 'June 27' },
        { id: 'dm3', title: 'Joshua vs Prenga', slug: 'joshua-prenga', thumbnail_url: 'https://picsum.photos/seed/dm3/1200/450', is_premium: true, is_live: false, is_free: false, video_url: 'dummy', category: 'July 25' },
      ],
    },
    {
      id: 'rail-biggest-fights',
      title: 'The Biggest Fights',
      type: 'events',
      layout: 'poster',
      items: [
        { id: 'bf1', title: 'Padley vs Fiaz', slug: 'padley-fiaz', poster_url: 'https://picsum.photos/seed/bf1/800/1200', start_time: new Date('2026-06-06').toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'Matchroom Boxing' } as Event,
        { id: 'bf2', title: 'Fury vs Hall', slug: 'fury-hall', poster_url: 'https://picsum.photos/seed/bf2/800/1200', start_time: new Date('2026-06-13').toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'Misfits Boxing' } as Event,
        { id: 'bf3', title: 'Bam vs Vargas', slug: 'bam-vargas', poster_url: 'https://picsum.photos/seed/bf3/800/1200', start_time: new Date('2026-06-13').toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'Matchroom Boxing' } as Event,
        { id: 'bf4', title: 'Gonzalez vs Perez', slug: 'gonz-perez', poster_url: 'https://picsum.photos/seed/bf4/800/1200', start_time: new Date('2026-06-14').toISOString(), is_live: false, is_ppv: false, status: 'upcoming', source_label: 'Salita Promotions' } as Event,
        { id: 'bf5', title: 'H2O vs Diaz', slug: 'h2o-diaz', poster_url: 'https://picsum.photos/seed/bf5/800/1200', start_time: new Date('2026-06-19').toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'MF Pro' } as Event,
      ]
    },
    {
      id: 'rail-coming-up',
      title: 'Coming up',
      type: 'events',
      layout: 'video',
      items: [
        { id: 'cu1', title: 'Padley vs Fiaz', slug: 'cu1', poster_url: 'https://picsum.photos/seed/cu1/800/450', start_time: new Date('2026-06-05T15:00:00Z').toISOString(), is_live: false, is_ppv: true, status: 'upcoming' } as Event,
        { id: 'cu2', title: 'Homecoming', slug: 'cu2', poster_url: 'https://picsum.photos/seed/cu2/800/450', start_time: new Date('2026-06-05T16:00:00Z').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
        { id: 'cu3', title: 'Padley vs Fiaz: Prelims', slug: 'cu3', poster_url: 'https://picsum.photos/seed/cu3/800/450', start_time: new Date('2026-06-06T19:15:00Z').toISOString(), is_live: false, is_ppv: true, status: 'upcoming' } as Event,
        { id: 'cu4', title: 'Main Card', slug: 'cu4', poster_url: 'https://picsum.photos/seed/cu4/800/450', start_time: new Date('2026-06-06T21:00:00Z').toISOString(), is_live: false, is_ppv: true, status: 'upcoming' } as Event,
        { id: 'cu5', title: 'Brown vs Vieira', slug: 'cu5', poster_url: 'https://picsum.photos/seed/cu5/800/450', start_time: new Date('2026-06-08T00:00:00Z').toISOString(), is_live: false, is_ppv: true, status: 'upcoming' } as Event,
      ]
    },
    {
      id: 'rail-previous-events',
      title: 'Previous Events',
      type: 'events',
      layout: 'poster',
      items: [
        { id: 'pe1', title: 'Foster vs Ford', slug: 'pe1', poster_url: 'https://picsum.photos/seed/pe1/800/1200', start_time: new Date('2026-05-30').toISOString(), is_live: false, is_ppv: false, status: 'completed', source_label: 'Matchroom Boxing' } as Event,
        { id: 'pe2', title: 'Bivol vs Eifert', slug: 'pe2', poster_url: 'https://picsum.photos/seed/pe2/800/1200', start_time: new Date('2026-05-30').toISOString(), is_live: false, is_ppv: false, status: 'completed', source_label: 'RCC / Matchroom Boxing' } as Event,
        { id: 'pe3', title: 'Terrible vs Delano', slug: 'pe3', poster_url: 'https://picsum.photos/seed/pe3/800/1200', start_time: new Date('2026-05-06').toISOString(), is_live: false, is_ppv: false, status: 'completed', source_label: 'Blood 4 Blood' } as Event,
        { id: 'pe4', title: 'Brown vs Vasquez', slug: 'pe4', poster_url: 'https://picsum.photos/seed/pe4/800/1200', start_time: new Date('2026-05-29').toISOString(), is_live: false, is_ppv: false, status: 'completed', source_label: 'Red Owl Boxing' } as Event,
        { id: 'pe5', title: 'Edwards vs Noothole', slug: 'pe5', poster_url: 'https://picsum.photos/seed/pe5/800/1200', start_time: new Date('2026-05-29').toISOString(), is_live: false, is_ppv: false, status: 'completed', source_label: 'MF Pro' } as Event,
      ]
    },
    {
      id: 'rail-classic-fights',
      title: 'Classic Fights',
      titlePrefix: 'LEGENDARY NAMES',
      description: 'Relive some of the most memorable nights in boxing history with our in-depth archive',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'cf1', title: 'Joshua vs. Klitschko (2017)', slug: 'cf1', thumbnail_url: 'https://picsum.photos/seed/cf1/800/450', video_url: 'dummy', is_premium: true, source_label: 'Matchroom Boxing' },
        { id: 'cf2', title: 'Haye vs. Chisora (2012)', slug: 'cf2', thumbnail_url: 'https://picsum.photos/seed/cf2/800/450', video_url: 'dummy', is_premium: true, source_label: 'Queensberry Promotions' },
        { id: 'cf3', title: 'Fury vs. Chisora 3 (2022)', slug: 'cf3', thumbnail_url: 'https://picsum.photos/seed/cf3/800/450', video_url: 'dummy', is_premium: true, source_label: 'Queensberry Promotions' },
        { id: 'cf4', title: 'Canelo vs. GGG 3 (2022)', slug: 'cf4', thumbnail_url: 'https://picsum.photos/seed/cf4/800/450', video_url: 'dummy', is_premium: true, source_label: 'Canelo vs. GGG III' },
        { id: 'cf5', title: 'Joyce vs. Parker (2022)', slug: 'cf5', thumbnail_url: 'https://picsum.photos/seed/cf5/800/450', video_url: 'dummy', is_premium: true, source_label: 'Queensberry Promotions' },
      ]
    },
    {
      id: 'rail-fighters',
      title: 'Fighters',
      type: 'mixed',
      layout: 'square',
      items: [
        { id: 'ft1', title: 'Tommy Fury', slug: 'tommy-fury', thumbnail_url: 'https://picsum.photos/seed/ft1/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Cruiserweight', source_label: 'GBR' },
        { id: 'ft2', title: 'Eddie Hall', slug: 'eddie-hall', thumbnail_url: 'https://picsum.photos/seed/ft2/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Heavyweight', source_label: 'GBR' },
        { id: 'ft3', title: 'Jesse Rodriguez', slug: 'jesse-rodriguez', thumbnail_url: 'https://picsum.photos/seed/ft3/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Super Flyweight', source_label: 'USA' },
        { id: 'ft4', title: 'Oscar Collazo', slug: 'oscar-collazo', thumbnail_url: 'https://picsum.photos/seed/ft4/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Mini Flyweight', source_label: 'USA' },
        { id: 'ft5', title: 'Xander Zayas', slug: 'xander-zayas', thumbnail_url: 'https://picsum.photos/seed/ft5/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Super Welterweight', source_label: 'PUR' },
        { id: 'ft6', title: 'Jaron Ennis', slug: 'jaron-ennis', thumbnail_url: 'https://picsum.photos/seed/ft6/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Welterweight', source_label: 'USA' },
      ]
    },
    {
      id: 'rail-inside-the-ring',
      title: 'Inside The Ring',
      badge: 'NEW',
      description: 'All the latest boxing news and views every Monday, hosted by Max Kellerman and Mike Coppinger.',
      type: 'videos',
      layout: 'featured-event',
      backgroundImage: 'https://picsum.photos/seed/insidetheringbg/1920/1080',
      items: [
        { id: 'ir1', title: "Rico: 'I Will Show You Something Different'", slug: 'ir1', thumbnail_url: 'https://picsum.photos/seed/ir1/800/450', video_url: 'dummy', is_premium: false, source_label: 'Inside The Ring' },
        { id: 'ir2', title: "Catterall Exclusive - 'I'll Give Rolly a Boxing Lesson'", slug: 'ir2', thumbnail_url: 'https://picsum.photos/seed/ir2/800/450', video_url: 'dummy', is_premium: false, source_label: 'Inside The Ring' },
        { id: 'ir3', title: "Inside The Ring - June 1", slug: 'ir3', thumbnail_url: 'https://picsum.photos/seed/ir3/800/450', video_url: 'dummy', is_premium: true, published_at: new Date('2026-06-01').toISOString(), source_label: 'Inside The Ring' },
        { id: 'ir4', title: "'Let's do it in Germany!' - Kabayel Targets Usyk Showdown", slug: 'ir4', thumbnail_url: 'https://picsum.photos/seed/ir4/800/450', video_url: 'dummy', is_premium: false, source_label: 'Inside The Ring' },
        { id: 'ir5', title: "Canelo Exclusive: 'I'm Excited to Come Back!'", slug: 'ir5', thumbnail_url: 'https://picsum.photos/seed/ir5/800/450', video_url: 'dummy', is_premium: false, source_label: 'Inside The Ring' },
      ]
    },
    {
      id: 'rail-promoters',
      title: 'Promoters',
      type: 'mixed',
      layout: 'square',
      items: [
        { id: 'pr1', title: 'Ring Magazine', slug: 'ring-magazine', thumbnail_url: 'https://picsum.photos/seed/pr1/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', content_type: 'promoter' },
        { id: 'pr2', title: 'Riyadh Season', slug: 'riyadh-season', thumbnail_url: 'https://picsum.photos/seed/pr2/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', content_type: 'promoter' },
        { id: 'pr3', title: 'Top Rank', slug: 'top-rank', thumbnail_url: 'https://picsum.photos/seed/pr3/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', content_type: 'promoter' },
        { id: 'pr4', title: 'Matchroom Boxing', slug: 'matchroom-boxing', thumbnail_url: 'https://picsum.photos/seed/pr4/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', content_type: 'promoter' },
        { id: 'pr5', title: 'Nara Promotionz', slug: 'narapromotionz', thumbnail_url: 'https://picsum.photos/seed/pr5/600/800', is_premium: false, is_live: false, is_free: true, video_url: '', content_type: 'promoter' },
      ]
    },
    {
      id: 'rail-replays-years',
      title: 'Replay The Best Moments Over The Years',
      type: 'videos',
      layout: 'poster',
      items: [
        { id: 'ry1', title: '2025', slug: '2025-highlights', poster_url: 'https://picsum.photos/seed/ry1/800/1200', start_time: new Date('2025-01-01').toISOString(), is_live: false, is_ppv: false, status: 'completed' } as Event,
        { id: 'ry2', title: '2024', slug: '2024-highlights', poster_url: 'https://picsum.photos/seed/ry2/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'completed' } as Event,
        { id: 'ry3', title: '2023', slug: '2023-highlights', poster_url: 'https://picsum.photos/seed/ry3/800/1200', start_time: new Date('2023-01-01').toISOString(), is_live: false, is_ppv: false, status: 'completed' } as Event,
        { id: 'ry4', title: '2022', slug: '2022-highlights', poster_url: 'https://picsum.photos/seed/ry4/800/1200', start_time: new Date('2022-01-01').toISOString(), is_live: false, is_ppv: false, status: 'completed' } as Event,
        { id: 'ry5', title: '2021', slug: '2021-highlights', poster_url: 'https://picsum.photos/seed/ry5/800/1200', start_time: new Date('2021-01-01').toISOString(), is_live: false, is_ppv: false, status: 'completed' } as Event,
      ]
    },
    {
      id: 'rail-trailers',
      title: 'Official Trailers',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'tr1', title: 'Fatal Fury Fight Night in Times Square: Official Trailer', slug: 'tr1', thumbnail_url: 'https://picsum.photos/seed/tr1/800/450', video_url: 'dummy', is_premium: false, source_label: 'Powered by Fatal Fury: City of the Wolves' },
        { id: 'tr2', title: 'Eubank Jr. vs. Benn: Official Trailer', slug: 'tr2', thumbnail_url: 'https://picsum.photos/seed/tr2/800/450', video_url: 'dummy', is_premium: false, source_label: 'Powered by Fatal Fury: City of the Wolves' },
        { id: 'tr3', title: 'Usyk vs. Fury 2: Official Trailer', slug: 'tr3', thumbnail_url: 'https://picsum.photos/seed/tr3/800/450', video_url: 'dummy', is_premium: false, source_label: 'Usyk vs. Fury 2' },
        { id: 'tr4', title: 'Four Crown Showdown: Official Promo Film', slug: 'tr4', thumbnail_url: 'https://picsum.photos/seed/tr4/800/450', video_url: 'dummy', is_premium: false, source_label: 'Four Crown Showdown' },
        { id: 'tr5', title: 'Riyadh Season Card - Wembley Edition: Official Trailer', slug: 'tr5', thumbnail_url: 'https://picsum.photos/seed/tr5/800/450', video_url: 'dummy', is_premium: false, source_label: 'Riyadh Season Card - Wembley Edition' },
      ]
    },
    {
      id: 'rail-shows-docs',
      title: 'Knockout Boxing Shows and Documentaries',
      type: 'videos',
      layout: 'poster',
      items: [
        { id: 'sd1', title: 'Fight Night Raw', slug: 'sd1', poster_url: 'https://picsum.photos/seed/sd1/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
        { id: 'sd2', title: 'Unwrapped', slug: 'sd2', poster_url: 'https://picsum.photos/seed/sd2/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
        { id: 'sd3', title: 'Nara Spotlight', slug: 'sd3', poster_url: 'https://picsum.photos/seed/sd3/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
        { id: 'sd4', title: 'On the Ground', slug: 'sd4', poster_url: 'https://picsum.photos/seed/sd4/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
        { id: 'sd5', title: 'Face Off', slug: 'sd5', poster_url: 'https://picsum.photos/seed/sd5/800/1200', start_time: new Date('2024-01-01').toISOString(), is_live: false, is_ppv: false, status: 'upcoming' } as Event,
      ]
    }
  ];
}

export async function getPromotionsRails(): Promise<ContentRail[]> {
  return [
    {
      id: 'promo-coming-up',
      title: 'Coming Up',
      type: 'events',
      layout: 'square',
      items: [
        { id: 'pc1', title: 'Fight Night 15', slug: 'fight-night-15', poster_url: 'https://picsum.photos/seed/pc1/800/800', start_time: new Date(Date.now() + 86400000 * 5).toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'Nara Promotionz' } as Event,
        { id: 'pc2', title: 'Championship Bout', slug: 'championship-bout', poster_url: 'https://picsum.photos/seed/pc2/800/800', start_time: new Date(Date.now() + 86400000 * 12).toISOString(), is_live: false, is_ppv: true, status: 'upcoming', source_label: 'Nara Promotionz' } as Event,
        { id: 'pc3', title: 'Contender Series', slug: 'contender-series', poster_url: 'https://picsum.photos/seed/pc3/800/800', start_time: new Date(Date.now() + 86400000 * 20).toISOString(), is_live: false, is_ppv: false, status: 'upcoming', source_label: 'Nara Promotionz' } as Event,
      ]
    },
    {
      id: 'promo-replays',
      title: 'Full Event Replays & Highlights',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'pr1', title: 'Season 6 Finale', slug: 'season-6-finale', thumbnail_url: 'https://picsum.photos/seed/pr1/800/450', video_url: 'dummy', is_premium: true, source_label: 'Full Event' },
        { id: 'pr2', title: 'Main Event Extended Cut', slug: 'main-event-extended', thumbnail_url: 'https://picsum.photos/seed/pr2/800/450', video_url: 'dummy', is_premium: true, source_label: 'Highlights' },
        { id: 'pr3', title: 'Title Fight Knockout', slug: 'title-fight-ko', thumbnail_url: 'https://picsum.photos/seed/pr3/800/450', video_url: 'dummy', is_premium: false, source_label: 'Free Clip' },
        { id: 'pr4', title: 'Season 5 Championship', slug: 'season-5', thumbnail_url: 'https://picsum.photos/seed/pr4/800/450', video_url: 'dummy', is_premium: true, source_label: 'Classic' },
      ],
    },
    {
      id: 'promo-fighters',
      title: 'Featured Fighters',
      type: 'mixed',
      layout: 'poster',
      items: [
        { id: 'pf1', title: 'John Kato', slug: 'kato', thumbnail_url: 'https://picsum.photos/seed/pf1/800/1200', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Heavyweight', content_type: 'fighter' },
        { id: 'pf2', title: 'Mike Kasirye', slug: 'kasirye', thumbnail_url: 'https://picsum.photos/seed/pf2/800/1200', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Heavyweight', content_type: 'fighter' },
        { id: 'pf3', title: 'Kabona Meddy', slug: 'meddy', thumbnail_url: 'https://picsum.photos/seed/pf3/800/1200', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Welterweight', content_type: 'fighter' },
        { id: 'pf4', title: 'Ken Da Mexico', slug: 'mexico', thumbnail_url: 'https://picsum.photos/seed/pf4/800/1200', is_premium: false, is_live: false, is_free: true, video_url: '', category: 'Welterweight', content_type: 'fighter' },
      ],
    },
    {
      id: 'promo-locker-room',
      title: 'The Locker Room',
      type: 'videos',
      layout: 'video',
      items: [
        { id: 'plr1', title: 'Training Camp: Kato', slug: 'camp-kato', thumbnail_url: 'https://picsum.photos/seed/plr1/800/450', video_url: 'dummy', is_premium: false, source_label: 'Inside Access' },
        { id: 'plr2', title: 'Coach Interview', slug: 'coach-interview', thumbnail_url: 'https://picsum.photos/seed/plr2/800/450', video_url: 'dummy', is_premium: false, source_label: 'Feature' },
        { id: 'plr3', title: 'Weigh-in Drama', slug: 'weighin-drama', thumbnail_url: 'https://picsum.photos/seed/plr3/800/450', video_url: 'dummy', is_premium: false, source_label: 'Behind The Scenes' },
      ],
    },
    {
      id: 'promo-shows',
      title: 'Shows & Documentaries',
      type: 'videos',
      layout: 'banner',
      items: [
        { id: 'ps1', title: 'Road to Fight Night', slug: 'road-to-fight-night', thumbnail_url: 'https://picsum.photos/seed/ps1/1200/450', video_url: 'dummy', is_premium: true, source_label: 'Docuseries', category: 'Episode 1' },
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
