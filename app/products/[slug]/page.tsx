import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: { variants: true },
  });

  if (!product) {
    return {
      title: 'Product Not Found | 1Fi',
      description: 'The requested product is not available.',
    };
  }

  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];

  return {
    title: `${product.name} on EMI | 0% Mutual Fund Backed EMI Plans | 1Fi`,
    description: `Buy ${product.name} starting at ₹${defaultVariant?.price.toLocaleString('en-IN')} with 0% No-Cost EMI backed by your mutual fund portfolio. Zero liquidation, instant approval on 1Fi.`,
    openGraph: {
      title: `${product.name} on 1Fi Mutual Fund EMI`,
      description: product.description,
      images: defaultVariant?.imageUrl ? [defaultVariant.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch current product with relations
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
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
    notFound();
  }

  // 2. Fetch all other products for comparison
  const allProductsRaw = await prisma.product.findMany({
    include: {
      variants: {
        where: { isDefault: true },
        take: 1,
      },
    },
    take: 6,
  });

  const allProducts = allProductsRaw.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    startingPrice: p.variants[0]?.price || 0,
    defaultVariant: {
      imageUrl: p.variants[0]?.imageUrl || '',
    },
  }));

  // 3. Format product data
  let parsedSpecs: Record<string, string> = {};
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
      storage: v.storage,
      colorName: v.colorName,
      colorHex: v.colorHex,
      mrp: v.mrp,
      price: v.price,
      imageUrl: v.imageUrl,
      images: imgs,
      stock: v.stock,
      isDefault: v.isDefault,
    };
  });

  const transformedProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    tagline: product.tagline,
    description: product.description,
    rating: product.rating,
    reviewCount: product.reviewCount,
    isNew: product.isNew,
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
    })),
    specifications: parsedSpecs,
    highlights: parsedHighlights,
  };

  return (
    <ProductDetailClient
      product={transformedProduct}
      allProducts={allProducts}
    />
  );
}
