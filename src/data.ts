import { Service, Project, Testimonial } from './types';

export const HERO_DATA = {
  name: "Chioma Adebayo",
  title: "CRO & Lead Product Experience Architect",
  headline: "I Engineer High-Converting Digital Systems.",
  subheadline: "Helping global FinTechs and high-growth SaaS companies scale their conversion rate metrics through psychology-driven user experiences and elite visual engineering.",
  primaryCta: "Hire Me to Scale",
  secondaryCta: "View Selected Impact",
  profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  heroGraphic: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  whatsapp: "2348030001122",
  twitter: "https://x.com/chioma_codes",
  linkedin: "https://linkedin.com/in/chioma-adebayo",
  location: "Lagos, Nigeria (GMT+1)"
};

export const SERVICES_DATA: Service[] = [
  {
    id: "cro-landing",
    title: "High-Converting Landing Pages",
    description: "Sleek, lightning-fast single-page landing pages custom-engineered to capture cold traffic and convert them into paying leads.",
    iconName: "Zap",
    outcomes: [
      "Boost cold-traffic conversion rate by up to 45%",
      "Psychologically optimized direct-response layout",
      "Full responsive engineering for ultimate mobile performance"
    ],
    startingPrice: "₦2,500,000"
  },
  {
    id: "saas-ux",
    title: "Premium SaaS Product Design",
    description: "End-to-end user experience audit and visual system redesign tailored to reduce onboarding churn and lock in long-term product value.",
    iconName: "Layers",
    outcomes: [
      "Cut first-week onboarding churn by 30-40%",
      "Establish an elite, scalable Tailwind-ready design system",
      "Streamline user-flows to maximize feature discovery & adoption"
    ],
    startingPrice: "₦4,500,000"
  },
  {
    id: "sales-funnel",
    title: "High-Ticket Sales Funnels",
    description: "Complete funnel construction including persuasive visual wireframing, high-ticket copywriting, and interactive elements.",
    iconName: "TrendingUp",
    outcomes: [
      "Double qualified sales call bookings automatically",
      "Compelling direct-response structure designed to build trust",
      "Seamless integration with Stripe and booking engines"
    ],
    startingPrice: "₦3,800,000"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "saas-analytics",
    title: "BrassFlow SaaS FinTech",
    description: "Complete overhaul of an enterprise analytics dashboard, focusing on data clarity, interactive graphing, and high-density performance tracking.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "Tailwind CSS", "Recharts", "Figma"],
    metrics: "+42% Conversion Rate",
    metricLabel: "User Engagement",
    client: "BrassFlow Corp"
  },
  {
    id: "luxury-ecommerce",
    title: "Kola Luxury Apparel",
    description: "Immersive luxury watch and custom apparel product landing experience with customized checkout funnels and rich interactive visual transitions.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    techStack: ["Next.js", "motion", "Tailwind CSS", "Shopify"],
    metrics: "+29% Sales Lift",
    metricLabel: "Checkout Success",
    client: "Kola Co."
  },
  {
    id: "chronos-app",
    title: "KudaPay Checkout Overhaul",
    description: "A hyper-minimalist personal task and payment payment widget designed to optimize focus, using simple keyboard-driven hotkeys.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800",
    techStack: ["Vite", "TypeScript", "Tailwind CSS", "LocalForage"],
    metrics: "-15min Onboarding",
    metricLabel: "Time-to-Value",
    client: "KudaPay Labs"
  },
  {
    id: "scribe-ai",
    title: "ScribeAI Content Engine",
    description: "AI-assisted copywriting landing page and collaborative canvas designed to turn long-form articles into viral marketing threads.",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "Google GenAI", "Tailwind CSS", "Canvas API"],
    metrics: "2.8x Sign-up Speed",
    metricLabel: "User Acquisition",
    client: "ScribeAI Inc."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Chioma didn't just redesign our website; she redesigned our revenue model. Our landing page conversion rate jumped from 1.8% to 4.3% in the first 30 days. Her eye for conversion psychology is unmatched.",
    rating: 5,
    clientName: "Tunde Balogun",
    clientRole: "VP of Growth & Product",
    clientCompany: "BrassFlow Labs",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    quote: "Working with Chioma was the single best investment we made this year. She has a rare blend of deep customer psychology and beautiful design craft. Our sales pipeline has never been healthier.",
    rating: 5,
    clientName: "Marcus Thorne",
    clientRole: "Founder & CEO",
    clientCompany: "Aether Security",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    quote: "Chioma rebuilt our checkout funnel from scratch. The onboarding experience went from confusing to addictive, immediately cutting our user activation churn in half. Truly outstanding execution.",
    rating: 5,
    clientName: "Elena Rostova",
    clientRole: "Growth Director",
    clientCompany: "ScribeAI",
    clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  }
];
