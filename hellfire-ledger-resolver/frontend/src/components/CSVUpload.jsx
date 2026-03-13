import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Database, HardDrive, FileText } from 'lucide-react';

/* 
  CSVUpload — Performance & Lab Theme
  - Replaced Framer Motion with simple CSS transitions
  - Aligned visuals with "Data Science Laboratory" directive
*/

const CSVUpload = () => {
  const [status, setStatus] = useState('idle'); // idle, uploading, complete

  const onDrop = useCallback(acceptedFiles => {
    setStatus('uploading');
    // Simulated upload
    setTimeout(() => setStatus('complete'), 2500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes rotating { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes progress { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
        .upload-zone { border: 1px dashed rgba(179,255,179,0.15); transition: all 0.2s; }
        .upload-zone:hover { border-color: var(--phosphor); background: rgba(179,255,179,0.03); }
        .upload-active { border-color: var(--cyan) !important; background: rgba(0,245,255,0.05) !important; }
      `}</style>
      
      <div 
        {...getRootProps()} 
        className={`upload-zone flex-1 m-4 flex flex-col items-center justify-center cursor-none gap-6 ${isDragActive ? 'upload-active' : ''}`}
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
          <div className="flex flex-col items-center">
            <HardDrive size={40} style={{ color: 'var(--cyan)', animation: 'rotating 2s linear infinite' }} />
            <p style={{ fontFamily: 'var(--orb)', fontSize: 11, fontWeight:900, color: 'var(--cyan)', letterSpacing: '.4em', marginTop: 20 }}>READING SECTORS...</p>
            <div style={{ width: 140, height: 2, background: 'rgba(0,0,0,0.5)', marginTop: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--cyan)', width: '100%', animation: 'progress 2.5s linear forwards' }} />
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="text-center">
            <FileText size={48} style={{ margin: '0 auto', color: 'var(--phosphor)', filter: 'drop-shadow(0 0 10px var(--phosphor))' }} />
              <h4 style={{ fontFamily: 'var(--orb)', fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '.2em', marginTop: 16 }}>LEDGER PROTOCOL LOADED</h4>
              <div style={{ fontFamily: 'var(--share)', fontSize: 7, color: 'rgba(179,255,179,0.4)', letterSpacing: '.15em', marginTop: 8 }}>32 TRANSACTIONS FOR DEMODOG SUPPLIES FOUND</div>
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
      </div>
    </div>
  );
};

export default CSVUpload;
