import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [.23,1,.32,1];

/**
 * DemogorgonReveal
 * ─────────────────
 * Full-bleed cinematic section with:
 * • Hawkins Lab background image (parallax on scroll)
 * • Demogorgon close-up that scales/reveals on scroll intersection
 * • Stats row with IntersectionObserver progress bars
 * • "Cards" showing creature facts — synchronize panel style
 */

const StatBar = ({label,pct,delay=0,purple}) => {
  const [on,setOn] = useState(false);
  const r = useRef(null);
  useEffect(()=>{
    const o = new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);o.disconnect();}},{threshold:.35});
    if(r.current) o.observe(r.current);
    return()=>o.disconnect();
  },[]);
  return(
    <div ref={r} style={{flex:'1 1 100px'}}>
      <div style={{fontFamily:'var(--mono)',fontSize:8,letterSpacing:'.3em',color:'var(--t3)',textTransform:'uppercase',marginBottom:8}}>{label}</div>
      <div className="bar-bg"><div className={`bar-fill${purple?' bar-fill--purple':''} ${on?'on':''}`} style={{width:pct,transitionDelay:`${delay}s`}}/></div>
      <div className="metric" style={{fontSize:'clamp(1.5rem,3vw,2.8rem)',marginTop:6}}>{pct}</div>
    </div>
  );
};

const FACTS = [
  {icon:'⚡',title:'CLASS: APEX',sub:'No known classification exists. Beyond omega-level threat.',col:'var(--red)'},
  {icon:'◎',title:'ORIGIN',sub:'Emerged from the gate at Hawkins Lab, November 1983.',col:'var(--purple2)'},
  {icon:'✦',title:'WEAKNESS',sub:'High-intensity light and fire. Heat disrupts hive signal.',col:'var(--gold2)'},
  {icon:'⟩',title:'HUNTING',sub:'Tracks prey via nervous system resonance from the rift.',col:'var(--red)'},
];

