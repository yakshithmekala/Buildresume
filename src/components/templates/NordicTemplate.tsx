import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, CheckCircle } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const NordicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-slate-50 text-slate-900 font-sans p-8 md:p-12 max-w-[850px] mx-auto shadow-2xl rounded-sm print:bg-white print:p-6 print:shadow-none print:max-w-full">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-6 print:border-none print:p-0 print:shadow-none">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
          {contact.fullName}
        </h1>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">
          {contact.headline}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {contact.location}
          </span>
          <span>•</span>
          <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-slate-900">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> {contact.phone}
          </a>
          <span>•</span>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1 font-semibold text-slate-800 hover:underline">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> {contact.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline font-semibold">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline font-semibold">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
          {contact.availability && (
            <span className="ml-auto text-slate-700 bg-slate-200/80 px-2.5 py-0.5 rounded text-[11px] font-medium">
              {contact.availability}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="resume-section mb-6 bg-white p-5 rounded-lg border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Profile & Objective
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Key Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-6 bg-white p-5 rounded-lg border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Selected Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs pb-3 border-b border-slate-100 last:border-none last:pb-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                  {proj.date && <span className="text-[11px] font-mono text-slate-500">{proj.date}</span>}
                </div>
                {proj.subtitle && <p className="text-[11px] text-slate-500 mb-1">{proj.subtitle}</p>}
                
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[11px] text-slate-700 hover:underline flex items-center gap-1 mb-1.5 font-mono">
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
                      <span key={i} className="bg-slate-100 text-slate-700 font-mono text-[10px] px-1.5 py-0.5 rounded border border-slate-200">
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

      {/* Technical Skills */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-6 bg-white p-5 rounded-lg border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Technical Matrix
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

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.length > 0 && (
          <section className="resume-section bg-white p-5 rounded-lg border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-600">{edu.institution}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>{edu.year}</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="resume-section bg-white p-5 rounded-lg border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
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
