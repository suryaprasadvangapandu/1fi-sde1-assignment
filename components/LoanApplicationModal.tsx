'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Calendar,
  Percent,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EMIPlanItem } from './EMIPlanSelector';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variantStorage: string;
  variantColorName: string;
  productPrice: number;
  productMrp: number;
  productImageUrl: string;
  selectedPlan: EMIPlanItem;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  onClose,
  productName,
  variantStorage,
  variantColorName,
  productPrice,
  productMrp,
  productImageUrl,
  selectedPlan,
}) => {
  const [step, setStep] = useState<'details' | 'submitting' | 'success'>('details');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [mfFolioNumber, setMfFolioNumber] = useState('1FI-HDFC-99281');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sanctionData, setSanctionData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !phone || !panNumber) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (panNumber.length !== 10) {
      setErrorMsg('Please enter a valid 10-character PAN number.');
      return;
    }

    setStep('submitting');

    try {
      const payload = {
        productName,
        variantInfo: `${variantStorage} - ${variantColorName}`,
        monthlyEmi: selectedPlan.monthlyAmount,
        tenureMonths: selectedPlan.tenureMonths,
        interestRate: selectedPlan.interestRate,
        totalAmount: productPrice,
        cashbackAmount: selectedPlan.cashbackAmount,
        fullName,
        email,
        phone,
        panNumber,
        mfFolioNumber,
        pledgedPortfolioValue: Math.round(productPrice * 1.35),
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSanctionData(json.data);
        setStep('success');
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore confetti fallback
        }
      } else {
        setErrorMsg(json.error || 'Failed to submit application. Please try again.');
        setStep('details');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please try again.');
      setStep('details');
    }
  };

  const totalPayable = selectedPlan.interestRate === 0
    ? productPrice
    : Math.round(selectedPlan.monthlyAmount * selectedPlan.tenureMonths);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6938ef] flex items-center justify-center text-white font-bold text-sm">
              ↑1Fi
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {step === 'success' ? 'Sanction Approved!' : '1Fi Mutual Fund EMI Sanction'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'success'
                  ? 'Your smartphone order is locked with 0% liquidated funds'
                  : 'Fast-track digital approval in 60 seconds'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product & Plan summary pill */}
              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl p-1.5 shrink-0 border border-purple-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={productImageUrl}
                    alt={productName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-sm font-bold text-slate-900">
                    {productName} ({variantStorage}, {variantColorName})
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Plan:{' '}
                    <strong className="text-[#6938ef]">
                      ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo x{' '}
                      {selectedPlan.tenureMonths} Months
                    </strong>{' '}
                    ({selectedPlan.interestRate === 0 ? '0% No-Cost EMI' : `${selectedPlan.interestRate}% Interest`})
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    ✓ Additional Cashback: ₹{selectedPlan.cashbackAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-slate-900">
                    ₹{productPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400 line-through">
                    MRP: ₹{productMrp.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Mutual Fund Pledge Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Min MF Portfolio</span>
                  <span className="font-bold text-slate-800">
                    ₹{Math.round(productPrice * 1.35).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">MF Liquidation</span>
                  <span className="font-bold text-emerald-600">0% (Zero Sell)</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px] uppercase">Foreclosure Fee</span>
                  <span className="font-bold text-slate-800">₹0 (Free anytime)</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Borrower & Portfolio Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50 focus:border-[#6938ef]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number (linked to MF) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10 digit mobile"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50 focus:border-[#6938ef]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50 focus:border-[#6938ef]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      PAN Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full px-3.5 py-2.5 text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50 focus:border-[#6938ef]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mutual Fund Folio / Registrar (CAMS / KFintech)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mfFolioNumber}
                      onChange={(e) => setMfFolioNumber(e.target.value)}
                      placeholder="e.g. 1FI-HDFC-99281"
                      className="flex-1 px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6938ef]/50 focus:border-[#6938ef]"
                    />
                    <button
                      type="button"
                      onClick={() => setMfFolioNumber(`1FI-PLEDGE-${Math.floor(100000 + Math.random() * 900000)}`)}
                      className="px-3 py-2 text-xs font-semibold text-[#6938ef] bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl whitespace-nowrap"
                    >
                      Auto-Detect Folios
                    </button>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-base rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sanction Loan & Pledge MF Collateral</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 'submitting' && (
            <div className="py-16 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#6938ef] animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-slate-800">
                Verifying Mutual Fund Folio & Approving EMI...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Communicating with CAMS/KFintech depositories to verify collateral unit valuation without selling.
              </p>
            </div>
          )}

          {step === 'success' && sanctionData && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Congratulations, {sanctionData.summary?.borrower}!
                </h3>
                <p className="text-sm text-slate-600">
                  Your 1Fi Mutual-Fund-Backed EMI Plan has been{' '}
                  <strong className="text-emerald-600">Sanctioned & Approved</strong>.
                </p>
              </div>

              {/* Sanction Letter Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-semibold">Sanction Reference ID:</span>
                  <span className="font-bold text-[#6938ef] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {sanctionData.sanctionReference}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-700 font-sans">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Product & Variant</span>
                    <strong className="text-slate-900 font-medium">
                      {sanctionData.summary?.product} ({sanctionData.summary?.variant})
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Monthly Payment</span>
                    <strong className="text-emerald-700 text-sm font-bold">
                      ₹{sanctionData.summary?.monthlyEmi?.toLocaleString('en-IN')} / mo
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Tenure</span>
                    <strong className="text-slate-900 font-medium">
                      {sanctionData.summary?.tenure}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Interest Rate</span>
                    <strong className="text-slate-900 font-medium">
                      {sanctionData.summary?.interestRate}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Pledged MF Folio</span>
                    <strong className="text-slate-900 font-mono text-[11px]">
                      {sanctionData.summary?.pledgedFolio}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Pledged Portfolio Value</span>
                    <strong className="text-slate-900 font-medium">
                      {sanctionData.summary?.pledgedPortfolioValue}
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <strong>Your Mutual Fund units remain 100% invested.</strong> Dividend and capital appreciation will continue to be credited to your account throughout the EMI tenure!
                  </div>
                </div>
              </div>

              {/* Close / Finish Button */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-[#6938ef] hover:bg-[#5323cf] text-white font-bold text-sm rounded-xl shadow-md transition-all text-center cursor-pointer"
                >
                  Done & Return to Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;
