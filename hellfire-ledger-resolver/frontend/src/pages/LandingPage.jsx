import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── DOS boot sequence lines ──────────────── */
const BOOT_SEQ = [
  { txt: 'HAWKINS NATIONAL LABORATORY — SECURE SYSTEM TERMINAL v3.4.1', col: 'dim', delay: 200 },
  { txt: '(c) 1983 U.S. DEPARTMENT OF ENERGY. ALL RIGHTS RESERVED.', col: 'dim', delay: 500 },
  { txt: '────────────────────────────────────────────────────────────', col: 'dim', delay: 700 },
  { txt: 'BIOS SELF-TEST...', col: 'normal', delay: 900, ok: true },
  { txt: 'MEMORY CHECK: 640K / 640K OK', col: 'normal', delay: 1100, ok: true },
  { txt: 'DETECTING PERIPHERAL DEVICES...', col: 'normal', delay: 1400, ok: true },
  { txt: 'LOADING ENCRYPTION MODULE (RSA-1024)...', col: 'normal', delay: 1700, ok: true },
  { txt: 'DIMENSIONAL SIGNAL DETECTOR: ONLINE', col: 'cyan', delay: 1900, ok: true },
  { txt: 'HELLFIRE DEBT RESOLUTION ENGINE v2.1.0...', col: 'normal', delay: 2200, ok: true },
  { txt: 'BLOCKCHAIN UPLINK (SEPOLIA TESTNET): CONNECTING...', col: 'amber', delay: 2500 },
  { txt: '  > NODE PING: 42ms', col: 'dim', delay: 2900 },
  { txt: '  > HANDSHAKE: COMPLETE', col: 'dim', delay: 3100 },
  { txt: 'UPLINK ESTABLISHED.', col: 'cyan', delay: 3400, ok: true },
  { txt: '────────────────────────────────────────────────────────────', col: 'dim', delay: 3700 },
  { txt: '! WARNING: DIMENSIONAL INTERFERENCE DETECTED', col: 'red', delay: 3900 },
  { txt: '! UPSIDE DOWN PROXIMITY: CRITICAL — VECNA SIGNAL STRONG', col: 'red', delay: 4200 },
  { txt: '! KLINE EVASION PROTOCOL: ACTIVE', col: 'amber', delay: 4500 },
  { txt: '────────────────────────────────────────────────────────────', col: 'dim', delay: 4800 },
  { txt: 'ALL SYSTEMS NOMINAL. AWAITING OPERATOR CLEARANCE.', col: 'green', delay: 5100, ok: true },
];

const colClass = { normal:'term-line', dim:'term-line term-line--dim', red:'term-line term-line--red', cyan:'term-line term-line--cyan', amber:'term-line term-line--amber', green:'term-line glow-green' };

/* ── Cinematic background — Upside Down / gate image with Ken Burns animation ── */
const VideoBg = () => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
  }}>
    {/* The image itself — slow zoom + drift = feels like a live 4K video */}
    <div style={{
      position: 'absolute', inset: '-8%',   /* bleed so pan never shows edges */
      backgroundImage: 'url(/images/hawkins_lab_hd.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      animation: 'kenburns 28s ease-in-out infinite alternate',
      filter: 'saturate(1.3) brightness(0.72)',
      willChange: 'transform',
    }} />

    {/* Dark radial vignette — keeps text legible */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1,
      background: 'radial-gradient(ellipse at center, rgba(3,3,10,0.42) 0%, rgba(3,3,10,0.86) 100%)',
    }} />
    {/* Red edge glow — Upside Down atmosphere */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background:
        'linear-gradient(180deg, rgba(180,0,0,0.18) 0%, transparent 35%, rgba(0,0,0,0.72) 100%),' +
        'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,32,32,0.18) 0%, transparent 70%)',
    }} />
    {/* CRT scanlines */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      background: 'repeating-linear-gradient(0deg,transparent 0px,transparent 2px,rgba(0,0,0,0.09) 2px,rgba(0,0,0,0.09) 4px)',
    }} />
    {/* Noise flicker overlay */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      opacity: 0.03,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
      animation: 'noise-flicker 0.08s steps(1) infinite',
    }} />
  </div>
);

