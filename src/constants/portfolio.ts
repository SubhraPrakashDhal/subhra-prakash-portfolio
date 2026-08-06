import subhraResume from '../assets/Subhra_React_Developer_resume.pdf';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud';
  tags: string[];
  techStack: string[];
  image: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  metrics?: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; iconName: string; desc?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
  description: string;
  achievements: string[];
  technologies: string[];
  logoText: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Award' | 'Certification' | 'Hackathon' | 'Publication';
  description: string;
  badge: string;
  link?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: 'Subhra Prakash Dhal',
  initials: 'SPD',
  tagline: 'Frontend Developer | UI/UX Developer | MERN Stack Developer',
  roles: [
    'Frontend Developer',
    'UI/UX Developer',
    'MERN Stack Developer',
  ],
  bio: `I am a passionate Frontend & UI/UX Developer with hands-on experience building scalable, responsive, and user-centric web applications. I specialize in React.js, TypeScript, Tailwind CSS, and the MERN stack. I enjoy transforming complex business requirements into intuitive digital experiences with clean architecture, reusable components, and high-performance interfaces.

I have worked on enterprise dashboards, AI-powered e-commerce platforms, real estate platforms, asset management systems, and social networking applications. I continuously learn modern technologies and strive to build impactful software that solves real-world problems.`,
  shortBio: `Passionate Frontend & UI/UX Developer specializing in React.js, TypeScript, Tailwind CSS, and the MERN stack. Building scalable, user-centric web products.`,
  experienceYears: 1, // 6+ Months Professional Experience + 3 Internships
  projectsCompleted: 4,
  githubCommits: 1000,
  coffeeCups: '∞',
  location: 'Badamba, Cuttack, Odisha, India',
  email: 'subhraprakashdhal1@gmail.com',
  phone: '+91 9827765986',
  availableForFreelance: true,
  socials: {
    github: 'https://github.com/SubhraPrakashDhal',
    linkedin: 'https://www.linkedin.com/in/subhra-prakash-dhal',
    twitter: 'https://x.com',
    instagram: 'https://www.instagram.com/__subhra_prakash__',
    leetcode: 'https://leetcode.com',
  },
  resumeUrl: subhraResume,
};

