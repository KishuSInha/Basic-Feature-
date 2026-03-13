import React from 'react';
import { motion } from 'framer-motion';

const AdvancedInteractiveGraph = ({ externalData = null }) => {
  if (!externalData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full w-full opacity-30 italic font-share-tech text-[10px] tracking-widest text-phosphor bg-[#03030a]">
         <div className="w-8 h-8 border border-dashed border-phosphor/50 mb-4 animate-spin" />
         AWAITING LEDGER UPLINK...
      </div>
    );
  }

  const { node_count, total_volume, settled_volume, top_debtors, top_creditors } = externalData.visuals || {};
  const savings = total_volume - settled_volume;
  const savingsPct = total_volume > 0 ? (savings / total_volume * 100) : 0;

  return (
    <div className="h-full w-full p-6 flex flex-col gap-6 bg-[#03030a] custom-scrollbar overflow-y-auto relative">
      <div className="signal-noise opacity-10 pointer-events-none absolute inset-0" />
      
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4 z-10">
        <StatBox title="NETWORK NODES" value={node_count || 0} unit="ENTITIES" color="var(--phosphor)" />
        <StatBox title="ORIGINAL VOLUME" value={(total_volume || 0).toFixed(2)} unit="HFG" color="var(--phosphor)" />
        <StatBox title="OPTIMIZED VOLUME" value={(settled_volume || 0).toFixed(2)} unit="HFG" color="var(--cyan)" />
        <StatBox title="NETWORK SAVINGS" value={savingsPct.toFixed(1)} unit="%" color="var(--red)" highlight />
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1 z-10 mt-4">
        {/* Debtors */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-red-500/30 pb-2">
            <h3 className="font-orbitron font-bold text-red-500 tracking-widest text-xs">TOP DEBTORS</h3>
            <span className="text-[8px] font-share-tech text-red-500/50 uppercase">Liabilities</span>
          </div>
          <div className="flex flex-col gap-4">
            {top_debtors?.map((d, i) => (
              <BarItem key={i} name={d.name} amount={d.amount} max={top_debtors[0]?.amount} color="var(--red)" />
            ))}
            {(!top_debtors || top_debtors.length === 0) && <div className="text-red-500/50 font-share-tech text-xs italic">NO DEBTORS DETECTED</div>}
          </div>
        </div>

        {/* Creditors */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-phosphor/30 pb-2">
            <h3 className="font-orbitron font-bold text-phosphor tracking-widest text-xs">TOP CREDITORS</h3>
            <span className="text-[8px] font-share-tech text-phosphor/50 uppercase">Assets</span>
          </div>
          <div className="flex flex-col gap-4">
            {top_creditors?.map((c, i) => (
              <BarItem key={i} name={c.name} amount={c.amount} max={top_creditors[0]?.amount} color="var(--phosphor)" />
            ))}
            {(!top_creditors || top_creditors.length === 0) && <div className="text-phosphor/50 font-share-tech text-xs italic">NO CREDITORS DETECTED</div>}
          </div>
        </div>
      </div>
      
      {/* Resolution Vis */}
      <div className="mt-6 border border-phosphor/20 bg-phosphor/5 p-4 z-10 shrink-0">
         <div className="flex justify-between items-center">
            <div className="font-share-tech text-phosphor text-[10px] tracking-widest uppercase">
              Conflict Resolution Engine
            </div>
            <div className="font-orbitron text-neon-cyan font-bold text-[10px] animate-pulse">
              SYSTEM OPTIMIZED
            </div>
         </div>
         <div className="w-full h-1 bg-black mt-3 overflow-hidden rounded-full">
            <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: '0%' }}
               transition={{ duration: 1.5, ease: 'easeOut' }}
               className="h-full bg-neon-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
            />
         </div>
      </div>
    </div>
  );
};

const StatBox = ({ title, value, unit, color, highlight }) => (
  <div className={`border ${highlight ? 'border-red-500 shadow-[0_0_10px_rgba(255,32,32,0.15)] bg-red-950/20' : 'border-phosphor/20 bg-black/40'} p-3 flex flex-col justify-center rounded-sm`}>
    <div className="font-share-tech text-[8px] text-gray-400 tracking-widest uppercase mb-2">{title}</div>
    <div className="font-orbitron font-bold text-lg drop-shadow-md" style={{ color }}>{value} <span className="text-[9px] font-light opacity-60 ml-1">{unit}</span></div>
  </div>
);

const BarItem = ({ name, amount, max, color }) => {
  const pct = max > 0 ? (amount / max) * 100 : 0;
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex justify-between font-share-tech text-[10px] uppercase tracking-wider relative z-10">
        <span className="text-white truncate pr-4 font-bold">{name}</span>
        <span style={{ color }} className="font-orbitron font-bold">{amount.toFixed(2)} HFG</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 overflow-hidden rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, type: 'spring', bounce: 0.2 }}
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    </div>
  );
};

export default AdvancedInteractiveGraph;
