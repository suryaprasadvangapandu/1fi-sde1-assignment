import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getAllProducts();
    const variantCount = products.reduce((acc, p) => acc + (p.variants?.length || 0), 0);
    const emiPlanCount = products.reduce((acc, p) => acc + (p.emiPlans?.length || 0), 0);

    return NextResponse.json({
      status: 'healthy',
      app: '1Fi SDE1 Assignment Full-Stack Web App',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        stats: {
          products: products.length,
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
