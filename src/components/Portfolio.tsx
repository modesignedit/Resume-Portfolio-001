import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Award, Flame } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
  onCtaClick: () => void;
}

export default function Portfolio({ projects, onCtaClick }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-neutral-950 border-t border-neutral-900 relative">
      {/* Dynamic backdrop line alignments for high-end feel */}
      <div className="absolute inset-0 flex justify-between px-12 opacity-5 pointer-events-none">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden md:block" />
        <div className="w-px h-full bg-white hidden md:block" />
        <div className="w-px h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <div className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-widest text-indigo-400 uppercase mb-4 w-fit">
              PROVEN RESULTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white mb-4">
              Selected Work & Impact
            </h2>
            <p className="text-neutral-400 font-sans text-sm sm:text-base">
              A curated showcase of design systems, web applications, and sales funnels built specifically to elevate customer actions and scale product revenue.
            </p>
          </div>

          <button
            onClick={onCtaClick}
            className="inline-flex items-center text-xs font-mono font-bold tracking-wider text-indigo-400 hover:text-indigo-300 uppercase transition-colors shrink-0 cursor-pointer group"
          >
            Request Custom Case Study
            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 2x2 Grid of Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12" id="portfolio-grid">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col space-y-5"
              id={`portfolio-project-${project.id}`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 group-hover:border-indigo-500/30 transition-all duration-300 shadow-xl flex items-center justify-center">
                
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Floating Metric Highlight (CRO / ROI-first aesthetic as requested) */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3 flex items-center space-x-3 shadow-lg">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-wider leading-none mb-0.5">{project.metricLabel}</p>
                    <p className="text-sm font-mono font-black text-white leading-none">{project.metrics}</p>
                  </div>
                </div>

                {/* Bottom Overlay displaying Client Name */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase bg-neutral-950/60 border border-neutral-900 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Title & Description & Tech Stack */}
              <div className="px-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-sans font-black text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-1" id={`project-tags-${project.id}`}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
