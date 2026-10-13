import React, { useState } from 'react';
import { ScreenType } from '../types/index.ts';
import { ChatModal } from '../components/ChatModal.tsx';

interface ProfileViewProps {
  onNavigate: (screen: ScreenType) => void;
  selectedAddress: string;
  onOpenAddressSelector: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  selectedAddress,
  onOpenAddressSelector,
  onShowToast,
}) => {
  const [petAlert, setPetAlert] = useState(true);
  const [keylessEntry, setKeylessEntry] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);

  const profileImg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAVDbeQ-u8pzjYoIwz5o2DB-OVs5zWokRTbJquTwxixybbgstuDSeKJtIicWANyYkD8KFpeY27nXMm5sYDutvSqrH4ajlMkgY6QA0hBa3U_bS7L0hR8HKzlOnYuhE_LW7Pz7A6PWEOu5nR43JHf8HDRIYZYRwDZ2c5SpE3jfz5bxiX-aSywARAQK-uTRVeCggp2bnMFx4h5HV9Fo8quqTWzkY0PzRnES0vhiYvzzi8hLBXC7RFxP2q3';

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-2 space-y-4">
      {/* Profile Card */}
      <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container-high/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profileImg}
              alt="Sarah Mitchell"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-tertiary text-on-tertiary w-5 h-5 rounded-full flex items-center justify-center text-[12px] shadow-xs">
              <span className="material-symbols-outlined text-[13px]">eco</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-title-md text-lg text-on-surface font-bold">Sarah Mitchell</h2>
            </div>
            <span className="font-label-sm text-xs text-on-surface-variant block">
              sarah.mitchell@gmail.com
            </span>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-label-sm font-bold">
              CleanPro Eco-Member ★ Tier 2
            </span>
          </div>
        </div>

        <button
          onClick={() => onShowToast('Profile editing enabled')}
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
      </div>

      {/* Eco Impact Metrics */}
      <div className="p-4 bg-gradient-to-br from-tertiary-fixed/20 via-surface-container-low to-secondary-fixed/20 rounded-2xl border border-tertiary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-tertiary font-bold text-sm">
            <span className="material-symbols-outlined text-[18px]">nest_eco_leaf</span>
            <span>Your CleanPro Environmental Impact</span>
          </div>
          <span className="text-[10px] font-label-sm bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-bold">
            Verified
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-surface-container-lowest/80 backdrop-blur-xs rounded-xl shadow-xs">
            <span className="font-headline-md text-lg font-bold text-tertiary block">18.4 lbs</span>
            <span className="text-[10px] font-label-sm text-on-surface-variant leading-tight block">
              Toxic VOCs Avoided
            </span>
          </div>
          <div className="p-2 bg-surface-container-lowest/80 backdrop-blur-xs rounded-xl shadow-xs">
            <span className="font-headline-md text-lg font-bold text-primary block">100%</span>
            <span className="text-[10px] font-label-sm text-on-surface-variant leading-tight block">
              Plant-Based Refills
            </span>
          </div>
          <div className="p-2 bg-surface-container-lowest/80 backdrop-blur-xs rounded-xl shadow-xs">
            <span className="font-headline-md text-lg font-bold text-secondary block">240 kWh</span>
            <span className="text-[10px] font-label-sm text-on-surface-variant leading-tight block">
              Steam Power Saved
            </span>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
            <h3 className="font-title-md text-base text-on-surface font-bold">Saved Locations</h3>
          </div>
          <button
            onClick={onOpenAddressSelector}
            className="text-xs font-label-md text-primary font-bold hover:underline"
          >
            Manage
          </button>
        </div>

        <div
          onClick={onOpenAddressSelector}
          className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between cursor-pointer hover:bg-surface-container"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">home</span>
            <div>
              <p className="text-xs font-bold text-on-surface">Home (Default)</p>
              <p className="text-xs text-on-surface-variant">{selectedAddress}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
            chevron_right
          </span>
        </div>
      </div>

      {/* Household Preferences */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/40 space-y-3">
        <h3 className="font-title-md text-base text-on-surface font-bold">Household Preferences</h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-on-surface text-xs">Pet In Household Notice</p>
              <p className="text-[11px] text-on-surface-variant">
                Alerts cleaners to use 100% enzymatic pet-safe sanitizers
              </p>
            </div>
            <button
              onClick={() => {
                setPetAlert(!petAlert);
                onShowToast(petAlert ? 'Pet notice turned off' : 'Pet notice active');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                petAlert ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  petAlert ? 'left-5.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-surface-container pt-2.5">
            <div>
              <p className="font-semibold text-on-surface text-xs">Smart Lock Keyless Code</p>
              <p className="text-[11px] text-on-surface-variant">
                Share one-time verbal OTP 4829 upon arrival
              </p>
            </div>
            <button
              onClick={() => {
                setKeylessEntry(!keylessEntry);
                onShowToast(keylessEntry ? 'Smart lock integration paused' : 'Smart lock active');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                keylessEntry ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  keylessEntry ? 'left-5.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-surface-container pt-2.5">
            <div>
              <p className="font-semibold text-on-surface text-xs">Dispatch Push Notifications</p>
              <p className="text-[11px] text-on-surface-variant">
                Real-time updates when cleaner is within 2 miles
              </p>
            </div>
            <button
              onClick={() => {
                setPushNotifs(!pushNotifs);
                onShowToast(pushNotifs ? 'Notifications muted' : 'Notifications enabled');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                pushNotifs ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  pushNotifs ? 'left-5.5' : 'left-0.5'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Support & Actions */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/40 space-y-2">
        <button
          onClick={() => setIsSupportChatOpen(true)}
          className="w-full py-3 rounded-xl bg-surface-container-low flex items-center justify-between px-3 text-left hover:bg-surface-container active:scale-98 transition-all"
        >
          <div className="flex items-center gap-2.5 text-on-surface">
            <span className="material-symbols-outlined text-primary text-[20px]">support_agent</span>
            <span className="text-xs font-bold">24/7 Priority Concierge Chat</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => onShowToast('CleanPro Insurance Certificate: Policy #CP-2024-SF')}
          className="w-full py-3 rounded-xl bg-surface-container-low flex items-center justify-between px-3 text-left hover:bg-surface-container active:scale-98 transition-all"
        >
          <div className="flex items-center gap-2.5 text-on-surface">
            <span className="material-symbols-outlined text-tertiary text-[20px]">policy</span>
            <span className="text-xs font-bold">$2M General Liability Insurance Certificate</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            download
          </span>
        </button>
      </div>

      <ChatModal
        isOpen={isSupportChatOpen}
        onClose={() => setIsSupportChatOpen(false)}
        cleanerName="CleanPro Priority Support"
        cleanerAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB"
      />
    </div>
  );
};
