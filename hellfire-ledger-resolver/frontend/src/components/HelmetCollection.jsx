import React from 'react';
import { motion } from 'framer-motion';

const HelmetCollection = () => {
  const helmets = [
    { year: '2025', title: 'Chrome Edition', img: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg' },
    { year: '2024', title: 'Standard Issue', img: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg' },
    { year: '2024', title: 'Japanese GP', img: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg' },
    { year: '2023', title: 'Retro Glow', img: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg' },
  ];

  return (
    <section id="helmets" className="section-container bg-brand-dark text-brand-light">
      <div className="absolute inset-0 opacity-5 bg-topo-pattern bg-cover pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <h2 className="text-6xl md:text-8xl font-mona font-black uppercase mb-16 text-center">
          Helmet <span className="text-brand-accent">Archive</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {helmets.map((helmet, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-brand-light/5 border border-brand-light/10 p-8 flex flex-col items-center group transition-colors hover:bg-brand-accent/10 hover:border-brand-accent/30"
            >
              <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={helmet.img} 
                  alt={helmet.title}
                  className="w-4/5 h-auto relative z-10 invert opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-brand-accent font-bold mb-1">{helmet.year}</span>
              <h3 className="font-mona uppercase font-black tracking-widest text-lg">{helmet.title}</h3>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="btn-primary">View Full Collection</button>
        </div>
      </div>
    </section>
  );
};

export default HelmetCollection;
