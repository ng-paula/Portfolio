import { useEffect, useMemo, useRef } from 'react';
import { onVisible, reduceMotion, seeded } from '../utils';

const PINK = '#c2255c';

export function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11 11 3M5 3h6v6" />
    </svg>
  );
}

export function Chevron({ dir = 'right', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={dir === 'left' ? 'M10 3 5 8l5 5' : 'm6 3 5 5-5 5'} />
    </svg>
  );
}

/** Three little "emphasis" strokes, like the ones next to buttons in the reference design. */
export function Strokes({ className, color = PINK }) {
  return (
    <svg className={className} width="34" height="30" viewBox="0 0 34 30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l4 9M16 3l1 11M27 8l-6 8" />
    </svg>
  );
}

/** Hand-drawn starburst. Same seed = same shape. */
export function Burst({ points = 9, seed = 1, className = 'burst', style }) {
  const d = useMemo(() => {
    const r = seeded(seed);
    let p = '';
    for (let i = 0; i < points * 2; i++) {
      const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const rad = i % 2 ? 16 + r() * 6 : 38 + r() * 10;
      p += (i ? 'L' : 'M') + (Math.cos(a) * rad).toFixed(1) + ' ' + (Math.sin(a) * rad).toFixed(1);
    }
    return p + 'Z';
  }, [points, seed]);
  return (
    <svg className={className} style={style} viewBox="-50 -50 100 100">
      <path d={d} fill="none" stroke={PINK} strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

/** Number that counts up the first time it scrolls into view. */
export function Counter({ to, dec = 0, suffix = '', sep = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const fmt = (n) => (sep ? Math.round(n).toLocaleString('en-US') : n.toFixed(dec)) + suffix;
    let raf, done = false;
    const stop = onVisible(el, (v) => {
      if (!v || done) return;
      done = true;
      if (reduceMotion()) { el.textContent = fmt(to); return; }
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.max(0, Math.min(1, (t - t0) / 1600));
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    return () => { stop(); cancelAnimationFrame(raf); };
  }, [to, dec, suffix, sep]);
  return <span ref={ref}>0</span>;
}

const WAVES = {
  a: { n: 26, cy: 0.62, gap: 7, f: 0.006, s: 0.6, amp: 46, p: 0.18, rot: -0.08 },
  b: { n: 16, cy: 0.5, gap: 9, f: 0.008, s: 0.4, amp: 30, p: 0.25, rot: 0.05 },
  c: { n: 34, cy: 0.5, gap: 9, f: 0.004, s: 0.35, amp: 70, p: 0.12, rot: 0 },
};

/** Animated bundle of white lines that bend toward the cursor. Fills its parent. */
export function Waves({ preset = 'a', className = 'waves', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d'), o = WAVES[preset];
    let w, h, run = false, t = Math.random() * 10, mx = 0.5, raf;
    const size = () => {
      const d = Math.min(devicePixelRatio, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * d; c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < o.n; i++) {
        const k = i - o.n / 2;
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + 0.32 * Math.pow(1 - Math.abs(k) / (o.n / 2), 1.5)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 6) {
          const env = Math.sin((Math.PI * x) / w);
          const bump = Math.exp(-Math.pow((x / w - mx) * 3, 2)) * 18;
          const y = h * o.cy + k * o.gap + x * o.rot + Math.sin(x * o.f + t * o.s + i * o.p) * o.amp * env - bump * env;
          x < -9 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!run) return;
      if (!reduceMotion()) t += 0.016;
      draw();
    };
    size(); draw();
    const stop = onVisible(c, (v) => (run = v), { threshold: 0 });
    window.addEventListener('resize', size);
    c.parentElement.addEventListener('pointermove', move);
    loop();
    return () => {
      stop(); cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      c.parentElement?.removeEventListener('pointermove', move);
    };
  }, [preset]);
  return <canvas ref={ref} className={className} style={style} />;
}
