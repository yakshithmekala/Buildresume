import React, { useState } from 'react';
import { ResumeTheme, ResumeData } from '../types/resume';
import { sampleProfiles } from '../data/sampleProfiles';
import { analyzeJd, tailorResumeForJd, JdAnalysisResult } from '../utils/jdOptimizer';
import { recommendBestTemplate } from '../utils/aiTemplatePicker';
import { Download, Copy, Check, Edit3, Eye, FileJson, Sparkles, Layout, ShieldCheck, Gem, Briefcase, Feather, Printer, Loader2, Users, Target, Rocket, CheckCircle2, AlertCircle, X, Bot } from 'lucide-react';

interface HeaderNavbarProps {
  theme: ResumeTheme;
  setTheme: (t: ResumeTheme) => void;
  isBuilderMode: boolean;
  setIsBuilderMode: (b: boolean) => void;
  data: ResumeData;
  onImportJson: (data: ResumeData) => void;
  onSelectPresetProfile: (data: ResumeData) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  theme,
  setTheme,
  isBuilderMode,
  setIsBuilderMode,
  data,
  onImportJson,
  onSelectPresetProfile,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // JD Modal State
  const [showJdModal, setShowJdModal] = useState(false);
  const [jdText, setJdText] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState<JdAnalysisResult | null>(null);

  // AI Recommendation Notification State
  const [aiRecommendationMsg, setAiRecommendationMsg] = useState<string | null>(null);

  // AI Auto-Pick Template
  const handleAiPickTemplate = (jd: string = jdText) => {
    const rec = recommendBestTemplate(data, jd);
    setTheme(rec.recommendedTheme);
    setAiRecommendationMsg(`🤖 AI selected ${rec.themeName}: ${rec.reason}`);
    setTimeout(() => setAiRecommendationMsg(null), 5000);
  };

  // Analyze JD text
  const handleJdTextChange = (text: string) => {
    setJdText(text);
    if (text.trim().length > 20) {
      const result = analyzeJd(data, text);
      setJdAnalysis(result);
    } else {
      setJdAnalysis(null);
    }
  };

  // Tailor Resume for JD
  const handleTailorForJd = () => {
    if (!jdText.trim()) return;
    const { tailoredData, analysis } = tailorResumeForJd(data, jdText);
    onImportJson(tailoredData);
    setJdAnalysis(analysis);
    // Also auto-pick the best template for this JD!
    handleAiPickTemplate(jdText);
  };

  // Direct 1-Click PDF Download to Downloads folder
  const handleDirectPdfDownload = async () => {
    const element = document.querySelector('.resume-container') as HTMLElement;
    if (!element) return;

    setIsDownloading(true);
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = (html2pdfModule as any).default || html2pdfModule;

      const filename = `${data.contact.fullName.trim().replace(/\s+/g, '_')}_Resume.pdf`;

      const opt = {
        margin: [0.15, 0.15, 0.15, 0.15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Direct PDF export error, falling back to browser print:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  // Browser Print option
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
    <>
      <header className="no-print bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & User Profile Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-extrabold text-lg">
                Y
              </div>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                  {data.contact.fullName}
                </h1>
                <p className="text-xs text-slate-400">Interactive Resume & Builder</p>
              </div>
            </div>

            {/* Preset Profile Selector (New User / Multi-User) */}
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <Users className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <select
                onChange={(e) => {
                  const selected = sampleProfiles.find(p => p.id === e.target.value);
                  if (selected) {
                    onSelectPresetProfile(selected.data);
                    setIsBuilderMode(true);
                  }
                }}
                className="bg-transparent text-slate-300 font-semibold text-xs focus:outline-none cursor-pointer"
              >
                {sampleProfiles.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                    {p.name}
                  </option>
                ))}
              </select>
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

          {/* 7 Themes Selector + 🤖 AI Auto-Pick Button */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full md:w-auto overflow-x-auto">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
              <Layout className="w-3.5 h-3.5 text-sky-400" /> Themes:
            </span>
            
            {/* 🤖 AI Auto-Pick Best Template Button */}
            <button
              onClick={() => handleAiPickTemplate()}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold whitespace-nowrap flex items-center gap-1 shadow-md shadow-purple-500/20"
              title="Let AI automatically pick the best template for your target role"
            >
              <Bot className="w-3.5 h-3.5 text-amber-300 animate-bounce" /> AI Pick Template
            </button>

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
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            {/* Prominent Target JD Matcher Button */}
            <button
              onClick={() => setShowJdModal(true)}
              className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Target className="w-4 h-4 text-emerald-400 animate-pulse" />
              Match Job Description (JD)
            </button>

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

            {/* Direct Download PDF Button */}
            <button
              onClick={handleDirectPdfDownload}
              disabled={isDownloading}
              className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>

            <button
              onClick={handlePrint}
              title="Print or Save via Browser Print Dialog"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
            >
              <Printer className="w-4 h-4" />
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

        {/* AI Recommendation Toast Banner */}
        {aiRecommendationMsg && (
          <div className="max-w-7xl mx-auto mt-2 bg-gradient-to-r from-purple-950/90 to-indigo-950/90 border border-purple-500/40 text-purple-200 px-4 py-2 rounded-xl text-xs flex items-center justify-between shadow-lg animate-fade-in">
            <span className="font-semibold">{aiRecommendationMsg}</span>
            <button onClick={() => setAiRecommendationMsg(null)} className="text-purple-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Target Job Description (JD) Modal */}
      {showJdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            
            <button
              onClick={() => setShowJdModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">
                  Target Job Description (JD) Matcher & AI Optimizer
                </h2>
                <p className="text-xs text-slate-400">
                  Paste any job post to calculate your live ATS score & auto-match your resume keywords.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Paste Job Description (JD) Text below:
              </label>
              <textarea
                rows={5}
                value={jdText}
                onChange={(e) => handleJdTextChange(e.target.value)}
                placeholder="Paste Job Description (JD) here... (e.g. We are seeking a Software Development Engineer with experience in Java, React, Node.js, REST APIs, AWS, MongoDB...)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-500"
              />
            </div>

            {jdAnalysis && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-200">Live ATS Match Score:</span>
                  <span className={`font-black text-sm px-3 py-1 rounded-full ${
                    jdAnalysis.matchScore >= 75
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {jdAnalysis.matchScore}% Match Score
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      jdAnalysis.matchScore >= 75 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    }`}
                    style={{ width: `${jdAnalysis.matchScore}%` }}
                  />
                </div>

                {jdAnalysis.matchedKeywords.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords ({jdAnalysis.matchedKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.matchedKeywords.map((kw, i) => (
                        <span key={i} className="bg-emerald-950 text-emerald-300 font-mono text-[11px] px-2 py-0.5 rounded border border-emerald-800">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {jdAnalysis.missingKeywords.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-amber-400 mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Missing JD Keywords to Add ({jdAnalysis.missingKeywords.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.missingKeywords.map((kw, i) => (
                        <span key={i} className="bg-amber-950 text-amber-300 font-mono text-[11px] px-2 py-0.5 rounded border border-amber-800">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    handleTailorForJd();
                    setShowJdModal(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all mt-2"
                >
                  <Rocket className="w-4 h-4 text-emerald-200" /> Tailor Resume & Auto-Pick Best Template
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowJdModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
