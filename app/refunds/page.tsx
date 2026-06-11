export const metadata = {
  title: 'Refund Policy | NaraTV',
  description: 'NaraTV refund policy for event passes, pay-per-view purchases, and subscriptions.',
};

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-[#050b12] pt-24 text-white">
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#eaff04]">Policy</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Refund Policy</h1>
        <div className="mt-8 space-y-7 text-sm leading-relaxed text-zinc-300 md:text-base">
          <p>Event passes and pay-per-view purchases are normally final once access has been granted or playback has started.</p>
          <p>Refund reviews may be considered when a duplicate payment is confirmed, an event is cancelled without a replay or replacement stream, or a technical issue prevents access after support has verified the account and purchase.</p>
          <p>Subscription renewals can be cancelled from the account area before the next billing date. Access remains active until the paid period expires.</p>
          <p>For payment review, contact support with the account email, phone number used for payment, event or plan name, and transaction reference.</p>
        </div>
      </section>
    </main>
  );
}
