'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  TrendingUp,
  Percent,
  CheckCircle2,
  ArrowRight,
  Zap,
  Smartphone,
  ChevronRight,
  Coins,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProductCard } from './ProductCard';
import { MutualFundBenefitsSection } from './MutualFundBenefitsSection';
import { EmiCalculatorModal } from './EmiCalculatorModal';

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  startingPrice: number;
  startingMrp: number;
  discountPercent: number;
  lowestMonthlyEmi: number;
  hasZeroCostEmi: boolean;
  colorsCount: number;
  availableFinishes: { name: string; hex: string }[];
  defaultVariant: {
    storage: string;
    colorName: string;
    imageUrl: string;
  };
}

interface HomeClientProps {
  products: ProductItem[];
}

export const HomeClient: React.FC<HomeClientProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [onlyZeroCost, setOnlyZeroCost] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'All' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesZeroCost = !onlyZeroCost || p.hasZeroCostEmi;

    return matchesSearch && matchesBrand && matchesZeroCost;
  });

  const featuredProduct = products.find((p) => p.slug === 'iphone-17-pro') || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onOpenCalculator={() => setIsCalculatorOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/80 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-xs font-bold text-[#6938ef]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Mutual Fund Backed Financing</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Own the Latest Flagships with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6938ef] via-[#7c3aed] to-indigo-600">
                  0% Mutual Fund EMIs
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Pledge your mutual fund portfolio as electronic collateral without selling a single unit. Continue earning market compounding returns while paying zero-cost monthly installments.
              </p>

              {/* Quick Perks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="p-3 bg-white/90 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Interest Rate</span>
                  <span className="text-sm font-black text-[#6938ef]">0% No-Cost EMI</span>
                </div>
                <div className="p-3 bg-white/90 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Exclusive Perk</span>
                  <span className="text-sm font-black text-emerald-600">₹7,500 Cashback</span>
                </div>
                <div className="p-3 bg-white/90 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-2xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">MF Liquidation</span>
                  <span className="text-sm font-black text-slate-900">0% Units Sold</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 justify-center lg:justify-start">
                <Link
                  href="/products/iphone-17-pro"
                  className="w-full sm:w-auto px-7 py-4 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>View iPhone 17 Pro EMI Plans</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-[#6938ef]" />
                  <span>Interactive EMI Calculator</span>
                </button>
              </div>
            </div>

            {/* Hero Right: iPhone 17 Pro Highlight Card matching reference mockup */}
            {featuredProduct && (
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-3xl border border-purple-200/80 p-6 sm:p-7 shadow-2xl shadow-purple-500/10 group">
                  <div className="absolute -top-3 left-6 bg-[#6938ef] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Featured Assignment Showcase
                  </div>

                  <div className="flex justify-between items-start pt-2">
                    <div>
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                        NEW
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">
                        {featuredProduct.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        256GB • Available in 3 finishes
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900">
                        ₹{featuredProduct.startingPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        ₹{featuredProduct.startingMrp.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="h-52 w-full flex items-center justify-center py-4 my-2">
                    <img
                      src={featuredProduct.defaultVariant.imageUrl}
                      alt={featuredProduct.name}
                      className="h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Sample EMI badge */}
                  <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        ₹11,242 x 12 months
                      </span>
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                        0% interest
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600">
                      Additional cashback of ₹7,500
                    </div>
                  </div>

                  {/* Direct Link */}
                  <Link
                    href={`/products/${featuredProduct.slug}`}
                    className="w-full mt-4 py-3 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Full EMI Table & Variants</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How 1Fi Works Section */}
      <section id="how-it-works" className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How 1Fi Mutual Fund EMI Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Three frictionless digital steps to get your smartphone with 0% interest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#6938ef] text-white font-black flex items-center justify-center text-base mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Select Device & EMI Plan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your desired smartphone variant (storage & finish) and select a tenure from 3 to 60 months with 0% No-Cost EMI options.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#6938ef] text-white font-black flex items-center justify-center text-base mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Pledge Mutual Funds Digitally
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your PAN & MF Folio. A digital lien is marked via CAMS/KFintech in under 60 seconds with zero physical paperwork.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl relative">
              <div className="w-10 h-10 rounded-xl bg-[#6938ef] text-white font-black flex items-center justify-center text-base mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Instant Sanction & Compounding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive instant sanction and cashback. Your mutual fund stays 100% invested and keeps earning returns throughout the tenure!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="products-catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#6938ef] uppercase tracking-wider mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              Dynamic Product Catalog
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Explore Available Smartphones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All models loaded dynamically from backend SQLite database via REST API.
            </p>
          </div>

          {/* Search Bar & Zero-Cost Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl w-full sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50"
              />
            </div>

            <button
              onClick={() => setOnlyZeroCost(!onlyZeroCost)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                onlyZeroCost
                  ? 'bg-purple-100 text-[#6938ef] border-purple-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>0% EMI Only</span>
            </button>
          </div>
        </div>

        {/* Brand Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-[#6938ef] text-white shadow-sm shadow-purple-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No smartphones found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or brand filter.
            </p>
          </div>
        )}
      </section>

      {/* Why 1Fi Benefits Section */}
      <MutualFundBenefitsSection />

      <Footer />

      <EmiCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
};

export default HomeClient;
