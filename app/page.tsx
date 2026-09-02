import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '1Fi - Smartphones on EMI Backed by Mutual Funds',
  description:
    'Buy iPhone 17 Pro, Samsung S24 Ultra, and top smartphones with 0% No-Cost EMI backed by your mutual fund investments. Zero portfolio liquidation, instant sanction on 1Fi.',
};

export default async function HomePage() {
  const productsRaw = await prisma.product.findMany({
    include: {
      variants: {
        orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
      },
      emiPlans: {
        orderBy: { orderIndex: 'asc' },
      },
    },
    orderBy: { isFeatured: 'desc' },
  });

  const products = productsRaw.map((product) => {
    const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
    const lowestEmi = product.emiPlans.reduce((min, plan) => {
      return plan.monthlyAmount < min ? plan.monthlyAmount : min;
    }, product.emiPlans[0]?.monthlyAmount || 0);

    const zeroCostPlan = product.emiPlans.find((p) => p.isZeroCost);

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
      startingPrice: defaultVariant?.price || 0,
      startingMrp: defaultVariant?.mrp || 0,
      discountPercent: defaultVariant
        ? Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)
        : 0,
      lowestMonthlyEmi: lowestEmi,
      hasZeroCostEmi: !!zeroCostPlan,
      colorsCount: new Set(product.variants.map((v) => v.colorName)).size,
      availableFinishes: Array.from(
        new Map(product.variants.map((v) => [v.colorName, { name: v.colorName, hex: v.colorHex }])).values()
      ),
      defaultVariant: {
        storage: defaultVariant?.storage || '256GB',
        colorName: defaultVariant?.colorName || 'Default',
        imageUrl: defaultVariant?.imageUrl || '',
      },
    };
  });

  return <HomeClient products={products} />;
}
