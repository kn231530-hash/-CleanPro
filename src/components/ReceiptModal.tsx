import React from 'react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  serviceTitle?: string;
  total?: number;
  date?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  orderNumber = 'CP-8924',
  serviceTitle = '2 BHK Deep Cleaning',
  total = 134.0,
  date = 'May 25, 2024 • 01:00 PM',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Digital Receipt
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div className="text-center py-2 border-b border-dashed border-surface-container">
            <span className="text-xs uppercase tracking-widest font-label-sm text-on-surface-variant font-bold">
              CleanPro Official Receipt
            </span>
            <h2 className="text-xl font-bold font-title-md mt-1 text-on-surface">
              Order #{orderNumber}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">{date}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold">
              Paid • Visa ending in 4242
            </span>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center text-on-surface">
              <span>{serviceTitle} (Base)</span>
              <span className="font-semibold">$89.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface">
              <span>Interior Refrigerator Deep Clean</span>
              <span className="font-semibold">$25.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface">
              <span>Oven & Grill Degreasing</span>
              <span className="font-semibold">$20.00</span>
            </div>
            <div className="flex justify-between items-center text-tertiary">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                Eco-Safe Plant Detergents
              </span>
              <span className="font-semibold">FREE</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant text-xs pt-1 border-t border-surface-container">
              <span>CleanPro Service Fee & HEPA Sanitation</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant text-xs">
              <span>Applicable Taxes & Transit Insurance</span>
              <span>Included</span>
            </div>
          </div>

          <div className="pt-3 border-t-2 border-surface-container flex justify-between items-baseline">
            <span className="font-title-md text-base font-bold text-on-surface">Total Paid</span>
            <span className="text-2xl font-bold text-primary font-headline-lg">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1 text-on-surface-variant">
            <div className="flex items-center gap-1.5 font-semibold text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
              <span>Covered by CleanPro $2M Insurance</span>
            </div>
            <p>Dispatched to: Maple Avenue, Apt 4B, San Francisco, CA</p>
            <p>Assigned Crew: Elena Vance (Lead Specialist)</p>
          </div>
        </div>

        <div className="p-4 bg-surface-container-low border-t border-surface-container flex gap-2">
          <button
            onClick={() => {
              alert('Downloading receipt PDF for #' + orderNumber);
              onClose();
            }}
            className="flex-1 h-11 rounded-full bg-surface-container text-on-surface font-label-md text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
