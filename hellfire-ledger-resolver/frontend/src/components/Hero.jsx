/**
 * Hero — Split-screen Vecna (vecna 1 / vecna 2) with a
 * classified HNL data-ledger overlay.
 *
 * Visual language:
 *   • Two Vecna image halves joined by a glowing red seam
 *   • Transparent "spreadsheet grid" cells in the HUD zones
 *   • Monospaced data labels and row-IDs like a 1983 lab ledger
 *   • CRT scanlines + ambient red seam glow
 *   • No canvas / no LiquidReveal — zero lag
 */
import React from 'react';
import { motion } from 'framer-motion';

const fade = (delay = 0, y = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.19, 1, 0.22, 1], delay },
});

/* ── tiny reusable cell border ── */
const Cell = ({ children, style = {}, ...rest }) => (
  <div
    style={{
      border: '1px solid rgba(255,32,32,0.18)',
      background: 'rgba(3,3,10,0.72)',
      backdropFilter: 'blur(4px)',
      padding: '10px 16px',
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

const DataRow = ({ id, label, value, highlight }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '42px 1fr 1fr', borderBottom: '1px solid rgba(255,32,32,0.08)' }}>
    <span style={{ fontFamily: 'var(--vt)', fontSize: 10, color: 'rgba(255,32,32,0.4)', padding: '5px 8px', borderRight: '1px solid rgba(255,32,32,0.1)' }}>{id}</span>
    <span style={{ fontFamily: 'var(--share)', fontSize: 9, letterSpacing: '.2em', color: 'rgba(179,255,179,0.45)', padding: '5px 8px', borderRight: '1px solid rgba(255,32,32,0.1)', textTransform: 'uppercase' }}>{label}</span>
    <span style={{ fontFamily: 'var(--vt)', fontSize: 12, color: highlight ? 'var(--red)' : 'var(--phosphor)', padding: '5px 8px', letterSpacing: '.05em' }}>{value}</span>
  </div>
);

const Hero = ({ onEnter }) => (
  <section style={{
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: '#07070E',
  }}>

    {/* ══ BACKGROUND — split at vertical 50% seam ══ */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
      <img src="/images/vecna 1.png" alt="" draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.6) saturate(1.0)' }} />
    </div>
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
      <img src="/images/vecna 2.png" alt="" draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55) saturate(1.0) hue-rotate(330deg)' }} />
    </div>

    {/* ══ SEAM — glowing red crack ══ */}
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
      style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, zIndex: 4,
        transformOrigin: 'top',
        background: 'linear-gradient(to bottom, transparent, var(--red) 20%, rgba(255,32,32,0.6) 80%, transparent)',
        boxShadow: '0 0 16px 4px rgba(255,32,32,0.55), 0 0 50px 8px rgba(120,0,0,0.3)',
      }}
    />
    {/* seam blip */}
    <motion.div
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', left: 'calc(50% - 5px)', width: 12, height: 12,
        borderRadius: '50%', zIndex: 5,
        background: 'radial-gradient(circle, #fff 0%, var(--red) 45%, transparent 80%)',
        boxShadow: '0 0 18px 6px rgba(255,32,32,0.8)',
      }}
    />

    {/* ══ GRADIENT OVERLAYS ══ */}
    <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
      background:'linear-gradient(to top, rgba(3,3,10,0.97) 0%, rgba(3,3,10,0.3) 38%, transparent 62%)' }} />
    <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
      background:'linear-gradient(to right, rgba(3,3,10,0.92) 0%, transparent 40%)' }} />
    <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
      background:'linear-gradient(to left, rgba(3,3,10,0.92) 0%, transparent 40%)' }} />
    <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
      background:'linear-gradient(to bottom, rgba(3,3,10,0.8) 0%, transparent 18%)' }} />
    {/* seam ambient */}
    <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
      background:'radial-gradient(ellipse 8% 100% at 50% 50%, rgba(255,32,32,0.1) 0%, transparent 100%)' }} />
    {/* CRT scanlines */}
    <div style={{ position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
      background:'repeating-linear-gradient(0deg,transparent 0px,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)' }} />

    {/* ══ HUD — TOP BAR (data header row) ══ */}
    <motion.div {...fade(0.2)} style={{ position:'absolute', top:0, left:0, right:0, zIndex:10 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
        borderBottom: '1px solid rgba(255,32,32,0.2)',
        background: 'rgba(3,3,10,0.75)', backdropFilter: 'blur(6px)',
      }}>
        {/* File path breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', borderRight:'1px solid rgba(255,32,32,0.15)', padding:'14px 24px', gap:8 }}>
          <motion.span animate={{ opacity:[1,0.25,1] }} transition={{ duration:1.4, repeat:Infinity }}
            style={{ width:7, height:7, borderRadius:'50%', background:'var(--red)', boxShadow:'0 0 8px var(--red)', flexShrink:0, display:'block' }} />
          <span style={{ fontFamily:'var(--share)', fontSize:9, letterSpacing:'.35em', color:'var(--red)', textTransform:'uppercase' }}>
            HNL\LEDGER\CLASSIFIED\VEC-001.ledger
          </span>
        </div>
        {/* Column headers — spreadsheet style */}
        <div style={{ display:'flex', flex:1, alignItems:'stretch' }}>
          {[['ENTITY','VECNA / VEC-001'],['STATUS','BREACH_DETECTED'],['CLEARANCE','OMEGA'],['YR','1983']].map(([h,v]) => (
            <div key={h} style={{ flex:1, borderRight:'1px solid rgba(255,32,32,0.1)', padding:'8px 12px', display:'flex', flexDirection:'column', gap:3 }}>
              <span style={{ fontFamily:'var(--share)', fontSize:7, letterSpacing:'.3em', color:'rgba(179,255,179,0.35)', textTransform:'uppercase' }}>{h}</span>
              <span style={{ fontFamily:'var(--vt)', fontSize:12, color:'var(--phosphor-d)', letterSpacing:'.05em' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* ══ LEFT DATA PANEL — bottom left ══ */}
    <motion.div {...fade(0.4, 30)} style={{ position:'absolute', bottom:80, left:48, zIndex:10, width:'min(560px, 48vw)' }}>

      {/* document label */}
      <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.4em', color:'var(--cyan)', textTransform:'uppercase', marginBottom:12, opacity:0.7, display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:28, height:1, background:'var(--cyan)', opacity:0.5 }}/>
        HELLFIRE LEDGER RESOLVER — DOC_ID: HLR-1983-∅
      </div>

      {/* Big title */}
      <h1 style={{
        fontFamily:'var(--orb)', fontWeight:900,
        fontSize:'clamp(3rem,7.5vw,8rem)', textTransform:'uppercase', lineHeight:0.86,
        letterSpacing:'-0.02em', marginBottom:20,
      }}>
        <span style={{ color:'#fff', textShadow:'0 0 40px rgba(179,255,179,0.12)' }}>CLASSIFIED</span><br/>
        <span style={{ color:'var(--red)', textShadow:'0 0 50px rgba(255,32,32,0.55)' }}>FACILITY</span>
      </h1>

      {/* Ledger data block */}
      <Cell style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.4)', textTransform:'uppercase', marginBottom:8, borderBottom:'1px solid rgba(255,32,32,0.12)', paddingBottom:6 }}>
          LEDGER SUMMARY // DEBT_RECORD_SET_A
        </div>
        <DataRow id="01" label="Operation" value="SETTLE_DEBTS" />
        <DataRow id="02" label="Party Size" value="6 NODES" />
        <DataRow id="03" label="Token" value="HELLFIRE_GOLD (HFG)" />
        <DataRow id="04" label="Network" value="SEPOLIA_TESTNET" highlight />
        <DataRow id="05" label="Kline Status" value="EVADING →" highlight />
      </Cell>

      {/* CTA */}
      <div style={{ display:'flex', alignItems:'center', gap:20 }}>
        <motion.button
          whileHover={{ scale:1.04, background:'rgba(255,32,32,0.1)', boxShadow:'0 0 28px rgba(255,32,32,0.4)' }}
          whileTap={{ scale:0.97 }}
          onClick={onEnter}
          style={{
            fontFamily:'var(--share)', fontSize:10, letterSpacing:'.25em', textTransform:'uppercase',
            padding:'14px 40px', border:'1px solid var(--red)', color:'var(--red)',
            background:'transparent', cursor:'pointer', transition:'background .2s, box-shadow .2s',
          }}
        >
          ◈ ACCESS CONTROL PANEL
        </motion.button>
        <motion.a href="#archives" whileHover={{ opacity:1 }}
          style={{ fontFamily:'var(--share)', fontSize:9, letterSpacing:'.35em', textTransform:'uppercase', color:'var(--phosphor-d)', textDecoration:'none', opacity:0.45, cursor:'pointer' }}>
          VIEW ARCHIVES ↘
        </motion.a>
      </div>
    </motion.div>

    {/* ══ RIGHT DATA PANEL — coordinates / file meta ══ */}
    <motion.div {...fade(0.65)} style={{ position:'absolute', bottom:80, right:48, zIndex:10 }}>
      <Cell style={{ width:200 }}>
        <div style={{ fontFamily:'var(--share)', fontSize:7, letterSpacing:'.3em', color:'rgba(179,255,179,0.35)', textTransform:'uppercase', marginBottom:8, borderBottom:'1px solid rgba(255,32,32,0.1)', paddingBottom:5 }}>
          GEO_REF // HNL-04
        </div>
        {[['LAT','40.0483° N'],['LONG','86.5186° W'],['YEAR','1983'],['DEPT','PARANORMAL']].map(([l,v]) => (
          <DataRow key={l} id="" label={l} value={v} />
        ))}
      </Cell>
    </motion.div>

    {/* ══ SIDE LABELS — rotated ══ */}
    {[
      { side:'left',  rot: 'rotate(180deg)', label:'SUBJECT VEC-001 // LEFT-HALF' },
      { side:'right', rot: 'rotate(0deg)',   label:'ENTITY MASTER-MIND // RIGHT-HALF' },
    ].map(({ side, rot, label }) => (
      <motion.div key={side} {...fade(0.7)}
        style={{ position:'absolute', [side]:14, top:'50%', zIndex:10, writingMode:'vertical-rl', textOrientation:'mixed', transform:`translateY(-50%) ${rot}` }}>
        <span style={{ fontFamily:'var(--share)', fontSize:7, letterSpacing:'.35em', color:'rgba(179,255,179,0.2)', textTransform:'uppercase' }}>{label}</span>
      </motion.div>
    ))}

    {/* ══ SCROLL CUE ══ */}
    <motion.div animate={{ y:[0,10,0], opacity:[0.2,0.65,0.2] }} transition={{ duration:2.8, repeat:Infinity }}
      style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
      <div style={{ width:1, height:40, background:'linear-gradient(transparent, var(--red), transparent)' }}/>
      <span style={{ fontFamily:'var(--share)', fontSize:7, letterSpacing:'.4em', color:'rgba(255,32,32,0.45)' }}>SCROLL</span>
    </motion.div>

  </section>
);

export default Hero;
