import React, { useState } from 'react';
import { ScreenType, AddonItem } from '../types/index.ts';
import { ChecklistModal } from '../components/ChecklistModal.tsx';
import { CheckoutModal } from '../components/CheckoutModal.tsx';

interface CustomizeViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onBookingCreated: (bookingData: any) => void;
  selectedAddress: string;
  initialPackageTitle?: string;
  initialBasePrice?: number;
  onShowToast: (msg: string) => void;
}

export const CustomizeView: React.FC<CustomizeViewProps> = ({
  onBack,
  onNavigate,
  onBookingCreated,
  selectedAddress,
  initialPackageTitle = 'Full Home Deep Cleaning',
  initialBasePrice = 89,
  onShowToast,
}) => {
  const [selectedHomeType, setSelectedHomeType] = useState('2 BHK');
  const [basePrice, setBasePrice] = useState(initialBasePrice);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [kitchens, setKitchens] = useState(1);

  const [addons, setAddons] = useState<AddonItem[]>([
    {
      id: 'fridge',
      name: 'Interior Refrigerator Deep Clean',
      description: 'Shelves disinfection & odor seal',
      price: 25,
      selected: true,
    },
    {
      id: 'oven',
      name: 'Oven & Grill Degreasing',
      description: 'Carbon residue dissolution',
      price: 20,
      selected: true,
    },
    {
      id: 'balcony',
      name: 'Balcony Pressure Wash',
      description: 'High-bar water blast railing & floor',
      price: 18,
      selected: false,
    },
    {
      id: 'detergents',
      name: 'Eco-friendly Pet Safe Detergents',
      description: 'Zero toxin plant-based enzymatic scrub',
      price: 0,
      isFree: true,
      selected: true,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('Tmrw 25 Fri');
  const [selectedSlot, setSelectedSlot] = useState('01:00 PM');
  const [specialInstructions, setSpecialInstructions] = useState(
    'Please take extra care of hardwood flooring in living room.'
  );

  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const homeSizes = [
    { label: 'Studio', baseCost: 69 },
    { label: '1 BHK', baseCost: 79 },
    { label: '2 BHK', baseCost: 89 },
    { label: '3 BHK', baseCost: 119 },
    { label: 'Villa', baseCost: 169 },
  ];

  const handleSelectHomeSize = (sizeLabel: string, cost: number) => {
    setSelectedHomeType(sizeLabel);
    setBasePrice(cost);
  };

  const handleToggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.map((addon) => (addon.id === id ? { ...addon, selected: !addon.selected } : addon))
    );
  };

  const addonsTotal = addons
    .filter((a) => a.selected)
    .reduce((sum, a) => sum + a.price, 0);

  const totalCalculated = basePrice + addonsTotal;

  const dates = [
    { label: 'Today', day: '24', sub: 'Thu' },
    { label: 'Tmrw', day: '25', sub: 'Fri' },
    { label: 'Sat', day: '26', sub: 'May' },
    { label: 'Sun', day: '27', sub: 'May' },
  ];

  const slots = [
    {
      id: 'morning',
      time: '09:00 AM',
      title: 'Morning Arrival Window',
      icon: 'wb_twilight',
    },
    {
      id: 'afternoon',
      time: '01:00 PM',
      title: 'Afternoon Optimal Timing',
      icon: 'sunny',
    },
    {
      id: 'evening',
      time: '05:00 PM',
      title: 'Evening Express Setup',
      icon: 'bedtime',
    },
  ];

  const handleConfirmBooking = () => {
    setIsCheckoutOpen(false);
    onShowToast('Booking confirmed! Dispatching Elena Vance...');

    onBookingCreated({
      id: 'booking-' + Date.now(),
      orderNumber: 'CP-8924',
      serviceName: `${selectedHomeType} Deep Cleaning`,
      homeType: selectedHomeType,
      scheduledTime: selectedSlot,
      date: selectedDate.includes('Tmrw') ? 'Today, 01:00 PM' : selectedDate,
      status: 'en_route',
      price: totalCalculated,
      address: selectedAddress,
      otp: '4829',
      cleaner: {
        name: 'Elena Vance',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB',
        rating: 4.95,
        reviews: 182,
        title: 'Lead Specialist',
        badges: ['Background Checked', 'Chemical-Safe Certified'],
      },
      etaMinutes: 14,
    });

    onNavigate('tracking');
  };

  return (
    <div className="flex flex-col w-full pb-36 bg-surface">
      {/* Hero Banner Header */}
      <div className="px-4 pt-3 flex flex-col gap-2">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
          <div className="relative h-44 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              alt="Clean interior"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAztLKVlzfyTcH0Okc7z6MzMFC21h1GfCmAJR8IZWRGMJBhlMhj1vFE0T77YCFYGDcfWUYPOObkuVvHacJKk1J1l7gUJkRx4WH6LU1nhVkGPklY21Bx-OFuYDabl_Mh7M6KS4dHcPH6sFJZMDErCIluqdy8lVNQqzgoJRatoNEGUPpyrqg0CksYtKnJbPnfzolUrA9MlDIe66B0VZdOrzSRlA4LcNjsZjNfPuTkCRdTGKnJPUxd9vib"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent"></div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                100% Guaranteed
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-inverse-on-surface">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-1.5 font-medium shadow-xs">
                <span className="material-symbols-outlined text-[14px]">arrow_back_ios_new</span>{' '}
                Intensive Treatment
              </span>
              <h2 className="font-headline-md text-headline-md text-inverse-on-surface leading-tight font-bold">
                {initialPackageTitle}
              </h2>
              <p className="font-label-md text-label-md text-inverse-on-surface/90 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> ~4.5 hrs
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">
                    star
                  </span>{' '}
                  4.95 (1.2k+ reviews)
                </span>
              </p>
            </div>
          </div>

          <div className="p-3.5 flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Equipped with HEPA &amp; Steam Sanitizers
              </span>
            </div>
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="font-label-sm text-label-sm text-primary font-semibold hover:underline cursor-pointer"
            >
              View Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Home Configuration */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">apartment</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Home Configuration
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Step 1 of 4</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {homeSizes.map((size) => {
            const isActive = selectedHomeType === size.label;
            return (
              <button
                key={size.label}
                type="button"
                onClick={() => handleSelectHomeSize(size.label, size.baseCost)}
                className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-md font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant shadow-xs hover:bg-surface-container'
                }`}
              >
                {isActive && (
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                )}
                {size.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Rooms & Area Breakdown */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">counter_2</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Rooms &amp; Area Breakdown
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-medium">Customizable</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Bedrooms */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">bed</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Bedrooms</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Mattress sanitizing, dust mite wipe
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full">
              <button
                aria-label="Decrease bedrooms"
                type="button"
                onClick={() => setBedrooms((b) => Math.max(1, b - 1))}
                className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-title-md text-title-md text-on-surface min-w-[20px] text-center font-bold">
                {bedrooms}
              </span>
              <button
                aria-label="Increase bedrooms"
                type="button"
                onClick={() => setBedrooms((b) => Math.min(6, b + 1))}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant">
                <span className="material-symbols-outlined text-[22px]">shower</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                  Bathrooms
                </h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Grout descaling, mirror buff, tiles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full">
              <button
                aria-label="Decrease bathrooms"
                type="button"
                onClick={() => setBathrooms((b) => Math.max(1, b - 1))}
                className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-title-md text-title-md text-on-surface min-w-[20px] text-center font-bold">
                {bathrooms}
              </span>
              <button
                aria-label="Increase bathrooms"
                type="button"
                onClick={() => setBathrooms((b) => Math.min(5, b + 1))}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Kitchen */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">skillet</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold">Kitchen</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Chimney hood &amp; stove degrease
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full">
              <button
                aria-label="Decrease kitchen"
                type="button"
                onClick={() => setKitchens((k) => Math.max(1, k - 1))}
                className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-title-md text-title-md text-on-surface min-w-[20px] text-center font-bold">
                {kitchens}
              </span>
              <button
                aria-label="Increase kitchen"
                type="button"
                onClick={() => setKitchens((k) => Math.min(3, k + 1))}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Living & Balcony */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-xs opacity-90 border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[22px]">chair</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                  Living &amp; Balcony
                </h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Floor scrubbing, glass sliding door
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-label-sm font-semibold">
              Included
            </span>
          </div>
        </div>
      </section>

      {/* Step 3: Select Add-on Extras */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">add_task</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Select Add-on Extras
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Deep treatments
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {addons.map((addon) => (
            <label
              key={addon.id}
              className={`flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-xs cursor-pointer transition-all border ${
                addon.selected
                  ? 'border-primary/40 bg-primary-fixed/5'
                  : 'border-surface-container-high/40 hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addon.selected}
                  onChange={() => handleToggleAddon(addon.id)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      {addon.name}
                    </span>
                    {addon.isFree && (
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        eco
                      </span>
                    )}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {addon.description}
                  </span>
                </div>
              </div>

              {addon.isFree ? (
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary font-bold">
                  FREE
                </span>
              ) : (
                <span className="font-label-lg text-label-lg text-primary font-bold">
                  +${addon.price.toFixed(2)}
                </span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Step 4: Schedule Date & Slot */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">
              calendar_clock
            </span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Schedule Date &amp; Slot
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-medium">May 2024</span>
        </div>

        {/* Date Selector */}
        <div className="grid grid-cols-4 gap-2 mb-2.5">
          {dates.map((d) => {
            const isMatch = selectedDate.includes(d.day);
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => setSelectedDate(`${d.label} ${d.day} ${d.sub}`)}
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all ${
                  isMatch
                    ? 'bg-primary text-on-primary shadow-md scale-102 font-bold'
                    : 'bg-surface-container-lowest text-on-surface-variant shadow-xs hover:bg-surface-container-low border border-surface-container-high/40'
                }`}
              >
                <span className="font-label-sm text-label-sm">{d.label}</span>
                <span className="font-title-md text-title-md font-bold mt-0.5">{d.day}</span>
                <span className="font-label-sm text-label-sm opacity-80">{d.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Slot Selector */}
        <div className="flex flex-col gap-2">
          {slots.map((s) => {
            const isActive = selectedSlot === s.time;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSlot(s.time)}
                className={`flex items-center justify-between p-3.5 rounded-xl shadow-xs transition-all text-left border ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary/30 font-bold'
                    : 'bg-surface-container-lowest text-on-surface border-surface-container-high/40 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <div className="font-label-lg text-label-lg font-bold">{s.time}</div>
                    <div
                      className={`font-label-sm text-label-sm ${
                        isActive ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>

                {isActive ? (
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold">
                      Selected
                    </span>
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-surface-variant">
                    radio_button_unchecked
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Special Instructions */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">edit_note</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Special Instructions
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check</span> Saved
          </span>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any pets, special keys, or focus zones?"
            className="w-full rounded-xl bg-surface-container-lowest p-3.5 text-on-surface font-body-md text-body-md shadow-xs outline-none focus:ring-1 focus:ring-primary transition-all resize-none border border-surface-container-high/40"
          />
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">lock</span> Shared with
            cleaners only
          </div>
        </div>
      </section>

      {/* Pro Partner Assigned */}
      <div className="mt-5 px-4">
        <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center gap-3 shadow-xs border border-surface-container-high/40">
          <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Pro Partner Assigned: Team Sparkle (4.98 ★)
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Background checked • Certified chemical-safe crew
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar with Expandable Price Drawer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(19,27,46,0.08)] pb-safe border-t border-surface-container-high/60">
        {/* Expandable Price Breakdown Drawer */}
        {isDrawerOpen && (
          <div className="px-4 pt-3 pb-2 bg-surface-container-low transition-all border-b border-surface-container animate-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center py-1">
              <span className="font-body-md text-body-md text-on-surface-variant">
                {selectedHomeType} Base Deep Clean
              </span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                ${basePrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Add-ons Selected ({addons.filter((a) => a.selected && a.price > 0).length})
              </span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                ${addonsTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-body-md text-body-md text-tertiary">Promotional Eco Perk</span>
              <span className="font-label-lg text-label-lg text-tertiary font-semibold">FREE</span>
            </div>
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div
              className="flex items-center gap-1.5 cursor-pointer select-none"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Total Estimated
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary transition-transform">
                {isDrawerOpen ? 'expand_more' : 'expand_less'}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                ${totalCalculated.toFixed(2)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                incl. taxes
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 max-w-[210px] h-12 rounded-full bg-primary text-on-primary flex items-center justify-center gap-2 shadow-lg hover:bg-primary-container active:scale-98 transition-all font-bold"
          >
            <span className="font-label-lg text-label-lg font-semibold">Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmBooking}
        serviceTitle={initialPackageTitle}
        totalPrice={totalCalculated}
        scheduledDate={selectedDate}
        scheduledSlot={selectedSlot}
        homeType={selectedHomeType}
        address={selectedAddress}
      />
    </div>
  );
};
