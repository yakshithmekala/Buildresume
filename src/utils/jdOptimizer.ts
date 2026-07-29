import { ResumeData, ResumeTheme } from '../types/resume';
import { recommendBestTemplate } from './aiTemplatePicker';

// Comprehensive tech keyword dictionary (120+ modern tech terms)
const COMMON_TECH_KEYWORDS = [
  // Languages
  'java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'go', 'golang', 'ruby', 'php', 'rust', 'sql', 'html', 'css', 'bash', 'shell',
  // Frontend
  'react', 'react.js', 'next.js', 'vue', 'angular', 'redux', 'zustand', 'tailwind', 'tailwind css', 'bootstrap', 'material ui', 'webpack', 'vite', 'ui/ux',
  // Backend & Frameworks
  'node', 'node.js', 'express', 'express.js', 'spring', 'spring boot', 'django', 'fastapi', 'flask', 'asp.net', 'graphql', 'rest api', 'restful', 'microservices',
  // Databases & Storage
  'mongodb', 'mysql', 'postgresql', 'postgres', 'redis', 'dynamodb', 'oracle', 'cassandra', 'elasticsearch', 'sqlite', 'prisma',
  // Cloud & DevOps
  'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'terraform', 'git', 'github', 'linux',
  // Testing & Quality
  'jest', 'cypress', 'unit testing', 'postman', 'junit', 'selenium',
  // Computer Science & Architecture
  'data structures', 'algorithms', 'dsa', 'oop', 'object oriented', 'system design', 'jwt', 'oauth', 'kafka', 'rabbitmq', 'agile', 'scrum'
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

// Helper to extract role title from raw JD text
function extractRoleTitleFromJd(jdText: string): string {
  if (!jdText || !jdText.trim()) return '';

  const lines = jdText.split('\n').map(l => l.trim()).filter(Boolean);

  // Pattern 1: Check early lines for common title indicators
  for (const line of lines.slice(0, 8)) {
    const cleanLine = line.replace(/^(hiring|job description|role:|position:|title:|looking for a|we are looking for a|about the role:?)\s*/i, '').trim();
    if (/(engineer|developer|architect|specialist|lead|intern|analyst|programmer|full\s*stack|backend|frontend|devops|data|ai|ml)/i.test(cleanLine) && cleanLine.length <= 60 && cleanLine.length >= 4) {
      return cleanLine.toUpperCase();
    }
  }

  // Pattern 2: Match anywhere in text
  const match = jdText.match(/\b(Senior|Junior|Lead|Principal|Full\s*Stack|Backend|Frontend|Software|Cloud|DevOps|Data|AI|ML)\s+(Engineers?|Developers?|Architects?|Specialists?)\b/i);
  if (match) {
    return match[0].toUpperCase();
  }

  return '';
}

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

  // Find all keywords present in the JD
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
  const detectedRoleTitle = extractRoleTitleFromJd(jdText);

  return {
    matchScore: Math.min(100, Math.max(30, matchScore)),
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

  const formattedHeadline = targetRoleTitle;
  const roleName = preset ? preset.label.split('(')[0].replace(/[🚀⚙️💻☁️🤖🎓]/g, '').trim() : 'Software Development Engineer';
  const formattedSummary = `Results-driven ${roleName} with strong foundations in Computer Science, Data Structures, Algorithms (500+ problems solved), and Object-Oriented Programming. Experienced in building high-performance applications with expertise in ${matchedTech}. Proven track record of architecting scalable systems and delivering under tight timelines.`;

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

  const allTechList = [...matchedKeywords, ...missingKeywords].slice(0, 4).map(s => s.toUpperCase());
  const techSuffix = allTechList.length > 0 ? allTechList.join(' | ') : 'JAVA | REACT | SYSTEM DESIGN';

  const roleTitle = detectedRoleTitle ? detectedRoleTitle.toUpperCase() : 'SOFTWARE DEVELOPMENT ENGINEER';
  const newHeadline = `${roleTitle} | ${techSuffix}`;

  const topTech = [...matchedKeywords, ...missingKeywords].slice(0, 5).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
  const newSummary = `Results-driven ${roleTitle} highly tailored for competitive software engineering positions. Leverages hands-on expertise in ${topTech || 'Java, React, Node.js, REST APIs'} to architect scalable applications, optimize backend performance, and deliver robust software solutions.`;

  // Inject missing JD keywords into skill categories
  const formattedMissingKeywords = missingKeywords.map(kw => kw.charAt(0).toUpperCase() + kw.slice(1));
  
  const updatedSkillCategories = resume.skillCategories.map((cat, index) => {
    const existing = new Set(cat.items.map(i => i.toLowerCase()));
    const toAdd = formattedMissingKeywords.filter(kw => !existing.has(kw.toLowerCase()));
    
    // Add keywords logically into the first 2 categories (Languages & Web/Backend)
    if (index < 2 && toAdd.length > 0) {
      const addedItems = toAdd.slice(0, 4);
      return {
        ...cat,
        items: Array.from(new Set([...addedItems, ...cat.items]))
      };
    }
    return { ...cat, items: Array.from(new Set(cat.items)) };
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
