/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ABOUT_TEXT, CONTACT_INFO, GALLERY_ITEMS } from "../data";

export interface CMSImageItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface CMSRoomItem {
  id: string;
  title: string;
  collection: string;
  size: string;
  capacity: string;
  bed: string;
  description: string;
  badge: string;
  images: string[];
  amenities: string[];
}

export type ExperienceIconName =
  | "Landmark"
  | "ShieldCheck"
  | "Snowflake"
  | "Tv"
  | "Flower"
  | "Car";

export interface CMSExperienceItem {
  id: string;
  iconName: ExperienceIconName;
  badge: string;
  title: string;
  desc: string;
}

export interface CMSReviewItem {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
}

export interface CMSContent {
  termsAndConditions: string;
  privacyPolicy: string;
  brand: {
    title: string;
    subtitle: string;
    logoUrl: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    phoneFormatted: string;
    address: string;
    website: string;
    facebookUrl: string;
    instagramUrl: string;
    bookingUrl: string;
  };
  aboutText: {
    anchor: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    tagline: string;
    locationBadge: string;
  };
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  heroBookBtnText: string;
  roomsSection: {
    anchor: string;
    title: string;
    subtitle: string;
    specsBtnText: string;
    bookBtnText: string;
    amenitiesTitle: string;
  };
  rooms: CMSRoomItem[];
  experiencesSection: {
    anchor: string;
    title: string;
    subtitle: string;
  };
  experiences: CMSExperienceItem[];
  reviewsSection: {
    anchor: string;
    title: string;
    readAllBtnText: string;
    readAllUrl: string;
  };
  reviews: CMSReviewItem[];
  contactSection: {
    anchor: string;
    title: string;
    subtitle: string;
    formTitle: string;
    sendBtnText: string;
  };
  footerSection: {
    description: string;
    connectTitle: string;
    backToTopText: string;
  };
  images: {
    heroBg: string;
    aboutHillside: string;
    aboutRooftops: string;
    storyVideoBg: string;
    roomMain: string;
    gallery: CMSImageItem[];
  };
  adminPasswordHash: string; // Stored securely in localStorage or memory
}

const DEFAULT_BOOKING_URL =
  "https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron";

const DEFAULT_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=1c6902ee83d0e082&rlz=1C5CHFA_enRO1041RO1041&cs=1&sxsrf=APpeQnvbkJSGUfVL9JUPwvjLpInv6wzmeQ:1784804512671&uds=AJ5uw1_a2D0D09lxm8gpKKOTUn4r_l5CtmG5EFkznAXrJ4iL7axcXIEyWJBXpVExe9ULecD3QjkPfCjYgVOcoefzeYinOrtO_2Os_NHs8p7GvuX7peYMWL30bTggjaDZ6rg_sJLbeRWicXD38R1zpzpsevq799BsBIHkTSxr1P7RPjqhxZmGs3GZKWN5GyARfTAAgI0QE5wT&q=Hotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7+Reviews&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4OHWJ8-BwC-CfiEJzGpeRyJVozubXkv6QuQEeHmi4afFvOlKmHfhKQgoN-ASTdWnoFMV5R0I9t-kT2GWj-P74K8RdgyqQs27jDTp7YX_wyZiCPaCyLYhy8Hefc8038_QfD9IeoAiGtivmXayy0ckJBMphG7&hl=en-RO&sa=X&ved=2ahUKEwjG7t730uiVAxU_B9sEHTYYEogQ_4MLegQICBAS&biw=1504&bih=700&dpr=2";

const DEFAULT_ROOM_AMENITIES = [
  "220-240 volt circuits",
  "Air-conditioning",
  "AM / FM radio",
  "Cable television",
  "Cribs upon request",
  "Hairdryer",
  "Slippers",
  "Wireless internet (WiFi)",
];

