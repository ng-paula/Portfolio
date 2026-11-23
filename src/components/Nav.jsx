import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navLinks } from '../data';
import '../styles/nav.css';

export default function Nav() {
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll spy: highlight the section in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // slide the grey pill under the active link
  useLayoutEffect(() => {
    const place = () => {
      const a = linkRefs.current[active];
      if (a) setInd({ left: a.offsetLeft, width: a.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="bar">
        <a href="#top" className="logo">paula ng<span>.</span></a>
        <nav className="links">
          <span className="ind" style={{ left: ind.left, width: ind.width }} />
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} ref={(el) => (linkRefs.current[id] = el)}
               className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="cta magnet">Contact me</a>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}><i /><i /></button>
      </div>
    </header>
  );
}
