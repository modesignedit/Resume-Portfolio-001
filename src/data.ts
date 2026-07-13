import { Service, Project, Testimonial } from './types';

export const HERO_DATA = {
  name: "Chioma Adebayo",
  title: "UI/UX & Conversion Architect — Lagos",
  headline: "I Build Digital Products That Convert.",
  subheadline: "From Lagos to the world — helping African fintechs and global SaaS companies scale revenue through psychology-driven UX, performant interfaces, and conversion-first design systems.",
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
    title: "PaySwitch Merchant Dashboard",
    description: "Complete redesign of a high-volume payment processing dashboard for a Nigerian fintech, focusing on real-time transaction clarity, settlement tracking, and agent performance analytics.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "Tailwind CSS", "Recharts", "Figma"],
    metrics: "+42% Conversion Rate",
    metricLabel: "User Engagement",
    client: "PaySwitch NG"
  },
  {
    id: "luxury-ecommerce",
    title: "Asoebi Belle Marketplace",
    description: "Immersive marketplace for premium Nigerian fashion and accessories with seamless Flutterwave checkout, size-fit visualiser, and rich product storytelling.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    techStack: ["Next.js", "motion", "Tailwind CSS", "Flutterwave"],
    metrics: "+29% Sales Lift",
    metricLabel: "Checkout Success",
    client: "Asoebi Belle"
  },
  {
    id: "chronos-app",
    title: "MoniePoint Agent Onboarding",
    description: "Simplified POS agent onboarding flow for Nigeria's largest merchant network — cutting form fields, adding USSD fallback, and optimising for low-bandwidth markets.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800",
    techStack: ["Vite", "TypeScript", "Tailwind CSS", "PWA"],
    metrics: "-15min Onboarding",
    metricLabel: "Time-to-Value",
    client: "MoniePoint"
  },
  {
    id: "scribe-ai",
    title: "Bamboo Investment UX Redesign",
    description: "End-to-end UX overhaul for a Nigerian stock investment platform — simplified KYC flow, intuitive portfolio visualisation, and localised naira-to-dollar conversion display.",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    metrics: "2.8x Sign-up Speed",
    metricLabel: "User Acquisition",
    client: "Bamboo"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Chioma didn't just redesign our checkout; she rebuilt it for the Nigerian market. Our success rate jumped from 54% to 91% after she optimised for USSD, transfer, and card — all in one flow.",
    rating: 5,
    clientName: "Tunde Balogun",
    clientRole: "VP of Growth & Product",
    clientCompany: "PaySwitch NG",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    quote: "She understood our users better than we did. Chioma's redesign of our KYC flow cut drop-off by 60% — and she was the one who insisted on adding USSD fallback for feature phone users. Game changer.",
    rating: 5,
    clientName: "Yetunde Ogunlesi",
    clientRole: "Founder & CEO",
    clientCompany: "MoniePoint",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    quote: "Chioma completely rethought our investment dashboard for the Nigerian retail investor. The localised naira display and simplified stock-buying flow made us the top-grossing fintech on the app store.",
    rating: 5,
    clientName: "Emeka Nwosu",
    clientRole: "Growth Director",
    clientCompany: "Bamboo",
    clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  }
];
