import { useEffect, useMemo, useRef, useState } from 'react';
import { marquee } from '../data';
import { asset, finePointer, onVisible, reduceMotion } from '../utils';
import { ArrowIcon, Burst, Counter, Strokes } from './ui';
import '../styles/hero.css';

/** Faint pixel squares behind the hero that light up around the cursor. */
function usePixelGrid(canvasRef, hostRef) {
  useEffect(() => {
    const c = canvasRef.current, host = hostRef.current, ctx = c.getContext('2d'), S = 28;
    let w, h, cols, rows, cells, base, mx = -1e3, my = -1e3, run = true, raf;
    const size = () => {
      const d = Math.min(devicePixelRatio, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * d; c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      cols = Math.ceil(w / S); rows = Math.ceil(h / S);
      cells = new Float32Array(cols * rows);
      base = new Float32Array(cols * rows);
      for (let i = 0; i < base.length; i++) base[i] = Math.random() < 0.08 ? 0.015 + Math.random() * 0.04 : 0;
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -1e3; };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      const cx = Math.floor(mx / S), cy = Math.floor(my / S);
      for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) {
        const X = cx + x, Y = cy + y;
        if (X < 0 || Y < 0 || X >= cols || Y >= rows) continue;
        const d = Math.hypot(x, y);
        if (d > 3.2) continue;
        const i = Y * cols + X;
        cells[i] = Math.max(cells[i], (1 - d / 3.4) * 0.16 * (0.6 + Math.random() * 0.4));
      }
      if (!reduceMotion() && Math.random() < 0.15) cells[(Math.random() * cells.length) | 0] = 0.07;
      for (let i = 0; i < cells.length; i++) {
        cells[i] *= 0.955;
        const a = base[i] + cells[i];
        if (a > 0.005) {
          ctx.fillStyle = `rgba(214,51,108,${Math.min(1, a * 1.5)})`;
          ctx.fillRect((i % cols) * S + 2, ((i / cols) | 0) * S + 2, S - 4, S - 4);
        }
      }
    };
    size();
    window.addEventListener('resize', size);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    const stop = onVisible(host, (v) => (run = v), { threshold: 0 });
    frame();
    return () => {
      stop(); cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, [canvasRef, hostRef]);
}

function ContourLines() {
  const paths = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const r = 40 + i * 22;
    let d = '';
    for (let k = 0; k <= 64; k++) {
      const a = (k / 64) * Math.PI * 2;
      const wob = r + Math.sin(a * 3 + i * 0.6) * 8 + Math.cos(a * 5 - i) * 5;
      d += (k ? 'L' : 'M') + (260 + Math.cos(a) * wob).toFixed(1) + ' ' + (150 + Math.sin(a) * wob * 0.9).toFixed(1);
    }
    return d + 'Z';
  }), []);
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={`rgba(255,255,255,${0.5 - i * 0.022})`} strokeWidth="1" />)}
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef(null), canvasRef = useRef(null), cardRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  usePixelGrid(canvasRef, heroRef);

  const tilt = (e) => {
    if (!finePointer() || reduceMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };

  const strip = (
    <div className="item">
      {marquee.map(([label, cls]) => (
        <span key={label} style={{ display: 'contents' }}>
          <span className={cls}>{label}</span><span className="plus">+</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="hero" id="top" ref={heroRef}>
      <canvas id="pixels" ref={canvasRef} />
      <div className="wrap hero-grid">
        <div>
          <span className="pill" data-reveal>Hi, I'm Paula Mitchel Ng</span>
          <h1>
            <span className="ln"><span>I build systems</span></span>
            <span className="ln"><span>&amp; digital</span></span>
            <span className="ln"><span>experiences<Burst points={9} seed={3} /></span></span>
          </h1>
          <p className="intro" data-reveal="2">
            I'm an IT student at De La Salle University – Dasmariñas who builds full-stack web apps and AI tools, and
            leads the people behind them. Right now I'm an AI intern, a CHED Merit Scholar, and Governor of my
            college's student government.
          </p>
          <div className="hero-actions" data-reveal="3">
            <a href="#contact" className="btn magnet">Let's talk <span className="ar"><ArrowIcon /></span></a>
            <Strokes className="doodle" />
            <span className="meta">Open to <b>internships</b> &amp; <b>freelance</b></span>
          </div>
        </div>

        <div className="hero-card-wrap" data-reveal="2" onPointerMove={tilt}
             onPointerLeave={() => (cardRef.current.style.transform = '')}>
          <div className="float-badge">
            <b><Counter to={3.71} dec={2} /></b>
            <small>GPA · First Honors Dean's Lister</small>
            <div className="stars"><i /><i /><i /><i /></div>
          </div>
          <div className="float-badge float-b2">
            <small>CHED Merit Scholar</small>
            <b style={{ fontSize: 16 }}>2023 → now</b>
          </div>
          <div className="hero-card" ref={cardRef}>
            <div className="ph">
              <ContourLines />
              <span className="coords">Dasmariñas, Cavite · 14.33°N</span>
              <span className="mono">PN</span>
            </div>
            {/* Put photo.jpg in the public/ folder and it shows up here */}
            {hasPhoto && <img src={asset('photo.jpg')} alt="Portrait of Paula Ng" onError={() => setHasPhoto(false)} />}
            <span className="tag">Web Developer · BSIT, DLSU-D</span>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="track">{strip}{strip}</div>
      </div>
    </section>
  );
}
