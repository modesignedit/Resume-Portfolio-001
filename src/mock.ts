import { AuthorSettings, Service, Project, Testimonial, Lead } from './types';
import { HERO_DATA, SERVICES_DATA, PROJECTS_DATA, TESTIMONIALS_DATA } from './data';

// Key names for local storage persistence
const KEYS = {
  SETTINGS: 'portfolio_author_settings',
  SERVICES: 'portfolio_services',
  PROJECTS: 'portfolio_projects',
  TESTIMONIALS: 'portfolio_testimonials',
  LEADS: 'portfolio_leads',
  SESSION: 'portfolio_admin_session'
};

// Admin credentials
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password2026'
};

// 1. Core State Load/Save utilities
export function getSettings(): AuthorSettings {
  const data = localStorage.getItem(KEYS.SETTINGS);
  if (data) {
    try { return JSON.parse(data); } catch (_) {}
  }
  return HERO_DATA;
}

export function saveSettings(settings: AuthorSettings): void {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export function getServices(): Service[] {
  const data = localStorage.getItem(KEYS.SERVICES);
  if (data) {
    try { return JSON.parse(data); } catch (_) {}
  }
  return SERVICES_DATA;
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
}

export function getProjects(): Project[] {
  const data = localStorage.getItem(KEYS.PROJECTS);
  if (data) {
    try { return JSON.parse(data); } catch (_) {}
  }
  return PROJECTS_DATA;
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
}

export function getTestimonials(): Testimonial[] {
  const data = localStorage.getItem(KEYS.TESTIMONIALS);
  if (data) {
    try { return JSON.parse(data); } catch (_) {}
  }
  return TESTIMONIALS_DATA;
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
}

export function getLeads(): Lead[] {
  const data = localStorage.getItem(KEYS.LEADS);
  if (data) {
    try { return JSON.parse(data); } catch (_) {}
  }
  return [];
}

export function saveLeads(leads: Lead[]): void {
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
}

// 2. Authentication simulation
export function authenticate(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(KEYS.SESSION, 'active');
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(KEYS.SESSION) === 'active';
}

export function logout(): void {
  localStorage.removeItem(KEYS.SESSION);
}

// 3. Reset to original defaults
export function resetToDefaults(): void {
  localStorage.removeItem(KEYS.SETTINGS);
  localStorage.removeItem(KEYS.SERVICES);
  localStorage.removeItem(KEYS.PROJECTS);
  localStorage.removeItem(KEYS.TESTIMONIALS);
  // Leads are kept unless explicitly cleared, but let's clear session as well
}

// 4. Generate dynamic simulated analytics metrics
export interface AnalyticsData {
  totalLeads: number;
  conversionRate: number;
  conversionDelta: number;
  totalViews: number;
  potentialRevenue: number;
  funnelEfficiency: number;
}

export function getAnalytics(): AnalyticsData {
  const leads = getLeads();
  const activeServices = getServices();
  
  // Base default views
  const totalViews = 1842 + (leads.length * 28);
  
  // Calculate potential contract value in local currency (Naira by default)
  let potentialRevenue = 0;
  leads.forEach(lead => {
    const b = lead.budget;
    if (b.includes('₦10M+')) {
      potentialRevenue += 12500000;
    } else if (b.includes('₦5M')) {
      potentialRevenue += 7500000;
    } else if (b.includes('₦3M')) {
      potentialRevenue += 4000000;
    } else if (b.includes('₦1.5M')) {
      potentialRevenue += 2250000;
    } else if (b.includes('$25,000+')) {
      potentialRevenue += 30000000;
    } else if (b.includes('$10,000')) {
      potentialRevenue += 17500000;
    } else if (b.includes('$5,000')) {
      potentialRevenue += 7500000;
    } else {
      potentialRevenue += 4000000;
    }
  });

  if (potentialRevenue === 0) {
    potentialRevenue = 15800000; // Baseline default mock revenue in Naira
  }

  // Conversion rates (leads / views)
  const conversionRate = parseFloat(((leads.length > 0 ? (leads.length / totalViews) * 100 : 3.8) + 0.6).toFixed(2));
  
  return {
    totalLeads: leads.length > 0 ? leads.length : 14,
    conversionRate: conversionRate > 15 ? 12.4 : conversionRate, // Caps it elegantly
    conversionDelta: 1.4,
    totalViews,
    potentialRevenue,
    funnelEfficiency: 88.5
  };
}
