import { AccessResponse, ContentRail, Event, Fighter, SubscriptionPlan, Video } from './types';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');
const TOKEN_KEY = 'nara_auth_token';
const USER_KEY = 'nara_auth_user';

export type AuthUser = {
  id: number | string;
  name: string;
  email?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
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
};

type Envelope<T> = {
  data: T;
  links?: Record<string, unknown>;
  meta?: Record<string, unknown>;
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

export async function getNavigation(): Promise<NavigationItem[]> {
  const json = await api<Envelope<NavigationItem[]>>('/naratv/navigation', { next: { revalidate: 60 } });
  return json.data;
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

export async function purchaseEventAccess(slug: string, payload: { event_ticket_id: number | string; quantity?: number; phone?: string; gateway?: 'iotec' | 'flutterwave' }, token?: string | null) {
  const json = await api<Envelope<any>>(`/naratv/events/${encodeURIComponent(slug)}/purchase`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ quantity: 1, ...payload }),
  });
  return json.data;
}

export async function searchNaraTv(query: string): Promise<{ videos: Video[]; events: Event[]; fighters: Video[] }> {
  const json = await api<Envelope<{ videos: Video[]; events: Event[]; fighters: any[] }>>(`/naratv/search?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });

  return {
    videos: json.data.videos || [],
    events: json.data.events || [],
    fighters: (json.data.fighters || []).map((fighter) => ({
      id: `fighter-${fighter.id}`,
      title: fighter.name,
      slug: fighter.slug,
      thumbnail_url: fighter.image_url,
      video_url: '',
      is_premium: false,
      is_free: true,
      category: fighter.weight_class,
      source_label: fighter.country,
      content_type: 'fighter',
    })),
  };
}

export async function getDashboard(token?: string | null) {
  const json = await api<Envelope<any>>('/naratv/me/dashboard', {
    headers: authHeaders(token),
    cache: 'no-store',
  });

  return json.data;
}
