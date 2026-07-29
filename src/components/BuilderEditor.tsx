import React, { useState } from 'react';
import { ResumeData, EducationItem, ProjectItem, CertificationItem, ResumeSectionId } from '../types/resume';
import { autoFormatAndSortResume } from '../utils/formatResumeData';
import { analyzeJd, tailorResumeForJd, JdAnalysisResult } from '../utils/jdOptimizer';
import { User, Briefcase, GraduationCap, Award, Code, Sparkles, Plus, Trash2, ChevronDown, ChevronUp, RotateCcw, Wand2, ArrowUp, ArrowDown, Layers, Target, CheckCircle2, AlertCircle, Rocket } from 'lucide-react';

interface BuilderEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onReset: () => void;
}

export const BuilderEditor: React.FC<BuilderEditorProps> = ({ data, onChange, onReset }) => {
  const [activeSection, setActiveSection] = useState<string>('contact');
  const [formatSuccess, setFormatSuccess] = useState(false);

  // JD Matcher State
  const [jdText, setJdText] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState<JdAnalysisResult | null>(null);

  // Analyze JD on text change
  const handleJdTextChange = (text: string) => {
    setJdText(text);
    if (text.trim().length > 20) {
      const result = analyzeJd(data, text);
      setJdAnalysis(result);
    } else {
      setJdAnalysis(null);
    }
  };

  // 1-Click Tailor Resume for JD
  const handleTailorForJd = () => {
    if (!jdText.trim()) return;
    const { tailoredData, analysis } = tailorResumeForJd(data, jdText);
    onChange(tailoredData);
    setJdAnalysis(analysis);
  };

  // Auto Format & Sort
  const handleAutoFormat = () => {
    const formatted = autoFormatAndSortResume(data);
    onChange(formatted);
    setFormatSuccess(true);
    setTimeout(() => setFormatSuccess(false), 2500);
  };

  // Section Reordering
  const currentSectionOrder: ResumeSectionId[] = data.sectionOrder || [
    'summary', 'skills', 'projects', 'education', 'certifications', 'achievements'
  ];

  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const newOrder = [...currentSectionOrder];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    
    const temp = newOrder[idx];
    newOrder[idx] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    onChange({
      ...data,
      sectionOrder: newOrder
    });
  };

  // Contact Change
  const handleContactChange = (field: keyof typeof data.contact, value: string) => {
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [field]: value
      }
    });
  };

  // Summary Change
  const handleSummaryChange = (value: string) => {
    onChange({
      ...data,
      summary: value
    });
  };

  // Education Edits
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'New Degree / Course',
      institution: 'University / Institute Name',
      location: 'City, Country',
      year: '2023 - 2027',
      grade: 'CGPA: 9.0'
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const handleUpdateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const handleDeleteEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  // Project Edits
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Software Project Title',
      subtitle: 'Brief System Overview',
      date: '2025',
      techStack: ['React', 'Node.js', 'MongoDB'],
      bulletPoints: ['Architected scalable full-stack web application.']
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const handleUpdateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const handleDeleteProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Bullet Point Edits inside Project
  const handleProjectBulletChange = (projId: string, idx: number, val: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projId) {
          const newBullets = [...p.bulletPoints];
          newBullets[idx] = val;
          return { ...p, bulletPoints: newBullets };
        }
        return p;
      })
    });
  };

  const handleAddProjectBullet = (projId: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projId) {
          return { ...p, bulletPoints: [...p.bulletPoints, 'Implemented automated feature.'] };
        }
        return p;
      })
    });
  };

  const handleDeleteProjectBullet = (projId: string, idx: number) => {
    onChange({
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projId) {
          return { ...p, bulletPoints: p.bulletPoints.filter((_, i) => i !== idx) };
        }
        return p;
      })
    });
  };

  // Skill Edits
  const handleUpdateSkillCategory = (idx: number, category: string, itemsStr: string) => {
    const items = itemsStr.split(',').map(s => s.trim()).filter(Boolean);
    const newCats = [...data.skillCategories];
    newCats[idx] = { category, items };
    onChange({ ...data, skillCategories: newCats });
  };

  // Certification Edits
  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      highlight: true
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const handleDeleteCert = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter(c => c.id !== id) });
  };

  const sectionLabels: Record<ResumeSectionId, string> = {
    summary: 'Professional Summary',
    skills: 'Technical Skills',
    projects: 'Key Projects',
    education: 'Education',
    certifications: 'Certifications',
    achievements: 'Key Achievements'
  };

  return (
    <aside className="w-full lg:w-96 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto max-h-screen text-xs text-slate-200">
      
      {/* Top Controls */}
      <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" /> Resume Builder Panel
        </h2>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
          title="Reset to Original Data"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* 🎯 Job Description (JD) Target Matcher Section */}
      <div className="border border-emerald-500/30 rounded-xl overflow-hidden bg-slate-950/80 mb-3 shadow-lg shadow-emerald-500/5">
        <button
          onClick={() => setActiveSection(activeSection === 'jd' ? '' : 'jd')}
          className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-emerald-400 bg-slate-900/90 hover:bg-slate-800"
        >
          <span className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" /> Target Job Description (JD) Matcher
          </span>
          {activeSection === 'jd' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'jd' && (
          <div className="p-3 space-y-3 bg-slate-950">
            <p className="text-[11px] text-slate-400">
              Paste a Job Description (JD) below to calculate ATS match score & auto-tailor your resume:
            </p>
            <textarea
              rows={4}
              value={jdText}
              onChange={(e) => handleJdTextChange(e.target.value)}
              placeholder="Paste Job Description (JD) text here... (e.g., We are hiring a Software Engineer skilled in Java, React, MongoDB, AWS...)"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-500"
            />

            {/* Analysis Meter & Keywords */}
            {jdAnalysis && (
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2.5">
                {/* Score Bar */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300">ATS Match Score:</span>
                  <span className={`font-black text-sm px-2 py-0.5 rounded ${
                    jdAnalysis.matchScore >= 75 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {jdAnalysis.matchScore}% Match
                  </span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      jdAnalysis.matchScore >= 75 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    }`}
                    style={{ width: `${jdAnalysis.matchScore}%` }}
                  />
                </div>

                {/* Matched Keywords */}
                {jdAnalysis.matchedKeywords.length > 0 && (
                  <div>
                    <span className="block text-[10px] text-emerald-400 font-bold mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Matched Keywords ({jdAnalysis.matchedKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.matchedKeywords.map((kw, i) => (
                        <span key={i} className="bg-emerald-950/80 text-emerald-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-emerald-800">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords */}
                {jdAnalysis.missingKeywords.length > 0 && (
                  <div>
                    <span className="block text-[10px] text-amber-400 font-bold mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Recommended JD Keywords ({jdAnalysis.missingKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.missingKeywords.map((kw, i) => (
                        <span key={i} className="bg-amber-950/60 text-amber-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-amber-800">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tailor Button */}
                <button
                  onClick={handleTailorForJd}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 shadow-md transition-all mt-2"
                >
                  <Rocket className="w-4 h-4 text-emerald-200" /> Tailor Resume for this JD
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 1-Click Auto Format & Perfect Order Button */}
      <button
        onClick={handleAutoFormat}
        className={`w-full py-2.5 px-3 mb-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
          formatSuccess
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
            : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white border-transparent shadow-md shadow-sky-500/20'
        }`}
      >
        <Wand2 className="w-4 h-4 text-amber-300 animate-pulse" />
        {formatSuccess ? '✨ Auto-Formatted & Sorted Perfectly!' : '✨ Auto-Format & Perfect Order'}
      </button>

      {/* Section Reorder Control Accordion */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 mb-3">
        <button
          onClick={() => setActiveSection(activeSection === 'reorder' ? '' : 'reorder')}
          className="w-full px-3 py-2 flex items-center justify-between font-bold text-indigo-400 bg-slate-900/90 hover:bg-slate-800 text-xs"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Reorder Resume Sections
          </span>
          {activeSection === 'reorder' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'reorder' && (
          <div className="p-2 space-y-1.5 bg-slate-950">
            <p className="text-[11px] text-slate-400 mb-2 italic">
              Move sections up or down to customize your resume structure:
            </p>
            {currentSectionOrder.map((secId, idx) => (
              <div key={secId} className="flex items-center justify-between bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-xs">
                <span className="font-semibold text-slate-200">{idx + 1}. {sectionLabels[secId]}</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === currentSectionOrder.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion Edit Forms */}
      <div className="space-y-3">
        {/* Contact Section */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'contact' ? '' : 'contact')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Personal & Contact Info
            </span>
            {activeSection === 'contact' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'contact' && (
            <div className="p-3 space-y-2.5">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.contact.fullName}
                  onChange={(e) => handleContactChange('fullName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Headline / Target Title</label>
                <input
                  type="text"
                  value={data.contact.headline}
                  onChange={(e) => handleContactChange('headline', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={data.contact.location}
                  onChange={(e) => handleContactChange('location', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Availability / Status</label>
                <input
                  type="text"
                  value={data.contact.availability}
                  onChange={(e) => handleContactChange('availability', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.contact.linkedin}
                  onChange={(e) => handleContactChange('linkedin', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={data.contact.github}
                  onChange={(e) => handleContactChange('github', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'summary' ? '' : 'summary')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Professional Summary
            </span>
            {activeSection === 'summary' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'summary' && (
            <div className="p-3">
              <textarea
                rows={5}
                value={data.summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-sky-500 text-xs leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Key Projects ({data.projects.length})
            </span>
            {activeSection === 'projects' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'projects' && (
            <div className="p-3 space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{proj.title}</span>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                  
                  <input
                    type="text"
                    value={proj.subtitle || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'subtitle', e.target.value)}
                    placeholder="Subtitle / Org"
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={proj.techStack.join(', ')}
                      onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] text-slate-400">Bullet Points</label>
                    {proj.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex gap-1 items-start">
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleProjectBulletChange(proj.id, idx, e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-xs"
                        />
                        <button
                          onClick={() => handleDeleteProjectBullet(proj.id, idx)}
                          className="text-red-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddProjectBullet(proj.id)}
                      className="text-sky-400 text-[11px] font-semibold flex items-center gap-1 mt-1 hover:underline"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet Point
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddProject}
                className="w-full py-2 bg-sky-600/20 text-sky-400 border border-sky-500/30 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-sky-600/30"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>
          )}
        </div>

        {/* Technical Skills */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4" /> Technical Skills Matrix
            </span>
            {activeSection === 'skills' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'skills' && (
            <div className="p-3 space-y-3">
              {data.skillCategories.map((cat, idx) => (
                <div key={idx} className="p-2 bg-slate-900 border border-slate-800 rounded space-y-1">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => handleUpdateSkillCategory(idx, e.target.value, cat.items.join(', '))}
                    className="w-full font-bold bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sky-300 text-xs"
                  />
                  <textarea
                    rows={2}
                    value={cat.items.join(', ')}
                    onChange={(e) => handleUpdateSkillCategory(idx, cat.category, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </span>
            {activeSection === 'education' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'education' && (
            <div className="p-3 space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-2 bg-slate-900 border border-slate-800 rounded space-y-1.5 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{edu.degree}</span>
                    <button onClick={() => handleDeleteEducation(edu.id)} className="text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => handleUpdateEducation(edu.id, 'grade', e.target.value)}
                      placeholder="CGPA / Score"
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                      placeholder="Year"
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddEducation}
                className="w-full py-1.5 bg-slate-800 text-sky-400 rounded font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')}
            className="w-full px-3 py-2.5 flex items-center justify-between font-bold text-sky-400 bg-slate-900/80 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" /> Certifications ({data.certifications.length})
            </span>
            {activeSection === 'certifications' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {activeSection === 'certifications' && (
            <div className="p-3 space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex gap-2 items-center bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = data.certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c);
                      onChange({ ...data, certifications: updated });
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                  <button onClick={() => handleDeleteCert(cert.id)} className="text-red-400 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddCert}
                className="w-full py-1.5 bg-slate-800 text-sky-400 rounded font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Certification
              </button>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
};
