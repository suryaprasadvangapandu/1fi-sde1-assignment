import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6938ef] to-[#5323cf] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/30">
                <span className="text-lg tracking-tighter flex items-center font-extrabold">
                  <span className="text-xs mr-0.5">↑</span>1Fi
                </span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                1Fi <span className="text-[#9b7bf7] font-normal text-sm">Fintech</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering smart buyers to purchase flagship smartphones with 0% No-Cost EMI plans backed by their mutual fund portfolios without selling their investments.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>SEBI & RBI Regulated Ecosystem</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Featured Smartphones
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products/iphone-17-pro" className="hover:text-purple-400 transition-colors">
                  Apple iPhone 17 Pro (256GB / 512GB / 1TB)
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-s24-ultra" className="hover:text-purple-400 transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/google-pixel-9-pro" className="hover:text-purple-400 transition-colors">
                  Google Pixel 9 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/oneplus-13" className="hover:text-purple-400 transition-colors">
                  OnePlus 13 Flagship
                </Link>
              </li>
            </ul>
          </div>

          {/* Mutual Fund EMI Benefits */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              1Fi Advantages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                Zero Mutual Fund Liquidation
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                0% No-Cost EMI Tenures
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                Flat ₹7,500 Additional Cashback
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                Zero Prepayment / Foreclosure Charges
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                Instant 60-Second Approval
              </li>
            </ul>
          </div>

          {/* APIs & Developer Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              API Endpoints & Docs
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/api/products" target="_blank" className="hover:text-purple-400 transition-colors block text-slate-300">
                  GET /api/products
                </Link>
              </li>
              <li>
                <Link href="/api/products/iphone-17-pro" target="_blank" className="hover:text-purple-400 transition-colors block text-slate-300">
                  GET /api/products/:slug
                </Link>
              </li>
              <li>
                <Link href="/api/emi/calculate?price=127400" target="_blank" className="hover:text-purple-400 transition-colors block text-slate-300">
                  GET /api/emi/calculate
                </Link>
              </li>
              <li>
                <Link href="/api/health" target="_blank" className="hover:text-purple-400 transition-colors block text-slate-300">
                  GET /api/health
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 1Fi Financial Technologies. SDE-1 Assignment Implementation.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              256-Bit Bank-Grade Encryption
            </span>
            <span>All Mutual Funds Pledged via CAMS / KFintech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
