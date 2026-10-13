import React, { useState } from 'react';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (reason: string) => void;
  onReschedule: () => void;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  onConfirmCancel,
  onReschedule,
}) => {
  const [selectedReason, setSelectedReason] = useState('Change of plans');

  if (!isOpen) return null;

  const reasons = [
    'Change of plans / Emergency',
    'Cleaner running late / Need different slot',
    'Booked by mistake',
    'Other reason',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-[24px]">warning</span>
            <h3 className="font-title-md text-lg text-on-surface font-bold">
              Modify or Cancel Service?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1.5 text-on-surface-variant">
          <p className="font-semibold text-on-surface">Transit Policy Notice</p>
          <p>
            Elena has already dispatched and is currently 1.8 mi away. If cancelled now, a small
            $15 transit stipend will be credited to Elena's travel expense, and the remaining
            $119.00 will be instantly refunded to your original payment method.
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-on-surface block mb-2">
            Reason for cancellation:
          </label>
          <div className="space-y-1.5">
            {reasons.map((r, i) => (
              <label
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container text-xs"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  checked={selectedReason === r}
                  onChange={() => setSelectedReason(r)}
                  className="accent-primary"
                />
                <span className="text-on-surface">{r}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => {
              onReschedule();
              onClose();
            }}
            className="w-full h-11 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Reschedule Free of Charge Instead
          </button>
          <button
            onClick={() => onConfirmCancel(selectedReason)}
            className="w-full h-10 rounded-full bg-error-container text-on-error-container font-label-md text-xs font-bold active:scale-98 hover:bg-red-200 transition-colors"
          >
            Confirm Cancel ($15 Transit Fee Applies)
          </button>
        </div>
      </div>
    </div>
  );
};
