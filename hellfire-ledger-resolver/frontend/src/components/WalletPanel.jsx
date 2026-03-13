import React, { useState } from 'react';
import { Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

/* 
  WalletPanel — Lab Refinement
  - Minimal Framer Motion
  - Streamlined "Data Science Lab" visuals
*/

const WalletPanel = () => {
  const [status, setStatus] = useState('disconnected'); // disconnected, connecting, connected
  const [address] = useState('0x1234...ABCD');
  const [balance] = useState('1,000.00');

  const handleConnect = () => {
    setStatus('connecting');
    setTimeout(() => setStatus('connected'), 2000);
  };

  return (
    <div style={{ height: '100%', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes pulse-red { 0%,100%{background:rgba(255,32,32,0.1)} 50%{background:rgba(255,32,32,0.25)} }
        @keyframes scanning { 0%{left:-100%} 100%{left:100%} }
      `}</style>

      {status === 'disconnected' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px dashed var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-red 2s infinite' }}>
            <AlertTriangle color="var(--red)" size={32} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--orb)', fontSize: 13, fontWeight: 900, color: 'var(--red)', letterSpacing: '.2em' }}>TERMINAL OFFLINE</div>
            <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', marginTop: 4 }}>UPLINK AUTH REQUIRED</div>
          </div>
          <button 
            onClick={handleConnect}
            style={{ width: '100%', padding: '12px', background: 'rgba(255,32,32,0.05)', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--orb)', fontSize: 11, fontWeight: 900, letterSpacing: '.2em', cursor: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,32,32,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,32,32,0.05)'}
          >
            INITIATE UPLINK
          </button>
        </div>
      )}

      {status === 'connecting' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <div style={{ width: '80%', height: 2, background: 'rgba(0,245,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'var(--cyan)', animation: 'scanning 1.5s linear infinite' }} />
          </div>
          <div style={{ fontFamily: 'var(--orb)', fontSize: 11, fontWeight: 900, color: 'var(--cyan)', letterSpacing: '.4em' }}>SYNCING...</div>
        </div>
      )}

      {status === 'connected' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ padding: 12, border: '1px solid rgba(179,255,179,0.1)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--phosphor)', letterSpacing: '.1em' }}>AGENT_MUNSON</span>
             <span style={{ fontFamily: 'var(--vt)', fontSize: 15, color: '#fff' }}>{address}</span>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', letterSpacing: '.2em' }}>VERIFIED BALANCE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                  <span style={{ fontFamily: 'var(--orb)', fontSize: 32, fontWeight: 900, color: 'var(--phosphor)', textShadow: '0 0 10px rgba(179,255,179,0.4)' }}>{balance}</span>
                  <span style={{ fontFamily: 'var(--share)', fontSize: 10, color: 'rgba(179,255,179,0.5)' }}>ETH</span>
                </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: 10, border: '1px solid rgba(191,95,255,0.2)', background: 'rgba(191,95,255,0.03)' }}>
              <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'var(--purple)', letterSpacing: '.15em' }}>SIGNAL</div>
              <div style={{ height: 4, background: 'rgba(191,95,255,0.1)', marginTop: 6, display: 'flex', gap: 1 }}>
                <div style={{ flex: 1, background: 'var(--purple)' }} />
                <div style={{ flex: 1, background: 'var(--purple)' }} />
                <div style={{ flex: 1, background: 'var(--purple)' }} />
                <div style={{ flex: 1, opacity: 0.2, background: 'var(--purple)' }} />
              </div>
            </div>
            <div style={{ padding: 10, border: '1px solid rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.03)' }}>
              <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'var(--cyan)', letterSpacing: '.15em' }}>NET STATUS</div>
              <div style={{ fontFamily: 'var(--vt)', fontSize: 12, color: 'var(--cyan)', marginTop: 4 }}>ENCRYPTED</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, opacity: 0.6 }}>
            <ShieldCheck size={14} color="var(--phosphor)" />
            <span style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'var(--phosphor)', letterSpacing: '.15em' }}>SECURE SEPOLIA LINK ESTABLISHED</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPanel;
