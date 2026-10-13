import React, { useState } from 'react';
import { ScreenType, Booking } from '../types/index.ts';
import { ReceiptModal } from '../components/ReceiptModal.tsx';
import { ChatModal } from '../components/ChatModal.tsx';
import { CallModal } from '../components/CallModal.tsx';

interface BookingsViewProps {
  onNavigate: (screen: ScreenType) => void;
  activeBooking?: Booking | null;
  onShowToast: (msg: string) => void;
  onRebook: (serviceName: string, price: number) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  onNavigate,
  activeBooking,
  onShowToast,
  onRebook,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [chatSpecialist, setChatSpecialist] = useState<{ name: string; avatar: string }>({
    name: 'Elena Vance',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOL4LXdGM1a_JOW94iszbdXCFRVUDK48aaXyM6Ihluifw8AyBQUujt2dI7pjYIdIZ2uuyQD0cosr32chim8Sg67e7zEm49Xr4cuGN2wBJKQZ7NLSbjFNYbt2u1s-6EeBGu7IlcH0IHfostHZLEvSozjOO0lshS-3Mm9DHj-Km-n7dWZDfjGWsPtx3lEXMgXXmxWqd_KVE1L9fAgmVk1qw9o5DNbDp7jPGhsQZSMKVvm0fxr7fbINj',
  });

  const completedServices = [
    {
      id: 'c1',
      title: 'Sofa Steam Clean & Stain Removal',
      date: 'May 12, 2024',
      price: 45.0,
      cleanerName: 'Marcus Brody',
      cleanerAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuActQ4LcPtn6iBZovY5clM7QixC0yfBfR_zu-xMw54vygNTmdTe7-Z529ehMumXyCEfFTaihulp-2XrauHxfyNPNQ2QmKr1FbYWKctZ_7uSW0jI_CINmraKJZOpcu5lBge4FELmtg41rR1xvbXaf4pt9FtJevwCfKdGr8FIz6Pfn0jZWR21gkHzB7s5bSxEvyd7M6xguOkgS6sOHLgsKfFlWoP4ImUJQm4M6kb19bdac4GpKlqsjAv9',
      rating: 5,
      reviewQuote: 'Great work!',
      icon: 'chair',
    },
    {
      id: 'c2',
      title: 'Kitchen Express Degrease',
      date: 'April 28, 2024',
      price: 40.0,
      cleanerName: 'Sarah Jenkins',
      cleanerAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB7PdY_RGxDpKsPnI9yDh7fMrTxefJbgsY8617J91a9eQ_lFSllNSHXZ_JvQzdauLNULb_db8Jtbhne0dfSPI0kU2Qi3MLJat4ktQAvxp6kXHm_ab00obAXgs0YT-UPO62gnwe8NyFT8vlFg4Mttt-xcq0dhopIRAcWUO0f4rhGbt_7xtGzWSF3xF1Il4Z1ww3NUIjdwU0ItIlcWrBhABIVicqWPiT3xI8-1LwDyYoFFn4wjYsw5ssw',
      rating: 5,
      badge: 'Top Rated Pro',
      icon: 'countertops',
    },
    {
      id: 'c3',
      title: 'Full Villa Spring Sanitize',
      date: 'March 14, 2024',
      price: 120.0,
      cleanerName: 'Elena Vance',
      cleanerAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOL4LXdGM1a_JOW94iszbdXCFRVUDK48aaXyM6Ihluifw8AyBQUujt2dI7pjYIdIZ2uuyQD0cosr32chim8Sg67e7zEm49Xr4cuGN2wBJKQZ7NLSbjFNYbt2u1s-6EeBGu7IlcH0IHfostHZLEvSozjOO0lshS-3Mm9DHj-Km-n7dWZDfjGWsPtx3lEXMgXXmxWqd_KVE1L9fAgmVk1qw9o5DNbDp7jPGhsQZSMKVvm0fxr7fbINj',
      rating: 5,
      reviewQuote: 'Spotless!',
      icon: 'villa',
    },
  ];

  const handleOpenChat = (name: string, avatar: string) => {
    setChatSpecialist({ name, avatar });
    setIsChatOpen(true);
  };

