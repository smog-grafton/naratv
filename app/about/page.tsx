import Link from 'next/link';
import { Radio, Trophy, Video } from 'lucide-react';

const pillars = [
  {
    Icon: Radio,
    title: 'Live events',
    body: 'Backend-controlled stream windows keep live cards accurate and available when the event is active.',
  },
  {
    Icon: Video,
    title: 'Replays and highlights',
    body: 'The video library is organized by category, access type, and editorial sections from the admin panel.',
  },
  {
    Icon: Trophy,
    title: 'Fighter stories',
    body: 'Fighter profiles connect athletes to the events, bouts, and videos they are part of.',
  },
];

export const metadata = {
  title: 'About | NaraTV',
  description: 'NaraTV streams live boxing, fight-night replays, fighter stories, and premium event coverage.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050b12] pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#eaff04]">About</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">NaraTV is built for fight night.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
          NaraTV brings live boxing, premium event streams, replays, highlights, interviews, and fighter-driven stories into one focused viewing experience.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map(({ Icon, title, body }) => (
            <article key={title} className="border border-white/10 bg-white/[0.03] p-6">
              <Icon className="mb-5 h-6 w-6 text-[#eaff04]" />
              <h2 className="mb-3 text-lg font-black">{title}</h2>
              <p className="text-sm leading-relaxed text-zinc-300">{body}</p>
            </article>
          ))}
        </div>
        <Link href="/events" className="mt-10 inline-flex rounded-sm bg-white px-6 py-3 text-sm font-black uppercase tracking-wider text-black hover:bg-[#eaff04]">
          Explore Events
        </Link>
      </section>
    </main>
  );
}
