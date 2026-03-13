import React, { useEffect, useRef } from 'react';

/* Floating spore particle – pure CSS-driven canvas particle system */
const NUM_SPORES = 55;
const NUM_PARTICLES = 80;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = randomBetween(0, this.canvas.width);
    this.y = randomBetween(this.canvas.height * 0.3, this.canvas.height);
    this.r = randomBetween(1, 3.5);
    this.vx = randomBetween(-0.3, 0.3);
    this.vy = randomBetween(-0.6, -0.15);
    this.opacity = randomBetween(0.15, 0.7);
    this.hue = Math.random() > 0.7 ? 280 : 0; // purple or red
    this.life = 1;
    this.decay = randomBetween(0.001, 0.004);
  }
  update() {
    this.x += this.vx + Math.sin(Date.now() * 0.001 + this.x) * 0.2;
    this.y += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset();
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life * this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 90%, 60%)`;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
}

class VinePath {
  constructor(canvas, i) {
    this.canvas = canvas;
    this.i = i;
    this.points = [];
    this.t = 0;
    this.speed = randomBetween(0.002, 0.005);
    this.color = Math.random() > 0.5 ? '#4a0a0a' : '#2d0a3e';
    this.alpha = randomBetween(0.15, 0.35);
    this.initPoints();
  }
  initPoints() {
    const x0 = (this.i / 6) * this.canvas.width + randomBetween(-60, 60);
    const y0 = this.canvas.height;
    this.points = [];
    let cx = x0, cy = y0;
    for (let j = 0; j < 20; j++) {
      cx += randomBetween(-20, 20);
      cy -= randomBetween(30, 60);
      this.points.push({ x: cx, y: cy });
    }
  }
  draw(ctx) {
    if (this.points.length < 2) return;
    const end = Math.floor(this.t * this.points.length);
    if (end < 2) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = randomBetween(1.5, 3);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let k = 1; k < end; k++) {
      ctx.lineTo(this.points[k].x, this.points[k].y);
    }
    ctx.stroke();
    ctx.restore();
  }
  update() {
    this.t = Math.min(this.t + this.speed, 1);
  }
}

const UpsideDownParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: NUM_PARTICLES }, () => new Particle(canvas));
    const vines = Array.from({ length: 7 }, (_, i) => new VinePath(canvas, i));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw vines
      vines.forEach(v => { v.update(); v.draw(ctx); });

      // Draw particles (spores)
      particles.forEach(p => { p.update(); p.draw(ctx); });

      // Fog layers
      const fogGrad = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      fogGrad.addColorStop(0, 'rgba(5,5,8,0)');
      fogGrad.addColorStop(1, 'rgba(5,5,8,0.85)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default UpsideDownParticles;
