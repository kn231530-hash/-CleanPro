/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Booking } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { Toast } from './components/Toast.tsx';
import { AddressModal } from './components/AddressModal.tsx';
import { NotificationsModal } from './components/NotificationsModal.tsx';
import { ExploreView } from './views/ExploreView.tsx';
import { CustomizeView } from './views/CustomizeView.tsx';
import { BookingsView } from './views/BookingsView.tsx';
import { LiveTrackingView } from './views/LiveTrackingView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { ProfileView } from './views/ProfileView.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['explore']);
  const [selectedAddress, setSelectedAddress] = useState('Maple Avenue, Apt 4B');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Selected package details for customization
  const [customizingPackage, setCustomizingPackage] = useState<{
    title: string;
    basePrice: number;
  }>({
    title: 'Full Home Deep Cleaning',
    basePrice: 89,
  });

  // Active Live Booking State
  const [activeBooking, setActiveBooking] = useState<Booking>({
    id: 'booking-8924',
    orderNumber: 'CP-8924',
    serviceName: '2 BHK Deep Cleaning',
    homeType: '2 BHK',
    scheduledTime: '01:00 PM',
    date: 'Today, 01:00 PM',
    status: 'en_route',
    price: 134.0,
    address: 'Maple Avenue, Apt 4B',
    otp: '4829',
    cleaner: {
      name: 'Elena Vance',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB',
      rating: 4.95,
      reviews: 182,
      title: 'Top Rated Pro',
      badges: ['Background Checked', 'Chemical-Safe Certified'],
    },
    etaMinutes: 14,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // pop current
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen || 'explore');
    } else {
      setCurrentScreen('explore');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (title: string, basePrice: number) => {
    setCustomizingPackage({ title, basePrice });
    navigateTo('customize');
  };

  const handleBookingCreated = (newBooking: Booking) => {
    setActiveBooking(newBooking);
    showToast(`Order #${newBooking.orderNumber} confirmed! Pro is en route.`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col items-center">
      {/* Screen container - mobile frame styling on wide screens, full on mobile */}
      <div className="w-full max-w-md min-h-screen bg-surface flex flex-col relative shadow-xl overflow-x-hidden">
        {/* Fixed Header */}
        <Header
          currentScreen={currentScreen}
          selectedAddress={selectedAddress}
          onOpenAddressSelector={() => setIsAddressModalOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onNavigate={navigateTo}
          onBack={handleBack}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full pt-16">
          {currentScreen === 'explore' && (
            <ExploreView
              onNavigate={navigateTo}
              onSelectPackage={handleSelectPackage}
              selectedAddress={selectedAddress}
              onOpenAddressSelector={() => setIsAddressModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'customize' && (
            <CustomizeView
              onBack={handleBack}
              onNavigate={navigateTo}
              onBookingCreated={handleBookingCreated}
              selectedAddress={selectedAddress}
              initialPackageTitle={customizingPackage.title}
              initialBasePrice={customizingPackage.basePrice}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'bookings' && (
            <BookingsView
              onNavigate={navigateTo}
              activeBooking={activeBooking}
              onShowToast={showToast}
              onRebook={(title, price) => handleSelectPackage(title, price)}
            />
          )}

          {currentScreen === 'tracking' && (
            <LiveTrackingView
              onBack={handleBack}
              onNavigate={navigateTo}
              activeBooking={activeBooking}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'services' && (
            <ServicesView
              onNavigate={navigateTo}
              onSelectPackage={handleSelectPackage}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              onNavigate={navigateTo}
              selectedAddress={selectedAddress}
              onOpenAddressSelector={() => setIsAddressModalOpen(true)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation (for explore, services, bookings, profile) */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          activeBookingCount={activeBooking?.status === 'en_route' ? 1 : 0}
        />

        {/* Global Toast */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        {/* Address Switcher Modal */}
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          selectedAddress={selectedAddress}
          onSelectAddress={(addr) => {
            setSelectedAddress(addr);
            showToast(`Location set to: ${addr}`);
          }}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onTrackOrder={() => navigateTo('tracking')}
        />
      </div>
    </div>
  );
}