export default function DemogorgonReveal() {
  const imgRef = useRef(null);

  // Scroll parallax on background
  useEffect(()=>{
    const el = imgRef.current; if(!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const prog = 1 - (r.bottom / (window.innerHeight + r.height));
      el.style.transform = `translateY(${prog * -40}px)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);

  return(
    <section style={{position:'relative',overflow:'hidden',zIndex:1,background:'var(--bg)'}}>

      {/* ── FULL-BLEED HAWKINS LAB IMAGE REVEAL ── */}
      <div style={{position:'relative',height:'80vh',overflow:'hidden'}}>
        {/* Parallax background image */}
        <div ref={imgRef} style={{
          position:'absolute', inset:'-10%',
          backgroundImage:'url(/images/hawkins-lab.png)',
          backgroundSize:'cover', backgroundPosition:'center',
          willChange:'transform', filter:'brightness(.55) saturate(1.2)',
        }}/>
        {/* Scan line overlay */}
        <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px)',pointerEvents:'none'}}/>
        {/* Red vignette */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 30%,rgba(229,9,20,.15) 70%,rgba(0,0,0,.7) 100%)',pointerEvents:'none'}}/>

        {/* Centered label overlay */}
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease}}
          style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'0 5vw',zIndex:2}}>
          <span className="sec-label" style={{margin:'0 auto 20px',display:'inline-flex'}}>Hawkins National Laboratory</span>
          <h2 className="h-display h-display--italic" style={{fontSize:'clamp(3rem,8vw,9rem)',textShadow:'0 0 40px rgba(229,9,20,.4)'}}>
            CLASSIFIED<br/><span style={{color:'var(--red)'}}>FACILITY</span>
          </h2>
          <p style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.2em',color:'rgba(255,255,255,.55)',textTransform:'uppercase',marginTop:16,maxWidth:480,lineHeight:1.9}}>
            Operated by the U.S. DoE under Project MKUltra. All dimensional experiments sealed. Access restricted.
          </p>
        </motion.div>

        {/* Bottom gradient */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:200,background:'linear-gradient(transparent,var(--bg))',zIndex:3}}/>
      </div>

      {/* ── DEMOGORGON FACTS SECTION ── */}
      <div style={{padding:'0 5vw 100px'}}>
        {/* Demogorgon face + info side by side */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--b-dim)',marginBottom:1}}>
          {/* Left: Demogorgon image */}
          <motion.div initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.2,ease}}
            style={{position:'relative',overflow:'hidden'}}>
            <img src="/images/demogorgon.png" alt="Demogorgon" style={{
              width:'100%',height:'100%',objectFit:'cover',display:'block',
              filter:'brightness(.75) saturate(1.3)',
              transition:'transform .8s cubic-bezier(.23,1,.32,1)',
            }}
            onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
            onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
            {/* Creature type label */}
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'16px 20px',
              background:'linear-gradient(transparent,rgba(7,7,14,.95))'}}>
              <div className="h-display" style={{fontSize:'clamp(1.2rem,2.5vw,2.5rem)'}}>THE DEMOGORGON</div>
              <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.25em',color:'var(--red)',textTransform:'uppercase',marginTop:4}}>◈ APEX PREDATOR · UPSIDE DOWN</div>
            </div>
          </motion.div>

          {/* Right: 2x2 fact grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--b-dim)'}}>
            {FACTS.map(({icon,title,sub,col},i)=>(
              <motion.div key={title} className="panel-card"
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:.7,delay:i*.1,ease}}
                style={{padding:'28px 24px'}}>
                <div style={{fontFamily:'var(--display)',fontSize:28,color:col,marginBottom:10}}>{icon}</div>
                <h4 style={{fontFamily:'var(--display)',fontSize:18,letterSpacing:'.06em',color:'var(--t1)',textTransform:'uppercase',marginBottom:8}}>{title}</h4>
                <p style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.1em',color:'var(--t2)',lineHeight:1.9,textTransform:'uppercase'}}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stat bars row */}
        <div style={{padding:'40px 0',borderTop:'1px solid var(--b-dim)',display:'flex',gap:40,flexWrap:'wrap'}}>
          <StatBar label="Threat Level" pct="97%" delay={.3}/>
          <StatBar label="Gate Energy"  pct="84%" delay={.45}/>
          <StatBar label="PSI Signal"   pct="71%" delay={.6} purple/>
          <StatBar label="Sightings"    pct="38%" delay={.75}/>
        </div>

        {/* Vecna section — purple theme */}
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:1,background:'var(--b-dim)',marginTop:1}}>
          <div className="panel-card" style={{padding:'44px 40px',background:'rgba(124,58,237,.04)'}}>
            <span className="sec-label sec-label--purple">ENTITY PROFILE</span>
            <h3 className="h-display" style={{fontSize:'clamp(2rem,4vw,4.5rem)',marginBottom:20}}>
              VECNA<br/><span className="h-display--purple-outline">CLASSIFIED</span>
            </h3>
            <p style={{fontFamily:'var(--sans)',fontSize:14,color:'var(--t2)',lineHeight:1.9,marginBottom:24}}>
              Henry Creel / One / Vecna — the true mastermind behind the dimensional breach.
              A psychokinetic human who crossed into the Upside Down and became its apex intelligence.
              Unlike the Demogorgon, Vecna hunts with purpose and memory. His targets are chosen, not random.
            </p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {['PSYCHOKINESIS','MEMORY MANIPULATION','HIVE MIND CONTROL','VINE NETWORK'].map(t=>(
                <span key={t} className="badge badge--purple" style={{fontSize:9}}>{t}</span>
              ))}
            </div>
          </div>
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1.2}}
            style={{position:'relative',overflow:'hidden',minHeight:360}}>
            <img src="/images/vecna.png" alt="Vecna" style={{
              width:'100%',height:'100%',objectFit:'cover',
              filter:'brightness(.7) saturate(1.2)',
              transition:'transform .8s cubic-bezier(.23,1,.32,1)',
            }}
            onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
            onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(7,7,14,.6),transparent)'}}/>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
