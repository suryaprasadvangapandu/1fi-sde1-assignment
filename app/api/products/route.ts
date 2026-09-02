import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const whereClause: Record<string, unknown> = {};

    if (brand && brand !== 'All') {
      whereClause.brand = { equals: brand };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (featured === 'true') {
      whereClause.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        variants: {
          orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
        },
        emiPlans: {
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform products with computed metadata
    const responseData = products.map((product) => {
      const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
      const lowestEmi = product.emiPlans.reduce((min, plan) => {
        return plan.monthlyAmount < min ? plan.monthlyAmount : min;
      }, product.emiPlans[0]?.monthlyAmount || 0);

      const zeroCostPlan = product.emiPlans.find((p) => p.isZeroCost);

      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(product.specifications);
      } catch {
        parsedSpecs = {};
      }

      let parsedHighlights: string[] = [];
      try {
        parsedHighlights = JSON.parse(product.highlights);
      } catch {
        parsedHighlights = [];
      }

      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        tagline: product.tagline,
        description: product.description,
        rating: product.rating,
        reviewCount: product.reviewCount,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        startingPrice: defaultVariant?.price || 0,
        startingMrp: defaultVariant?.mrp || 0,
        discountPercent: defaultVariant
          ? Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)
          : 0,
        lowestMonthlyEmi: lowestEmi,
        hasZeroCostEmi: !!zeroCostPlan,
        defaultVariant,
        variantsCount: product.variants.length,
        colorsCount: new Set(product.variants.map((v) => v.colorName)).size,
        availableFinishes: Array.from(
          new Map(product.variants.map((v) => [v.colorName, { name: v.colorName, hex: v.colorHex }])).values()
        ),
        variants: product.variants.map((v) => ({
          ...v,
          images: (() => {
            try {
              return JSON.parse(v.images);
            } catch {
              return [v.imageUrl];
            }
          })(),
        })),
        emiPlans: product.emiPlans,
        specifications: parsedSpecs,
        highlights: parsedHighlights,
      };
    });

    return NextResponse.json({
      success: true,
      count: responseData.length,
      data: responseData,
    });
  } catch (error) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products from database',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
