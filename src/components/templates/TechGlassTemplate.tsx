import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, ShieldCheck, Terminal, Sparkles, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const TechGlassTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-slate-900 text-slate-100 font-sans p-6 md:p-10 max-w-[880px] mx-auto shadow-2xl rounded-2xl border border-slate-800 print:bg-white print:text-slate-900 print:border-none print:shadow-none print:max-w-full">
      {/* Glow ambient header background */}
      <div className="relative mb-8 pb-6 border-b border-slate-800 print:border-slate-300">
        <div className="absolute -top-6 -left-6 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 bg-sky-500/10 text-sky-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/20 print:border-slate-300 print:text-slate-700">
                <Terminal className="w-3 h-3" /> Full Stack & Cloud Developer
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20 print:border-slate-300 print:text-slate-700">
                CGPA 9.46
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase print:text-slate-900">
              {contact.fullName}
            </h1>
            <p className="text-sm font-semibold text-sky-400 mt-1 print:text-sky-700">
              {contact.headline}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-slate-300 print:text-slate-700">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400 print:text-slate-600" /> {contact.location}
            </span>
            <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-sky-300">
              <Phone className="w-3.5 h-3.5 text-sky-400 print:text-slate-600" /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-sky-300 text-sky-300 font-medium">
              <Mail className="w-3.5 h-3.5 text-sky-400 print:text-slate-600" /> {contact.email}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800/80 print:border-slate-300 print:text-slate-600">
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-400 hover:underline">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-400 hover:underline">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
          {contact.availability && (
            <span className="text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/50 text-[11px] print:bg-slate-100 print:text-slate-800 print:border-none">
              {contact.availability}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="resume-section mb-6 bg-slate-850/50 p-4 rounded-xl border border-slate-800 print:bg-transparent print:p-0 print:border-none">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5 print:text-slate-900">
            <Sparkles className="w-4 h-4 text-sky-400 print:hidden" /> Summary & Profile
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-justify print:text-slate-700">
            {summary}
          </p>
        </section>
      )}

      {/* Skills Matrix */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5 print:text-slate-900">
            <Terminal className="w-4 h-4 text-sky-400 print:hidden" /> Technical Skillset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 print:bg-slate-50 print:border-slate-200">
                <span className="text-xs font-bold text-sky-300 block mb-1.5 print:text-slate-900">{cat.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, i) => (
                    <span key={i} className="bg-slate-900/90 text-slate-200 text-[11px] font-mono px-2 py-0.5 rounded border border-slate-700 print:bg-white print:text-slate-800 print:border-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 print:text-slate-900">
            Featured Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors print:bg-transparent print:p-0 print:border-b print:border-slate-200 print:rounded-none pb-3">
                <div className="flex flex-wrap justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-white print:text-slate-900">{proj.title}</h3>
                  {proj.date && <span className="text-xs text-sky-400 font-mono print:text-slate-500">{proj.date}</span>}
                </div>
                {proj.subtitle && <p className="text-xs text-slate-400 mb-2 italic print:text-slate-600">{proj.subtitle}</p>}
                
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-sky-400 hover:underline flex items-center gap-1 mb-2">
                    <ExternalLink className="w-3 h-3" /> {proj.githubUrl}
                  </a>
                )}

                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-300 mb-3 print:text-slate-700">
                  {proj.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>

                {proj.techStack && (
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="bg-sky-950/80 text-sky-300 text-[10px] font-mono px-2 py-0.5 rounded border border-sky-800/60 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 print:text-slate-900">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-800/40 p-3 rounded-lg border border-slate-800 print:bg-transparent print:p-0 print:border-none">
                  <h3 className="text-xs font-bold text-white print:text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-400 print:text-slate-600">{edu.institution}</p>
                  <div className="flex justify-between items-center text-[10px] text-sky-400 mt-1">
                    <span>{edu.year}</span>
                    <span className="font-bold bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800 print:bg-transparent print:text-slate-800">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5 print:text-slate-900">
              <ShieldCheck className="w-4 h-4 text-sky-400 print:hidden" /> Certifications & Badges
            </h2>
            <div className="space-y-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-2 bg-slate-800/40 p-2 rounded border border-slate-800 print:bg-transparent print:p-0 print:border-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400 mt-0.5 flex-shrink-0 print:hidden" />
                  <div>
                    <strong className="text-white block print:text-slate-900">{cert.name}</strong>
                    {cert.issuer && <span className="text-[10px] text-slate-400 print:text-slate-600">{cert.issuer}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="resume-section mt-6 pt-4 border-t border-slate-800 print:border-slate-300">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5 print:text-slate-900">
            <Award className="w-4 h-4 text-amber-400 print:hidden" /> Core Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 print:text-slate-700">
            {achievements.map((ach, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/30 p-2 rounded border border-slate-800/60 print:bg-transparent print:p-0 print:border-none">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 print:bg-slate-800" />
                <span>{ach}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
