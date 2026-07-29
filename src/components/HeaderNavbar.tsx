import React, { useState } from 'react';
import { ResumeTheme, ResumeData } from '../types/resume';
import { Download, Copy, Check, Edit3, Eye, FileJson, Sparkles, Layout, ShieldCheck, Gem, Briefcase, Feather } from 'lucide-react';

interface HeaderNavbarProps {
  theme: ResumeTheme;
  setTheme: (t: ResumeTheme) => void;
  isBuilderMode: boolean;
  setIsBuilderMode: (b: boolean) => void;
  data: ResumeData;
  onImportJson: (data: ResumeData) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  theme,
  setTheme,
  isBuilderMode,
  setIsBuilderMode,
  data,
  onImportJson,
}) => {
  const [copied, setCopied] = useState(false);

  // Trigger Print to PDF
  const handlePrint = () => {
    window.print();
  };

  // Copy Plain Text for ATS job forms
  const handleCopyAtsText = () => {
    const text = `
${data.contact.fullName.toUpperCase()}
${data.contact.headline}
Location: ${data.contact.location} | Phone: ${data.contact.phone} | Email: ${data.contact.email}
LinkedIn: ${data.contact.linkedin} | GitHub: ${data.contact.github}

PROFESSIONAL SUMMARY
${data.summary}

EDUCATION
${data.education.map(e => `- ${e.degree}, ${e.institution} (${e.year}) | Grade: ${e.grade}`).join('\n')}

TECHNICAL SKILLS
${data.skillCategories.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECTS
${data.projects.map(p => `${p.title} (${p.date || ''})\nTech Stack: ${p.techStack.join(', ')}\n${p.bulletPoints.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

CERTIFICATIONS & HIGHLIGHTS
${data.certifications.map(c => `- ${c.name} (${c.issuer || ''})`).join('\n')}

KEY ACHIEVEMENTS
${data.achievements.map(a => `• ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download JSON backup
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.contact.fullName.replace(/\s+/g, '_')}_Resume_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="no-print bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & User Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-extrabold text-lg">
              Y
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                Mekala Yakshith Reddy
                <span className="bg-sky-500/20 text-sky-400 text-[10px] px-2 py-0.5 rounded-full font-medium border border-sky-500/30">
                  7 Templates
                </span>
              </h1>
              <p className="text-xs text-slate-400">Software Development Engineer</p>
            </div>
          </div>

          {/* Builder / Preview Toggle (Mobile) */}
          <button
            onClick={() => setIsBuilderMode(!isBuilderMode)}
            className="md:hidden text-xs bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border border-slate-700"
          >
            {isBuilderMode ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            {isBuilderMode ? 'Preview' : 'Edit'}
          </button>
        </div>

        {/* 7 Themes Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full md:w-auto overflow-x-auto">
          <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
            <Layout className="w-3.5 h-3.5 text-sky-400" /> Themes:
          </span>
          
          <button
            onClick={() => setTheme('executive')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 ${
              theme === 'executive'
                ? 'bg-sky-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3 h-3" /> Executive ATS
          </button>

          <button
            onClick={() => setTheme('emerald')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 ${
              theme === 'emerald'
                ? 'bg-emerald-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Gem className="w-3 h-3 text-emerald-300" /> Emerald
          </button>

          <button
            onClick={() => setTheme('indigo')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 ${
              theme === 'indigo'
                ? 'bg-indigo-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Briefcase className="w-3 h-3 text-indigo-300" /> Indigo
          </button>

          <button
            onClick={() => setTheme('glass')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 ${
              theme === 'glass'
                ? 'bg-sky-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> Tech Glass
          </button>

          <button
            onClick={() => setTheme('nordic')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 ${
              theme === 'nordic'
                ? 'bg-slate-700 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Feather className="w-3 h-3" /> Nordic
          </button>

          <button
            onClick={() => setTheme('modern')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              theme === 'modern'
                ? 'bg-sky-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Modern Dual
          </button>

          <button
            onClick={() => setTheme('compact')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap ${
              theme === 'compact'
                ? 'bg-sky-600 text-white shadow font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Compact 1-Page
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsBuilderMode(!isBuilderMode)}
            className={`hidden md:flex text-xs px-3 py-2 rounded-xl font-semibold items-center gap-1.5 border transition-all ${
              isBuilderMode
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isBuilderMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isBuilderMode ? 'View Full Resume' : 'Edit Resume Data'}
          </button>

          <button
            onClick={handleCopyAtsText}
            title="Copy plain text formatted for job application forms"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
            {copied ? 'Copied!' : 'Copy ATS Text'}
          </button>

          <button
            onClick={handlePrint}
            className="text-xs bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>

          <button
            onClick={handleExportJson}
            title="Backup Resume as JSON"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
          >
            <FileJson className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
