import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, ShieldAlert, ArrowRightCircle, CheckCircle } from 'lucide-react';

const TokenSend = ({ addLog }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = () => {
    if (!recipient || amount <= 0) return;
    setSending(true);
    if (addLog) addLog(`INITIATING TOKEN TRANSFER: ${amount} HFG -> ${recipient}`, 'system');
    
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      if (addLog) addLog(`TRANSFER COMPLETE. TRANSACTION HASH: 0x${Math.random().toString(16).slice(2)}`, 'success');
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div style={{ height: '100%', padding: 24, background: '#03030a', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4">
        <Send className="text-cyan-500 w-6 h-6" />
        <h3 className="font-orbitron font-bold text-sm text-cyan-500 uppercase tracking-widest">Token Transfer Gateway</h3>
      </div>

      <div className="flex flex-col gap-6">
        {/* Recipient Input */}
        <div className="flex flex-col gap-2">
          <label className="font-share-tech text-[10px] text-zinc-500 uppercase tracking-widest">Recipient Identity / Address</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input 
              type="text"
              placeholder="0x... or Agent ID"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 pl-12 font-share-tech text-cyan-400 text-sm outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <label className="font-share-tech text-[10px] text-zinc-500 uppercase tracking-widest">Transfer Volume (HFG)</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-black border border-zinc-800 p-4 font-orbitron text-cyan-500 text-lg outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleSend}
          disabled={sending || !recipient || amount <= 0}
          style={{ 
            width: '100%', padding: '20px', 
            background: 'linear-gradient(to right, #003366, #00f3ff)', 
            color: '#fff', border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'all 0.3s' 
          }}
          className="hover:brightness-125 disabled:grayscale flex items-center justify-center gap-3"
        >
          {sending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
          ) : success ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <ArrowRightCircle className="w-5 h-5" />
          )}
          <span className="font-orbitron font-bold text-xs uppercase tracking-[0.2em]">
            {sending ? 'Executing Transfer...' : success ? 'Transfer Confirmed' : 'Authorize Send'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cyan-500/5 pointer-events-none flex items-center justify-center"
          >
             <div className="w-32 h-32 border-2 border-cyan-500 rounded-full animate-ping opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenSend;
