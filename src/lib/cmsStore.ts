/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ABOUT_TEXT, CONTACT_INFO, GALLERY_ITEMS } from "../data";

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

export function getInitialCMSContent(): CMSContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
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
        adminPasswordHash: parsed.adminPasswordHash || "admin123",
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
    adminPasswordHash: "admin123",
  };
}

export function saveCMSContent(content: CMSContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("casachitic_cms_updated"));
  } catch (e) {
    console.error("Failed to save CMS content", e);
  }
}

export function getAdminPassword(): string {
  try {
    const saved = localStorage.getItem(PASSWORD_KEY);
    if (saved) return saved;
  } catch (e) {
    // fallback
  }
  return "admin123"; // Default password
}

export function setAdminPassword(newPassword: string) {
  try {
    localStorage.setItem(PASSWORD_KEY, newPassword);
  } catch (e) {
    console.error("Failed to update password", e);
  }
}
