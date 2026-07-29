import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Award, CheckCircle, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernDualColumnTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { contact, summary, education, projects, skillCategories, certifications, achievements } = data;

  return (
    <div className="resume-container bg-white text-slate-800 font-sans max-w-[850px] mx-auto shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row print:flex-row print:shadow-none print:max-w-full">
      {/* Left Sidebar */}
      <aside className="w-full md:w-[32%] bg-slate-900 text-slate-100 p-6 md:p-8 flex flex-col gap-6 print:bg-slate-900 print:text-white print:w-[32%]">
        {/* Profile Header */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase leading-tight mb-1">
            {contact.fullName}
          </h1>
          <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-4">
            {contact.headline}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>{contact.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="text-sky-300 hover:underline truncate">
              {contact.email}
            </a>
          </div>
          {contact.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-sky-300 hover:underline truncate">
                LinkedIn Profile
              </a>
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <a href={contact.github} target="_blank" rel="noreferrer" className="text-sky-300 hover:underline truncate">
                GitHub Portfolio
              </a>
            </div>
          )}
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="border-t border-slate-700 pt-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-3">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-white leading-snug">{edu.degree}</h3>
                  <p className="text-slate-300 text-[11px]">{edu.institution}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span>{edu.year}</span>
                    <span className="font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="border-t border-slate-700 pt-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-3">
              Certifications
            </h2>
            <ul className="space-y-2 text-xs text-slate-200">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-tight">
                    <strong className="text-white font-semibold">{cert.name}</strong>
                    {cert.issuer && <span className="block text-[10px] text-slate-400">{cert.issuer}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Right Content */}
      <main className="w-full md:w-[68%] p-6 md:p-8 flex flex-col gap-6 bg-white text-slate-800 print:w-[68%]">
        {/* Summary */}
        {summary && (
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-800 border-b-2 border-sky-100 pb-1 mb-2">
              About & Core Competencies
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Skills Grid */}
        {skillCategories.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-800 border-b-2 border-sky-100 pb-1 mb-3">
              Technical Skill Matrix
            </h2>
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-1">{cat.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, i) => (
                      <span key={i} className="bg-white text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200 text-[11px]">
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
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-800 border-b-2 border-sky-100 pb-1 mb-3">
              Featured Software Engineering Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs border-l-2 border-sky-500 pl-3">
                  <div className="flex flex-wrap justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                    {proj.date && <span className="text-[11px] font-medium text-slate-500">{proj.date}</span>}
                  </div>
                  {proj.subtitle && <p className="text-[11px] text-sky-700 font-semibold mb-1">{proj.subtitle}</p>}
                  
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[11px] text-sky-600 hover:underline flex items-center gap-1 mb-1.5">
                      <ExternalLink className="w-3 h-3" /> {proj.githubUrl}
                    </a>
                  )}

                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-600 mb-2">
                    {proj.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="leading-snug">{bullet}</li>
                    ))}
                  </ul>

                  {proj.techStack && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="bg-sky-50 text-sky-800 font-mono text-[10px] px-1.5 py-0.5 rounded border border-sky-100">
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

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-800 border-b-2 border-sky-100 pb-1 mb-2">
              Key Recognitions & Highlights
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{ach}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};
