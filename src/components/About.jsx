import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { physicsChips } from '../data';
import { asset, finePointer, onVisible, reduceMotion } from '../utils';
import { Burst, Counter, Waves } from './ui';
import '../styles/about.css';

/** Skill pills that fall into the dark card and can be grabbed and thrown. */
function usePhysicsChips(boxRef) {
  useEffect(() => {
    const box = boxRef.current;
    const chips = [...box.querySelectorAll('.chip')];
    let cleanup = () => {};

    const fallback = () => {
      box.classList.add('live');
      const W = box.clientWidth, H = box.clientHeight;
      let x = 24, y = H - 50;
      chips.forEach((c) => {
        if (x + c.offsetWidth > W - 20) { x = 24; y -= 46; }
        c.style.transform = `translate(${x}px,${y}px) rotate(${(Math.random() - 0.5) * 14}deg)`;
        x += c.offsetWidth + 8;
      });
    };

    const start = () => {
      const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;
      const engine = Engine.create();
      engine.gravity.y = 1.1;
      let W = box.clientWidth, H = box.clientHeight;
      const T = 60;
      const ground = Bodies.rectangle(W / 2, H + T / 2, W * 3, T, { isStatic: true });
      const left = Bodies.rectangle(-T / 2, H / 2, T, H * 4, { isStatic: true });
      const right = Bodies.rectangle(W + T / 2, H / 2, T, H * 4, { isStatic: true });
      const bodies = chips.map((el, i) => {
        const w = el.offsetWidth, h = el.offsetHeight;
        const b = Bodies.rectangle(W * (0.12 + Math.random() * 0.76), -40 - i * 55, w, h, {
          chamfer: { radius: h / 2 - 1 }, restitution: 0.4, friction: 0.25, frictionAir: 0.015,
          angle: (Math.random() - 0.5) * 1.2, density: 0.002,
        });
        Object.assign(b, { el, w, h });
        return b;
      });
      Composite.add(engine.world, [ground, left, right, ...bodies]);
      box.classList.add('live');

      let mouse;
      if (finePointer()) {
        mouse = Mouse.create(box);
        // let the page keep scrolling over the card
        ['mousewheel', 'DOMMouseScroll', 'wheel'].forEach((ev) => box.removeEventListener(ev, mouse.mousewheel));
        box.removeEventListener('touchmove', mouse.mousemove);
        box.removeEventListener('touchstart', mouse.mousedown);
        box.removeEventListener('touchend', mouse.mouseup);
        Composite.add(engine.world, MouseConstraint.create(engine, {
          mouse, constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } },
        }));
      }
      // on phones: tap the card to make the pills jump
      const tap = () => { if (!finePointer()) bodies.forEach((b) => Body.setVelocity(b, { x: (Math.random() - 0.5) * 10, y: -8 - Math.random() * 8 })); };
      box.addEventListener('click', tap);

      const runner = Runner.create();
      Runner.run(runner, engine);
      const stopVis = onVisible(box, (v) => (runner.enabled = v), { threshold: 0 });

      const resize = () => {
        W = box.clientWidth; H = box.clientHeight;
        Body.setPosition(ground, { x: W / 2, y: H + T / 2 });
        Body.setPosition(right, { x: W + T / 2, y: H / 2 });
        bodies.forEach((b) => { if (b.position.x > W) Body.setPosition(b, { x: W - 60, y: 20 }); });
      };
      window.addEventListener('resize', resize);

      let raf;
      const sync = () => {
        bodies.forEach((b) => {
          b.el.style.transform = `translate(${b.position.x - b.w / 2}px,${b.position.y - b.h / 2}px) rotate(${b.angle}rad)`;
        });
        raf = requestAnimationFrame(sync);
      };
      sync();

      cleanup = () => {
        cancelAnimationFrame(raf); stopVis();
        Runner.stop(runner); Engine.clear(engine);
        window.removeEventListener('resize', resize);
        box.removeEventListener('click', tap);
        if (mouse) {
          box.removeEventListener('mousemove', mouse.mousemove);
          box.removeEventListener('mousedown', mouse.mousedown);
          box.removeEventListener('mouseup', mouse.mouseup);
        }
      };
    };

    let started = false;
    const stopStart = onVisible(box, (v) => {
      if (!v || started) return;
      started = true;
      reduceMotion() ? fallback() : start();
    }, { threshold: 0.4 });

    return () => { stopStart(); cleanup(); };
  }, [boxRef]);
}

export default function About() {
  const boxRef = useRef(null), statRef = useRef(null);
  const [statIn, setStatIn] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  usePhysicsChips(boxRef);
  useEffect(() => onVisible(statRef.current, (v) => v && setStatIn(true)), []);

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-top">
          <div>
            <span className="pill" data-reveal>About me</span>
            <h2 data-reveal="2">Meet Paula: I write the code and run the meeting</h2>
            <p data-reveal="3">
              I'm a BS Information Technology student at De La Salle University – Dasmariñas, a CHED Merit Scholar,
              and the current Governor of the CICS Student Government. I like problems with a lot of moving parts:
              a scholarship office buried in spreadsheets, a 90-officer organization, a dataset that won't behave.
              My favorite part is the moment the messy thing turns simple.
            </p>
          </div>
          <div className="about-photo" data-reveal="2">
            {/* Put photo-2.jpg in the public/ folder and it shows up here */}
            {hasPhoto && <img src={asset('photo-2.jpg')} alt="" onError={() => setHasPhoto(false)} />}
            <span className="hi">hi, I'm<br />Paula :)</span>
            <svg className="stamp" viewBox="0 0 100 100">
              <defs><path id="st" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#st">BSIT · Web Dev Track · DLSU-D ·</textPath></text>
              <circle cx="50" cy="50" r="4" fill="#fff" />
            </svg>
            <div className="facts"><span>Cavite, PH</span><span>3.71 GPA</span><span>TOEIC 900 · C1</span><span>CHED Scholar</span></div>
          </div>
        </div>
        <Burst points={11} seed={7} className="burst-a burst" style={{ position: 'absolute' }} />

        <div className="about-bottom">
          <div className="dark-card" data-reveal>
            <Waves preset="a" />
            <div className="stat">
              <b><Counter to={3.79} dec={2} /><span style={{ fontSize: 22, color: 'rgba(255,255,255,.7)' }}> / 4</span></b>
              <small>AniSkolar's rating from 349 users</small>
            </div>
            <div className="drag-hint hand">
              toss these around
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4c8 2 14 8 16 18M15 18l5 5 4-7" />
              </svg>
            </div>
            <div id="pillbox" ref={boxRef}>
              {physicsChips.map(([label, alt]) => <span key={label} className={`chip${alt ? ' alt' : ''}`}>{label}</span>)}
            </div>
          </div>

          <div className={`stat-card${statIn ? ' in' : ''}`} data-reveal="2" ref={statRef}>
            <div className="row">
              <div><b><Counter to={950} /></b><small>students in the college I govern</small></div>
              <div><b><Counter to={90} suffix="+" /></b><small>officers I work with</small></div>
            </div>
            <div>
              <div className="note"><span>GPA</span><span>3.71 / 4.00</span></div>
              <div className="bar"><i /></div>
            </div>
            <div className="row">
              <div><b><Counter to={20} suffix="+" /></b><small>partner orgs signed</small></div>
              <div><b><Counter to={1400} sep /></b><small>scholars on AniSkolar</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
