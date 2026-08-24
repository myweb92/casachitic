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

export interface CMSContent {
  termsAndConditions: string;
  privacyPolicy: string;
  contactInfo: {
    email: string;
    phone: string;
    phoneFormatted: string;
    address: string;
    website: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  aboutText: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    tagline: string;
  };
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
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

const STORAGE_KEY = "casachitic_cms_content_v1";
const PASSWORD_KEY = "casachitic_admin_password_v1";
const SALT = "casachitic_secure_salt_2026_v1!";

// Precomputed SHA-256 hashes with SALT
// "casachitic2026!" => "ca28b0f925008cfbf67e9b466edac8e7620bc2a8b98e826aa7519cf6aa670f59"
export const DEFAULT_HASH = "ca28b0f925008cfbf67e9b466edac8e7620bc2a8b98e826aa7519cf6aa670f59";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isHexHash(val: string): boolean {
  return typeof val === "string" && val.length === 64 && /^[0-9a-f]{64}$/i.test(val);
}

export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  const inputHash = await hashPassword(inputPassword);
  const storedHash = getAdminPasswordHash();

  // Allow login with input password if it matches stored hash, OR if it matches any of the valid initial admin passwords
  if (
    inputHash === storedHash ||
    inputPassword === "casachitic2026!" ||
    inputPassword === "casa£1992" ||
    inputHash === DEFAULT_HASH
  ) {
    return true;
  }

  if (!isHexHash(storedHash)) {
    // Legacy support: if stored value was raw plaintext, check if input matches
    if (
      inputPassword === storedHash ||
      inputPassword === "casachitic2026!" ||
      inputPassword === "casa£1992"
    ) {
      // Immediately migrate plaintext stored value to SHA-256 hash!
      await setAdminPassword(inputPassword);
      return true;
    }
  }

  return false;
}

export async function resetToDefaultPassword(): Promise<string> {
  return await setAdminPassword("casachitic2026!");
}

export function getInitialCMSContent(): CMSContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      // Clean up legacy plaintext hash if present in parsed CMS
      let passHash = parsed.adminPasswordHash || DEFAULT_HASH;
      if (!isHexHash(passHash)) {
        // Will be asynchronously converted on verify/set, fallback to default hash for now
        passHash = DEFAULT_HASH;
      }

      return {
        termsAndConditions: parsed.termsAndConditions || DEFAULT_TERMS,
        privacyPolicy: parsed.privacyPolicy || DEFAULT_PRIVACY,
        contactInfo: {
          email: parsed.contactInfo?.email || CONTACT_INFO.email,
          phone: parsed.contactInfo?.phone || CONTACT_INFO.phone,
          phoneFormatted: parsed.contactInfo?.phoneFormatted || CONTACT_INFO.phoneFormatted,
          address: parsed.contactInfo?.address || CONTACT_INFO.address,
          website: parsed.contactInfo?.website || CONTACT_INFO.website,
          facebookUrl: parsed.contactInfo?.facebookUrl || CONTACT_INFO.facebookUrl,
          instagramUrl: parsed.contactInfo?.instagramUrl || CONTACT_INFO.instagramUrl,
        },
        aboutText: {
          title: parsed.aboutText?.title || ABOUT_TEXT.title,
          paragraph1: parsed.aboutText?.paragraph1 || ABOUT_TEXT.paragraph1,
          paragraph2: parsed.aboutText?.paragraph2 || ABOUT_TEXT.paragraph2,
          tagline: parsed.aboutText?.tagline || ABOUT_TEXT.tagline,
        },
        heroImage: parsed.heroImage || "",
        heroTitle: parsed.heroTitle || "Casa Chitic",
        heroSubtitle: parsed.heroSubtitle || "Welcome to Casa Chitic Boutique Hotel",
        heroDescription: parsed.heroDescription || "A historic sanctuary combining old-world Transylvanian soul with refined luxury in Brașov.",
        images: {
          heroBg: parsed.images?.heroBg || parsed.heroImage || "",
          aboutHillside: parsed.images?.aboutHillside || ABOUT_TEXT.imageHillside || "",
          aboutRooftops: parsed.images?.aboutRooftops || ABOUT_TEXT.imageRooftops || "",
          storyVideoBg: parsed.images?.storyVideoBg || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
          roomMain: parsed.images?.roomMain || "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
          gallery: parsed.images?.gallery || GALLERY_ITEMS,
        },
        adminPasswordHash: passHash,
      };
    }
  } catch (e) {
    console.error("Failed to load CMS content from storage", e);
  }

  return {
    termsAndConditions: DEFAULT_TERMS,
    privacyPolicy: DEFAULT_PRIVACY,
    contactInfo: {
      email: CONTACT_INFO.email,
      phone: CONTACT_INFO.phone,
      phoneFormatted: CONTACT_INFO.phoneFormatted,
      address: CONTACT_INFO.address,
      website: CONTACT_INFO.website,
      facebookUrl: CONTACT_INFO.facebookUrl,
      instagramUrl: CONTACT_INFO.instagramUrl,
    },
    aboutText: {
      title: ABOUT_TEXT.title,
      paragraph1: ABOUT_TEXT.paragraph1,
      paragraph2: ABOUT_TEXT.paragraph2,
      tagline: ABOUT_TEXT.tagline,
    },
    heroImage: "",
    heroTitle: "Casa Chitic",
    heroSubtitle: "Welcome to Casa Chitic Boutique Hotel",
    heroDescription: "A historic sanctuary combining old-world Transylvanian soul with refined luxury in Brașov.",
    images: {
      heroBg: "",
      aboutHillside: ABOUT_TEXT.imageHillside,
      aboutRooftops: ABOUT_TEXT.imageRooftops,
      storyVideoBg: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
      roomMain: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      gallery: GALLERY_ITEMS,
    },
    adminPasswordHash: DEFAULT_HASH,
  };
}

export function saveCMSContent(content: CMSContent) {
  try {
    // Ensure adminPasswordHash stored in CMS JSON is never plaintext
    const copy = { ...content };
    if (!isHexHash(copy.adminPasswordHash)) {
      copy.adminPasswordHash = getAdminPasswordHash();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
    window.dispatchEvent(new Event("casachitic_cms_updated"));
  } catch (e) {
    console.error("Failed to save CMS content", e);
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
  } catch (e) {
    // fallback
  }
  return DEFAULT_HASH;
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
    return DEFAULT_HASH;
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
  } catch (e) {
    // ignore
  }
}
