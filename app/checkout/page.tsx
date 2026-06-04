'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconLock } from '@/components/icons';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan') || 'weekly';
  const event = searchParams.get('event');
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const priceMap: Record<string, string> = {
    daily: '1,000',
    weekly: '5,500',
    monthly: '8,500'
  };

  const amount = event ? '5,000' : priceMap[plan] || '0';
  const title = event ? 'Pay-Per-View: Event Pass' : `${plan.charAt(0).toUpperCase() + plan.slice(1)} Pass`;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-nara-black py-12 px-4">
      <div className="w-full max-w-md bg-nara-surface border border-nara-border rounded-lg shadow-2xl overflow-hidden">
        
        <div className="bg-nara-black p-6 border-b border-nara-border">
          <h1 className="text-xl font-bold text-white mb-1">Checkout</h1>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-sm text-nara-text-muted">{title}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-nara-text-muted uppercase">Total</p>
              <p className="text-2xl font-bold text-white">UGX {amount}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">Mobile Money Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-nara-text-muted select-none">+256</span>
              <input 
                type="tel" 
                required
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="772 123 456"
                className="w-full bg-nara-black border border-nara-border rounded-sm py-3 pl-16 pr-4 text-white outline-none focus:border-nara-red transition-colors"
              />
            </div>
            <p className="text-xs text-nara-text-muted mt-2">Enter your MTN or Airtel number to receive the prompt.</p>
          </div>

          <button 
            type="submit"
            disabled={loading || phoneNumber.length < 9}
            className="w-full bg-nara-red hover:bg-nara-red/90 text-white font-bold py-4 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <IconLock className="w-4 h-4 fill-current" />
                Pay UGX {amount}
              </>
            )}
          </button>

          <p className="text-center text-xs text-nara-text-muted mt-4">
            By paying, you agree to our <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
