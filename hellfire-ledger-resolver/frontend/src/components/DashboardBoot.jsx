import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DashboardBoot — Hawkins Lab Database Access Animation
 * Shows a dramatic classified terminal boot sequence before
 * revealing the dashboard. Duration ~3.5 seconds.
 */

const LINES = [
  { t: 100,  text: 'HNL//SECURE-TERMINAL v4.3.1 — INITIALIZING...', col: 'var(--phosphor)' },
  { t: 400,  text: 'BIOS CHECK.............. [OK]', col: 'var(--phosphor)' },
  { t: 700,  text: 'NEURAL LINK ESTABLISHED .............. [OK]', col: 'var(--phosphor)' },
  { t: 900,  text: 'ACCESSING HAWKINS NATIONAL LABORATORY DATABASE...', col: 'var(--cyan)' },
  { t: 1300, text: '  > AUTH LEVEL 5 CLEARANCE GRANTED', col: 'var(--cyan)' },
  { t: 1600, text: '  > DECRYPTING PROJECT INDIGO FILES...', col: 'var(--cyan)' },
  { t: 1900, text: '  > CROSS-REF: PSI SUBJECT #011 // VECNA #001', col: 'rgba(179,255,179,0.6)' },
  { t: 2200, text: '  WARNING: ANOMALOUS ENTITY DETECTED IN SECTOR 7', col: 'var(--red)', danger: true },
  { t: 2500, text: '  > DISABLING EXTERNAL COMMS...', col: 'var(--red)', danger: true },
  { t: 2700, text: 'LOADING HELLFIRE LEDGER CONTROL PANEL...', col: 'var(--phosphor)' },
  { t: 3000, text: '  STATUS: ACTIVE // GATE: OPEN // THREAT: OMEGA', col: 'var(--red)', danger: true },
];

export default function DashboardBoot({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = LINES.map(({ t, text, col, danger }) =>
      setTimeout(() => setLines(p => [...p, { text, col, danger }]), t)
    );

    // Progress bar
    let start = null;
    let rafId;
    const duration = 3200;
    const animPct = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setPct(Math.min((elapsed / duration) * 100, 100));
      if (elapsed < duration) rafId = requestAnimationFrame(animPct);
    };
    rafId = requestAnimationFrame(animPct);

    // Done
    const doneTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => onComplete?.(), 600);
    }, 3300);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#050508',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }} />

          {/* HNL Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 48, textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'var(--orb)', fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 900, color: 'var(--phosphor)',
              textShadow: '0 0 40px rgba(179,255,179,0.3)',
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              lineHeight: 0.9,
            }}>
              HAWKINS<br /><span style={{ color: 'var(--red)', textShadow: '0 0 30px rgba(255,32,32,0.4)' }}>NATIONAL LAB</span>
            </div>
            <div style={{
              fontFamily: 'var(--share)', fontSize: 9,
              letterSpacing: '0.5em', color: 'rgba(179,255,179,0.35)',
              textTransform: 'uppercase', marginTop: 14,
            }}>
              DEPARTMENT OF ENERGY — CLASSIFIED ACCESS
            </div>
          </motion.div>

          {/* Terminal */}
          <div style={{
            width: '100%', maxWidth: 680, padding: '28px 32px',
            background: 'rgba(5,5,8,0.8)', border: '1px solid rgba(179,255,179,0.08)',
            fontFamily: 'var(--vt)', fontSize: 13,
            backdropFilter: 'blur(8px)',
          }}>
            {/* Terminal header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 20, paddingBottom: 12,
              borderBottom: '1px solid rgba(179,255,179,0.07)',
            }}>
              {['#E5090A', '#F5A623', '#22C55E'].map((c, i) =>
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              )}
              <span style={{
                fontFamily: 'var(--share)', fontSize: 8,
                letterSpacing: '.25em', color: 'rgba(179,255,179,0.3)',
                marginLeft: 8, textTransform: 'uppercase',
              }}>HNL // SESSION-0x4 // RESTRICTED</span>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)' }} />
                <span style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'var(--red)', letterSpacing: '.2em' }}>LIVE</span>
              </motion.div>
            </div>

            {/* Log lines */}
            <div style={{ minHeight: 240 }}>
              {lines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: l.col,
                    marginBottom: 6, lineHeight: 1.6,
                    letterSpacing: '0.04em',
                    textShadow: l.danger ? `0 0 8px var(--red)` : 'none',
                    fontWeight: l.danger ? 700 : 400,
                  }}
                >
                  {l.text}
                </motion.div>
              ))}
              {/* Blinking cursor */}
              {lines.length > 0 && !done && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ color: 'var(--phosphor)', fontSize: 13 }}
                >█</motion.span>
              )}
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--share)', fontSize: 8, letterSpacing: '.3em', color: 'rgba(179,255,179,0.35)', textTransform: 'uppercase' }}>Loading Control Panel</span>
                <span style={{ fontFamily: 'var(--vt)', fontSize: 13, color: 'var(--phosphor)' }}>{Math.round(pct)}%</span>
              </div>
              <div style={{ height: 2, background: 'rgba(179,255,179,0.08)', position: 'relative', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: 'var(--phosphor)', boxShadow: '0 0 8px var(--phosphor)', width: `${pct}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: 32, fontFamily: 'var(--share)', fontSize: 8, letterSpacing: '0.5em', color: 'rgba(179,255,179,0.2)', textTransform: 'uppercase' }}
          >
            UNAUTHORIZED ACCESS PROSECUTED UNDER FEDERAL LAW — TITLE 18 U.S.C. § 1030
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
