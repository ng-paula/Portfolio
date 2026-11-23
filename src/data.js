// All portfolio content lives here. Edit text in this file, not in the components.

export const contact = {
  name: 'Paula Mitchel O. Ng',
  email: 'paulamitchel26@gmail.com',
  phone: '+63 961 009 9957',
  tel: '+639610099957',
  location: 'Dasmariñas, Cavite 4114',
  linkedin: 'https://www.linkedin.com/in/paula-ng-7b11473b6/',
};

export const navLinks = [
  ['top', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['leadership', 'Leadership'],
];

// [label, font style class]
export const marquee = [
  ['React', 'w1'], ['laravel', 'w3'], ['Next.js', 'w2'], ['supabase', 'w5'],
  ['Tailwind CSS', 'w4'], ['MongoDB', 'w1'], ['python', 'w3'], ['Gemini API', 'w2'],
  ['node.js', 'w5'], ['Figma', 'w4'], ['scikit-learn', 'w1'],
];

// [label, dark variant?]
export const physicsChips = [
  ['React'], ['Laravel', true], ['Next.js'], ['Supabase'], ['Python', true],
  ['Tailwind'], ['MongoDB', true], ['Figma'], ['UI/UX Testing'], ['RAG', true],
];

export const experience = [
  {
    no: '01', pos: 'h1', rot: 6,
    company: 'Elevvo Pathways',
    role: 'Natural Language Processing Intern',
    date: 'Oct 2026 — Present',
    text: 'Text classifiers for sentiment, news topics and fake news (TF-IDF with Logistic Regression and SVM), plus a RAG talent search engine that embeds resumes in ChromaDB and uses Gemini to explain each match.',
  },
  {
    no: '02', pos: 'h2', rot: -9,
    company: 'FlyRank AI',
    role: 'Backend AI Engineering Intern',
    date: 'Aug 2026 — Present',
    // TODO: replace with what you actually do at FlyRank
    text: 'Backend engineering work on AI-powered products.',
  },
  {
    no: '03', pos: 'h3', rot: -7,
    company: 'Quality Assurance Office',
    role: 'Student Assistant · Hermania D. Torres QA Office',
    date: 'Aug 2024 — Present',
    text: 'Encoding and double-checking institutional records ahead of accreditation reports and award submissions, and keeping the office archives organized to standard.',
  },
  {
    no: '04', pos: 'h4', rot: 8,
    company: 'Begone Skin & Body',
    role: 'Data Entry Intern',
    date: 'Mar 2024 — Jun 2024',
    text: 'Kept client records and clinic logs accurate and complete, catching errors and missing fields so staff could pull up what they needed fast.',
  },
];

export const skills = [
  { icon: 'web', title: 'Web Development', desc: 'Full-stack apps from the database to the last hover state.',
    tags: ['React.js', 'Next.js', 'Laravel', 'Node.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'] },
  { icon: 'db', title: 'Databases & Backend', desc: 'Schemas, row-level security, auth, and keeping data trustworthy.',
    tags: ['SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Git & GitHub'] },
  { icon: 'ai', title: 'AI & NLP', desc: 'Text classification, preprocessing pipelines and retrieval-augmented search.',
    tags: ['Python', 'Scikit-learn', 'ChromaDB', 'Gemini API', 'RAG'] },
  { icon: 'qa', title: 'QA & Testing', desc: "I click every button so your users don't find the bug first.",
    tags: ['User flow testing', 'UI/UX verification', 'Data validation', 'Bug reports', 'Documentation'] },
  { icon: 'lead', title: 'Leadership', desc: 'Large events, partnerships, policies and the people who carry them.',
    tags: ['Org leadership', 'Partnerships', 'Event execution', 'Cross-team coordination'] },
  { icon: 'design', title: 'Design & Tools', desc: 'Wireframes, pubmats, and the spreadsheet behind every event.',
    tags: ['Figma', 'Canva', 'Adobe CC', 'Excel', 'Word'] },
];

export const projects = [
  {
    id: 'aniskolar', title: 'AniSkolar', kind: 'Undergraduate thesis · 2026',
    url: 'https://aniskolar.com',
    blurb: 'Scholarship management for DLSU-D, serving about 1,400 scholars and 800 applicants a year.',
    stack: ['React', 'Tailwind', 'Laravel', 'MongoDB'],
    detail: {
      kind: 'Undergraduate Thesis · May 2026 — Present',
      sub: 'A scholarship management system for De La Salle University – Dasmariñas',
      points: [
        "Built for the university's Admissions and Scholarship Office and its partner offices, serving about 1,400 scholars and 800 applicants each year.",
        'Brings scholarship listings, online applications and renewals, real-time status tracking, scholar monitoring, digital duty-hours logging and automated reports into one platform.',
        'Replaced a manual process spread across forms, spreadsheets and separate channels: tasks that took days to a month became direct retrieval and one-click downloads.',
        'Rated 3.79 out of 4 by 349 users.',
      ],
      stack: ['React', 'Tailwind CSS', 'Laravel', 'MongoDB'],
    },
  },
  {
    id: 'starboard', title: 'Starboard', kind: 'Personal project · Aug 2026',
    blurb: 'An AI task app that turns a messy brain-dump into an organized plan, with a built-in Pomodoro timer.',
    stack: ['Next.js', 'Zustand', 'Supabase', 'Gemini API'],
    detail: {
      kind: 'Personal Project · August 2026',
      sub: 'AI-powered task & workflow sanctuary',
      points: [
        'Natural-language brain-dump parsing and automated workflow optimization with the Google Gemini API.',
        'Customizable folders, dynamic timeline filtering, interactive subtask breakdowns and a built-in Pomodoro focus timer.',
        'Secure PostgreSQL backend on Supabase with Row Level Security and OAuth for cloud persistence and cross-device sync.',
        'Global state with Zustand and custom hooks; API endpoints validated with Zod schemas.',
        'Deployed on Vercel with a clean digital-scrapbook interface.',
      ],
      stack: ['Next.js', 'React', 'Zustand', 'Supabase', 'Gemini API', 'Zod', 'Vercel'],
    },
  },
  {
    id: 'codevault', title: 'CodeVault', kind: 'Personal project · Dec 2025',
    url: 'https://code-vault-v2.vercel.app/',
    blurb: 'A browser-based cloud IDE that compiles 12+ languages, with project vaults you can share and fork.',
    stack: ['React', 'Vite', 'Supabase', 'Monaco', 'Judge0'],
    detail: {
      kind: 'Personal Project · December 2025',
      sub: 'Cloud IDE & multi-language project workspace',
      points: [
        'Browser-based IDE with real-time compilation across 12+ languages, custom stdin, and serverless Judge0 integration.',
        'Multi-tenant PostgreSQL on Supabase, with strict Row Level Security and Google OAuth 2.0 protecting user code vaults.',
        'Monaco Editor with debounced auto-save, custom keybindings, sandboxed HTML/CSS rendering and client-side ZIP export.',
        'Light/dark themes, multi-file directory navigation, and public vault sharing and forking.',
      ],
      stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Monaco Editor', 'Judge0', 'Vercel'],
    },
  },
];

export const leadership = [
  { role: 'Governor', org: 'CICS Student Government', date: 'Sep 2026 — Present', year: '2026',
    text: 'The highest governing officer of the College of Information and Computer Studies: more than 90 officers, a student body of 950, and every large event, policy and budget that comes with it.' },
  { role: 'Director of Internal Affairs', org: 'CICS Student Government', date: 'Aug 2025 — May 2026', year: '2025',
    text: 'Mediated between the student government, the administration and other organizations. Signed memorandums of agreement with 20+ student orgs, and headed the inaugural CICS Recognition and SIKAPTala 2026, a national CS and IT competition.' },
  { role: 'Public Relations Committee Co-Head', org: 'CICS Student Government', date: 'Aug 2025 — May 2026', year: '2025',
    text: 'Led a 17-person committee on content, copywriting and media for every event, and kept publicity materials aligned with project heads and on schedule.' },
  { role: 'Data Management Committee Member', org: 'CICS Student Government', date: 'Aug 2024 — May 2025', year: '2024',
    text: 'Kept event data clean with validation rules that cut entry errors, and turned post-event surveys into insights leadership could actually act on.' },
  { role: 'DLSU-D Student Ambassador', org: 'Campus Crew · Grab & Move It with Hey Roomie', date: 'Aug 2025 — Mar 2026', year: '2025',
    text: 'Represented the CICS Student Government at multi-brand campus events, ran digital promotions, and tested campaign materials and app features, reporting bugs and feedback to the team.' },
  { role: 'Junior Officer for External Affairs', org: 'Sinag Society of Leaders', date: 'Jan 2024 — May 2025', year: '2024',
    text: 'Reached out to external partners and sponsors for organization projects, and drafted the communications that kept those partnerships clear and professional.' },
  { role: 'Junior Officer for Fundraising', org: 'Circle of Student Assistants', date: 'Jan 2024 — May 2025', year: '2024',
    text: 'Coordinated fundraising campaigns for student assistant programs, and handled inventory, sales tracking and financial records so every peso was accounted for.' },
];

export const awards = [
  { title: "First Honors Dean's Lister", note: 'Cumulative GPA 3.71 / 4.0', when: '2023 — now' },
  { title: 'CHED Merit Scholar', note: 'Also a DLSU-D Financial Aid & DOLE SPES grantee', when: '2023 — now' },
  { title: 'Excellence in Leadership', note: 'Director of Internal Affairs', when: '2026' },
  { title: 'Excellence in Leadership', note: 'Committee Member of the Year', when: '2025' },
  { title: 'Leadership Advancement & Growth Orientation', note: 'DLSU-D · CICSSG Representative', when: 'LAGO' },
  { title: 'Strategies in Inspiring & Building Organizational Leadership', note: 'DLSU-D · CICSSG Representative', when: 'SIBOL' },
];

export const certifications = [
  { issuer: 'HP LIFE', title: 'Introduction to Cybersecurity Awareness' },
  { issuer: 'HP LIFE', title: 'Data Science & Analytics' },
  { issuer: 'HP LIFE', title: 'Strategic Planning in the AI Age' },
  { issuer: 'HP LIFE', title: 'Professional Networking for Career Growth' },
  { issuer: 'CISCO', title: 'Cisco Packet Tracer · Python Essentials 1' },
  { issuer: 'CERT', title: 'Network and Cybersecurity Fundamentals',
    href: 'https://www.linkedin.com/in/paula-ng-7b11473b6/overlay/Certifications/286352501/treasury/?profileId=ACoAAGV347UB59AcbgPmv33G_K6m623pNW_Oxhs' },
  { issuer: 'CERT', title: 'Wonders and Perils of AI & Emerging Technology',
    href: 'https://www.linkedin.com/in/paula-ng-7b11473b6/overlay/Certifications/286469171/treasury/?profileId=ACoAAGV347UB59AcbgPmv33G_K6m623pNW_Oxhs' },
];
