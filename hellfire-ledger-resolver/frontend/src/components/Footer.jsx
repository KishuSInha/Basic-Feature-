import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Globe } from 'lucide-react';

const Footer = () => {
  const partners = [
    { name: 'McLaren', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
    { name: 'Monster Energy', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
    { name: 'Google', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
    { name: 'Hilton', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
    { name: 'Uber', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
    { name: 'OKX', url: 'https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/680cbcfdbc4bdc0ef619369f_ln-icon-crossed-flags2.svg' },
  ];

  return (
    <footer className="bg-brand-dark text-brand-light pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Topographic Background */}
      <div className="absolute inset-0 opacity-10 bg-topo-pattern bg-cover pointer-events-none" />
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h2 className="text-6xl md:text-8xl font-mona font-black uppercase mb-8">
              Stay <span className="text-brand-accent italic">Fast</span>
            </h2>
            <p className="max-w-md text-xl opacity-70 mb-12">
              Subscribe to the LN4 newsletter for exclusive updates, behind-the-scenes content, and racing news.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="YOUR EMAIL"
                className="bg-brand-light/5 border border-brand-light/20 px-6 py-4 flex-1 focus:border-brand-accent transition-colors outline-none font-mona font-bold uppercase"
              />
              <button className="btn-primary whitespace-nowrap">Join Team</button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between items-start lg:items-end">
            <div className="flex gap-6 mb-12">
              <a href="#" className="p-4 rounded-full border border-brand-light/10 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="p-4 rounded-full border border-brand-light/10 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="p-4 rounded-full border border-brand-light/10 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                <Youtube size={24} />
              </a>
              <a href="#" className="p-4 rounded-full border border-brand-light/10 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                <Globe size={24} />
              </a>
            </div>
            
            <div className="text-left lg:text-right">
              <span className="block text-sm uppercase opacity-50 mb-2">Business Enquiries</span>
              <a href="mailto:contact@landonorris.com" className="text-3xl font-mona font-black hover:text-brand-accent transition-colors">
                contact@landonorris.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mb-24">
          <span className="block text-xs uppercase tracking-widest opacity-30 mb-8 font-bold">Our Partners</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale">
            {partners.map((partner, index) => (
              <img 
                key={index}
                src={partner.url} 
                alt={partner.name}
                className="h-8 md:h-12 w-auto mx-auto invert"
              />
            ))}
          </div>
        </div>
        
        <div className="pt-12 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] uppercase font-bold tracking-[0.2em]">
          <span>© 2025 . All Rights Reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-accent">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-accent">Cookies</a>
          </div>
          <span>Designed & Built for Speed</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
