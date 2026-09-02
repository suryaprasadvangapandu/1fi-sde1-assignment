import Link from 'next/link';
import { Smartphone, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#6938ef] flex items-center justify-center mb-4">
          <Smartphone className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Product Not Found</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          The smartphone you are looking for is either discontinued or does not exist in our 1Fi mutual fund EMI catalog.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#6938ef] hover:bg-[#5323cf] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-purple-500/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Smartphones</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
