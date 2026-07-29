import { ResumeData, EducationItem, ProjectItem, CertificationItem } from '../types/resume';

// Helper to extract numeric year for sorting
function extractYear(yearStr: string): number {
  const match = yearStr.match(/\b(20\d{2}|19\d{2})\b/);
  return match ? parseInt(match[1], 10) : 0;
}

// Clean and capitalize sentences
function cleanBulletPoint(text: string): string {
  if (!text) return '';
  let cleaned = text.trim();
  // Ensure first character is uppercase
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  // Remove double dots or trailing commas
  cleaned = cleaned.replace(/\.+$/, '.').replace(/,+$/, '');
  // Ensure ending period if it's a full sentence and doesn't end with punctuation
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }
  return cleaned;
}

// Auto-format and order entire resume dataset
export function autoFormatAndSortResume(data: ResumeData): ResumeData {
  // 1. Clean Contact Info
  const cleanedContact = {
    ...data.contact,
    fullName: data.contact.fullName.trim().toUpperCase(),
    headline: data.contact.headline.trim().toUpperCase(),
    email: data.contact.email.trim().toLowerCase(),
    phone: data.contact.phone.trim(),
    location: data.contact.location.trim(),
    linkedin: data.contact.linkedin.trim(),
    github: data.contact.github.trim(),
    availability: data.contact.availability.trim()
  };

  // 2. Clean Summary
  const cleanedSummary = data.summary.trim();

  // 3. Sort & Clean Education (latest year first)
  const sortedEducation = [...data.education]
    .map(edu => ({
      ...edu,
      degree: edu.degree.trim(),
      institution: edu.institution.trim(),
      grade: edu.grade.trim(),
      year: edu.year.trim()
    }))
    .sort((a, b) => extractYear(b.year) - extractYear(a.year));

  // 4. Sort & Clean Projects
  const sortedProjects = [...data.projects]
    .map(proj => ({
      ...proj,
      title: proj.title.trim(),
      subtitle: proj.subtitle ? proj.subtitle.trim() : '',
      date: proj.date ? proj.date.trim() : '',
      bulletPoints: proj.bulletPoints.map(cleanBulletPoint).filter(Boolean),
      techStack: proj.techStack.map(t => t.trim()).filter(Boolean)
    }))
    .sort((a, b) => extractYear(b.date || '') - extractYear(a.date || ''));

  // 5. Clean Skill Categories
  const cleanedSkills = data.skillCategories.map(cat => ({
    category: cat.category.trim(),
    items: cat.items.map(i => i.trim()).filter(Boolean)
  }));

  // 6. Sort & Clean Certifications (highlighted first)
  const sortedCertifications = [...data.certifications]
    .map(cert => ({
      ...cert,
      name: cert.name.trim(),
      issuer: cert.issuer ? cert.issuer.trim() : ''
    }))
    .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));

  // 7. Clean Achievements
  const cleanedAchievements = data.achievements.map(cleanBulletPoint).filter(Boolean);

  // Default optimal ATS Section Order
  const defaultOrder = data.sectionOrder || ['summary', 'skills', 'projects', 'education', 'certifications', 'achievements'];

  return {
    ...data,
    contact: cleanedContact,
    summary: cleanedSummary,
    education: sortedEducation,
    projects: sortedProjects,
    skillCategories: cleanedSkills,
    certifications: sortedCertifications,
    achievements: cleanedAchievements,
    sectionOrder: defaultOrder
  };
}
