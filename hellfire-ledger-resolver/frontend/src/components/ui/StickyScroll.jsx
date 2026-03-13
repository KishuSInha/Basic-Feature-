import React, { useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";

/**
 * StickyScroll — Full-Page Implementation
 * Left column: scrolls normally with staggered text blocks.
 * Right column: sticky panel with animated content swap on scroll.
 */
export const StickyScroll = ({ content, labelPrefix = "ARCH" }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / cardLength);
    const closest = breakpoints.reduce((acc, bp, i) =>
      Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc
    , 0);
    setActiveCard(closest);
  });

  return (
    <div ref={containerRef} className="relative flex gap-0 w-full">
      {/* ── LEFT: Scrolling text blocks ── */}
      <div className="w-1/2 flex flex-col pr-12 pl-8 md:pl-16">
        {content.map((item, index) => (
          <div key={index} className="min-h-screen flex items-center py-32">
            <motion.div
              animate={{
                opacity: activeCard === index ? 1 : 0.15,
                x: activeCard === index ? 0 : -16,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Label line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-red-500" style={{ background: 'var(--red)' }} />
                <span style={{
                  fontFamily: 'var(--share)',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  color: 'var(--red)',
                  textTransform: 'uppercase'
                }}>
                  {labelPrefix}-{(index + 101).toString(16).toUpperCase()} // Section 0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--orb)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                textTransform: 'uppercase',
                lineHeight: 0.9,
                marginBottom: '2rem',
                color: '#fff',
              }}>{item.title}</h2>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--share)',
                fontSize: '13px',
                letterSpacing: '0.12em',
                lineHeight: 1.9,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                maxWidth: '480px',
                marginBottom: '2rem',
              }}>{item.description}</p>

              {/* Metadata */}
              {item.meta && (
                <div style={{ marginBottom: 32, display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width: 6, height: 6, background: 'var(--red)', borderRadius: '50%', boxShadow:'0 0 8px var(--red)' }} />
                  <span style={{ fontFamily: 'var(--vt)', fontSize: 11, color: 'var(--red)', letterSpacing: '.1em' }}>{item.meta}</span>
                </div>
              )}

              {/* Tags */}
              <div className="flex gap-3 mt-6">
                <span style={{
                  fontFamily: 'var(--share)', fontSize: '9px',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '4px 14px', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(179,255,179,0.3)'
                }}>CONFIDENTIAL</span>
                <span style={{
                  fontFamily: 'var(--share)', fontSize: '9px',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '4px 14px', border: '1px solid rgba(255,32,32,0.2)',
                  color: 'rgba(255,32,32,0.4)'
                }}>LEVEL 5 CLEARANCE</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── RIGHT: Sticky media panel ── */}
      <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center p-8">
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full"
          style={{
            height: '70vh',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(179,255,179,0.07)',
            background: '#0a0a10',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          }}
        >
          {content[activeCard]?.content ?? null}

          {/* CRT Scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
          }} />

          {/* Top-left label */}
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
            <span style={{
              fontFamily: 'var(--share)', fontSize: '9px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)'
            }}>LIVE FEED</span>
          </div>

          {/* Moving scan line */}
          <motion.div
            animate={{ y: ['-2px', '70vh', '-2px'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full pointer-events-none z-20"
            style={{
              height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(0,245,255,0.3), transparent)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
