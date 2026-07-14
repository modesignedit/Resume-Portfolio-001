# Portfolio & Lead Engine

Premium portfolio + CRM lead capture site. Built with Vite + React 19 + Tailwind CSS 4.

---

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # → dist/
```

---

## How to Make It Yours

### 1. Edit your content — `src/data.ts`

This one file controls everything visible on the site:

| What | Field to change |
|------|----------------|
| **Your name, title, photo** | `HERO_DATA.name`, `.title`, `.profileImage` |
| **Your social links** | `HERO_DATA.whatsapp`, `.twitter`, `.linkedin` |
| **Services you offer** | `SERVICES_DATA` array — title, description, price, outcomes |
| **Case studies** | `PROJECTS_DATA` array — title, description, image, tech stack, metrics |
| **Client testimonials** | `TESTIMONIALS_DATA` array — quote, rating, name, avatar |
| **Brand logos (TrustBar)** | `TRUST_BAR` in `TrustBar.tsx` |

Photo URLs use Unsplash — replace with your own images.

### 2. Change admin password — `src/mock.ts`

```ts
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password2026'   // ← change this
};
```

### 3. Replace OG image — `public/og-image.svg`

This is the preview image when your link is shared on social media (1200×630).

### 4. Deploy

```bash
npm run build
# upload dist/ folder to Vercel, Netlify, Cloudflare Pages, or any static host
```

Or one-command Vercel deploy:

```bash
npx vercel --prod
```

No database, no server, no API keys needed.

---

## Features

- **Hero** — profile photo, WhatsApp/LinkedIn/Twitter, dual CTA buttons
- **Services** — 3 premium cards with price anchors and outcome lists
- **Portfolio** — 4 case studies with metrics, tech stack tags
- **Testimonials** — 5-star client quotes with avatars
- **TrustBar** — brand logo strip
- **Contact form** — lead capture with budget selector, stored in localStorage
- **Admin panel** — login with `admin / password2026`, edit everything live
- **Dark/Light mode** — toggle in navbar, persists in browser

### Admin Panel

Click the **A** icon (bottom-right) → log in → edit hero, services, projects, testimonials, view leads and analytics.

Changes save to localStorage. Export from the admin panel to merge back into `data.ts` for permanent deployment.

---

## Project Structure

```
src/
├── data.ts            ← all portfolio content (edit this)
├── types.ts           ← TypeScript interfaces
├── mock.ts            ← localStorage admin CRUD + admin credentials
├── index.css          ← Tailwind v4, light theme, design patterns
├── App.tsx            ← root layout
├── main.tsx           ← entry point
└── components/
    ├── Navbar.tsx     ├── Hero.tsx       ├── Services.tsx
    ├── Portfolio.tsx  ├── Testimonials.tsx
    ├── TrustBar.tsx   ├── ContactForm.tsx
    ├── AdminPanel.tsx └── Footer.tsx
```

---

## Stack

| Layer | What |
|-------|------|
| Framework | Vite 6 + React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | motion (Framer Motion API) |
| Icons | lucide-react |
| State | React + localStorage |

---

## Licence

Free for personal use. Resale as a template requires a licence from the author.
