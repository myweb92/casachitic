/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */


export interface RoomDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  size: string;
  capacity: string;
  bed: string;
  amenities: string[];
  price: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'all' | 'hotel' | 'city';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingInquiry {
  id: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guestsCount: number;
  message?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}
export type Language = 'en';
