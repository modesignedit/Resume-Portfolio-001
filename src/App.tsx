import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { getSettings, getServices, getProjects, getTestimonials } from './mock';
import { AuthorSettings, Service, Project, Testimonial } from './types';
import { ShieldCheck, Sparkles } from 'lucide-react';

function useTheme() {
  const [theme, setThemeState] = useState(() => localStorage.getItem('portfolio_theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);
  return [theme, () => setThemeState(t => t === 'dark' ? 'light' : 'dark')] as const;
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [selectedService, setSelectedService] = useState('');
  const [adminActive, setAdminActive] = useState(false);

  // Dynamic Portfolio States
  const [settings, setSettings] = useState<AuthorSettings>(getSettings());
  const [services, setServices] = useState<Service[]>(getServices());
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());

  // Sync document title from settings
  useEffect(() => {
    const name = settings.name || 'Portfolio';
    const title = settings.title ? `${name} — ${settings.title}` : name;
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', settings.subheadline || 'Premium portfolio');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', settings.subheadline || 'Premium portfolio');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', settings.subheadline || 'Premium portfolio');
  }, [settings.name, settings.title, settings.subheadline]);

  // Function to reload data from mock database in real-time
  const handleDataChanged = () => {
    setSettings(getSettings());
    setServices(getServices());
    setProjects(getProjects());
    setTestimonials(getTestimonials());
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCtaClick = () => {
    handleScrollToSection('contact');
  };

  const handleViewWorkClick = () => {
    handleScrollToSection('portfolio');
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleScrollToSection('contact');
  };

  const handleClearSelectedService = () => {
    setSelectedService('');
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-indigo-600/30 selection:text-white overflow-x-hidden antialiased">
      
      {/* Fixed Sticky Header */}
      <Navbar 
        name={settings.name} 
        onCtaClick={handleCtaClick} 
        onAdminToggle={() => setAdminActive(true)} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <Hero
        settings={settings}
        onCtaClick={handleCtaClick}
        onViewWorkClick={handleViewWorkClick}
      />

      {/* Trust & Social Proof Bar */}
      <TrustBar />

      {/* Services Grid with dynamic packages & price anchors */}
      <Services 
        services={services} 
        onServiceSelect={handleServiceSelect} 
      />

      {/* Case Studies & Metrics Portfolio */}
      <Portfolio 
        projects={projects} 
        onCtaClick={handleCtaClick} 
      />

      {/* Verified Testimonials Grid */}
      <Testimonials 
        testimonials={testimonials} 
      />

      {/* Final Offer & Dynamic Lead Form */}
      <ContactForm
        selectedService={selectedService}
        onClearSelectedService={handleClearSelectedService}
        onLeadLogged={handleDataChanged} // Refreshes pipeline analytics count
        authorName={settings.name}
      />

      {/* Clean Footer with Social & Privacy hooks */}
      <Footer name={settings.name} settings={settings} />

      {/* Persistent floating Lab Pill at bottom-right corner for instant workspace login */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setAdminActive(true)}
          className="px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-black tracking-widest uppercase shadow-xl hover:shadow-indigo-600/30 border border-indigo-500/30 transition-all flex items-center space-x-2 cursor-pointer scale-95 hover:scale-100 group"
          id="author-floating-trigger"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>⚡ Author Workspace</span>
        </button>
      </div>

      {/* Admin Panel Modal Overlay */}
      {adminActive && (
        <AdminPanel
          onClose={() => setAdminActive(false)}
          onDataChanged={handleDataChanged}
        />
      )}

    </div>
  );
}
