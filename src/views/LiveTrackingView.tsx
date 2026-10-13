import React, { useState } from 'react';
import { ScreenType, Booking } from '../types/index.ts';
import { ChatModal } from '../components/ChatModal.tsx';
import { CallModal } from '../components/CallModal.tsx';
import { CancelModal } from '../components/CancelModal.tsx';

interface LiveTrackingViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  activeBooking?: Booking | null;
  onShowToast: (msg: string) => void;
}

export const LiveTrackingView: React.FC<LiveTrackingViewProps> = ({
  onBack,
  onNavigate,
  activeBooking,
  onShowToast,
}) => {
  const [etaMins, setEtaMins] = useState(14);
  const [distanceMi, setDistanceMi] = useState(1.8);
  const [isCopied, setIsCopied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite'>('standard');
  const [currentStep, setCurrentStep] = useState(3);

  const otpCode = activeBooking?.otp || '4829';

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(otpCode).catch(() => {});
    setIsCopied(true);
    onShowToast(`Security OTP ${otpCode} copied to clipboard!`);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleRecenter = () => {
    onShowToast("Map tracking centered on Elena's scooter route");
  };

  const handleAdvanceStep = () => {
    if (currentStep === 3) {
      setCurrentStep(4);
      setEtaMins(0);
      setDistanceMi(0);
      onShowToast('Elena has arrived and started the HEPA cleaning cycle!');
    } else if (currentStep === 4) {
      setCurrentStep(5);
      onShowToast('Cleaning completed! Quality inspection & sign-off ready.');
    } else {
      setCurrentStep(3);
      setEtaMins(14);
      setDistanceMi(1.8);
      onShowToast('Tracking reset to dispatch view.');
    }
  };

  const handleConfirmCancel = (reason: string) => {
    setIsCancelOpen(false);
    onShowToast('Service cancelled. $119.00 refunded ($15 transit fee deducted).');
    onNavigate('bookings');
  };

  return (
    <div className="flex flex-col w-full pb-16 bg-surface">
      {/* Top Status & Update Pill */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Live Dispatch #CP-8924
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
          Updated Just Now
        </span>
      </div>

      {/* Map Card */}
      <div className="px-4 py-2">
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md bg-surface-container-high border border-surface-container-high/40">
          <div
            className={`w-full h-full bg-cover bg-center transition-all duration-700 ${
              mapLayer === 'satellite' ? 'contrast-125 saturate-150' : ''
            }`}
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpSCc5xjANc5JxoVDkrr8XTRexPkyWizEbeufeUjuELRik4DcMLj_AmKc3mkg3OFo5eM0qhcIESYihAkLoo1KhUd8XmnzlQzvQb4YVBB_8mnpkzaLjTY14brrYdwnvZp2IeN7LQ_pw4vL--RMGO2Lo1_Grd_MTJVbUBrxsHFKQmRzAIMr4hhw3GCcHQRrinfz7-qP-p-TqAN_Bv3u_kdR9zqe905dDn_0zct1_v1bZ9NRx13vU3kkP')",
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-transparent pointer-events-none"></div>

          {/* Elena Distance Tag */}
          <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px] text-tertiary animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              near_me
            </span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {currentStep === 3 ? `Elena is ${distanceMi} mi away` : 'Elena is on site'}
            </span>
          </div>

          {/* Layer switcher */}
          <button
            onClick={() => {
              setMapLayer(mapLayer === 'standard' ? 'satellite' : 'standard');
              onShowToast(
                mapLayer === 'standard' ? 'Switched to Satellite view' : 'Switched to Street Map'
              );
            }}
            className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md p-1.5 rounded-full shadow-xs flex items-center justify-center text-on-surface active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">layers</span>
          </button>

          {/* Bottom Floating Map Summary */}
          <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center justify-between border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shadow-inner">
                <span className="material-symbols-outlined text-[24px]">electric_moped</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  Estimated Arrival
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-title-md text-title-md text-primary font-bold">
                    {currentStep === 3 ? `${etaMins} mins` : 'Arrived at door'}
                  </span>
                  {currentStep === 3 && (
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      (10:48 AM)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleRecenter}
                className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">my_location</span>
                Recenter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival Security Pass */}
      <div className="px-4 py-1">
        <div className="bg-surface-container-low rounded-xl p-4 shadow-xs border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Arrival Security Pass
            </h2>
            <span className="material-symbols-outlined text-primary text-[20px]">
              verified_user
            </span>
          </div>
          <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-lg shadow-xs border border-surface-container">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Arrival Code for Cleaner
              </span>
              <span className="font-body-md text-body-md text-on-surface font-medium">
                Share verbally when Elena knocks
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-fixed px-3 py-1.5 rounded-md">
              <span className="font-title-md text-title-md tracking-wider font-bold text-on-primary-fixed">
                {otpCode}
              </span>
              <button
                aria-label="Copy OTP"
                onClick={handleCopyOtp}
                className="text-on-primary-fixed hover:text-primary transition-colors pl-1 active:scale-90"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCopied ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaner Profile Card */}
      <div className="px-4 py-2">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/40">
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <img
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                alt="Elena Vance"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB"
              />
              <div className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                  Elena Vance
                </h3>
                <span className="inline-flex items-center gap-0.5 text-tertiary font-label-md text-label-md bg-on-tertiary-container px-2 py-0.5 rounded-full">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.95
                </span>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold block">
                Top Rated Pro
              </span>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                340+ Cleans • Background Checked &amp; Vaccinated
              </p>
            </div>
          </div>

          <div className="mt-3 bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-[20px] text-primary flex-shrink-0">
              sanitizer
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Arriving with industrial HEPA vacuum &amp; steam cleaner
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => setIsCallOpen(true)}
              className="h-11 rounded-full bg-surface-container text-on-surface flex items-center justify-center gap-1.5 font-label-lg text-label-lg active:scale-95 transition-transform shadow-xs hover:bg-surface-container-high font-semibold"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
              Call Pro
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="h-11 rounded-full bg-primary text-on-primary flex items-center justify-center gap-1.5 font-label-lg text-label-lg active:scale-95 transition-transform shadow-sm hover:bg-primary-container font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Service Progress Timeline */}
      <div className="px-4 py-2">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Service Progress
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                Step {currentStep} of 5
              </span>
              <button
                onClick={handleAdvanceStep}
                className="text-[11px] font-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold hover:bg-surface-container-high active:scale-95"
                title="Simulate service advancement"
              >
                {currentStep === 3 ? 'Simulate Arrival' : currentStep === 4 ? 'Simulate Done' : 'Reset'}
              </button>
            </div>
          </div>

          <div className="relative pl-6 space-y-6">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container"></div>

            {/* Step 1 */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 mt-0.5 w-5 h-5 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-medium">
                    Order Confirmed
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Service booked &amp; paid
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">10:30 AM</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 mt-0.5 w-5 h-5 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-medium">
                    Cleaner Assigned
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Elena Vance selected
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">10:32 AM</span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`relative flex items-start gap-3 ${
                currentStep > 3 ? '' : currentStep === 3 ? '' : 'opacity-50'
              }`}
            >
              <div
                className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                  currentStep > 3
                    ? 'bg-tertiary text-on-tertiary'
                    : 'bg-primary text-on-primary ring-4 ring-primary-fixed'
                }`}
              >
                {currentStep > 3 ? (
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-on-primary animate-pulse"></span>
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                  <p
                    className={`font-label-lg text-label-lg ${
                      currentStep === 3 ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    On The Way
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    En route via electric scooter
                  </p>
                </div>
                <span
                  className={`font-label-sm text-label-sm ${
                    currentStep === 3 ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {currentStep > 3 ? 'Completed' : 'ETA 10:48 AM'}
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div
              className={`relative flex items-start gap-3 ${
                currentStep === 4 ? '' : currentStep > 4 ? '' : 'opacity-50'
              }`}
            >
              <div
                className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                  currentStep > 4
                    ? 'bg-tertiary text-on-tertiary'
                    : currentStep === 4
                    ? 'bg-primary text-on-primary ring-4 ring-primary-fixed'
                    : 'bg-surface-container'
                }`}
              >
                {currentStep > 4 ? (
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                ) : currentStep === 4 ? (
                  <span className="w-2 h-2 rounded-full bg-on-primary animate-pulse"></span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                  <p
                    className={`font-label-lg text-label-lg ${
                      currentStep === 4 ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    Cleaning in Progress
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Standard deep clean package
                  </p>
                </div>
                <span
                  className={`font-label-sm text-label-sm ${
                    currentStep === 4 ? 'text-primary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {currentStep === 4 ? 'Active Now' : currentStep > 4 ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div
              className={`relative flex items-start gap-3 ${
                currentStep === 5 ? '' : 'opacity-50'
              }`}
            >
              <div
                className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                  currentStep === 5
                    ? 'bg-tertiary text-on-tertiary ring-4 ring-tertiary-fixed'
                    : 'bg-surface-container'
                }`}
              >
                {currentStep === 5 ? (
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                )}
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div>
                  <p
                    className={`font-label-lg text-label-lg ${
                      currentStep === 5 ? 'text-tertiary font-bold' : 'text-on-surface'
                    }`}
                  >
                    Quality Inspection &amp; Sign-off
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    100% satisfaction check
                  </p>
                </div>
                <span
                  className={`font-label-sm text-label-sm ${
                    currentStep === 5 ? 'text-tertiary font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {currentStep === 5 ? 'Done!' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Need to reschedule or cancel */}
      <div className="px-4 py-2 mb-4">
        <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-2 shadow-xs border border-surface-container-high/40">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-[20px]">help</span>
            <span className="font-title-md text-title-md font-bold">
              Need to reschedule or cancel?
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Free cancellation up to 1 hour before scheduled time. After dispatch, a small $15
            transit stipend applies to support your cleaner.
          </p>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsChatOpen(true)}
              className="font-label-lg text-label-lg text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Contact 24/7 Support</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <button
              onClick={() => setIsCancelOpen(true)}
              className="px-4 py-2 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold active:scale-95 transition-transform"
            >
              Cancel Service
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        cleanerName="Elena Vance"
      />
      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        cleanerName="Elena Vance"
      />
      <CancelModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirmCancel={handleConfirmCancel}
        onReschedule={() => {
          onShowToast('Opening schedule date picker to choose a new window...');
          onNavigate('customize');
        }}
      />
    </div>
  );
};
