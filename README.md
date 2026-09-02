# 1Fi SDE1 Assignment - Full-Stack Mutual Fund EMI Application

A modern, production-grade full-stack web application that allows users to explore flagship smartphones and finance them with **0% No-Cost EMI plans backed by their mutual fund portfolios** without liquidating their investments.

Built for the **1Fi SDE1 Assignment** adhering to all design, backend, database, and functional requirements.

---

## 🚀 Live Demo & Repository

- **Demo URL**: [https://1fi-sde1-assignment.vercel.app](https://1fi-sde1-assignment.vercel.app) *(or run locally via instructions below)*
- **GitHub Repository**: [https://github.com/your-username/1fi-sde1-assignment](https://github.com/your-username/1fi-sde1-assignment)
- **Reference Webpage**: [Snapmint iPhone 17 Pro EMI Reference](https://snapmint.com/p/apple-iphone-17-pro-silver-256-gb-smart-phones-on-emi)

---

## 🌟 Key Features

1. **Dynamic Database-Driven Architecture (No hardcoded data)**:
   - All product information, storage options, color finishes, pricing, images, and EMI plans are fetched dynamically from the database through RESTful APIs.

2. **Pixel-Accurate Product EMI Page (`/products/[slug]`)**:
   - Matches the 1Fi assignment specification and reference image exactly:
     - Header: Dynamic Price (`₹1,27,400`), strike-through MRP (`₹1,34,900`), and savings indicator.
     - Subtitle: *"EMI plans backed by mutual funds"* with explanatory tooltip.
     - Interactive finish selector: *"Available in 3 finishes"* with color swatches (Desert Titanium, Natural Titanium, Black Titanium) that update images and variant states.
     - Storage variant selector (`256GB`, `512GB`, `1TB`) that recalculates pricing and EMI tables dynamically.
     - Selectable EMI Plan Cards:
       - `₹44,967 x 3 months` | `0% interest` | `Additional cashback of ₹7,500`
       - `₹22,483 x 6 months` | `0% interest` | `Additional cashback of ₹7,500`
       - `₹11,242 x 12 months` | `0% interest` | `Additional cashback of ₹7,500` (Recommended)
       - `₹5,621 x 24 months` | `0% interest` | `Additional cashback of ₹7,500`
       - `₹4,297 x 36 months` | `10.5% interest` | `Additional cashback of ₹7,500`
       - `₹3,385 x 48 months` | `10.5% interest` | `Additional cashback of ₹7,500`
       - `₹2,842 x 60 months` | `10.5% interest` | `Additional cashback of ₹7,500`
     - Radio selection with active purple branding and instant feedback.

3. **Unique URLs for Multiple Products**:
   - `/products/iphone-17-pro` (Apple iPhone 17 Pro - 3 finishes, 3 storage variants, 7 EMI plans)
   - `/products/samsung-s24-ultra` (Samsung Galaxy S24 Ultra - 3 finishes, 2 storage variants, 6 EMI plans)
   - `/products/google-pixel-9-pro` (Google Pixel 9 Pro - 3 finishes, 2 storage variants, 5 EMI plans)
   - `/products/oneplus-13` (OnePlus 13 - 2 finishes, 2 storage variants, 5 EMI plans)

4. **1Fi Mutual Fund Sanction Flow Modal**:
   - Multi-step checkout modal verifying user KYC (Name, Phone, PAN) and electronic lien pledge on mutual fund folio (via CAMS/KFintech simulation).
   - Generates instant loan sanction reference number and celebratory approval screen.

5. **Interactive Sliding EMI Calculator**:
   - Real-time simulation of loan amounts, interest rates, tenures, required portfolio collateral, and projected 12% CAGR investment growth during the loan period.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti |
| **Backend** | Next.js API Route Handlers (Node.js RESTful endpoints) |
| **Database & ORM** | SQLite (zero-friction local run) / PostgreSQL compatible via Prisma ORM |
| **Tools** | Prisma Studio, TSX, ESLint |

---

## 🗄️ Database Schema & Architecture

The database is designed with normalized relational models in Prisma:

```
┌────────────────────────────────────────────────────────┐
│                        Product                         │
├────────────────────────────────────────────────────────┤
│ id (PK)              : String (CUID)                   │
│ slug (Unique)        : String                          │
│ name                 : String                          │
│ brand                : String                          │
│ tagline              : String                          │
│ description          : String                          │
│ rating               : Float                           │
│ reviewCount          : Int                             │
│ isNew                : Boolean                         │
│ specifications       : JSON (Display, Chip, Camera...) │
│ highlights           : JSON Array                      │
└───────────┬────────────────────────────────┬───────────┘
            │ 1:N                            │ 1:N
            ▼                                ▼
┌───────────────────────────────┐ ┌────────────────────────────────┐
│            Variant            │ │            EMIPlan             │
├───────────────────────────────┤ ├────────────────────────────────┤
│ id (PK)          : String     │ │ id (PK)            : String    │
│ productId (FK)   : String     │ │ productId (FK)     : String    │
│ storage          : String     │ │ tenureMonths       : Int       │
│ colorName        : String     │ │ monthlyAmount      : Int       │
│ colorHex         : String     │ │ interestRate       : Float     │
│ mrp              : Int        │ │ cashbackAmount     : Int       │
│ price            : Int        │ │ isZeroCost         : Boolean   │
│ imageUrl         : String     │ │ isRecommended      : Boolean   │
│ images           : JSON Array │ │ minMutualFundPort  : Int       │
│ stock            : Int        │ │ orderIndex         : Int       │
│ isDefault        : Boolean    │ └────────────────────────────────┘
└───────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                      Application                       │
├────────────────────────────────────────────────────────┤
│ id (PK)                   : String (CUID)              │
│ productName, variantInfo  : String                     │
│ monthlyEmi, tenureMonths  : Int                        │
│ interestRate, totalAmount : Float / Int                │
│ fullName, email, phone    : String                     │
│ panNumber, mfFolioNumber  : String                     │
│ status                    : String ("APPROVED")        │
└────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints & Example Responses

### 1. `GET /api/products`
Retrieves a list of all smartphone products with summary pricing, lowest monthly EMI, and available finishes.

**Request:**
```http
GET /api/products?brand=Apple
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "cmtk3...",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "tagline": "EMI plans backed by mutual funds",
      "startingPrice": 127400,
      "startingMrp": 134900,
      "discountPercent": 6,
      "lowestMonthlyEmi": 2842,
      "hasZeroCostEmi": true,
      "colorsCount": 3,
      "availableFinishes": [
        { "name": "Desert Titanium", "hex": "#D4AF37" },
        { "name": "Natural Titanium", "hex": "#8A8680" },
        { "name": "Black Titanium", "hex": "#2B2B2B" }
      ],
      "defaultVariant": {
        "storage": "256GB",
        "colorName": "Desert Titanium",
        "price": 127400,
        "imageUrl": "https://images.unsplash.com/photo-1695048133142-1a20484d2569..."
      }
    }
  ]
}
```

---

### 2. `GET /api/products/:slug`
Fetches complete product information, all variants, and all available mutual fund EMI plans.

**Request:**
```http
GET /api/products/iphone-17-pro
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cmtk3...",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "tagline": "EMI plans backed by mutual funds",
    "availableFinishes": [
      { "colorName": "Desert Titanium", "colorHex": "#D4AF37" },
      { "colorName": "Natural Titanium", "colorHex": "#8A8680" },
      { "colorName": "Black Titanium", "colorHex": "#2B2B2B" }
    ],
    "availableStorages": ["256GB", "512GB", "1TB"],
    "variants": [
      {
        "id": "v1",
        "storage": "256GB",
        "colorName": "Desert Titanium",
        "price": 127400,
        "mrp": 134900,
        "savings": 7500,
        "imageUrl": "https://..."
      }
    ],
    "emiPlans": [
      {
        "id": "p1",
        "tenureMonths": 3,
        "monthlyAmount": 44967,
        "interestRate": 0,
        "cashbackAmount": 7500,
        "isZeroCost": true
      },
      {
        "id": "p3",
        "tenureMonths": 12,
        "monthlyAmount": 11242,
        "interestRate": 0,
        "cashbackAmount": 7500,
        "isZeroCost": true,
        "isRecommended": true
      },
      {
        "id": "p5",
        "tenureMonths": 36,
        "monthlyAmount": 4297,
        "interestRate": 10.5,
        "cashbackAmount": 7500,
        "isZeroCost": false
      }
    ]
  }
}
```

---

### 3. `GET /api/emi/calculate`
Calculates dynamic EMI schedules, total interest, and estimated mutual fund compounding growth.

**Request:**
```http
GET /api/emi/calculate?price=127400&tenure=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "price": 127400,
    "plans": [
      {
        "tenureMonths": 12,
        "monthlyEmi": 10617,
        "interestRate": 0,
        "cashbackAmount": 7500,
        "totalPayable": 127400,
        "totalInterest": 0,
        "minMutualFundPortfolio": 171990,
        "estimatedMFGrowth": 20639,
        "netFinancialBenefit": 28139
      }
    ]
  }
}
```

---

### 4. `POST /api/applications`
Submits a mutual fund EMI application and sanctions loan approval.

**Request:**
```http
POST /api/applications
Content-Type: application/json

