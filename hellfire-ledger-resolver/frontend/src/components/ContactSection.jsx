/**
 * ContactSection — "SEND A SIGNAL"
 * Data-ledger aesthetic: looks like filling out a classified HNL
 * transmission form / data-entry sheet.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ShieldAlert } from 'lucide-react';

const InputField = ({ label, id, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display:'grid', gridTemplateColumns:'32px 1fr', borderBottom:'1px solid rgba(255,32,32,0.12)', marginBottom:6 }}>
      <span style={{ fontFamily:'var(--vt)', fontSize:9, color:'rgba(255,32,32,0.38)', padding:'4px 6px', borderRight:'1px solid rgba(255,32,32,0.1)' }}>{id}</span>
      <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.25em', color:'rgba(179,255,179,0.4)', padding:'4px 8px', textTransform:'uppercase' }}>{label}</span>
    </div>
    {children}
  </div>
);

const ContactSection = () => {
  const [status, setStatus] = useState('idle');

  const handleTransmit = (e) => {
    e.preventDefault();
    setStatus('transmitting');
    setTimeout(() => setStatus('sent'), 3200);
  };

  return (
    <section id="contact" style={{ background:'#03030a', borderTop:'1px solid rgba(255,32,32,0.15)', position:'relative', overflow:'hidden' }}>

      {/* ticker */}
      <div className="ticker-strip" style={{ borderBottom:'1px solid rgba(255,32,32,0.08)', padding:'8px 0', background:'rgba(255,32,32,0.02)' }}>
        <div className="ticker-inner">
          {Array.from({ length: 6 }).map((_,i) => (
            <React.Fragment key={i}>
              <span className="ticker-item" style={{ color:'var(--red)' }}>◈ SEND_SIGNAL()</span>
              <span className="ticker-item" style={{ color:'var(--cyan)' }}>◈ OPEN_TRANSMISSION</span>
              <span className="ticker-item" style={{ color:'rgba(179,255,179,0.3)' }}>◈ HNL_UPLINK :: 1983</span>
              <span className="ticker-item" style={{ color:'rgba(255,200,0,0.6)' }}>◈ ENCRYPT :: RSA-2048</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'80px 5vw' }}>

        {/* Spreadsheet section header */}
        <div style={{ display:'grid', gridTemplateColumns:'60px 1fr 180px 120px', border:'1px solid rgba(255,32,32,0.2)', marginBottom:48, background:'rgba(3,3,10,0.75)', backdropFilter:'blur(4px)' }}>
          <div style={{ padding:'12px', borderRight:'1px solid rgba(255,32,32,0.12)', fontFamily:'var(--vt)', fontSize:12, color:'rgba(255,32,32,0.4)' }}>06</div>
          <div style={{ padding:'10px 16px', borderRight:'1px solid rgba(255,32,32,0.12)' }}>
            <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.35em', color:'rgba(179,255,179,0.3)', textTransform:'uppercase', marginBottom:4 }}>SECTION // TRANSMIT</div>
            <h2 style={{ fontFamily:'var(--orb)', fontWeight:900, fontSize:'clamp(2.2rem,5vw,5rem)', textTransform:'uppercase', lineHeight:0.88, margin:0 }}>
              <span style={{ color:'#fff' }}>SEND A </span>
              <span style={{ color:'var(--red)', textShadow:'0 0 24px rgba(255,32,32,0.5)' }}>SIGNAL</span>
            </h2>
          </div>
          <div style={{ padding:'12px', borderRight:'1px solid rgba(255,32,32,0.12)', fontFamily:'var(--vt)', fontSize:11, color:'var(--phosphor-d)', letterSpacing:'.05em', opacity:0.5 }}>UPLINK.dat</div>
          <div style={{ padding:'12px', display:'flex', alignItems:'center', gap:6 }}>
            <motion.span animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.4, repeat:Infinity }}
              style={{ width:6, height:6, borderRadius:'50%', background:'var(--red)', display:'block', boxShadow:'0 0 6px var(--red)' }} />
            <span style={{ fontFamily:'var(--share)', fontSize:8, color:'var(--red)', letterSpacing:'.18em' }}>OPEN</span>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>

          {/* LEFT — info */}
          <div>
            <p style={{ fontFamily:'var(--share)', fontSize:10, color:'rgba(179,255,179,0.38)', letterSpacing:'.16em', lineHeight:2, textTransform:'uppercase', marginBottom:32 }}>
              Establish a secure uplink to the Hawkins National Lab mainframe.
              All transmissions encrypted via military-grade RSA-2048.
              Kline evasion status: ACTIVE.
            </p>

            {/* System status mini-table */}
            <div style={{ border:'1px solid rgba(255,32,32,0.15)', background:'rgba(3,3,10,0.7)' }}>
              <div style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.3)', textTransform:'uppercase', padding:'6px 12px', borderBottom:'1px solid rgba(255,32,32,0.1)' }}>
                UPLINK STATUS TABLE
              </div>
              {[
                ['U1','Encryption','RSA-2048 AES'],
                ['U2','Stealth','KLINE_EVASION: ON'],
                ['U3','Channel','HNL_SECURE_CH4'],
                ['U4','Auth','OPERATOR_CLEARANCE'],
              ].map(([id, label, val]) => (
                <div key={id} style={{ display:'grid', gridTemplateColumns:'32px 1fr 1fr', borderBottom:'1px solid rgba(255,32,32,0.06)' }}>
                  <span style={{ fontFamily:'var(--vt)', fontSize:9, color:'rgba(255,32,32,0.35)', padding:'5px 8px', borderRight:'1px solid rgba(255,32,32,0.08)' }}>{id}</span>
                  <span style={{ fontFamily:'var(--share)', fontSize:8, letterSpacing:'.18em', color:'rgba(179,255,179,0.38)', padding:'5px 8px', borderRight:'1px solid rgba(255,32,32,0.08)', textTransform:'uppercase' }}>{label}</span>
                  <span style={{ fontFamily:'var(--vt)', fontSize:11, color:'var(--phosphor)', padding:'5px 8px' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form panel */}
          <div style={{ border:'1px solid rgba(255,32,32,0.18)', background:'rgba(5,5,12,0.9)', position:'relative', backdropFilter:'blur(4px)' }}>
            {/* panel header row */}
            <div style={{ display:'grid', gridTemplateColumns:'32px 1fr', background:'rgba(255,32,32,0.06)', borderBottom:'1px solid rgba(255,32,32,0.2)' }}>
              <div style={{ borderRight:'1px solid rgba(255,32,32,0.15)', padding:'8px', fontFamily:'var(--vt)', fontSize:9, color:'rgba(255,32,32,0.4)', textAlign:'center' }}>TX</div>
              <div style={{ padding:'8px 12px', fontFamily:'var(--share)', fontSize:8, letterSpacing:'.3em', color:'rgba(179,255,179,0.3)', textTransform:'uppercase' }}>TRANSMISSION_RECORD.dat</div>
            </div>

            <div style={{ padding:28 }}>
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.form key="idle" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onSubmit={handleTransmit}>
                    <InputField id="F1" label="Identifier / Agent Name">
                      <input type="text" placeholder="AGENT_NAME" required
                        style={{ width:'100%', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(179,255,179,0.15)', padding:'10px 12px', fontFamily:'var(--vt)', fontSize:15, color:'var(--phosphor)', outline:'none', boxSizing:'border-box' }} />
                    </InputField>
                    <InputField id="F2" label="Signal Body / Message">
                      <textarea rows="4" placeholder="TRANSMIT_DATA..." required
                        style={{ width:'100%', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(179,255,179,0.15)', padding:'10px 12px', fontFamily:'var(--vt)', fontSize:15, color:'var(--phosphor)', outline:'none', resize:'none', boxSizing:'border-box' }} />
                    </InputField>

                    {/* submit row styled like a spreadsheet action row */}
                    <div style={{ borderTop:'1px solid rgba(255,32,32,0.15)', paddingTop:16, display:'grid', gridTemplateColumns:'32px 1fr' }}>
                      <div style={{ borderRight:'1px solid rgba(255,32,32,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Send size={12} color="rgba(255,32,32,0.6)" />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ background:'rgba(255,32,32,0.1)', boxShadow:'0 0 20px rgba(255,32,32,0.3)' }}
                        whileTap={{ scale:0.98 }}
                        style={{ padding:'12px 20px', background:'transparent', border:'none', borderLeft:'none', color:'var(--red)', fontFamily:'var(--orb)', fontSize:12, fontWeight:900, letterSpacing:'.2em', cursor:'pointer', textAlign:'left', transition:'background .2s' }}
                      >
                        ◈ OPEN TRANSMISSION
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {status === 'transmitting' && (
                  <motion.div key="tx" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ padding:'40px 0', textAlign:'center' }}>
                    <div style={{ width:'100%', height:2, background:'rgba(179,255,179,0.08)', position:'relative', overflow:'hidden', marginBottom:20 }}>
                      <motion.div animate={{ x:['-40%','140%'] }} transition={{ duration:1.8, repeat:Infinity, ease:'linear' }}
                        style={{ position:'absolute', top:0, bottom:0, width:'40%', background:'linear-gradient(to right, transparent, var(--red), transparent)' }} />
                    </div>
                    <div style={{ fontFamily:'var(--vt)', fontSize:13, color:'var(--red)', letterSpacing:'.2em' }}>TRANSMITTING SIGNAL...</div>
                    <div style={{ fontFamily:'var(--share)', fontSize:8, color:'rgba(179,255,179,0.3)', marginTop:10, letterSpacing:'.2em' }}>ENCRYPTING PACKETS 0x8A2B → HNL_CH4...</div>
                  </motion.div>
                )}

                {status === 'sent' && (
                  <motion.div key="sent" initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} style={{ padding:'36px 0', textAlign:'center' }}>
                    <ShieldAlert size={44} color="var(--phosphor)" style={{ margin:'0 auto 16px', filter:'drop-shadow(0 0 10px var(--phosphor))' }} />
                    <div style={{ fontFamily:'var(--orb)', fontSize:16, fontWeight:900, color:'var(--phosphor)', letterSpacing:'.18em' }}>SIGNAL CONFIRMED</div>
                    <div style={{ fontFamily:'var(--vt)', fontSize:11, color:'rgba(179,255,179,0.4)', marginTop:8, letterSpacing:'.1em' }}>TX_ID: DEWEY_11-06-83 // SEALED</div>
                    <button onClick={() => setStatus('idle')}
                      style={{ marginTop:28, background:'transparent', border:'none', color:'rgba(179,255,179,0.3)', fontFamily:'var(--share)', fontSize:8, letterSpacing:'.2em', cursor:'pointer', textDecoration:'underline' }}>
                      RESET UPLINK
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:'1px solid rgba(179,255,179,0.04)', display:'grid', gridTemplateColumns:'60px 1fr 200px', background:'rgba(3,3,10,0.8)' }}>
        <div style={{ borderRight:'1px solid rgba(255,32,32,0.08)', padding:'14px', fontFamily:'var(--vt)', fontSize:10, color:'rgba(255,32,32,0.3)' }}>END</div>
        <div style={{ padding:'14px', fontFamily:'var(--share)', fontSize:7, color:'rgba(179,255,179,0.18)', letterSpacing:'.2em', textTransform:'uppercase' }}>
          © 1983 HAWKINS NATIONAL LABORATORY — BUREAU OF UNEXPLAINED PHENOMENA — CLEARANCE OMEGA // v3.4.1
        </div>
        <div style={{ borderLeft:'1px solid rgba(255,32,32,0.08)', padding:'14px', fontFamily:'var(--share)', fontSize:7, color:'var(--red)', opacity:0.35, letterSpacing:'.2em', textAlign:'right' }}>
          CLEARANCE OMEGA
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
