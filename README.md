# 🍽️ Bon Appétit — Restaurant Food Ordering & Delivery App

A full-featured restaurant web application built with **Next.js 15**, **TypeScript**, and **Supabase**. Customers can browse the menu, add items to their cart, apply coupons, book table reservations, and track their delivery on an interactive map.

---

## ✨ Features

- **Menu Browsing** — Filter and explore menu items by category with real-time data from Supabase
- **Item Detail Pages** — View full descriptions, images, and nutritional info for each dish
- **Shopping Cart** — Add/remove items, adjust quantities, and see a live price breakdown
- **Coupons & Discounts** — Apply coupon codes to unlock discounts on your order
- **Order Placement** — Submit orders with delivery address and preferred delivery options
- **Delivery Map** — Visualize your delivery route with an interactive Leaflet map
- **Table Reservations** — Book a table directly through the reservation form
- **Contact Page** — Send inquiries to the restaurant
- **Responsive Design** — Mobile-first UI powered by Tailwind CSS and Framer Motion animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Framer Motion |
| UI Components | Lucide React, React Icons, Swiper |
| Database & Auth | [Supabase](https://supabase.com) (PostgreSQL) |
| Form Validation | [Zod](https://zod.dev) |
| Map | Leaflet (via DeliveryMap component) |
| Deployment | [Vercel](https://vercel.com) |

---

## 📁 Project Structure

```
restaurant-bon-appetit/
├── public/                  # Static assets (images, SVGs)
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── page.tsx         # Home page
│   │   ├── menu/            # Menu listing & item detail pages
│   │   ├── cart/            # Shopping cart page
│   │   ├── deliverydetail/  # Delivery address & options
│   │   ├── reserve/         # Table reservation page
│   │   ├── contact/         # Contact page
│   │   ├── about/           # About page
│   │   └── api/             # REST API routes (menu, cart, orders, reserve, coupon)
│   ├── components/          # Reusable React components
│   ├── context/             # CartContext — global cart state
│   ├── lib/                 # Supabase client, fetch helpers, utilities
│   ├── data/                # Static data fixtures (menu items, FAQs, etc.)
│   └── types/               # Shared TypeScript type definitions
├── next.config.ts
├── tailwind.config.*
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Supabase](https://supabase.com) project (free tier is fine)

### 1. Clone the repository

```bash
git clone https://github.com/OrionLynn19/restaurant-bon-appetit.git
cd restaurant-bon-appetit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

> You can find these values in your Supabase project under **Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint across the project |

---

## 🌐 API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET / POST | `/api/menu` | List or create menu items |
| GET / PUT / DELETE | `/api/menu/[id]` | Read, update, or delete a menu item |
| GET | `/api/categories` | List menu categories |
| GET / POST / DELETE | `/api/cart` | Get, add to, or clear the cart |
| PUT / DELETE | `/api/cart/[id]` | Update or remove a specific cart item |
| POST | `/api/cart/items` | Add an item to the cart |
| GET / POST | `/api/orders` | List or place orders |
| GET / PUT | `/api/orders/[id]` | Get or update a specific order |
| POST | `/api/reserve` | Submit a table reservation |
| POST | `/api/coupon/validate` | Validate a coupon code |

---

## ☁️ Deployment

The easiest way to deploy is with **Vercel**:

1. Push your repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add the three environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) in the Vercel dashboard under **Settings → Environment Variables**.
4. Deploy — Vercel automatically detects Next.js and builds the project.

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📄 License

This project is open source. Feel free to use and adapt it for your own projects.
