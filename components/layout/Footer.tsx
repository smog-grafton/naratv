import React from 'react';
import Link from 'next/link';
import { IconGlobe, IconLogo } from '@/components/icons';
import { getNarapromoUrl } from '@/services/home';

export default function Footer() {
  const narapromoUrl = getNarapromoUrl();

  return (
    <footer className="bg-[#101820] border-t border-white/15 mt-auto w-full pt-12 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <IconLogo className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight">NARA<span className="text-nara-red">TV</span></span>
            </Link>
            <p className="text-zinc-100 text-sm max-w-xs mb-6">
              The premier streaming destination for live boxing, replays, and pay-per-view events.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-100 cursor-pointer hover:text-[#eaff04] transition-colors">
              <IconGlobe className="w-4 h-4" />
              <span>Uganda | English</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Watch</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/live" className="hover:text-[#eaff04] transition-colors">Live TV</Link></li>
              <li><Link href="/schedule" className="hover:text-[#eaff04] transition-colors">Schedule</Link></li>
              <li><Link href="/events" className="hover:text-[#eaff04] transition-colors">Events & PPV</Link></li>
              <li><Link href="/replays" className="hover:text-[#eaff04] transition-colors">Replays</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/help" className="hover:text-[#eaff04] transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-[#eaff04] transition-colors">Contact Us</Link></li>
              <li><Link href="/refunds" className="hover:text-[#eaff04] transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">About</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/about" className="hover:text-[#eaff04] transition-colors">About Nara TV</Link></li>
              <li><a href={narapromoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#eaff04] transition-colors">Nara Promotionz</a></li>
              <li><Link href="/terms" className="hover:text-[#eaff04] transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-[#eaff04] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-100">
          <p>&copy; {new Date().getFullYear()} NaraTV. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#eaff04]">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-[#eaff04]">Privacy Policy and Cookie Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