export const DEFAULT_ROOMS: CMSRoomItem[] = [
  {
    id: "room-deluxe-apartment",
    title: "Deluxe Apartment",
    collection: "JOHANN GOTT 7",
    size: "55 m²",
    capacity: "2-4 Adults",
    bed: "1 Double Bed & Sofa",
    description:
      "The air-conditioned apartment features 2 bedrooms and 1 bathroom with a walk-in shower and a hairdryer. This apartment has soundproof walls, a minibar, a flat-screen TV with cable channels and a terrace.",
    badge: "PREMIUM",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/t20pj~~6a328456922c9.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-4~~6a328463113f1.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/ybwyn_1~~6a328468082ca.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/download~~6a32846f96ade.png",
    ],
    amenities: [...DEFAULT_ROOM_AMENITIES],
  },
  {
    id: "room-deluxe-suite",
    title: "Deluxe Suite",
    collection: "JOHANN GOTT 7",
    size: "50 m²",
    capacity: "2-4 Adults",
    bed: "1 Double Bed",
    description:
      "This suite includes 1 living room, 1 separate bedroom and 1 bathroom with a walk-in shower and free toiletries. The suite offers air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels. The unit has 3 beds.",
    badge: "BOUTIQUE",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image-2~~6a32840c7c61b.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-1~~6a328417baf48.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-2~~6a32841813246.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-3~~6a32841a25ea3.jpg",
    ],
    amenities: [...DEFAULT_ROOM_AMENITIES],
  },
  {
    id: "room-deluxe-twin",
    title: "Deluxe Twin Room",
    collection: "JOHANN GOTT 7",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "2 Single Beds",
    description:
      "Featuring free toiletries, this twin room includes a private bathroom with a walk-in shower, a hairdryer and slippers. This twin room is air-conditioned and has a flat-screen TV with cable channels, soundproof walls, a minibar and a wardrobe. The unit has 2 beds.",
    badge: "COZY",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a3283e751102.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-4~~6a3283f16c7aa.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283f1db075.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283f373f06.jpg",
    ],
    amenities: [...DEFAULT_ROOM_AMENITIES],
  },
  {
    id: "room-deluxe-double",
    title: "Deluxe Double Room",
    collection: "JOHANN GOTT 7",
    size: "25 m²",
    capacity: "2 Adults",
    bed: "1 Double Bed",
    description:
      "Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe and a flat-screen TV with cable channels. The unit offers 1 bed.",
    badge: "QUIET",
    images: [
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283b435512.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a32839f156df.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283b3a751d.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-3~~6a3283b628c43.jpg",
    ],
    amenities: [...DEFAULT_ROOM_AMENITIES],
  },
  {
    id: "room-deluxe-no-window",
    title: "Deluxe Room - No Window",
    collection: "JOHANN GOTT 7",
    size: "20 m²",
    capacity: "2 Adults",
    bed: "1 Double Bed",
    description:
      "Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels. The unit offers 1 bed.",
    badge: "BEST SELLER",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image-1~~6a32836d4c50c.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-2~~6a32837898a3c.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-3~~6a328378ee50f.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-4~~6a32837aad27b.jpg",
    ],
    amenities: [...DEFAULT_ROOM_AMENITIES],
  },
];

export const DEFAULT_EXPERIENCES: CMSExperienceItem[] = [
  {
    id: "exp-1",
    iconName: "Landmark",
    badge: "LOCATION",
    title: "Pedestrian Center",
    desc: "Located just 100m from the Black Church, perfectly positioned to explore the historic winding streets of Brașov.",
  },
  {
    id: "exp-2",
    iconName: "ShieldCheck",
    badge: "HERITAGE",
    title: "Solid Wood Furniture",
    desc: "Each room is uniquely furnished with artisan-crafted pieces that honor traditional Transylvanian woodworking.",
  },
  {
    id: "exp-3",
    iconName: "Snowflake",
    badge: "COMFORT",
    title: "Air Conditioning",
    desc: "State-of-the-art, silent climate control systems ensure a restful environment regardless of the season.",
  },
  {
    id: "exp-4",
    iconName: "Tv",
    badge: "ENTERTAINMENT",
    title: "Smart TV & WiFi",
    desc: "Stay connected with high-speed internet and premium Smart TVs available in every single room.",
  },
  {
    id: "exp-5",
    iconName: "Flower",
    badge: "COMING AUG 2027",
    title: "Luxury SPA Center",
    desc: "A sanctuary for body and mind. Currently undergoing restoration, our high-end wellness SPA will open in late summer 2027.",
  },
  {
    id: "exp-6",
    iconName: "Car",
    badge: "CONVENIENCE",
    title: "Private Parking",
    desc: "Convenient, secure parking is available on-site for guests arriving by vehicle (reservation mandatory, daily surcharge applies, limited spots).",
  },
];

