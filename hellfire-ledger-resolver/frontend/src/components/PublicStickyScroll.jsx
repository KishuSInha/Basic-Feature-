/**
 * PublicStickyScroll — Classified HNL Data Ledger Archive
 *
 * Visual language: a dark 1983 Hawkins Lab spreadsheet / financial ledger
 * showing debt records, party member nodes, and blockchain settlement data.
 * Each StickyScroll card has a data-grid overlay on its image panel.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from './ui/StickyScroll.jsx';
import UpsideDownParticles from './UpsideDownParticles.jsx';

/* ── Shared mini grid component for use inside content panels ── */
const GridPanel = ({ rows, title }) => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'rgba(3,3,10,0.88)',
    borderTop: '1px solid rgba(255,32,32,0.25)',
  }}>
    {title && (
      <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.4)', textTransform:'uppercase', padding:'6px 12px', borderBottom:'1px solid rgba(255,32,32,0.12)' }}>
        {title}
      </div>
    )}
    {rows.map(([id, label, val, hi], i) => (
      <div key={i} style={{ display:'grid', gridTemplateColumns:'32px 1fr 1fr', borderBottom:'1px solid rgba(255,32,32,0.08)' }}>
        <span style={{ fontFamily:'var(--vt)', fontSize:9, color:'rgba(255,32,32,0.38)', padding:'5px 8px', borderRight:'1px solid rgba(255,32,32,0.1)' }}>{id}</span>
        <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.18em', color:'rgba(179,255,179,0.4)', padding:'5px 8px', borderRight:'1px solid rgba(255,32,32,0.1)', textTransform:'uppercase' }}>{label}</span>
        <span style={{ fontFamily:'var(--vt)', fontSize:11, color: hi ? 'var(--red)' : 'var(--phosphor)', padding:'5px 8px' }}>{val}</span>
      </div>
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════════════════════════ */
const PUBLIC_CONTENT = [
  {
    title: "THE UPSIDE DOWN",
    description:
      "HAWKINS NATIONAL LABORATORY OPERATED COVERT EXPERIMENTS INTO THE PARANORMAL. PROJECT MKULTRA-VARIANT TESTING ON PSYCHOKINETIC SUBJECTS CREATED THE DIMENSIONAL RIFT KNOWN AS THE UPSIDE DOWN — 1983. ALL FINANCIAL RECORDS CONTAINING EVIDENCE OF ILLEGAL ACTIVITY WERE SEALED.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/upside-down-bg.png" className="w-full h-full object-cover" style={{ filter:'saturate(1.4) brightness(0.65)' }} alt="The Upside Down" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,rgba(255,32,32,0.14) 0%,transparent 55%,rgba(0,0,0,0.8) 100%)' }} />
        {/* top spreadsheet bar */}
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.82)', borderBottom:'1px solid rgba(255,32,32,0.2)', padding:'6px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--red)', textTransform:'uppercase' }}>HNL\RECORDS\GATE_001.dat</span>
          <motion.span animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.4, repeat:Infinity }} style={{ fontFamily:'var(--vt)', fontSize:9, color:'var(--red)' }}>● REC</motion.span>
        </div>
        <GridPanel title="GATE STATUS LOG" rows={[
          ['01','Gate ID','GATE-001'],
          ['02','Status','OPEN — BREACH',true],
          ['03','Integrity','0.0%',true],
          ['04','Date','NOV-1983'],
        ]} />
      </div>
    ),
    meta: "LOG_ID: HNL-GATE-01 // NOV 1983",
  },

  {
    title: "HELLFIRE\nLEDGER",
    description:
      "GROUP DEBT RESOLUTION ENGINE — POWERED BY BLOCKCHAIN TECHNOLOGY. THE HELLFIRE PARTY'S LEDGER TRACKS EVERY IOU, D&D INVENTORY STAT, AND POOLED EXPENSE. IMMUTABLE. TRANSPARENT. VECNA-PROOF. SETTLE IN HELLFIRE GOLD.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/control-room.png" className="w-full h-full object-cover" style={{ filter:'brightness(0.55) saturate(1.3) hue-rotate(10deg)' }} alt="Control Room" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(3,3,10,0.95) 0%,rgba(3,3,10,0.4) 45%,transparent 65%)' }} />
        {/* Terminal header */}
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.9)', borderBottom:'1px solid rgba(0,245,255,0.2)', padding:'6px 12px' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--cyan)', textTransform:'uppercase' }}>HNL MAIN TERMINAL — DEBT_ENGINE v2.1.0</span>
        </div>
        {/* CRT terminal lines */}
        <div className="absolute inset-0" style={{ paddingTop:36, paddingLeft:12, paddingRight:12 }}>
          {[
            ['>', 'LOADING LEDGER MODULE......', 'var(--phosphor)'],
            ['>', 'NODES: 6 ACTIVE [PARTY MEMBERS]', 'var(--phosphor)'],
            ['>', 'UNRESOLVED DEBTS: 12 ENTRIES', 'rgba(255,200,0,0.9)'],
            ['!', 'KLINE PROTOCOL: EVADING', 'var(--red)'],
            ['>', 'CSV_UPLOAD: AWAITING...', 'rgba(179,255,179,0.5)'],
          ].map(([prefix, text, color], i) => (
            <div key={i} style={{ fontFamily:'var(--vt)', fontSize:12, color, letterSpacing:'.04em', marginBottom:6, display:'flex', gap:10 }}>
              <span style={{ opacity:0.5 }}>{prefix}</span><span>{text}</span>
            </div>
          ))}
        </div>
        <GridPanel title="LEDGER STATS" rows={[
          ['A1','Token','HELLFIRE_GOLD (HFG)'],
          ['A2','Network','SEPOLIA_TESTNET'],
          ['A3','Optimizer','GRAPH_MIN_FLOW',true],
        ]} />
      </div>
    ),
    meta: "ENGINE_ID: HLR-v2.1.0 // SEPOLIA TESTNET",
  },

  {
    title: "THE PARTY —\nCREDITORS",
    description:
      "HELLFIRE CLUB PARTY MEMBERS — EACH A NODE IN THE DEBT GRAPH. UPLOAD A CSV OF IOU RECORDS. THE ENGINE CLEANS, NORMALIZES, AND COMPUTES THE MINIMUM SETTLEMENT TRANSACTIONS. CONNECT YOUR METAMASK. SETTLE.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/kids-group.png" className="w-full h-full object-cover" style={{ filter:'brightness(0.65) saturate(1.2)' }} alt="The Party" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(3,3,10,0.96) 0%,rgba(3,3,10,0.3) 50%,transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.82)', borderBottom:'1px solid rgba(255,32,32,0.2)', padding:'6px 12px', display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--red)', textTransform:'uppercase' }}>PARTY_NODES.csv</span>
          <span style={{ fontFamily:'var(--vt)', fontSize:9, color:'rgba(255,200,0,0.8)' }}>UNRESOLVED: 12</span>
        </div>
        <GridPanel title="NODE REGISTRY" rows={[
          ['N1','Eddie Munson','CREDITOR',true],
          ['N2','Dustin H.','DEBTOR'],
          ['N3','Lucas S.','DEBTOR'],
          ['N4','Mike W.','BALANCED'],
          ['N5','Max M.','CREDITOR',true],
          ['N6','Will B.','DEBTOR'],
        ]} />
      </div>
    ),
    meta: "LOG_ID: HNL-PARTY-01 // NOV 1983",
  },

  {
    title: "HAWKINS\nLABORATORY",
    description:
      "THE FACILITY WHERE PARALLEL REALITIES CONVERGE. CRYPTOGRAPHIC DEBT CONTRACTS ARE SEALED IN AN IMMUTABLE BLOCKCHAIN LEDGER — WITNESSED BY THE INTERDIMENSIONAL TRIBUNAL. AUTHORIZED OPERATIVES ONLY.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/hawkins-lab.png" className="w-full h-full object-cover" style={{ filter:'brightness(0.55) saturate(1.0)' }} alt="Hawkins Lab" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(3,3,10,0.97) 0%,rgba(3,3,10,0.2) 50%,transparent 70%)' }} />
        {/* scanlines */}
        <div className="absolute inset-0" style={{ background:'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)', pointerEvents:'none' }} />
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.82)', borderBottom:'1px solid rgba(255,32,32,0.2)', padding:'6px 12px' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--red)', textTransform:'uppercase' }}>FACILITY_RECORD.dat — OMEGA CLEARANCE</span>
        </div>
        <GridPanel title="FACILITY METADATA" rows={[
          ['F1','Clearance','OMEGA'],
          ['F2','Sector','LAB-04'],
          ['F3','Date','NOV 1983'],
          ['F4','Director','DR. MARTIN BRENNER'],
          ['F5','Contract','DEPLOYED — ON-CHAIN',true],
        ]} />
      </div>
    ),
    meta: "FACILITY: HNL-04 // CLEARANCE OMEGA",
  },

  {
    title: "VECNA\nPROTOCOL",
    description:
      "VECNA — THE MIND FLAYER OF FINANCIAL SYSTEMS. UNRESOLVED DEBT CORRUPTS THE LEDGER LIKE THE UPSIDE DOWN CORRUPTS REALITY. THE HAWKINS BLOCKCHAIN PROTOCOL IS THE ONLY COUNTER-MEASURE: SETTLE NOW OR FACE THE VOID.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/vecna.png" className="w-full h-full object-cover" style={{ filter:'brightness(0.45) saturate(1.5) hue-rotate(330deg)' }} alt="Vecna" />
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,rgba(255,32,32,0.2) 0%,rgba(0,0,0,0.7) 100%)' }} />
        <motion.div className="absolute inset-0"
          animate={{ opacity:[0.04, 0.12, 0.04] }}
          transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
          style={{ background:'radial-gradient(circle at 50% 40%,rgba(255,0,0,0.4) 0%,transparent 65%)' }}
        />
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.85)', borderBottom:'1px solid rgba(255,32,32,0.3)', padding:'6px 12px' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--red)', textTransform:'uppercase' }}>⚠ THREAT_ASSESSMENT.dat — LEVEL 5</span>
        </div>
        <GridPanel title="THREAT LOG" rows={[
          ['T1','Entity','VECNA / VEC-001',true],
          ['T2','Class','OMEGA — CRITICAL',true],
          ['T3','Debt Equiv.','∞ UNRESOLVED',true],
          ['T4','Counter','HLR_PROTOCOL v2.1'],
        ]} />
      </div>
    ),
    meta: "THREAT_CLASS: OMEGA // CLEARANCE: LEVEL-5",
  },

  {
    title: "GATEWAY\nSEALED",
    description:
      "WHEN ALL DEBTS ARE SETTLED, THE DIMENSIONAL GATE CLOSES. THE HELLFIRE LEDGER RESOLVER CRYPTOGRAPHICALLY SEALS EVERY TRANSACTION ON-CHAIN — VERIFIED ON ETHERSCAN. THE PARTY IS SAFE. THE LEDGER: IMMUTABLE.",
    content: (
      <div className="relative w-full h-full overflow-hidden">
        <img src="/images/gate.png" className="w-full h-full object-cover" style={{ filter:'brightness(0.5) saturate(2.2) hue-rotate(320deg)' }} alt="The Gate" />
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,rgba(255,32,32,0.22) 0%,rgba(0,0,0,0.78) 100%)' }} />
        <motion.div className="absolute inset-0"
          animate={{ rotate:360 }}
          transition={{ duration:70, repeat:Infinity, ease:'linear' }}
          style={{ background:'conic-gradient(from 0deg,rgba(255,32,32,0.06),rgba(179,255,179,0.03),rgba(0,245,255,0.04),rgba(255,32,32,0.06))', borderRadius:'50%', margin:'15%' }}
        />
        <div className="absolute top-0 left-0 right-0" style={{ background:'rgba(3,3,10,0.85)', borderBottom:'1px solid rgba(179,255,179,0.2)', padding:'6px 12px' }}>
          <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'var(--phosphor)', textTransform:'uppercase' }}>✓ LEDGER_SEALED.tx — FINAL STATE</span>
        </div>
        <GridPanel title="SETTLEMENT PROOF" rows={[
          ['S1','Gate Status','CLOSED — SEALED',false],
          ['S2','Transactions','12 → 3 (OPTIMIZED)'],
          ['S3','Chain','SEPOLIA_BLOCK_#8821'],
          ['S4','Hash','0x3E8A...F49C',false],
          ['S5','Verified','ETHERSCAN ✓'],
        ]} />
      </div>
    ),
    meta: "STATUS: CLOSED // LEDGER: IMMUTABLE",
  },
];

