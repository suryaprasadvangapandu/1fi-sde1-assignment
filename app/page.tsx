import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/data-service';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '1Fi - Smartphones on EMI Backed by Mutual Funds',
  description:
    'Buy iPhone 17 Pro, Samsung S24 Ultra, and top smartphones with 0% No-Cost EMI backed by your mutual fund investments. Zero portfolio liquidation, instant sanction on 1Fi.',
};

export default async function HomePage() {
  const products = await getAllProducts();
  return <HomeClient products={products} />;
}
