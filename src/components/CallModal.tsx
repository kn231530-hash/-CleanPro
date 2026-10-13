import React, { useState, useEffect } from 'react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleanerName?: string;
  cleanerAvatar?: string;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  cleanerName = 'Elena Vance',
  cleanerAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB',
}) => {
  const [callState, setCallState] = useState<'calling' | 'connected'>('calling');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setCallState('calling');
      setSeconds(0);
      const connectTimer = setTimeout(() => {
        setCallState('connected');
      }, 2500);

      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(connectTimer);
        clearInterval(timer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center text-white py-8 px-6 text-center animate-in zoom-in-95 duration-200">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
          <img
            src={cleanerAvatar}
            alt={cleanerName}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-white/20 relative z-10 shadow-xl"
          />
        </div>

        <h3 className="text-2xl font-bold font-title-md">{cleanerName}</h3>
        <p className="text-sm font-label-md text-white/70 mt-1">CleanPro Lead Specialist</p>

        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium">
          {callState === 'calling' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              <span>Calling via Masked CleanPro Line...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
              <span>Connected • {formatTime(seconds)}</span>
            </>
          )}
        </div>

        {callState === 'connected' && (
          <p className="text-xs text-white/60 mt-3 italic">
            "Hello! This is Elena, CleanPro dispatch. I'm just turning onto Maple Ave now!"
          </p>
        )}

        {/* Audio control actions */}
        <div className="flex items-center justify-center gap-6 mt-12 mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-white text-[#131b2e]' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-white text-[#131b2e]' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isSpeaker ? 'volume_up' : 'volume_down'}
            </span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={onClose}
          className="w-16 h-16 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-lg active:scale-90 hover:bg-red-700 transition-all"
        >
          <span className="material-symbols-outlined text-[30px]">call_end</span>
        </button>
        <span className="text-xs text-white/60 mt-3">End Call</span>
      </div>
    </div>
  );
};
