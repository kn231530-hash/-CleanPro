import React, { useState } from 'react';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'rooms' | 'kitchen' | 'bath'>('all');

  if (!isOpen) return null;

  const items = [
    { title: 'HEPA Air Particulate Purification', desc: 'Continuous HEPA filtration running throughout the cleaning cycle to capture 99.97% of airborne allergens.', category: 'all' },
    { title: 'Steam Degreasing & Disinfection', desc: 'High-temperature 220°F dry steam applied to tile grout, stove hood, and sink seals.', category: 'kitchen' },
    { title: 'Mattress & Upholstery Dust-Mite Sweep', desc: 'UV-C wand treatment and high-suction extraction on mattresses and sofa cushions.', category: 'rooms' },
    { title: 'Hardwood Floor Ph-Neutral Conditioning', desc: 'Gentle wood grain restoration with zero abrasive wax buildup or sticky residues.', category: 'rooms' },
    { title: 'Full Grout & Tile Descaling', desc: 'Removal of calcium rings, hard water stains, and mildew around shower fixtures.', category: 'bath' },
    { title: 'Interior Cabinet Buffing', desc: 'Microfiber polishing of all drawer fronts, hardware knobs, and shelf edges.', category: 'kitchen' },
    { title: 'Baseboards & Crown Molding Detailing', desc: 'Edge-to-edge hand wiped baseboards removing corners dust and scuff marks.', category: 'rooms' },
    { title: 'High-Touch Surface Sterilization', desc: 'Doorknobs, light switches, remotes, and thermostat panels sanitized with eco-safe disinfectant.', category: 'all' },
  ];

  const filtered = activeTab === 'all' ? items : items.filter(i => i.category === activeTab || i.category === 'all');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Hospital-Grade Checklist
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                100% Guaranteed Protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="px-4 py-2 bg-surface-container-lowest border-b border-surface-container flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Items (8)' },
            { id: 'rooms', label: 'Bed & Living' },
            { id: 'kitchen', label: 'Kitchen' },
            { id: 'bath', label: 'Bathrooms' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-label-md rounded-full transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-surface-container-low/60 rounded-xl border border-surface-container flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {item.title}
                </h4>
                <p className="font-body-md text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-tertiary font-semibold">
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span>Zero Harsh VOCs • 100% Pet-Safe</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-transform"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
