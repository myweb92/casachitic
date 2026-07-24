/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Facebook, Instagram, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";
import { CONTACT_INFO } from "../data";
import Logo from "./Logo";

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export default function Footer({ lang, setLang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = [
    {
      icon: <Facebook className="h-4 w-4" />,
      href: CONTACT_INFO.facebookUrl,
      label: "Facebook",
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: CONTACT_INFO.instagramUrl,
      label: "Instagram",
    },
    {
      icon: <WhatsAppIcon className="h-4 w-4" />,
      href: "https://wa.me/40731002138",
      label: "WhatsApp",
    },
  ];

  return (
    <>
      <footer
        className="bg-hotel-charcoal text-hotel-beige border-t border-hotel-gold/10 py-16"
        id-attr="footer-container"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-12 border-b border-hotel-stone">
            {/* Brand Column */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <Logo
                  textColorClass="text-hotel-beige"
                  iconColorClass="text-hotel-gold"
                />
              </div>
              <p className="font-sans text-xs text-hotel-beige/50 tracking-wider mt-4 max-w-sm leading-relaxed">
                {
                  "An exclusive boutique haven where authentic Transylvanian hospitality meets preserved historical elegance."
                }
              </p>
            </div>

            {/* Social Icons Column */}
            <div className="flex flex-col items-center gap-3">
              <span className="font-sans text-[10px] tracking-[0.25em] text-hotel-gold uppercase font-bold">
                {"CONNECT WITH US"}
              </span>
              <div className="flex gap-3">
                {socialIcons.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={soc.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-hotel-beige/10 bg-hotel-charcoal-light text-hotel-beige/70 transition-all hover:bg-hotel-gold hover:text-hotel-charcoal hover:border-hotel-gold hover:scale-105 shadow-md"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Action Column: Back to top */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <button
                onClick={handleScrollTop}
                className="flex items-center gap-2 rounded-sm border border-hotel-gold/25 bg-hotel-charcoal-light/50 px-4 py-2 text-xs text-hotel-beige hover:bg-hotel-gold hover:text-hotel-charcoal transition-all shadow-md group uppercase font-semibold tracking-wider"
                id-attr="back-to-top-btn"
              >
                <span>{"BACK TO TOP"}</span>
                <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Footer Base bottom bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-12">
            {/* Copyright text */}
            <div className="text-center lg:text-left">
              <p className="font-sans text-[11px] text-hotel-beige/40 tracking-wider">
                &copy; {currentYear} Casa Chitic Boutique Hotel • Strada Johann
                Gött 7, Brașov, Romania.
              </p>
              <p className="font-sans text-[9px] text-hotel-beige/30 tracking-widest uppercase mt-1">
                {"System developed by Niran Sudharaka"}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-hotel-beige/50 font-sans tracking-widest uppercase mt-2 lg:mt-0">
              <button
                onClick={() => setActiveModal("terms")}
                className="hover:text-hotel-gold transition-colors"
              >
                Terms & Conditions
              </button>
              <span className="text-hotel-beige/20">•</span>
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-hotel-gold transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-hotel-beige/20">•</span>
              <a
                href="https://anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hotel-gold transition-colors"
              >
                ANPC
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm"
          >
            <div
              className="absolute inset-0"
              onClick={() => setActiveModal(null)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-hotel-beige text-hotel-charcoal rounded-sm overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-hotel-charcoal p-6 flex justify-between items-center shrink-0">
                <h2 className="text-hotel-beige font-serif text-2xl">
                  {activeModal === "terms"
                    ? "Terms & Conditions"
                    : "Privacy Policy"}
                </h2>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-hotel-beige/50 hover:text-hotel-beige transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto font-sans text-sm leading-relaxed space-y-6">
                {activeModal === "terms" ? (
                  <>
                    <p className="font-bold">Last updated: 5 November 2025</p>
                    <p>
                      These Terms and Conditions (“Terms”) govern the use of
                      https://casachiticbalcescu.ro/ (the “Website”) and the
                      services provided by CCB HOTELS SRL at Casa Chitic
                      Bălcescu (boutique hotel & restaurant, Str. Nicolae
                      Bălcescu 13, Brașov). Accessing the Website, making a
                      reservation or using our services constitutes full and
                      unconditional acceptance of these Terms.
                    </p>
                    <p>
                      <strong>Operator:</strong> CCB HOTELS SRL, Address: Comuna
                      Cristian, Sat Cristian, DN 73, Brașov County, VAT
                      RO39174576, Trade Registry: J2018000815087 (new format),
                      e-mail:{" "}
                      <a
                        href="mailto:office@casachiticbalcescu.ro"
                        className="text-hotel-gold hover:underline"
                      >
                        office@casachiticbalcescu.ro
                      </a>
                      , phone: +40 731 002 138.
                    </p>
                    <div>
                      <h3 className="font-serif text-lg mb-2 font-bold">
                        Definitions
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Operator/We</strong> – CCB HOTELS SRL.
                        </li>
                        <li>
                          <strong>Client/Guest</strong> – any natural/legal
                          person using the Website, making reservations or
                          benefiting from services (accommodation, restaurant,
                          events).
                        </li>
                        <li>
                          <strong>Services</strong> – accommodation, F&B
                          (restaurant/bar), events and related services (Wi-Fi,
                          luggage storage etc.).
                        </li>
                        <li>
                          <strong>Reservation</strong> – firm intention to
                          purchase Services for specified dates/conditions.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg mb-2 font-bold">
                        Scope
                      </h3>
                      <p>
                        These Terms apply to legal relationships regarding:
                        Website use; reservations (Website, phone/e-mail, front
                        desk, OTAs); accommodation/restaurant services; events.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="font-serif text-lg mb-2 font-bold">
                        SMS and Text Messaging Policy
                      </h3>
                      <p>
                        We use a guest messaging platform to communicate with
                        you regarding your stay. By providing your phone number
                        during the booking process, you consent to receive text
                        messages from the property.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>
                          <strong>Purpose:</strong> Text messaging may be used
                          to send check-in instructions, access information,
                          room readiness updates, and to respond to your
                          requests during your stay.
                        </li>
                        <li>
                          <strong>Opt-Out:</strong> You may opt out of receiving
                          text messages at any time by replying STOP to any
                          message you receive.
                        </li>
                        <li>
                          <strong>Privacy of Mobile Data:</strong> No mobile
                          information will be shared with third parties or
                          affiliates for marketing or promotional purposes. Text
                          messaging opt-in data and consent will not be shared
                          with any third parties.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg mb-2 font-bold">
                        Data protection
                      </h3>
                      <p>
                        Processing takes place under the Privacy Policy. Data
                        subject rights (access, rectification, erasure,
                        restriction, portability, objection) may be exercised at
                        office@casachiticbalcescu.ro.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg mb-2 font-bold">
                        CCTV
                      </h3>
                      <p>
                        Common areas may be monitored for security (legitimate
                        interest). Areas are signposted; retention/access limits
                        follow the Privacy Policy.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
