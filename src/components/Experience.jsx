import { useEffect, useRef } from 'react';
import { experience } from '../data';
import '../styles/experience.css';

/** Cards hang from pins and swing like pendulums when you scroll, hover or click them. */
function usePendulums(hangRefs) {
  useEffect(() => {
    const st = hangRefs.current.map((el, i) => ({
      el, sw: el.querySelector('.swing'), a: 0, v: 0, base: +el.dataset.rot, dir: i % 2 ? 1 : -1,
    }));
    let last = window.scrollY, raf;
    const onScroll = () => {
      const d = Math.max(-40, Math.min(40, window.scrollY - last));
      last = window.scrollY;
      st.forEach((s) => (s.v += d * 0.018 * s.dir));
    };
    const handlers = st.map((s) => {
      const enter = (e) => (s.v += (e.movementX || (Math.random() - 0.5) * 8) * 0.22);
      const down = (e) => {
        const r = s.el.getBoundingClientRect();
        s.v += (e.clientX < r.left + r.width / 2 ? -1 : 1) * 3.2;
      };
      s.el.addEventListener('pointerenter', enter);
      s.el.addEventListener('pointerdown', down);
      return () => { s.el.removeEventListener('pointerenter', enter); s.el.removeEventListener('pointerdown', down); };
    });
    const loop = () => {
      st.forEach((s) => {
        s.v += -s.a * 0.025;
        s.v *= 0.955;
        s.a = Math.max(-28, Math.min(28, s.a + s.v));
        s.sw.style.transform = `rotate(${s.base + s.a}deg)`;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); handlers.forEach((off) => off()); };
  }, [hangRefs]);
}

/** Dashed line from pin to pin that draws itself as you scroll down. */
function useDashedPath(boardRef, pathRef, maskRef, stillRef) {
  useEffect(() => {
    const board = boardRef.current, p = pathRef.current, m = maskRef.current, still = stillRef.current;
    let L = 1;
    const update = () => {
      const r = board.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, (window.innerHeight * 0.75 - r.top) / r.height));
      m.style.strokeDashoffset = L * (1 - prog);
    };
    const build = () => {
      const br = board.getBoundingClientRect();
      // pins are the rotation origin, so their position doesn't change while cards swing
      const pts = [...board.querySelectorAll('.hang .pin')].map((pin) => {
        const r = pin.getBoundingClientRect();
        return { x: r.left + r.width / 2 - br.left, y: r.top + r.height / 2 - br.top };
      });
      const sr = still.getBoundingClientRect();
      pts.push({ x: sr.left - br.left - 10, y: sr.top - br.top + 10 });
      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dy = (b.y - a.y) * 0.55;
        d += ` C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
      }
      p.setAttribute('d', d);
      m.setAttribute('d', d);
      L = m.getTotalLength();
      m.style.strokeDasharray = L;
      update();
    };
    build();
    document.fonts?.ready.then(build);
    window.addEventListener('load', build);
    window.addEventListener('resize', build);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('load', build);
      window.removeEventListener('resize', build);
      window.removeEventListener('scroll', update);
    };
  }, [boardRef, pathRef, maskRef, stillRef]);
}

export default function Experience() {
  const boardRef = useRef(null), pathRef = useRef(null), maskRef = useRef(null), stillRef = useRef(null);
  const hangRefs = useRef([]);
  usePendulums(hangRefs);
  useDashedPath(boardRef, pathRef, maskRef, stillRef);

  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <div className="exp-head">
          <span className="pill" data-reveal>Experience</span>
          <h2 data-reveal="2">Where I've been putting in the hours</h2>
          <p data-reveal="3">Two internships in AI and backend work, two years keeping records straight. Give the cards a nudge.</p>
          <svg className="squig" width="44" height="34" viewBox="0 0 44 34" fill="none" stroke="#c2255c" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 6c6-4 12 0 9 6s-8 8-3 12 14 2 22 4" /><path d="M27 22l6 6-7 3" />
          </svg>
        </div>

        <div className="board" ref={boardRef}>
          <svg className="path">
            <defs><mask id="pm"><path ref={maskRef} fill="none" stroke="#fff" strokeWidth="6" /></mask></defs>
            <path ref={pathRef} fill="none" stroke="#e48aab" strokeWidth="1.6" strokeDasharray="7 8" mask="url(#pm)" />
          </svg>

          {experience.map((job, i) => (
            <div key={job.no} className={`hang ${job.pos}`} data-rot={job.rot} ref={(el) => (hangRefs.current[i] = el)}>
              <div className="swing">
                <span className="pin" />
                <div className="card">
                  <span className="no">{job.no}</span>
                  <h3>{job.company}</h3>
                  <div className="role">{job.role}</div>
                  <div className="date">{job.date}</div>
                  <p>{job.text}</p>
                </div>
              </div>
            </div>
          ))}
          <span className="still" ref={stillRef}>...and still shipping!</span>
        </div>
      </div>
    </section>
  );
}
