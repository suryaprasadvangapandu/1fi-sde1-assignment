import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export interface ProductCardProps {
  product: {
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
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#6938ef]/40 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Banner / Badges */}
      <div className="p-5 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200/80 rounded-full">
              NEW
            </span>
          )}
          {product.hasZeroCostEmi && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200/80 rounded-full">
              0% Mutual Fund EMI
            </span>
          )}
        </div>
        <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400 text-[10px] font-normal">({product.reviewCount})</span>
        </div>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative px-6 py-6 overflow-hidden">
        <div className="h-56 w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img
            src={product.defaultVariant.imageUrl}
            alt={product.name}
            className="h-full w-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Finishes Swatches Preview */}
      <div className="px-6 py-1 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px] font-medium">Available in {product.colorsCount} finishes</span>
        <div className="flex items-center space-x-1.5">
          {product.availableFinishes?.slice(0, 4).map((finish, idx) => (
            <span
              key={idx}
              title={finish.name}
              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs inline-block"
              style={{ backgroundColor: finish.hex }}
            />
          ))}
        </div>
      </div>

      {/* Product Info & Pricing */}
      <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-[#6938ef] uppercase tracking-wider">
            {product.brand}
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#6938ef] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{product.startingPrice.toLocaleString('en-IN')}
            </span>
            {product.startingMrp > product.startingPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.startingMrp.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-bold text-emerald-600">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* EMI Highlight */}
          <div className="mt-2.5 p-2.5 bg-purple-50/60 border border-purple-100 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Mutual Fund EMI from
              </span>
              <span className="text-sm font-black text-[#6938ef]">
                ₹{product.lowestMonthlyEmi.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-600">/ month</span>
              </span>
            </div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
              0% Interest
            </span>
          </div>

          {/* Action Link */}
          <Link
            href={`/products/${product.slug}`}
            className="w-full mt-4 py-2.5 px-4 bg-slate-900 hover:bg-[#6938ef] text-white text-xs font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>View EMI Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
