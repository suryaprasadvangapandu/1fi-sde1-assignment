import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const productCount = await prisma.product.count();
    const variantCount = await prisma.variant.count();
    const emiPlanCount = await prisma.eMIPlan.count();

    return NextResponse.json({
      status: 'healthy',
      app: '1Fi SDE1 Assignment Full-Stack Web App',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        stats: {
          products: productCount,
          variants: variantCount,
          emiPlans: emiPlanCount,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
