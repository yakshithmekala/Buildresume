import { ResumeData } from '../types/resume';
import { initialResumeData } from './yakshithResumeData';

export const blankResumeData: ResumeData = {
  contact: {
    fullName: "YOUR NAME HERE",
    headline: "SOFTWARE DEVELOPMENT ENGINEER | TARGET ROLE",
    email: "your.email@example.com",
    phone: "+91 9876543210",
    location: "City, Country",
    availability: "Seeking Full-time / Internship Roles | Open to Relocation",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    website: "https://yourportfolio.dev"
  },
  summary: "Motivated Software Engineer with strong problem-solving skills and expertise in web technologies, database management, and computer science fundamentals. Proven track record of building responsive, scalable software applications and collaborating in fast-paced team environments.",
  solvedProblemsCount: 300,
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Your University / Institute Name",
      location: "City, State",
      year: "2022 – 2026",
      grade: "CGPA: 9.0 / 10.0"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Scalable Full-Stack Application",
      subtitle: "High-Performance Web Platform",
      date: "2025",
      githubUrl: "https://github.com/yourusername/project-repo",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      bulletPoints: [
        "Architected and deployed a full-stack web application serving 100+ active users with 99.9% uptime.",
        "Integrated secure JWT authentication and optimized database queries to accelerate API response times by 35%.",
        "Designed responsive user interfaces enforcing modern UI/UX principles across mobile and desktop devices."
      ]
    },
    {
      id: "proj-2",
      title: "Automated Data Processing Pipeline",
      subtitle: "Backend Service & Analytics Engine",
      date: "2025",
      githubUrl: "https://github.com/yourusername/data-pipeline",
      techStack: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs"],
      bulletPoints: [
        "Engineered an automated data pipeline processing 1,000+ daily record entries with automated validation checks.",
        "Implemented structured logging, error handling, and asynchronous task execution to optimize performance."
      ]
    }
  ],
  skillCategories: [
    {
      category: "Programming Languages",
      items: ["Java", "Python", "JavaScript (ES6+)", "C++"]
    },
    {
      category: "Web & Backend Development",
      items: ["React.js", "Node.js", "Express.js", "HTML5", "CSS3", "REST APIs", "Tailwind CSS"]
    },
    {
      category: "Databases & Cloud",
      items: ["MySQL", "MongoDB", "PostgreSQL", "AWS (Basic)", "Git", "GitHub"]
    },
    {
      category: "Core CS Fundamentals",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      highlight: true
    },
    {
      id: "cert-2",
      name: "Full Stack Web Development Certification",
      issuer: "Coursera / Udemy",
      highlight: false
    }
  ],
  achievements: [
    "Solved 300+ Data Structures & Algorithms problems on LeetCode & HackerRank",
    "Secured Top 5 Rank in University Hackathon 2025",
    "Maintained a consistent CGPA above 9.0 throughout academic tenure"
  ]
};

export const frontendProfileData: ResumeData = {
  contact: {
    fullName: "ALEX CHEN",
    headline: "SENIOR FRONTEND ENGINEER | REACT | TYPESCRIPT | NEXT.JS",
    email: "alex.chen.dev@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA (Open to Remote)",
    availability: "Available Immediately | Full-Time",
    linkedin: "https://linkedin.com/in/alexchen-frontend",
    github: "https://github.com/alexchen-dev"
  },
  summary: "Passionate Frontend Developer with 3+ years of experience crafting modern, accessible, high-performance web applications using React, TypeScript, Next.js, and Tailwind CSS. Specialized in state management, micro-frontends, design systems, and web performance optimization.",
  solvedProblemsCount: 450,
  education: [
    {
      id: "edu-fe-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      year: "2020 – 2024",
      grade: "GPA: 3.85 / 4.0"
    }
  ],
  projects: [
    {
      id: "proj-fe-1",
      title: "E-Commerce Design System & Analytics Dashboard",
      subtitle: "High-Scale Micro-Frontend Application",
      date: "2025",
      githubUrl: "https://github.com/alexchen-dev/design-system-dashboard",
      techStack: ["React 18", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Vite"],
      bulletPoints: [
        "Built a modular design system component library with 40+ accessible UI components used across 5 product teams.",
        "Optimized lighthouse performance score from 62 to 98 by implementing dynamic code-splitting and image optimization.",
        "Integrated real-time websocket charts rendering 10,000+ data points smoothly at 60 FPS."
      ]
    }
  ],
  skillCategories: [
    {
      category: "Frontend Core",
      items: ["React.js", "TypeScript", "Next.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS"]
    },
    {
      category: "State & Testing",
      items: ["Redux Toolkit", "Zustand", "React Query", "Jest", "React Testing Library", "Cypress"]
    },
    {
      category: "Build Tools & CI/CD",
      items: ["Vite", "Webpack", "Git/GitHub", "Docker", "Vercel", "Figma to Code"]
    }
  ],
  certifications: [
    {
      id: "cert-fe-1",
      name: "Meta Certified Front-End Developer",
      issuer: "Meta",
      highlight: true
    }
  ],
  achievements: [
    "Contributed to major open-source UI libraries with over 2,000 GitHub stars",
    "Speaker at Regional WebDev Conference 2025"
  ]
};

export const sampleProfiles = [
  { id: 'yakshith', name: 'Mekala Yakshith Reddy (Default)', data: initialResumeData },
  { id: 'blank', name: '✨ Blank Starter (New User)', data: blankResumeData },
  { id: 'frontend', name: '💻 Frontend React Engineer', data: frontendProfileData },
];
