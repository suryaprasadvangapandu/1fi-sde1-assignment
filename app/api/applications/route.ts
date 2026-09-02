import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productName,
      variantInfo,
      monthlyEmi,
      tenureMonths,
      interestRate,
      totalAmount,
      cashbackAmount,
      fullName,
      email,
      phone,
      panNumber,
      mfFolioNumber,
      pledgedPortfolioValue,
    } = body;

    // Validation
    if (!fullName || !phone || !panNumber) {
      return NextResponse.json(
        { success: false, error: 'Full name, phone, and PAN number are required' },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        productName: productName || 'Selected Smartphone',
        variantInfo: variantInfo || 'Standard Variant',
        monthlyEmi: Number(monthlyEmi) || 0,
        tenureMonths: Number(tenureMonths) || 12,
        interestRate: Number(interestRate) || 0.0,
        totalAmount: Number(totalAmount) || 0,
        cashbackAmount: Number(cashbackAmount) || 0,
        fullName,
        email: email || 'user@1fi.in',
        phone,
        panNumber: panNumber.toUpperCase(),
        mfFolioNumber: mfFolioNumber || `1FI-MF-${Math.floor(100000 + Math.random() * 900000)}`,
        pledgedPortfolioValue: Number(pledgedPortfolioValue) || Math.round(Number(totalAmount) * 1.4),
        status: 'APPROVED',
      },
    });

    return NextResponse.json({
      success: true,
      message: '1Fi Mutual Fund EMI application sanctioned successfully!',
      data: {
        applicationId: application.id,
        sanctionReference: `1FI-${Date.now().toString().slice(-6)}`,
        status: application.status,
        approvalTimestamp: application.createdAt,
        summary: {
          borrower: application.fullName,
          product: application.productName,
          variant: application.variantInfo,
          monthlyEmi: application.monthlyEmi,
          tenure: `${application.tenureMonths} Months`,
          interestRate: `${application.interestRate}%`,
          cashbackApplicable: `₹${application.cashbackAmount.toLocaleString('en-IN')}`,
          pledgedFolio: application.mfFolioNumber,
          pledgedPortfolioValue: `₹${application.pledgedPortfolioValue.toLocaleString('en-IN')}`,
        },
      },
    });
  } catch (error) {
    console.error('API /api/applications error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process loan application',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.application.count();
    const applications = await prisma.application.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      totalApplications: count,
      data: applications,
    });
  } catch (error) {
    console.error('API /api/applications GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
