import React, { useState } from 'react';
import { blankResumeData } from './data/sampleProfiles';
import { initialResumeData } from './data/yakshithResumeData';
import { ResumeData, ResumeTheme } from './types/resume';
import { HeaderNavbar } from './components/HeaderNavbar';
import { BuilderEditor } from './components/BuilderEditor';
import { ResumePreview } from './components/ResumePreview';

export function App() {
  // Default to Blank Starter Mode on page load for visitor privacy
  const [resumeData, setResumeData] = useState<ResumeData>(blankResumeData);
  const [theme, setTheme] = useState<ResumeTheme>('executive');
  const [isBuilderMode, setIsBuilderMode] = useState<boolean>(true); // Open builder by default for new visitors
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleReset = () => {
    if (confirm('Reset resume data back to initial state?')) {
      setResumeData(isUnlocked ? initialResumeData : blankResumeData);
    }
  };

  const handleLockProfile = () => {
    setIsUnlocked(false);
    setResumeData(blankResumeData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <HeaderNavbar
        theme={theme}
        setTheme={setTheme}
        isBuilderMode={isBuilderMode}
        setIsBuilderMode={setIsBuilderMode}
        data={resumeData}
        onImportJson={(newData) => setResumeData(newData)}
        onSelectPresetProfile={(newProfileData) => setResumeData(newProfileData)}
        isUnlocked={isUnlocked}
        onUnlockSuccess={() => setIsUnlocked(true)}
        onLockProfile={handleLockProfile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Editor Sidebar (visible when builder mode toggled) */}
        {isBuilderMode && (
          <div className="no-print w-full lg:w-96 flex-shrink-0 z-20">
            <BuilderEditor
              data={resumeData}
              onChange={setResumeData}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Live Resume View Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col items-center justify-start bg-slate-950 print:bg-white print:p-0">
          <div className="w-full max-w-[900px] my-2 print:my-0">
            <ResumePreview data={resumeData} theme={theme} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
