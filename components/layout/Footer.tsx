import React from 'react';
import Link from 'next/link';
import { IconGlobe, IconLogo } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-nara-black border-t border-nara-border mt-auto w-full pt-12 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <IconLogo className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight">NARA<span className="text-nara-red">TV</span></span>
            </Link>
            <p className="text-gray-300 text-sm max-w-xs mb-6">
              The premier streaming destination for live boxing, replays, and pay-per-view events.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
              <IconGlobe className="w-4 h-4" />
              <span>Uganda | English</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Watch</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li><Link href="/live" className="hover:text-white transition-colors">Live TV</Link></li>
              <li><Link href="/schedule" className="hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events & PPV</Link></li>
              <li><Link href="/replays" className="hover:text-white transition-colors">Replays</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/refunds" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">About</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Nara TV</Link></li>
              <li><a href="https://narapromotionz.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nara Promotionz</a></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-nara-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300">
          <p>&copy; {new Date().getFullYear()} Nara Promotionz / Nara TV. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/imprint" className="hover:text-white">Imprint</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy and Cookie Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
