/**
 * Central portfolio data — Rutvek Ladhi (Nexus Technology).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

function getStored<T>(key: string, fallback: T): T {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rutvek_portfolio_custom_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed[key]) {
          if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
            return { ...fallback, ...parsed[key] };
          }
          return parsed[key];
        }
      }
    }
  } catch {}
  return fallback;
}

export const profile = getStored('profile', {
  fullName: 'Rutvek Ladhi',
  displayName: 'Rutvek Ladhi',
  firstName: 'RUTVEK',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A NEXUS ORIGINAL',
  role: 'Full-Stack Developer | AI & App Developer | Entrepreneur',
  tagline: ['Full-Stack Developer', 'AI & App Developer', 'Founder — Nexus Technology'],
  intro:
    'An AI & Data Science engineering student at NIAT (SGU), full-stack developer, and founder of Nexus Technology — turning ambitious ideas into practical digital products across web, mobile, and AI automation.',
  location: 'Kolhapur, Maharashtra, India',
  email: 'rutvekladhi0@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/rutvek-ladhi',
    github: 'https://github.com/rutvekladhi',
  },
  resumePdf: '/assets/Rutvek_Ladhi_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Rutvek Ladhi',
  },
  interests: [
    'Full-Stack Web Development',
    'Mobile Application Development',
    'Artificial Intelligence',
    'SaaS Product Development',
    'Workflow Automation',
    'Entrepreneurship',
  ],
});

export const education = getStored('education', [
  {
    school: 'NIAT at Sanjay Ghodawat University (SGU)',
    place: 'Kolhapur, Maharashtra',
    degree: 'B.Tech — Artificial Intelligence & Data Science (AI & DS)',
    period: '2024 – Present',
    score: 'First-Year Engineering',
  },
]);

export const experience = getStored('experience', [
  {
    company: 'Nexus Technology',
    role: 'Founder & Tech Lead',
    place: 'Kolhapur, Maharashtra',
    period: '2024 – Present',
    points: [
      'Founded a digital solutions and web development agency focused on high-performance websites and tech-driven business solutions.',
      'Lead full-stack development, e-commerce solutions, UI/UX implementation, and client communication end-to-end.',
      'Architect and deploy modern web applications using Next.js, React, Supabase, and AI workflow automations.',
    ],
  },
  {
    company: 'Sanika Garments',
    role: 'Freelance Web Developer',
    place: 'Barshi, Maharashtra',
    period: '2024 – Present',
    points: [
      'Engineered a complete commercial web store for Sanika Garments featuring modern aesthetics and optimized product collections.',
      'Implemented customer authentication, reactive cart state, dynamic search filters, and an administrative management dashboard with Supabase.',
      'Integrated direct WhatsApp customer communication and structured payment workflow readiness.',
    ],
  },
]);

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = getStored('projects', [
  {
    id: 'carenexus',
    title: 'CareNexus',
    year: '2025',
    genre: 'HealthTech • Coordination • APIs',
    logline: 'Smart healthcare coordination platform simplifying patient workflows, appointments, and frontline health networks.',
    stack: ['JavaScript', 'Node.js', 'REST APIs', 'SerpApi', 'Database Integration'],
    build: [
      'Built a smart healthcare coordination platform connecting patients, frontline health workers, and medical facilities with dedicated dashboards.',
      'Engineered digital patient health profiles, appointment and queue management, and automated facility discovery using SerpApi integrations.',
      'Implemented referral tracking, diagnostic coordination, patient follow-up management, and medicine information workflows.',
    ],
    features: [
      'Digital patient health profiles',
      'Appointment & queue management',
      'Healthcare facility discovery via SerpApi',
      'Referral tracking & patient follow-ups',
      'Dedicated healthcare provider & worker dashboards',
      'Medicine information and diagnostic coordination',
    ],
    metrics: [
      { value: 'End-to-End', label: 'care coordination' },
      { value: 'Real-Time', label: 'queue & referral tracking' },
      { value: 'Multi-Role', label: 'dashboards for patients & workers' },
      { value: 'Automated', label: 'facility discovery via SerpApi' },
    ],
    palette: { from: '#021a1f', via: '#064957', to: '#020d11', accent: '#2ee59d' },
    motif: 'shield',
  },
  {
    id: 'minivyapar',
    title: 'MiniVyapar',
    year: '2025',
    genre: 'Mobile App • React Native • Fintech',
    logline: 'Smart mobile business management app for small businesses and local merchants with instant barcode billing.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Camera'],
    build: [
      'Architected a mobile-first business management application empowering local retail merchants to digitize daily operations and sales.',
      'Integrated camera-based barcode scanning using Expo Camera for instant item lookup and high-speed bill creation.',
      'Built product inventory management, invoice generation, payment workflows, and mobile-optimized interfaces.',
    ],
    features: [
      'Product catalog and inventory management',
      'Fast invoice & bill creation workflows',
      'Instant barcode scanning with Expo Camera',
      'Payment record tracking & transaction history',
      'Mobile-first, touch-optimized user experience',
    ],
    metrics: [
      { value: '< 2s', label: 'barcode scan-to-cart' },
      { value: 'Mobile-First', label: 'built with React Native & Expo' },
      { value: '100%', label: 'offline-friendly local commerce' },
      { value: 'Instant', label: 'invoice generation' },
    ],
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'sanika-garments',
    title: 'Sanika Garments',
    year: '2025',
    genre: 'E-Commerce • Next.js • Supabase',
    logline: 'A modern e-commerce platform for women’s fashion enterprise featuring custom cart, admin portal, and WhatsApp outreach.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    build: [
      'Engineered a complete commercial web store for Sanika Garments (Barshi, MH) featuring modern aesthetics and responsive product collections.',
      'Implemented customer authentication, reactive shopping cart state, dynamic search filters, and an admin management suite.',
      'Connected Supabase for real-time inventory and image management, and integrated direct WhatsApp customer sales communication.',
    ],
    features: [
      'Premium fashion-focused responsive design',
      'Product categories, collections & live search',
      'Shopping cart & customer account authentication',
      'Admin dashboard for real-time product & image management',
      'Direct WhatsApp customer communication channel',
    ],
    metrics: [
      { value: 'Next.js', label: 'server-side rendered performance' },
      { value: 'Supabase', label: 'real-time database & auth' },
      { value: 'Direct', label: 'WhatsApp commerce integration' },
      { value: '100%', label: 'responsive across mobile & desktop' },
    ],
    palette: { from: '#240615', via: '#73144a', to: '#090408', accent: '#ff5ea7' },
    motif: 'tenants',
  },
  {
    id: 'weblead-ai',
    title: 'WebLead AI',
    year: '2025',
    genre: 'AI • Lead Gen • Automation',
    logline: 'AI-assisted client discovery and automated multi-channel outreach engine for freelance developers and digital agencies.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Gemini AI', 'SerpApi'],
    build: [
      'Engineered an intelligent business discovery platform helping digital agencies pinpoint high-intent local business clients.',
      'Integrated location-based and category-based discovery APIs with automated business metadata retrieval.',
      'Built AI-assisted email and WhatsApp outreach sequencing with human-in-the-loop manual approval checkpoints.',
    ],
    features: [
      'Location & category-based prospective business discovery',
      'Automated business data retrieval & enrichment',
      'AI-drafted email and WhatsApp outreach sequences',
      'Manual approval checkpoints before sending outreach',
      'Supabase pipeline management dashboard',
    ],
    metrics: [
      { value: 'AI-Powered', label: 'lead discovery & enrichment' },
      { value: 'Dual-Channel', label: 'Email & WhatsApp outreach' },
      { value: 'Zero-Spam', label: 'human-in-the-loop approval' },
      { value: '10x Faster', label: 'agency prospect qualification' },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'flow',
  },
]);

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = getStored('achievements', [
  {
    id: 'nexus-founder',
    title: 'Agency Founder',
    org: 'Nexus Technology',
    detail: 'Founded digital solutions agency delivering modern web development, e-commerce, and tech-driven business solutions for commercial clients.',
    laurel: 'Founder & Lead',
  },
  {
    id: 'carenexus-lead',
    title: 'HealthTech Platform',
    org: 'CareNexus',
    detail: 'Architected full-featured healthcare coordination platform uniting patients, healthcare workers, and facilities with smart dashboards.',
    laurel: 'Project Lead',
  },
  {
    id: 'sanika-ecommerce',
    title: 'Commercial E-Commerce',
    org: 'Sanika Garments',
    detail: 'Engineered complete fashion e-commerce storefront with Supabase database and administrative management system.',
    laurel: 'Client Project',
  },
  {
    id: 'minivyapar-app',
    title: 'Mobile App Developer',
    org: 'MiniVyapar',
    detail: 'Designed React Native & Expo business mobile app featuring instant camera barcode scanning and rapid billing.',
    laurel: 'Mobile Innovation',
  },
  {
    id: 'weblead-automation',
    title: 'AI Solutions Architect',
    org: 'WebLead AI & n8n',
    detail: 'Engineered AI-assisted lead discovery pipelines and automated multi-channel outreach workflows powered by Google Gemini.',
    laurel: 'AI & Automation',
  },
]);

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'NIAT / SGU', name: 'B.Tech in Artificial Intelligence & Data Science', link: '#' },
  { issuer: 'Nexus Technology', name: 'Agency Founder & Full-Stack Solutions Lead', link: '#' },
  { issuer: 'Google', name: 'Google Gemini & AI API Integration', link: '#' },
  { issuer: 'React / Next', name: 'Next.js & React Full-Stack Architecture', link: '#' },
  { issuer: 'React Native', name: 'Mobile App Development with Expo', link: '#' },
  { issuer: 'Automation', name: 'n8n Workflow Automation & Webhooks', link: '#' },
  { issuer: 'Supabase', name: 'Relational Database & Authentication Integration', link: '#' },
  { issuer: 'Git', name: 'Version Control & Collaborative Engineering', link: '#' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = getStored('skillCategories', [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Modern interfaces & motion',
    skills: [
      { name: 'React.js', mono: 'Re', note: 'Primary' },
      { name: 'Next.js', mono: 'Nx', note: 'SSR / Full-Stack' },
      { name: 'JavaScript', mono: 'Js', note: 'ES6+' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'Tailwind CSS', mono: 'Tw' },
      { name: 'HTML5 & CSS3', mono: 'Wb' },
      { name: 'Vite', mono: 'Vt' },
      { name: 'GSAP', mono: 'Gs', note: 'Animation' },
      { name: 'Framer Motion', mono: 'Fm', note: 'Interactions' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Server logic & integrations',
    skills: [
      { name: 'Node.js', mono: 'No', note: 'Runtime' },
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'Server-Side Dev', mono: 'Sr' },
      { name: 'API Integration', mono: 'In' },
    ],
  },
  {
    id: 'database',
    title: 'Databases & BaaS',
    subtitle: 'Data layer & storage',
    skills: [
      { name: 'Supabase', mono: 'Sb', note: 'Primary BaaS' },
      { name: 'SQL', mono: 'Sq' },
      { name: 'Database Integration', mono: 'Db' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App Dev',
    subtitle: 'Cross-platform mobile apps',
    skills: [
      { name: 'React Native', mono: 'Rn', note: 'Mobile' },
      { name: 'Expo', mono: 'Ex', note: 'Toolchain' },
      { name: 'Expo Camera', mono: 'Cm', note: 'Barcode Scan' },
      { name: 'TypeScript', mono: 'Ts' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Intelligent systems & workflows',
    skills: [
      { name: 'Google Gemini', mono: 'Gm', note: 'LLM & AI' },
      { name: 'AI API Integration', mono: 'Ai' },
      { name: 'n8n Automation', mono: 'N8', note: 'Workflows' },
      { name: 'SerpApi', mono: 'Sp', note: 'Search APIs' },
      { name: 'Data Retrieval', mono: 'Dr' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    subtitle: 'Development environment',
    skills: [
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub', mono: 'Gh' },
      { name: 'VS Code', mono: 'Vc' },
      { name: 'Antigravity', mono: 'Ag', note: 'AI Assistant' },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    subtitle: 'Active domains & frontiers',
    skills: [
      { name: 'Full-Stack Web Dev', mono: 'Fs' },
      { name: 'Mobile App Dev', mono: 'Mo' },
      { name: 'Artificial Intelligence', mono: 'Ai' },
      { name: 'SaaS Products', mono: 'Sa' },
      { name: 'Workflow Automation', mono: 'Wa' },
      { name: 'Entrepreneurship', mono: 'En' },
    ],
  },
]);

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears across projects, experience or agency work.
 */
