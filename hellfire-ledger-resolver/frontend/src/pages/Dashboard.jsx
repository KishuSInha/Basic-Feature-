import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalConsole from '../components/TerminalConsole';
import WalletPanel    from '../components/WalletPanel';
import CSVUpload      from '../components/CSVUpload';
import SettlementList from '../components/SettlementList';
import AdvancedInteractiveGraph from '../components/AdvancedInteractiveGraph';
import LedgerVision from '../components/LedgerVision';
import AdminControl from '../components/AdminControl';
import TokenSend    from '../components/TokenSend';
import XPTaskbar      from '../components/XPTaskbar';
import { sfx }        from '../services/soundManager';
import { useEffect } from 'react';

const DesktopIcon = ({ id, icon, label, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ background: 'rgba(255,32,32,0.1)', boxShadow: '0 0 15px rgba(255,32,32,0.2)' }}
    style={{ 
      width: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', 
      padding: 10, cursor: 'pointer', gap: 5, borderRadius: 2, border: '1px solid transparent',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ fontSize: 42, filter: 'drop-shadow(0 0 10px rgba(255,32,32,0.5))' }}>{icon}</div>
    <div style={{ 
      color: '#b3ffb3', fontSize: 10, textAlign: 'center', 
      textShadow: '0 0 5px #000', fontWeight: 'bold', fontFamily: 'var(--share)',
      textTransform: 'uppercase', letterSpacing: '1px'
    }}>{label}</div>
  </motion.div>
);

