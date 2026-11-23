export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => matchMedia('(pointer: fine)').matches;

/** Calls cb(isVisible) whenever el enters/leaves the viewport. Returns a cleanup function. */
export function onVisible(el, cb, opts = { threshold: 0.15 }) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => cb(e.isIntersecting, e)), opts);
  io.observe(el);
  return () => io.disconnect();
}

/** Small seeded random generator, so hand-drawn shapes look the same on every load. */
export function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export const asset = (file) => `${import.meta.env.BASE_URL}${file}`;