export const DEFAULT_REVIEWS: CMSReviewItem[] = [
  {
    id: "rev-1",
    name: "Elena Popescu",
    date: "October 2023",
    text: "A truly magical experience. The historic charm of the building paired with modern luxury made our stay unforgettable. The location is absolutely perfect, right next to the Black Church.",
    rating: 5,
  },
  {
    id: "rev-2",
    name: "Marcus Weaver",
    date: "December 2023",
    text: "The attic rooms are stunning! Waking up to the view of Brașov's rooftops through the skylight was a highlight of my trip. Impeccable service and beautiful design.",
    rating: 5,
  },
  {
    id: "rev-3",
    name: "Sophie Laurent",
    date: "January 2024",
    text: "Highly recommend Casa Chitic. The solid wood furniture and the cozy atmosphere are unparalleled. We felt like royalty stepping back in time, yet with every modern comfort.",
    rating: 5,
  },
];

const DEFAULT_TERMS = `Terms & Conditions for Casa Chitic Boutique Hotel

1. Booking and Reservation
- All reservations require a valid credit card or deposit confirmation.
- Check-in time is from 14:00 PM onwards.
- Check-out time is strictly until 11:00 AM.
- Guests must present valid government-issued ID upon check-in.

2. Cancellation Policy
- Cancellations made at least 48 hours prior to check-in will incur no charge.
- Late cancellations or no-shows will be charged for the first night's stay.

3. Property Policies & Heritage Respect
- Casa Chitic is a non-smoking historic property. Smoking inside rooms will incur a cleaning penalty.
- Pets are accommodated strictly upon prior request and written approval.
- Quiet hours are observed between 22:00 PM and 08:00 AM.

4. Liability
- The hotel is not responsible for lost or stolen items unless deposited in the in-room safe or reception vault.`;

const DEFAULT_PRIVACY = `Privacy Policy - Casa Chitic Boutique Hotel

1. Information We Collect
- Contact Information: Name, email address, phone number, physical address.
- Booking Details: Dates of stay, room preferences, payment card details handled securely via PCI-DSS compliant partners.

2. How We Use Your Information
- To process, confirm, and fulfill your hotel stay and reservation.
- To communicate pre-arrival information, special requests, and customer service.
- To comply with local Romanian law regarding guest registration.

3. Data Protection and Third Parties
- We do NOT sell, rent, or trade your personal information to third-party marketers.
- Data is processed securely in compliance with the EU General Data Protection Regulation (GDPR).

4. Your Rights
- You have the right to request access, correction, or deletion of your personal data at any time by emailing us at office@casachitic.ro.`;

// Salt for cryptographic hashing
const STORAGE_KEY = "casachitic_cms_content_v1";
const PASSWORD_KEY = "casachitic_admin_password_v1";
const SALT = "casachitic_secure_salt_2026_v1!";

let defaultHashCache: string | null = null;

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getDefaultPasswordHash(): Promise<string> {
  if (!defaultHashCache) {
    defaultHashCache = await hashPassword("casa£1992");
  }
  return defaultHashCache;
}

function isHexHash(val: string): boolean {
  return typeof val === "string" && val.length === 64 && /^[0-9a-f]{64}$/i.test(val);
}

export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  const inputHash = await hashPassword(inputPassword);
  const storedHash = getAdminPasswordHash();
  const defaultHash = await getDefaultPasswordHash();

  if (!storedHash || storedHash === defaultHash) {
    return inputHash === defaultHash;
  }

  // Check against stored custom SHA-256 hash
  return inputHash === storedHash;
}

export async function resetToDefaultPassword(): Promise<string> {
  const defaultHash = await getDefaultPasswordHash();
  try {
    localStorage.setItem(PASSWORD_KEY, defaultHash);
    const cmsSaved = localStorage.getItem(STORAGE_KEY);
    const parsed = cmsSaved ? JSON.parse(cmsSaved) : {};
    parsed.adminPasswordHash = defaultHash;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new Event("casachitic_cms_updated"));
  } catch (e) {
    console.error("Failed to reset password", e);
  }
  return defaultHash;
}

