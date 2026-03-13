import React, { useState, useRef, useEffect } from 'react';

/**
 * AdvancedInteractiveGraph (HNL Protocol Layer)
 * Implements the offset-path / clip-path reveal technique.
 * Performance: Uses raw state for mouse tracking within local component.
 */

const AdvancedInteractiveGraph = () => {
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Sample Path for total pooled debt / settlement progress
  const pathDef = "M 0 160 C 40 160, 60 40, 100 80 C 140 120, 160 200, 200 140 C 240 80, 280 40, 320 60 C 360 80, 380 120, 420 100 L 500 20";
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPercent(p);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#03030a',
        overflow: 'hidden',
        cursor: 'none'
      }}
    >
      <style>{`
        .graph-label {
          position: absolute;
          font-family: var(--share);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(179,255,179,0.3);
          pointer-events: none;
        }
        .graph-dot {
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          border: 2px solid var(--phosphor);
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 10px var(--phosphor);
          z-index: 20;
          pointer-events: none;
          transition: transform 0.1s ease-out;
        }
        .v-line {
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(179,255,179,0.4), transparent);
          position: absolute;
          top: 0;
          z-index: 10;
          pointer-events: none;
        }
        @keyframes flow {
           0% { stroke-dashoffset: 1000; }
           100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Background Grid */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05 }}>
        <pattern id="hnl-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--phosphor)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hnl-grid)" />
      </svg>

      {/* Indicators */}
      {isHovering && (
        <>
          <div 
            className="v-line" 
            style={{ left: `${percent}%` }}
          />
          <div 
            className="graph-dot"
            style={{
              offsetPath: `path("${pathDef}")`,
              offsetDistance: `${percent}%`,
            }}
          />
          {/* Tooltip Label - Top Right fixed */}
          <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right', pointerEvents: 'none' }}>
            <div style={{ fontFamily: 'var(--orb)', fontSize: 10, color: 'var(--phosphor)', opacity: 0.6 }}>TOTAL ASSETS</div>
            <div style={{ fontFamily: 'var(--vt)', fontSize: 24, color: '#fff' }}>
              {(percent * 42.5).toFixed(2)} <span style={{ fontSize: 12 }}>DHG</span>
            </div>
            <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', marginTop: 4 }}>SECTOR_4 ANALYTICS // RESOLVING</div>
          </div>
        </>
      )}

      {/* Main SVG Graph */}
      <svg 
        viewBox="0 0 500 200" 
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', padding: '40px 0' }}
      >
        <defs>
          <linearGradient id="grad-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--phosphor)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--phosphor)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grayscale Base Path (The "Future" or "Unsettled" path) */}
        <path 
          d={pathDef} 
          fill="none" 
          stroke="rgba(179,255,179,0.08)" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />

        {/* Colored Reveal Path (The "Resolved" or "Settled" path) */}
        <path 
          d={pathDef} 
          fill="none" 
          stroke="var(--phosphor)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          style={{ 
            clipPath: `inset(0 ${100 - percent}% 0 0)`,
            filter: 'drop-shadow(0 0 5px var(--phosphor))'
          }} 
        />

        {/* Area fill */}
        <path 
          d={pathDef + " L 500 200 L 0 200 Z"} 
          fill="url(#grad-color)" 
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }} 
        />
      </svg>

      {/* Axis Labels */}
      <div className="graph-label" style={{ bottom: 10, left: 10 }}>T_0</div>
      <div className="graph-label" style={{ bottom: 10, right: 10 }}>T_FINAL</div>
      <div className="graph-label" style={{ top: 10, left: 10 }}>LOAD: 100%</div>
    </div>
  );
};

export default AdvancedInteractiveGraph;