{
  "productName": "iPhone 17 Pro",
  "variantInfo": "256GB - Desert Titanium",
  "monthlyEmi": 11242,
  "tenureMonths": 12,
  "interestRate": 0.0,
  "totalAmount": 127400,
  "cashbackAmount": 7500,
  "fullName": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "panNumber": "ABCDE1234F",
  "mfFolioNumber": "1FI-HDFC-99281"
}
```

**Response:**
```json
{
  "success": true,
  "message": "1Fi Mutual Fund EMI application sanctioned successfully!",
  "data": {
    "applicationId": "cmtk...",
    "sanctionReference": "1FI-829104",
    "status": "APPROVED",
    "summary": {
      "borrower": "Rahul Sharma",
      "product": "iPhone 17 Pro",
      "variant": "256GB - Desert Titanium",
      "monthlyEmi": 11242,
      "tenure": "12 Months",
      "interestRate": "0%",
      "cashbackApplicable": "₹7,500",
      "pledgedFolio": "1FI-HDFC-99281"
    }
  }
}
```

---

### 5. `GET /api/health`
Health check status of API and database connection.

**Response:**
```json
{
  "status": "healthy",
  "app": "1Fi SDE1 Assignment Full-Stack Web App",
  "database": {
    "status": "connected",
    "stats": {
      "products": 4,
      "variants": 17,
      "emiPlans": 23
    }
  }
}
```

---

## 💻 Local Setup & Run Instructions

### Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **npm** or **pnpm** or **yarn**

### Step 1: Clone and Install Dependencies
```bash
git clone https://github.com/your-username/1fi-sde1-assignment.git
cd 1fi-sde1-assignment
npm install
```

### Step 2: Initialize Database & Run Seed
```bash
# Push schema to SQLite database
npx prisma db push

