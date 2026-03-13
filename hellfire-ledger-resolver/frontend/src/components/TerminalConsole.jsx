import React, { useState, useEffect, useRef } from 'react';

/* 
  TerminalConsole — Lab Refinement
  - Removed backdrop-blur for performance
  - Optimized rendering loop
*/

const TerminalConsole = () => {
  const [logs, setLogs] = useState([
    { id: 1, text: ">>> HNL-OS KERNEL v4.3 BOOTED.", type: "system" },
    { id: 2, text: ">>> SECURE GATEWAY ENCRYPTED. [SHA-256]", type: "system" },
    { id: 3, text: ">>> AUTHENTICATED: AGENT_WHEELER", type: "success" },
    { id: 4, text: ">>> SCANNING SECTOR 4... INTERFERENCE DETECTED.", type: "warning" },
  ]);
  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    const messages = [
      { t: "ENCRYPTION KEY ROTATED.", c: "info" },
      { t: "KLINE PATROL BYPASSED.", c: "success" },
      { t: "DEMODOG SUPPLY LEDGER SYNCED.", c: "success" },
      { t: "SIGNAL FLUCTUATION IN SECTOR 4.", c: "warning" },
      { t: "MEMORY SCRUBBING IN PROGRESS...", c: "info" },
      { t: "SEPOLIA NODE SYNCED.", c: "success" },
      { t: "HELLFIRE CLUB INVENTORY COMPRESSED.", c: "system" },
    ];
    
    const interval = setInterval(() => {
      setLogs(prev => {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const newLogs = [...prev, { id: Date.now(), text: `>>> ${msg.t}`, type: msg.c }];
        return newLogs.length > 20 ? newLogs.slice(1) : newLogs;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                   log.type === 'warning' ? 'var(--red)' : 'rgba(179,255,179,0.4)'
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
        fontFamily: 'var(--share)', letterSpacing: '.2em', transform: 'rotate(2deg)'
      }}>
        HAWKINS LAB
      </div>
    </div>
  );
};

export default TerminalConsole;
