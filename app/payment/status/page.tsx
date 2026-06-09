import React from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Loader2, Play } from 'lucide-react';

export default async function PaymentStatusPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  
  const isSuccess = status === 'success';
  const isFailed = status === 'failed';
  const isPending = !status || status === 'pending';

  return (
    <div className="min-h-screen bg-[#050b12] flex items-center justify-center p-4">
       <div className="max-w-md w-full bg-[#10141a] border border-white/10 rounded-sm p-8 text-center shadow-2xl relative overflow-hidden">
          
          {/* subtle background glow */}
          {isSuccess && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-500/20 blur-[100px] pointer-events-none" />}
          {isFailed && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-red-500/20 blur-[100px] pointer-events-none" />}
          {isPending && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#eaff04]/20 blur-[100px] pointer-events-none" />}

          {isPending && (
             <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <Loader2 className="w-16 h-16 text-[#eaff04] animate-spin mb-6" strokeWidth={1.5} />
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">Checking Payment</h1>
                <p className="text-gray-400 font-bold mb-8">Confirm the payment prompt on your phone.</p>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold border-t border-white/10 pt-6 w-full">
                   Do not close this page
                </div>
             </div>
          )}

          {isSuccess && (
             <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" strokeWidth={1.5} />
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">Your fight pass is active</h1>
                <p className="text-gray-400 font-bold mb-8">Payment confirmed. You are ready for Fight Night.</p>
                <Link href="/watch/kato-kasirye-2" className="w-full bg-[#eaff04] text-black font-black uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                   <Play className="w-4 h-4 fill-black text-black" /> Watch Live
                </Link>
             </div>
          )}

          {isFailed && (
             <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <AlertCircle className="w-16 h-16 text-nara-red mb-6" strokeWidth={1.5} />
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">Payment Failed</h1>
                <p className="text-gray-400 font-bold mb-8">We could not confirm this payment. Please try again or use another number.</p>
                <div className="flex flex-col gap-3 w-full">
                   <Link href="/events/kato-kasirye-2" className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-sm hover:bg-gray-200 transition-colors">
                      Try Again
                   </Link>
                   <Link href="/support" className="w-full bg-transparent text-gray-400 border border-white/10 font-bold uppercase tracking-widest py-4 rounded-sm hover:text-white hover:border-white/30 transition-colors">
                      Contact Support
                   </Link>
                </div>
             </div>
          )}

       </div>
    </div>
  );
}