export default function LandingPage({ onEnter, onAccessPortal }) {
  const [lines, setLines] = useState([]);
  const [showCTA, setShowCTA] = useState(false);
  const [isPortaling, setIsPortaling] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const termRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    const timers = BOOT_SEQ.map(line =>
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        termRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
      }, line.delay)
    );
    // Show CTA after boot
    const cta = setTimeout(() => setShowCTA(true), 5500);
    return () => { timers.forEach(clearTimeout); clearTimeout(cta); };
  }, []);

  const handlePortalAccess = () => {
    setIsPortaling(true);
    setTimeout(() => {
      onAccessPortal();
    }, 800);
  };

  // Periodic glitch
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() > .65) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 180);
      }
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden',
    }}>
      <VideoBg/>

      {/* Portal Expansion Window */}
      <AnimatePresence>
        {isPortaling && (
          <motion.div
            initial={{ width: '40px', height: '2px', opacity: 1, x: '-50%', y: '-50%' }}
            animate={{ 
              width: ['40px', '100vw', '100vw'],
              height: ['2px', '2px', '100vh'],
              backgroundColor: ['#ff2020', '#ff2020', '#050508']
            }}
            transition={{ duration: 0.8, times: [0, 0.4, 1], ease: "easeInOut" }}
            style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 99999, border: '1px solid #ff2020' }}
          />
        )}
      </AnimatePresence>

      {/* Red dimensional fog at edges */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 40%,rgba(255,32,32,.06) 80%,rgba(0,0,0,.9) 100%)',pointerEvents:'none',zIndex:1}}/>

      {/* ── MAIN CONTENT ── */}
      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:820, padding:'0 24px' }}>

        {/* Header badge */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}}
          style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <div style={{width:36,height:36,border:'2px solid var(--red)',display:'flex',alignItems:'center',justifyContent:'center',transform:'rotate(45deg)',flexShrink:0}}>
            <span style={{transform:'rotate(-45deg)',color:'var(--red)',fontSize:16,lineHeight:1}}>⬡</span>
          </div>
          <div>
            <div style={{fontFamily:'var(--orb)',fontSize:10,letterSpacing:'.35em',color:'var(--cyan)',textTransform:'uppercase'}}>HAWKINS NATIONAL LABORATORY</div>
            <div style={{fontFamily:'var(--share)',fontSize:9,letterSpacing:'.2em',color:'var(--phosphor-d)',textTransform:'uppercase',marginTop:2}}>CLASSIFIED NETWORK — AUTHORIZED PERSONNEL ONLY</div>
          </div>
        </motion.div>

        {/* MAIN TITLE — Stranger Things style */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.3}}
          style={{marginBottom:32,position:'relative'}}>
          {/* Glitch layers */}
          <AnimatePresence>
            {glitch && (
              <motion.div key="glitch-wrap">
                <motion.h1 key="g1" initial={{opacity:0}} animate={{opacity:.45}} exit={{opacity:0}}
                  style={{position:'absolute',top:2,left:3,fontFamily:'var(--orb)',fontWeight:900,fontSize:'clamp(2.5rem,7vw,5.5rem)',textTransform:'uppercase',letterSpacing:'.02em',color:'var(--cyan)',pointerEvents:'none',lineHeight:1}}>
                  HELLFIRE<br/><span style={{fontSize:'60%',letterSpacing:'.15em',fontWeight:400}}>LEDGER RESOLVER</span>
                </motion.h1>
                <motion.h1 key="g2" initial={{opacity:0}} animate={{opacity:.35}} exit={{opacity:0}}
                  style={{position:'absolute',top:-2,left:-3,fontFamily:'var(--orb)',fontWeight:900,fontSize:'clamp(2.5rem,7vw,5.5rem)',textTransform:'uppercase',letterSpacing:'.02em',color:'var(--purple)',pointerEvents:'none',lineHeight:1}}>
                  HELLFIRE<br/><span style={{fontSize:'60%',letterSpacing:'.15em',fontWeight:400}}>LEDGER RESOLVER</span>
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
          <h1 className="glow-red" style={{fontFamily:'var(--orb)',fontWeight:900,fontSize:'clamp(2.5rem,7vw,5.5rem)',textTransform:'uppercase',letterSpacing:'.02em',lineHeight:1}}>
            HELLFIRE<br/>
            <span style={{fontSize:'60%',letterSpacing:'.15em',fontWeight:400,color:'var(--phosphor)',textShadow:'0 0 10px rgba(179,255,179,.4)'}}>LEDGER RESOLVER</span>
          </h1>
        </motion.div>

        {/* Tagline marquee */}
        <div className="ticker-strip" style={{borderTop:'1px solid var(--b-phosphor)',borderBottom:'1px solid var(--b-phosphor)',padding:'6px 0',marginBottom:24,background:'rgba(179,255,179,.025)'}}>
          <div className="ticker-inner">
            {Array.from({length:4}).map((_,i)=>(
              <React.Fragment key={i}>
                <span className="ticker-item" style={{color:'var(--red)'}}>◈ SETTLE DEBTS</span>
                <span className="ticker-item" style={{color:'var(--cyan)'}}>◈ LOCK STATS</span>
                <span className="ticker-item" style={{color:'var(--amber)'}}>◈ EVADE KLINE</span>
                <span className="ticker-item" style={{color:'var(--phosphor-d)'}}>◈ HAWKINS 1983</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* DOS terminal boot box */}
        <div className="panel panel-screws" style={{marginBottom:32,maxHeight:280,overflow:'hidden'}}>
          <div className="panel-label panel-label--cyan">
            <span className="status-dot status-dot--cyan"/>
            SYSTEM BOOT SEQUENCE — TERMINAL 0x04
          </div>
          <div ref={termRef} style={{padding:'16px 20px',maxHeight:232,overflowY:'auto',background:'var(--bg-term)'}}>
            {lines.map((ln, i) => (
              <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{duration:.2}}
                style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                <span className={colClass[ln.col] || 'term-line'}>{ln.txt}</span>
                {ln.ok && <span style={{fontFamily:'var(--vt)',fontSize:18,color:'var(--green)',marginLeft:'auto',whiteSpace:'nowrap'}}>[OK]</span>}
              </motion.div>
            ))}
            {showCTA && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{display:'flex',alignItems:'center',gap:4,marginTop:6}}>
                <span className="term-line term-line--red">{'>'}</span>
                <span className="term-line">AWAITING CLEARANCE</span>
                <span className="blink" style={{fontFamily:'var(--vt)',fontSize:22,color:'var(--phosphor)'}}>█</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <AnimatePresence>
          {showCTA && (
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}}
              style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
              <motion.button
                className="retro-btn retro-btn--red"
                whileHover={{scale:1.04,boxShadow:'0 0 30px rgba(255,32,32,.5)'}}
                whileTap={{scale:.96}}
                onClick={handlePortalAccess}
                data-hover="true"
                style={{fontFamily:'var(--orb)',fontWeight:700,fontSize:12,padding:'14px 36px',letterSpacing:'.15em'}}>
                ◈ ENTER CONTROL PANEL
              </motion.button>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
                style={{fontFamily:'var(--share)',fontSize:9,letterSpacing:'.2em',color:'var(--phosphor-d)',textTransform:'uppercase'}}>
                ↑ REQUIRES CLEARANCE LEVEL 5+
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,
        borderTop:'1px solid var(--b-phosphor)',background:'rgba(10,10,18,.9)',
        padding:'6px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:5,
      }}>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <span style={{display:'flex',gap:6,alignItems:'center',fontFamily:'var(--share)',fontSize:9,letterSpacing:'.2em',color:'var(--red)',textTransform:'uppercase'}}>
            <span className="status-dot status-dot--red"/>KLINE EVASION: ACTIVE
          </span>
          <span style={{fontFamily:'var(--share)',fontSize:9,letterSpacing:'.15em',color:'var(--phosphor-d)',textTransform:'uppercase',display:'none'}}>PROTOCOL 11-06-83</span>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span className="status-dot status-dot--green"/>
          <span style={{fontFamily:'var(--share)',fontSize:9,letterSpacing:'.15em',color:'var(--phosphor-d)',textTransform:'uppercase'}}>UPLINK: NOMINAL</span>
        </div>
      </div>
    </div>
  );
}
