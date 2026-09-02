'use client';

import React, { useState, useEffect } from 'react';
import { X, Calculator, TrendingUp, Sparkles, Shield, Percent, ArrowRight } from 'lucide-react';

interface EmiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [loanAmount, setLoanAmount] = useState<number>(127400);
  const [tenure, setTenure] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [cashback, setCashback] = useState<number>(7500);

  if (!isOpen) return null;

  // Compute EMI
  let monthlyEmi = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (interestRate === 0) {
    monthlyEmi = Math.round(loanAmount / tenure);
    totalPayable = loanAmount;
    totalInterest = 0;
  } else {
    const r = interestRate / 12 / 100;
    const factor = Math.pow(1 + r, tenure);
    monthlyEmi = Math.round((loanAmount * r * factor) / (factor - 1));
    totalPayable = monthlyEmi * tenure;
    totalInterest = totalPayable - loanAmount;
  }

  const minPortfolio = Math.round(loanAmount * 1.35);
  const projectedMFGrowth = Math.round(minPortfolio * (Math.pow(1 + 0.12, tenure / 12) - 1));
  const netAdvantage = projectedMFGrowth + cashback - totalInterest;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#6938ef] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                1Fi Mutual Fund EMI Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Simulate monthly payments and investment growth
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Amount Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Device Price / Loan Amount
              </label>
              <span className="text-base font-black text-[#6938ef]">
                ₹{loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={20000}
              max={200000}
              step={1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#6938ef] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹20,000</span>
              <span>₹1,27,400 (iPhone 17 Pro)</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Tenure Selection Pills */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
              Tenure (Months)
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {[3, 6, 12, 24, 36, 48, 60].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTenure(t);
                    if (t <= 24) setInterestRate(0);
                    else setInterestRate(10.5);
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                    tenure === t
                      ? 'bg-[#6938ef] text-white border-[#6938ef] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}M
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInterestRate(0)}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-colors ${
                interestRate === 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              0% No-Cost EMI
            </button>
            <button
              type="button"
              onClick={() => setInterestRate(10.5)}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-colors ${
                interestRate === 10.5
                  ? 'bg-purple-50 text-purple-800 border-purple-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              10.5% Standard Rate
            </button>
          </div>

          {/* EMI Result Card */}
          <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Monthly EMI Payment</span>
              <span className="text-2xl font-black text-[#6938ef]">
                ₹{monthlyEmi.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-600">/ mo</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-200/60 text-xs">
              <div>
                <span className="text-slate-500 block">Total Payable:</span>
                <strong className="text-slate-800">₹{totalPayable.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Total Interest:</span>
                <strong className="text-slate-800">₹{totalInterest.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Min MF Collateral:</span>
                <strong className="text-slate-800">₹{minPortfolio.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Cashback:</span>
                <strong className="text-emerald-600">₹{cashback.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-purple-100 text-xs text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Est. MF Growth during tenure (@12% CAGR):
              </span>
              <strong className="text-emerald-700 font-bold">
                +₹{projectedMFGrowth.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Apply This Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculatorModal;
