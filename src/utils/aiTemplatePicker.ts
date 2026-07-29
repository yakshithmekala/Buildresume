import { ResumeData, ResumeTheme } from '../types/resume';

export interface TemplateRecommendation {
  recommendedTheme: ResumeTheme;
  themeName: string;
  reason: string;
}

export function recommendBestTemplate(data: ResumeData, jdText: string = ''): TemplateRecommendation {
  const textToAnalyze = (jdText + ' ' + data.contact.headline + ' ' + data.summary).toLowerCase();

  // FAANG / Enterprise / Corporate / General ATS
  if (/faang|google|amazon|microsoft|meta|apple|enterprise|corporate|ats|system/i.test(textToAnalyze)) {
    return {
      recommendedTheme: 'executive',
      themeName: 'Executive ATS',
      reason: 'Top choice for MNCs & FAANG ATS screeners. Maximizes text parser readability and recruiter scanning.'
    };
  }

  // Financial / Banking / FinTech (e.g. JPMorgan, Goldman, Bloomberg)
  if (/jpmorgan|bank|finance|fintech|risk|trading|credit|sql/i.test(textToAnalyze)) {
    return {
      recommendedTheme: 'indigo',
      themeName: 'Corporate Indigo',
      reason: 'Professional dark indigo corporate header designed for banking, finance, and enterprise software roles.'
    };
  }

  // Startups / Tech / Cloud / AI / DevOps / Fullstack
  if (/cloud|aws|ai|machine learning|devops|docker|kubernetes|glass|portfolio/i.test(textToAnalyze)) {
    return {
      recommendedTheme: 'glass',
      themeName: 'Tech Glass',
      reason: 'Sleek tech portfolio aesthetic spotlighting AWS, AI, and cloud architecture credentials.'
    };
  }

  // Frontend / Design / Web / React
  if (/frontend|react|ui|ux|emerald|web|design|css|tailwind/i.test(textToAnalyze)) {
    return {
      recommendedTheme: 'emerald',
      themeName: 'Emerald Minimal',
      reason: 'Clean modern layout with emerald skill pill badges ideal for Frontend & UI/UX roles.'
    };
  }

  // High density / multi-project / single page
  if (data.projects.length >= 3 || data.skillCategories.length >= 5) {
    return {
      recommendedTheme: 'compact',
      themeName: 'Compact 1-Page',
      reason: 'High-density layout engineered to cleanly fit your extensive accomplishments onto a single physical page.'
    };
  }

  // Default clean Nordic
  return {
    recommendedTheme: 'nordic',
    themeName: 'Nordic Clean',
    reason: 'Ultra-clean Scandinavian aesthetic with generous whitespace for maximum readability.'
  };
}
