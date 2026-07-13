import { motion } from 'motion/react';
import { Service } from '../types';
import { Zap, Layers, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  services: Service[];
  onServiceSelect: (serviceTitle: string) => void;
}

export default function Services({ services, onServiceSelect }: ServicesProps) {
  // Map string names to actual Lucide component references
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-indigo-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-indigo-400" />;
      default:
        return <Zap className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-950 relative">
      {/* Structural ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-widest text-indigo-400 uppercase mb-4">
            CORE SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white mb-4">
            Services & Expertise
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base">
            Expert conversion rate optimization coupled with elite digital craftsmanship to unlock measurable business revenue.
          </p>
        </motion.div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.25, delay: idx * 0.06, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl bg-neutral-900/40 border border-neutral-800/80 p-8 flex flex-col justify-between overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
              id={`service-card-${service.id}`}
            >
              {/* Subtle card-specific radial gradient overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header Row: Icon and Price Tag */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:border-indigo-500/20 group-hover:bg-indigo-950/20 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-right">
                    <p className="text-[9px] font-mono font-medium text-indigo-400 uppercase tracking-wider leading-none mb-0.5">Starting at</p>
                    <p className="text-base font-mono font-bold text-white leading-none">{service.startingPrice}</p>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-sans font-extrabold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed mb-6 border-b border-neutral-900 pb-6">
                  {service.description}
                </p>

                {/* Core Outcomes Bullets (Business value, not features as requested) */}
                <div className="space-y-3.5 mb-8">
                  <p className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase">BUSINESS OUTCOMES</p>
                  {service.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-sans text-neutral-300 leading-tight">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onServiceSelect(service.title)}
                className="w-full mt-2 inline-flex items-center justify-center py-3 px-4 rounded-xl border border-neutral-800 bg-neutral-950/50 hover:bg-indigo-600 text-neutral-300 hover:text-white font-sans font-semibold text-xs transition-all cursor-pointer group/btn"
                id={`service-inquire-${service.id}`}
              >
                Inquire Rate
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
