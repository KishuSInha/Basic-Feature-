import React from 'react';
import { StickyScroll } from './ui/StickyScroll';

const EVIDENCE_CONTENT = [
  {
    title: "HENRY CREEL LOG",
    description: "Subject 001 observation records. Manifestation of reality-bending capabilities under psychological stress. Status: OMEGA CLASS THREAT.",
    content: (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src="/images/archive-0.jpg"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          alt="Henry Creel"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
           <div style={{ fontFamily: 'var(--vt)', fontSize: 10, color: 'var(--red)', marginBottom: 4 }}>ID: HNL-001-C</div>
           <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '.2em' }}>STATUS: OMEGA // SEALED</div>
        </div>
      </div>
    ),
    meta: "LOG_ID: HNL-001 // NOV 1959",
  },
  {
    title: "PROJECT INDIGO",
    description: "Laboratory 04 internal documentation. Eleven's early psychokinetic training sessions. Neural override successfully documented.",
    content: (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src="/images/archive-1.jpg"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          alt="Eleven Project Indigo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
    ),
    meta: "LOG_ID: HNL-011 // SEPT 1983",
  },
  {
    title: "SOVIET INTERCEPT",
    description: "Visual data recovered from KAMCHATKA sector. Direct evidence of interdimensional experimentation by foreign entities.",
    content: (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src="/images/archive-2.jpg"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          alt="Kamchatka Intercept"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
    ),
    meta: "LOG_ID: KMN-92B // JUN 1983",
  },
  {
    title: "CLASSIFIED LINEUP",
    description: "Project Indigo secondary candidate evaluation. Comparative analysis of neurological responses to Void stimulus across subjects.",
    content: (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src="/images/archive-3.jpg"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          alt="Indigo Lineup"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
    ),
    meta: "LOG_ID: HNL-008 // JAN 1983",
  },
  {
    title: "THE VOID BREACH",
    description: "Hawkins National Laboratory Level 5 breach event. First contact visual documentation. Recovery operation status: ACTIVE.",
    content: (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src="/images/archive-5.jpg"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          alt="The Void Breach"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
    ),
    meta: "LOG_ID: BRC-101 // NOV 1983",
  },
];

const StickerSection = () => {
  return (
    <section
      id="archives"
      className="relative w-full bg-[#030308]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Background grit overlay */}
      <div style={{ position:'absolute', inset:0, background: 'url(/images/noise.png)', opacity: 0.2, pointerEvents: 'none', zIndex: 1 }} />
      
      {/* Section Header */}
      <div className="px-8 md:px-16 pt-40 pb-20 relative z-10">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
             <div style={{ width: 40, height: 1, background: 'var(--red)' }} />
             <span style={{ fontFamily: 'var(--share)', fontSize: '8px', letterSpacing: '0.45em', color: 'var(--red)', textTransform: 'uppercase' }}>
                HNL // ARCHIVAL_DEPT // CLASSIFIED
              </span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
               <h2 style={{
                  fontFamily: 'var(--orb)', fontWeight: 900,
                  fontSize: 'clamp(3.5rem, 8vw, 8rem)', lineHeight: 0.85,
                  textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.03em'
                }}>
                  VOICE OF THE<br/><span style={{ color: 'var(--red)', textShadow: '0 0 40px rgba(255,32,32,0.4)' }}>UPSIDE DOWN</span>
               </h2>
               <div style={{ marginTop: 32, display: 'flex', gap: 24 }}>
                  <div style={{ borderLeft: '1px solid rgba(179,255,179,0.1)', paddingLeft: 16 }}>
                     <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', marginBottom: 4 }}>FILE_STATUS</div>
                     <div style={{ fontFamily: 'var(--vt)', fontSize: 13, color: 'var(--phosphor)' }}>CLASSIFIED_LEVEL_5</div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(179,255,179,0.1)', paddingLeft: 16 }}>
                     <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', marginBottom: 4 }}>RELIANCE_COEF</div>
                     <div style={{ fontFamily: 'var(--vt)', fontSize: 13, color: 'var(--cyan)' }}>99.8% // [OK]</div>
                  </div>
               </div>
            </div>
            <div style={{ maxWidth: 460 }}>
              <p style={{
                fontFamily: 'var(--share)', fontSize: '11px',
                letterSpacing: '0.12em', lineHeight: 2.1,
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                marginBottom: 32
              }}>
                Recovered visual data from internal laboratory manifests. Documents the systemic breach of objective reality during the November 1983 incident. Property of Hawkins National Laboratory. Bureau of Unexplained Phenomena.
              </p>
              <button 
                className="group relative px-10 py-4 border border-white/10 overflow-hidden"
                style={{ cursor: 'none' }}
                data-hover="true"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 fontFamily:var(--orb) fontSize:10 fontWeight:700 color:white letterSpacing:.15em">VIEW_FULL_MANIFEST</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Scroll Content */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <StickyScroll content={EVIDENCE_CONTENT} labelPrefix="EXP" />
      </div>
    </section>
  );
};

export default StickerSection;
