import { useEffect, useRef, useState } from 'react';
import { projects } from '../data';
import { finePointer } from '../utils';
import { ArrowIcon, Chevron } from './ui';
import ProjectMock from './ProjectMock';
import '../styles/projects.css';

export default function Projects() {
  const sliderRef = useRef(null), dlgRef = useRef(null), moved = useRef(0);
  const [selected, setSelected] = useState(null);

  // click-and-drag to scroll the row of cards (mouse only; touch scrolls natively)
  useEffect(() => {
    if (!finePointer()) return;
    const sl = sliderRef.current;
    let down = false, sx = 0, start = 0;
    const onDown = (e) => { down = true; moved.current = 0; sx = e.clientX; start = sl.scrollLeft; };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      moved.current = Math.max(moved.current, Math.abs(dx));
      if (moved.current > 4) sl.classList.add('drag');
      sl.scrollLeft = start - dx;
    };
    const onUp = () => { down = false; sl.classList.remove('drag'); };
    sl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      sl.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  useEffect(() => { if (selected) dlgRef.current.showModal(); }, [selected]);

  const scrollBy = (dir) => {
    const card = sliderRef.current.querySelector('.proj');
    sliderRef.current.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };
  const open = (p) => { if (moved.current > 6) return; setSelected(p); };
  const close = () => dlgRef.current.close();

  return (
    <section className="projects" id="projects">
      <div className="wrap proj-head">
        <p data-reveal>Three projects I'm proud of, from a thesis that replaced a month of paperwork to apps I built on weekends. Tap any card for the details.</p>
        <div>
          <span className="pill" data-reveal>Projects</span>
          <h2 data-reveal="2">Explore my most recent work</h2>
        </div>
      </div>

      <div className="slider" ref={sliderRef}>
        {projects.map((p) => (
          <article key={p.id} className="proj" onClick={() => open(p)}>
            <div className="top">
              <div><h3>{p.title}</h3><span className="kind">{p.kind}</span></div>
              <span className="go"><ArrowIcon /></span>
            </div>
            <ProjectMock id={p.id} />
            <p className="blurb">{p.blurb}</p>
            <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
            {p.url && (
              <a className="visit" href={p.url} target="_blank" rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()}>
                Visit live site <ArrowIcon size={12} />
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="wrap slide-nav">
        <span className="hand hint">drag or use the arrows →</span>
        <button aria-label="Previous project" onClick={() => scrollBy(-1)}><Chevron dir="left" /></button>
        <button aria-label="Next project" onClick={() => scrollBy(1)}><Chevron /></button>
      </div>

      <dialog ref={dlgRef} onClose={() => setSelected(null)} onClick={(e) => e.target === dlgRef.current && close()}>
        <div className="dlg">
          <button className="x" aria-label="Close" onClick={close}>×</button>
          {selected && (
            <>
              <span className="kind">{selected.detail.kind}</span>
              <h3>{selected.title}</h3>
              <p className="sub">{selected.detail.sub}</p>
              <ul>{selected.detail.points.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="stack">{selected.detail.stack.map((s) => <span key={s}>{s}</span>)}</div>
              {selected.url && (
                <a className="btn visit-btn" href={selected.url} target="_blank" rel="noopener noreferrer">
                  Visit live site <span className="ar"><ArrowIcon /></span>
                </a>
              )}
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
