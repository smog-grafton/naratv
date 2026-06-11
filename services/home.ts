import { AccessResponse, ContentRail, Event, Fighter, PaymentGateway, SearchResult, SubscriptionPlan, Video } from './types';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');
const TOKEN_KEY = 'nara_auth_token';
const USER_KEY = 'nara_auth_user';

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

export function getNarapromoUrl(path = '') {
  let base = stripTrailingSlash(process.env.NEXT_PUBLIC_NARAPROMO_URL || 'http://localhost:3001');

  if (base === 'http://localhost:3000' || base === 'https://localhost:3000') {
    base = 'http://localhost:3001';
  }

  if (typeof window !== 'undefined' && stripTrailingSlash(base) === window.location.origin && window.location.port === '3000') {
    base = 'http://localhost:3001';
  }

  const suffix = path ? `/${path.replace(/^\//, '')}` : '';
  return `${stripTrailingSlash(base)}${suffix}`;
}

export const stableHeaderNavigation: NavigationItem[] = [
  { id: 'home', key: 'home', label: 'Home', href: '/', icon: 'Home' },
  { id: 'live', key: 'live-cards', label: 'Live Cards', href: '/live', icon: 'Radio' },
  { id: 'videos', key: 'fight-highlights', label: 'Fight Highlights', href: '/videos', icon: 'Zap' },
  { id: 'replays', key: 'archive', label: 'Archive', href: '/replays', icon: 'Archive' },
  { id: 'fighters', key: 'fighter-profiles', label: 'Fighter Profiles', href: getNarapromoUrl('/boxers'), icon: 'User', open_in_new_tab: false, link_type: 'external' },
];

export type AuthUser = {
  id: number | string;
  name: string;
  email?: string | null;
  phone?: string | null;
  bio?: string | null;
  country?: string | null;
  city?: string | null;
  timezone?: string | null;
  schedule_notifications_enabled?: boolean;
  marketing_opt_in?: boolean;
  avatar_url?: string | null;
  created_at?: string | null;
  last_login_at?: string | null;
};

export type AuthPayload = {
  user: AuthUser;
  token: string;
};

export type NavigationItem = {
  id: string;
  key: string;
  label: string;
  href: string;
  icon?: string | null;
  requires_auth?: boolean;
  open_in_new_tab?: boolean;
  link_type?: string;
  visibility_rule?: string;
};

type Envelope<T> = {
  data: T;
  links?: Record<string, unknown>;
  meta?: Record<string, unknown>;
};

export type UserDevice = {
  id: number | string;
  device_name?: string | null;
  device_type?: string | null;
  browser?: string | null;
  platform?: string | null;
  ip_address?: string | null;
  first_used_at?: string | null;
  last_used_at?: string | null;
  revoked_at?: string | null;
  is_current?: boolean;
};

export type AccountDashboard = {
  user: AuthUser;
  active_subscription?: {
    id: number | string;
    status?: string;
    expires_at?: string | null;
    plan?: { id?: number | string; name?: string; slug?: string } | null;
  } | null;
  tickets_count?: number;
  payments_count?: number;
  devices_count?: number;
  current_device?: UserDevice | null;
  continue_watching?: any[];
  recent_payments?: any[];
};

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: init.cache,
    next: init.next,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.message || Object.values(body.errors || {}).flat()[0] || `Request failed (${response.status})`;
    throw new Error(String(message));
  }

  return response.json() as Promise<T>;
}

function authHeaders(token?: string | null): Record<string, string> {
  const activeToken = token ?? getStoredToken();
  return activeToken ? { Authorization: `Bearer ${activeToken}` } : {};
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function storeSession(payload: AuthPayload) {
  window.localStorage.setItem(TOKEN_KEY, payload.token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export async function login(login: string, password: string): Promise<AuthPayload> {
  const json = await api<Envelope<AuthPayload>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, password, device_name: 'naratv-web' }),
  });

  return json.data;
}

export async function register(payload: { name: string; email?: string; phone?: string; password: string; password_confirmation: string }): Promise<AuthPayload> {
  const json = await api<Envelope<AuthPayload>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ ...payload, device_name: 'naratv-web' }),
  });

  return json.data;
}

