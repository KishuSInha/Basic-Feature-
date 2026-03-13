import React from 'react';
import { motion } from 'framer-motion';

const LifeGallery = () => {
  const images = [
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando01.jpg', title: 'On Track' },
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando02.jpg', title: 'The Pits' },
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando03.jpg', title: 'Focus' },
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando04.jpg', title: 'Victory' },
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando05.jpg', title: 'Fans' },
    { url: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/2024/Lando%20Norris/NorrisLando06.jpg', title: 'Lifestyle' },
  ];

  return (
    <section id="gallery" className="section-container bg-brand-light">
      <div className="absolute inset-0 opacity-[0.02] bg-topo-pattern bg-cover pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-12 flex justify-between items-end">
          <h2 className="text-6xl md:text-8xl font-mona font-black uppercase tracking-tighter">
            The <span className="text-brand-accent stroke-text-dark">Life</span>
          </h2>
          <p className="max-w-xs text-right text-sm font-medium uppercase tracking-widest opacity-50">
            A glimpse into the world of LN4
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative aspect-[4/5] overflow-hidden bg-slate-100 group"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-brand-light font-mona font-bold uppercase tracking-widest">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeGallery;
