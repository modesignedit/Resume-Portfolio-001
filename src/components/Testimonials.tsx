import { motion } from 'motion/react';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Structural visual cues */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

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
            SOCIAL PROOF
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white mb-4">
            What Partners Say
          </h2>
          <p className="text-neutral-400 font-sans text-sm sm:text-base">
            Honest feedback and verified metrics from high-growth business leaders who unlocked massive conversion spikes.
          </p>
        </motion.div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.25, delay: idx * 0.06, ease: "easeOut" }}
              className="relative rounded-2xl bg-neutral-900/30 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-indigo-500/20 hover:bg-neutral-900/55 transition-all duration-300 shadow-lg"
              id={`testimonial-card-${testimonial.id}`}
            >
              {/* Background decorative quote icon */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-neutral-800/20 group-hover:text-rose-950/20 transition-colors pointer-events-none" />

              <div>
                {/* Five-Star Rating Graphics */}
                <div className="flex items-center space-x-1 mb-6" id={`stars-${testimonial.id}`}>
                  {[...Array(testimonial.rating)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-4 h-4 fill-indigo-500 text-indigo-500"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed italic mb-8 relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Client Avatar, Name & Title Footer */}
              <div className="flex items-center space-x-4 border-t border-neutral-900 pt-6">
                <img
                  src={testimonial.clientAvatar}
                  alt={testimonial.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-800 group-hover:border-indigo-500/30 transition-colors"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    {testimonial.clientRole}, <span className="text-indigo-400 font-semibold">{testimonial.clientCompany}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
