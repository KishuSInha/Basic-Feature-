import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const XPTaskbar = ({ openWins, minimizedWins, onToggleWin, allAppDefs, onOpenApp }) => {
  const [startOpen, setStartOpen] = useState(false);
  const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });

  // Mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, 
      height: isMobile ? 48 : 32,
      background: 'linear-gradient(to bottom, #1a1a1a 0%, #050508 100%)',
      display: 'flex', alignItems: 'center', zIndex: 10000,
      borderTop: '1px solid #ff2020',
      boxShadow: '0 -2px 10px rgba(255,32,32,0.1)'
    }}>
      {/* Start Button */}
      <motion.button
        onClick={() => setStartOpen(!startOpen)}
        whileHover={{ background: 'rgba(255,32,32,0.2)' }}
        whileTap={{ scale: 0.98 }}
        style={{
          height: '100%', padding: isMobile ? '0 12px' : '0 16px',
          background: 'linear-gradient(135deg, #8b0000 0%, #ff2020 100%)',
          border: 'none', borderRadius: '0 4px 4px 0',
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer', color: '#fff', fontSize: isMobile ? 9 : 11, fontWeight: 900,
          fontFamily: 'var(--orb)', textTransform: 'uppercase', letterSpacing: '1px'
        }}
      >
        <span style={{ fontSize: isMobile ? 12 : 14 }}>⬢</span>
        {!isMobile && "HAWKINS"}
      </motion.button>

      {/* Start Menu Popup */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            style={{
              position: 'absolute', bottom: isMobile ? 48 : 32, left: 0, 
              width: isMobile ? '100vw' : 280,
              background: '#050508', border: '1px solid #ff2020', borderRadius: isMobile ? 0 : '4px 4px 0 0',
              boxShadow: '0 -5px 20px rgba(255,32,32,0.2)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ background: 'linear-gradient(to right, #8b0000, #ff2020)', padding: '12px 16px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ width: 36, height: 36, border: '1px solid #fff', borderRadius: 4, overflow:'hidden', background: '#0a0a12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ff2020', fontSize: 20 }}>⬢</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontWeight: 700, fontFamily: 'var(--orb)', fontSize: 11, letterSpacing: '1px' }}>SYSTEM OPERATOR</span>
                 <span style={{ fontSize: 9, fontFamily: 'var(--share)', color: '#b3ffb3', letterSpacing: '2px' }}>CLEARANCE: LEVEL 5</span>
               </div>
            </div>
            <div style={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
               {allAppDefs.map(app => (
                 <button 
                  key={app.id}
                  onClick={() => { onOpenApp(app.id); setStartOpen(false); }}
                  style={{ 
                    width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderRadius: 2, transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,32,32,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                 >
                   <span style={{ fontSize: 20 }}>{app.icon}</span>
                   <span style={{ fontSize: 11, color: '#b3ffb3', fontFamily: 'var(--share)', textTransform: 'uppercase', letterSpacing: '1px' }}>{app.title}</span>
                 </button>
               ))}
            </div>
            <div style={{ background: '#0a0a12', borderTop: '1px solid rgba(255,32,32,0.2)', padding: 12, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
               <button onClick={() => window.location.reload()} style={{ background: 'transparent', border: '1px solid #ff2020', color: '#ff2020', padding: '8px 16px', fontSize: 10, borderRadius: 2, fontFamily: 'var(--share)', cursor: 'pointer' }}>LOG OFF</button>
               <button onClick={() => window.location.reload()} style={{ background: '#ff2020', border: '1px solid #ff2020', color: '#fff', padding: '8px 16px', fontSize: 10, borderRadius: 2, fontFamily: 'var(--share)', cursor: 'pointer' }}>TERMINATE</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Window Tabs */}
      <div style={{ flex: 1, display: 'flex', height: '100%', padding: '4px 8px', gap: 6, overflow: 'hidden' }}>
        {openWins.map(win => (
          <motion.div
            key={win.id}
            layoutId={`task-tab-${win.id}`}
            onClick={() => onToggleWin(win.id)}
            style={{
              flex: isMobile ? '1 1 auto' : '0 1 180px', height: '100%',
              background: minimizedWins.includes(win.id) ? 'rgba(255,32,32,0.05)' : 'rgba(255,32,32,0.15)',
              border: `1px solid ${minimizedWins.includes(win.id) ? 'rgba(255,32,32,0.2)' : '#ff2020'}`,
              borderRadius: 2,
              display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', padding: isMobile ? '0 8px' : '0 12px', gap: 8,
              cursor: 'pointer', color: '#fff', fontSize: 10,
              fontFamily: 'var(--share)', textTransform: 'uppercase', letterSpacing: '1px'
            }}
          >
            <span style={{ fontSize: isMobile ? 16 : 12 }}>{win.icon}</span>
            {!isMobile && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>}
          </motion.div>
        ))}
      </div>

      {/* Tray */}
      <div style={{
        height: '100%', padding: isMobile ? '0 8px' : '0 16px',
        background: '#0a0a12', borderLeft: '1px solid #ff2020',
        display: 'flex', alignItems: 'center', gap: 8,
        color: '#ff2020', fontSize: isMobile ? 8 : 10, fontFamily: 'var(--share)', letterSpacing: '1px'
      }}>
        {!isMobile && <div style={{ opacity: 0.6, fontSize: 8 }}>UPLINK: ACTIVE</div>}
        <div style={{ fontWeight: 'bold', color: '#fff' }}>{time}</div>
      </div>
    </div>
  );
};

export default XPTaskbar;
