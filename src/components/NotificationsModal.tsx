import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onTrackOrder,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Cleaner Elena is en route!',
      message: 'Estimated arrival in 12 mins at Maple Avenue, Apt 4B. Your verbal security code is 4829.',
      time: '10 mins ago',
      type: 'dispatch',
      unread: true,
    },
    {
      id: '2',
      title: '20% Welcome Offer Applied',
      message: 'Use code FIRSTCLEAN20 on any customized home package for $20 off.',
      time: '2 hours ago',
      type: 'promo',
      unread: false,
    },
    {
      id: '3',
      title: 'Previous Clean Completed',
      message: 'Marcus Brody completed Sofa Steam Clean & Stain Removal. Rated 5 stars!',
      time: 'Yesterday',
      type: 'service',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.type === 'dispatch') {
                  onTrackOrder();
                  onClose();
                }
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                n.unread
                  ? 'bg-primary-fixed/20 border-primary/40'
                  : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  )}
                  <h4 className="font-label-md text-sm font-bold text-on-surface">
                    {n.title}
                  </h4>
                </div>
                <span className="text-[11px] font-label-sm text-on-surface-variant shrink-0">
                  {n.time}
                </span>
              </div>
              <p className="text-xs font-body-md text-on-surface-variant mt-1 leading-relaxed">
                {n.message}
              </p>
              {n.type === 'dispatch' && (
                <div className="mt-2 flex items-center gap-1 text-xs text-primary font-bold">
                  <span>Track Live Now</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
