import { Github, Linkedin, Twitter, MessageCircle, ArrowUp } from 'lucide-react';
import { AuthorSettings } from '../types';

interface FooterProps {
  name: string;
  settings?: AuthorSettings;
}

export default function Footer({ name, settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="bg-neutral-950 border-t border-neutral-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Left Side: Brand & Copyright */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              {name ? name.charAt(0) : 'V'}
            </div>
            <span className="font-sans font-black text-sm tracking-tight text-white uppercase">
              {name || "CHIOMA ADEBAYO"}
            </span>
          </div>
          <p className="text-neutral-500 font-sans text-xs">
            © {new Date().getFullYear()} {name || "Chioma Adebayo"}. All rights reserved. Conversion optimization and UI/UX design.
          </p>
        </div>

        {/* Right Side: Social Media & Legal Placeholders */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-8">
          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {settings?.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                referrerPolicy="no-referrer-when-downgrade"
                rel="noopener noreferrer"
                className="w-11 h-11 inline-flex items-center justify-center text-neutral-500 hover:text-indigo-400 transition-colors rounded-lg hover:bg-neutral-900"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            )}
            
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                referrerPolicy="no-referrer-when-downgrade"
                rel="noopener noreferrer"
                className="w-11 h-11 inline-flex items-center justify-center text-neutral-500 hover:text-green-400 transition-colors rounded-lg hover:bg-neutral-900"
                aria-label="WhatsApp"
                title="WhatsApp Direct Chat"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
            )}

            {settings?.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                referrerPolicy="no-referrer-when-downgrade"
                rel="noopener noreferrer"
                className="w-11 h-11 inline-flex items-center justify-center text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-neutral-900"
                aria-label="Twitter / X"
                title="Twitter / X Profile"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
            )}

            <a
              href="https://github.com"
              target="_blank"
              referrerPolicy="no-referrer-when-downgrade"
              rel="noopener noreferrer"
              className="w-11 h-11 inline-flex items-center justify-center text-neutral-500 hover:text-indigo-400 transition-colors rounded-lg hover:bg-neutral-900"
              aria-label="GitHub"
              title="GitHub Profile"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Legal Pages Placeholders */}
          <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
            <button
              onClick={() => alert('Privacy Policy: This is a secure portfolio applet. No data is collected externally; lead submissions are persisted exclusively in your local browser cache.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => alert('Terms of Service: All project outcomes, conversions, and metrics displayed are illustrative representations of portfolio optimization standards.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="self-start sm:self-auto p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
