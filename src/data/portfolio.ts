export const personalInfo = {
  name: 'MNSBaanu',
  title: 'Full Stack Developer',
  description: 'Mastering the full spectrum: From what users see to what makes it breathe.',
  cvSummary: 'Highly motivated and detail-oriented individual with strong problem-solving skills and a passion for technology. Adept at learning new concepts quickly and working in dynamic environments. Seeking opportunities to apply skills, contribute to projects, and grow professionally.',
  profileImage: '/assets/profile.png',
  email: 'sbaanukghsbio21@gmail.com',
  phone: '+94 76 245 5654',
  location: 'Kandy, Sri Lanka',
  social: {
    github: 'https://github.com/MNSBaanu',
    linkedin: 'https://www.linkedin.com/in/mns-baanu',
  },
}

export const about = {
  description1: "I'm a Software Engineering student with a passion for creating meaningful digital experiences. I believe in writing clean, efficient code and continuously pushing myself to learn and grow.",
  description2: 'I\'m driven by challenges and motivated by the endless possibilities that technology offers to solve real-world problems.',
  stats: [
    { number: '7+', label: 'Certifications' },
    { number: '10+', label: 'Projects Completed' },
    { number: '5+', label: 'Technologies' },
  ],
  services: [
    'Frontend Development',
    'Backend Development',
    'Mobile Application Development',
    'API Development',
    'Database Design & Management',
  ],
}

export const skillCategories = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ]
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    ]
  },
  {
    category: 'Tools & IDEs',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Visual Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg' },
      { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
      { name: 'IntelliJ IDEA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
    ]
  },
  {
    category: 'Professional Skills',
    skills: [
      { name: 'Problem Solving', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620316.png' },
      { name: 'Team Work', icon: 'https://cdn-icons-png.flaticon.com/512/1534/1534938.png' },
      { name: 'Communication', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991235.png' },
      { name: 'Time Management', icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838779.png' },
      { name: 'Leadership', icon: 'https://cdn-icons-png.flaticon.com/512/1705/1705312.png' },
    ],
    subcategories: [
      {
        name: 'Languages',
        skills: [
          { name: 'English' },
          { name: 'Tamil' },
          { name: 'Sinhala' },
        ]
      }
    ]
  }
]

// Technical skills only (for CV)
export const skills = [
  ...skillCategories[0].skills,
  ...skillCategories[1].skills,
  ...skillCategories[2].skills,
  ...skillCategories[3].skills,
]

// Professional/Soft skills (for CV)
export const professionalSkills = [
  'Problem Solving',
  'Team Work',
  'Communication',
  'Time Management',
  'Leadership',
  'Decision Making',
  'Organization'
]

export const education = [
  {
    title: 'HD in Computing & Software Engineering',
    institution: 'ICBT Kandy (Affiliated with Cardiff Metropolitan University, UK)',
    period: 'May 2024 - Nov 2025',
    description: 'Specialized in full-stack development and software engineering principles',
  },
  {
    title: 'Certificate of Efficiency as a Pharmacist',
    institution: 'PharmAdya (Awarded by Sri Lanka Medical Council)',
    period: 'Nov 2023 - Feb 2026',
    description: 'Comprehensive training in pharmacy operations and patient care',
  },
  {
    title: 'G.C.E. Advanced Level - Biological Science',
    institution: 'Kandy Girls\' High School',
    period: '2019 - 2023',
    description: 'Completed A/L examination in Biological Science stream with 3 Passes in Physics, Chemistry, Biology',
  },
  {
    title: 'G.C.E. Ordinary Level',
    institution: 'Viharamahadevi Girls\' College Kandy',
    period: 'Grade 6 - 11',
    description: 'Excellent academic performance in O/L examination with 8 A\'s and 1 B',
  },
]

export const experience = [
  {
    title: 'Committee Member',
    company: 'ICBT Student Council, ICBT Kandy',
    period: 'Mar 2025 - Jul 2025',
    type: 'Part-time',
    description: 'Active committee member contributing to student council initiatives and activities.',
  },
  {
    title: 'Secretary & Event Coordinator',
    company: 'Dream 360 Exhibition, ICBT Kandy',
    period: 'Jan 2025 - Feb 2025',
    type: 'Part-time',
    description: 'Conducted educational & entertainment events, managing event coordination and administrative responsibilities.',
  },
  {
    title: 'Student Instructor',
    company: 'Jeewithayata Physics',
    period: 'Feb 2024 - Dec 2024',
    type: 'Part-time',
    description: 'Translated Physics resources from Sinhala to Tamil, conducted paper marking, and provided student support.',
  },
  {
    title: 'Translator',
    company: 'Achiever Academy',
    period: 'Dec 2023 - Feb 2024',
    type: 'Part-time',
    description: 'Translated Chemistry resources from Sinhala to Tamil.',
  },
]

export const certifications = [
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Feb 2025',
    link: 'https://www.freecodecamp.org/certification/mnsbaanu/responsive-web-design',
    image: '/assets/freecodecamp-rwd.png',
  },
  {
    title: 'AI/ML Engineer - Stage 2',
    issuer: 'SLIIT',
    date: 'Dec 2024',
    link: '#',
    image: '/assets/sliit-aiml-stage2.png',
  },
  {
    title: 'C++ for Beginners',
    issuer: 'Udemy',
    date: 'Jul 2024',
    link: 'https://www.udemy.com/certificate/UC-f5911474-d39e-44ac-a6a1-3183db8edddf/',
    image: '/assets/udemy-cpp.png',
  },
  {
    title: 'AI/ML Engineer - Stage 1',
    issuer: 'SLIIT',
    date: 'Oct 2023',
    link: '#',
    image: '/assets/sliit-aiml-stage1.png',
  },
  {
    title: 'Web Design For Beginners',
    issuer: 'University of Moratuwa',
    date: 'Oct 2023',
    link: '#',
    image: '/assets/moratuwa-webdesign.png',
  },
  {
    title: 'Data Science Math Skills',
    issuer: 'Duke University (Coursera)',
    date: 'Jul 2023',
    link: 'https://www.coursera.org/account/accomplishments/verify/C2AXAUBZWTB2',
    image: '/assets/coursera-datascience.png',
  },
  {
    title: 'Programming In Python',
    issuer: 'University of Moratuwa',
    date: 'Feb 2023',
    link: '#',
    image: '/assets/moratuwa-python.png',
  },
]

export const projects = [
  {
    title: 'Project Title 1',
    description: 'Brief description of your project and what it does.',
    tech: ['Tech1', 'Tech2', 'Tech3'],
    liveUrl: 'https://your-project-url.com',
    githubUrl: 'https://github.com/yourusername/project',
  },
  {
    title: 'Project Title 2',
    description: 'Brief description of your project and what it does.',
    tech: ['Tech1', 'Tech2', 'Tech3'],
    liveUrl: 'https://your-project-url.com',
    githubUrl: 'https://github.com/yourusername/project',
  },
  {
    title: 'Project Title 3',
    description: 'Brief description of your project and what it does.',
    tech: ['Tech1', 'Tech2', 'Tech3'],
    liveUrl: 'https://your-project-url.com',
    githubUrl: 'https://github.com/yourusername/project',
  },
]
