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
import { LiveAdminToolbar } from "./components/LiveAdminToolbar";

export default function App() {
  const [lang, setLang] = useState<Language>("en"); // Default to English
  const [, setSelectedRoomId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      typeof window !== "undefined" &&
      sessionStorage.getItem("casachitic_admin_auth") === "true"
    );
  });

  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(() => {
    return (
      typeof window !== "undefined" &&
      sessionStorage.getItem("casachitic_live_edit") === "true"
    );
  });

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem("casachitic_admin_auth", "true");
    } else {
      sessionStorage.removeItem("casachitic_admin_auth");
      sessionStorage.removeItem("casachitic_live_edit");
      setIsLiveEditMode(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLiveEditMode) {
      sessionStorage.setItem("casachitic_live_edit", "true");
    } else {
      sessionStorage.removeItem("casachitic_live_edit");
    }
  }, [isLiveEditMode]);

  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path === "/admin" ||
        path.endsWith("/admin") ||
        path === "/padmin" ||
        path.endsWith("/padmin") ||
        hash === "#admin" ||
        hash === "#padmin"
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();

    window.addEventListener("popstate", checkAdminRoute);
    return () => window.removeEventListener("popstate", checkAdminRoute);
  }, []);

  // Shortcut key listener (Ctrl + Shift + L or Cmd + Shift + L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    const path = window.location.pathname.toLowerCase();
    if (path !== "/admin" && path !== "/padmin") {
      window.history.pushState(null, "", "/padmin");
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    const path = window.location.pathname.toLowerCase();
    if (path === "/admin" || path === "/padmin") {
      window.history.pushState(null, "", "/");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    setIsLiveEditMode(false);
    setIsAdminOpen(false);
  };

  const handleHeroSeeDetails = () => {
    const element = document.getElementById("rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSelectedRoomId("series");
  };

  return (
    <div
      className={`min-h-screen bg-hotel-beige text-hotel-charcoal selection:bg-hotel-gold selection:text-hotel-charcoal antialiased ${
        isAuthenticated ? "pt-11" : ""
      }`}
      id-attr="app-root"
    >
      {/* Top Floating Admin Live Edit Toolbar */}
      {isAuthenticated && (
        <LiveAdminToolbar
          isLiveEditMode={isLiveEditMode}
          onToggleLiveEdit={() => setIsLiveEditMode((prev) => !prev)}
          onOpenAdminPanel={handleOpenAdmin}
          onLogout={handleLogoutAdmin}
        />
      )}

      {/* 1. Full-screen Hero Slider with Navigation and Language Settings */}
      <HeroCarousel
        lang={lang}
        setLang={setLang}
        onSeeDetails={handleHeroSeeDetails}
        isLiveEditMode={isLiveEditMode}
        isAdminAuthenticated={isAuthenticated}
      />

      {/* 2. Historic About Us section with asymmetric layered imagery */}
      <AboutUs lang={lang} isLiveEditMode={isLiveEditMode} />

      {/* 3. Room Grid with specs & inline image/text editing */}
      <RoomTypes isLiveEditMode={isLiveEditMode} />

      {/* 4. Experiences Section */}
      <Experiences isLiveEditMode={isLiveEditMode} />

      {/* 5. Reviews Section */}
      <Reviews isLiveEditMode={isLiveEditMode} />

      {/* 6. Contact details cards & direct message form */}
      <ContactLocation lang={lang} isLiveEditMode={isLiveEditMode} />

      {/* 7. Minimal heritage dark footer */}
      <Footer
        lang={lang}
        setLang={setLang}
        onOpenAdmin={handleOpenAdmin}
        isLiveEditMode={isLiveEditMode}
      />

      {/* 8. Password Protected Admin Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        isLiveEditMode={isLiveEditMode}
        setIsLiveEditMode={setIsLiveEditMode}
      />
    </div>
  );
}
