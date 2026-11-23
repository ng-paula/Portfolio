import { skills } from '../data';
import '../styles/skills.css';

const ICONS = {
  web: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 14l-2 2 2 2M15 14l2 2-2 2" /></>,
  db: <><ellipse cx="12" cy="5.5" rx="8" ry="2.8" /><path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" /></>,
  ai: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3" /></>,
  qa: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  lead: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  design: <><path d="M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" /><circle cx="11" cy="11" r="2" /></>,
};

// spotlight that follows the cursor inside each card
const spotlight = (e) => {
  const c = e.currentTarget, r = c.getBoundingClientRect();
  c.style.setProperty('--mx', `${e.clientX - r.left}px`);
  c.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="skills-head">
          <div>
            <span className="pill dark" data-reveal>What I do</span>
            <h2 data-reveal="2">I build things that hold up, not just look good</h2>
          </div>
          <p data-reveal="3">Most of my work sits where code meets people: building the system, testing it with real users, and running the team around it.</p>
        </div>
        <div className="sgrid">
          {skills.map((s, i) => (
            <div key={s.title} className="scard" data-reveal={String((i % 3) + 1)} onPointerMove={spotlight}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[s.icon]}
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
