import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: slug }, { id: slug }],
      },
      include: {
        variants: {
          orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
        },
        emiPlans: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug or ID '${slug}' not found` },
        { status: 404 }
      );
    }

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

    // Unique finishes/colors
    const finishesMap = new Map<string, { colorName: string; colorHex: string; sampleImage: string }>();
    product.variants.forEach((v) => {
      if (!finishesMap.has(v.colorName)) {
        finishesMap.set(v.colorName, {
          colorName: v.colorName,
          colorHex: v.colorHex,
          sampleImage: v.imageUrl,
        });
      }
    });

    // Unique storage options
    const storages = Array.from(new Set(product.variants.map((v) => v.storage)));

    const transformedVariants = product.variants.map((v) => {
      let imgs: string[] = [];
      try {
        imgs = JSON.parse(v.images);
      } catch {
        imgs = [v.imageUrl];
      }
      return {
        id: v.id,
        productId: v.productId,
        storage: v.storage,
        colorName: v.colorName,
        colorHex: v.colorHex,
        mrp: v.mrp,
        price: v.price,
        savings: v.mrp - v.price,
        discountPercent: Math.round(((v.mrp - v.price) / v.mrp) * 100),
        imageUrl: v.imageUrl,
        images: imgs,
        stock: v.stock,
        isDefault: v.isDefault,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
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
        availableFinishes: Array.from(finishesMap.values()),
        availableStorages: storages,
        variants: transformedVariants,
        defaultVariant: transformedVariants.find((v) => v.isDefault) || transformedVariants[0],
        emiPlans: product.emiPlans.map((plan) => ({
          id: plan.id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          isZeroCost: plan.isZeroCost,
          isRecommended: plan.isRecommended,
          processingFee: plan.processingFee,
          minMutualFundPortfolio: plan.minMutualFundPortfolio,
          totalAmountPayable: plan.interestRate === 0
            ? plan.monthlyAmount * plan.tenureMonths
            : Math.round(plan.monthlyAmount * plan.tenureMonths),
          effectiveTotalAfterCashback:
            (plan.monthlyAmount * plan.tenureMonths) - plan.cashbackAmount,
        })),
        specifications: parsedSpecs,
        highlights: parsedHighlights,
      },
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
