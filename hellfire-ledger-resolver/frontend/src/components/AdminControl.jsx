import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, ShieldPlus, Zap, CheckCircle } from 'lucide-react';
import { useWeb3 } from '../web3/Web3Provider.jsx';

const AdminControl = ({ addLog }) => {
  const { isConnected, isSepolia, networkName, members, areMemberWalletsUnique, memberWalletIssues, isOwner, address, connectWallet, mintTokens } = useWeb3();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(100);
  const [minting, setMinting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleMint = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!recipient) {
      setError('Recipient address is required.');
      return;
    }

    setMinting(true);
    setError('');
    if (addLog) addLog(`INITIATING TOKEN MINTING: ${amount} HFG -> ${recipient}`, 'system');

    try {
      const txHash = await mintTokens(recipient, amount);
      setMinting(false);
      setSuccess(true);
      if (addLog) addLog(`MINTING SUCCESSFUL. TX: ${txHash}`, 'success');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setMinting(false);
      const message = err?.reason || err?.shortMessage || err?.message || 'Mint transaction failed.';
      setError(message);
      if (addLog) addLog(`MINTING FAILED: ${message}`, 'error');
    }
  };

  return (
    <div style={{ height: '100%', padding: 24, background: '#03030a', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
        <ShieldPlus className="text-red-500 w-6 h-6" />
        <h3 className="font-orbitron font-bold text-sm text-red-500 uppercase tracking-widest">Admin Token Intelligence</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="font-share-tech text-[10px] text-zinc-500 uppercase tracking-widest">Recipient Address</label>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setRecipient(member.walletAddress || '')}
                  disabled={!member.walletAddress}
                  className="p-2 border border-zinc-800 text-left text-zinc-300 hover:border-zinc-600 disabled:opacity-40"
                >
                  <div className="font-orbitron text-[10px] uppercase">{member.name}</div>
                  <div className="font-share-tech text-[8px] opacity-70">{member.walletAddress ? `${member.walletAddress.slice(0, 8)}...${member.walletAddress.slice(-6)}` : 'Wallet not configured'}</div>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value.trim())}
              className="w-full bg-black border border-zinc-800 p-4 font-share-tech text-red-400 text-sm outline-none focus:border-red-500 transition-all"
            />
            <button
              onClick={() => setRecipient(address)}
              className="py-2 border border-zinc-800 text-[10px] font-orbitron text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
            >
              Use Connected Wallet
            </button>
          </div>
        </div>

        {/* Amount & Actions */}
        <div className="flex flex-col gap-4">
          <label className="font-share-tech text-[10px] text-zinc-500 uppercase tracking-widest">Allotment Volume (HFG)</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-black border border-zinc-800 p-4 font-orbitron text-red-500 text-lg outline-none focus:border-red-500 transition-all"
          />
          
          <div className="grid grid-cols-2 gap-2 mt-4">
             {[10, 50, 100, 500].map(val => (
                <button 
                   key={val}
                   onClick={() => setAmount(val)}
                   className="py-2 border border-zinc-800 text-[10px] font-orbitron text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
                >
                   +{val}
                </button>
             ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleMint}
          disabled={minting || !isOwner || !isSepolia || amount <= 0}
          style={{ width: '100%', padding: '20px', background: 'linear-gradient(to right, #8b0000, #ff2020)', color: '#fff', border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'all 0.3s' }}
          className="hover:brightness-125 disabled:grayscale flex items-center justify-center gap-3"
        >
          {minting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
          ) : success ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Coins className="w-5 h-5" />
          )}
          <span className="font-orbitron font-bold text-xs uppercase tracking-[0.2em]">
            {!isConnected ? 'Connect Wallet First' : minting ? 'Processing Allotment...' : success ? 'Allotment Confirmed' : 'Confirm Token Minting'}
          </span>
        </button>

        {!isOwner && isConnected && (
          <div className="mt-3 font-share-tech text-[9px] uppercase tracking-widest text-red-400">
            Connected wallet is not contract owner. Mint is owner-only.
          </div>
        )}

        {!isSepolia && isConnected && (
          <div className="mt-3 font-share-tech text-[9px] uppercase tracking-widest text-red-400">
            {`Wrong network selected. Switch wallet to ${networkName}.`}
          </div>
        )}

        {error && (
          <div className="mt-3 font-share-tech text-[9px] text-red-300">
            {error}
          </div>
        )}

        {!areMemberWalletsUnique && (
          <div className="mt-3 font-share-tech text-[9px] text-red-300">
            {memberWalletIssues[0]}
          </div>
        )}
        
        <div className="mt-4 flex items-center gap-3 opacity-40">
           <Zap className="w-3 h-3 text-amber-500" />
           <p className="font-share-tech text-[8px] text-white uppercase tracking-widest">Direct Blockchain Interaction Enabled // HFG Protocol v4</p>
        </div>
      </div>

      {/* Decorative success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/5 pointer-events-none flex items-center justify-center"
          >
             <div className="w-32 h-32 border-2 border-red-500 rounded-full animate-ping opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminControl;
