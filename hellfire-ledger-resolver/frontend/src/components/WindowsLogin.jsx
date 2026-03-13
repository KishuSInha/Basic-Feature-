import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ShieldAlert, Cpu, UserCheck } from 'lucide-react';

const WindowsLogin = ({ onLogin, onRestart }) => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    { 
      id: 'admin', 
      title: 'Administrator', 
      name: 'Agent Munson', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=b6e3f4',
      clearance: 'Level 9 — Overwatch',
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />
    },
    { 
      id: 'agent', 
      title: 'Standard Agent', 
      name: 'Agent Wheeler', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=agent&backgroundColor=d1d4f9', 
      clearance: 'Level 5 — Operations',
      icon: <UserCheck className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <div style={{
      width: '100vw', height: '100vh', 
      background: 'radial-gradient(circle at center, #0a0a12 0%, #050508 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'fixed', inset: 0, zIndex: 10001, overflow: 'hidden'
    }}>
      {/* Red dimensional fog at edges */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 40%,rgba(255,32,32,0.06) 80%,rgba(0,0,0,.9) 100%)',pointerEvents:'none'}}/>
      
      {/* Scanlines Effect */}
      <div className="crt-scanlines" style={{ opacity: 0.1, zIndex: 1 }} />

      <div style={{ display: 'flex', width: '100%', maxWidth: 1100, justifyContent: 'space-between', padding: '0 80px', zIndex: 10 }}>
        
        {/* Left Side: Branding (Screenshot 1 influence) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', color: '#fff' }}>
           <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: 56, fontWeight: 900, fontFamily: 'var(--orb)', color: '#ff2020', textTransform: 'uppercase', letterSpacing: '4px', lineHeight: 0.9 }}
           >
            HAWKINS<br/>
            <span style={{ fontSize: 24, color: '#b3ffb3', fontWeight: 400, letterSpacing: '8px' }}>LABORATORY</span>
           </motion.div>
           <div style={{ fontSize: 10, letterSpacing: '4px', opacity: 0.4, marginTop: 24, fontFamily: 'var(--share)', color: '#4d994d', textTransform: 'uppercase' }}>
              Classified Access Terminal v5.0.2 // HNL-OS
           </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 300, background: 'linear-gradient(to bottom, transparent, rgba(255,32,32,0.3), transparent)', margin: '0 40px' }} />

        {/* Right Side: Role Selection (Screenshot 2 influence) */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, width: 440 }}>
          <div style={{ color: '#4d994d', fontSize: 10, marginBottom: 8, fontFamily: 'var(--share)', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8 }}>
            To begin, select a personnel profile:
          </div>
          
          <div className="flex flex-col gap-4">
            {roles.map((role) => (
              <motion.div 
                key={role.id}
                onClick={() => onLogin(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                whileHover={{ x: 10, background: 'rgba(255,255,255,0.03)' }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer',
                  padding: '16px', borderRadius: 4, border: `1px solid ${hoveredRole === role.id ? '#ff2020' : 'rgba(255,32,32,0.1)'}`,
                  background: 'rgba(0,0,0,0.3)', transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Avatar with Glow */}
                <div style={{ 
                  width: 56, height: 56, borderRadius: 4, overflow: 'hidden', border: `2px solid ${role.id === 'admin' ? '#ff2020' : '#00f3ff'}`,
                  boxShadow: hoveredRole === role.id ? `0 0 15px ${role.id === 'admin' ? 'rgba(255,32,32,0.4)' : 'rgba(0,243,255,0.4)'}` : 'none'
                }}>
                  <img src={role.avatar} alt={role.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div className="flex-1">
                  <div style={{ fontSize: 13, fontWeight: 'bold', fontFamily: 'var(--orb)', color: '#fff', letterSpacing: '1px' }}>{role.name}</div>
                  <div style={{ fontSize: 9, opacity: 0.6, fontFamily: 'var(--share)', color: role.id === 'admin' ? '#ff2020' : '#00f3ff', textTransform: 'uppercase', marginTop: 2 }}>{role.title}</div>
                  <div style={{ fontSize: 8, opacity: 0.4, fontFamily: 'var(--share)', color: '#fff', marginTop: 4 }}>{role.clearance}</div>
                </div>

                {role.icon}
                
                {/* Selection Arrow (Screenshot 2 feel) */}
                <AnimatePresence>
                  {hoveredRole === role.id && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      style={{ color: '#ff2020', fontSize: 18 }}
                    >
                      ▶
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Restart Button (Themed after Screenshot 2) */}
      <motion.div 
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          position: 'absolute', bottom: 40, left: 40, display: 'flex', alignItems: 'center', gap: 12, 
          color: '#ff2020', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--orb)', letterSpacing: '2px',
          padding: '8px 16px', background: 'rgba(255,32,32,0.05)', border: '1px solid rgba(255,32,32,0.2)',
          borderRadius: 2, textTransform: 'uppercase'
        }}
      >
        <Power className="w-4 h-4 animate-pulse" />
        RESTART UNIT 11-06-83
      </motion.div>

      {/* Lab Warning */}
      <div style={{ position: 'absolute', bottom: 40, right: 40, textAlign: 'right', color: '#4d994d', fontSize: 9, opacity: 0.4, fontFamily: 'var(--share)', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Hawkins National Laboratory // Department of Energy<br/>
        Authorized Personnel Only // Classified Data Protocol
      </div>
    </div>
  );
};

export default WindowsLogin;
