export const metadata = {
  title: 'Privacy Policy | NaraTV',
  description: 'How NaraTV handles account, payment, device, and viewing data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050b12] pt-24 text-white">
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#eaff04]">Privacy</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Privacy Policy</h1>
        <div className="mt-8 space-y-7 text-sm leading-relaxed text-zinc-300 md:text-base">
          <p>NaraTV uses account details, payment records, device information, and viewing activity to provide secure access to streams, subscriptions, tickets, and replays.</p>
          <p>Payment processing is handled through enabled payment gateways. NaraTV stores payment references and access status, not full card details.</p>
          <p>Device information may be used to protect accounts, support future device limits, and help support diagnose access issues.</p>
          <p>You can contact support to ask about your account data, update your profile, or request help with account access.</p>
        </div>
      </section>
    </main>
  );
}
