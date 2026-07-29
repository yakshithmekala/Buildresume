import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, CheckCircle } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const IndigoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-white text-slate-900 font-sans p-8 md:p-12 max-w-[850px] mx-auto shadow-2xl rounded-sm print:p-6 print:shadow-none print:max-w-full">
      {/* Header */}
      <header className="bg-indigo-950 text-white p-6 rounded-lg mb-6 shadow-md print:bg-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase mb-1">
              {contact.fullName}
            </h1>
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              {contact.headline}
            </p>
          </div>
          <div className="text-xs text-indigo-200 space-y-1 font-medium text-right md:text-right w-full md:w-auto">
            <p className="flex items-center gap-1.5 justify-start md:justify-end">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {contact.location}
            </p>
            <p className="flex items-center gap-1.5 justify-start md:justify-end">
              <Phone className="w-3.5 h-3.5 text-indigo-400" /> {contact.phone}
            </p>
            <p className="flex items-center gap-1.5 justify-start md:justify-end">
              <Mail className="w-3.5 h-3.5 text-indigo-400" /> {contact.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-300 mt-4 pt-3 border-t border-indigo-800/80">
          <div className="flex items-center gap-3">
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-white">
                <Linkedin className="w-3.5 h-3.5 text-indigo-400" /> LinkedIn
              </a>
            )}
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-white">
                <Github className="w-3.5 h-3.5 text-indigo-400" /> GitHub
              </a>
            )}
          </div>
          {contact.availability && (
            <span className="bg-indigo-900/90 text-indigo-200 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-indigo-700">
              {contact.availability}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1 mb-3">
            Technical Skills & CS Fundamentals
          </h2>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-bold text-slate-900 w-48 flex-shrink-0">{cat.category}:</span>
                <span className="text-slate-700 flex-1">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1 mb-3">
            Projects & Practical Experience
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                  {proj.date && <span className="text-[11px] font-semibold text-indigo-800">{proj.date}</span>}
                </div>
                {proj.subtitle && <p className="text-[11px] text-indigo-700 font-medium mb-1">{proj.subtitle}</p>}
                
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[11px] text-indigo-700 hover:underline flex items-center gap-1 mb-1.5">
                    <ExternalLink className="w-3 h-3" /> {proj.githubUrl}
                  </a>
                )}

                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 mb-2">
                  {proj.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>

                {proj.techStack && (
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-900 font-mono text-[10px] px-1.5 py-0.5 rounded border border-indigo-200">
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
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-600">{edu.institution}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>{edu.year}</span>
                    <span className="font-bold text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b-2 border-indigo-200 pb-1 mb-3">
              Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-bold">{cert.name}</strong>
                    {cert.issuer && <span className="text-slate-500 font-normal"> – {cert.issuer}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
