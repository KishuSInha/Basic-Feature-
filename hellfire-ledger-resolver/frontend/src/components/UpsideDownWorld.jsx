import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [.23, 1, .32, 1];

/* ── Stat bar with intersection observer ── */
const StatBar = ({ label, pct, delay = 0, purple }) => {
  const [on, setOn] = useState(false);
  const r = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: .3 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={r} style={{ minWidth: 120 }}>
      <div style={{ fontFamily: 'var(--share)', fontSize: 8, letterSpacing: '.3em', color: 'rgba(179,255,179,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ height: 2, background: 'rgba(179,255,179,0.1)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: on ? pct : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '100%', background: purple ? 'var(--purple)' : 'var(--phosphor)', boxShadow: `0 0 8px ${purple ? 'var(--purple)' : 'var(--phosphor)'}` }}
        />
      </div>
      <div style={{ fontFamily: 'var(--vt)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: purple ? 'var(--purple)' : 'var(--phosphor)', marginTop: 6 }}>{pct}</div>
    </div>
  );
};

export default function UpsideDownWorld() {
  return (
    <section id="upside-down" style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg)', zIndex: 1,
      padding: '0 0',
    }}>
      {/* Glow blobs */}
      <div style={{ position: 'absolute', width: 700, height: 700, top: '-10%', right: '-5%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(229,9,20,.06) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, bottom: 0, left: '10%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.05) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* ── MAIN: Two-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', position: 'relative', zIndex: 1 }}>

        {/* ── LEFT: Section content ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 5vw 80px 8vw' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .85, ease }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: 'var(--red)' }} />
              <span style={{ fontFamily: 'var(--share)', fontSize: 9, letterSpacing: '.45em', color: 'var(--red)', textTransform: 'uppercase' }}>Dimensional Rift — Section 03</span>
            </div>

            <h2 style={{ fontFamily: 'var(--orb)', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.85, marginBottom: 40, textTransform: 'uppercase', color: '#fff' }}>
              THE<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(191,95,255,0.7)', textShadow: '0 0 40px rgba(191,95,255,0.3)' }}>UPSIDE</span><br />
              <span style={{ color: 'var(--purple)', textShadow: '0 0 30px rgba(191,95,255,0.5)' }}>DOWN</span>
            </h2>

            <p style={{ fontFamily: 'var(--share)', fontSize: 12, color: 'rgba(179,255,179,0.45)', lineHeight: 1.9, textTransform: 'uppercase', letterSpacing: '0.12em', maxWidth: 460, marginBottom: 40 }}>
              Hawkins National Laboratory operated covert experiments into the paranormal. 
              Project MKUltra-variant testing on psychokinetic subjects created the dimensional
              rift known as the Upside Down — 1983.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 48 }}>
              <StatBar label="Gate Breach"  pct="87%" delay={.4} />
              <StatBar label="Threat Level" pct="94%" delay={.55} />
              <StatBar label="PSI Energy"   pct="71%" delay={.7} purple />
            </div>

            {/* CTA badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['◈ GATE OPEN', '◈ VECNA ACTIVE', '◈ 1983'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--share)', fontSize: 9, letterSpacing: '0.25em',
                  textTransform: 'uppercase', padding: '5px 14px',
                  border: '1px solid rgba(255,32,32,0.35)', color: 'var(--red)',
                }}>{t}</span>
              ))}
            </div>

            {/* Feature list */}
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '⚡', label: 'CUTTING EDGE', sub: 'Where technology meets superpowers.' },
                { icon: '✦', label: 'ELITE MISSION', sub: 'Built by minds, powered by code.' },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 20px', border: '1px solid rgba(179,255,179,0.06)', background: 'rgba(5,5,8,0.4)' }}>
                  <span style={{ fontFamily: 'var(--vt)', fontSize: 22, color: 'var(--red)', lineHeight: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--share)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--phosphor)', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--share)', fontSize: 11, color: 'rgba(179,255,179,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ── RIGHT: Kids illustration ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          {/* Dark overlay behind image for depth */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: '30%', height: '100%', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <img
            src="/images/kids-group.png"
            alt="Hawkins Crew"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              filter: 'brightness(0.92) contrast(1.05)',
            }}
          />

          {/* Classification stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              position: 'absolute', bottom: 60, left: 32, zIndex: 10,
              border: '3px solid var(--red)', padding: '8px 20px',
              transform: 'rotate(-8deg)',
            }}
          >
            <div style={{ fontFamily: 'var(--orb)', fontSize: 18, color: 'var(--red)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 900 }}>
              CLASSIFIED
            </div>
            <div style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--red)', opacity: 0.7, letterSpacing: '0.4em', textAlign: 'center', marginTop: 2 }}>
              HNL-1983
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
