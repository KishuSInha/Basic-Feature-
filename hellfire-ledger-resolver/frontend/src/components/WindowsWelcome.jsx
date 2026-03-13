import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const WindowsWelcome = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      width: '100vw', height: '100vh', 
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'fixed', inset: 0, zIndex: 10002, overflow: 'hidden'
    }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at center, rgba(255,32,32,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ color: '#4d994d', fontSize: 14, fontFamily: 'var(--share)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 8 }}>Clearance Verified</div>
        <div style={{ color: '#ff2020', fontSize: 72, fontFamily: 'var(--orb)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '8px', textShadow: '0 0 20px rgba(255,32,32,0.5)' }}>
          ACCESS GRANTED
        </div>
        <div className="blink" style={{ color: '#b3ffb3', fontSize: 10, fontFamily: 'var(--vt)', marginTop: 24 }}>INITIALIZING HAWKINS SYSTEM INTERFACE...</div>
      </motion.div>
    </div>
  );
};

export default WindowsWelcome;
