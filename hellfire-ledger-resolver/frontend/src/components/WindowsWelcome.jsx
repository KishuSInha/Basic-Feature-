import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const WindowsWelcome = ({ role, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const identity = role === 'admin' ? 'AGENT MUNSON' : 'AGENT WHEELER';

  return (
    <div style={{
      width: '100vw', height: '100vh', 
      background: '#050508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'fixed', inset: 0, zIndex: 10002, overflow: 'hidden'
    }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at center, rgba(255,32,32,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ color: '#4d994d', fontSize: 13, fontFamily: 'var(--share)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: 16, opacity: 0.8 }}>
           Dimensional Clearance Verified
        </div>
        
        <div style={{ color: '#fff', fontSize: 18, fontFamily: 'var(--orb)', fontWeight: 400, letterSpacing: '4px', marginBottom: 4 }}>
           WELCOME BACK,
        </div>
        
        <div style={{ color: '#ff2020', fontSize: 72, fontFamily: 'var(--orb)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '12px', textShadow: '0 0 30px rgba(255,32,32,0.6)', lineHeight: 1 }}>
           {identity}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 40 }}>
           <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, #4d994d)' }} />
           <div className="blink" style={{ color: '#4d994d', fontSize: 10, fontFamily: 'var(--vt)', letterSpacing: '2px' }}>
              RESTORING HAWKINS LAB SESSION...
           </div>
           <div style={{ width: 40, height: 1, background: 'linear-gradient(to left, transparent, #4d994d)' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default WindowsWelcome;
