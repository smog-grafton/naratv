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
    <div className="flex flex-col min-h-screen pb-12 relative overflow-hidden bg-gradient-to-b from-nara-black via-[#0a0a0c] to-[#121214]">
      {/* Background ambient glows */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] max-w-[800px] aspect-square rounded-full bg-nara-red/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[60%] max-w-[1000px] aspect-square rounded-full bg-blue-900/5 blur-[150px] pointer-events-none" />

      <HeroCarousel events={heroEvents} />
      
      <div className="flex flex-col gap-2 mt-2 md:mt-4 z-10">
        {rails.map((rail, index) => (
          <ContentRail key={rail.id} rail={rail} index={index} />
        ))}
      </div>

      {/* Subscription Plans Promo Section */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 mt-16 md:mt-24 w-full z-10 relative">
        <div className="bg-[#10141a]/80 backdrop-blur-md rounded-none p-6 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-l-nara-red shadow-2xl">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Never miss a fight.</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Get access to live boxing, full event replays, exclusive interviews, and the entire Nara TV library. Available anytime, anywhere.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <Link 
              href="/subscriptions"
              className="bg-white hover:bg-gray-200 text-nara-black font-bold uppercase tracking-wider py-4 md:py-4 px-10 rounded-[2px] text-center transition-colors text-sm"
            >
              Sign Up
            </Link>
            <Link 
              href="/register"
              className="bg-[#2A2B2E] hover:bg-[#3A3B3E] text-white font-bold uppercase tracking-wider py-4 md:py-4 px-10 rounded-[2px] text-center transition-colors text-sm border border-transparent"
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
