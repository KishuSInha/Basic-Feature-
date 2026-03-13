import React from 'react';
import { motion } from 'framer-motion';

const UpsideDownPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      color: '#fff',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Particles/Glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(191, 95, 255, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/upside-down-bg.png")', backgroundSize: 'cover', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: '900px', textAlign: 'center', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ width: 60, height: 1, background: 'var(--red)' }} />
          <span style={{ fontFamily: 'var(--orb)', fontSize: 12, letterSpacing: '0.6em', color: 'var(--red)', textTransform: 'uppercase' }}>DEEP REDACTED FILES</span>
          <div style={{ width: 60, height: 1, background: 'var(--red)' }} />
        </div>

        <h1 style={{ 
          fontFamily: 'var(--orb)', 
          fontSize: 'clamp(3rem, 8vw, 6rem)', 
          fontWeight: 900, 
          lineHeight: 0.9, 
          textTransform: 'uppercase',
          marginBottom: 60,
          letterSpacing: '-0.02em',
          color: '#fff',
          textShadow: '0 0 40px rgba(191, 95, 255, 0.4)'
        }}>
          THE<br />
          <span style={{ color: 'var(--purple)' }}>UPSIDE</span><br />
          DOWN
        </h1>

        <div style={{ borderTop: '1px solid rgba(255, 32, 32, 0.2)', borderBottom: '1px solid rgba(255, 32, 32, 0.2)', padding: '60px 0' }}>
          <p style={{ 
            fontFamily: 'var(--share)', 
            fontSize: 'clamp(1.1rem, 2vw, 1.8rem)', 
            lineHeight: 1.6, 
            color: 'rgba(255,255,255,0.9)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em',
            margin: 0
          }}>
            HAWKINS NATIONAL LABORATORY OPERATED COVERT EXPERIMENTS INTO THE PARANORMAL. 
            PROJECT MKULTRA-VARIANT TESTING ON PSYCHOKINETIC SUBJECTS CREATED THE DIMENSIONAL 
            RIFT KNOWN AS THE UPSIDE DOWN — 1983.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 2 }}
          style={{ marginTop: 40, fontFamily: 'var(--vt)', fontSize: 14, color: 'var(--red)', letterSpacing: '0.2em' }}
        >
          [ END OF CLASSIFIED RECORD ]
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="signal-noise" style={{ opacity: 0.05 }} />
    </div>
  );
};

export default UpsideDownPage;