// Custom hook for responsive detection
function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const XPWin = ({ id, title, icon, children, zIndex, onFocus, onClose, onMinimize, isMinimized, isMobile }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  // On mobile, windows are always effectively maximized
  const currentMaximized = isMobile || isMaximized;

  return (
    <motion.div
      layoutId={`win-${id}`}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isMinimized ? { 
        opacity: 0, 
        scale: 0.1, 
        x: -400, 
        y: 400,
        transition: { duration: 0.4 } 
      } : currentMaximized ? {
        opacity: 1, 
        scale: 1, 
        x: 0, 
        y: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transition: { type: 'spring', damping: 20, stiffness: 200 }
      } : { 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        y: 0,
        top: '10%',
        left: '15%',
        width: 800,
        height: 600,
        transition: { type: 'spring', damping: 20, stiffness: 200 }
      }}
      style={{
        position: 'absolute',
        background: '#0a0a12',
        border: '1px solid #ff2020',
        borderRadius: currentMaximized ? 0 : '4px 4px 0 0',
        zIndex,
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    >
      {/* Title Bar */}
      <div style={{
        height: isMobile ? 40 : 32, background: 'linear-gradient(to bottom, #8b0000 0%, #ff2020 100%)',
        display: 'flex', alignItems: 'center', padding: '0 12px', color: '#fff', flexShrink: 0
      }}>
        <span style={{ fontSize: 14, marginRight: 10 }}>{icon}</span>
        <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 900, fontFamily: 'var(--orb)', letterSpacing: '1px', textTransform: 'uppercase', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        
        <div style={{ display: 'flex', gap: 6 }}>
          {!isMobile && (
            <>
              <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} style={{ width: 22, height: 22, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, color: '#fff', fontSize: 14, fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer' }}>_</button>
              <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} style={{ width: 22, height: 22, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 2, color: '#fff', fontSize: 10, display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer' }}>□</button>
            </>
          )}
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ width: isMobile ? 28 : 22, height: isMobile ? 28 : 22, background: '#ff2020', border: '1px solid #fff', borderRadius: 2, color: '#fff', fontSize: 12, fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer' }}>✕</button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, background: '#050508', padding: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Dashboard({ userRole }) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const [resolvedData, setResolvedData] = useState(null);
  const [openWins, setOpenWins] = useState([]);
  const [minimizedWins, setMinimizedWins] = useState([]);
  const [zIndices, setZIndices] = useState({});
  const [topZ, setTopZ] = useState(110);
  
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, text: ">>> HNL-OS KERNEL v4.3 BOOTED.", type: "system" },
    { id: 2, text: ">>> SECURE GATEWAY ENCRYPTED. [SHA-256]", type: "system" },
    { id: 3, text: `>>> AUTHENTICATED: ${userRole === 'admin' ? 'AGENT_MUNSON' : 'AGENT_WHEELER'} [${userRole?.toUpperCase()}]`, type: "success" },
  ]);

  useEffect(() => {
    sfx.toggleAmbient(true);
    return () => sfx.toggleAmbient(false);
  }, []);

  const addTerminalLog = (text, type = 'info') => {
    setTerminalLogs(prev => {
      const newLogs = [...prev, { id: Date.now(), text: `>>> ${text}`, type }];
      return newLogs.length > 50 ? newLogs.slice(1) : newLogs;
    });
  };

  const handleUploadSuccess = (data) => {
    setResolvedData(data);
    addTerminalLog("UPLINK SUCCESSFUL. DECRYPTING DATASTREAM...", "success");
    sfx.play('upload');
    setTimeout(() => openWin('ledger'), 500);
    setTimeout(() => openWin('settle'), 1500);
  };

  // Define window configurations based on role
  const winDefs = userRole === 'admin' ? [
    { id: 'mint',    icon: '🪙', title: 'Token Minting',  content: () => <AdminControl userRole={userRole} addLog={addTerminalLog} /> },
    { id: 'send',    icon: '📤', title: 'Token Sending',  content: () => <TokenSend addLog={addTerminalLog} /> },
    { id: 'wallet',  icon: '👛', title: 'Wallet Gateway', content: () => <WalletPanel addLog={addTerminalLog} /> },
    { id: 'cmd',     icon: '💻', title: 'Terminal',   content: () => <TerminalConsole logs={terminalLogs} /> },
  ] : [
    { id: 'upload',   icon: '📂', title: 'Ledger Uplink', content: () => <CSVUpload onUploadSuccess={handleUploadSuccess} addLog={addTerminalLog} /> },
    { id: 'ledger',   icon: '📜', title: 'Ledger Intelligence', content: () => <LedgerVision ledger={resolvedData?.ledger || []} /> },
    { id: 'analytics',icon: '📊', title: 'Debt Analytics', content: () => <div style={{height:'100%'}}><AdvancedInteractiveGraph externalData={resolvedData} /></div> },
    { id: 'wallet',   icon: '👛', title: 'Wallet Gateway', content: () => <WalletPanel addLog={addTerminalLog} /> },
    { id: 'settle',   icon: '🧾', title: 'Settlement Queue', content: () => <SettlementList settlements={resolvedData?.settlements || []} stats={resolvedData?.stats} /> },
    { id: 'cmd',      icon: '💻', title: 'Command Terminal', content: () => <TerminalConsole logs={terminalLogs} /> },
  ];

  const openWin = (id) => {
    if (!openWins.includes(id)) {
      setOpenWins(prev => [...prev, id]);
      sfx.play('open');
    }
    setMinimizedWins(prev => prev.filter(wid => wid !== id));
    focusWin(id);
  };

  const closeWin = (id) => {
    setOpenWins(prev => prev.filter(wid => wid !== id));
    setMinimizedWins(prev => prev.filter(wid => wid !== id));
    sfx.play('close');
  };

  const minimizeWin = (id) => {
    if (minimizedWins.includes(id)) {
      setMinimizedWins(prev => prev.filter(wid => wid !== id));
      focusWin(id);
    } else {
      setMinimizedWins(prev => [...prev, id]);
    }
  };

  const focusWin = (id) => {
    setTopZ(prev => prev + 1);
    setZIndices(prev => ({ ...prev, [id]: topZ + 1 }));
  };

  return (
    <div style={{ 
      width: '100vw', height: '100vh', 
      backgroundImage: 'url("/images/wallpapers.png")',
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', position: 'relative' 
    }}>
      <div className="signal-noise" style={{ opacity: 0.08 }} />
      <div className="crt-scanlines" style={{ opacity: 0.15 }} />

      {/* Desktop Icons */}
      <div style={{ 
        position: 'absolute', 
        top: isMobile ? 20 : 30, 
        left: isMobile ? 20 : 30, 
        display: 'grid', 
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1fr', 
        gap: isMobile ? 12 : 20 
      }}>
        {winDefs.map(def => (
          <DesktopIcon 
            key={def.id} 
            icon={def.icon} 
            label={def.title} 
            onClick={() => openWin(def.id)} 
          />
        ))}
      </div>

      {/* Windows Area */}
      <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 32px)', pointerEvents: 'none' }}>
        <AnimatePresence>
          {openWins.map(id => {
            const def = winDefs.find(d => d.id === id);
            if (!def) return null;
            return (
              <XPWin
                key={id}
                id={id}
                title={def.title}
                icon={def.icon}
                zIndex={zIndices[id] || 100}
                onFocus={() => focusWin(id)}
                onClose={() => closeWin(id)}
                onMinimize={() => minimizeWin(id)}
                isMinimized={minimizedWins.includes(id)}
                isMobile={isMobile}
              >
                {def.content()}
              </XPWin>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <XPTaskbar 
        allAppDefs={winDefs}
        onOpenApp={openWin}
        openWins={winDefs.filter(d => openWins.includes(d.id))}
        minimizedWins={minimizedWins}
        onToggleWin={minimizeWin}
      />
    </div>
  );
}
