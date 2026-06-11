import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/app/logo.png';
import { IconGlobe } from '@/components/icons';
import { getNarapromoUrl } from '@/services/home';

export default function Footer() {
  const narapromoUrl = getNarapromoUrl();

  return (
    <footer className="bg-[#07111F] border-t border-nara-border mt-auto w-full pt-12 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="relative mb-4 block h-12 w-[168px] overflow-hidden" aria-label="NaraTV home">
              <Image src={logoImage} alt="NaraTV" fill sizes="168px" className="object-contain object-left" />
            </Link>
            <p className="text-zinc-100 text-sm max-w-xs mb-6">
              The premier streaming destination for live boxing, replays, and pay-per-view events.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-100 cursor-pointer hover:text-nara-cyan transition-colors">
              <IconGlobe className="w-4 h-4" />
              <span>Uganda | English</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Watch</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/live" className="hover:text-nara-cyan transition-colors">Live TV</Link></li>
              <li><Link href="/schedule" className="hover:text-nara-cyan transition-colors">Schedule</Link></li>
              <li><Link href="/events" className="hover:text-nara-cyan transition-colors">Events & PPV</Link></li>
              <li><Link href="/replays" className="hover:text-nara-cyan transition-colors">Replays</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/help" className="hover:text-nara-cyan transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-nara-cyan transition-colors">Contact Us</Link></li>
              <li><Link href="/refunds" className="hover:text-nara-cyan transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">About</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-100">
              <li><Link href="/about" className="hover:text-nara-cyan transition-colors">About Nara TV</Link></li>
              <li><a href={narapromoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-nara-cyan transition-colors">Nara Promotionz</a></li>
              <li><Link href="/terms" className="hover:text-nara-cyan transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-nara-cyan transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-100">
          <p>&copy; {new Date().getFullYear()} NaraTV. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-nara-cyan">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-nara-cyan">Privacy Policy and Cookie Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
