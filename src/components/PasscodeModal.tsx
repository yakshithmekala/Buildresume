import React, { useState } from 'react';
import { Lock, KeyRound, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1919') {
      setErrorMsg(false);
      setPinInput('');
      onSuccess();
    } else {
      setErrorMsg(true);
      setPinInput('');
    }
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

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 text-white">
          <Lock className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-base font-extrabold text-white">
            Private Profile Locked 🔒
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter the secret 4-digit passcode to unlock Mekala Yakshith Reddy's private resume:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter Passcode..."
              autoFocus
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-center text-xl font-mono tracking-widest text-white focus:outline-none focus:border-amber-500"
            />
            <KeyRound className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 font-semibold flex items-center justify-center gap-1">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Incorrect passcode! Access denied.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all"
          >
            Unlock Profile
          </button>
        </form>

      </div>
    </div>
  );
};
