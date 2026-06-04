import type { Room } from './types';

export const ROOMS: Room[] = [
  {
    id: 'executive',
    name: 'Executive Suite',
    price: 120,
    tagline: 'The epitome of luxury',
    description: 'Our finest room for discerning guests. Spacious, elegant, and perfectly appointed with premium amenities.',
    images: [
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33.jpeg',
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33 (1).jpeg',
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33 (2).jpeg'
    ]
  },
  {
    id: 'king',
    name: 'King Suite',
    price: 110,
    tagline: 'Perfect for special occasions',
    description: 'Romantic and elegant, the King Suite is designed for couples seeking a memorable and intimate getaway.',
    images: [
      '/rooms/king/WhatsApp Image 2026-06-03 at 17.02.13.jpeg',
      '/rooms/king/WhatsApp Image 2026-06-03 at 17.02.13 (1).jpeg',
      '/rooms/king/WhatsApp Image 2026-06-03 at 17.02.13 (2).jpeg'
    ]
  },
  {
    id: 'superior',
    name: 'Superior King',
    price: 100,
    tagline: 'Spacious layout and comfort',
    description: 'Featuring a premium king bed and a generous layout, ideal for extended stays and business travelers.',
    images: [
      '/rooms/superior/WhatsApp Image 2026-06-03 at 17.04.41.jpeg',
      '/rooms/superior/WhatsApp Image 2026-06-03 at 17.04.41 (1).jpeg',
      '/rooms/superior/WhatsApp Image 2026-06-03 at 17.04.41 (2).jpeg'
    ]
  },
  {
    id: 'deluxe',
    name: 'Deluxe Double',
    price: 90,
    tagline: 'From business trips to leisure',
    description: 'Versatile and comfortable, our most popular choice for both short stays and long visits.',
    images: [
      '/rooms/deluxe/WhatsApp Image 2026-06-03 at 17.06.33.jpeg',
      '/rooms/deluxe/WhatsApp Image 2026-06-03 at 17.06.33 (1).jpeg',
      '/rooms/deluxe/WhatsApp Image 2026-06-03 at 17.06.33 (2).jpeg'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Room',
    price: 80,
    tagline: 'Perfect for comfortable stays',
    description: 'Everything you need for a great stay at the best value. Comfortable, clean, and well-appointed.',
    images: [
      '/rooms/standard/WhatsApp Image 2026-06-03 at 17.08.35.jpeg',
      '/rooms/standard/WhatsApp Image 2026-06-03 at 17.08.35 (1).jpeg',
      '/rooms/standard/WhatsApp Image 2026-06-03 at 17.08.35 (2).jpeg'
    ]
  },
  {
    id: 'interior',
    name: 'Art Lodges Interior',
    price: 0, // Price TBD
    tagline: 'Gather, relax, and connect',
    description: 'Our shared spaces are designed for comfort and connection. Perfect for groups and small events.',
    images: [
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.34.jpeg',
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.34 (1).jpeg',
      '/rooms/executive/WhatsApp Image 2026-06-03 at 17.01.33 (3).jpeg'
    ]
  }
];

export const FEATURES = [
  { icon: '☕', name: 'Tea & Coffee Maker' },
  { icon: '🧊', name: 'Fridge' },
  { icon: '📺', name: 'Cable TV' },
  { icon: '🌐', name: 'WiFi' },
  { icon: '🚿', name: 'Private Bathroom' },
  { icon: '🍽️', name: 'Microwave' }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    rating: 5,
    quote: 'The most romantic stay we have ever had. The attention to detail is incredible.'
  },
  {
    name: 'James K.',
    rating: 5,
    quote: 'Beautiful rooms and exceptional service. The Executive Suite is truly worth it.'
  },
  {
    name: 'Elena R.',
    rating: 5,
    quote: 'A hidden gem. Artistic, quiet, and very comfortable. We will be back!'
  }
];
