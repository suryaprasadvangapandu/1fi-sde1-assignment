import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const priceStr = searchParams.get('price');
    const tenureStr = searchParams.get('tenure');
    const rateStr = searchParams.get('rate');
    const cashbackStr = searchParams.get('cashback');

    if (!priceStr) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "price" is required' },
        { status: 400 }
      );
    }

    const price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // Default tenures
    const tenures = tenureStr
      ? [parseInt(tenureStr, 10)]
      : [3, 6, 12, 24, 36, 48, 60];

    const defaultCashback = cashbackStr ? parseInt(cashbackStr, 10) : 7500;

    const calculations = tenures.map((tenure) => {
      // Rates: 0% for up to 24 months, 10.5% for > 24 months if not specified
      const interestRate = rateStr !== null && rateStr !== undefined
        ? parseFloat(rateStr)
        : tenure <= 24
        ? 0.0
        : 10.5;

      let monthlyEmi = 0;
      let totalPayable = 0;
      let totalInterest = 0;

      if (interestRate === 0) {
        monthlyEmi = Math.round(price / tenure);
        totalPayable = price;
        totalInterest = 0;
      } else {
        // Standard reducing balance formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
        const monthlyRate = interestRate / 12 / 100;
        const compoundFactor = Math.pow(1 + monthlyRate, tenure);
        monthlyEmi = Math.round(
          (price * monthlyRate * compoundFactor) / (compoundFactor - 1)
        );
        totalPayable = monthlyEmi * tenure;
        totalInterest = totalPayable - price;
      }

      const effectiveTotalAfterCashback = totalPayable - defaultCashback;
      const minPortfolioValue = Math.round(price * 1.35); // 1Fi ~75% LTV

      // Mutual fund growth simulation: If portfolio continues to grow at 12% p.a.
      const mfAnnualCagr = 0.12;
      const projectedPortfolioAfterTenure = Math.round(
        minPortfolioValue * Math.pow(1 + mfAnnualCagr, tenure / 12)
      );
      const estimatedMFGrowth = projectedPortfolioAfterTenure - minPortfolioValue;

      return {
        tenureMonths: tenure,
        monthlyEmi,
        interestRate,
        cashbackAmount: defaultCashback,
        isZeroCost: interestRate === 0,
        principalPrice: price,
        totalPayable,
        totalInterest,
        effectiveTotalAfterCashback,
        minMutualFundPortfolio: minPortfolioValue,
        estimatedMFGrowth,
        netFinancialBenefit: estimatedMFGrowth + defaultCashback - totalInterest,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        price,
        plans: calculations,
      },
    });
  } catch (error) {
    console.error('API /api/emi/calculate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate EMI plans',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
