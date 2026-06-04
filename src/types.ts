export type RoomType = 
  | 'Executive Suite' 
  | 'King Suite' 
  | 'Superior King' 
  | 'Deluxe Double' 
  | 'Standard Room' 
  | 'Art Lodges Interior';

export interface Room {
  id: string;
  name: RoomType;
  price: number;
  description: string;
  tagline: string;
  images: string[];
}

export interface Booking {
  id: number;
  room_type: RoomType;
  check_in: string;
  check_out: string;
  guest_name: string;
  phone: string;
  email?: string;
  guests_count: number;
  occasion?: string;
  requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Availability {
  id: number;
  room_type: RoomType;
  blocked_date: string;
  reason?: string;
}
