module.exports = {
  siteTitle: 'Kevin Xu Personal Website',
  siteDescription: 'Learn more about Kevin Xu',
  siteKeywords: 'Kevin Xu',
  siteUrl: 'https://xukevin.me',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-169226460-1',
  googleVerification: 'yHnLmnUcQLpK-oL6VrCRAe3Qee2gtiSJYGZLDzKmtyw',
  name: 'Kevin Xu',
  location: 'Sunnyvale, CA',
  email: 'xukevinwork@gmail.com',
  github: 'https://github.com/kevinxu12',
  twitterHandle: '',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/kevinxu12',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/kevinxu2/',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/KevinXu10741985',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Work Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    { name: 'Blog', url: '/#blog' },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#FFFFFF',
    darkNavy: '#FFFFFF',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