# Seed products, variants, and EMI plans
npx tsx prisma/seed.ts
```

### Step 3: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Run Automated Verification Tests
```bash
npx tsx scripts/test-verification.ts
```

---

## 📦 Deployment Instructions (Vercel / Render)

### Deploying on Vercel:
1. Push your repository to GitHub.
2. Import project into [Vercel](https://vercel.com).
3. Set environment variable:
   - `DATABASE_URL="file:./dev.db"` (for SQLite) or connect to Supabase/Neon PostgreSQL: `DATABASE_URL="postgresql://..."`
4. Set Build Command: `npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts && next build`
5. Click **Deploy**.

---

## 📝 Assignment Checklist

- [x] Load data from backend API connected to database (no hardcoded data)
- [x] Unique URLs for each product (`/products/iphone-17-pro`, `/products/samsung-s24-ultra`, etc.)
- [x] Include at least 3 products with 2+ variants each (Included 4 products with up to 6 variants each)
- [x] Full product details (name, storage, color, MRP, price, product image)
- [x] List of available EMI plans (Monthly amount, Tenure, Interest rate, Cashback info)
- [x] Selectable EMI plans with highlighted active state
- [x] Button to proceed with selected plan + interactive application modal
- [x] Clean relational database schema & seed scripts
- [x] Comprehensive README with setup, API endpoints, schema, and tech stack
