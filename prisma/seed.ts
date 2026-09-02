import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 1Fi database with smartphones, variants, and mutual fund EMI plans...');

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // 1. Apple iPhone 17 Pro
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      tagline: 'EMI plans backed by mutual funds',
      description:
        'Forged in grade 5 titanium with an advanced vapor chamber cooling system. Featuring the groundbreaking A19 Pro chip, 48MP ProRAW triple-lens array with 5x optical zoom, and 1Fi Mutual Fund pledge financing that keeps your wealth compounding.',
      isNew: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 3420,
      specifications: JSON.stringify({
        Display: '6.3-inch Super Retina XDR OLED, 120Hz ProMotion, Always-On, 3000 nits peak brightness',
        Processor: 'Apple A19 Pro (3nm) with 6-core GPU and Hardware-accelerated Ray Tracing',
        Camera: 'Triple 48MP (Main) + 48MP (Ultra-Wide) + 48MP (5x Periscope Telephoto), 4K Dolby Vision at 120 fps',
        Battery: 'Up to 29 hours video playback, Qi2 & MagSafe fast wireless charging (50% in 25 mins)',
        Build: 'Grade 5 Titanium frame, Ceramic Shield Gen 2 front, Textured matte glass back',
        Connectivity: '5G Sub-6 & mmWave, Wi-Fi 7, Bluetooth 5.4, USB-C 3.2 (10Gbps)',
        OS: 'iOS 19 with Apple Intelligence',
        MutualFundBenefit: 'Pledge ₹60,000+ mutual fund units. Zero prepayment charges. 100% digital KYC approval.',
      }),
      highlights: JSON.stringify([
        '0% No-Cost EMI up to 24 Months backed by Mutual Funds',
        'Flat ₹7,500 Additional Cashback on 1Fi financing',
        'Zero liquidation required: Earn market returns on your MF while paying monthly',
        'Instant paperless approval in under 60 seconds',
      ]),
      variants: {
        create: [
          // Desert Titanium
          {
            storage: '256GB',
            colorName: 'Desert Titanium',
            colorHex: '#D4AF37',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 35,
            isDefault: true,
          },
          {
            storage: '512GB',
            colorName: 'Desert Titanium',
            colorHex: '#D4AF37',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 20,
            isDefault: false,
          },
          {
            storage: '1TB',
            colorName: 'Desert Titanium',
            colorHex: '#D4AF37',
            mrp: 174900,
            price: 167400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 12,
            isDefault: false,
          },
          // Natural Titanium
          {
            storage: '256GB',
            colorName: 'Natural Titanium',
            colorHex: '#8A8680',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 28,
            isDefault: false,
          },
          {
            storage: '512GB',
            colorName: 'Natural Titanium',
            colorHex: '#8A8680',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 15,
            isDefault: false,
          },
          // Black Titanium
          {
            storage: '256GB',
            colorName: 'Black Titanium',
            colorHex: '#2B2B2B',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 30,
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            monthlyAmount: 44967,
            interestRate: 0.0,
            cashbackAmount: 7500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 60000,
            orderIndex: 1,
          },
          {
            tenureMonths: 6,
            monthlyAmount: 22483,
            interestRate: 0.0,
            cashbackAmount: 7500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 60000,
            orderIndex: 2,
          },
          {
            tenureMonths: 12,
            monthlyAmount: 11242,
            interestRate: 0.0,
            cashbackAmount: 7500,
            isZeroCost: true,
            isRecommended: true,
            processingFee: 0,
            minMutualFundPortfolio: 60000,
            orderIndex: 3,
          },
          {
            tenureMonths: 24,
            monthlyAmount: 5621,
            interestRate: 0.0,
            cashbackAmount: 7500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 60000,
            orderIndex: 4,
          },
          {
            tenureMonths: 36,
            monthlyAmount: 4297,
            interestRate: 10.5,
            cashbackAmount: 7500,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 499,
            minMutualFundPortfolio: 60000,
            orderIndex: 5,
          },
          {
            tenureMonths: 48,
            monthlyAmount: 3385,
            interestRate: 10.5,
            cashbackAmount: 7500,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 499,
            minMutualFundPortfolio: 60000,
            orderIndex: 6,
          },
          {
            tenureMonths: 60,
            monthlyAmount: 2842,
            interestRate: 10.5,
            cashbackAmount: 7500,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 499,
            minMutualFundPortfolio: 60000,
            orderIndex: 7,
          },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      tagline: 'EMI plans backed by mutual funds',
      description:
        'The definitive Galaxy AI flagship phone featuring a titanium chassis, integrated S Pen stylus, Corning Gorilla Armor anti-reflective glass, and a versatile 200MP Quad Tele camera system with up to 100x Space Zoom.',
      isNew: false,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 2840,
      specifications: JSON.stringify({
        Display: '6.8-inch Dynamic AMOLED 2X, QHD+ (3120 x 1440), 1-120Hz LTPO, 2600 nits peak',
        Processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
        Camera: '200MP (Wide OIS) + 50MP (5x Periscope OIS) + 10MP (3x Telephoto) + 12MP (Ultra-Wide)',
        Battery: '5000 mAh, 45W Fast Charging (65% in 30 mins), 15W Wireless PowerShare',
        Build: 'Titanium frame, Gorilla Glass Armor front, Gorilla Glass Victus 2 back',
        Connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, Ultra Wideband (UWB)',
        OS: 'One UI 6.1 with 7 years of Android OS and Security updates',
        MutualFundBenefit: 'Pledge ₹60,000+ mutual fund units. Zero foreclosure penalty anytime.',
      }),
      highlights: JSON.stringify([
        '0% No-Cost EMI up to 24 Months backed by Mutual Funds',
        'Flat ₹6,000 Additional Cashback on 1Fi financing',
        'Built-in S-Pen with Air Actions and AI translation',
        'Instant approval without breaking your mutual fund investments',
      ]),
      variants: {
        create: [
          {
            storage: '256GB',
            colorName: 'Titanium Gray',
            colorHex: '#6B6967',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 24,
            isDefault: true,
          },
          {
            storage: '512GB',
            colorName: 'Titanium Gray',
            colorHex: '#6B6967',
            mrp: 149999,
            price: 139999,
            imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 18,
            isDefault: false,
          },
          {
            storage: '256GB',
            colorName: 'Titanium Violet',
            colorHex: '#4F4759',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 15,
            isDefault: false,
          },
          {
            storage: '256GB',
            colorName: 'Titanium Black',
            colorHex: '#2B2A2F',
            mrp: 139999,
            price: 129999,
            imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 22,
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            monthlyAmount: 43333,
            interestRate: 0.0,
            cashbackAmount: 6000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 55000,
            orderIndex: 1,
          },
          {
            tenureMonths: 6,
            monthlyAmount: 21666,
            interestRate: 0.0,
            cashbackAmount: 6000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 55000,
            orderIndex: 2,
          },
          {
            tenureMonths: 12,
            monthlyAmount: 10833,
            interestRate: 0.0,
            cashbackAmount: 6000,
            isZeroCost: true,
            isRecommended: true,
            processingFee: 0,
            minMutualFundPortfolio: 55000,
            orderIndex: 3,
          },
          {
            tenureMonths: 24,
            monthlyAmount: 5416,
            interestRate: 0.0,
            cashbackAmount: 6000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 55000,
            orderIndex: 4,
          },
          {
            tenureMonths: 36,
            monthlyAmount: 4215,
            interestRate: 10.5,
            cashbackAmount: 6000,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 499,
            minMutualFundPortfolio: 55000,
            orderIndex: 5,
          },
          {
            tenureMonths: 48,
            monthlyAmount: 3320,
            interestRate: 10.5,
            cashbackAmount: 6000,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 499,
            minMutualFundPortfolio: 55000,
            orderIndex: 6,
          },
        ],
      },
    },
  });

  // 3. Google Pixel 9 Pro
  const pixel = await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      brand: 'Google',
      tagline: 'EMI plans backed by mutual funds',
      description:
        'Experience pure Google innovation with Google Tensor G4 and Gemini on-device AI. Unmatched computational photography, Super Actua display, and seamless mutual-fund-backed EMI payment options.',
      isNew: true,
      isFeatured: true,
      rating: 4.7,
      reviewCount: 1950,
      specifications: JSON.stringify({
        Display: '6.3-inch Super Actua LTPO OLED (1280 x 2856), 1-120Hz, 3000 nits peak',
        Processor: 'Google Tensor G4 with Titan M2 security coprocessor',
        Camera: '50MP Octa PD Wide + 48MP Quad PD Ultrawide with Macro Focus + 48MP Quad PD 5x Telephoto (30x Super Res Zoom)',
        Battery: '4700 mAh, 27W wired fast charging, Fast wireless charging with Battery Share',
        Build: 'Polished aluminum frame, Matte back glass, Corning Gorilla Glass Victus 2',
        Connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, UWB, Satellite SOS',
        OS: 'Android 15 with 7 years of Pixel Drops & Security updates',
        MutualFundBenefit: 'Zero down-payment with mutual fund collateral. Instant 100% digital sanction.',
      }),
      highlights: JSON.stringify([
        '0% No-Cost EMI up to 24 Months backed by Mutual Funds',
        'Flat ₹5,000 Additional Cashback on 1Fi financing',
        'Next-gen Google AI camera features: Add Me, Best Take, Magic Editor',
        'No income proof required for active mutual fund investors',
      ]),
      variants: {
        create: [
          {
            storage: '128GB',
            colorName: 'Porcelain',
            colorHex: '#ECEBE7',
            mrp: 109999,
            price: 99999,
            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 20,
            isDefault: true,
          },
          {
            storage: '256GB',
            colorName: 'Porcelain',
            colorHex: '#ECEBE7',
            mrp: 119999,
            price: 109999,
            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 14,
            isDefault: false,
          },
          {
            storage: '128GB',
            colorName: 'Obsidian',
            colorHex: '#2D2E30',
            mrp: 109999,
            price: 99999,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 16,
            isDefault: false,
          },
          {
            storage: '128GB',
            colorName: 'Hazel',
            colorHex: '#6B7068',
            mrp: 109999,
            price: 99999,
            imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 10,
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            monthlyAmount: 33333,
            interestRate: 0.0,
            cashbackAmount: 5000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 45000,
            orderIndex: 1,
          },
          {
            tenureMonths: 6,
            monthlyAmount: 16666,
            interestRate: 0.0,
            cashbackAmount: 5000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 45000,
            orderIndex: 2,
          },
          {
            tenureMonths: 12,
            monthlyAmount: 8333,
            interestRate: 0.0,
            cashbackAmount: 5000,
            isZeroCost: true,
            isRecommended: true,
            processingFee: 0,
            minMutualFundPortfolio: 45000,
            orderIndex: 3,
          },
          {
            tenureMonths: 24,
            monthlyAmount: 4166,
            interestRate: 0.0,
            cashbackAmount: 5000,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 45000,
            orderIndex: 4,
          },
          {
            tenureMonths: 36,
            monthlyAmount: 3243,
            interestRate: 10.5,
            cashbackAmount: 5000,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 399,
            minMutualFundPortfolio: 45000,
            orderIndex: 5,
          },
        ],
      },
    },
  });

  // 4. OnePlus 13
  const oneplus = await prisma.product.create({
    data: {
      slug: 'oneplus-13',
      name: 'OnePlus 13',
      brand: 'OnePlus',
      tagline: 'EMI plans backed by mutual funds',
      description:
        'Next-generation flagship speed powered by Snapdragon 8 Elite, 2K 120Hz display with Glove Touch, 6000mAh battery with 100W SUPERVOOC charging, and 50MP Hasselblad Master Camera.',
      isNew: true,
      isFeatured: false,
      rating: 4.8,
      reviewCount: 1420,
      specifications: JSON.stringify({
        Display: '6.82-inch 2K Oriental Screen 2.0 (3168 x 1440), 120Hz LTPO, 4500 nits peak',
        Processor: 'Qualcomm Snapdragon 8 Elite (3nm, Oryon CPU)',
        Camera: '50MP Sony LYT-808 (OIS) + 50MP 3x Periscope Telephoto + 50MP Ultra-Wide with Hasselblad Color Calibration',
        Battery: '6000 mAh Glacier Battery, 100W SUPERVOOC (1-100% in 36 mins), 50W AIRVOOC Wireless',
        Build: 'Aerospace aluminum middle frame, IP68 / IP69 dust and water resistance',
        Connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, Infrared blaster',
        OS: 'OxygenOS 15 based on Android 15',
        MutualFundBenefit: 'Zero foreclosure lock-in. Retain compounding returns on your portfolio.',
      }),
      highlights: JSON.stringify([
        '0% No-Cost EMI up to 24 Months backed by Mutual Funds',
        'Flat ₹3,500 Additional Cashback on 1Fi financing',
        'Huge 6000 mAh Silicon-Carbon Battery with 100W Charging',
        'Lightning fast sanction with paperless pledge',
      ]),
      variants: {
        create: [
          {
            storage: '256GB',
            colorName: 'Midnight Ocean',
            colorHex: '#1D3557',
            mrp: 74999,
            price: 69999,
            imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 30,
            isDefault: true,
          },
          {
            storage: '512GB',
            colorName: 'Midnight Ocean',
            colorHex: '#1D3557',
            mrp: 84999,
            price: 79999,
            imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 18,
            isDefault: false,
          },
          {
            storage: '256GB',
            colorName: 'Black Eclipse',
            colorHex: '#1F2421',
            mrp: 74999,
            price: 69999,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            ]),
            stock: 25,
            isDefault: false,
          },
        ],
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            monthlyAmount: 23333,
            interestRate: 0.0,
            cashbackAmount: 3500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 35000,
            orderIndex: 1,
          },
          {
            tenureMonths: 6,
            monthlyAmount: 11666,
            interestRate: 0.0,
            cashbackAmount: 3500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 35000,
            orderIndex: 2,
          },
          {
            tenureMonths: 12,
            monthlyAmount: 5833,
            interestRate: 0.0,
            cashbackAmount: 3500,
            isZeroCost: true,
            isRecommended: true,
            processingFee: 0,
            minMutualFundPortfolio: 35000,
            orderIndex: 3,
          },
          {
            tenureMonths: 24,
            monthlyAmount: 2916,
            interestRate: 0.0,
            cashbackAmount: 3500,
            isZeroCost: true,
            isRecommended: false,
            processingFee: 0,
            minMutualFundPortfolio: 35000,
            orderIndex: 4,
          },
          {
            tenureMonths: 36,
            monthlyAmount: 2270,
            interestRate: 10.5,
            cashbackAmount: 3500,
            isZeroCost: false,
            isRecommended: false,
            processingFee: 299,
            minMutualFundPortfolio: 35000,
            orderIndex: 5,
          },
        ],
      },
    },
  });

  console.log(`Successfully seeded ${[iphone.name, samsung.name, pixel.name, oneplus.name].join(', ')} with complete variants and mutual fund EMI plans!`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
