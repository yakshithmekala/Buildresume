import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, Code, CheckCircle, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveATSTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-white text-slate-900 font-sans p-8 md:p-12 max-w-[850px] mx-auto shadow-2xl rounded-sm print:p-6 print:shadow-none print:max-w-full">
      {/* Header Section */}
      <header className="border-b-2 border-slate-800 pb-5 mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight uppercase mb-1">
          {contact.fullName}
        </h1>
        <p className="text-sm md:text-base font-bold text-sky-700 uppercase tracking-wide mb-3">
          {contact.headline}
        </p>

        {/* Contact info grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs md:text-sm text-slate-700 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-600 print:hidden" />
            {contact.location}
          </span>
          <span className="text-slate-300">•</span>
          <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-sky-600">
            <Phone className="w-3.5 h-3.5 text-sky-600 print:hidden" />
            {contact.phone}
          </a>
          <span className="text-slate-300">•</span>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-sky-600 font-semibold text-sky-700">
            <Mail className="w-3.5 h-3.5 text-sky-600 print:hidden" />
            {contact.email}
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs md:text-sm text-slate-700 mt-2">
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-700 hover:underline">
              <Linkedin className="w-3.5 h-3.5 print:hidden" />
              linkedin.com/in/yakshithreddy
            </a>
          )}
          <span className="text-slate-300">•</span>
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-700 hover:underline">
              <Github className="w-3.5 h-3.5 print:hidden" />
              github.com/yakshithmekala
            </a>
          )}
        </div>

        {contact.availability && (
          <p className="text-xs italic text-slate-600 mt-2 font-medium bg-slate-100 py-1 px-3 inline-block rounded-full border border-slate-200 print:border-none print:bg-transparent">
            {contact.availability}
          </p>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="resume-section mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-2">
            Professional Summary
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-xs font-semibold text-slate-700">{edu.institution} <span className="font-normal text-slate-500">| {edu.location}</span></p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 print:border-none">{edu.grade}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skillCategories.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Technical Skills & CS Fundamentals
          </h2>
          <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 min-w-[190px]">{cat.category}:</span>
                <span className="text-slate-700 flex-1">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Key Software Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs md:text-sm">
                <div className="flex flex-wrap justify-between items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                    {proj.subtitle && <span className="text-slate-500 text-xs italic">({proj.subtitle})</span>}
                  </div>
                  {proj.date && <span className="text-xs font-medium text-slate-500">{proj.date}</span>}
                </div>

                {proj.githubUrl && (
                  <div className="mb-1.5">
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-medium text-sky-700 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> {proj.githubUrl}
                    </a>
                  </div>
                )}

                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 mb-2">
                  {proj.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="leading-normal">{bullet}</li>
                  ))}
                </ul>

                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 mt-1">
                    <span className="font-semibold text-slate-800">Tech Stack:</span>
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 font-mono px-1.5 py-0.5 rounded text-[11px] border border-slate-200 print:border-none">
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

      {/* Certifications & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-600 mt-0.5 flex-shrink-0 print:hidden" />
                  <span>
                    <strong className={cert.highlight ? "text-slate-900 font-bold" : "text-slate-700"}>{cert.name}</strong>
                    {cert.issuer && <span className="text-slate-500 font-normal"> – {cert.issuer}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {achievements.length > 0 && (
          <section className="resume-section">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Key Achievements
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-800">
              {achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0 print:hidden" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
