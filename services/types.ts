export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  avatar_url?: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  is_premium: boolean;
  is_live: boolean;
  is_free: boolean;
  category?: string;
  source_label?: string;
  published_at?: string;
  durations_seconds?: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  poster_url: string;
  start_time: string;
  is_live: boolean;
  is_ppv: boolean;
  fighter_a?: Fighter;
  fighter_b?: Fighter;
  status: 'upcoming' | 'live' | 'completed';
  price?: number;
  currency?: string;
}

export interface ContentRail {
  id: string;
  title: string;
  items: (Video | Event)[];
  type: 'mixed' | 'videos' | 'events';
}
