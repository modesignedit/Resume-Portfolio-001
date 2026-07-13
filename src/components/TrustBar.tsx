import { motion } from 'motion/react';
import { Shield, Sparkles, Compass, Cpu, Target } from 'lucide-react';

export default function TrustBar() {
  const brands = [
    { name: "APEX LABS", icon: Cpu },
    { name: "AETHER SEC", icon: Shield },
    { name: "SCRIBE AI", icon: Sparkles },
    { name: "CHRONOS", icon: Target },
    { name: "NEXUS LDR", icon: Compass }
  ];

  return (
    <section
      id="trustbar"
      className="py-10 border-y border-neutral-900 bg-neutral-950/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-[11px] font-mono font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-8">
          TRUSTED BY LEADING BRANDS & STARTUPS
        </p>
        
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20"
          id="trustbar-logos-container"
        >
          {brands.map((brand, idx) => {
            const BrandIcon = brand.icon;
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer group"
                id={`trust-brand-${brand.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <BrandIcon className="w-5 h-5 text-neutral-600 group-hover:text-indigo-400 transition-colors" />
                <span className="font-sans font-extrabold text-sm tracking-widest">
                  {brand.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
