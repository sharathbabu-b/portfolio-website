// Personal details, taken from the resume.
// A value starting with "[" is treated as an unfinished placeholder and is
// rendered with a dashed style (none are used right now).

export const profile = {
  name: 'BOYA SHARATH BABU',
  logo: 'BOYA SHARATH BABU',
  title: 'MERN Full Stack Developer.',
  tagline: 'I build reliable, user-focused web applications with React, Node.js, Express, and MongoDB.',
  intro:
    'I contribute to SaaS and CRM platforms, building responsive interfaces and dependable APIs.',
  experienceYears: '1.5+',
  location: 'Bengaluru, Karnataka, India',

  // The resume PDF lives in /public.
  resumeUrl: '/Boya_Sharathbabu_Resume.pdf',
  resumeFileName: 'Boya_Sharathbabu_Resume.pdf',

  email: 'bsharathbabu2000@gmail.com',
  phone: '+91 8106405808',
  contactLocation: 'Bengaluru, Karnataka, India',

  socials: {
    github: 'https://github.com/sharathbabu-b',
    linkedin: 'https://www.linkedin.com/in/boya-sharathbabu-45052a242',
  },

  // Optional photo: put an image in /public and set e.g. '/profile.jpg'.
  photo: '/profile.png',

  summary: [
    'MERN Stack Developer with 1.5+ years of hands-on experience building and maintaining full-stack web applications with React.js, Node.js, Express.js and MongoDB.',
    'I am strong in JavaScript (ES6+), React components, hooks and Redux state management, RESTful APIs, asynchronous programming, JWT authentication and Git. I am experienced in debugging, performance improvement and code reviews in Agile teams, with the ability to own modules end to end.',
    'At Hirola Infotech Solutions I worked on two multi-tenant SaaS platforms, HXM and CXM. I am a quick, self-driven learner who enjoys picking up new tools and frameworks.',
  ],

  aboutHighlights: [
    { label: 'Experience', value: '1.5+ Years' },
    { label: 'Focus', value: 'MERN Stack' },
    { label: 'Built', value: 'SaaS & CRM' },
  ],

  aboutFocus: [
    {
      icon: 'Layout',
      title: 'Frontend',
      text: 'React.js, Redux and Tailwind CSS, turning Figma designs into mobile-first interfaces.',
    },
    {
      icon: 'Server',
      title: 'Backend & APIs',
      text: 'Node.js, Express.js and REST APIs with JWT authentication and role-based access control.',
    },
    {
      icon: 'Database',
      title: 'Database',
      text: 'MongoDB with Mongoose data modelling and validated requests.',
    },
    {
      icon: 'Users',
      title: 'Teamwork',
      text: 'Agile sprints and code reviews with designers and backend engineers.',
    },
  ],
}

export const isPlaceholder = (value) =>
  typeof value === 'string' && value.trim().startsWith('[')
