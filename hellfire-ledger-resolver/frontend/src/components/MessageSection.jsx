import React from 'react';
import { motion } from 'framer-motion';

const MessageSection = () => {
  return (
    <section id="message" className="section-container bg-brand-dark text-brand-light">
      <div className="absolute inset-0 opacity-5 bg-topo-pattern bg-cover pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-accent uppercase font-bold tracking-widest text-sm mb-6 block">
            A Message from Lando
          </span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-mona font-black leading-tight mb-12">
            "I'm here to <span className="text-brand-accent italic">compete</span>, not just to participate. Every lap, every corner, I'm pushing the limits of what's possible."
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-lg opacity-70 leading-relaxed font-light">
                Formula 1 is as much a mental game as it is physical. It's about precision, timing, and an unwavering belief in your team. We've come a long way, but the journey is just beginning.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <img 
                src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg" 
                alt="Signature" 
                className="h-24 w-auto invert opacity-50 select-none grayscale"
              />
              <span className="font-mona uppercase tracking-widest text-xs opacity-50">LN4 Official</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Side Decoration */}
      <div className="absolute top-0 right-0 h-full w-24 bg-brand-accent/10 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="rotate-90 whitespace-nowrap text-brand-accent text-huge opacity-20 font-black">
          ON TRACK · ON TRACK · ON TRACK
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
