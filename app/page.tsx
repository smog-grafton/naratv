import { getHeroEvents, getHomeRails } from '@/services/home';
import HeroCarousel from '@/components/blocks/HeroCarousel';
import ContentRail from '@/components/blocks/ContentRail';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [heroEvents, rails] = await Promise.all([
    getHeroEvents(),
    getHomeRails()
  ]);

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <HeroCarousel events={heroEvents} />
      
      <div className="flex flex-col gap-2 mt-4 md:mt-8">
        {rails.map((rail) => (
          <ContentRail key={rail.id} rail={rail} />
        ))}
      </div>

      {/* Subscription Plans Promo Section */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-6 mt-16 w-full">
        <div className="bg-gradient-to-r from-nara-surface to-nara-navy border border-nara-border rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Never miss a fight.</h2>
            <p className="text-nara-text-muted text-lg max-w-xl">
              Get access to live boxing, full event replays, exclusive interviews, and the entire Nara TV library.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <Link 
              href="/subscriptions"
              className="bg-nara-red hover:bg-nara-red/90 text-white font-bold py-4 px-8 rounded-sm text-center transition-colors"
            >
              View Plans
            </Link>
            <Link 
              href="/register"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-sm text-center transition-colors border border-white/10"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
