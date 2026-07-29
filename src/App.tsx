import React, { useState } from 'react';
import { blankResumeData, frontendProfileData } from './data/sampleProfiles';
import { initialResumeData } from './data/yakshithResumeData';
import { ResumeData, ResumeTheme } from './types/resume';
import { HeaderNavbar } from './components/HeaderNavbar';
import { BuilderEditor } from './components/BuilderEditor';
import { ResumePreview } from './components/ResumePreview';

export function App() {
  // Default to Blank Starter Mode on page load for visitor privacy
  const [resumeData, setResumeData] = useState<ResumeData>(blankResumeData);
  const [theme, setTheme] = useState<ResumeTheme>('executive');
  const [isBuilderMode, setIsBuilderMode] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activeProfileTarget, setActiveProfileTarget] = useState<'blank' | 'saved' | 'yakshith' | 'frontend'>('blank');

  // Saved Profile Local Storage State
  const [savedUserPasscode, setSavedUserPasscode] = useState<string>(() => {
    return localStorage.getItem('saved_user_passcode') || '1234';
  });

  const getSavedProfileData = (): ResumeData | null => {
    try {
      const raw = localStorage.getItem('saved_user_profile');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse saved profile:', e);
    }
    return null;
  };

  const [savedProfileData, setSavedProfileData] = useState<ResumeData | null>(getSavedProfileData);

  const handleSaveAndLockProfile = (passcode: string) => {
    localStorage.setItem('saved_user_profile', JSON.stringify(resumeData));
    localStorage.setItem('saved_user_passcode', passcode);
    setSavedUserPasscode(passcode);
    setSavedProfileData(resumeData);
    setIsUnlocked(false);
    setResumeData(blankResumeData);
    setActiveProfileTarget('blank');
  };

  const handleUnlockSavedProfile = () => {
    const saved = getSavedProfileData();
    if (saved) {
      setResumeData(saved);
      setIsUnlocked(true);
      setActiveProfileTarget('saved');
    }
  };

  const handleUnlockYakshithProfile = () => {
    setResumeData(initialResumeData);
    setIsUnlocked(true);
    setActiveProfileTarget('yakshith');
  };

  const handleLockProfile = () => {
    setIsUnlocked(false);
    setResumeData(blankResumeData);
    setActiveProfileTarget('blank');
  };

  const handleReset = () => {
    if (confirm('Reset resume data back to default?')) {
      if (activeProfileTarget === 'saved' && savedProfileData) {
        setResumeData(savedProfileData);
      } else if (activeProfileTarget === 'yakshith') {
        setResumeData(initialResumeData);
      } else if (activeProfileTarget === 'frontend') {
        setResumeData(frontendProfileData);
      } else {
        setResumeData(blankResumeData);
      }
    }
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
        activeProfileTarget={activeProfileTarget}
        setActiveProfileTarget={setActiveProfileTarget}
        savedProfileData={savedProfileData}
        savedUserPasscode={savedUserPasscode}
        onSaveAndLockProfile={handleSaveAndLockProfile}
        onUnlockSavedSuccess={handleUnlockSavedProfile}
        onUnlockYakshithSuccess={handleUnlockYakshithProfile}
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
