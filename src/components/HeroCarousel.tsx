/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowDown,
  PhoneCall,
  Facebook,
  Instagram,
} from "lucide-react";
import { Language } from "../types";
import { HERO_SLIDES, CONTACT_INFO } from "../data";
import { getInitialCMSContent } from "../lib/cmsStore";
import Logo from "./Logo";

interface HeroCarouselProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onSeeDetails: () => void;
}

export default function HeroCarousel({
  lang,
  setLang,
  onSeeDetails,
}: HeroCarouselProps) {
  const [cms, setCms] = useState(getInitialCMSContent());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getInitialCMSContent());
    };
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const heroBgImage = cms.images?.heroBg || HERO_SLIDES[currentSlide].image;
  const heroTitleText = cms.heroTitle || HERO_SLIDES[currentSlide].title;
  const heroSubtitleText = cms.heroSubtitle || HERO_SLIDES[currentSlide].subtitle;
  const heroDescText = cms.heroDescription || HERO_SLIDES[currentSlide].description;

  // Handle scroll trigger for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const menuItems = [
    { label: "HOME", sectionId: "home" },
    { label: "WELCOME", sectionId: "about" },
    { label: "ROOMS", sectionId: "rooms" },
    { label: "EXPERIENCES", sectionId: "experiences" },
    { label: "REVIEWS", sectionId: "reviews" },
    { label: "CONTACT", sectionId: "contact" },
  ];

  return (
    <div
      id="home"
      className="relative h-screen w-full overflow-hidden bg-hotel-charcoal"
      id-attr="hero-container"
    >
      {/* Navigation */}
      <nav
        id-attr="nav-bar"
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-hotel-charcoal-light/95 backdrop-blur-md py-4 shadow-xl border-b border-hotel-gold/10"
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[95%] xl:max-w-7xl items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 text-left group shrink-0"
            id-attr="logo-button"
          >
            <Logo
              textColorClass="text-hotel-beige"
              iconColorClass="text-hotel-gold"
            />
          </button>

          {/* Desktop Navigation Menu */}
          <div
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            id-attr="desktop-menu"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.sectionId)}
                className="font-sans text-[10px] xl:text-[11px] font-bold tracking-[0.15em] text-hotel-beige/80 transition-colors hover:text-hotel-gold uppercase focus:outline-none relative py-1 group shrink-0"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-hotel-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <div className="flex items-center gap-3 xl:gap-4 ml-2 border-l border-hotel-beige/20 pl-4 xl:pl-6 shrink-0">
              <a
                href={`tel:${CONTACT_INFO.phoneFormatted.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 text-hotel-beige hover:text-hotel-gold transition-colors font-sans text-sm xl:text-base font-bold tracking-wider"
                aria-label="Phone"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{CONTACT_INFO.phoneFormatted}</span>
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.phoneFormatted.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-hotel-beige hover:text-hotel-gold transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="text-hotel-beige hover:text-hotel-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-hotel-beige hover:text-hotel-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center justify-center bg-hotel-gold text-hotel-charcoal px-4 py-2 text-xs font-semibold tracking-wider rounded-sm hover:bg-white transition-colors"
              >
                BOOK NOW
              </a>
            </div>
          </div>

          {/* Mobile Nav Elements & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <a
              href={`tel:${CONTACT_INFO.phoneFormatted.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-hotel-beige hover:text-hotel-gold transition-colors font-sans text-xs sm:text-sm font-normal whitespace-nowrap"
              aria-label="Phone"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-sm p-1.5 text-hotel-beige hover:text-hotel-gold focus:outline-none"
              aria-label="Toggle menu"
              id-attr="mobile-menu-trigger"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-hotel-charcoal-light border-b border-hotel-gold/15 p-6 shadow-2xl lg:hidden"
            id-attr="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full text-left font-serif text-lg tracking-wide text-hotel-beige py-2 border-b border-hotel-beige/5 hover:text-hotel-gold transition-colors uppercase"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Carousel Background */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        id-attr="carousel-slides-wrapper"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroBgImage})`,
            }}
          >
            {/* Subtle Overlay gradients to enhance text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal via-black/40 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Overlay */}
      <div
        className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center"
        id-attr="hero-content"
      >
        <div className="max-w-4xl">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-sans text-xs md:text-sm font-medium tracking-[0.3em] text-hotel-gold uppercase mb-4"
          >
            {heroSubtitleText}
          </motion.p>

          {/* Large Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-serif text-5xl md:text-8xl font-normal tracking-wide text-hotel-beige mb-6 uppercase"
          >
            {heroTitleText}
          </motion.h1>

          {/* Slide Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto max-w-xl font-sans text-sm md:text-base font-light text-hotel-beige/80 leading-relaxed tracking-wide mb-10"
          >
            {heroDescText}
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onSeeDetails}
              className="group relative overflow-hidden rounded-sm bg-hotel-terracotta px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-hotel-beige transition-all hover:bg-hotel-terracotta-dark shadow-lg shadow-hotel-terracotta/20"
              id-attr="see-details-hero-btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {"SEE ROOM DETAILS"}
              </span>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="group rounded-sm border border-hotel-beige/30 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-hotel-beige transition-all hover:border-hotel-gold/50"
              id-attr="about-us-hero-btn"
            >
              {"ABOUT US"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-3 text-hotel-beige/60 text-[10px] tracking-[0.25em] rotate-0"
        id-attr="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5 text-hotel-gold" />
        </motion.div>
        <span className="uppercase">{"Scroll down"}</span>
      </div>
    </div>
  );
}
