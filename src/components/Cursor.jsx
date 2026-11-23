import { useEffect, useRef } from 'react';
import { finePointer } from '../utils';

/** Small pink dot that trails the mouse and grows over clickable things. Mouse only. */
export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!finePointer()) return;
    const c = ref.current;
    let x = -100, y = -100, cx = x, cy = y, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    const over = (e) => c.classList.toggle('big', !!e.target.closest('a,button,.proj,.hang .card,.chip'));
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      c.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, []);
  return <div id="cursor" ref={ref} />;
}
