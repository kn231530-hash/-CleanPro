import React, { useState } from 'react';
import { ScreenType } from '../types/index.ts';

interface ServicesViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectPackage: (title: string, basePrice: number) => void;
  onShowToast: (msg: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onSelectPackage,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'deep' | 'regular' | 'specialty'>('all');

  const services = [
    {
      id: 's1',
      title: 'Full Home Deep Cleaning',
      subtitle: 'Hospital-grade sanitization & HEPA filtration',
      price: 89,
      duration: '3.5 - 4.5 hrs',
      rating: 4.95,
      reviews: 1240,
      category: 'deep',
      icon: 'cleaning_bucket',
      color: 'bg-primary-fixed text-primary',
      badge: 'Most Popular',
    },
    {
      id: 's2',
      title: 'Regular Maid Maintenance',
      subtitle: 'Tidying, laundry, dusting & vacuuming',
      price: 50,
      duration: '2 - 3 hrs',
      rating: 4.88,
      reviews: 890,
      category: 'regular',
      icon: 'person_pin_circle',
      color: 'bg-secondary-fixed text-secondary',
      badge: 'Weekly Favorite',
    },
    {
      id: 's3',
      title: 'Sofa & Carpet Steam Wash',
      subtitle: 'Hot water extraction & pet allergen removal',
      price: 35,
      duration: '1.5 - 2 hrs',
      rating: 4.92,
      reviews: 520,
      category: 'specialty',
      icon: 'chair',
      color: 'bg-tertiary-fixed text-tertiary',
      badge: 'Zero Odor',
    },
    {
      id: 's4',
      title: 'Kitchen & Bath Degrease Ritual',
      subtitle: 'Oven carbon dissolution & shower tile grout descaling',
      price: 40,
      duration: '2 hrs',
      rating: 4.96,
      reviews: 740,
      category: 'specialty',
      icon: 'sanitizer',
      color: 'bg-surface-variant text-primary-container',
      badge: 'Anti-Grease',
    },
    {
      id: 's5',
      title: 'Post-Renovation Intensive Clean',
      subtitle: 'HEPA air purification & heavy construction dust removal',
      price: 149,
      duration: '5 - 6 hrs',
      rating: 5.0,
      reviews: 480,
      category: 'deep',
      icon: 'hardware',
      color: 'bg-secondary-fixed text-secondary',
      badge: 'Industrial Grade',
    },
    {
      id: 's6',
      title: 'Move-In / Move-Out Sanitize',
      subtitle: 'Turnkey interior disinfection for landlords & tenants',
      price: 119,
      duration: '4 hrs',
      rating: 4.93,
      reviews: 310,
      category: 'deep',
      icon: 'cottage',
      color: 'bg-primary-fixed text-primary',
      badge: 'Deposit Safe',
    },
  ];

  const filtered = activeCategory === 'all' ? services : services.filter(s => s.category === activeCategory);

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-2 space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
          All Cleaning Rituals
        </h2>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Hospital-grade sanitation performed exclusively with certified non-toxic solutions.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Services (6)' },
          { id: 'deep', label: 'Deep Cleaning' },
          { id: 'regular', label: 'Regular Maid' },
          { id: 'specialty', label: 'Specialty & Steam' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-label-md transition-all shrink-0 ${
              activeCategory === tab.id
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/40 flex flex-col justify-between transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${service.color}`}
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {service.icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-title-md text-base text-on-surface font-bold leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 leading-snug">
                    {service.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-label-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {service.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-on-surface">
                      <span
                        className="material-symbols-outlined text-amber-500 text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {service.rating} ({service.reviews})
                    </span>
                  </div>
                </div>
              </div>

              {service.badge && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-label-sm font-bold shrink-0">
                  {service.badge}
                </span>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-label-sm text-on-surface-variant block">
                  Starting from
                </span>
                <span className="font-headline-md text-xl font-bold text-primary">
                  ${service.price}
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectPackage(service.title, service.price);
                  onNavigate('customize');
                }}
                className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-md text-xs font-bold hover:bg-primary-container active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Customize</span>
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
