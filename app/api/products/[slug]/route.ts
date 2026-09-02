import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Product slug is required' },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('API /api/products/[slug] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product details',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
