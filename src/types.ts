export interface AuthorSettings {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  profileImage: string;
  heroGraphic: string;
  whatsapp?: string;
  twitter?: string;
  linkedin?: string;
  location?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  outcomes: string[]; // Business outcomes
  startingPrice: string; // Price anchor
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  metrics: string; // e.g. "+40% Conversion Rate"
  metricLabel: string; // e.g. "Conversion Increase"
  client: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  rating: number; // e.g. 5
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientAvatar: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  projectBrief: string;
  budget: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'archived';
}
