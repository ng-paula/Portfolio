import { awards, certifications } from '../data';
import { Counter, Waves } from './ui';
import '../styles/recognition.css';

export default function Recognition() {
  return (
    <section className="recog" id="recognition">
      <div className="wrap">
        <span className="pill" data-reveal>Recognition</span>
        <h2 data-reveal="2">Awards, honors &amp; the certificates in between</h2>
        <div className="rgrid">
          <div className="awards" data-reveal>
            {awards.map((a) => (
              <div className="aw" key={a.title + a.note}>
                <div><b>{a.title}</b><small>{a.note}</small></div>
                <span className="yr">{a.when}</span>
              </div>
            ))}
          </div>
          <div className="certs">
            <div className="toeic" data-reveal="2">
              <Waves preset="b" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }} />
              <span className="lvl" style={{ position: 'absolute' }}>C1 Advanced</span>
              <div style={{ position: 'relative' }}>
                <b><Counter to={900} /></b>
                <small>TOEIC score · Princeton Assessments &amp; Training, Inc.</small>
              </div>
            </div>
            <div className="clist" data-reveal="3">
              <h4>Certifications</h4>
              <ul>
                {certifications.map((c) => (
                  <li key={c.title}>
                    <span>{c.issuer}</span>
                    {c.href ? <a href={c.href} target="_blank" rel="noopener noreferrer">{c.title}</a> : c.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
