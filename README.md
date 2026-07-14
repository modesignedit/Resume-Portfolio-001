# Chioma Adebayo — Portfolio & Lead Engine

Premium conversion-optimised portfolio site for Nigerian tech professionals. Built with Vite + React 19 + Tailwind CSS 4.

**Live:** https://chioma-portfolio-kappa.vercel.app

---

## Features

- **Hero** — profile photo, WhatsApp/LinkedIn/Twitter links, dual CTA buttons
- **Services** — 3 premium service cards with price anchors and outcome lists
- **Portfolio** — 4 case studies with metrics, tech stack tags, client names
- **Testimonials** — 5-star client quotes with avatars
- **TrustBar** — brand strip (PaySwitch, MoniePoint, Bamboo, Flutterwave, Asoebi Belle)
- **Contact form** — lead capture with budget selector, stored in localStorage
- **Footer** — social links, copyright, hidden "A PROJECT BY KNOW NATION LIMITED" credit
- **Admin panel** — full CRM, content editor, analytics dashboard

### Admin Panel

Click the **A** icon (bottom-right floating button) → log in with `admin / password2026`.

| Feature | Description |
|---------|-------------|
| **Hero editor** | Change name, title, headline, subheadline, CTAs, social links |
| **Service CRUD** | Add/edit/delete services with icon picker |
| **Project CRUD** | Add/edit/delete case studies |
| **Testimonial CRUD** | Add/edit/delete client quotes |
| **Lead inbox** | Review, contact, archive incoming leads from the contact form |
| **Analytics** | Dashboard with conversion funnel, lead sources, monthly trends, stats |

All data persists in `localStorage`. Export your changes as a JSON patch to merge back into `src/data.ts` for permanent deployment.

---

## Customisation (No Code)

1. Edit `src/data.ts` — all portfolio content is in one file:
   - `HERO_DATA` — name, title, photo URL, social links
   - `SERVICES_DATA` — service cards, prices, outcomes
   - `PROJECTS_DATA` — case studies, images, tech stack, metrics
   - `TESTIMONIALS_DATA` — client quotes, ratings, avatars

2. Replace Unsplash image URLs with your own images.

3. See **Deploy** below to publish.

---

## Development

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # → dist/
npm run preview   # preview production build locally
npm run lint      # TypeScript type-check
```

### Project Structure

```
src/
├── App.tsx              # root layout, section composition
├── main.tsx             # entry point
├── index.css            # Tailwind v4 imports, light theme, textile pattern
├── data.ts              # all portfolio content
├── types.ts             # TypeScript interfaces
├── mock.ts              # localStorage admin CRUD + lead/analytics logic
├── assets/              # additional assets
└── components/
    ├── Navbar.tsx       # top bar, theme toggle, logo
    ├── Hero.tsx         # hero section with profile image + textile bg
    ├── Services.tsx     # 3 service cards with staggered animation
    ├── Portfolio.tsx    # 4 case studies with metrics
    ├── Testimonials.tsx # client quotes carousel
    ├── TrustBar.tsx     # brand logo strip
    ├── ContactForm.tsx  # lead capture form
    ├── AdminPanel.tsx   # full admin dashboard
    └── Footer.tsx       # social links, copyright, credit
```

---

## Deploy

### Vercel (recommended)

The repo is connected to Vercel — pushing to `main` auto-deploys.

```bash
git push origin main
```

Manual deploy:

```bash
npm install && npm run build
npx vercel --prod
```

### Any static host

```bash
npm run build
# upload the dist/ folder to any static host (Netlify, Cloudflare Pages, etc.)
```

No database or server required.

---

## Theme

- **Dark mode** — default, Lagos-indigo palette
- **Light mode** — toggle in navbar, persists in `localStorage` (`chioma_theme`)
- **Design direction** — "Lagos Warmth": indigo-600 primary, rose-500 accent, diamond textile motif on hero

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Vite 6 + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Animation | `motion` (Framer Motion API) |
| Icons | lucide-react |
| State | React state + localStorage |
| Admin | `src/mock.ts` — localStorage CRUD with optimistic UI |

---

## Licence

Free for Nigerian tech professionals to deploy and customise. Resale as a template requires a commercial licence from the author.
