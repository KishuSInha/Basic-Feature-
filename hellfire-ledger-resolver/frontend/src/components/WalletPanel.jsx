import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { useWeb3 } from '../web3/Web3Provider.jsx';

/* 
  WalletPanel — Lab Refinement
  - Minimal Framer Motion
  - Streamlined "Data Science Lab" visuals
*/

const WalletPanel = ({ addLog }) => {
  const {
    hasProvider,
    connectWallet,
    refresh,
    isConnecting,
    isConnected,
    address,
    chainId,
    isSepolia,
    networkName,
    activeMember,
    memberWalletIssues,
    ethBalance,
    hfgBalance,
    tokenSymbol,
    isOwner,
    error,
    contractAddress,
  } = useWeb3();

  const status = isConnecting ? 'connecting' : isConnected ? 'connected' : 'disconnected';

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handleConnect = async () => {
    await connectWallet();
    if (addLog) addLog('WALLET LINK REQUEST SENT.', 'system');
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
            disabled={!hasProvider || isConnecting}
            style={{ width: '100%', padding: '12px', background: 'rgba(255,32,32,0.05)', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--orb)', fontSize: 11, fontWeight: 900, letterSpacing: '.2em', cursor: hasProvider ? 'pointer' : 'not-allowed', opacity: hasProvider ? 1 : 0.5 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,32,32,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,32,32,0.05)'}
          >
            {!hasProvider ? 'WALLET NOT FOUND' : isConnecting ? 'SYNCING WALLET...' : 'INITIATE UPLINK'}
          </button>
          {error && <div style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--red)', textAlign: 'center' }}>{error}</div>}
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
             <span style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--phosphor)', letterSpacing: '.1em' }}>{activeMember ? activeMember.name.toUpperCase() : isOwner ? 'OWNER_NODE' : 'FIELD_NODE'}</span>
             <span style={{ fontFamily: 'var(--vt)', fontSize: 15, color: '#fff' }}>{shortAddress}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
            <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', letterSpacing: '.2em' }}>VERIFIED BALANCE</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                  <span style={{ fontFamily: 'var(--orb)', fontSize: 24, fontWeight: 900, color: 'var(--phosphor)', textShadow: '0 0 10px rgba(179,255,179,0.4)' }}>{ethBalance}</span>
                  <span style={{ fontFamily: 'var(--share)', fontSize: 10, color: 'rgba(179,255,179,0.5)' }}>ETH</span>
                </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.3)', letterSpacing: '.2em' }}>TOKEN BALANCE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--orb)', fontSize: 24, fontWeight: 900, color: 'var(--cyan)', textShadow: '0 0 10px rgba(0,245,255,0.35)' }}>{hfgBalance}</span>
                <span style={{ fontFamily: 'var(--share)', fontSize: 10, color: 'rgba(0,245,255,0.7)' }}>{tokenSymbol}</span>
              </div>
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
              <div style={{ fontFamily: 'var(--vt)', fontSize: 12, color: isSepolia ? 'var(--cyan)' : 'var(--red)', marginTop: 4 }}>{isSepolia ? networkName.toUpperCase() : `CHAIN ${chainId || 'N/A'}`}</div>
            </div>
          </div>

          <div style={{ padding: 10, border: '1px solid rgba(179,255,179,0.1)', background: 'rgba(0,0,0,0.4)' }}>
            <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.45)', letterSpacing: '.15em' }}>CONTRACT</div>
            <div style={{ fontFamily: 'var(--vt)', fontSize: 12, color: '#fff', marginTop: 3 }}>{`${contractAddress.slice(0, 8)}...${contractAddress.slice(-6)}`}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, opacity: 0.6 }}>
            <ShieldCheck size={14} color="var(--phosphor)" />
            <span style={{ fontFamily: 'var(--share)', fontSize: 7, color: isSepolia ? 'var(--phosphor)' : 'var(--red)', letterSpacing: '.15em' }}>
              {isSepolia ? `SECURE ${networkName.toUpperCase()} LINK ESTABLISHED` : `SWITCH WALLET TO ${networkName.toUpperCase()}`}
            </span>
          </div>

          <button
            onClick={refresh}
            style={{ marginTop: 4, width: '100%', padding: '10px', background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.35)', color: 'var(--cyan)', fontFamily: 'var(--orb)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}
          >
            REFRESH WALLET STATE
          </button>

          {error && <div style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--red)' }}>{error}</div>}

          {memberWalletIssues.length > 0 && (
            <div style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'var(--red)' }}>
              {memberWalletIssues[0]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletPanel;
