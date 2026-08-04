/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoomDetails, GalleryItem, FAQItem } from './types';
import headerImg from '../assets/Header.jpeg';
import oldbrasov from '../assets/oldbrasov.png';
import brasov1 from '../assets/brasov1.jpeg';

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: headerImg,
    title: 'Casa Chitic',
    subtitle: 'Welcome to Casa Chitic Boutique Hotel',
    description: 'A historic sanctuary combining old-world Transylvanian soul with refined luxury in Brașov.'
  }
];

export const ABOUT_TEXT = {
  title: 'Heritage, Comfort & Timeless Elegance',
  paragraph1: 'Located in the historical heart of Brașov, just 100 meters from the majestic Black Church, Casa Chitic merges medieval Saxon charm with contemporary luxury hospitality. Our boutique hotel sits on a cobblestone-paved street, perfectly positioned to explore the winding stories, historic architecture, and scenic cafes of Transylvania.',
  paragraph2: 'Each of our meticulously designed rooms features genuine solid wood furniture, historical architectural preservation such as original wooden beams and restored brick arches, state-of-the-art air conditioning, high-speed Wi-Fi, modern Smart TVs, and a premium fully stocked minibar. Here, every detail is selected to cultivate an atmosphere of deep rest and authentic Romanian hospitality.',
  tagline: 'A sanctuary designed for discerning travelers who value story, craftsmanship, and serenity.',
  imageHillside: oldbrasov,
  imageRooftops: brasov1
};

export const QUOTE_TEXT = {
  quote: '"A goal without a plan is just a wish!"',
  author: 'Antoine de Saint-Exupéry'
};

export const STORY_VIDEO_SECTION = {
  imageBg: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80',
  title: 'DISCOVER OUR STORIES',
  subtitle: 'Watch our story and immerse yourself in the heritage of Casa Chitic',
  buttonText: 'SEE OUR STORY',
  videoEmbedUrl: 'https://www.youtube.com/embed/xwNtlYX_iYM?start=8' // Real YouTube video for Casa Chitic story
};

export const ROOMS_DATA: RoomDetails[] = [
  {
    id: 'series',
    title: 'Rooms',
    description: 'Bright, sun-drenched attic retreats with writing desks, elegant skylights, and a serene minimalist design.',
    longDescription: 'Located on the upper levels of Casa Chitic, our Rooms offer an inspiring, airy retreat. Sunbeams stream through premium skylights, highlighting clean lines and minimalist wooden accents. It features a custom-built oak writing desk, making it the ideal choice for business travelers, creatives, or anyone looking for a quiet, luminous sanctuary. Wake up to a direct view of the sky and the beautiful Brașov rooftops.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    size: '28 m²',
    capacity: 'Up to 2 Guests',
    bed: 'Queen Size Premium Bed',
    amenities: [
        'Elegant Double Attic Skylight',
        'Custom Oak Writing Desk & Ergonomic Area',
        'In-Room Air Conditioning',
        'Smart TV with satellite channels',
        'Fully Stocked Minibar',
        'High-Speed Wi-Fi',
        'Walk-in Glass Rainfall Shower',
        'Premium Organic Tea & Coffee Selection'
      ],
    price: '€95'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    url: brasov1,
    caption: 'The classic exterior on historical Strada Johann Gött',
    category: 'hotel'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    caption: 'Vaulted brick ceilings inside our historic suites',
    category: 'hotel'
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    caption: 'Panoramic view of Brașov and Mount Tâmpa',
    category: 'city'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Elegant custom marble vanity with luxury finishes',
    category: 'hotel'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Deluxe double bedroom showing centuries-old oak wooden beams',
    category: 'hotel'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Brașov Council Square, steps away from our hotel',
    category: 'city'
  },
  {
    id: 'gal-7',
    url: 'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Quaint cobblestone streets of the Old Saxon town',
    category: 'city'
  },
  {
    id: 'gal-8',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    caption: 'Aesthetic bedside details reflecting attention to style',
    category: 'hotel'
  },
  {
    id: 'gal-10',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Sun-drenched study desk in our Series room attic',
    category: 'hotel'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How close is Casa Chitic to the Black Church?',
    answer: 'We are exceptionally located in the pedestrian heart of old Brașov, exactly 100 meters (a 1-minute walk) from the Black Church (Biserica Neagră) and Council Square (Piața Sfatului).'
  },
  {
    question: 'Is parking available near the boutique hotel?',
    answer: 'Since we are situated on a quiet historic pedestrian-friendly street, direct parking in front of the building is restricted. However, multiple public, secure parking lots (such as on Strada Nicolae Bălcescu or near the Regina Maria Park) are situated just 3 to 5 minutes walking distance. We assist with directions and luggage unloading.'
  },
  {
    question: 'Do the rooms feature air conditioning?',
    answer: 'Yes, despite the historical structure of our heritage building, all rooms are fully equipped with modern, silent air conditioning units to ensure perfect comfort even during hot summer days.'
  },
  {
    question: 'What time is check-in and check-out?',
    answer: 'Our standard check-in begins at 14:00 (2:00 PM), and check-out is until 11:00 AM. If you arrive early or need late check-out, please let us know in advance and we will accommodate luggage storage free of charge.'
  },
  {
    question: 'Is breakfast included or available?',
    answer: 'Yes! We offer a sumptuous, freshly prepared breakfast made with premium local Transylvanian ingredients. It can be added to your booking or requested upon arrival, served in our atmospheric lounge or direct to your room.'
  }
];

export const CONTACT_INFO = {
  email: 'office@casachiticbalcescu.ro',
  website: 'www.casachiticbalcescu.ro',
  phone: '0731.002.138',
  phoneFormatted: '+40 731 002 138',
  address: 'Strada Nicolae Balcescu 13, Brașov, Romania',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.704652251239!2d25.58914847683416!3d45.6417772710777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b7e805566cf%3A0x6e0e9069d2d88812!2sStrada%20Nicolae%20Balcescu%2013%2C%20Bra%C8%99ov!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61556292635319',
  instagramUrl: 'https://www.instagram.com/casachitic/',
  googleUrl: 'https://google.com/maps'
};
