/* 
  Hawkins SFX Service v3.5 (Aura Ghost Edition)
  - Softened Synth Fallback: Prioritizes Sine/Triangle waves for atmospheric feel
  - Ghostly Layer: Random low-frequency sweeps for periodic immersion
  - Robust AudioContext Bridge & Interaction Logic
  - Archive.org Stranger Things Theme
*/

class SoundManager {
  constructor() {
    this.initialized = false;
    this.ctx = null;
    this.masterGain = null;
    this.ghostTimer = null;
    this.sounds = {
      open:   "https://www.soundjay.com/buttons/button-20.mp3",
      close:  "https://www.soundjay.com/buttons/button-10.mp3",
      upload: "https://www.soundjay.com/buttons/beep-07.mp3",
      error:  "https://www.soundjay.com/buttons/beep-05.mp3",
      portal: "https://www.soundjay.com/communication/static-noise-01.mp3",
      ambient:"https://archive.org/download/stranger-things-theme-song/Stranger%20Things%20-%20Theme%20Song.mp3"
    };
    this.audioObjects = {};
  }

  init() {
    if (this.initialized) return;
    
    console.log("HNL_OS: INITIATING_SONIC_BRIDGE...");
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.45; // Normalized master volume
    }

    Object.keys(this.sounds).forEach(key => {
      const audio = new Audio(this.sounds[key]);
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";
      if (key === 'ambient') {
        audio.loop = true;
        audio.volume = 0.28;
      }
      this.audioObjects[key] = audio;
    });

    this.initialized = true;
  }

  // Fallback: Generate a smooth retro synth beep if Audio fails
  beep(freq = 440, duration = 0.2, type = 'sine', volume = 0.1) {
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type; // triangle/sine are much smoother
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Softer attack and exponential decay
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("HNL_OS: SYNTH_BEEP_FAILED", e);
    }
  }

  playGhost() {
    if (!this.ctx) return;
    // Eerie low-frequency sweep
    const freq = 30 + Math.random() * 90;
    const duration = 2.0 + Math.random() * 4.0;
    this.beep(freq, duration, 'triangle', 0.012);
  }

  play(key) {
    if (!this.initialized) this.init();
    const s = this.audioObjects[key];
    if (s) {
      s.currentTime = 0;
      s.play().catch(() => {
        // FALLBACK TO SOFT SYNTH BEEP
        const configs = {
          open:   [660, 0.2, 'sine', 0.08],     // Atmospheric chime
          close:  [330, 0.2, 'sine', 0.08],     // Deep analog thud
          upload: [880, 0.3, 'triangle', 0.04],  // Shimmering synth
          error:  [110, 0.5, 'triangle', 0.06],  // Low warning hum
          portal: [180, 1.2, 'sine', 0.04]      // Ethereal sweep
        };
        const conf = configs[key] || [440, 0.2, 'sine', 0.05];
        this.beep(...conf);
      });
    }
  }

  toggleAmbient(active) {
    if (!this.initialized) this.init();
    const s = this.audioObjects['ambient'];
    if (s) {
      if (active) {
        s.play().catch(e => {
            console.warn("HNL_OS: AMBIENT_BLOCKED_BY_POLICY", e);
        });
        
        // Start ghostly background whispers
        if (!this.ghostTimer) {
          const scheduleGhost = () => {
             const delay = 15000 + Math.random() * 35000;
             this.ghostTimer = setTimeout(() => {
                this.playGhost();
                scheduleGhost();
             }, delay);
          };
          scheduleGhost();
        }
      } else {
        s.pause();
        if (this.ghostTimer) {
           clearTimeout(this.ghostTimer);
           this.ghostTimer = null;
        }
      }
    }
  }

  async unlock() {
    console.log("HNL_OS: USER_INTERACTION_DETECTED -> UNLOCKING_FREQUENCIES");
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.play('open'); 
    this.toggleAmbient(true);
  }
}

export const sfx = new SoundManager();
