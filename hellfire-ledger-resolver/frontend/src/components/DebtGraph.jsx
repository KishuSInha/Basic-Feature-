import React from 'react';

/* 
  DebtGraph — Performance Edition
  - No continuous per-node animations
  - Static grid, no SVG filters in hot path
  - Pathline draw-on is CSS animation only (once)
*/

const NODES = [
  { id: 'EDDIE',  x: 120, y: 90,  label: 'ED', desc: 'MUNSON',   color: '#ff2020' },
  { id: 'DUSTIN', x: 260, y: 50,  label: 'DU', desc: 'HENDERSON',color: '#00f5ff' },
  { id: 'LUCAS',  x: 290, y: 170, label: 'LU', desc: 'SINCLAIR', color: '#00f5ff' },
  { id: 'MIKE',   x: 60,  y: 180, label: 'MI', desc: 'WHEELER',  color: '#00f5ff' },
  { id: 'MAX',    x: 185, y: 130, label: 'MA', desc: 'MAYFIELD', color: '#bf5fff' },
];

const EDGES = [
  { from: 'EDDIE',  to: 'DUSTIN', amt: '10 ETH',  opt: true  },
  { from: 'EDDIE',  to: 'MIKE',   amt: '10 ETH',  opt: true  },
  { from: 'EDDIE',  to: 'LUCAS',  amt: '5 ETH',   opt: false },
  { from: 'LUCAS',  to: 'MAX',    amt: '2 ETH',   opt: false },
];

export default function DebtGraph() {
  const getNode = (id) => NODES.find(n => n.id === id);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'rgba(3,3,10,0.8)', overflow:'hidden' }}>
      <style>{`
        @keyframes edgeDraw { from { stroke-dashoffset: 300 } to { stroke-dashoffset: 0 } }
        @keyframes nodeIn   { from { opacity:0; transform:scale(0.5) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* Grid pattern — static, no animation */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.12 }}>
        <defs>
          <pattern id="dg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dg-grid)" />
      </svg>

      {/* Main graph SVG */}
      <svg viewBox="0 0 380 240" style={{ width:'100%', height:'calc(100% - 60px)', display:'block' }}>
        
        {/* Edges */}
        {EDGES.map((e, i) => {
          const f = getNode(e.from), t = getNode(e.to);
          const len = Math.hypot(t.x-f.x, t.y-f.y);
          const col = e.opt ? '#bf5fff' : 'rgba(179,255,179,0.4)';
          const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
          return (
            <g key={i}>
              <line
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={col} strokeWidth={e.opt ? 2 : 1}
                strokeDasharray={len} strokeDashoffset={len}
                style={{ animation: `edgeDraw 0.8s ${i * 0.2}s ease forwards` }}
              />
              {/* Amount label */}
              <text x={mx} y={my - 6} fill={col} fontSize="8" textAnchor="middle" fontFamily="var(--share)" opacity="0.8">
                {e.amt}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={n.id} style={{ animation: `nodeIn 0.4s ${0.6 + i * 0.1}s ease both` }}>
            {/* Outer ring — no animation */}
            <circle cx={n.x} cy={n.y} r={20} fill="rgba(3,3,10,0.9)" stroke={n.color} strokeWidth={1.5} strokeOpacity={0.4} />
            {/* Inner circle */}
            <circle cx={n.x} cy={n.y} r={14} fill="rgba(3,3,10,0.95)" stroke={n.color} strokeWidth={1.5} />
            {/* Label */}
            <text x={n.x} y={n.y} dy=".35em" textAnchor="middle" fill={n.color} fontSize="9" fontFamily="var(--orb)" fontWeight="900">{n.label}</text>
            {/* Name below node */}
            <text x={n.x} y={n.y + 30} textAnchor="middle" fill="rgba(179,255,179,0.5)" fontSize="7" fontFamily="var(--share)">{n.desc}</text>
          </g>
        ))}
      </svg>

      {/* Stats strip at bottom */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:60,
        background:'rgba(0,0,0,0.7)', borderTop:'1px solid rgba(179,255,179,0.07)',
        display:'grid', gridTemplateColumns:'repeat(4,1fr)', alignItems:'center', padding:'0 16px',
      }}>
        {[
          { label:'NODES',    val:'5', col:'var(--cyan)' },
          { label:'EDGES',    val:'4', col:'var(--purple)' },
          { label:'OPTIMIZED',val:'2', col:'var(--phosphor)' },
          { label:'STATUS',   val:'CLASSIFIED', col:'var(--red)' },
        ].map(({ label, val, col }) => (
          <div key={label} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--share)', fontSize:7, letterSpacing:'.25em', color:'rgba(179,255,179,0.35)', textTransform:'uppercase', marginBottom:3 }}>{label}</div>
            <div style={{ fontFamily:'var(--vt)', fontSize:15, color:col }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
