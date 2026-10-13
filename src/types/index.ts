export type NavigationTab = 'explore' | 'services' | 'bookings' | 'profile';

export type ScreenType = 
  | 'explore'
  | 'customize'
  | 'bookings'
  | 'tracking'
  | 'services'
  | 'profile';

export interface ServicePackage {
  id: string;
  title: string;
  tagline: string;
  description: string;
  basePrice: number;
  duration: string;
  rating: number;
  reviewCount: number;
  image: string;
  badges: string[];
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree?: boolean;
  selected: boolean;
}

export interface Booking {
  id: string;
  orderNumber: string;
  serviceName: string;
  homeType: string;
  scheduledTime: string;
  date: string;
  status: 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  cleaner: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    title: string;
    badges: string[];
    phone?: string;
  };
  reviewText?: string;
  etaMinutes?: number;
  address: string;
  otp?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'cleaner';
  text: string;
  time: string;
}
