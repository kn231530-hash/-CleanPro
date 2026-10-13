import React from 'react';
import { ScreenType } from '../types/index.ts';

interface HeaderProps {
  currentScreen: ScreenType;
  selectedAddress: string;
  onOpenAddressSelector: () => void;
  onOpenNotifications: () => void;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  selectedAddress,
  onOpenAddressSelector,
  onOpenNotifications,
  onNavigate,
  onBack,
}) => {
  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1V9GQq9sDgm3RkLy0O1WGh3O9WBXFaRocd0UGWfc2Z2mIzySt7Fuy7wQRa55vGkSydMOaa6hIRRRi267-IfkMlDjNMkg5iX77VuGieBKwnF3T_qM4niZ3tAPWsUKstXmmuBihJC7KvsS2kw6_MePsJPVeI6GyBkFl5jiv7RKcNS2XdVahUKwJwOQaoeeMlu80mQDVCCzDyKrbfFzH4gqfh5QjTt_N6c8hFtbH0sBq2Sk9rzA1EcMHkTAw';
  const profileUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAVDbeQ-u8pzjYoIwz5o2DB-OVs5zWokRTbJquTwxixybbgstuDSeKJtIicWANyYkD8KFpeY27nXMm5sYDutvSqrH4ajlMkgY6QA0hBa3U_bS7L0hR8HKzlOnYuhE_LW7Pz7A6PWEOu5nR43JHf8HDRIYZYRwDZ2c5SpE3jfz5bxiX-aSywARAQK-uTRVeCggp2bnMFx4h5HV9Fo8quqTWzkY0PzRnES0vhiYvzzi8hLBXC7RFxP2q3';

  const isStackScreen = currentScreen === 'customize' || currentScreen === 'tracking';

  if (isStackScreen) {
    const title =
      currentScreen === 'customize' ? 'Customize Service' : 'Live Dispatch Tracking';

    return (
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/40">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              aria-label="Go back"
              onClick={onBack}
              className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:scale-95 transition-all focus:outline-none"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="CleanPro Logo"
              className="h-7 w-auto object-contain flex-shrink-0 cursor-pointer"
              src={logoUrl}
              onClick={() => onNavigate('explore')}
            />
            <div className="flex flex-col min-w-0 pl-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none truncate">
                CleanPro
              </span>
              <h1 className="font-title-md text-title-md text-on-surface truncate leading-tight font-bold">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              aria-label="User Profile"
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-container p-0.5 active:scale-95 transition-transform"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src={profileUrl}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  const sectionLabel =
    currentScreen === 'explore'
      ? 'Explore'
      : currentScreen === 'bookings'
      ? 'Bookings'
      : currentScreen === 'services'
      ? 'Services'
      : 'Profile';

  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/40">
      <div className="h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            alt="CleanPro Logo"
            className="h-8 w-auto object-contain flex-shrink-0 cursor-pointer"
            src={logoUrl}
            onClick={() => onNavigate('explore')}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span
                onClick={() => onNavigate('explore')}
                className="font-title-md text-title-md text-on-surface leading-none truncate cursor-pointer font-bold"
              >
                CleanPro
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                • {sectionLabel}
              </span>
            </div>
            <button
              onClick={onOpenAddressSelector}
              className="flex items-center gap-0.5 text-left text-primary group focus:outline-none min-h-[20px]"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold truncate max-w-[140px]">
                {selectedAddress}
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary transition-transform group-hover:translate-y-0.5">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative focus:outline-none active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          </button>
          <button
            aria-label="User Profile"
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-container p-0.5 active:scale-95 transition-transform"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={profileUrl}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
