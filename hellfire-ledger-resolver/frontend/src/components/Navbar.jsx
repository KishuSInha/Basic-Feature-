import React, { useEffect, useState } from 'react';

export default function Navbar(){
  const [sc,setSc]=useState(false);
  useEffect(()=>{
    const fn=()=>setSc(window.scrollY>32);
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <header className={`nav${sc?' nav--scrolled':''}`} style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 48px', height: '80px', pointerEvents: 'auto',
      background: sc ? 'rgba(5,5,8,0.8)' : 'transparent',
      backdropFilter: sc ? 'blur(10px)' : 'none',
      borderBottom: sc ? '1px solid rgba(255,32,32,0.1)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display:'flex', gap:32 }}>
        {[
          { label: 'HOME',     id: 'home' },
          { label: 'THE UPSIDE DOWN', id: 'archives' },
          { label: 'CONTACT',  id: 'contact' },
        ].map(item => (
          <a 
            key={item.label} 
            href={`#${item.id}`} 
            className="nav-link" 
            data-hover="true"
            style={{ 
              fontFamily: 'var(--share)', fontSize: 10, letterSpacing: '0.3em',
              color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
      <button className="retro-btn" style={{ padding: '8px 24px', fontSize: 9, cursor: 'pointer' }} data-hover="true">
        HAWKINS LAB ◈
      </button>
    </header>
  );
}
