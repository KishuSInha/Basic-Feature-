import React, { useEffect, useRef, useId } from 'react';
import { LiquidMaskEngine } from '../animations/liquidMask.js';

const LiquidReveal = ({ topSrc, bottomSrc, alt = '', radius = 130, className = '', style = {} }) => {
  const uid = useId().replace(/:/g, 'r');
  const maskId   = `m${uid}`;
  const filterId = `f${uid}`;

  const containerRef  = useRef(null);
  const maskCircleRef = useRef(null);
  const filterRef     = useRef(null);
  const rectRef       = useRef(null);
  const engineRef     = useRef(null);

  useEffect(() => {
    const engine = new LiquidMaskEngine({ radius, delay: 0.10 });
    engineRef.current = engine;
    engine.start(maskCircleRef.current, filterRef.current);
    
    // Cache rect on mount and resize
    const updateRect = () => {
      if (containerRef.current) rectRef.current = containerRef.current.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      engine.stop();
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [radius]);

  const handleMove = (e) => {
    if (!rectRef.current) return;
    engineRef.current?.setMouse(e.clientX - rectRef.current.left, e.clientY - rectRef.current.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => engineRef.current?.setActive(true)}
      onMouseLeave={() => engineRef.current?.setActive(false)}
      className={`reveal-wrap ${className}`}
      style={style}
    >
      <svg aria-hidden="true" style={{ position:'absolute',width:0,height:0,overflow:'visible',pointerEvents:'none' }}>
        <defs>
          <filter ref={filterRef} id={filterId} x="-22%" y="-22%" width="144%" height="144%">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.014" numOctaves="3" seed="7" result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="1.2" />
          </filter>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            {/* CORE MASK: Zero-cost solid circle */}
            <circle ref={maskCircleRef} cx="-9999" cy="-9999" r="0" fill="white" />
            {/* DISTORTION EDGE: Only this filtered ring is expensive */}
            <circle cx="-9999" cy="-9999" r="0" fill="none" stroke="white" strokeWidth="12" 
              filter={`url(#${filterId})`} 
              className="liquid-edge"
            />
          </mask>
        </defs>
      </svg>
      <img src={topSrc} alt={alt} draggable={false} style={{ display:'block',width:'100%',height:'100%',objectFit:'cover',userSelect:'none' }} />
      <img src={bottomSrc} alt={alt} draggable={false}
        style={{ position:'absolute',inset:0,display:'block',width:'100%',height:'100%',objectFit:'cover',userSelect:'none',
          mask:`url(#${maskId})`, WebkitMask:`url(#${maskId})` }} />
    </div>
  );
};

export default LiquidReveal;
