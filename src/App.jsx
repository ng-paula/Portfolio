import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import { finePointer, reduceMotion } from './utils';

/** Fades in anything marked data-reveal as it scrolls into view. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Buttons marked .magnet lean toward the cursor. */
function useMagnets() {
  useEffect(() => {
    if (!finePointer() || reduceMotion()) return;
    const offs = [...document.querySelectorAll('.magnet')].map((b) => {
      const move = (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      };
      const leave = () => (b.style.transform = '');
      b.style.transition = 'transform .35s cubic-bezier(.3,1.5,.5,1)';
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', leave);
      return () => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); };
    });
    return () => offs.forEach((off) => off());
  }, []);
}

export default function App() {
  useReveal();
  useMagnets();
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Leadership />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
