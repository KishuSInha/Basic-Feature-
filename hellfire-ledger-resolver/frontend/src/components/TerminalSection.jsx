import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CMDS = [
  {p:'> ',t:'connect upside_down',d:700},
  {p:'  ',t:'establishing link... [OK]',d:1600},
  {p:'> ',t:'scanning dimension...',d:2500},
  {p:'  ',t:'anomaly @ 41.2°N 85.8°W',d:3300},
  {p:'> ',t:'identify entity',d:4200},
  {p:'  ',t:'CLASS: APEX ENTITY',d:5000},
  {p:'  ',t:'THREAT LEVEL: OMEGA',d:5700},
  {p:'  ',t:'!!! VECNA DETECTED !!!',d:6400,danger:true},
  {p:'> ',t:'initiate protocol 7...',d:7400},
  {p:'  ',t:'WARNING: connection unstable',d:8200},
  {p:'> ',t:'_',d:9000,cursor:true},
];

const Waveform=()=>(
  <div style={{display:'flex',alignItems:'center',gap:2,height:38}}>
    {Array.from({length:28},(_,i)=>(
      <div key={i} style={{
        width:3,borderRadius:1.5,
        background:i%5===0?'var(--purple2)':'var(--red)',
        animation:`wave-bar ${.45+Math.random()*.65}s ${(i/28)*.38}s ease-in-out infinite alternate`,
        '--h':`${9+Math.random()*28}px`,opacity:.65,
      }}/>
    ))}
    <style>{`@keyframes wave-bar{0%,100%{height:3px}50%{height:var(--h,18px)}}`}</style>
  </div>
);

const ease=[.23,1,.32,1];

export default function TerminalSection(){
  const [lines,setLines]=useState([]);
  const endRef=useRef(null);
  useEffect(()=>{ const ts=CMDS.map(c=>setTimeout(()=>setLines(p=>[...p,c]),c.d)); return()=>ts.forEach(clearTimeout); },[]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); },[lines]);

  return(
    <section id="experiments" className="sec" style={{zIndex:1,position:'relative',overflow:'hidden'}}>
      {/* Purple blob */}
      <div style={{position:'absolute',width:600,height:600,top:'-10%',left:'50%',transform:'translateX(-50%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 70%)',filter:'blur(70px)',pointerEvents:'none'}}/>

      {/* Section header */}
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.85,ease}} style={{marginBottom:56}}>
        <span className="sec-label sec-label--purple">Hawkins Laboratory — Section 04</span>
        <h2 className="h-display" style={{fontSize:'clamp(2.5rem,7vw,7rem)'}}>
          Lab <span className="h-display--purple-outline">Terminal</span>
        </h2>
      </motion.div>

      {/* Two-column layout: terminal + side info */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:1,background:'var(--b-dim)',maxWidth:1100,margin:'0 auto'}}>
        {/* Terminal */}
        <motion.div initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease}}>
          <div className="terminal">
            <div className="terminal__bar">
              {['var(--red)','var(--gold)','#22C55E'].map((c,i)=>(
                <div key={i} className="terminal__dot" style={{background:c}}/>
              ))}
              <span style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.18em',color:'var(--t2)',marginLeft:8}}>HAWKINS_LAB — SESSION 0x4</span>
              <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:6}}>
                <div className="blink" style={{width:6,height:6,borderRadius:'50%',background:'var(--red)',boxShadow:'0 0 8px var(--red)'}}/>
                <span style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--red)',letterSpacing:'.2em'}}>LIVE</span>
              </div>
            </div>
            {/* Waveform strip */}
            <div style={{background:'rgba(8,0,14,.9)',borderBottom:'1px solid rgba(124,58,237,.1)',padding:'9px 18px',display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--t3)',letterSpacing:'.2em',whiteSpace:'nowrap'}}>DIM SIGNAL</span>
              <Waveform/>
              <span style={{fontFamily:'var(--mono)',fontSize:8,color:'var(--red)',letterSpacing:'.2em',whiteSpace:'nowrap'}}>ANOMALY DETECTED</span>
            </div>
            <div className="terminal__body">
              <div style={{color:'var(--t3)',fontSize:10,marginBottom:10,lineHeight:1.8}}>
                HAWKINS NATIONAL LABORATORY — CLASSIFIED NETWORK v3.4.1<br/>
                All unauthorized access prosecuted under Federal Law.<br/>
                ────────────────────────────────────────
              </div>
              {lines.map((l,i)=>(
                <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{duration:.25}}
                  style={{display:'flex',gap:8,
                    color:l.danger?'var(--red)':l.p==='> '?'var(--purple2)':'var(--t2)',
                    textShadow:l.danger?'0 0 10px var(--red)':'none',
                    fontWeight:l.danger?700:400, letterSpacing:'.04em',
                  }}>
                  <span style={{color:'var(--purple2)',opacity:.6}}>{l.p}</span>
                  <span>{l.t}{l.cursor&&<span className="blink" style={{color:'var(--purple2)'}}>█</span>}</span>
                </motion.div>
              ))}
              <div ref={endRef}/>
            </div>
          </div>
        </motion.div>

        {/* Side info panel — synchronize's small feature cards */}
        <div style={{display:'flex',flexDirection:'column',gap:1,background:'var(--b-dim)'}}>
          {[
            {icon:'⚡',title:'THREAT LEVEL',val:'OMEGA',col:'var(--red)'},
            {icon:'◎',title:'BREACH STATUS',val:'ACTIVE — GATE OPEN',col:'var(--purple2)'},
            {icon:'✦',title:'PSI ENERGY',val:'71% CAPACITY',col:'var(--gold2)'},
            {icon:'⟩',title:'ENTITY',val:'VECNA / CLASS APEX',col:'var(--red)'},
          ].map(({icon,title,val,col})=>(
            <div key={title} className="panel-card" style={{padding:'24px 22px',flex:1}}>
              <div style={{fontFamily:'var(--display)',fontSize:22,color:col,marginBottom:8}}>{icon}</div>
              <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:'.28em',color:'var(--t3)',textTransform:'uppercase',marginBottom:4}}>{title}</div>
              <div style={{fontFamily:'var(--display)',fontSize:18,letterSpacing:'.04em',color:'var(--t1)',textTransform:'uppercase'}}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
