import React, { useState } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress: string;
  onSelectAddress: (addr: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  selectedAddress,
  onSelectAddress,
}) => {
  const [newAddr, setNewAddr] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const addresses = [
    { name: 'Home', address: 'Maple Avenue, Apt 4B', city: 'San Francisco, CA', icon: 'home' },
    { name: 'Office', address: 'Downtown, Block 4', city: 'Financial District, CA', icon: 'apartment' },
    { name: 'Guest Suite', address: '742 Evergreen Terrace', city: 'Mission District, CA', icon: 'cottage' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">location_on</span>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Service Address
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2">
          {addresses.map((item, idx) => {
            const isSelected = selectedAddress.includes(item.address) || item.address.includes(selectedAddress);
            return (
              <div
                key={idx}
                onClick={() => {
                  onSelectAddress(item.address);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary-fixed/20 shadow-sm'
                    : 'border-surface-container hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs font-bold text-on-surface">{item.name}</span>
                      {isSelected && (
                        <span className="text-[10px] bg-primary text-white px-2 py-0.2 rounded-full font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-sm text-on-surface font-semibold">{item.address}</p>
                    <p className="text-xs text-on-surface-variant">{item.city}</p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="material-symbols-outlined text-primary text-[22px]">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-surface-variant text-[20px]">radio_button_unchecked</span>
                )}
              </div>
            );
          })}
        </div>

        {isAdding ? (
          <div className="p-3 bg-surface-container-low rounded-xl space-y-2">
            <input
              type="text"
              placeholder="Enter street & apartment number"
              value={newAddr}
              onChange={(e) => setNewAddr(e.target.value)}
              className="w-full h-10 px-3 bg-white rounded-lg text-sm text-on-surface outline-none border border-surface-container"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (newAddr.trim()) {
                    onSelectAddress(newAddr.trim());
                    onClose();
                  }
                }}
                className="flex-1 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold"
              >
                Save & Set
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="py-1.5 px-3 rounded-lg bg-surface-container text-xs text-on-surface-variant"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-2.5 rounded-xl border border-dashed border-primary/50 text-primary font-label-md text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add New Address
          </button>
        )}
      </div>
    </div>
  );
};
