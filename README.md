# Chioma Adebayo — Portfolio & Lead Engine

Premium conversion-optimised portfolio site built for Nigerian tech professionals. Deploy in 2 minutes.

## Quick Deploy (Vercel)

```bash
npm install && npm run build
npx vercel --prod
```

Set `NODE_ENV=production` if needed. No database required — all content lives in `src/data.ts` and `src/mock.ts` (localStorage admin panel).

## Customise

Edit `src/data.ts` to replace the portfolio with your own:

| Field | Location |
|-------|----------|
| Name, title, photo | `HERO_DATA` |
| Services offered | `SERVICES_DATA` |
| Case studies | `PROJECTS_DATA` |
| Testimonials | `TESTIMONIALS_DATA` |
| Logo | Replace in `Navbar.tsx` |

Or use the admin panel: click the **A** icon → log in with `admin / password2026` → edit everything live.

## Admin Access

| URL | Purpose |
|-----|---------|
| `/` | Public portfolio |
| `/?admin=1` | Opens admin panel |
| Login | `admin` / `password2026` |

Admin features: live hero editor, service/project/testimonial CRUD, CRM lead inbox, analytics dashboard.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **motion** (Framer Motion API)
- **lucide-react** (icons)
- **Unsplash** (imagery — replace for production)

## Building

```bash
npm run dev       # local dev at port 3000
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # tsc type-check
```

## OG Image

`public/og-image.svg` is the social-sharing preview (1200×630). Replace it with your own branded version.

## Licence

Free for Nigerian tech professionals to deploy and customise. Resale as a template requires a commercial licence from the author.
