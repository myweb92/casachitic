/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Language } from "./types";
import HeroCarousel from "./components/HeroCarousel";
import AboutUs from "./components/AboutUs";
import RoomTypes from "./components/RoomTypes";
import Experiences from "./components/Experiences";
import Reviews from "./components/Reviews";
import ContactLocation from "./components/ContactLocation";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [lang, setLang] = useState<Language>("en"); // Default to English by request, or can toggle easily!
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === "/admin" || path.endsWith("/admin") || hash === "#admin") {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();

    window.addEventListener("popstate", checkAdminRoute);
    return () => window.removeEventListener("popstate", checkAdminRoute);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    if (window.location.pathname.toLowerCase() !== "/admin") {
      window.history.pushState(null, "", "/admin");
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname.toLowerCase() === "/admin") {
      window.history.pushState(null, "", "/");
    }
  };

  const handleHeroSeeDetails = () => {
    // Scroll to rooms section
    const element = document.getElementById("rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Auto trigger Room details modal
    setSelectedRoomId("series");
  };

  return (
    <div
      className="min-h-screen bg-hotel-beige text-hotel-charcoal selection:bg-hotel-gold selection:text-hotel-charcoal antialiased"
      id-attr="app-root"
    >
      {/* 1. Full-screen Hero Slider with Navigation and Language Settings */}
      <HeroCarousel
        lang={lang}
        setLang={setLang}
        onSeeDetails={handleHeroSeeDetails}
      />

      {/* 2. Historic About Us section with asymmetric layered imagery */}
      <AboutUs lang={lang} />

      {/* 5. Room Grid with custom specs, L'Occitane amenities & reservation panel */}
      <RoomTypes />

      {/* 6. Experiences Section */}
      <Experiences />

      {/* 6.5 Reviews Section */}
      <Reviews />

      {/* 8. Contact details cards, message inbox form & customized Google Maps */}
      <ContactLocation lang={lang} />

      {/* 9. Minimal heritage dark footer with social loops and logo */}
      <Footer lang={lang} setLang={setLang} onOpenAdmin={handleOpenAdmin} />

      {/* 10. Password Protected Admin Portal */}
      <AdminPanel isOpen={isAdminOpen} onClose={handleCloseAdmin} />
    </div>
  );
}
