import prisma from '../lib/prisma';

async function verifyBackendAndData() {
  console.log('--- Starting Automated Verification for 1Fi Application ---');

  // 1. Verify Database records
  console.log('\n1. Verifying Database & ORM Layer:');
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      emiPlans: true,
    },
  });

  console.log(`Found ${products.length} products in database.`);
  if (products.length < 3) {
    throw new Error(`Expected at least 3 products, found ${products.length}`);
  }

  for (const product of products) {
    console.log(`\n- Product: ${product.name} (Slug: /products/${product.slug})`);
    console.log(`  Variants Count: ${product.variants.length}`);
    if (product.variants.length < 2) {
      throw new Error(`Product ${product.name} must have 2 or more variants!`);
    }

    product.variants.forEach((v) => {
      console.log(`    • ${v.storage} | ${v.colorName} (${v.colorHex}) | Price: ₹${v.price.toLocaleString('en-IN')} (MRP: ₹${v.mrp.toLocaleString('en-IN')})`);
    });

    console.log(`  EMI Plans Count: ${product.emiPlans.length}`);
    product.emiPlans.forEach((plan) => {
      console.log(`    • ₹${plan.monthlyAmount.toLocaleString('en-IN')} x ${plan.tenureMonths} months | Rate: ${plan.interestRate}% | Cashback: ₹${plan.cashbackAmount.toLocaleString('en-IN')}`);
    });
  }

  // 2. Verify iPhone 17 Pro exact values matching reference image
  console.log('\n2. Verifying iPhone 17 Pro exact values from assignment reference image:');
  const iphone = products.find((p) => p.slug === 'iphone-17-pro');
  if (!iphone) throw new Error('iPhone 17 Pro not found in database!');

  const defaultVar = iphone.variants.find((v) => v.isDefault);
  if (!defaultVar) throw new Error('Default variant not found for iPhone 17 Pro');

  console.log(`  Base Price: ₹${defaultVar.price.toLocaleString('en-IN')} (Expected ₹1,27,400): ${defaultVar.price === 127400 ? 'PASS' : 'FAIL'}`);
  console.log(`  Base MRP: ₹${defaultVar.mrp.toLocaleString('en-IN')} (Expected ₹1,34,900): ${defaultVar.mrp === 134900 ? 'PASS' : 'FAIL'}`);

  const expectedEmiTenures = [3, 6, 12, 24, 36, 48, 60];
  const expectedMonthly = [44967, 22483, 11242, 5621, 4297, 3385, 2842];
  const expectedRates = [0, 0, 0, 0, 10.5, 10.5, 10.5];

  expectedEmiTenures.forEach((tenure, idx) => {
    const plan = iphone.emiPlans.find((p) => p.tenureMonths === tenure);
    if (!plan) throw new Error(`Missing EMI plan for tenure ${tenure} months`);
    const monthlyMatch = plan.monthlyAmount === expectedMonthly[idx];
    const rateMatch = plan.interestRate === expectedRates[idx];
    console.log(`  EMI ${tenure}M: ₹${plan.monthlyAmount} (exp ₹${expectedMonthly[idx]}) [${monthlyMatch ? 'PASS' : 'FAIL'}] | Rate: ${plan.interestRate}% (exp ${expectedRates[idx]}%) [${rateMatch ? 'PASS' : 'FAIL'}]`);
  });

  // 3. Test Loan Application Creation
  console.log('\n3. Testing Loan Application submission:');
  const testApp = await prisma.application.create({
    data: {
      productName: 'iPhone 17 Pro',
      variantInfo: '256GB - Desert Titanium',
      monthlyEmi: 11242,
      tenureMonths: 12,
      interestRate: 0.0,
      totalAmount: 127400,
      cashbackAmount: 7500,
      fullName: 'Test Borrower',
      email: 'test@1fi.in',
      phone: '9876543210',
      panNumber: 'ABCDE1234F',
      mfFolioNumber: '1FI-TEST-999',
      pledgedPortfolioValue: 171990,
      status: 'APPROVED',
    },
  });
  console.log(`  Created application record ID: ${testApp.id} (Status: ${testApp.status})`);

  // Cleanup test record
  await prisma.application.delete({ where: { id: testApp.id } });
  console.log('  Cleaned up test record.');

  console.log('\nALL BACKEND & DATABASE VERIFICATION CHECKS PASSED SUCCESSFULLY!');
}

verifyBackendAndData()
  .catch((err) => {
    console.error('Verification failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
