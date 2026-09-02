import React from 'react';
import { TrendingUp, ShieldCheck, Percent, Zap, RefreshCw, Award } from 'lucide-react';

export const MutualFundBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Keep Earning Market Returns',
      description:
        'Your mutual fund portfolio remains 100% active and continues to earn ~12-15% annual compounding returns while you comfortably pay monthly EMIs.',
      badge: 'Wealth Growth',
    },
    {
      icon: Percent,
      title: '0% No-Cost EMI Plans',
      description:
        'Enjoy 0% interest tenures up to 24 months backed by your mutual fund collateral with flat ₹7,500 additional cashback on popular flagship devices.',
      badge: '0% Interest',
    },
    {
      icon: Zap,
      title: '60-Second Paperless Approval',
      description:
        'Instant digital pledge through CAMS & KFintech depositories. No physical documents, no income slips, and zero paperwork required.',
      badge: 'Instant Sanction',
    },
    {
      icon: RefreshCw,
      title: 'Zero Foreclosure Penalty',
      description:
        'Prepay or close your EMI plan anytime without any extra fees or charges. Your pledged mutual fund units are released immediately.',
      badge: 'Zero Penalty',
    },
  ];

  return (
    <section id="benefits" className="py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 border border-purple-200 text-xs font-bold text-[#6938ef] mb-3">
            <Award className="w-3.5 h-3.5" />
            1Fi Smart Financing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Buy Smartphones Backed by Mutual Funds?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Don't break your investments or pay hefty credit card interest. Use your mutual fund portfolio as collateral and enjoy zero-cost smartphone EMIs.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6938ef] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6938ef] bg-purple-50 px-2 py-0.5 rounded">
                    {benefit.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout: Mutual Fund EMI vs Credit Card EMI */}
        <div className="mt-12 bg-purple-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl font-black tracking-tight text-white mb-2">
              The 1Fi Financial Advantage
            </h3>
            <p className="text-sm text-purple-200 mb-6 leading-relaxed">
              When buying an iPhone for ₹1,27,400 with a traditional credit card, you lose liquidity or pay up to 16% interest. With 1Fi, pledging ₹1.7L in mutual funds allows your investment to grow by ~₹20,000+ during the 12-month tenure while you pay 0% No-Cost EMI!
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                ✓ 0% Interest on 12 & 24 Months
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                ✓ Up to ₹7,500 Instant Cashback
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                ✓ Zero Investment Disruption
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MutualFundBenefitsSection;
