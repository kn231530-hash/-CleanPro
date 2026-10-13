import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceTitle: string;
  totalPrice: number;
  scheduledDate: string;
  scheduledSlot: string;
  homeType: string;
  address: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceTitle,
  totalPrice,
  scheduledDate,
  scheduledSlot,
  homeType,
  address,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
            <h3 className="font-title-md text-lg text-on-surface font-bold">
              Confirm & Book
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Order Summary Box */}
        <div className="p-3.5 bg-surface-container-low rounded-xl space-y-2 border border-surface-container">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-label-sm font-semibold uppercase tracking-wider text-primary">
                CleanPro Hospital-Grade
              </span>
              <h4 className="font-title-md text-base font-bold text-on-surface">
                {serviceTitle} ({homeType})
              </h4>
            </div>
            <span className="text-xl font-bold font-headline-lg text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-surface-container text-xs text-on-surface-variant space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span>
              <span>{scheduledDate} • {scheduledSlot}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
              <span className="truncate">{address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[15px]">security</span>
              <span>100% Free Re-clean Guarantee & Insurance Included</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-on-surface block">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                paymentMethod === 'card'
                  ? 'border-primary bg-primary-fixed/20 shadow-xs'
                  : 'border-surface-container bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-primary text-[20px]">credit_card</span>
              <div>
                <p className="text-xs font-bold text-on-surface">Visa •••• 4242</p>
                <p className="text-[10px] text-on-surface-variant">Default Card</p>
              </div>
            </button>
            <button
              onClick={() => setPaymentMethod('apple')}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                paymentMethod === 'apple'
                  ? 'border-primary bg-primary-fixed/20 shadow-xs'
                  : 'border-surface-container bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">contactless</span>
              <div>
                <p className="text-xs font-bold text-on-surface">Apple Pay</p>
                <p className="text-[10px] text-on-surface-variant">Instant 1-Click</p>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full h-12 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              <span>Securing Dispatch & Pro Assigned...</span>
            </div>
          ) : (
            <>
              <span>Pay ${totalPrice.toFixed(2)} & Dispatch Pro</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
