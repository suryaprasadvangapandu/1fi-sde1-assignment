import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/data-service';
import ProductDetailClient from '@/components/ProductDetailClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | 1Fi',
      description: 'The requested product is not available.',
    };
  }

  return {
    title: `${product.name} on EMI | 0% Mutual Fund Backed EMI Plans | 1Fi`,
    description: `Buy ${product.name} starting at ₹${product.startingPrice.toLocaleString('en-IN')} with 0% No-Cost EMI backed by your mutual fund portfolio. Zero liquidation, instant approval on 1Fi.`,
    openGraph: {
      title: `${product.name} on 1Fi Mutual Fund EMI`,
      description: product.description,
      images: product.defaultVariant?.imageUrl ? [product.defaultVariant.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();

  return (
    <ProductDetailClient
      product={product}
      allProducts={allProducts}
    />
  );
}