export function getDefaultCMSContent(): CMSContent {
  return {
    termsAndConditions: DEFAULT_TERMS,
    privacyPolicy: DEFAULT_PRIVACY,
    brand: {
      title: "Casa Chitic",
      subtitle: "Boutique Hotel • Brașov",
      logoUrl: "",
    },
    contactInfo: {
      email: CONTACT_INFO.email,
      phone: CONTACT_INFO.phone,
      phoneFormatted: CONTACT_INFO.phoneFormatted,
      address: CONTACT_INFO.address,
      website: CONTACT_INFO.website,
      facebookUrl: CONTACT_INFO.facebookUrl,
      instagramUrl: CONTACT_INFO.instagramUrl,
      bookingUrl: DEFAULT_BOOKING_URL,
    },
    aboutText: {
      anchor: "HERITAGE & COMFORT",
      title: ABOUT_TEXT.title,
      paragraph1: ABOUT_TEXT.paragraph1,
      paragraph2: ABOUT_TEXT.paragraph2,
      tagline: ABOUT_TEXT.tagline,
      locationBadge: "Brașov Old Town, Romania",
    },
    heroImage: "",
    heroTitle: "Casa Chitic",
    heroSubtitle: "Welcome to Casa Chitic Boutique Hotel",
    heroDescription:
      "A historic sanctuary combining old-world Transylvanian soul with refined luxury in Brașov.",
    heroPrimaryBtnText: "SEE ROOM DETAILS",
    heroSecondaryBtnText: "ABOUT US",
    heroBookBtnText: "BOOK NOW",
    roomsSection: {
      anchor: "THE COLLECTIONS",
      title: "Stay with us",
      subtitle: "Choose from our carefully curated collections of rooms and suites.",
      specsBtnText: "SPECS",
      bookBtnText: "BOOK STAY",
      amenitiesTitle: "Accommodation Amenities",
    },
    rooms: DEFAULT_ROOMS.map((r) => ({
      ...r,
      images: [...r.images],
      amenities: [...r.amenities],
    })),
    experiencesSection: {
      anchor: "Boutique Services",
      title: "Curated Guest Experiences",
      subtitle:
        "Every detail at Casa Chitic is designed to provide you with a seamless and luxurious stay. Discover the tailored amenities that await you.",
    },
    experiences: DEFAULT_EXPERIENCES.map((e) => ({ ...e })),
    reviewsSection: {
      anchor: "GUEST STORIES",
      title: "What Our Guests Say",
      readAllBtnText: "READ ALL REVIEWS",
      readAllUrl: DEFAULT_REVIEWS_URL,
    },
    reviews: DEFAULT_REVIEWS.map((r) => ({ ...r })),
    contactSection: {
      anchor: "LOCATION & RESERVATIONS",
      title: "Contact & Location",
      subtitle:
        "Perfectly centered in old Brașov, ready to accommodate your exceptional Transylvanian journey.",
      formTitle: "Send us a direct message",
      sendBtnText: "SEND MESSAGE",
    },
    footerSection: {
      description:
        "An exclusive boutique haven where authentic Transylvanian hospitality meets preserved historical elegance.",
      connectTitle: "CONNECT WITH US",
      backToTopText: "BACK TO TOP",
    },
    images: {
      heroBg: "",
      aboutHillside: ABOUT_TEXT.imageHillside,
      aboutRooftops: ABOUT_TEXT.imageRooftops,
      storyVideoBg:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
      roomMain:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      gallery: GALLERY_ITEMS,
    },
    adminPasswordHash: "",
  };
}

