'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Shield, Sparkles, TrendingUp, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 group">
              {/* 1Fi signature purple logo icon matching PDF header */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6938ef] to-[#5323cf] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl tracking-tighter flex items-center font-extrabold">
                  <span className="text-sm mr-0.5">↑</span>1Fi
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                  1Fi <span className="text-[#6938ef] font-semibold text-sm">Fintech</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                  Mutual Fund EMIs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#6938ef] hover:bg-purple-50/70 rounded-lg transition-colors"
              >
                Smartphones on EMI
              </Link>
              <Link
                href="/#how-it-works"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#6938ef] hover:bg-purple-50/70 rounded-lg transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#benefits"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#6938ef] hover:bg-purple-50/70 rounded-lg transition-colors"
              >
                Why 1Fi?
              </Link>
              <Link
                href="/api/health"
                target="_blank"
                className="px-3.5 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 rounded-lg transition-colors flex items-center gap-1"
              >
                API Status <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                EMI Calculator
              </button>
            )}
            <Link
              href="/#products-catalog"
              className="px-4 py-2 text-xs font-bold text-white bg-[#6938ef] hover:bg-[#5323cf] rounded-lg shadow-sm shadow-purple-500/25 transition-all hover:shadow-md hover:scale-[1.02] flex items-center gap-1.5"
            >
              Explore Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-purple-50 rounded-lg"
          >
            Smartphones on EMI
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-purple-50 rounded-lg"
          >
            How It Works
          </Link>
          <Link
            href="/#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-purple-50 rounded-lg"
          >
            Why 1Fi?
          </Link>
          <Link
            href="/api/products"
            target="_blank"
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-purple-50 rounded-lg"
          >
            Products API (JSON)
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
