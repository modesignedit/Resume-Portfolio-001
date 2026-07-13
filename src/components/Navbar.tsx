import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Layers, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  name: string;
  onCtaClick: () => void;
  onAdminToggle?: () => void;
  theme?: string;
  onToggleTheme?: () => void;
}

export default function Navbar({ name, onCtaClick, onAdminToggle, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
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

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group"
          id="nav-logo"
        >
          <span className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-1.5 uppercase">
            {name || "CHIOMA ADEBAYO"} <span className="text-indigo-500 text-[10px] font-mono font-normal tracking-widest hidden sm:inline">// WORKSPACE</span>
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6" id="nav-links">
          <button
            onClick={() => scrollToSection('services')}
            className="text-neutral-400 hover:text-white font-sans text-sm font-medium transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-neutral-400 hover:text-white font-sans text-sm font-medium transition-colors cursor-pointer"
          >
            Selected Work
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="text-neutral-400 hover:text-white font-sans text-sm font-medium transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-indigo-600 text-neutral-50 hover:bg-indigo-500 shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          {onAdminToggle && (
            <button
              onClick={onAdminToggle}
              className="px-2.5 py-1 rounded bg-indigo-950/40 border border-indigo-900 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/80 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>⚡ Author Console</span>
            </button>
          )}
        </div>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden lg:block" id="nav-cta-wrapper">
          <button
            onClick={onCtaClick}
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-sans font-medium text-sm hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/30 active:scale-[0.98] cursor-pointer group"
            id="nav-cta-btn"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-900 py-6 px-8 flex flex-col space-y-5 lg:hidden shadow-xl"
            id="nav-mobile-drawer"
          >
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-neutral-400 hover:text-white font-sans text-base font-medium py-1 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-left text-neutral-400 hover:text-white font-sans text-base font-medium py-1 transition-colors"
            >
              Selected Work
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left text-neutral-400 hover:text-white font-sans text-base font-medium py-1 transition-colors"
            >
              Testimonials
            </button>
            {onAdminToggle && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminToggle();
                }}
                className="text-left text-indigo-400 hover:text-indigo-300 font-mono text-sm py-1 transition-colors flex items-center gap-1"
              >
                <span>⚡ Author Console</span>
              </button>
            )}
            {onToggleTheme && (
              <button
                onClick={() => {
                  onToggleTheme();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 text-neutral-50 hover:bg-indigo-500 font-semibold text-xs transition-all cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsOpen(false);
                onCtaClick();
              }}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-sans font-medium text-sm hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