export function getInitialCMSContent(): CMSContent {
  const defaults = getDefaultCMSContent();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      let passHash = parsed.adminPasswordHash || "";
      if (!isHexHash(passHash)) {
        passHash = "";
      }

      return {
        ...defaults,
        termsAndConditions: parsed.termsAndConditions ?? defaults.termsAndConditions,
        privacyPolicy: parsed.privacyPolicy ?? defaults.privacyPolicy,
        brand: {
          ...defaults.brand,
          ...(parsed.brand || {}),
        },
        contactInfo: {
          ...defaults.contactInfo,
          ...(parsed.contactInfo || {}),
        },
        aboutText: {
          ...defaults.aboutText,
          ...(parsed.aboutText || {}),
        },
        heroImage: parsed.heroImage ?? defaults.heroImage,
        heroTitle: parsed.heroTitle ?? defaults.heroTitle,
        heroSubtitle: parsed.heroSubtitle ?? defaults.heroSubtitle,
        heroDescription: parsed.heroDescription ?? defaults.heroDescription,
        heroPrimaryBtnText: parsed.heroPrimaryBtnText ?? defaults.heroPrimaryBtnText,
        heroSecondaryBtnText: parsed.heroSecondaryBtnText ?? defaults.heroSecondaryBtnText,
        heroBookBtnText: parsed.heroBookBtnText ?? defaults.heroBookBtnText,
        roomsSection: {
          ...defaults.roomsSection,
          ...(parsed.roomsSection || {}),
        },
        rooms:
          Array.isArray(parsed.rooms) && parsed.rooms.length > 0
            ? parsed.rooms.map((r: Partial<CMSRoomItem>, i: number) => ({
                ...(defaults.rooms[i] || defaults.rooms[0]),
                ...r,
                images:
                  Array.isArray(r.images) && r.images.length > 0
                    ? r.images
                    : defaults.rooms[i]?.images || [],
                amenities:
                  Array.isArray(r.amenities) && r.amenities.length > 0
                    ? r.amenities
                    : [...DEFAULT_ROOM_AMENITIES],
              }))
            : defaults.rooms,
        experiencesSection: {
          ...defaults.experiencesSection,
          ...(parsed.experiencesSection || {}),
        },
        experiences:
          Array.isArray(parsed.experiences) && parsed.experiences.length > 0
            ? parsed.experiences
            : defaults.experiences,
        reviewsSection: {
          ...defaults.reviewsSection,
          ...(parsed.reviewsSection || {}),
        },
        reviews:
          Array.isArray(parsed.reviews) && parsed.reviews.length > 0
            ? parsed.reviews
            : defaults.reviews,
        contactSection: {
          ...defaults.contactSection,
          ...(parsed.contactSection || {}),
        },
        footerSection: {
          ...defaults.footerSection,
          ...(parsed.footerSection || {}),
        },
        images: {
          ...defaults.images,
          ...(parsed.images || {}),
          heroBg: parsed.images?.heroBg || parsed.heroImage || defaults.images.heroBg,
          gallery: parsed.images?.gallery || defaults.images.gallery,
        },
        adminPasswordHash: passHash,
      };
    }
  } catch (e) {
    console.error("Failed to load CMS content from storage", e);
  }

  return defaults;
}

export function saveCMSContent(content: CMSContent): boolean {
  try {
    const copy = { ...content };
    if (!isHexHash(copy.adminPasswordHash)) {
      copy.adminPasswordHash = getAdminPasswordHash();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
    window.dispatchEvent(new Event("casachitic_cms_updated"));
    return true;
  } catch (e) {
    console.error("Failed to save CMS content", e);
    return false;
  }
}

export function getAdminPasswordHash(): string {
  try {
    const saved = localStorage.getItem(PASSWORD_KEY);
    if (saved && isHexHash(saved)) return saved;

    const cmsSaved = localStorage.getItem(STORAGE_KEY);
    if (cmsSaved) {
      const parsed = JSON.parse(cmsSaved);
      if (parsed.adminPasswordHash && isHexHash(parsed.adminPasswordHash)) {
        return parsed.adminPasswordHash;
      }
    }
  } catch {
    // fallback
  }
  return "";
}

export async function setAdminPassword(newPassword: string): Promise<string> {
  try {
    const passwordHash = await hashPassword(newPassword);
    localStorage.setItem(PASSWORD_KEY, passwordHash);

    const cmsSaved = localStorage.getItem(STORAGE_KEY);
    const parsed = cmsSaved ? JSON.parse(cmsSaved) : {};
    parsed.adminPasswordHash = passwordHash;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new Event("casachitic_cms_updated"));
    return passwordHash;
  } catch (e) {
    console.error("Failed to update password", e);
    return "";
  }
}

// Auto-run legacy plaintext password cleanup on module load
if (typeof window !== "undefined" && window.localStorage) {
  try {
    const rawPass = localStorage.getItem(PASSWORD_KEY);
    if (rawPass && !isHexHash(rawPass)) {
      hashPassword(rawPass).then((hash) => {
        localStorage.setItem(PASSWORD_KEY, hash);
      });
    }
    const cmsRaw = localStorage.getItem(STORAGE_KEY);
    if (cmsRaw) {
      const parsed = JSON.parse(cmsRaw);
      if (parsed.adminPasswordHash && !isHexHash(parsed.adminPasswordHash)) {
        hashPassword(parsed.adminPasswordHash).then((hash) => {
          parsed.adminPasswordHash = hash;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        });
      }
    }
  } catch {
    // ignore
  }
}
