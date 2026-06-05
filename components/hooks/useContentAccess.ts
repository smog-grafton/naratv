import { useState, useCallback } from 'react';
import { Video, Event } from '@/services/types';

export type AccessType = 'free' | 'paid' | 'subscription' | 'ticket_holder' | 'ppv';

export interface WatchOption {
  id: string;
  label: string;
  type: string;
  source_url?: string;
  route?: string;
  is_locked: boolean;
  access_type: AccessType;
  duration?: string;
  price?: number;
  currency?: string;
  source_type?: string;
}

export interface ContentNormalized {
  id: string;
  content_type: 'video' | 'replay' | 'live_event' | 'event' | 'highlight' | 'interview' | 'weigh_in' | 'press_conference';
  title: string;
  slug: string;
  thumbnail_url: string;
  poster_url: string;
  access_type: AccessType;
  is_free: boolean;
  is_paid: boolean;
  requires_subscription: boolean;
  has_access: boolean;
  price?: number;
  currency?: string;
  category?: string;
  date_string?: string;
  duration?: string;
  related_fighter_a?: string;
  related_fighter_b?: string;
  watch_options: WatchOption[];
}

// Function to normalize both Video and Event to a common Content structure for the UI
export function normalizeContent(item: any): ContentNormalized {
  const isEvent = item.poster_url !== undefined;
  const isVideoWithUrl = item.video_url !== undefined;
  
  // Dummy logic for prototype: we assume 'is_premium' -> subscription, 'is_ppv' -> ppv.
  const isPremium = item.is_premium || item.is_ppv;
  
  // We'll randomly create some watch options if they don't exist
  let watch_options: WatchOption[] = item.watch_options || [];
  
  if (watch_options.length === 0) {
    if (isEvent) {
       watch_options = [
         { id: '1', label: 'Watch Live', type: 'main', is_locked: isPremium, access_type: item.is_ppv ? 'ppv' : 'subscription', route: `/events/${item.slug}` },
         { id: '2', label: 'Fight Card Preview', type: 'preview', is_locked: false, access_type: 'free', route: `/events/${item.slug}/preview` },
         { id: '3', label: 'Weigh-In', type: 'weigh_in', is_locked: false, access_type: 'free', route: `/events/${item.slug}/weigh-in` }
       ];
    } else {
       watch_options = [
         { id: '1', label: 'Full Replay', type: 'full', is_locked: isPremium, access_type: isPremium ? 'subscription' : 'free', route: `/watch/${item.slug}` },
         { id: '2', label: 'Highlights', type: 'highlight', is_locked: false, access_type: 'free', route: `/watch/${item.slug}?type=highlight` }
       ];
    }
  }

  return {
    id: item.id,
    content_type: isEvent ? (item.status === 'live' ? 'live_event' : 'event') : 'replay',
    title: item.title,
    slug: item.slug,
    thumbnail_url: item.thumbnail_url || item.poster_url,
    poster_url: item.poster_url || item.thumbnail_url,
    access_type: isPremium ? (item.is_ppv ? 'ppv' : 'subscription') : 'free',
    is_free: !isPremium,
    is_paid: isPremium,
    requires_subscription: isPremium && !item.is_ppv,
    has_access: !isPremium, // Dummy access logic: if it's free you have access, otherwise no
    price: item.price,
    currency: item.currency,
    category: item.category,
    date_string: item.start_time || item.published_at,
    duration: item.durations_seconds ? `${Math.floor(item.durations_seconds / 60)}m` : undefined,
    watch_options
  };
}

export function useContentAccess() {
  const [selectedContent, setSelectedContent] = useState<ContentNormalized | null>(null);

  const checkAccess = useCallback((content: ContentNormalized | WatchOption) => {
    if ('has_access' in content) {
      return content.has_access;
    }
    return !content.is_locked;
  }, []);

  return {
    selectedContent,
    setSelectedContent,
    checkAccess
  };
}
