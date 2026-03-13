import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Database, HardDrive, FileText, XCircle } from 'lucide-react';
import { resolveLedger } from '../services/api';

/* 
  CSVUpload — Enhanced UI/UX
  - Real-time 0-100% simulated progress
  - Mission Control Terminal integration
  - Cancellation capability
*/

const CSVUpload = ({ onUploadSuccess, addLog }) => {
  const [status, setStatus] = useState('idle'); // idle, uploading, complete, error
  const [errorMsg, setErrorMsg] = useState('');
  const [lastStats, setLastStats] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  
  const abortControllerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const resetUpload = () => {
    setStatus('idle');
    setProgress(0);
    setCurrentStep('');
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const simulateProgress = (start, end, duration, stepName) => {
    return new Promise((resolve) => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setCurrentStep(stepName);
      if (addLog) addLog(stepName, 'info');
      
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(1, elapsed / duration);
        const currentProgress = start + p * (end - start);
        setProgress(Math.floor(currentProgress));
        
        if (p >= 1) {
          clearInterval(progressIntervalRef.current);
          resolve();
        }
      }, 50);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    
    setStatus('uploading');
    setErrorMsg('');
    setProgress(0);
    abortControllerRef.current = new AbortController();

    try {
        if (addLog) addLog(`INITIALIZING UPLINK FOR: ${acceptedFiles[0].name.toUpperCase()}`, 'system');
        
        // Step 1: Simulated Upload
        await simulateProgress(0, 30, 1500, "UPLOADING DATA TAPE...");
        
        // Step 2: Real API Call (plus simulated analysis progress)
        simulateProgress(30, 70, 4000, "ANALYZING SCHEMA & PATTERNS...");
        
        const result = await resolveLedger(acceptedFiles[0]);
        
        if (abortControllerRef.current?.signal.aborted) return;

        // Step 3: Cleaning
        await simulateProgress(70, 95, 2000, "CLEANING DATA & RESOLVING CONFLICTS...");
        
        // Step 4: Finalizing
        await simulateProgress(95, 100, 800, "FINALIZING LEDGER PROTOCOL...");

        setLastStats(result.stats);
        setStatus('complete');
        if (addLog) addLog("LEDGER PROTOCOL FULLY LOADED.", "success");
        if (onUploadSuccess) onUploadSuccess(result);

    } catch (err) {
        if (err.name === 'AbortError') return;
        setStatus('error');
        setErrorMsg(err.message);
        if (addLog) addLog(`UPLINK FAILED: ${err.message.toUpperCase()}`, "warning");
    } finally {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
  }, [onUploadSuccess, addLog]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    disabled: status === 'uploading'
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes rotating { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .upload-zone { border: 1px dashed rgba(179,255,179,0.15); transition: all 0.2s; }
        .upload-zone:not(.disabled):hover { border-color: var(--phosphor); background: rgba(179,255,179,0.03); }
        .upload-active { border-color: var(--cyan) !important; background: rgba(0,245,255,0.05) !important; }
      `}</style>
      
      <div 
        {...getRootProps()} 
        className={`upload-zone flex-1 m-4 flex flex-col items-center justify-center gap-6 ${isDragActive ? 'upload-active' : ''} ${status === 'uploading' ? 'disabled cursor-wait' : 'cursor-none'}`}
      >
        <input {...getInputProps()} />

        {status === 'idle' && (
          <div className="text-center">
             <div style={{ marginBottom: 20, position:'relative' }}>
                <Database size={48} style={{ margin: '0 auto', color: isDragActive ? 'var(--cyan)' : 'rgba(179,255,179,0.4)' }} />
             </div>
             <h4 style={{ fontFamily: 'var(--orb)', fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '.3em', marginBottom: 8 }}>
               {isDragActive ? "INSERT TAPE" : "LOAD DATA TAPE"}
             </h4>
             <p style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.35)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
               Connect Magnetic Ledger Drive or Drop CSV File
             </p>
          </div>
        )}

        {status === 'uploading' && (
          <div className="flex flex-col items-center w-full px-12">
            <HardDrive size={40} style={{ color: 'var(--cyan)', animation: 'rotating 2s linear infinite' }} />
            <p style={{ fontFamily: 'var(--orb)', fontSize: 11, fontWeight:900, color: 'var(--cyan)', letterSpacing: '.4em', marginTop: 24, textTransform: 'uppercase' }}>
              {currentStep}
            </p>
            
            <div className="w-full max-w-md mt-6">
              <div className="flex justify-between items-end mb-2">
                 <span className="font-share-tech text-[8px] text-cyan-400 opacity-50 tracking-widest uppercase">Encryption: AES-256</span>
                 <span className="font-orbitron text-xs text-cyan-400 font-bold">{progress}%</span>
              </div>
              <div style={{ width: '100%', height: 4, background: 'rgba(0,0,0,0.5)', overflow: 'hidden', border: '1px solid rgba(0,245,255,0.1)' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), #fff)', width: `${progress}%`, transition: 'width 0.1s linear', boxShadow: '0 0 10px var(--cyan)' }} />
              </div>
            </div>

            <button 
               onClick={(e) => { e.stopPropagation(); resetUpload(); }}
               className="mt-12 flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-500 font-share-tech text-[10px] tracking-widest hover:bg-red-500/10 transition-all cursor-none"
            >
               <XCircle size={12} />
               ABORT UPLINK
            </button>
          </div>
        )}

        {status === 'complete' && (
          <div className="text-center">
            <FileText size={48} style={{ margin: '0 auto', color: 'var(--phosphor)', filter: 'drop-shadow(0 0 10px var(--phosphor))' }} />
              <h4 style={{ fontFamily: 'var(--orb)', fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '.2em', marginTop: 16 }}>LEDGER PROTOCOL LOADED</h4>
              <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.4)', letterSpacing: '.15em', marginTop: 8, textTransform: 'uppercase' }}>
                {lastStats?.raw_transactions} Transactions Found // {lastStats?.optimized_settlements} Optimized Settlements
              </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setStatus('idle'); }}
              style={{ marginTop: 20, padding: '6px 16px', background: 'transparent', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--share)', fontSize: 8, letterSpacing: '.2em', cursor: 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,32,32,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              EJECT DRIVE
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center px-4">
            <div style={{ color: 'var(--red)', fontSize: 24, marginBottom: 16 }}>⚠</div>
             <h4 style={{ fontFamily: 'var(--orb)', fontSize: 11, fontWeight: 900, color: 'var(--red)', letterSpacing: '.2em' }}>UPLINK ERROR</h4>
             <p style={{ fontFamily: 'var(--share)', fontSize: 8, color: 'rgba(255,32,32,0.6)', marginTop: 8 }}>{errorMsg}</p>
             <button 
              onClick={(e) => { e.stopPropagation(); setStatus('idle'); }}
              style={{ marginTop: 20, padding: '6px 16px', background: 'var(--red)', border: 'none', color: '#fff', fontFamily: 'var(--share)', fontSize: 8, letterSpacing: '.2em', cursor: 'none' }}
            >
              RETRY UPLINK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVUpload;
