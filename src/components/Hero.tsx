import { motion } from 'motion/react';
import { AuthorSettings } from '../types';
import { ArrowUpRight, ArrowRight, Sparkles, ShieldCheck, MapPin, MessageCircle, Linkedin, Twitter } from 'lucide-react';

interface HeroProps {
  settings: AuthorSettings;
  onCtaClick: () => void;
  onViewWorkClick: () => void;
}

export default function Hero({ settings, onCtaClick, onViewWorkClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-neutral-950 flex flex-col justify-center min-h-[90vh]"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Conversion Copy & Hook */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6"
            id="hero-text-container"
          >
            {/* Tag / Trust Badge */}
            <div className="flex flex-wrap gap-2 items-center">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800/80 w-fit"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider">
                  Elite Conversion Engineering
                </span>
              </motion.div>

              {settings.location && (
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800/80 w-fit"
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="text-xs font-mono font-medium text-neutral-300">
                    {settings.location}
                  </span>
                </motion.div>
              )}
            </div>

            {/* H1 Headline (Max 8 words as requested) */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[54px] font-sans font-black tracking-tight text-white leading-[1.1] max-w-2xl"
              id="hero-headline"
            >
              {settings.headline}
            </motion.h1>

            {/* Subheadline (Max 2 sentences as requested) */}
            <motion.p
              variants={itemVariants}
              className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed max-w-xl"
              id="hero-subheadline"
            >
              {settings.subheadline}
            </motion.p>

            {/* Value Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pb-2 border-b border-neutral-900 max-w-md"
              id="hero-benefits"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-neutral-300 font-sans font-medium">Guaranteed Conversion Lift</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-neutral-300 font-sans font-medium">Psychology-Driven UX</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
              id="hero-ctas"
            >
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-[0.98] cursor-pointer group"
                id="hero-cta-primary"
              >
                {settings.primaryCta}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onViewWorkClick}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/60 text-neutral-300 hover:text-white font-sans font-semibold text-sm transition-all cursor-pointer group"
                id="hero-cta-secondary"
              >
                {settings.secondaryCta}
                <ArrowUpRight className="w-4 h-4 ml-2 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

            {/* Quick Connect Row */}
            {(settings.whatsapp || settings.linkedin || settings.twitter) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 text-neutral-500 text-xs font-mono"
              >
                <span className="uppercase tracking-widest text-[9px] font-bold text-neutral-500">Quick Connect:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {settings.whatsapp && (
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      referrerPolicy="no-referrer-when-downgrade"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-green-400 transition-all hover:border-green-500/20"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <span className="text-[10px]">WhatsApp Direct</span>
                    </a>
                  )}

                  {settings.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      referrerPolicy="no-referrer-when-downgrade"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-indigo-400 transition-all hover:border-indigo-500/20"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="text-[10px]">LinkedIn</span>
                    </a>
                  )}

                  {settings.twitter && (
                    <a
                      href={settings.twitter}
                      target="_blank"
                      referrerPolicy="no-referrer-when-downgrade"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white transition-all hover:border-neutral-700"
                      title="Twitter / X Profile"
                    >
                      <Twitter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="text-[10px]">Twitter / X</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>

          {/* Right Column: Portrait */}
          <div className="lg:col-span-5 relative" id="hero-visual-wrapper">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800/80 p-3 shadow-2xl flex flex-col"
              id="hero-visual-container"
            >
              <div className="relative flex-1 rounded-lg overflow-hidden bg-neutral-950 group">
                <img
                  src={settings.profileImage}
                  alt={`${settings.name} - UI/UX Architect Portrait`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-neutral-800 px-2.5 py-1.5 rounded-lg text-xs font-sans text-neutral-200">
                  <p className="font-bold">{settings.name}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">UI/UX & CONVERSION ARCHITECT</p>
                </div>
              </div>
            </motion.div>

            {/* Glowing structural rings behind */}
            <div className="absolute -inset-4 border border-indigo-500/10 rounded-3xl -z-10 pointer-events-none" />
            <div className="absolute -inset-10 border border-indigo-600/5 rounded-[40px] -z-20 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
