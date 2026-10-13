import React from 'react';
import { ScreenType } from '../types/index.ts';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  activeBookingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  activeBookingCount = 1,
}) => {
  // Only show on main tabs
  if (currentScreen === 'customize' || currentScreen === 'tracking') {
    return null;
  }

  const items: { id: ScreenType; label: string; icon: string; badge?: number }[] = [
    { id: 'explore', label: 'Explore', icon: 'home' },
    { id: 'services', label: 'Services', icon: 'cleaning_services' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar_month', badge: activeBookingCount },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-surface-container-high/60">
      <div className="flex justify-around items-center h-16 px-1">
        {items.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-all group relative ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary font-normal'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] mb-0.5 transition-transform group-active:scale-95 ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm leading-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
