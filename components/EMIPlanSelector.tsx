'use client';

import React from 'react';
import { Check, Sparkles, Shield, Info, ArrowRight, TrendingUp } from 'lucide-react';

export interface EMIPlanItem {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  isZeroCost: boolean;
  isRecommended?: boolean;
  processingFee?: number;
  minMutualFundPortfolio?: number;
}

interface EMIPlanSelectorProps {
  currentPrice: number;
  currentMrp: number;
  basePrice?: number;
  emiPlans: EMIPlanItem[];
  selectedPlanId: string | null;
  onSelectPlan: (plan: EMIPlanItem) => void;
  onProceed: () => void;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  currentPrice,
  currentMrp,
  basePrice = 127400,
  emiPlans,
  selectedPlanId,
  onSelectPlan,
  onProceed,
}) => {
  // If current price is different from base price (e.g. 512GB or 1TB variant), dynamically scale the EMI plans!
  const priceRatio = currentPrice / (basePrice || 127400);

  const displayPlans = emiPlans.map((plan) => {
    let monthly = plan.monthlyAmount;
    if (priceRatio !== 1) {
      if (plan.interestRate === 0) {
        monthly = Math.round(currentPrice / plan.tenureMonths);
      } else {
        const monthlyRate = plan.interestRate / 12 / 100;
        const compoundFactor = Math.pow(1 + monthlyRate, plan.tenureMonths);
        monthly = Math.round((currentPrice * monthlyRate * compoundFactor) / (compoundFactor - 1));
      }
    }
    return {
      ...plan,
      computedMonthly: monthly,
    };
  });

  const selectedPlan = displayPlans.find((p) => p.id === selectedPlanId) || displayPlans[2] || displayPlans[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 lg:p-7">
      {/* Top Pricing Header matching reference image */}
      <div className="pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          {currentMrp > currentPrice && (
            <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
              ₹{currentMrp.toLocaleString('en-IN')}
            </span>
          )}
          {currentMrp > currentPrice && (
            <span className="px-2 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md">
              Save ₹{(currentMrp - currentPrice).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Feature subtitle matching reference image */}
        <div className="flex items-center gap-2 mt-1.5 text-slate-600">
          <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6938ef]"></span>
            EMI plans backed by mutual funds
          </p>
          <div className="group relative">
            <Info className="w-4 h-4 text-slate-400 hover:text-purple-600 cursor-pointer" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-72 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-50 pointer-events-none">
              <p className="font-semibold text-purple-300 mb-1">How Mutual Fund EMI Works:</p>
              Pledge your existing mutual fund units as collateral with 0% liquidation. You keep receiving all market compounding returns while paying comfortable EMIs!
            </div>
          </div>
        </div>
      </div>

      {/* Selectable EMI Plans List matching reference image layout */}
      <div className="space-y-3">
        {displayPlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  onSelectPlan(plan);
                }
              }}
              className={`relative rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-[#6938ef] bg-purple-50/50 shadow-sm ring-1 ring-[#6938ef]/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              {/* Recommended Badge */}
              {plan.isRecommended && (
                <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  POPULAR
                </span>
              )}

              <div className="flex items-center justify-between">
                {/* Left: Monthly payment amount x tenure */}
                <div className="flex items-center gap-3">
                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#6938ef] bg-[#6938ef] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      ₹{plan.computedMonthly.toLocaleString('en-IN')}{' '}
                      <span className="text-sm font-normal text-slate-600">
                        x {plan.tenureMonths} months
                      </span>
                    </div>

                    {/* Cashback text in emerald green */}
                    {plan.cashbackAmount > 0 && (
                      <div className="text-xs font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                        <span>Additional cashback of ₹{plan.cashbackAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Interest rate badge matching reference image */}
                <div className="text-right shrink-0">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                      plan.isZeroCost
                        ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-200/80'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Plan Summary Banner */}
      {selectedPlan && (
        <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#6938ef] shrink-0" />
            <span>
              Min MF Portfolio Required:{' '}
              <strong className="text-slate-800">
                ₹{Math.round(currentPrice * 1.35).toLocaleString('en-IN')}
              </strong>
            </span>
          </div>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
            Zero Processing Fee
          </span>
        </div>
      )}

      {/* Action CTA Button */}
      <button
        onClick={onProceed}
        className="w-full mt-5 py-4 px-6 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-base rounded-xl shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>Proceed with Selected Plan</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1">
        <span>Instant paperless sanction</span> • <span>No mutual fund lock-in</span> • <span>Zero foreclosure charges</span>
      </p>
    </div>
  );
};

export default EMIPlanSelector;
