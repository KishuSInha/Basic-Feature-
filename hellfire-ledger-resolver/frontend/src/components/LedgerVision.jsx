import React from 'react';
import { motion } from 'framer-motion';
import { Database, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const LedgerVision = ({ ledger = [] }) => {
  if (ledger.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full w-full opacity-30 italic font-share-tech text-[10px] tracking-widest text-phosphor bg-[#03030a]">
         <div className="w-8 h-8 border border-dashed border-phosphor/50 mb-4 animate-spin" />
         SCANNING MAGNETIC TAPE...
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-[#03030a] overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4 border-b border-phosphor/20 pb-2 shrink-0">
         <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-phosphor" />
            <h3 className="font-orbitron text-[10px] font-bold text-phosphor tracking-widest uppercase">Cleaned Ledger Data</h3>
         </div>
         <div className="flex items-center gap-4 font-share-tech text-[8px] text-phosphor/40 tracking-[0.2em] uppercase">
            <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Schema Verified</div>
            <div className="flex items-center gap-1"><Cpu className="w-3 h-3" /> AI Cleaned</div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#03030a] z-10 border-b border-phosphor/10">
            <tr className="font-share-tech text-[9px] text-phosphor/60 tracking-widest uppercase">
              <th className="py-2 pr-4 font-normal">#</th>
              <th className="py-2 pr-4 font-normal">Source Entity</th>
              <th className="py-2 pr-4 font-normal text-center">Transfer</th>
              <th className="py-2 pr-4 font-normal">Target Entity</th>
              <th className="py-2 text-right font-normal">Volume</th>
            </tr>
          </thead>
          <tbody className="font-share-tech text-[10px]">
            {ledger.map((row, idx) => (
              <motion.tr 
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.02, 1) }}
                className="border-b border-phosphor/5 hover:bg-phosphor/5 transition-colors group"
              >
                <td className="py-2 pr-4 text-phosphor/30 font-orbitron text-[8px]">{idx + 1}</td>
                <td className="py-2 pr-4 text-white uppercase font-bold group-hover:text-phosphor transition-colors">{row.from}</td>
                <td className="py-2 pr-4 text-center">
                   <ArrowRight className="w-3 h-3 text-neon-cyan inline-block opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </td>
                <td className="py-2 pr-4 text-white uppercase font-bold group-hover:text-phosphor transition-colors">{row.to}</td>
                <td className="py-2 text-right font-orbitron text-neon-cyan font-bold">{row.amount.toFixed(2)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 border border-dashed border-phosphor/10 bg-phosphor/5 rounded-sm shrink-0">
         <p className="font-share-tech text-[8px] text-phosphor/40 tracking-widest uppercase leading-loose">
            Note: This is the raw analytical feed after smart cleaning. 
            The Settlement Queue will use this data to generate its optimized directives.
         </p>
      </div>
    </div>
  );
};

export default LedgerVision;