export async function logout(token?: string | null) {
  await api('/auth/logout', {
    method: 'POST',
    headers: authHeaders(token),
  }).catch(() => null);
}

export async function getMe(token?: string | null): Promise<AuthUser> {
  const json = await api<Envelope<AuthUser>>('/auth/me', {
    headers: authHeaders(token),
    cache: 'no-store',
  });

  return json.data;
}

export async function getGoogleRedirect(next = '/') {
  const frontend = typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_NARATV_URL || 'http://localhost:3001');
  const query = new URLSearchParams({ next, frontend });
  const json = await api<Envelope<{ url: string }>>(`/auth/google/redirect?${query}`, { cache: 'no-store' });
  return json.data.url;
}

export async function getNavigation(): Promise<NavigationItem[]> {
  const json = await api<Envelope<NavigationItem[]>>('/naratv/navigation', { next: { revalidate: 60 } });
  return json.data;
}

export async function getHeaderNavigation(): Promise<NavigationItem[]> {
  const customItems = await getNavigation()
    .then((items) => items.filter((item) => item.link_type === 'custom' || item.link_type === 'external'))
    .catch(() => []);

  const keyed = new Set(stableHeaderNavigation.map((item) => item.key));
  return [
    ...stableHeaderNavigation,
    ...customItems.filter((item) => item.href && !keyed.has(item.key)),
  ];
}

function isLiveInsideWindow(event: Event) {
  if (!event.is_live || !event.streaming?.has_stream) return false;

  const now = Date.now();
  const startsAt = event.streaming.starts_at ? new Date(event.streaming.starts_at).getTime() : null;
  const endsAt = event.streaming.ends_at ? new Date(event.streaming.ends_at).getTime() : null;

  if (startsAt && now < startsAt) return false;
  if (endsAt && now > endsAt) return false;

  return true;
}

export async function getLiveNow(): Promise<Event | null> {
  const events = await getEvents({ status: 'live', streamable: 1, per_page: 10 });
  return events.find(isLiveInsideWindow) || null;
}

export async function getHomeRails(): Promise<ContentRail[]> {
  const json = await api<Envelope<{ rails: ContentRail[]; hero_events: Event[] }>>('/naratv/home', { next: { revalidate: 60 } });
  return json.data.rails;
}

export async function getHeroEvents(): Promise<Event[]> {
  const json = await api<Envelope<{ rails: ContentRail[]; hero_events: Event[] }>>('/naratv/home', { next: { revalidate: 60 } });
  return json.data.hero_events;
}

export async function getPromotionsRails(): Promise<ContentRail[]> {
  const rails = await getHomeRails();
  return rails.filter((rail) => rail.id.startsWith('promo-') || rail.title.toLowerCase().includes('nara'));
}