export const skillEvidence: Record<string, string[]> = {
  'React.js': ['CareNexus', 'Sanika Garments', 'WebLead AI', 'Nexus Technology'],
  'Next.js': ['Sanika Garments', 'Nexus Technology'],
  JavaScript: ['CareNexus', 'WebLead AI'],
  TypeScript: ['MiniVyapar', 'WebLead AI'],
  'Tailwind CSS': ['Sanika Garments', 'WebLead AI', 'Nexus Technology'],
  'HTML5 & CSS3': ['Sanika Garments', 'Nexus Technology'],
  Vite: ['WebLead AI', 'Nexus Technology'],
  GSAP: ['Interactive UI Showcases'],
  'Framer Motion': ['Portfolio Series', 'Interactive UI Showcases'],
  'Node.js': ['CareNexus', 'Nexus Technology Backend'],
  'REST APIs': ['CareNexus', 'WebLead AI', 'SerpApi Integration'],
  'Server-Side Dev': ['CareNexus', 'Sanika Garments'],
  'API Integration': ['CareNexus', 'WebLead AI', 'MiniVyapar'],
  Supabase: ['Sanika Garments', 'WebLead AI', 'Nexus Technology'],
  SQL: ['Sanika Garments', 'Database Queries'],
  'Database Integration': ['CareNexus', 'Sanika Garments'],
  'React Native': ['MiniVyapar'],
  Expo: ['MiniVyapar'],
  'Expo Camera': ['MiniVyapar Barcode Billing'],
  'Google Gemini': ['WebLead AI Outreach Engine'],
  'AI API Integration': ['WebLead AI', 'Intelligent Workflows'],
  'n8n Automation': ['Nexus Automated Outreach & Workflows'],
  SerpApi: ['CareNexus Facility Discovery', 'WebLead AI'],
  'Data Retrieval': ['CareNexus', 'WebLead AI'],
  Git: ['CareNexus', 'MiniVyapar', 'Sanika Garments', 'WebLead AI'],
  GitHub: ['Nexus Technology Code Repositories'],
  'VS Code': ['Primary IDE across all projects'],
  Antigravity: ['AI Pair Programming & Architecture'],
  'Full-Stack Web Dev': ['Sanika Garments', 'CareNexus', 'WebLead AI'],
  'Mobile App Dev': ['MiniVyapar'],
  'Artificial Intelligence': ['CareNexus', 'WebLead AI', 'B.Tech AI & DS'],
  'SaaS Products': ['WebLead AI', 'CareNexus'],
  'Workflow Automation': ['n8n Workflows', 'WebLead AI'],
  Entrepreneurship: ['Founder of Nexus Technology'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: '2024',
    synopsis: 'Starting the engineering journey in Artificial Intelligence & Data Science at NIAT, Sanjay Ghodawat University (SGU), Kolhapur.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Enter: AI & Data Science',
        description: 'B.Tech in Artificial Intelligence & Data Science at NIAT at SGU, Kolhapur — diving into core computational mathematics and programming.',
        tags: ['B.Tech', 'AI & DS', 'NIAT at SGU'],
        runtime: '2024 – Present',
        palette: violet,
      },
      {
        code: 'S01 E02',
        title: 'The Web Canvas',
        description: 'Mastering modern JavaScript, React.js, Tailwind CSS, and interactive UI motion with GSAP and Framer Motion.',
        tags: ['React', 'JavaScript', 'Tailwind', 'GSAP'],
        runtime: 'Frontend Focus',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Mobile & Backend Systems',
    period: '2024 – 2025',
    synopsis: 'Expanding from the browser into native mobile apps and server-side backend logic with Node.js and Supabase.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Mobile Merchant',
        description: 'Building MiniVyapar with React Native & Expo — adding camera barcode scanning to empower local business billing.',
        tags: ['React Native', 'Expo', 'Barcode Scanner'],
        runtime: 'MiniVyapar',
        palette: amber,
      },
      {
        code: 'S02 E02',
        title: 'Server & Relational Foundations',
        description: 'Engineering Node.js REST APIs and integrating Supabase SQL for persistent, real-time cloud data pipelines.',
        tags: ['Node.js', 'REST APIs', 'Supabase', 'SQL'],
        runtime: 'Backend Stack',
        palette: ocean,
      },
    ],
  },
  {
    number: 3,
    title: 'The Entrepreneur: Nexus Technology',
    period: '2024 – Present',
    synopsis: 'Founding Nexus Technology to empower businesses with digital presence, modern web stores, and custom technology solutions.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Nexus Genesis',
        description: 'Launching Nexus Technology — a digital solutions agency delivering responsive websites, e-commerce, and tech infrastructure.',
        tags: ['Nexus Technology', 'Agency', 'Founder'],
        runtime: '2024 – Present',
        palette: crimson,
      },
      {
        code: 'S03 E02',
        title: 'The Fashion Storefront',
        description: 'Sanika Garments: Delivering a complete commercial fashion e-commerce platform with Supabase backend and WhatsApp integration.',
        tags: ['Next.js', 'E-Commerce', 'Supabase', 'WhatsApp'],
        runtime: 'Client Project',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'AI & Autonomous Workflows',
    period: '2025 – Present',
    synopsis: 'Integrating Google Gemini LLM, SerpApi, and n8n workflow automation into production platforms.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'Smart Healthcare: CareNexus',
        description: 'CareNexus — coordinating patients, health workers, and medical facilities with intelligent scheduling and automated discovery.',
        tags: ['HealthTech', 'SerpApi', 'Node.js', 'Coordination'],
        runtime: 'CareNexus',
        palette: jade,
      },
      {
        code: 'S04 E02',
        title: 'The Outreach Engine: WebLead AI',
        description: 'WebLead AI — automated prospective business discovery and AI-assisted outreach with manual approval safeguards.',
        tags: ['Gemini AI', 'Automation', 'n8n', 'Lead Gen'],
        runtime: 'WebLead AI',
        palette: ocean,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Building scalable SaaS products, expanding Nexus Technology, and transforming bold ideas into reality.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'Building the Future',
        description: 'Architecting multi-tenant SaaS platforms, deeper AI agent workflows, and innovative mobile products.',
        tags: ['SaaS', 'AI Agents', 'Automation', 'Nexus'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary Stack', title: 'Full-Stack & Mobile', detail: 'React, Next.js, Node.js & React Native', palette: amber },
  { label: 'The Healthcare Original', title: 'CareNexus', detail: 'Smart Healthcare Coordination Platform', palette: jade },
  { label: 'Agency Milestone', title: 'Nexus Technology', detail: 'Founder & Technical Lead', palette: crimson },
  { label: 'Mobile Innovation', title: 'MiniVyapar', detail: 'Instant Barcode Camera Billing with Expo', palette: amber },
  { label: 'Commercial E-Commerce', title: 'Sanika Garments', detail: 'Modern Fashion Store with Supabase', palette: violet },
  { label: 'AI Lead Generation', title: 'WebLead AI', detail: 'Powered by Gemini AI & SerpApi', palette: ocean },
  { label: 'Automation Hub', title: 'n8n & REST APIs', detail: 'Multi-Channel Outreach & Webhooks', palette: jade },
  { label: 'Academic Foundation', title: 'NIAT at SGU', detail: 'B.Tech in Artificial Intelligence & Data Science', palette: violet },
  { label: 'Motion & UX', title: 'GSAP & Framer Motion', detail: 'Cinematic interactions & fluid web animations', palette: crimson },
  { label: 'Current Mission', title: 'Scalable SaaS Products', detail: 'Turning ambitious ideas into market-ready products', palette: ocean },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · AI & Data Science',
    lines: ['NIAT at Sanjay Ghodawat University (SGU), Kolhapur', 'First-Year Engineering · 2024 – Present'],
    chips: ['AI & DS', 'Engineering'],
  },
  {
    kicker: 'Entrepreneurship',
    title: 'Founder · Nexus Technology',
    lines: ['Digital Solutions & Web Development Agency', 'Modern Websites · E-Commerce · Tech Infrastructure', 'Empowering businesses with custom digital products'],
    chips: ['Agency Founder', 'Tech Lead'],
  },
  {
    kicker: 'Projects',
    title: 'Four Originals',
    lines: [
      'CareNexus — Smart Healthcare Coordination Platform',
      'MiniVyapar — Mobile Business App with Barcode Billing',
      'Sanika Garments — Modern E-Commerce Web Platform',
      'WebLead AI — AI-Assisted Business Lead Discovery',
    ],
    chips: ['CareNexus', 'MiniVyapar', 'Sanika Garments', 'WebLead AI'],
  },
  {
    kicker: 'Technical Arsenal',
    title: 'Web, Mobile & AI Stack',
    lines: [
      'React.js · Next.js · React Native · Expo · TypeScript',
      'Node.js · REST APIs · Supabase · SQL · Tailwind CSS',
    ],
    chips: ['React', 'Next.js', 'React Native', 'Node.js', 'Supabase', 'Tailwind'],
  },
  {
    kicker: 'Automation',
    title: 'Intelligent Workflows',
    lines: ['Google Gemini AI · n8n Workflow Automation', 'SerpApi Integration · Automated Data Retrieval'],
    chips: ['Gemini AI', 'n8n', 'SerpApi', 'Automation'],
  },
  {
    kicker: 'Vision',
    title: 'Building the Future',
    lines: [
      'Building Ideas. Creating Solutions. Developing the Future.',
      'Combining software engineering, AI, and entrepreneurship to create real-world impact.',
    ],
  },
];

export type ProfileId = 'rutvek' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'rutvek',
    name: 'Rutvek',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & Agency', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2025`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 Highlights', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Credentials`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Profile • View & download', palette: violet },
};
