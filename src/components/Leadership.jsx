import { useCallback, useEffect, useRef, useState } from 'react';
import { leadership } from '../data';
import { onVisible, reduceMotion } from '../utils';
import { Chevron } from './ui';
import '../styles/leadership.css';

const DURATION = 7000; // ms per role

export default function Leadership() {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);
  const indexRef = useRef(0), t0 = useRef(0), paused = useRef(false), visible = useRef(false);
  const stageRef = useRef(null), progRef = useRef(null);

  const go = useCallback((k) => {
    setOut(true);
    t0.current = performance.now();
    setTimeout(() => {
      const n = (k + leadership.length) % leadership.length;
      indexRef.current = n;
      setIndex(n);
      setOut(false);
    }, 380);
  }, []);

  // auto-advance with a progress bar; pauses on hover or when off-screen
  useEffect(() => {
    const stop = onVisible(stageRef.current, (v) => (visible.current = v), { threshold: 0.3 });
    t0.current = performance.now();
    let last = performance.now(), raf;
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const dt = t - last; last = t;
      if (paused.current || !visible.current || reduceMotion()) { t0.current += dt; return; }
      const p = (t - t0.current) / DURATION;
      progRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
      if (p >= 1) go(indexRef.current + 1);
    };
    raf = requestAnimationFrame(tick);
    return () => { stop(); cancelAnimationFrame(raf); };
  }, [go]);

  const L = leadership[index];
  const orgShort = L.org.split(' · ')[0];
  const ringText = `${orgShort} · `.repeat(L.org.length > 26 ? 1 : 2);

  return (
    <section className="lead" id="leadership">
      <div className="wrap">
        <div className="lead-head">
          <p data-reveal>Outside of code, I spend most of my time in student government: running events, signing partnerships and keeping a lot of people pointed the same way.</p>
          <div>
            <span className="pill" data-reveal>Leadership</span>
            <h2 data-reveal="2">Rooms I've been trusted to run</h2>
          </div>
        </div>

        <div className="lead-stage" data-reveal ref={stageRef}
             onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)}>
          <div className="ring">
            <svg viewBox="0 0 240 240">
              <defs><path id="rp" d="M120,120 m-104,0 a104,104 0 1,1 208,0 a104,104 0 1,1 -208,0" /></defs>
              <text><textPath href="#rp">{ringText}</textPath></text>
            </svg>
            <div className="core"><div><b>{String(index + 1).padStart(2, '0')}</b><small>{L.year}</small></div></div>
          </div>
          <div>
            <div className="quote-mark">“</div>
            <div className={`lq${out ? ' out' : ''}`}>
              <p className="txt">{L.text}</p>
              <div className="who"><b>{L.role}</b><small>{L.org} · {L.date}</small></div>
            </div>
            <div className="lq-ctrl">
              <button className="arr" aria-label="Previous role" onClick={() => go(indexRef.current - 1)}><Chevron dir="left" size={14} /></button>
              <div className="dots">
                {leadership.map((_, k) => (
                  <button key={k} aria-label={`Role ${k + 1}`} className={k === index ? 'on' : ''} onClick={() => go(k)} />
                ))}
              </div>
              <button className="arr" aria-label="Next role" onClick={() => go(indexRef.current + 1)}><Chevron size={14} /></button>
              <div className="prog"><i ref={progRef} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
