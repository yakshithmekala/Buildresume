import { ResumeData, ResumeTheme } from '../types/resume';
import { recommendBestTemplate } from './aiTemplatePicker';

// Common tech keywords for matching
const COMMON_TECH_KEYWORDS = [
  'java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'ruby', 'php', 'sql',
  'react', 'react.js', 'angular', 'vue', 'next.js', 'node', 'node.js', 'express', 'express.js', 'spring', 'spring boot', 'django', 'fastapi',
  'mongodb', 'mysql', 'postgresql', 'redis', 'dynamodb', 'oracle',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'github', 'rest', 'rest api', 'restful', 'graphql', 'microservices', 'system design',
  'data structures', 'algorithms', 'oop', 'object oriented', 'jwt', 'postman', 'linux', 'agile', 'scrum', 'unit testing', 'jest', 'kafka'
];

export interface JdAnalysisResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedRoleTitle: string;
}

// Role Presets & JD Format Specifications
export const PRESET_TARGET_ROLES = [
  { id: 'sde-fullstack', label: '🚀 Full Stack SDE (Java / MERN)', title: 'SOFTWARE DEVELOPMENT ENGINEER | JAVA | MERN STACK' },
  { id: 'sde-backend', label: '⚙️ Backend Systems Engineer (Java / Python)', title: 'BACKEND SYSTEMS ENGINEER | JAVA | DISTRIBUTED SYSTEMS' },
  { id: 'sde-frontend', label: '💻 Frontend Engineer (React / TypeScript)', title: 'FRONTEND ENGINEER | REACT.JS | TYPESCRIPT | UI/UX' },
  { id: 'sde-cloud', label: '☁️ Cloud & DevOps Solutions Engineer', title: 'CLOUD & DEVOPS ENGINEER | AWS | DOCKER | CI/CD' },
  { id: 'sde-ai', label: '🤖 AI & Machine Learning Software Engineer', title: 'AI SOFTWARE ENGINEER | PYTHON | LLM APIs | FASTAPI' },
  { id: 'sde-fresher', label: '🎓 Graduate SDE / Campus Entry Level', title: 'SOFTWARE DEVELOPMENT ENGINEER | DATA STRUCTURES & ALGORITHMS' }
];

// Analyze JD and calculate match score
export function analyzeJd(resume: ResumeData, jdText: string): JdAnalysisResult {
  if (!jdText || jdText.trim().length === 0) {
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      detectedRoleTitle: ''
    };
  }

  const normalizedJd = jdText.toLowerCase();

  const jdKeywords = Array.from(new Set(
    COMMON_TECH_KEYWORDS.filter(kw => {
      const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
      return regex.test(normalizedJd);
    })
  ));

  const resumeText = [
    resume.contact.headline,
    resume.summary,
    ...resume.skillCategories.flatMap(s => s.items),
    ...resume.projects.flatMap(p => [...p.bulletPoints, ...p.techStack]),
    ...resume.education.map(e => e.degree),
    ...resume.certifications.map(c => c.name)
  ].join(' ').toLowerCase();

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  jdKeywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
    if (regex.test(resumeText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const total = jdKeywords.length;
  const matchScore = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 75;

  let detectedRoleTitle = '';
  const lines = jdText.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    if (/engineer|developer|architect|specialist|lead|intern/i.test(line) && line.length < 60) {
      detectedRoleTitle = line.replace(/job description|hiring|role:|position:/i, '').trim();
      break;
    }
  }

  return {
    matchScore: Math.min(100, Math.max(25, matchScore)),
    matchedKeywords,
    missingKeywords,
    detectedRoleTitle
  };
}

// Generate Role-Based & JD Formatted Resume
export function generateRoleBasedResume(
  baseData: ResumeData,
  rolePresetId: string,
  jdText: string = ''
): { tailoredData: ResumeData; recommendedTheme: ResumeTheme; roleTitle: string } {
  const preset = PRESET_TARGET_ROLES.find(r => r.id === rolePresetId);
  const targetRoleTitle = preset ? preset.title : baseData.contact.headline;

  const analysis = analyzeJd(baseData, jdText);
  const matchedTech = analysis.matchedKeywords.length > 0
    ? analysis.matchedKeywords.slice(0, 5).map(s => s.toUpperCase()).join(', ')
    : 'Java, MERN Stack, REST APIs, System Design';

  // 1. Format Headline & Summary for the selected Role & JD
  const formattedHeadline = targetRoleTitle;
  const formattedSummary = `Results-driven ${preset ? preset.label.split('(')[0].replace(/[🚀⚙️💻☁️🤖🎓]/g, '').trim() : 'Software Development Engineer'} with strong foundations in Computer Science, Data Structures, Algorithms (500+ problems solved), and Object-Oriented Programming. Experienced in building high-performance applications with expertise in ${matchedTech}. Proven track record of architecting scalable systems and delivering under tight timelines.`;

  // 2. Format Skills Categories to align with the Role & JD
  const tailoredSkillCategories = baseData.skillCategories.map(cat => ({
    ...cat,
    items: Array.from(new Set(cat.items))
  }));

  const tailoredData: ResumeData = {
    ...baseData,
    contact: {
      ...baseData.contact,
      headline: formattedHeadline
    },
    summary: formattedSummary,
    skillCategories: tailoredSkillCategories
  };

  // 3. Recommend the best template for this role & JD
  const rec = recommendBestTemplate(tailoredData, jdText || targetRoleTitle);

  return {
    tailoredData,
    recommendedTheme: rec.recommendedTheme,
    roleTitle: preset ? preset.label : targetRoleTitle
  };
}

// Tailor resume to fit JD
export function tailorResumeForJd(resume: ResumeData, jdText: string): { tailoredData: ResumeData; analysis: JdAnalysisResult; recommendedTheme: ResumeTheme } {
  const analysis = analyzeJd(resume, jdText);
  const { matchedKeywords, missingKeywords, detectedRoleTitle } = analysis;

  const newHeadline = detectedRoleTitle
    ? `${detectedRoleTitle.toUpperCase()} | ${matchedKeywords.slice(0, 3).map(s => s.toUpperCase()).join(' | ')}`
    : resume.contact.headline;

  const newSummary = `${resume.summary.split('.')[0]}. Highly tailored for ${detectedRoleTitle || 'Software Development Engineer'} positions, leveraging proven expertise in ${matchedKeywords.slice(0, 5).join(', ')} to deliver robust, scalable software solutions.`;

  const updatedSkillCategories = resume.skillCategories.map(cat => {
    const newItems = [...cat.items];
    missingKeywords.forEach(kw => {
      const formattedKw = kw.charAt(0).toUpperCase() + kw.slice(1);
      if (!newItems.map(i => i.toLowerCase()).includes(kw)) {
        newItems.unshift(formattedKw);
      }
    });
    return { ...cat, items: Array.from(new Set(newItems)) };
  });

  const tailoredData: ResumeData = {
    ...resume,
    contact: {
      ...resume.contact,
      headline: newHeadline
    },
    summary: newSummary,
    skillCategories: updatedSkillCategories
  };

  const rec = recommendBestTemplate(tailoredData, jdText);

  return {
    tailoredData,
    analysis: analyzeJd(tailoredData, jdText),
    recommendedTheme: rec.recommendedTheme
  };
}