export async function getVideos(params: Record<string, string | number | undefined> = {}): Promise<Video[]> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });

  const json = await api<Envelope<Video[]>>(`/naratv/videos${query.size ? `?${query}` : ''}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getVideo(slug: string, token?: string | null): Promise<Video> {
  const json = await api<Envelope<Video>>(`/naratv/videos/${encodeURIComponent(slug)}`, {
    headers: authHeaders(token),
    cache: 'no-store',
  });
  return json.data;
}

export async function getEvents(params: Record<string, string | number | undefined> = {}): Promise<Event[]> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });

  const json = await api<Envelope<Event[]>>(`/naratv/events${query.size ? `?${query}` : ''}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getEvent(slug: string): Promise<Event> {
  const json = await api<Envelope<Event>>(`/naratv/events/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getSchedule(limit = 60): Promise<Event[]> {
  const json = await api<Envelope<Event[]>>(`/naratv/schedule?limit=${limit}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getReplays(params: Record<string, string | number | undefined> = {}): Promise<Video[]> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });

  const json = await api<Envelope<Video[]>>(`/naratv/replays${query.size ? `?${query}` : ''}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getFighters(params: Record<string, string | number | undefined> = {}): Promise<Fighter[]> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });

  const json = await api<Envelope<Fighter[]>>(`/naratv/fighters${query.size ? `?${query}` : ''}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getFighter(slug: string): Promise<Fighter> {
  const json = await api<Envelope<Fighter>>(`/naratv/fighters/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  return json.data;
}

export async function getPlans(): Promise<SubscriptionPlan[]> {
  const json = await api<Envelope<SubscriptionPlan[]>>('/naratv/plans', { next: { revalidate: 60 } });
  return json.data;
}

export async function getPaymentGateways(): Promise<PaymentGateway[]> {
  const json = await api<Envelope<PaymentGateway[]>>('/payment-gateways', { next: { revalidate: 60 } });
  return json.data;
}

export async function getVideoAccess(slug: string, token?: string | null): Promise<AccessResponse> {
  const json = await api<Envelope<AccessResponse>>(`/naratv/access/video/${encodeURIComponent(slug)}`, {
    headers: authHeaders(token),
    cache: 'no-store',
  });
  return json.data;
}

export async function getEventAccess(slug: string, token?: string | null): Promise<AccessResponse> {
  const json = await api<Envelope<AccessResponse>>(`/naratv/access/event/${encodeURIComponent(slug)}`, {
    headers: authHeaders(token),
    cache: 'no-store',
  });
  return json.data;
}

export async function checkoutSubscription(payload: { subscription_plan_id: number | string; phone?: string; gateway?: 'iotec' | 'flutterwave' }, token?: string | null) {
  const json = await api<Envelope<any>>('/naratv/subscriptions/subscribe', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return json.data;
}

export async function purchaseEventAccess(slug: string, payload: { event_ticket_id: number | string; quantity?: number; phone?: string; gateway?: 'iotec' | 'flutterwave' | string; coupon_code?: string }, token?: string | null) {
  const json = await api<Envelope<any>>(`/naratv/events/${encodeURIComponent(slug)}/purchase`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ quantity: 1, ...payload }),
  });
  return json.data;
}

export async function searchNaraTv(query: string): Promise<{ results: SearchResult[]; videos: Video[]; events: Event[]; fighters: Fighter[] }> {
  const json = await api<Envelope<{ results?: SearchResult[]; videos: Video[]; events: Event[]; fighters: Fighter[] }>>(`/naratv/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });

  return {
    results: json.data.results || [
      ...(json.data.videos || []).map((video) => ({
        id: `video-${video.id}`,
        type: video.content_type === 'live' ? 'live' : 'video',
        title: video.title,
        description: video.description,
        image_url: video.thumbnail_url,
        url: `/watch/${video.slug}`,
        label: video.category || 'Video',
      })),
      ...(json.data.events || []).map((event) => ({
        id: `event-${event.id}`,
        type: 'event',
        title: event.title,
        description: event.description,
        image_url: event.thumbnail_url || event.poster_url,
        url: `/events/${event.slug}`,
        label: event.status,
      })),
      ...(json.data.fighters || []).map((fighter) => ({
        id: `fighter-${fighter.id}`,
        type: 'fighter',
        title: fighter.name,
        description: [fighter.weight_class, fighter.record?.display].filter(Boolean).join(' | '),
        image_url: fighter.image_url,
        url: `/boxers/${fighter.slug}`,
        label: fighter.country || fighter.nationality || 'Fighter',
      })),
    ],
    videos: json.data.videos || [],
    events: json.data.events || [],
    fighters: json.data.fighters || [],
  };
}

export async function getDashboard(token?: string | null): Promise<AccountDashboard> {
  const json = await api<Envelope<AccountDashboard>>('/naratv/me/dashboard', {
    headers: authHeaders(token),
    cache: 'no-store',
  });

  return json.data;
}

export async function getAccount(token?: string | null): Promise<AccountDashboard> {
  const json = await api<Envelope<AccountDashboard>>('/naratv/me/account', {
    headers: authHeaders(token),
    cache: 'no-store',
  });

  return json.data;
}

export async function updateProfile(payload: Partial<AuthUser>, token?: string | null): Promise<AuthUser> {
  const json = await api<Envelope<AuthUser>>('/naratv/me/profile', {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  return json.data;
}

export async function getDevices(token?: string | null): Promise<UserDevice[]> {
  const json = await api<Envelope<UserDevice[]>>('/naratv/me/devices', {
    headers: authHeaders(token),
    cache: 'no-store',
  });

  return json.data;
}

export async function revokeDevice(deviceId: number | string, token?: string | null) {
  const json = await api<Envelope<{ revoked: boolean }>>(`/naratv/me/devices/${deviceId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  return json.data;
}
