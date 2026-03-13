import React from 'react';
import { motion } from 'framer-motion';

const WindowsLogin = ({ onLogin }) => {
  return (
    <div style={{
      width: '100vw', height: '100vh', 
      background: 'radial-gradient(circle at center, #0a0a12 0%, #050508 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'fixed', inset: 0, zIndex: 10001, overflow: 'hidden'
    }}>
      {/* Red dimensional fog at edges */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 40%,rgba(255,32,32,.06) 80%,rgba(0,0,0,.9) 100%)',pointerEvents:'none'}}/>

      <div style={{ display: 'flex', width: '100%', maxWidth: 1000, justifyContent: 'space-between', padding: '0 100px', zIndex: 10 }}>
        {/* Left Side: Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', color: '#fff' }}>
           <div style={{ fontSize: 44, fontWeight: 900, fontFamily: 'var(--orb)', color: '#ff2020', textTransform: 'uppercase', letterSpacing: '2px' }}>
            HAWKINS<br/>
            <span style={{ fontSize: 20, color: '#b3ffb3', fontWeight: 400, letterSpacing: '4px' }}>LABORATORY</span>
           </div>
           <div style={{ fontSize: 10, letterSpacing: '3px', opacity: 0.6, marginTop: 12, fontFamily: 'var(--share)', color: '#4d994d' }}>CLASSIFIED ACCESS TERMINAL v5.0.2</div>
        </div>

        {/* Right Side: Login Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <div style={{ color: '#4d994d', fontSize: 11, marginBottom: 10, fontFamily: 'var(--share)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Awaiting clearance confirmation...
          </div>
          
          <motion.div 
            onClick={onLogin}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,32,32,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: 16, cursor: 'none',
              padding: '12px 24px', borderRadius: 2, border: '1px solid #ff2020',
              background: 'rgba(255,32,32,0.1)',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              width: 48, height: 48, border: '1px solid #ff2020', borderRadius: 4, overflow: 'hidden',
              background: '#0a0a12', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <span style={{ color: '#ff2020', fontSize: 24 }}>⬢</span>
            </div>
            <div style={{ color: '#fff' }}>
              <div style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'var(--orb)', letterSpacing: '1px' }}>CONFIRM PORTAL ACCESS</div>
              <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'var(--share)', color: '#b3ffb3' }}>LEVEL 5 CLEARANCE: H-1183</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div style={{ position: 'absolute', bottom: 30, left: 30, display: 'flex', alignItems: 'center', gap: 12, color: '#ff2020', fontSize: 10, cursor: 'none', fontFamily: 'var(--share)', letterSpacing: '2px' }}>
        <div className="status-dot status-dot--red" />
        ABORT SEQUENCE
      </div>

      <div style={{ position: 'absolute', bottom: 30, right: 30, textAlign: 'right', color: '#4d994d', fontSize: 9, opacity: 0.8, fontFamily: 'var(--share)', letterSpacing: '1px' }}>
        ALL DATA IS ENCRYPTED AND LOGGED.<br/>
        UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE.
      </div>
    </div>
  );
};

export default WindowsLogin;
