'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import PaymentMethodSelector from '@/components/payments/PaymentMethodSelector';

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'ppv'>('monthly');
  const [step, setStep] = useState<1 | 2>(1); // 1: Plan, 2: Payment

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      <header className="bg-[#0a0a0c] border-b border-[#2a2b2e]">
        <div className="max-w-[900px] mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-lg font-black uppercase tracking-tighter hover:opacity-80 transition-opacity">
            <span className="bg-nara-red text-white py-0.5 px-1.5 leading-none mr-1.5 rounded-sm">NARA</span>
            <span className="text-white leading-none">TV</span>
          </Link>
          <div className="text-sm font-bold text-gray-400">Step {step} of 2</div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-4 py-8 md:py-12">
        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Choose your subscription</h1>
              <p className="text-gray-400 text-lg">Cancel anytime. No hidden fees.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
              {/* Annual Plan */}
              <div 
                className={`relative bg-[#1a1b1e] p-6 rounded-md border-2 cursor-pointer transition-all ${selectedPlan === 'annual' ? 'border-white shadow-lg shadow-white/5' : 'border-[#2a2b2e] hover:border-gray-500'}`}
                onClick={() => setSelectedPlan('annual')}
              >
                {selectedPlan === 'annual' && (
                  <div className="absolute top-4 right-4 text-black bg-[#f0c800] rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute -top-3 left-4 bg-green-900/80 text-green-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">Best Value</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Annual Saver</h3>
                <div className="flex items-end gap-1 mb-4 text-white">
                  <span className="text-3xl font-bold">UGX 100,000</span>
                  <span className="text-gray-400 font-medium pb-1">/ year</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 border-b border-[#2a2b2e] pb-6">Save 16% compared to the monthly plan. Billed upfront.</p>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> All live events and fight nights
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> Full replay archive access
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> Multi-device streaming
                  </li>
                </ul>
              </div>

              {/* Monthly Plan */}
              <div 
                className={`relative bg-[#1a1b1e] p-6 rounded-md border-2 cursor-pointer transition-all ${selectedPlan === 'monthly' ? 'border-white shadow-lg shadow-white/5' : 'border-[#2a2b2e] hover:border-gray-500'}`}
                onClick={() => setSelectedPlan('monthly')}
              >
                {selectedPlan === 'monthly' && (
                  <div className="absolute top-4 right-4 text-black bg-[#f0c800] rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute -top-3 left-4 bg-[#2a2b2e] text-gray-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">Most flexible</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Monthly Flex</h3>
                <div className="flex items-end gap-1 mb-4 text-white">
                  <span className="text-3xl font-bold">UGX 10,000</span>
                  <span className="text-gray-400 font-medium pb-1">/ month</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 border-b border-[#2a2b2e] pb-6">Perfect for short-term access. Pay as you go.</p>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> All live events and fight nights
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> Full replay archive access
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> Cancel online anytime
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setStep(2)}
                className="bg-[#f0c800] text-black font-bold text-lg px-20 py-4 rounded-md shadow-md hover:bg-[#e0bb00] transition-all transform hover:scale-[1.02]"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
             {/* Left Col: Payment Method */}
             <div className="md:col-span-3">
               <button 
                 onClick={() => setStep(1)}
                 className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white mb-6 transition-colors"
               >
                 <ArrowLeft className="w-4 h-4" /> Change Plan
               </button>
               <h1 className="text-2xl font-bold mb-6 text-white">How would you like to pay?</h1>
               <div className="bg-[#1a1b1e] p-6 rounded-md shadow-sm border border-[#2a2b2e]">
                 <PaymentMethodSelector 
                    amount={selectedPlan === 'annual' ? 100000 : 10000} 
                    planName={selectedPlan === 'annual' ? 'Annual Saver' : 'Monthly Flex'}
                  />
               </div>
               
               <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                 <ShieldCheck className="w-4 h-4 text-green-500" />
                 Secure, encrypted checkout
               </div>
             </div>

             {/* Right Col: Summary */}
             <div className="md:col-span-2">
               <div className="bg-[#1a1b1e] rounded-md shadow-sm border border-[#2a2b2e] overflow-hidden sticky top-24">
                 <div className="bg-[#2a2b2e]/50 p-4 border-b border-[#2a2b2e]">
                    <h3 className="font-bold text-lg text-white">Order Summary</h3>
                 </div>
                 <div className="p-4 flex flex-col gap-4 border-b border-[#2a2b2e]">
                    <div className="flex justify-between items-start text-white">
                      <div>
                        <div className="font-bold">{selectedPlan === 'annual' ? 'Annual Saver' : 'Monthly Flex'}</div>
                        <div className="text-sm text-gray-400">{selectedPlan === 'annual' ? 'Billed every 12 months' : 'Billed monthly'}</div>
                      </div>
                      <div className="font-bold">UGX {selectedPlan === 'annual' ? '100,000' : '10,000'}</div>
                    </div>
                 </div>
                 <div className="p-4 bg-[#2a2b2e]/30">
                    <div className="flex justify-between items-center font-bold text-lg text-white">
                      <span>Total Due Today</span>
                      <span>UGX {selectedPlan === 'annual' ? '100,000' : '10,000'}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                      By completing this purchase, you agree to the Terms of Service and authorize NARA TV to charge your selected payment method. Subscriptions renew automatically unless cancelled.
                    </p>
                 </div>
               </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
