export interface ContactInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  availability: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  grade: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  githubUrl?: string;
  liveUrl?: string;
  bulletPoints: string[];
  techStack: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
  highlight?: boolean;
}

export type ResumeSectionId = 'summary' | 'skills' | 'projects' | 'education' | 'certifications' | 'achievements';

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  education: EducationItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  achievements: string[];
  solvedProblemsCount: number;
  sectionOrder?: ResumeSectionId[];
}

export type ResumeTheme = 
  | 'executive' 
  | 'modern' 
  | 'glass' 
  | 'compact' 
  | 'emerald' 
  | 'indigo' 
  | 'nordic';