  const handleOpenCall = (name: string, avatar: string) => {
    setChatSpecialist({ name, avatar });
    setIsCallOpen(true);
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 px-4 pt-2">
      {/* Interactive Segmented Control Tabs */}
      <div className="relative w-full p-1 bg-surface-container rounded-full flex items-center justify-between shadow-xs select-none">
        <button
          onClick={() => setActiveTab('active')}
          className={`relative z-10 flex-1 py-2 px-3 rounded-full text-center transition-all duration-300 font-label-md text-label-md flex items-center justify-center gap-1.5 ${
            activeTab === 'active'
              ? 'bg-primary text-on-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Active</span>
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              activeTab === 'active'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            1
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`relative z-10 flex-1 py-2 px-3 rounded-full text-center transition-all duration-300 font-label-md text-label-md flex items-center justify-center gap-1.5 ${
            activeTab === 'completed'
              ? 'bg-primary text-on-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Completed</span>
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
              activeTab === 'completed'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            5
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`relative z-10 flex-1 py-2 px-3 rounded-full text-center transition-all duration-300 font-label-md text-label-md flex items-center justify-center gap-1.5 ${
            activeTab === 'cancelled'
              ? 'bg-primary text-on-primary shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Cancelled</span>
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
              activeTab === 'cancelled'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            0
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* ACTIVE VIEW SECTION */}
        {activeTab === 'active' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Happening Today
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-full">
                1 Service
              </span>
            </div>

            {/* Active Booking Card */}
            <article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative group transition-all duration-300 border border-surface-container-high/40">
              {/* Accent Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary-container"></div>

              <div className="p-4 space-y-4">
                {/* Header: Order ID & Realtime Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">tag</span>
                      Order #CP-8924
                    </span>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      2 BHK Deep Cleaning
                    </h3>
                  </div>

                  {/* Sky Blue Pill: Live status */}
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm shadow-xs flex-shrink-0 animate-bounce"
                    style={{ animationDuration: '2.5s' }}
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      local_shipping
                    </span>
                    Cleaner En Route
                  </span>
                </div>

                {/* Time Schedule Block */}
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-sm text-label-sm text-on-surface-variant leading-none mb-0.5">
                        Scheduled Arrival
                      </p>
                      <p className="font-title-md text-title-md text-on-surface leading-tight font-semibold truncate">
                        Today, 01:00 PM
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold tracking-tight">
                    In Progress
                  </span>
                </div>

                {/* Cleaner Profile Compact Card */}
                <div className="flex items-center justify-between gap-3 p-3 bg-surface rounded-xl border border-surface-container">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                        alt="Elena Vance"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAOL4LXdGM1a_JOW94iszbdXCFRVUDK48aaXyM6Ihluifw8AyBQUujt2dI7pjYIdIZ2uuyQD0cosr32chim8Sg67e7zEm49Xr4cuGN2wBJKQZ7NLSbjFNYbt2u1s-6EeBGu7IlcH0IHfostHZLEvSozjOO0lshS-3Mm9DHj-Km-n7dWZDfjGWsPtx3lEXMgXXmxWqd_KVE1L9fAgmVk1qw9o5DNbDp7jPGhsQZSMKVvm0fxr7fbINj"
                      />
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-xs"
                        title="Verified Background Check"
                      >
                        <span className="material-symbols-outlined text-[11px]">verified</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-title-md text-title-md text-on-surface truncate font-bold">
                          Elena Vance
                        </p>
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          shield
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <span
                          className="material-symbols-outlined text-[15px] text-tertiary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-label-md text-label-md font-bold text-on-surface">
                          4.95
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                          (182 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact cleaner actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      aria-label="Call cleaner"
                      onClick={() =>
                        handleOpenCall(
                          'Elena Vance',
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOL4LXdGM1a_JOW94iszbdXCFRVUDK48aaXyM6Ihluifw8AyBQUujt2dI7pjYIdIZ2uuyQD0cosr32chim8Sg67e7zEm49Xr4cuGN2wBJKQZ7NLSbjFNYbt2u1s-6EeBGu7IlcH0IHfostHZLEvSozjOO0lshS-3Mm9DHj-Km-n7dWZDfjGWsPtx3lEXMgXXmxWqd_KVE1L9fAgmVk1qw9o5DNbDp7jPGhsQZSMKVvm0fxr7fbINj'
                        )
                      }
                      className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform hover:bg-surface-container-high"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </button>
                    <button
                      aria-label="Message cleaner"
                      onClick={() =>
                        handleOpenChat(
                          'Elena Vance',
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOL4LXdGM1a_JOW94iszbdXCFRVUDK48aaXyM6Ihluifw8AyBQUujt2dI7pjYIdIZ2uuyQD0cosr32chim8Sg67e7zEm49Xr4cuGN2wBJKQZ7NLSbjFNYbt2u1s-6EeBGu7IlcH0IHfostHZLEvSozjOO0lshS-3Mm9DHj-Km-n7dWZDfjGWsPtx3lEXMgXXmxWqd_KVE1L9fAgmVk1qw9o5DNbDp7jPGhsQZSMKVvm0fxr7fbINj'
                        )
                      }
                      className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform hover:bg-surface-container-high"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                  </div>
                </div>

                {/* Live Cleaning Checklist Micro-Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="font-label-sm text-label-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-tertiary">
                        checklist
                      </span>
                      Preparation &amp; Toolkit Sanitized
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold text-primary">
                      ETA: 12 Mins
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary-container h-full rounded-full transition-all duration-500"
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('tracking')}
                    className="flex-1 h-12 px-4 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all hover:bg-primary-container"
                  >
                    <span className="material-symbols-outlined text-[20px] animate-pulse">
                      radar
                    </span>
                    <span>Track Live</span>
                  </button>
                  <button
                    onClick={() => setIsReceiptOpen(true)}
                    className="h-12 px-4 rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Past Bookings Section inside active overview for continuous context */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Recent Services
                </h2>
                <button
                  onClick={() => setActiveTab('completed')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-0.5 hover:underline"
                >
                  View All (5)
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>

              {/* Past Booking Card 1: Sofa Steam Clean */}
              <article className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3.5 transition-shadow hover:shadow-md border border-surface-container-high/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[26px]">chair</span>
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                        Sofa Steam Clean &amp; Stain Removal
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span>May 12, 2024</span>
                        <span>•</span>
                        <span className="font-semibold text-on-surface">Paid $45.00</span>
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Completed
                  </span>
                </div>

                <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      alt="Marcus Brody"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuActQ4LcPtn6iBZovY5clM7QixC0yfBfR_zu-xMw54vygNTmdTe7-Z529ehMumXyCEfFTaihulp-2XrauHxfyNPNQ2QmKr1FbYWKctZ_7uSW0jI_CINmraKJZOpcu5lBge4FELmtg41rR1xvbXaf4pt9FtJevwCfKdGr8FIz6Pfn0jZWR21gkHzB7s5bSxEvyd7M6xguOkgS6sOHLgsKfFlWoP4ImUJQm4M6kb19bdac4GpKlqsjAv9"
                    />
                    <div className="truncate">
                      <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                        Specialist
                      </p>
                      <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        Marcus Brody
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-lowest rounded-full shadow-xs flex-shrink-0">
                    <div className="flex text-tertiary">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm italic text-on-surface-variant truncate">
                      "Great work!"
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setIsReceiptOpen(true)}
                    className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    Invoice
                  </button>
                  <button
                    onClick={() =>
                      onRebook('Sofa Steam Clean & Stain Removal', 45)
                    }
                    className="h-10 px-4 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 hover:bg-surface-container-high active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    Rebook Service
                  </button>
                </div>
              </article>

              {/* Past Booking Card 2: Kitchen Express Degrease */}
              <article className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3.5 transition-shadow hover:shadow-md border border-surface-container-high/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[26px]">countertops</span>
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                        Kitchen Express Degrease
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span>April 28, 2024</span>
                        <span>•</span>
                        <span className="font-semibold text-on-surface">Paid $40.00</span>
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Completed
                  </span>
                </div>

                <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      alt="Sarah Jenkins"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7PdY_RGxDpKsPnI9yDh7fMrTxefJbgsY8617J91a9eQ_lFSllNSHXZ_JvQzdauLNULb_db8Jtbhne0dfSPI0kU2Qi3MLJat4ktQAvxp6kXHm_ab00obAXgs0YT-UPO62gnwe8NyFT8vlFg4Mttt-xcq0dhopIRAcWUO0f4rhGbt_7xtGzWSF3xF1Il4Z1ww3NUIjdwU0ItIlcWrBhABIVicqWPiT3xI8-1LwDyYoFFn4wjYsw5ssw"
                    />
                    <div className="truncate">
                      <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                        Specialist
                      </p>
                      <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        Sarah Jenkins
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded-full">
                    <span
                      className="material-symbols-outlined text-[14px] text-tertiary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Top Rated Pro
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsReceiptOpen(true)}
                    className="flex-1 h-10 px-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[17px]">download</span>
                    Download Invoice
                  </button>
                  <button
                    onClick={() =>
                      onRebook('Kitchen Express Degrease', 40)
                    }
                    className="flex-1 h-10 px-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all hover:bg-primary-container"
                  >
                    <span className="material-symbols-outlined text-[17px]">replay</span>
                    Rebook Service
                  </button>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* COMPLETED TAB */}
        {activeTab === 'completed' && (
          <section className="space-y-3">
            <div className="px-1 flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Past Completed Services
              </h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                5 bookings
              </span>
            </div>

            {completedServices.map((item) => (
              <article
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-4 shadow-xs space-y-3 border border-surface-container-high/40"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      {item.title}
                    </h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {item.date} • Paid: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Cleaner: <strong>{item.cleanerName}</strong>
                  </span>
                  <span className="text-tertiary font-semibold">
                    ★★★★★ {item.reviewQuote ? `"${item.reviewQuote}"` : 'Verified Clean'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsReceiptOpen(true)}
                    className="flex-1 h-10 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">receipt</span> Invoice
                  </button>
                  <button
                    onClick={() => onRebook(item.title, item.price)}
                    className="flex-1 h-10 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">replay</span> Rebook
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* CANCELLED TAB */}
        {activeTab === 'cancelled' && (
          <section className="space-y-4">
            <div className="bg-surface-container-lowest rounded-xl p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-xs border border-surface-container-high/40">
              <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[42px]">sentiment_satisfied</span>
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  No Cancelled Bookings
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Every appointment has been smoothly fulfilled. Your home is always in sparkling good
                  hands!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('active')}
                className="h-10 px-5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold active:scale-95 transition-transform"
              >
                Return to Active
              </button>
            </div>
          </section>
        )}

        {/* Help & Concierge Support Banner */}
        <aside className="w-full bg-gradient-to-r from-surface-container-high to-surface-container rounded-xl p-4 flex items-center justify-between gap-3 shadow-xs relative overflow-hidden border border-surface-container-high/40">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-secondary-container/20 pointer-events-none blur-xl"></div>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold leading-tight">
                Need assistance?
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                24/7 Support available for your booking
              </p>
            </div>
          </div>
          <button
            onClick={() => handleOpenChat('CleanPro Concierge Support', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2WFzaIRsgoieQwLKKkoCX7uuKwRHYoXnwTk9gOXDJpGcSZwJyOruYTEosST0b3eK22DI2Kh26BVYtssZpJSaI7nhf9lnOfidkNZcTmmDZwEdL6vB-39Ee8bkTJO6qxm_l0rMIyA6YK3h8RBJjWABK-85iMA3JSOJQb6FCr7NEEKOM2bMRn6He-i2AZpzliL7m5vUdjWcddnEg5TV9qL2rMfUku8vQTQi1Z8Am8BxuaBWS6oyRJSZB')}
            className="h-10 px-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center flex-shrink-0 shadow-sm active:scale-95 transition-transform"
          >
            Chat Now
          </button>
        </aside>
      </div>

      {/* Modals */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        cleanerName={chatSpecialist.name}
        cleanerAvatar={chatSpecialist.avatar}
      />
      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        cleanerName={chatSpecialist.name}
        cleanerAvatar={chatSpecialist.avatar}
      />
    </div>
  );
};
