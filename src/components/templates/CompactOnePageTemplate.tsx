import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CompactOnePageTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-white text-slate-900 font-sans p-6 md:p-8 max-w-[850px] mx-auto shadow-2xl rounded-sm print:p-4 print:shadow-none print:max-w-full text-xs">
      {/* Compact Header */}
      <header className="border-b border-slate-900 pb-3 mb-3 text-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none mb-1">
          {contact.fullName}
        </h1>
        <p className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1.5">
          {contact.headline}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-slate-700 font-medium">
          <span>{contact.location}</span>
          <span>•</span>
          <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
          <span>•</span>
          <a href={`mailto:${contact.email}`} className="font-semibold text-sky-800 hover:underline">{contact.email}</a>
          <span>•</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-sky-800 hover:underline">LinkedIn</a>
          <span>•</span>
          <a href={contact.github} target="_blank" rel="noreferrer" className="text-sky-800 hover:underline">GitHub</a>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="resume-section mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1">
            Summary
          </h2>
          <p className="text-[11px] text-slate-700 leading-snug">
            {summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1">
            Technical Skills & CS Fundamentals
          </h2>
          <div className="space-y-0.5 text-[11px]">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold text-slate-900 w-[180px] flex-shrink-0">{cat.category}:</span>
                <span className="text-slate-700 flex-1">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1.5">
            Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{proj.title} {proj.subtitle && <span className="font-normal text-slate-600">({proj.subtitle})</span>}</span>
                  <span className="text-[10px] font-normal text-slate-500">{proj.date}</span>
                </div>
                <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-slate-700 mt-0.5">
                  {proj.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="leading-tight">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1">
            Education
          </h2>
          <div className="space-y-1 text-[11px]">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span> – <span className="text-slate-700">{edu.institution}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sky-900">{edu.grade}</span> <span className="text-slate-500">({edu.year})</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      <div className="grid grid-cols-2 gap-4">
        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} className="leading-tight font-medium">
                  {cert.name} {cert.issuer && <span className="text-slate-500 font-normal">({cert.issuer})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {achievements.length > 0 && (
          <section className="resume-section">
            <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 mb-1">
              Highlights
            </h2>
            <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-slate-800">
              {achievements.map((ach, idx) => (
                <li key={idx} className="leading-tight">{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
