import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WindowsLoading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // Sequence duration

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 5;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#050508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'fixed', inset: 0, zIndex: 10000, overflow: 'hidden'
    }}>
      {/* CRT Scanline effect localized */}
      <div className="crt-scanlines" style={{ opacity: 0.1 }} />

      {/* Hawkins Logo Placeholder */}
      <div style={{ position: 'relative', marginBottom: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#ff2020', letterSpacing: '0.1em', fontFamily: 'var(--orb)', textTransform: 'uppercase' }}>
          HAWKINS <span style={{ color: '#b3ffb3', fontSize: 24, verticalAlign: 'middle', fontWeight: 400, opacity: 0.8 }}>SECURE PORTAL</span>
        </div>
        <div style={{ color: '#4d994d', fontSize: 12, marginTop: 4, letterSpacing: '0.3em', fontFamily: 'var(--share)', textTransform: 'uppercase' }}>Department of Energy — Division of Bravery</div>
        
        {/* The Hexagonal Logo (CSS only) */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 30 }}>
            <div style={{ width: 24, height: 24, border: '2px solid #ff2020', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
              <span style={{ transform: 'rotate(-45deg)', color: '#ff2020', fontSize: 14 }}>⬡</span>
            </div>
        </div>
      </div>

      {/* Retro Progress Bar */}
      <div style={{
        width: 240, height: 12, border: '1px solid rgba(179,255,179,0.2)', 
        background: '#030308', padding: '2px', display: 'flex', gap: 2,
        boxShadow: '0 0 15px rgba(255,32,32,0.1)'
      }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 1, 0.1],
              backgroundColor: ['#4d994d', '#ff2020', '#4d994d']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            style={{
              flex: 1, height: '100%', 
              borderRadius: '1px'
            }}
          />
        ))}
      </div>

      {/* Footer Text */}
      <div style={{ position: 'absolute', left: 40, bottom: 40, color: '#4d994d', fontSize: 9, fontFamily: 'var(--share)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        ENCRYPTION STATUS: ACTIVE<br/>
        UPLINK: SEPOLIA-NODE-HAWKINS
      </div>
      <div style={{ position: 'absolute', right: 40, bottom: 40, color: '#ff2020', fontSize: 14, fontWeight: 'bold', fontFamily: 'var(--orb)', letterSpacing: '0.1em' }}>
        LEVEL 5 CLEARANCE REQUIRED
      </div>
    </div>
  );
};

export default WindowsLoading;
