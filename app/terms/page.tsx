export const metadata = {
  title: 'Terms of Use | NaraTV',
  description: 'Terms for using NaraTV streaming, replays, subscriptions, and pay-per-view access.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050b12] pt-24 text-white">
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#eaff04]">Legal</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Terms of Use</h1>
        <div className="mt-8 space-y-7 text-sm leading-relaxed text-zinc-300 md:text-base">
          <p>NaraTV provides access to boxing streams, replays, videos, account features, subscriptions, and event passes.</p>
          <p>You are responsible for keeping your account secure. Paid access is attached to your account and may not be resold, shared publicly, rebroadcast, recorded for distribution, or used to bypass platform restrictions.</p>
          <p>Live streams may depend on event schedules, venue production, network quality, and backend availability. NaraTV may update schedules, replace a live stream with a replay, or restrict access when required by rights, safety, or payment checks.</p>
          <p>Continued use of NaraTV means you accept these terms and any policy updates published on this site.</p>
        </div>
      </section>
    </main>
  );
}
