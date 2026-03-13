import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import LiquidReveal from './LiquidReveal.jsx';

const CARDS = [
  { id:1, code:'EXP-01', title:'DIMENSION RUPTURE', sub:'Anomalous Scalar Readings',   top:'/images/gate.png', bot:'/images/card3.png', tag:'CRITICAL', tc:'badge--red', col:'var(--red)' },
  { id:2, code:'EXP-02', title:'LAB CONTROL ROOM', sub:'Mainframe Processing Unit',     top:'/images/control-room.png', bot:'/images/card1.png', tag:'ACTIVE',   tc:'badge--purple', col:'var(--purple2)' },
  { id:3, code:'EXP-03', title:'MIND FLAYER',        sub:'Apex Entity — Shadow Form',   top:'/images/card3.png', bot:'/images/demogorgon.png', tag:'DANGER',   tc:'badge--red', col:'var(--red)' },
  { id:4, code:'EXP-04', title:'HAWKINS LAB',         sub:'Neural Network — Ley Lines', top:'/images/hawkins-lab.png', bot:'/images/card3.png', tag:'CLASSIFIED',tc:'badge--dim', col:'var(--t2)' },
];

const ease=[.23,1,.32,1];

const Card=({c,i})=>{
  const ref=useRef(null);
  const onMove=e=>{
    const r=e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--mx',`${(e.clientX-r.left)/(r.width)*100}%`);
    ref.current?.style.setProperty('--my',`${(e.clientY-r.top)/(r.height)*100}%`);
  };
  return(
    <motion.div ref={ref} className={`panel-card ${i%2===1?'panel-card--purple':''}`}
      initial={{opacity:0,y:44}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      transition={{duration:.85,delay:i*.1,ease}} onMouseMove={onMove} data-hover="true"
      style={{ position:'relative' }}>
      <LiquidReveal topSrc={c.top} bottomSrc={c.bot} radius={110} style={{ width:'100%', aspectRatio:'16/10' }}/>
      <div style={{ padding:'16px 20px 20px', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
          <span style={{ fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.28em',color:'var(--t3)',textTransform:'uppercase' }}>{c.code}</span>
          <span className={`badge ${c.tc}`} style={{ fontSize:8 }}>{c.tag}</span>
        </div>
        <h3 style={{ fontFamily:'var(--display)',fontSize:'clamp(1.2rem,2.2vw,1.7rem)',letterSpacing:'.04em',color:'var(--t1)',textTransform:'uppercase',marginBottom:4 }}>{c.title}</h3>
        <p style={{ fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.12em',color:'var(--t2)',textTransform:'uppercase' }}>{c.sub}</p>
        {/* Synchronize solid shadow accent line */}
        <div style={{ marginTop:14,height:2,background:`linear-gradient(to right,${c.col},transparent)`,opacity:.5 }}/>
      </div>
    </motion.div>
  );
};

/* Stats row — synchronize's big metric style */
const StatsRow=()=>(
  <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'rgba(179,255,179,0.1)',marginBottom:1,borderTop:'1px solid rgba(179,255,179,0.05)',borderBottom:'1px solid rgba(179,255,179,0.05)' }}>
    {[['124+','LEDGER ENTRIES'],['7+','SECURE NODES'],['LEVEL 5','ACCESS'],].map(([val,lab],i)=>(
      <div key={lab} style={{ padding:'48px 5vw',background:'rgba(5,5,8,0.4)',backdropFilter:'blur(10px)',textAlign:'center',position:'relative' }}>
        <div className="metric" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'var(--phosphor)',textShadow:'0 0 20px rgba(179,255,179,0.3)' }}>{val}</div>
        <div className="metric-label" style={{ fontFamily:'var(--share)',fontSize:10,letterSpacing:'.4em',color:'var(--phosphor-d)',marginTop:8,textTransform:'uppercase' }}>{lab}</div>
        <div style={{ position:'absolute',inset:0,border:'1px solid rgba(179,255,179,0.05)',pointerEvents:'none' }} />
      </div>
    ))}
  </div>
);

export default function SignalsSection(){
  return(
    <section id="signals" className="sec" style={{ 
      padding:'0 0', 
      minHeight:'100vh',
      background:'#050508',
      position:'relative',
      overflow:'hidden'
    }}>
      {/* ATMOSPHERIC BACKGROUND */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(circle at center, rgba(179,255,179,0.03) 0%, transparent 70%)',zIndex:0 }} />
      <div style={{ position:'absolute',inset:0,backgroundImage:'radial-gradient(var(--b-phosphor) 1px, transparent 1px)',backgroundSize:'40px 40px',opacity:0.05,zIndex:0 }} />

      {/* Ticker — synchronize marquee line */}
      <div className="ticker" style={{ position:'relative',zIndex:1,background:'rgba(255,32,32,0.05)',borderBottom:'1px solid rgba(255,32,32,0.1)' }}>
        <div className="ticker__inner">
          {Array.from({length:6}).map((_,i)=>(
            <React.Fragment key={i}>
              <span className="ticker__item" style={{color:'var(--red)'}}>◈ LEDGER_BREACH: DETECTED</span>
              <span className="ticker__item">◈ SYNCING IMMUTABLE RECORDS — HAWKINS LAB</span>
              <span className="ticker__item" style={{color:'var(--red)'}}>◈ SECURING D&D STATS</span>
              <span className="ticker__item">◈ ENCRYPTING VOID TRANSACTIONS</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <StatsRow/>

      <div style={{ padding:'120px 8vw',position:'relative',zIndex:1 }}>
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease}} style={{marginBottom:80}}>
          <span className="sec-label" style={{ color:'var(--cyan)',letterSpacing:'.5em',fontSize:9 }}>CLASSIFIED EXPERIMENTS // SECTION 02</span>
          <h2 className="h-display" style={{ fontSize:'clamp(3rem,8vw,8.5rem)',lineHeight:0.9,marginTop:20 }}>
            UPSIDE DOWN<br/>
            <span className="h-display--outline" style={{ color:'var(--phosphor)',textShadow:'0 0 30px rgba(179,255,179,0.2)' }}>SIGNALS</span>
          </h2>
        </motion.div>

        {/* Synchronize-style feature layout: 2 small + 1 large */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',gap:1,background:'rgba(179,255,179,0.1)',border:'1px solid rgba(179,255,179,0.05)' }}>
          {CARDS.map((c,i)=><Card key={c.id} c={c} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
