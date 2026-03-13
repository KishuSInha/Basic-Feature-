import React, { useEffect, useRef } from 'react';

/* 
  TerminalConsole — Controlled Version
  - Accepts logs as props from parent (Dashboard)
  - Maintains Hawkins Lab aesthetic
*/

const TerminalConsole = ({ logs = [] }) => {
  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div style={{ height: '100%', padding: 16, overflowY: 'auto', background: 'rgba(2,3,8,0.7)', position:'relative' }}>
      <style>{`
        @keyframes cursor-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {logs.map(log => (
          <div key={log.id} style={{ 
            fontFamily: 'var(--share)', fontSize: 11, lineHeight: 1.5,
            color: log.type === 'system' ? 'var(--cyan)' : 
                   log.type === 'success' ? 'var(--phosphor)' : 
                   log.type === 'warning' ? 'var(--red)' : 
                   log.type === 'info' ? 'rgba(179,255,179,0.8)' : 'rgba(179,255,179,0.4)'
          }}>
            <span style={{ opacity: 0.3, marginRight: 8 }}>[{new Date(log.id).toLocaleTimeString([], { hour12: false })}]</span>
            {log.text}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ color: 'var(--phosphor)', fontWeight: 900, fontSize: 13 }}>❯</span>
          <div style={{ width: 8, height: 14, background: 'var(--phosphor)', animation: 'cursor-blink 1s step-start infinite' }} />
        </div>
        <div ref={consoleEndRef} />
      </div>

      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'var(--red)', color: '#fff',
        padding: '2px 8px', fontSize: 7, fontWeight: 900,
        fontFamily: 'var(--share)', letterSpacing: '.2em', transform: 'rotate(2deg)',
        zIndex: 10
      }}>
        HAWKINS LAB
      </div>
    </div>
  );
};

export default TerminalConsole;
