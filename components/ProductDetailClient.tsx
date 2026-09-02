'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Star,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Percent,
  Award,
  Zap,
  ArrowLeft,
} from 'lucide-react';
import { EMIPlanSelector, EMIPlanItem } from './EMIPlanSelector';
import { LoanApplicationModal } from './LoanApplicationModal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { EmiCalculatorModal } from './EmiCalculatorModal';

interface VariantData {
  id: string;
  storage: string;
  colorName: string;
  colorHex: string;
  mrp: number;
  price: number;
  imageUrl: string;
  images: string[];
  stock: number;
  isDefault: boolean;
}

interface ProductData {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  availableFinishes: { colorName: string; colorHex: string; sampleImage: string }[];
  availableStorages: string[];
  variants: VariantData[];
  defaultVariant: VariantData;
  emiPlans: EMIPlanItem[];
  specifications: Record<string, string>;
  highlights: string[];
}

interface ProductDetailClientProps {
  product: ProductData;
  allProducts: { id: string; slug: string; name: string; brand: string; startingPrice: number; defaultVariant: { imageUrl: string } }[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  allProducts,
}) => {
  // State for active finish (color) and storage
  const [selectedColor, setSelectedColor] = useState<string>(
    product.defaultVariant?.colorName || product.availableFinishes[0]?.colorName || ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.defaultVariant?.storage || product.availableStorages[0] || '256GB'
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    product.emiPlans[2]?.id || product.emiPlans[0]?.id || null // Default to 12 months
  );
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'mutual_fund' | 'highlights'>('specs');

  // Match current active variant
  const currentVariant =
    product.variants.find(
      (v) => v.colorName === selectedColor && v.storage === selectedStorage
    ) ||
    product.variants.find((v) => v.colorName === selectedColor) ||
    product.variants.find((v) => v.storage === selectedStorage) ||
    product.defaultVariant;

  const currentPrice = currentVariant?.price || 127400;
  const currentMrp = currentVariant?.mrp || 134900;
  const galleryImages = currentVariant?.images?.length
    ? currentVariant.images
    : [currentVariant?.imageUrl || ''];

  const activeImage = galleryImages[selectedImageIndex] || galleryImages[0];

  const selectedPlan =
    product.emiPlans.find((p) => p.id === selectedPlanId) ||
    product.emiPlans[2] ||
    product.emiPlans[0];

  // Base price for EMI scaling
  const basePrice = product.defaultVariant?.price || 127400;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onOpenCalculator={() => setIsCalculatorModalOpen(true)} />

      {/* Main Product Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#6938ef] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> All Smartphones
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span>{product.brand}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        {/* 2-Column Responsive Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Imagery, Title, Variants & Finishes */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Badges */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <span className="px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 rounded-full">
                    NEW
                  </span>
                )}
                <span className="px-2.5 py-0.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-full">
                  0% Mutual Fund EMI Available
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                {selectedStorage} • {selectedColor}
              </p>
            </div>

            {/* Main Product Image Container */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs relative flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px]">
              <div className="relative w-full h-72 sm:h-80 flex items-center justify-center transition-all duration-300">
                <img
                  src={activeImage}
                  alt={`${product.name} in ${selectedColor}`}
                  className="max-h-full max-w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Finishes indicator matching reference image: "Available in 3 finishes" with swatches */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex flex-col items-center justify-center space-y-2">
                <span className="text-xs font-semibold text-slate-600">
                  Available in {product.availableFinishes.length} finishes
                </span>
                <div className="flex items-center space-x-3">
                  {product.availableFinishes.map((finish) => {
                    const isSelected = selectedColor === finish.colorName;
                    return (
                      <button
                        key={finish.colorName}
                        onClick={() => {
                          setSelectedColor(finish.colorName);
                          setSelectedImageIndex(0);
                        }}
                        title={finish.colorName}
                        aria-label={`Select ${finish.colorName}`}
                        className={`w-7 h-7 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-[#6938ef] ring-offset-2 scale-110 shadow-md'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: finish.colorHex }}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{selectedColor}</span>
              </div>
            </div>

            {/* Storage Variant Selector */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Select Storage Capacity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.availableStorages.map((storage) => {
                  const isSelected = selectedStorage === storage;
                  const storageVariant = product.variants.find(
                    (v) => v.storage === storage && v.colorName === selectedColor
                  ) || product.variants.find((v) => v.storage === storage);

                  return (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#6938ef] bg-purple-50/70 text-[#6938ef] font-black shadow-xs ring-1 ring-[#6938ef]'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700 font-bold'
                      }`}
                    >
                      <span className="block text-sm sm:text-base">{storage}</span>
                      {storageVariant && (
                        <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                          ₹{storageVariant.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1Fi Highlights Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 border border-purple-200/80 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6938ef] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                1Fi Mutual Fund EMI Perks
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {product.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6938ef] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Dynamic Price & EMI Plan List matching reference mockup */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
            <EMIPlanSelector
              currentPrice={currentPrice}
              currentMrp={currentMrp}
              basePrice={basePrice}
              emiPlans={product.emiPlans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={(plan) => setSelectedPlanId(plan.id)}
              onProceed={() => setIsApplicationModalOpen(true)}
            />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
                <TrendingUp className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-800 block">100% Growth</span>
                <span className="text-[9px] text-slate-500">MF keeps compounding</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
                <Percent className="w-4 h-4 text-[#6938ef] mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-800 block">0% Interest</span>
                <span className="text-[9px] text-slate-500">Up to 24 Months</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-800 block">Zero Lock-In</span>
                <span className="text-[9px] text-slate-500">Prepay anytime free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Mutual Fund Deep Dive Tabs */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex border-b border-slate-200 pb-3 gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#6938ef] text-[#6938ef]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('mutual_fund')}
              className={`pb-2 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'mutual_fund'
                  ? 'border-[#6938ef] text-[#6938ef]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Mutual Fund Pledge Architecture
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
                    <span className="text-xs font-bold text-[#6938ef] uppercase tracking-wider block mb-1">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'mutual_fund' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
                <p>
                  <strong>1Fi Mutual-Fund-Backed Credit Mechanism:</strong> In traditional credit card EMI schemes, you incur high interest rates (14% - 18% p.a.) or liquidate your savings. 1Fi partners with SEBI-registered depositories (CAMS / KFintech) allowing you to pledge your mutual fund units electronically in 60 seconds without selling them.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                    <h4 className="font-bold text-[#6938ef] mb-1">1. Electronic Lien</h4>
                    <p className="text-xs text-slate-600">
                      A lien mark is created digitally on your mutual fund folio. The ownership of the units never leaves your name.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                    <h4 className="font-bold text-[#6938ef] mb-1">2. Uninterrupted Growth</h4>
                    <p className="text-xs text-slate-600">
                      All NAV gains, dividends, and compound interest continue to accumulate in your portfolio seamlessly.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                    <h4 className="font-bold text-[#6938ef] mb-1">3. Instant Release</h4>
                    <p className="text-xs text-slate-600">
                      Upon completing the tenure or opting for early zero-penalty foreclosure, the lien mark is automatically revoked.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Products Carousel / Navigation */}
        {allProducts?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
              Compare with Other Flagships on 1Fi EMI
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {allProducts
                .filter((p) => p.slug !== product.slug)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#6938ef] hover:shadow-lg transition-all flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-xl p-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <img
                        src={p.defaultVariant?.imageUrl}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#6938ef] uppercase tracking-wider">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#6938ef] transition-colors">
                        {p.name}
                      </h4>
                      <span className="text-xs font-extrabold text-slate-800">
                        From ₹{p.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Interactive Modals */}
      {selectedPlan && (
        <LoanApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          productName={product.name}
          variantStorage={selectedStorage}
          variantColorName={selectedColor}
          productPrice={currentPrice}
          productMrp={currentMrp}
          productImageUrl={activeImage}
          selectedPlan={selectedPlan}
        />
      )}

      <EmiCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetailClient;
