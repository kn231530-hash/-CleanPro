import React, { useState } from 'react';
import { ScreenType } from '../types/index.ts';

interface ExploreViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectPackage: (packageTitle: string, basePrice: number) => void;
  selectedAddress: string;
  onOpenAddressSelector: () => void;
  onShowToast: (msg: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
  onSelectPackage,
  selectedAddress,
  onOpenAddressSelector,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulCount, setHelpfulCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  const packages = [
    {
      id: 'full-home',
      title: 'Standard Full Home Clean',
      rating: '4.9',
      reviewCount: '1.2k',
      duration: '3.5 hrs',
      price: 89,
      description:
        'Certified pros with eco-friendly cleaning supplies included. Floor-to-ceiling rejuvenation.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ss23-WlYb9EfdMvy2gv2Yif-oYMN-XWo57Ic2pYO_ikbOURRnPK04J3mMmxa3bHWpAnvp_NZoKs7rKvzfEJCa8IaI01Dp_mR8n4uHwRsIVP5cSha_F9XbS8JqUSrx5GZtsfnWUkKwB0vjAg9utEk1nRATuqzFfBwzfpdLAt0hisJuKnwBJzTLEM6oReXVzoXAqexfGsbJ4vHodl5HdQ9eti2D2hvWxzP1sNe_Rz-wx8g_ky3S7IF',
      badges: [
        { icon: 'verified', label: 'Certified Pro', color: 'text-primary' },
        { icon: 'nest_eco_leaf', label: 'Eco Supplies', color: 'text-tertiary' },
      ],
      category: 'deep',
    },
    {
      id: 'post-reno',
      title: 'Post-Renovation Intensive',
      rating: '5.0',
      reviewCount: '480',
      duration: '5 hrs',
      price: 149,
      description:
        'Heavy-duty dust extraction, paint residue scrubbing, and industrial air particulate purification.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBWq5m0fwa2H9MqJwTfFd6xl6VOvYr1caWeJy5KyDk5pnaPXA-DrM5PEcXd8vHktaGJeveyvHst_EiM7oueaHapeqyuZaQ7AypI58JGYTBLtGCWGagMagVQ3a8OIydrzWtYAPI8SYwZi8H7rVMW8SPa6i27VS6mBmhQmi84j91ydUjkBg8uOiMNYvkse58SnIuDb4zxBbmoyXz2u0OsEGSb7qMNOmYkd70DXTso3AXbdsnD2VtduZlr',
      badges: [
        { icon: 'hardware', label: 'Heavy-duty', color: 'text-secondary' },
        { icon: 'filter_alt', label: 'HEPA Filters', color: 'text-primary' },
      ],
      category: 'deep',
    },
    {
      id: 'move-in',
      title: 'Move-In Fresh Start Sanitize',
      rating: '4.95',
      reviewCount: '310',
      duration: '4 hrs',
      price: 119,
      description:
        'Deep disinfection of prior tenant odors, cabinet deep steam wipe, and whole-house HEPA sanitize.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAztLKVlzfyTcH0Okc7z6MzMFC21h1GfCmAJR8IZWRGMJBhlMhj1vFE0T77YCFYGDcfWUYPOObkuVvHacJKk1J1l7gUJkRx4WH6LU1nhVkGPklY21Bx-OFuYDabl_Mh7M6KS4dHcPH6sFJZMDErCIluqdy8lVNQqzgoJRatoNEGUPpyrqg0CksYtKnJbPnfzolUrA9MlDIe66B0VZdOrzSRlA4LcNjsZjNfPuTkCRdTGKnJPUxd9vib',
      badges: [
        { icon: 'auto_awesome', label: 'Zero Allergen', color: 'text-tertiary' },
        { icon: 'lock', label: 'Key Pickup Ok', color: 'text-primary' },
      ],
      category: 'deep',
    },
  ];

  const handleToggleHelpful = () => {
    if (!hasLiked) {
      setHelpfulCount((c) => c + 1);
      setHasLiked(true);
      onShowToast('Marked review as helpful!');
    } else {
      setHelpfulCount((c) => c - 1);
      setHasLiked(false);
    }
  };

  const filteredPackages = packages.filter((p) => {
    const matchQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchQuery;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Top Location Chip & Welcome Context */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between">
        <button
          onClick={onOpenAddressSelector}
          className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-primary text-[18px]">near_me</span>
          <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate max-w-[210px]">
            {selectedAddress}
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
            expand_more
          </span>
        </button>
        <div className="flex items-center gap-1 bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-full">
          <span
            className="material-symbols-outlined text-[14px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <span className="font-label-sm text-label-sm font-semibold">Eco-Safe</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="px-4 py-2">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-primary">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cleaning services, deep clean, maid..."
            className="w-full h-12 pl-10 pr-12 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md shadow-xs outline-none focus:bg-surface-container-lowest transition-all"
          />
          <button
            aria-label="Filter Services"
            onClick={() => onShowToast('Filter options active: Eco-certified & Instant Available')}
            className="absolute right-2 h-8 w-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Sparkle Hero Promo Card */}
      <div className="px-4 py-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-4 text-on-primary shadow-md">
          {/* Decorative background glow and sparkles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-container/20 blur-xl pointer-events-none"></div>
          <div className="absolute right-4 bottom-2 text-white/20 select-none pointer-events-none">
            <svg fill="currentColor" height="84" viewBox="0 0 24 24" width="84">
              <path
                d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                opacity="0.3"
              ></path>
              <path
                d="M19 15L19.9 18.1L23 19L19.9 19.9L19 23L18.1 19.9L15 19L18.1 18.1L19 15Z"
                opacity="0.4"
              ></path>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-start max-w-[70%]">
            <div className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded-full mb-2 shadow-xs">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                20% OFF FIRST BOOKING
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold leading-tight mb-1">
              Sparkling Clean Home in 60 Mins
            </h2>
            <p className="font-label-md text-label-md text-on-primary/90 mb-3">
              Hospital-grade sanitation &amp; verified pro dispatched to your door.
            </p>
            <button
              onClick={() => {
                onSelectPackage('Full Home Deep Cleaning', 89);
                onNavigate('customize');
              }}
              className="bg-surface-container-lowest text-primary px-4 py-2 rounded-full font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1.5 hover:bg-white"
            >
              <span>Book Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Service Categories Grid */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Categories
          </h3>
          <button
            onClick={() => onNavigate('services')}
            className="font-label-md text-label-md text-primary font-semibold flex items-center gap-0.5 hover:underline"
          >
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* 1. Deep Cleaning */}
          <div
            onClick={() => {
              onSelectPackage('Full Home Deep Cleaning', 89);
              onNavigate('customize');
            }}
            className="bg-surface-container-low rounded-xl p-3 flex flex-col justify-between hover:bg-surface-container transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  cleaning_bucket
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                From $49
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                Deep Cleaning
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Scrubbing, baseboards, grime
              </p>
            </div>
          </div>

          {/* 2. Regular Maid */}
          <div
            onClick={() => {
              onSelectPackage('Regular Maid Maintenance', 50);
              onNavigate('customize');
            }}
            className="bg-surface-container-low rounded-xl p-3 flex flex-col justify-between hover:bg-surface-container transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shadow-xs">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person_pin_circle
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                $20/hr
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                Regular Maid
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Tidying, laundry, dusting
              </p>
            </div>
          </div>

          {/* 3. Sofa & Carpet */}
          <div
            onClick={() => {
              onSelectPackage('Sofa Steam Clean & Stain Removal', 45);
              onNavigate('customize');
            }}
            className="bg-surface-container-low rounded-xl p-3 flex flex-col justify-between hover:bg-surface-container transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-xs">
                <span className="material-symbols-outlined text-[22px]">chair</span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full">
                $35
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                Sofa &amp; Carpet
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Hot steam wash, allergen removal
              </p>
            </div>
          </div>

          {/* 4. Kitchen & Bath */}
          <div
            onClick={() => {
              onSelectPackage('Kitchen & Bath Degrease Ritual', 40);
              onNavigate('customize');
            }}
            className="bg-surface-container-low rounded-xl p-3 flex flex-col justify-between hover:bg-surface-container transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-primary-container shadow-xs">
                <span className="material-symbols-outlined text-[22px]">sanitizer</span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full">
                $40
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                Kitchen &amp; Bath
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Grease-cut, tile sanitizing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Packages Horizontal Carousel */}
      <div className="pt-6">
        <div className="px-4 flex items-center justify-between mb-2">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Popular Packages
            </h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Thorough, curated cleaning rituals
            </p>
          </div>
          <div className="flex gap-1">
            <button
              aria-label="Previous"
              onClick={() => onShowToast('Showing featured packages')}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              aria-label="Next"
              onClick={() => onShowToast('Showing all seasonal packages')}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar pb-2 pt-1 snap-x snap-mandatory">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="min-w-[280px] max-w-[280px] bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col justify-between flex-shrink-0 border border-surface-container-high/40 snap-start"
            >
              <div>
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    alt={pkg.title}
                    src={pkg.image}
                  />
                  <div className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <span
                      className="material-symbols-outlined text-amber-500 text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">
                      {pkg.rating}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ({pkg.reviewCount})
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-tertiary-container text-on-tertiary px-2 py-0.5 rounded-full text-[11px] font-label-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {pkg.duration}
                  </div>
                </div>

                <h4 className="font-title-md text-title-md text-on-surface font-bold leading-snug">
                  {pkg.title}
                </h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 line-clamp-2">
                  {pkg.description}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {pkg.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-on-surface font-label-sm text-label-sm"
                    >
                      <span className={`material-symbols-outlined ${b.color} text-[14px]`}>
                        {b.icon}
                      </span>{' '}
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between border-t border-surface-container-high/40">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Total
                  </span>
                  <span className="font-headline-md text-headline-md font-bold text-primary">
                    ${pkg.price}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectPackage(pkg.title, pkg.price);
                    onNavigate('customize');
                  }}
                  className="bg-primary text-on-primary px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-xs"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges (Why Choose Us) */}
      <div className="px-4 pt-6">
        <div className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-high/40">
          <h3 className="font-title-md text-title-md text-on-surface mb-3 font-bold text-center">
            Why Trust CleanPro?
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Badge 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                Verified Pros
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-tight mt-0.5">
                100% Background Checked
              </span>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">thumb_up</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                100% Guarantee
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-tight mt-0.5">
                Free re-clean if unhappy
              </span>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">security</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                Fully Insured
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-tight mt-0.5">
                Covered up to $2M
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customer Reviews Snippet */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Recent Community Reviews
          </h3>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-pulse"></span>{' '}
            Live
          </span>
        </div>

        {/* Review Card */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  alt="Elena Rostova"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx4g5UNHSXm-t8H8Wr2hkM3dhFJ-DiD5Qqhm1JWzISkUDuiRNfEC1VM_zO-J9PfyysfyQH23We5URTzhk7pzRK_MFJaj1WMir_m0bdTnDBVfQ187cpbbDLucpdZwguhXb0QoxZsPXR08fgGvzf6FxMWjru002tL_LYRoM1Rz6lhJNrS3AVjWw2ADComuQaAGz-Ot8i4UddRaY-CgAezT2YZJhYS2DXDbmNKc1S0Vqo0d2n3h8PLND0"
                />
                <div className="absolute -bottom-0.5 -right-0.5 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full p-0.5 shadow-xs">
                  <span className="material-symbols-outlined text-[10px] block font-bold">
                    check
                  </span>
                </div>
              </div>
              <div>
                <h5 className="font-label-md text-label-md font-bold text-on-surface">
                  Elena Rostova
                </h5>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Cleaned for Sarah M. • 2 hrs ago
                </span>
              </div>
            </div>

            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
            “Elena arrived early, handled pet stains flawlessly, and left our apartment smelling
            crisp and fresh with zero chemical odors!”
          </p>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-primary font-medium">
              Standard Full Home Clean
            </span>
            <button
              onClick={handleToggleHelpful}
              className={`font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                hasLiked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={hasLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
              {helpfulCount} Helpful
            </button>
          </div>
        </div>
      </div>

      {/* Floating Quick-Action Booking Dock */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-2.5 shadow-xl flex items-center justify-between gap-3 border border-white/10">
            <div className="flex items-center gap-2.5 pl-1.5 min-w-0">
              <div className="relative flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim absolute -top-0.5 -right-0.5 animate-ping"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim absolute -top-0.5 -right-0.5"></span>
                <div className="w-9 h-9 rounded-xl bg-inverse-on-surface/10 flex items-center justify-center text-secondary-fixed">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
              </div>
              <div className="truncate">
                <p className="font-label-md text-label-md font-bold text-inverse-on-surface truncate">
                  3 Cleaners Nearby
                </p>
                <p className="font-label-sm text-label-sm text-inverse-on-surface/70 truncate">
                  Ready in under 45 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectPackage('Full Home Deep Cleaning', 89);
                onNavigate('customize');
              }}
              className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl font-label-md text-label-md font-bold whitespace-nowrap shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Book Instant</span>
              <span className="material-symbols-outlined text-[16px]">flash_on</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
