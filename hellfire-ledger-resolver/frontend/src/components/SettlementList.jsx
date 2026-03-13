import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ExternalLink, Send, Zap, FileJson } from 'lucide-react';

const SettlementList = () => {
  const [directives, setDirectives] = useState([
    { id: '001', from: 'EDDIE', to: 'LUCAS', amount: 5, status: 'PENDING', type: 'D&D_GEAR', color: 'var(--retro-red)' },
    { id: '002', from: 'EDDIE', to: 'DUSTIN', amount: 10, status: 'PENDING', type: 'DEMODOG_SUPPLY', color: 'var(--neon-cyan)' },
    { id: '003', from: 'EDDIE', to: 'MIKE', amount: 10, status: 'PENDING', type: 'LAB_EQUIPMENT', color: 'var(--neon-purple)' },
  ]);

  const signDirective = (id) => {
    setDirectives(prev => prev.map(d => d.id === id ? { ...d, status: 'SIGNING' } : d));
    setTimeout(() => {
      setDirectives(prev => prev.map(d => d.id === id ? { ...d, status: 'CONFIRMED' } : d));
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-3">
      <AnimatePresence mode="popLayout">
        {directives.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="terminal-panel border-phosphor-dim/30 hover:border-phosphor/100 transition-all duration-300 group relative"
          >
            {/* Top Stripe Decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-phosphor-dim to-transparent opacity-50" />

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-phosphor animate-flicker" />
                <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-phosphor/80">DIRECTIVE #{item.id}</span>
              </div>
              <span className={`text-[9px] font-bold font-share-tech tracking-widest px-2 py-0.5 border ${
                item.status === 'CONFIRMED' ? 'border-phosphor text-phosphor bg-phosphor/10' : 
                item.status === 'SIGNING' ? 'border-neon-cyan text-neon-cyan animate-pulse' : 
                'border-phosphor-dim text-phosphor-dim'
              } uppercase`}>
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-bg-dark/50 border-y border-phosphor-dim/10 mb-4 group-hover:bg-bg-dark/80 transition-colors">
              <div className="text-center w-1/3">
                <p className="text-[8px] text-phosphor-dim uppercase font-share-tech mb-1">Debtor</p>
                <p className="text-sm font-orbitron text-white">{item.from}</p>
              </div>

              <div className="flex flex-col items-center flex-1">
                <div className="text-xl font-orbitron font-bold text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
                   {item.amount} <span className="text-[10px] font-light">HFG</span>
                </div>
                <div style={{ textTransform: 'uppercase', fontSize: '6px', color: 'rgba(179,255,179,0.3)', marginTop: 2, fontFamily: 'var(--share)' }}>{item.type}</div>
                <div className="w-full flex items-center gap-1 mt-1">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan/50" />
                  <Zap className="w-3 h-3 text-neon-cyan" />
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan/50" />
                </div>
              </div>

              <div className="text-center w-1/3">
                <p className="text-[8px] text-phosphor-dim uppercase font-share-tech mb-1">Creditor</p>
                <p className="text-sm font-orbitron text-white">{item.to}</p>
              </div>
            </div>

            <div className="flex gap-2 relative z-10">
              {item.status === 'PENDING' ? (
                <button 
                  onClick={() => signDirective(item.id)}
                  className="flex-1 py-1.5 bg-bg-dark border border-phosphor text-phosphor font-orbitron text-[10px] tracking-widest hover:bg-phosphor hover:text-bg-dark transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Send className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  EXECUTE UPLINK
                </button>
              ) : item.status === 'CONFIRMED' ? (
                <div className="flex-1 flex gap-2">
                  <div className="flex-1 border border-phosphor/30 bg-phosphor/5 py-1.5 text-[10px] text-phosphor font-orbitron flex items-center justify-center gap-2">
                    <BadgeCheck className="w-3 h-3" />
                    CONFIRMED
                  </div>
                  <a href="#" className="border border-neon-cyan/50 px-3 py-1.5 hover:bg-neon-cyan hover:text-bg-dark transition-all flex items-center text-neon-cyan">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <div className="flex-1 border border-neon-cyan py-1.5 text-[10px] text-neon-cyan font-orbitron flex items-center justify-center gap-3">
                   <div className="w-3 h-3 border-2 border-neon-cyan border-t-transparent animate-spin" />
                   SIGNING DIRECTIVE...
                </div>
              )}
            </div>

            {/* Glowing Corner Decoration */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-transparent group-hover:border-phosphor/50 transition-all" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SettlementList;
