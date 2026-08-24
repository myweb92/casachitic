/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Facebook, Instagram, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";
import { CONTACT_INFO } from "../data";
import Logo from "./Logo";
import { getInitialCMSContent, CMSContent } from "../lib/cmsStore";

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenAdmin?: () => void;
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

export default function Footer({ lang, setLang, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );
  const [cms, setCms] = useState<CMSContent>(getInitialCMSContent());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setCms(getInitialCMSContent());
    };
    window.addEventListener("casachitic_cms_updated", handleUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleUpdate);
  }, []);

  const handleSecretClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        if (onOpenAdmin) onOpenAdmin();
        return 0;
      }
      return next;
    });
  };

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
      href: `https://wa.me/${CONTACT_INFO.phoneFormatted.replace(/\D/g, '')}`,
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
            {/* Copyright text (Secret trigger: triple click opens Admin Portal) */}
            <div
              className="text-center lg:text-left cursor-pointer select-none"
              onClick={handleSecretClick}
              title="Casa Chitic"
            >
              <p className="font-sans text-[11px] text-hotel-beige/40 tracking-wider">
                &copy; {currentYear} Casa Chitic Boutique Hotel • {cms.contactInfo.address}
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
              {onOpenAdmin && (
                <>
                  <span className="text-hotel-beige/20">•</span>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-hotel-gold transition-colors"
                    title="Admin Portal"
                  >
                    Admin
                  </button>
                </>
              )}
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
                  <div className="whitespace-pre-wrap font-sans text-hotel-charcoal/90 leading-relaxed space-y-4">
                    {cms.termsAndConditions}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap font-sans text-hotel-charcoal/90 leading-relaxed space-y-4">
                    {cms.privacyPolicy}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