export const PROJECTS: Project[] = [
  {
    id: 'retail-ai-ecommerce',
    title: 'Retail AI E-Commerce Platform',
    subtitle: 'AI-Powered Enterprise Commerce & Management Suite',
    description: 'An AI-powered enterprise e-commerce platform built using the MERN stack featuring advanced product management, intelligent search, inventory control, SKU management, pricing engine, GST calculation, analytics dashboard, order management, campaign management, customer management, and responsive admin dashboards.',
    longDescription: 'An AI-powered enterprise e-commerce platform built using the MERN stack featuring advanced product management, intelligent search, inventory management, SKU management, pricing engine, GST calculation, analytics dashboard, order management, campaign management, customer management, and responsive admin dashboards.',
    category: 'Full Stack',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT', 'Axios'],
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication', 'Axios'],
    image: 'https://media.assettype.com/outlookbusiness/2024-11-12/qayaup62/ecommerce.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    metrics: 'AI Product Search & GST Engine',
    highlights: [
      'AI-powered product management, intelligent search & SKU system',
      'Inventory monitoring, variant management & GST pricing engine',
      'Campaign management, order processing & customer analytics dashboard',
      'Responsive admin panel with secure JWT authentication',
    ],
  },
  {
    id: 'smart-lab-asset-management',
    title: 'Smart Lab & Asset Management System',
    subtitle: 'Enterprise Laboratory & Equipment Tracking Dashboard',
    description: 'Developed a comprehensive laboratory and asset management system for efficiently tracking laboratory equipment, assets, maintenance records, inventory, and user activities through an intuitive dashboard.',
    longDescription: 'Developed a comprehensive laboratory and asset management system for efficiently tracking laboratory equipment, assets, maintenance records, inventory, and user activities through an intuitive dashboard.',
    category: 'Frontend',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Axios'],
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Axios'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    metrics: 'Comprehensive Asset Tracking',
    highlights: [
      'Asset management & real-time laboratory equipment tracking',
      'Dashboard analytics & maintenance records monitoring',
      'Responsive modern admin UI with search and filtering',
    ],
  },
  {
    id: 'real-estate-website',
    title: 'Real Estate Platform',
    subtitle: 'Property Listings & Search Experience',
    description: 'Designed and developed a modern real estate platform featuring property listings, advanced search, property details, responsive layouts, contact forms, and premium user experience.',
    longDescription: 'Designed and developed a modern real estate platform featuring property listings, advanced search, property details, responsive layouts, contact forms, and premium user experience.',
    category: 'Frontend',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    techStack: ['React.js', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    metrics: 'Advanced Property Search',
    highlights: [
      'Property listings with detailed property view pages',
      'Advanced search & custom parameter filtering',
      'Responsive design, premium UI & interactive contact system',
    ],
  },
  {
    id: 'social-x-app',
    title: 'Social X',
    subtitle: 'Modern Social Networking & Community Platform',
    description: 'A modern social networking application where users can connect, create posts, interact with content, and engage through a responsive and user-friendly interface.',
    longDescription: 'A modern social networking application where users can connect, create posts, interact with content, and engage through a responsive and user-friendly interface.',
    category: 'Full Stack',
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    techStack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=650&q=70&fm=webp',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    metrics: 'Interactive Social Feed System',
    highlights: [
      'User authentication & profile management via JWT',
      'Create posts, interact with content & dynamic feed system',
      'Responsive user interface optimized for social engagement',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 95, iconName: 'SiReact', desc: 'Component architecture, Hooks, Context API, React Router' },
      { name: 'TypeScript', level: 90, iconName: 'SiTypescript', desc: 'Typed interfaces, Generics, Component props' },
      { name: 'JavaScript (ES6+)', level: 95, iconName: 'SiJavascript', desc: 'Async/Await, DOM manipulation, ESNext features' },
      { name: 'Tailwind CSS', level: 96, iconName: 'SiTailwindcss', desc: 'Utility classes, Design tokens, Responsive design' },
      { name: 'HTML5 & CSS3', level: 98, iconName: 'SiHtml5', desc: 'Semantic HTML, Flexbox, CSS Grid, Media queries' },
      { name: 'Redux Toolkit / Axios', level: 88, iconName: 'SiRedux', desc: 'State management, API integration, Interceptors' },
      { name: 'Bootstrap & Material UI', level: 85, iconName: 'SiBootstrap', desc: 'Component styling, Pre-built UI frameworks' },
      { name: 'Framer Motion & GSAP', level: 88, iconName: 'SiFramer', desc: 'Scroll animations, Micro-interactions, Recharts' },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 88, iconName: 'SiNodedotjs', desc: 'Runtime environment, Server architecture' },
      { name: 'Express.js', level: 90, iconName: 'SiExpress', desc: 'REST API routing, Middleware, Controller logic' },
      { name: 'REST APIs & Integration', level: 92, iconName: 'SiPostman', desc: 'Endpoint design, JSON payloads, CRUD operations' },
      { name: 'JWT & Authentication', level: 88, iconName: 'SiJsonwebtokens', desc: 'Authentication, Authorization, Secure routes' },
    ],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 90, iconName: 'SiMongodb', desc: 'NoSQL document storage, Atlas cloud DB' },
      { name: 'Mongoose', level: 90, iconName: 'SiMongodb', desc: 'Schema validation, Data modeling, Querying' },
    ],
  },
  {
    title: 'Tools & Workflows',
    icon: 'Cloud',
    skills: [
      { name: 'Git & GitHub', level: 92, iconName: 'SiGithub', desc: 'Version control, Branching, Pull requests' },
      { name: 'VS Code & Vite', level: 95, iconName: 'SiVite', desc: 'Dev environment, Build tooling, HMR' },
      { name: 'Postman & npm', level: 90, iconName: 'SiPostman', desc: 'API testing, Package management' },
    ],
  },
  {
    title: 'Additional Skills',
    icon: 'Sparkles',
    skills: [
      { name: 'Responsive Web Design', level: 98, iconName: 'SiLayout', desc: 'Mobile-first layouts across all screen sizes' },
      { name: 'Dashboard & Admin Panels', level: 94, iconName: 'SiDashboard', desc: 'Complex enterprise metrics & tracking panels' },
      { name: 'UI/UX Design Principles', level: 92, iconName: 'SiFigma', desc: 'User-centric interfaces, Clean UX patterns' },
      { name: 'Component Architecture', level: 95, iconName: 'SiCode', desc: 'Reusable, modular & scalable React code' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Frontend & UI/UX Developer',
    company: 'Mindbrain Innovation Pvt. Ltd.',
    location: 'India',
    period: 'January 2026 – Present',
    type: 'Full-time',
    description: 'Developing enterprise web applications, modern UI/UX design systems, and scalable React components integrated with backend REST APIs.',
    achievements: [
      'Develop responsive web applications using React.js and TypeScript.',
      'Design modern and intuitive user interfaces for enterprise dashboards.',
      'Build reusable and scalable React components integrated with REST APIs.',
      'Optimize application performance, user experience, and modern UI/UX principles.',
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Dashboard Dev', 'UI/UX Design'],
    logoText: 'MIPL',
  },
  {
    id: 'exp-qspiders',
    role: 'MERN Full Stack Developer Course',
    company: 'Qspiders',
    location: 'India',
    period: 'July 2025 – December 2025',
    type: 'Full-time',
    description: 'Completed an intensive 6-month MERN Full Stack Development course covering React.js, Node.js, Express.js, MongoDB, REST APIs, JavaScript (ES6+), and enterprise web project development.',
    achievements: [
      'Mastered core MERN stack architecture (MongoDB, Express, React, Node.js).',
      'Developed full-stack web applications with REST APIs, authentication, and database modeling.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'REST APIs'],
    logoText: 'QSP',
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer Intern',
    company: 'Mindbrain Innovation Pvt. Ltd.',
    location: 'India',
    period: '2025',
    type: 'Internship',
    description: 'Worked on React.js applications, UI development, REST API integration, responsive layouts, reusable components, and dashboard development.',
    achievements: [
      'Implemented responsive React.js layouts and reusable components.',
      'Integrated REST APIs for dynamic dashboard interface rendering.',
    ],
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Dashboard Dev'],
    logoText: 'MIPL',
  },
  {
    id: 'exp-3',
    role: 'Software Development Intern',
    company: 'Central Tool Room & Training Centre (CTTC)',
    location: 'Bhubaneswar, India',
    period: '2025',
    type: 'Internship',
    description: 'Worked on enterprise web application development, frontend implementation, API integration, and responsive dashboard interfaces.',
    achievements: [
      'Developed enterprise web application frontends and API integrations.',
      'Built responsive dashboard interfaces for internal training software.',
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
    logoText: 'CTTC',
  },
  {
    id: 'exp-4',
    role: 'Web Development Internship',
    company: 'Web Development Training',
    location: 'India',
    period: '2024',
    type: 'Internship',
    description: 'Completed training in frontend development, JavaScript, React, responsive design, and modern web technologies while developing practical projects.',
    achievements: [
      'Mastered core frontend concepts including ES6+, React hooks, and CSS flexbox/grid.',
      'Built practical project applications using component-based architecture.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Git'],
    logoText: 'WDT',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    subtitle: 'Modern & High-Performance Web Applications',
    description: 'Building scalable, high-performance web applications using React.js, TypeScript, and modern JavaScript with clean component architecture.',
    icon: 'Code2',
    features: ['React.js & TypeScript Architecture', 'Component-Based Development', 'State Management (Redux/Context)', 'Clean & Maintainable Code'],
    deliverables: ['Production-ready codebase', 'Reusable component suite', 'API integration', 'Optimized build'],
  },
  {
    id: 'react-dev',
    title: 'React.js Development',
    subtitle: 'Custom React Web Solutions',
    description: 'Crafting dynamic single-page applications (SPAs) and interactive web features powered by React 19, hooks, and modular UI workflows.',
    icon: 'Sparkles',
    features: ['Custom React Hooks & Logic', 'React Router Single Page Apps', 'Context API & Redux Toolkit', 'Axios Data Fetching'],
    deliverables: ['Responsive React app', 'Custom state pipelines', 'Router navigation setup', 'Quality testing'],
  },
  {
    id: 'ui-ux-dev',
    title: 'UI/UX Development',
    subtitle: 'User-Centric & Aesthetic Interfaces',
    description: 'Transforming complex business requirements and design concepts into intuitive, user-friendly digital experiences with modern aesthetics.',
    icon: 'Palette',
    features: ['Modern UI Design Principles', 'Tailwind CSS Utility Systems', 'Framer Motion & GSAP Animations', 'Micro-interactions'],
    deliverables: ['Pixel-perfect UI', 'Smooth animations', 'Accessibility compliance', 'Design system alignment'],
  },
  {
    id: 'dashboard-dev',
    title: 'Dashboard Development',
    subtitle: 'Enterprise Analytics & Management Systems',
    description: 'Developing data-rich enterprise dashboards and monitoring systems with real-time metrics, interactive charts, search, and filtering.',
    icon: 'BarChart3',
    features: ['Recharts & Chart Visualizations', 'Real-time Metrics Tracking', 'Search & Custom Filtering', 'Role-based Views'],
    deliverables: ['Interactive dashboard UI', 'Data visualization widgets', 'Export capabilities', 'Filter tools'],
  },
  {
    id: 'responsive-dev',
    title: 'Responsive Website Development',
    subtitle: 'Flawless Across Mobile, Tablet & Desktop',
    description: 'Ensuring every layout adapts seamlessly across all viewports and touch devices with zero layout shift and touch optimization.',
    icon: 'Smartphone',
    features: ['Mobile-First CSS Architecture', 'Flexible Grid & Flexbox Layouts', 'Touch Gesture Support', 'Cross-Browser Compatibility'],
    deliverables: ['Responsive multi-device layout', 'Breakpoints CSS configuration', 'Touch controls', 'Device test suite'],
  },
  {
    id: 'admin-panel-dev',
    title: 'Admin Panel Development',
    subtitle: 'Robust Control & Management Panels',
    description: 'Designing intuitive admin dashboards for e-commerce, inventory, user management, SKU control, and business analytics.',
    icon: 'Server',
    features: ['CRUD Data Management', 'User Activity Tracking', 'Inventory & SKU Management', 'Secure Auth Integration'],
    deliverables: ['Complete admin interface', 'Form validation suite', 'Data tables & filters', 'Role controls'],
  },
  {
    id: 'rest-api-integration',
    title: 'REST API Integration',
    subtitle: 'Seamless Data Pipelines & Async State',
    description: 'Connecting frontend interfaces with backend RESTful web services, handling authentication tokens, and async state mapping.',
    icon: 'Cpu',
    features: ['Axios HTTP Client Setup', 'Async/Await Data Handling', 'JWT Token Storage', 'Error Boundary Handling'],
    deliverables: ['Integrated API endpoints', 'Async loading states', 'Error toast notifications', 'Type-safe responses'],
  },
  {
    id: 'mern-stack-dev',
    title: 'MERN Stack Development',
    subtitle: 'Full-Stack Enterprise Applications',
    description: 'Full-stack application engineering leveraging MongoDB, Express.js, React.js, and Node.js for end-to-end web products.',
    icon: 'Code2',
    features: ['MongoDB & Mongoose Schema', 'Express REST API Gateways', 'React Frontend UI', 'Node.js Backend Logic'],
    deliverables: ['Full MERN application', 'Database configuration', 'REST endpoints', 'Deployment setup'],
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    subtitle: 'Modernizing Legacy Web Applications',
    description: 'Refactoring and upgrading outdated web interfaces to modern Tailwind CSS and React standards for superior UX and speed.',
    icon: 'Zap',
    features: ['Modern UI/UX Refactoring', 'Legacy Code Cleanup', 'Performance Optimization', 'Responsive Overhaul'],
    deliverables: ['Modernized codebase', 'Enhanced UX design', 'Improved Lighthouse score', 'Mobile support'],
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    subtitle: 'Sub-Second Speeds & Smooth Rendering',
    description: 'Optimizing React component rendering, eliminating unnecessary re-renders, compressing assets, and boosting Lighthouse scores.',
    icon: 'Zap',
    features: ['Code Splitting & Lazy Loading', '60 FPS Motion GPU Acceleration', 'Asset Compression', 'Lighthouse Audit'],
    deliverables: ['Optimization report', 'Faster load times', 'Smoother animations', 'Clean bundle sizes'],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Enterprise MERN Applications',
    issuer: 'Mindbrain Innovation / Projects',
    date: '2026',
    category: 'Award',
    description: 'Built enterprise-level MERN applications including AI-powered retail e-commerce and social networking platforms.',
    badge: 'Enterprise MERN',
  },
  {
    id: 'ach-qspiders',
    title: 'MERN Full Stack Course',
    issuer: 'Qspiders',
    date: 'July 2025 - Dec 2025',
    category: 'Certification',
    description: 'Completed 6-month intensive MERN Full Stack Development course at Qspiders covering React.js, Node.js, Express.js, MongoDB, and REST APIs.',
    badge: 'Qspiders MERN',
  },
  {
    id: 'ach-3',
    title: 'Modern Dashboard Interfaces',
    issuer: 'Laboratory & Asset Systems',
    date: '2025',
    category: 'Award',
    description: 'Designed and developed modern dashboard interfaces for smart laboratory asset tracking and business telemetry.',
    badge: 'Dashboard UX',
  },
  {
    id: 'ach-4',
    title: '10+ Software Development Internships & Projects',
    issuer: 'Mindbrain Innovation, CTTC & Industry',
    date: '2024 - 2026',
    category: 'Award',
    description: 'Successfully completed 10+ software development internships, projects, and practical training modules spanning frontend React engineering and MERN full stack architecture.',
    badge: '10+ Internships',
  },
  {
    id: 'ach-5',
    title: '2 NPTEL Certifications',
    issuer: 'NPTEL / IIT',
    date: '2024 - 2025',
    category: 'Certification',
    description: 'Successfully completed two NPTEL certification courses demonstrating continuous learning and technical excellence in Computer Science.',
    badge: '2 NPTEL Certs',
  },
  {
    id: 'ach-6',
    title: 'Scalable Component Architecture',
    issuer: 'Production Web Systems',
    date: '2026',
    category: 'Award',
    description: 'Built scalable and reusable React component architectures powering production enterprise web applications.',
    badge: 'React Architecture',
  },
];

export const CODING_STATS = {
  internships: '10+',
  majorProjects: '4+',
  nptelCerts: '2',
  experienceMonths: '6+',
  builtInterfaces: '20+',
  devHours: '1000+',
};