/* ══════════════════════════════════════════════════════════════════ */

const PublicStickyScroll = () => (
  <div id="archives" className="relative w-full bg-[#050508]" style={{ overflow:'hidden' }}>
    <UpsideDownParticles />

    {/* ── Section spreadsheet header ── */}
    <div className="relative z-10" style={{ paddingTop: 100 }}>
      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:.9, ease:[0.19,1,0.22,1] }}
        style={{ maxWidth:900, margin:'0 auto', padding:'0 5vw' }}
      >
        {/* Spreadsheet-style column header bar */}
        <div style={{ display:'grid', gridTemplateColumns:'60px 1fr 160px 120px', borderBottom:'1px solid rgba(255,32,32,0.25)', marginBottom:0 }}>
          {['#','RECORD_NAME','FILE_DATE','STATUS'].map((h,i) => (
            <div key={i} style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.35)', textTransform:'uppercase', padding:'8px 12px', borderRight: i < 3 ? '1px solid rgba(255,32,32,0.12)' : 'none', background:'rgba(10,10,18,0.8)' }}>
              {h}
            </div>
          ))}
        </div>
        {/* Title row in the "spreadsheet" */}
        <div style={{ display:'grid', gridTemplateColumns:'60px 1fr 160px 120px', border:'1px solid rgba(255,32,32,0.15)', borderTop:'none', background:'rgba(3,3,10,0.7)', backdropFilter:'blur(4px)' }}>
          <div style={{ fontFamily:'var(--vt)', fontSize:12, color:'rgba(255,32,32,0.5)', padding:'12px', borderRight:'1px solid rgba(255,32,32,0.1)' }}>∅</div>
          <div style={{ padding:'8px 12px', borderRight:'1px solid rgba(255,32,32,0.1)' }}>
            <div style={{ fontFamily:'var(--orb)', fontWeight:900, fontSize:'clamp(1.8rem,4vw,3.5rem)', textTransform:'uppercase', lineHeight:0.9 }}>
              <span style={{ color:'#fff' }}>SETTLE </span>
              <span style={{ color:'var(--red)', textShadow:'0 0 20px rgba(255,32,32,0.5)' }}>THE DEBT</span>
            </div>
          </div>
          <div style={{ fontFamily:'var(--vt)', fontSize:12, color:'var(--phosphor-d)', padding:'12px', letterSpacing:'.07em', borderRight:'1px solid rgba(255,32,32,0.1)', opacity:0.5 }}>NOV-1983</div>
          <div style={{ padding:'12px', display:'flex', alignItems:'center', gap:6 }}>
            <motion.span animate={{ opacity:[1,0.25,1] }} transition={{ duration:1.4, repeat:Infinity }} style={{ width:6, height:6, borderRadius:'50%', background:'var(--red)', display:'block', boxShadow:'0 0 6px var(--red)' }} />
            <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.2em', color:'var(--red)', textTransform:'uppercase' }}>ACTIVE</span>
          </div>
        </div>
        {/* Sub-label */}
        <div style={{ fontFamily:'var(--share)', fontSize:9, color:'rgba(179,255,179,0.28)', letterSpacing:'.2em', textTransform:'uppercase', padding:'12px 0 0', textAlign:'center' }}>
          Before Kline tracks you down — resolve it on-chain via HELLFIRE GOLD token.
        </div>
      </motion.div>
    </div>

    {/* ── Stats grid (spreadsheet row style) ── */}
    <motion.div
      initial={{ opacity:0 }}
      whileInView={{ opacity:1 }}
      viewport={{ once:true }}
      transition={{ delay:0.25, duration:.8 }}
      className="relative z-10"
      style={{ marginTop:48, borderTop:'1px solid rgba(179,255,179,0.05)', borderBottom:'1px solid rgba(179,255,179,0.05)', background:'rgba(10,10,18,0.7)' }}
    >
      <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {[
          { val:'∞',      label:'DEBTS SETTLED',  key:'DS' },
          { val:'0%',     label:'KLINE DETECTED', key:'KD' },
          { val:'SEALED', label:'ON-CHAIN STATE',  key:'OC' },
          { val:'1983',   label:'PROTOCOL YEAR',  key:'PY' },
        ].map((s,i) => (
          <div key={s.key} style={{ padding:'28px 20px', borderRight: i<3 ? '1px solid rgba(179,255,179,0.06)' : 'none', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.28)', textTransform:'uppercase', marginBottom:8 }}>{s.key} / {s.label}</div>
            <div style={{ fontFamily:'var(--orb)', fontWeight:900, fontSize:'clamp(1.6rem,2.8vw,2.8rem)', color:'var(--phosphor)', textShadow:'0 0 16px rgba(179,255,179,0.2)' }}>{s.val}</div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* ── Main sticky scroll ── */}
    <div className="relative z-10">
      <StickyScroll content={PUBLIC_CONTENT} labelPrefix="HNL" />
    </div>

    {/* ── Archive footer ── */}
    <div className="relative z-10" style={{
      borderTop:'1px solid rgba(179,255,179,0.07)',
      background:'rgba(3,3,10,0.8)',
      display:'grid', gridTemplateColumns:'60px 1fr 200px',
    }}>
      <div style={{ borderRight:'1px solid rgba(255,32,32,0.1)', padding:'16px', fontFamily:'var(--vt)', fontSize:10, color:'var(--red)', opacity:0.4 }}>EOF</div>
      <div style={{ padding:'16px', fontFamily:'var(--share)', fontSize:8, color:'rgba(179,255,179,0.2)', letterSpacing:'.2em', textTransform:'uppercase' }}>
        HNL ARCHIVE © 1983 — HAWKINS NATIONAL LABORATORY — ALL RECORDS SEALED — CLEARANCE OMEGA
      </div>
      <div style={{ borderLeft:'1px solid rgba(255,32,32,0.1)', padding:'16px', display:'flex', alignItems:'center', gap:8 }}>
        <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.4, repeat:Infinity }} style={{ width:6, height:6, borderRadius:'50%', background:'var(--red)', display:'block', boxShadow:'0 0 6px var(--red)' }} />
        <span style={{ fontFamily:'var(--share)', fontSize:8, color:'var(--red)', letterSpacing:'.2em' }}>KLINE_EVASION: ACTIVE</span>
      </div>
    </div>

    <div className="h-20 bg-gradient-to-b from-transparent to-[#03030a]" />
  </div>
);

export default PublicStickyScroll;
