import React from 'react';
import Link from 'next/link';

// Add the missing IconCheck component to icons, but we'll import it or define it locally here if missing
const InternalCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-nara-red flex-shrink-0">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function SubscriptionsPage() {
  const plans = [
    {
      id: 'daily',
      name: 'Daily Pass',
      price: '1,000',
      duration: '24 Hours',
      features: ['Access to all live streams', '7-day catchup replays', 'Standard definition'],
      popular: false
    },
    {
      id: 'weekly',
      name: 'Weekly Pass',
      price: '5,500',
      duration: '7 Days',
      features: ['Access to all live streams', 'Full replay library', 'High definition', 'Watch on any device'],
      popular: true
    },
    {
      id: 'monthly',
      name: 'Monthly Pass',
      price: '8,500',
      duration: '30 Days',
      features: ['All weekly features', 'Ad-free experience', 'Exclusive interviews', 'Behind the scenes access'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-nara-black pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-[1920px] mx-auto hidden md:block border-b border-nara-border pb-4 mb-12">
        <h1 className="text-2xl font-bold text-white">Choose your plan</h1>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Unlimited Boxing.</h1>
          <p className="text-nara-text-muted text-lg max-w-xl mx-auto">
            Choose the plan that&apos;s right for you. Change or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-lg border ${
                plan.popular ? 'border-nara-red bg-nara-surface md:-translate-y-4 shadow-2xl shadow-nara-red/10' : 'border-nara-border bg-nara-surface/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nara-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm font-medium text-nara-text-muted">UGX</span>
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>
              
              <div className="border-t border-nara-border pt-6 mb-8 flex-grow">
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-nara-text-muted">
                      <InternalCheck />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={`/checkout?plan=${plan.id}`}
                className={`w-full py-4 text-center rounded-sm font-bold transition-colors ${
                  plan.popular 
                    ? 'bg-nara-red text-white hover:bg-nara-red/90' 
                    : 'bg-white text-nara-black hover:bg-white/90'
                }`}
              >
                Select {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
