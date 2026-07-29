import React, { useState } from 'react';
import { Lock, KeyRound, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SaveProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (passcode: string) => void;
  existingPasscode?: string;
}

export const SaveProfileModal: React.FC<SaveProfileModalProps> = ({
  isOpen,
  onClose,
  onSaveSuccess,
  existingPasscode = '1234',
}) => {
  const [pinInput, setPinInput] = useState(existingPasscode);
  const [confirmPinInput, setConfirmPinInput] = useState(existingPasscode);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pinInput.trim();
    const confirmPin = confirmPinInput.trim();

    if (!/^\d{4}$/.test(pin)) {
      setErrorMsg('Passcode must be exactly 4 digits (e.g. 1234).');
      return;
    }

    if (pin !== confirmPin) {
      setErrorMsg('Passcodes do not match. Please check and try again.');
      return;
    }

    setErrorMsg('');
    onSaveSuccess(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-white">
            Save & Lock My Profile 🔒
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Securely save your resume data in local browser storage and protect it with a 4-digit passcode.
            In the future, unlock your profile in 1 click to instantly paste JDs and generate target resumes!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="text-left">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Create 4-Digit Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="1234"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 pl-10 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Confirm 4-Digit Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                value={confirmPinInput}
                onChange={(e) => {
                  setConfirmPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="1234"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 pl-10 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 font-semibold bg-red-950/40 border border-red-800/50 py-1.5 px-3 rounded-lg">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Lock className="w-4 h-4" /> Save & Lock Profile
          </button>
        </form>
      </div>
    </div>
  );
};
