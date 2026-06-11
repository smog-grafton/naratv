'use client';

import { FormEvent, useState } from 'react';
import { Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@naratv.live';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const subject = String(form.get('subject') || 'NaraTV support request').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !email || !message) {
      setStatus('Please add your name, email address, and message.');
      return;
    }

    const body = encodeURIComponent(`${message}\n\nName: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus('Your email app is opening with this message ready to send.');
  };

  return (
    <main className="min-h-screen bg-[#050b12] pt-24 text-white">
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pb-16 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#eaff04]">Contact</p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Talk to NaraTV</h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-300">
            Send a support request for streams, replays, ticket access, subscriptions, or account issues.
          </p>

          <div className="mt-10 space-y-5 text-sm text-zinc-200">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-[#eaff04]" />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-[#eaff04]">{SUPPORT_EMAIL}</a>
            </div>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-[#eaff04]" />
              <span>Kampala, Uganda</span>
            </div>
            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 text-[#eaff04]" />
              <span>Replies are handled by the NaraTV support team.</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {status ? <div className="mb-5 border border-[#eaff04]/30 bg-[#eaff04]/10 p-3 text-sm text-zinc-100">{status}</div> : null}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="text-sm font-bold text-zinc-200">
              Name
              <input name="name" className="mt-2 w-full border border-white/10 bg-[#050b12] px-4 py-3 text-white outline-none focus:border-[#eaff04]" />
            </label>
            <label className="text-sm font-bold text-zinc-200">
              Email
              <input name="email" type="email" className="mt-2 w-full border border-white/10 bg-[#050b12] px-4 py-3 text-white outline-none focus:border-[#eaff04]" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-bold text-zinc-200">
            Subject
            <input name="subject" className="mt-2 w-full border border-white/10 bg-[#050b12] px-4 py-3 text-white outline-none focus:border-[#eaff04]" />
          </label>
          <label className="mt-4 block text-sm font-bold text-zinc-200">
            Message
            <textarea name="message" rows={7} className="mt-2 w-full resize-none border border-white/10 bg-[#050b12] px-4 py-3 text-white outline-none focus:border-[#eaff04]" />
          </label>
          <button className="mt-6 inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-black uppercase tracking-wider text-black hover:bg-[#eaff04]">
            <Send className="h-4 w-4" /> Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
