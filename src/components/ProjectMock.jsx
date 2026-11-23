/** Small hand-built UI previews for each project card (no screenshots needed). */

function AniSkolarMock() {
  const rows = [['Approved', ''], ['Pending', 'p'], ['Renewed', ''], ['Review', 'p']];
  return (
    <div className="mock m-ani">
      <div className="side"><i /><i /><i style={{ width: '70%' }} /><i /><i style={{ width: '55%' }} /></div>
      <div className="main">
        <div className="kpis">
          <div><b>1,412</b><small>Scholars</small></div>
          <div><b>806</b><small>Applicants</small></div>
          <div><b>3.79</b><small>Rating</small></div>
        </div>
        {rows.map(([label, cls]) => (
          <div className="row" key={label}><span className="av" /><span className="nm" /><span className={`st ${cls}`}>{label}</span></div>
        ))}
      </div>
    </div>
  );
}

function StarboardMock() {
  return (
    <div className="mock m-star">
      <div className="note n1">
        <span className="tape" /><i className="d" />
        <div className="ck"><b className="x" /><em /></div>
        <div className="ck"><b /><em /></div>
        <div className="ck"><b /><em style={{ width: '60%', flex: 'none' }} /></div>
      </div>
      <div className="note n2"><span className="tape" /><i className="d" style={{ width: '50%' }} /><i /><i style={{ width: '80%' }} /></div>
      <svg className="timer" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="#fff" stroke="#ddd" strokeWidth="6" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#c2255c" strokeWidth="6" strokeDasharray="264"
                strokeDashoffset="90" strokeLinecap="round" transform="rotate(-90 50 50)">
          <animate attributeName="stroke-dashoffset" values="0;264" dur="25s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="57" textAnchor="middle">25:00</text>
      </svg>
      <div className="ai"><b>✦</b> "finish thesis ch.3, email adviser, gym at 6"</div>
    </div>
  );
}

function CodeVaultMock() {
  return (
    <div className="mock m-code">
      <div className="bar"><i /><i /><i /><span>main.py</span></div>
      <div className="tree"><b>▾ vault</b><br />&nbsp; main.py<br />&nbsp; utils.js<br />&nbsp; index.html<br />&nbsp; style.css<br />▸ shared</div>
      <pre>
        <b>def</b> <em>greet</em>(name):{'\n'}
        {'    '}<b>return</b> f"hi, {'{'}name{'}'}"{'\n\n'}
        n = input(){'\n'}
        <b>print</b>(<em>greet</em>(n))<span className="caret" />
      </pre>
      <span className="run">▶ Run · 12+ langs</span>
    </div>
  );
}

const MOCKS = { aniskolar: AniSkolarMock, starboard: StarboardMock, codevault: CodeVaultMock };

export default function ProjectMock({ id }) {
  const Mock = MOCKS[id];
  return Mock ? <Mock /> : <div className="mock" />;
}
