/**
 * liquidMask.js – High-performance fluid hover-reveal engine.
 * Uses a single RAF loop with direct SVG attribute writes (no layout/paint).
 * Tuned for smooth organic feel — lerp 0.14 = responsive but not snappy.
 */
export class LiquidMaskEngine {
  constructor({ radius = 130, delay = 0.15 } = {}) {
    this.radius = radius;
    // lerp factor — 0.25 is more responsive while maintaining smoothness
    this.lerpFactor = 0.25;

    this.mouse = { x: 0, y: 0 };
    this.cur   = { x: -9999, y: -9999 };
    this.active = false;
    this.rafId  = null;
    this.t = 0;
    this.phaseOff = Math.random() * Math.PI * 2;
    this.maskCircle = null;
    this.turb = null;
    this.disp = null;
    // Track velocity for edge deformation — avoids expensive sine calls every frame
    this.velX = 0;
    this.velY = 0;
  }

  start(maskCircleEl, filterEl) {
    this.maskCircle = maskCircleEl;
    if (maskCircleEl) {
      this.edgeCircle = maskCircleEl.parentNode.querySelector('.liquid-edge');
    }
    if (filterEl) {
      this.turb = filterEl.querySelector('feTurbulence');
      this.disp = filterEl.querySelector('feDisplacementMap');
    }
    this._raf();
  }

  stop() {
    if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
  }

  setMouse(x, y) { this.mouse.x = x; this.mouse.y = y; }

  setActive(v) {
    this.active = v;
    if (!v && this.maskCircle) {
      this.maskCircle.setAttribute('r', '0');
      if (this.edgeCircle) this.edgeCircle.setAttribute('r', '0');
      if (this.disp) this.disp.setAttribute('scale', '0');
    }
  }

  _raf() {
    this.rafId = requestAnimationFrame((ts) => {
      this.t = ts * 0.001;

      const prevX = this.cur.x;
      const prevY = this.cur.y;

      // Smooth lerp
      this.cur.x += (this.mouse.x - this.cur.x) * this.lerpFactor;
      this.cur.y += (this.mouse.y - this.cur.y) * this.lerpFactor;

      if (this.maskCircle && this.active) {
        const r = this.radius * (1 + 0.02 * Math.sin(this.t * 1.8 + this.phaseOff));
        
        // Update CORE
        this.maskCircle.setAttribute('cx', this.cur.x);
        this.maskCircle.setAttribute('cy', this.cur.y);
        this.maskCircle.setAttribute('r', r);

        // Update EDGE
        if (this.edgeCircle) {
           this.edgeCircle.setAttribute('cx', this.cur.x);
           this.edgeCircle.setAttribute('cy', this.cur.y);
           this.edgeCircle.setAttribute('r', r);
        }
      }

      // Velocity-based edge deformation
      if (this.disp && this.active) {
        this.velX = this.cur.x - prevX;
        this.velY = this.cur.y - prevY;
        const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        const scale = Math.min(speed * 2.8, 32);
        this.disp.setAttribute('scale', scale);
      }

      // Turbulence baseFrequency
      if (this.turb) {
        const f = 0.013 + 0.003 * Math.sin(this.t * 0.6 + this.phaseOff);
        this.turb.setAttribute('baseFrequency', `${f} ${f * 1.1}`);
      }

      this._raf();
    });
  }
}
