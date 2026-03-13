import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Send, Zap, ChevronDown, User, Filter } from 'lucide-react';

const SettlementList = ({ settlements = [], stats = null }) => {
  const [signingIds, setSigningIds] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [filter, setFilter] = useState('all'); // all, mine, settled, remaining
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const signDirective = (id) => {
    setSigningIds(prev => [...prev, id]);
    setTimeout(() => {
      setSigningIds(prev => prev.filter(sid => sid !== id));
      setConfirmedIds(prev => [...prev, id]);
    }, 2500);
  };

  const filteredSettlements = settlements.filter((item, idx) => {
    const itemId = `DIRECTIVE-${idx}`;
    const isConfirmed = confirmedIds.includes(itemId);
    
    if (filter === 'settled') return isConfirmed;
    if (filter === 'remaining') return !isConfirmed;
    if (filter === 'mine') {
       if (!userName) return true;
       return item.from.toLowerCase().includes(userName.toLowerCase()) || 
              item.to.toLowerCase().includes(userName.toLowerCase());
    }
    return true;
  });

  const filterLabels = {
    all: isMobile ? 'All' : 'Show All Settlements',
    mine: isMobile ? 'Mine' : 'Show My Settlements',
    settled: isMobile ? 'Settled' : 'Settled Data Only',
    remaining: isMobile ? 'Remaining' : 'Remaining Data'
  };

  return (
    <div className={`flex flex-col gap-4 h-full overflow-hidden ${isMobile ? 'pr-1' : 'pr-3'} pb-8`}>
      {/* Search & Filter Header */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 z-30`}>
        <div className="relative flex-1 group">
           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-phosphor/40" />
           <input 
              type="text"
              placeholder={isMobile ? "SEARCH NAME" : "WHO ARE YOU? (NAME SEARCH)"}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-black/40 border border-phosphor/20 py-2 pl-8 pr-4 text-[10px] font-share-tech text-phosphor focus:border-phosphor outline-none transition-all placeholder:text-phosphor/20 uppercase tracking-widest"
           />
        </div>

        <div className="relative">
           <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`px-4 py-2 bg-black/40 border border-phosphor/20 text-phosphor font-share-tech text-[10px] tracking-widest flex items-center gap-2 hover:border-phosphor transition-all ${isMobile ? 'w-full' : 'min-w-[160px]'} justify-between`}
           >
              <div className="flex items-center gap-2">
                 <Filter className="w-3 h-3" />
                 {filterLabels[filter]}
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
           </button>

           <AnimatePresence>
              {isDropdownOpen && (
                 <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-1 w-full bg-bg-dark border border-phosphor/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                 >
                    {Object.entries(filterLabels).map(([key, label]) => (
                       <button
                          key={key}
                          onClick={() => {
                             setFilter(key);
                             setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 font-share-tech text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 ${
                             filter === key ? 'bg-phosphor text-bg-dark' : 'text-phosphor/60 hover:text-phosphor hover:bg-phosphor/10'
                          }`}
                       >
                          <div className={`w-1.5 h-1.5 rounded-full ${filter === key ? 'bg-bg-dark' : 'bg-phosphor/20'}`} />
                          {label}
                       </button>
                    ))}
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-4">
        {stats && filter === 'all' && (
          <div className="mb-2 p-4 border border-phosphor/20 bg-phosphor/5 shrink-0">
             <div className="flex justify-between items-center text-[10px] font-share-tech">
                <div>
                   <p className="text-phosphor/60">{isMobile ? 'STATUS' : 'SYSTEM STATUS'}: <span className="text-neon-cyan brightness-150">OPTIMIZED</span></p>
                   <p className="text-phosphor/40 mt-1">SAVED: <span className="text-white">{stats.savings_pct}</span></p>
                </div>
                <div className="text-right">
                   <p className="text-white uppercase tracking-tighter">{stats.raw_transactions} RAW → {stats.optimized_settlements} SET</p>
                   {!isMobile && <p className="text-phosphor/30 text-[8px] mt-1">HNL PROTOCOL LAYER 4</p>}
                </div>
             </div>
          </div>
        )}

        {filteredSettlements.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 italic font-share-tech text-[10px] tracking-widest text-phosphor py-20">
             <div className="w-8 h-8 border border-dashed border-phosphor/50 mb-4 animate-spin" />
             {settlements.length === 0 ? 'WAITING FOR SOURCE UPLINK...' : 'NO DIRECTIVES MATCHING CRITERIA'}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredSettlements.map((item, localIdx) => {
            const globalIdx = settlements.indexOf(item);
            const itemId = `DIRECTIVE-${globalIdx}`;
            const isSigning = signingIds.includes(itemId);
            const isConfirmed = confirmedIds.includes(itemId);
            const currentStatus = isConfirmed ? 'CONFIRMED' : (isSigning ? 'SIGNING' : 'PENDING');

            return (
              <motion.div
                key={itemId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="terminal-panel border-phosphor-dim/30 hover:border-phosphor/100 transition-all duration-300 group relative mb-2"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-phosphor animate-flicker" />
                    <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-phosphor/80 uppercase">{isMobile ? '#' : 'DIRECTIVE # '}{globalIdx+1}</span>
                  </div>
                  <span className={`text-[8px] font-bold font-share-tech tracking-widest px-2 py-0.5 border ${
                    currentStatus === 'CONFIRMED' ? 'border-phosphor text-phosphor bg-phosphor/10' : 
                    currentStatus === 'SIGNING' ? 'border-neon-cyan text-neon-cyan animate-pulse' : 
                    'border-phosphor-dim text-phosphor-dim'
                  } uppercase`}>
                    {currentStatus}
                  </span>
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between p-3 bg-bg-dark/50 border-y border-phosphor-dim/10 mb-4 group-hover:bg-bg-dark/80 transition-colors`}>
                  <div className={`${isMobile ? 'w-full mb-2' : 'w-1/3 text-center'}`}>
                    <p className="text-[8px] text-phosphor-dim uppercase font-share-tech mb-1">{isMobile ? 'DEBTOR:' : 'DEBTOR'}</p>
                    <p className={`text-[10px] font-orbitron text-white truncate px-1 uppercase ${isMobile ? '' : 'text-center'}`}>{item.from}</p>
                  </div>

                  <div className={`flex flex-col items-center flex-1 ${isMobile ? 'my-3 w-full' : ''}`}>
                    <div className="text-lg font-orbitron font-bold text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.4)]">
                       {Number(item.amount).toFixed(2)} <span className="text-[10px] font-light">HFG</span>
                    </div>
                    <div className="w-full flex items-center gap-1 mt-1 px-4">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan/50" />
                      <Zap className="w-3 h-3 text-neon-cyan" />
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan/50" />
                    </div>
                  </div>

                  <div className={`${isMobile ? 'w-full' : 'w-1/3 text-center'}`}>
                    <p className="text-[8px] text-phosphor-dim uppercase font-share-tech mb-1">{isMobile ? 'CREDITOR:' : 'CREDITOR'}</p>
                    <p className={`text-[10px] font-orbitron text-white truncate px-1 uppercase ${isMobile ? '' : 'text-center'}`}>{item.to}</p>
                  </div>
                </div>

                <div className="flex gap-2 relative z-10">
                  {currentStatus === 'PENDING' ? (
                    <button 
                      onClick={() => signDirective(itemId)}
                      className="flex-1 py-3 bg-bg-dark border border-phosphor text-phosphor font-orbitron text-[9px] tracking-widest hover:bg-phosphor hover:text-bg-dark transition-all flex items-center justify-center gap-2 group/btn uppercase"
                    >
                      <Send className="w-2.5 h-2.5 group-hover/btn:translate-x-1 transition-transform" />
                      EXECUTE
                    </button>
                  ) : currentStatus === 'CONFIRMED' ? (
                    <div className="flex-1 border border-phosphor/30 bg-phosphor/5 py-3 text-[9px] text-phosphor font-orbitron flex items-center justify-center gap-2 uppercase tracking-widest">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      SETTLED
                    </div>
                  ) : (
                    <div className="flex-1 border border-neon-cyan py-3 text-[9px] text-neon-cyan font-orbitron flex items-center justify-center gap-3 uppercase tracking-widest">
                       <div className="w-3 h-3 border-2 border-neon-cyan border-t-transparent animate-spin" />
                       ENCRYPTING...
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettlementList;
