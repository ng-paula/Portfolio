import { useEffect, useState } from 'react';
import { contact, navLinks } from '../data';
import { ArrowIcon, Strokes, Waves } from './ui';
import '../styles/contact.css';

const manilaTime = () =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }).format(new Date());

export default function Contact() {
  const [time, setTime] = useState(manilaTime);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(manilaTime()), 20000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(contact.email); } catch { /* clipboard blocked */ }
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="cta-card" data-reveal>
          <Waves preset="c" className="" />
          <span className="pill dark">Contact</span>
          <h2 style={{ marginTop: 18 }}>Let's build something together</h2>
          <p>Got an internship, a project, or an event that needs running? Send me a message, I usually reply within a day.</p>
          <div className="row">
            <a className="btn light magnet" href={`mailto:${contact.email}`}>Send a message <span className="ar"><ArrowIcon /></span></a>
            <button className="copy-mail" onClick={copyEmail}>copy email</button>
          </div>
          <Strokes className="doodle" color="#fff" />
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div>
              <a href="#top" className="logo">paula ng<span>.</span></a>
              <p>{contact.name}. BSIT student, web developer and student leader based in Dasmariñas, Cavite.</p>
            </div>
            <div>
              <h5>Navigate</h5>
              <ul>{navLinks.slice(1).map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><a href={`tel:${contact.tel}`}>{contact.phone}</a></li>
                <li>{contact.location}</li>
              </ul>
            </div>
            <div>
              <h5>Elsewhere</h5>
              <ul>
                <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
                <li><a href="#recognition">Certifications</a></li>
              </ul>
            </div>
          </div>
          <div className="bigname">paula ng.</div>
          <div className="fbot">
            <span>© 2026 {contact.name}</span>
            <span className="live"><i />Dasmariñas, PH · {time}</span>
          </div>
        </div>
      </footer>
      <div className={`toast${toast ? ' show' : ''}`}>Email copied</div>
    </section>
  );
}
