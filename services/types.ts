export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  avatar_url?: string;
  image_url?: string;
  slug?: string;
  weight_class?: string;
  country?: string;
  nationality?: string;
  stance?: string;
  height?: string;
  reach?: string;
  age?: number;
  bio?: string;
  record_wins?: number;
  record_losses?: number;
  record_draws?: number;
  knockouts?: number;
  record?: {
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    display: string;
  };
  related_events?: Event[];
  videos?: Video[];
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail_url: string;
  video_url?: string | null;
  hls_url?: string | null;
  replay_url?: string | null;
  is_premium: boolean;
  is_live?: boolean;
  is_free?: boolean;
  has_access?: boolean;
  can_watch?: boolean;
  requires_subscription?: boolean;
  access_type?: 'free' | 'paid' | 'subscription' | 'ticket_holder' | 'ppv' | 'premium';
  category?: string;
  source_label?: string;
  published_at?: string;
  durations_seconds?: number;
  duration_seconds?: number;
  content_type?: string;
  progress?: number; // 0-100%
  price?: number;
  currency?: string;
  watch_url?: string;
  purchase_url?: string | null;
  subscription_url?: string | null;
  watch_options?: WatchOption[];
  event?: Event;
  fighters?: Fighter[];
  replay_unavailable?: boolean;
}

export interface Event {
  id: string;
  title: string;
  name?: string;
  slug: string;
  poster_url: string;
  thumbnail_url?: string;
  banner_url?: string;
  description?: string;
  start_time?: string | null;
  starts_at?: string | null;
  venue?: string;
  city?: string;
  country?: string;
  is_live: boolean;
  is_ppv: boolean;
  is_free?: boolean;
  fighter_a?: Fighter;
  fighter_b?: Fighter;
  fighters?: Fighter[];
  status: 'upcoming' | 'live' | 'completed';
  price?: number;
  currency?: string;
  source_label?: string;
  category?: string;
  progress?: number; // 0-100%
  access_type?: 'free' | 'paid' | 'subscription' | 'ticket_holder' | 'ppv';
  watch_url?: string;
  purchase_url?: string | null;
  subscription_url?: string | null;
  replay_url?: string | null;
  streaming?: {
    has_stream?: boolean;
    stream_status?: string | null;
    watch_url?: string;
    replay_available?: boolean;
  };
  tickets?: any[];
  videos?: Video[];
  watch_options?: WatchOption[];
}

export interface WatchOption {
  id: string;
  label: string;
  type: string;
  source_url?: string;
  route?: string;
  is_locked: boolean;
  access_type: 'free' | 'paid' | 'subscription' | 'ticket_holder' | 'ppv' | 'premium';
  duration?: string;
  price?: number;
  currency?: string;
  source_type?: string;
}

export interface SubscriptionPlan {
  id: number | string;
  name: string;
  slug: string;
  description?: string | null;
  duration_days: number;
  price: number;
  currency: string;
  formatted_price?: string;
  features: string[];
  unlocks_live_events?: boolean;
  unlocks_replays?: boolean;
  unlocks_paid_videos?: boolean;
  is_active?: boolean;
  sort_order?: number;
}

export interface AccessResponse {
  has_access: boolean;
  can_watch?: boolean;
  reason: string;
  access_type: string;
  requires_payment: boolean;
  requires_subscription: boolean;
  login_required?: boolean;
  purchase_url?: string | null;
  subscription_url?: string | null;
  playback_url?: string | null;
}

export interface ContentRail {
  id: string;
  title: string;
  titlePrefix?: string;
  items: (Video | Event)[];
  type: 'mixed' | 'videos' | 'events';
  layout?: 'banner' | 'poster' | 'video' | 'square' | 'featured-event';
  badge?: string;
  description?: string;
  backgroundImage?: string;
}
