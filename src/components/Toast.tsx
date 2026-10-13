import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-4 py-2.5 rounded-full font-label-md text-label-md shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 border border-white/10 pointer-events-none animate-in fade-in slide-in-from-bottom-2">
      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
      <span>{message}</span>
    </div>
  );
};
