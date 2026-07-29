import { ResumeData } from '../types/resume';

// Dictionary of tech keywords to look for in JDs
const COMMON_TECH_KEYWORDS = [
  'java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'ruby', 'php', 'sql',
  'react', 'react.js', 'angular', 'vue', 'next.js', 'node', 'node.js', 'express', 'express.js', 'spring', 'spring boot', 'django', 'fastapi',
  'mongodb', 'mysql', 'postgresql', 'redis', 'dynamodb', 'oracle',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'github', 'rest', 'rest api', 'restful', 'graphql', 'microservices', 'system design',
  'data structures', 'algorithms', 'oop', 'object oriented', 'jwt', 'postman', 'linux', 'agile', 'scrum', 'unit testing', 'jest', 'kafka'
];

export interface JdAnalysisResult {
  matchScore: number; // 0 - 100
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedRoleTitle: string;
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

  // Extract keywords present in JD
  const jdKeywords = Array.from(new Set(
    COMMON_TECH_KEYWORDS.filter(kw => {
      const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
      return regex.test(normalizedJd);
    })
  ));

  // Extract resume full text
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

  // Detect potential role title from JD lines
  let detectedRoleTitle = '';
  const lines = jdText.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    if (/engineer|developer|architect|specialist|lead|intern/i.test(line) && line.length < 60) {
      detectedRoleTitle = line.replace(/job description|hiring|role:|position:/i, '').trim();
      break;
    }
  }

  return {
    matchScore: Math.min(100, Math.max(20, matchScore)),
    matchedKeywords,
    missingKeywords,
    detectedRoleTitle
  };
}

// Tailor resume to fit JD
export function tailorResumeForJd(resume: ResumeData, jdText: string): { tailoredData: ResumeData; analysis: JdAnalysisResult } {
  const analysis = analyzeJd(resume, jdText);
  const { matchedKeywords, missingKeywords, detectedRoleTitle } = analysis;

  const targetTitle = detectedRoleTitle ? detectedRoleTitle.toUpperCase() : resume.contact.headline;

  // Format skills to prioritize missing & matched keywords from JD
  const updatedSkillCategories = resume.skillCategories.map(cat => {
    const newItems = [...cat.items];
    
    // Add missing keywords that fit this category
    missingKeywords.forEach(kw => {
      const formattedKw = kw.charAt(0).toUpperCase() + kw.slice(1);
      if (!newItems.map(i => i.toLowerCase()).includes(kw)) {
        if (cat.category.toLowerCase().includes('language') && ['java', 'python', 'javascript', 'typescript', 'c++'].includes(kw)) {
          newItems.unshift(formattedKw);
        } else if (cat.category.toLowerCase().includes('web') && ['react', 'node', 'express', 'fastapi', 'spring', 'rest api', 'graphql'].includes(kw)) {
          newItems.unshift(formattedKw);
        } else if (cat.category.toLowerCase().includes('database') && ['mongodb', 'mysql', 'postgresql', 'aws', 'docker', 'redis'].includes(kw)) {
          newItems.unshift(formattedKw);
        }
      }
    });

    return {
      ...cat,
      items: Array.from(new Set(newItems))
    };
  });

  // Tailor Headline & Summary with JD keywords
  const topMatchedSkills = matchedKeywords.concat(missingKeywords).slice(0, 4).map(s => s.toUpperCase()).join(' | ');
  const newHeadline = detectedRoleTitle 
    ? `${detectedRoleTitle.toUpperCase()} ${topMatchedSkills ? '| ' + topMatchedSkills : ''}`
    : resume.contact.headline;

  const newSummary = `${resume.summary.split('.')[0]}. Highly tailored for ${detectedRoleTitle || 'Software Development Engineer'} roles, bringing hands-on expertise in ${matchedKeywords.slice(0, 5).join(', ')} to deliver scalable, high-performance systems.`;

  const tailoredData: ResumeData = {
    ...resume,
    contact: {
      ...resume.contact,
      headline: newHeadline
    },
    summary: newSummary,
    skillCategories: updatedSkillCategories
  };

  // Re-run analysis on tailored data
  const finalAnalysis = analyzeJd(tailoredData, jdText);

  return {
    tailoredData,
    analysis: finalAnalysis
  };
}
