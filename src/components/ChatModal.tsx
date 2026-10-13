import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/index.ts';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleanerName?: string;
  cleanerAvatar?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  cleanerName = 'Elena Vance',
  cleanerAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'cleaner',
      text: 'Hi there! I am on my way with the industrial HEPA equipment. I should be there in about 12-14 minutes!',
      time: '10:34 AM',
    },
    {
      id: '2',
      sender: 'cleaner',
      text: 'Is there any dedicated visitor parking or buzzer code I should know about?',
      time: '10:35 AM',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulated response from Elena
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Got it! Thanks for letting me know. I'll take great care of everything.";
      const lower = text.toLowerCase();
      if (lower.includes('park') || lower.includes('garage')) {
        reply = "Perfect, I'll park in the guest bay. See you shortly!";
      } else if (lower.includes('code') || lower.includes('buzz') || lower.includes('door')) {
        reply = "Noted the access code! I'll buzz as soon as I pull up to the lobby.";
      } else if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) {
        reply = "No problem at all! All our solutions are certified pet-safe and enzymatic.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'cleaner',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const quickReplies = [
    'Gate code is #4829',
    'Visitor parking is open on Level 1',
    'We have a friendly dog inside',
    'Please ring the doorbell',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[620px] overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-3.5 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={cleanerAvatar}
                alt={cleanerName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-tertiary ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-title-md text-title-md text-on-surface font-bold leading-none">
                  {cleanerName}
                </h3>
                <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> En Route • 12 mins away
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-low/30">
          <div className="text-center my-1">
            <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-[11px] font-label-sm rounded-full">
              Today • CleanPro Live Dispatch
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm ${
                  m.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-xs'
                    : 'bg-surface-container-lowest text-on-surface rounded-bl-xs border border-surface-container'
                }`}
              >
                <p className="font-body-md text-body-md leading-relaxed">{m.text}</p>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant/70 mt-1 px-1">
                {m.time}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-2 bg-surface-container-lowest rounded-xl max-w-[90px] border border-surface-container">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick chip responses */}
        <div className="px-3 py-1.5 bg-surface-container-lowest border-t border-surface-container overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply)}
              className="shrink-0 text-xs font-label-sm bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-fixed transition-colors active:scale-95"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message to Elena..."
            className="flex-1 h-11 px-3.5 bg-surface-container-low rounded-xl text-sm font-body-md text-on-surface outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
