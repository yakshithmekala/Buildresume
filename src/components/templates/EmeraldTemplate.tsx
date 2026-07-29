import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, CheckCircle } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const EmeraldTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-white text-slate-800 font-sans p-8 md:p-11 max-w-[850px] mx-auto shadow-2xl rounded-sm border-t-8 border-emerald-600 print:border-t-0 print:p-6 print:shadow-none print:max-w-full">
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-emerald-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight uppercase mb-1">
              {contact.fullName}
            </h1>
            <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
              {contact.headline}
            </p>
          </div>
          <div className="text-right text-xs text-slate-600 font-medium space-y-1">
            <div className="flex items-center justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {contact.location}
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" /> {contact.phone}
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" /> 
              <a href={`mailto:${contact.email}`} className="text-emerald-700 font-semibold hover:underline">
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline">
              <Github className="w-3.5 h-3.5" /> GitHub Portfolio
            </a>
          )}
          {contact.availability && (
            <span className="ml-auto text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px] font-semibold">
              {contact.availability}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border-l-4 border-emerald-600 mb-2">
            Professional Overview
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify px-1">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border-l-4 border-emerald-600 mb-3">
            Core Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-2 text-xs px-1">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-bold text-slate-900 w-48 flex-shrink-0">{cat.category}:</span>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((item, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border-l-4 border-emerald-600 mb-3">
            Featured Projects
          </h2>
          <div className="space-y-4 px-1">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                  {proj.date && <span className="text-[11px] font-semibold text-emerald-800">{proj.date}</span>}
                </div>
                {proj.subtitle && <p className="text-[11px] text-slate-500 font-medium mb-1">{proj.subtitle}</p>}
                
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 mb-1.5">
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
                      <span key={i} className="bg-emerald-50 text-emerald-800 font-mono text-[10px] px-1.5 py-0.5 rounded border border-emerald-200">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border-l-4 border-emerald-600 mb-3">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-600">{edu.institution}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>{edu.year}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border-l-4 border-emerald-600 mb-3">
              Certifications & Badges
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
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
