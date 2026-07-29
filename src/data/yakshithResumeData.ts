import { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  contact: {
    fullName: "MEKALA YAKSHITH REDDY",
    headline: "SOFTWARE DEVELOPMENT ENGINEER | JAVA | MERN STACK",
    email: "yakshithreddym@gmail.com",
    phone: "+91 8790512825",
    location: "Hyderabad, India",
    availability: "Seeking SDE Internship Opportunities | Open to Relocation",
    linkedin: "https://www.linkedin.com/in/yakshithreddy",
    github: "https://www.github.com/yakshithmekala",
    website: "https://github.com/yakshithmekala"
  },
  summary: "Results-driven Software Development Engineer with strong foundations in Data Structures, Algorithms (500+ problems solved), and Object-Oriented Programming. Experienced in building high-performance scalable web applications using Java and the MERN stack. AWS Certified Solutions Architect Associate & MongoDB Certified DBA seeking SDE Internship opportunities focused on backend architecture and distributed systems.",
  solvedProblemsCount: 500,
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "KL University, Hyderabad",
      location: "Hyderabad, Telangana",
      year: "Expected 2027",
      grade: "CGPA: 9.46 / 10.0"
    },
    {
      id: "edu-2",
      degree: "Intermediate (MPC)",
      institution: "Narayana Junior College",
      location: "Hyderabad, Telangana",
      year: "2021 – 2023",
      grade: "CGPA: 9.4 / 10.0"
    },
    {
      id: "edu-3",
      degree: "Secondary School Certificate (SSC)",
      institution: "Sankalp High School",
      location: "Telangana",
      year: "2021",
      grade: "CGPA: 10.0 / 10.0"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "JPMorgan Chase & Co. – Code for Good (Participant)",
      subtitle: "Full Stack Student Management Platform",
      date: "June 2025",
      techStack: ["MERN Stack", "MongoDB", "React.js", "Node.js", "Express.js", "REST APIs"],
      bulletPoints: [
        "Architected and deployed a scalable full-stack web application to manage 500+ student records, reducing manual processing effort by 40%.",
        "Integrated secure JWT authentication and role-based access control with MongoDB database backend for multi-role user access.",
        "Optimized RESTful API endpoints for batch queries, accelerating dashboard data retrieval speeds significantly.",
        "Created an intuitive, accessible React user interface under tight hackathon timelines in a team of 6 engineers."
      ]
    },
    {
      id: "proj-2",
      title: "AI Code Reviewer",
      subtitle: "Automated Static Code Analysis Tool",
      githubUrl: "https://github.com/yakshithmekala/ai-code-reviewer",
      techStack: ["Python", "FastAPI", "AI APIs", "Static Analysis", "Git"],
      bulletPoints: [
        "Engineered an automated AI-driven code analysis engine to identify syntax bugs, security flaws, and performance bottlenecks, cutting manual review effort by ~30%.",
        "Implemented real-time static code evaluation pipelines enforcing PSR/PEP coding standards and automated formatting feedback.",
        "Designed asynchronous backend pipelines enabling real-time file scanning with actionable inline refactoring recommendations."
      ]
    },
    {
      id: "proj-3",
      title: "CIBIL Risk Manager",
      subtitle: "Credit Evaluation & Financial Risk Classification Engine",
      githubUrl: "https://github.com/yakshithmekala/cibil-risk",
      techStack: ["Python", "Backend Logic", "Data Analysis", "REST APIs", "MySQL"],
      bulletPoints: [
        "Developed a financial credit risk analysis system evaluating credit scores and financial histories across 100+ sample user records.",
        "Engineered rule-based classification models categorizing applicants into risk strata to streamline automated loan pre-approvals.",
        "Built robust transactional backend modules ensuring 100% data accuracy during score calculation and report generation."
      ]
    }
  ],
  skillCategories: [
    {
      category: "Programming Languages",
      items: ["Java (Core & OOP)", "Python", "JavaScript (ES6+)", "C"]
    },
    {
      category: "Web & Backend Technologies",
      items: ["React.js", "Node.js", "Express.js", "HTML5", "CSS3", "REST APIs", "FastAPI"]
    },
    {
      category: "Databases & Cloud",
      items: ["MongoDB", "MySQL", "AWS Cloud (EC2, S3, IAM)", "Postman"]
    },
    {
      category: "Core CS & Engineering",
      items: ["Data Structures & Algorithms (500+ Solved)", "Object-Oriented Programming (OOP)", "DBMS", "System Design Basics"]
    },
    {
      category: "Tools & Security",
      items: ["Git", "GitHub", "JWT Authentication", "Docker (Basics)", "Linux (Basics)"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      highlight: true
    },
    {
      id: "cert-2",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      highlight: true
    },
    {
      id: "cert-3",
      name: "MongoDB Database Administrator (DBA)",
      issuer: "MongoDB University",
      highlight: true
    },
    {
      id: "cert-4",
      name: "MongoDB Associate Developer",
      issuer: "MongoDB University",
      highlight: false
    },
    {
      id: "cert-5",
      name: "Automation Anywhere RPA Professional",
      issuer: "Automation Anywhere",
      highlight: false
    }
  ],
  achievements: [
    "Participant - JPMorgan Chase & Co. Code for Good 2025",
    "Solved 500+ Data Structures & Algorithms problems across LeetCode & competitive programming platforms",
    "Achieved outstanding 9.46 CGPA in B.Tech Computer Science Engineering at KL University",
    "Secured perfect 10.0 CGPA in SSC Board Examinations"
  ]
};
