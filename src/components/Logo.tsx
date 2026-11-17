/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import logoImg from "../../assets/logo.jpeg";
import { getInitialCMSContent, saveCMSContent } from "../lib/cmsStore";
import { EditableText } from "./EditableText";
import { ImageEditModal } from "./EditableImage";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColorClass?: string;
  iconColorClass?: string;
  isLiveEditMode?: boolean;
}

export default function Logo({
  className = "",
  iconOnly = false,
  textColorClass = "text-hotel-beige",
  iconColorClass = "text-hotel-gold",
  isLiveEditMode = false,
}: LogoProps) {
  const [cms, setCms] = useState(getInitialCMSContent());
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleCmsUpdate = () => setCms(getInitialCMSContent());
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const brand = cms.brand || {
    title: "Casa Chitic",
    subtitle: "Boutique Hotel • Brașov",
    logoUrl: "",
  };
  const resolvedLogo = brand.logoUrl || logoImg;

  const handleSaveLogoUrl = (newUrl: string) => {
    const copy = { ...cms, brand: { ...brand, logoUrl: newUrl } };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleSaveTitle = (newTitle: string) => {
    const copy = { ...cms, brand: { ...brand, title: newTitle } };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleSaveSubtitle = (newSubtitle: string) => {
    const copy = { ...cms, brand: { ...brand, subtitle: newSubtitle } };
    setCms(copy);
    saveCMSContent(copy);
  };

  return (
    <div
      className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}
      id-attr="logo-component"
    >
      <div className="relative shrink-0 group">
        <img
          src={resolvedLogo}
          alt={brand.title || "Casa Chitic Logo"}
          className="h-9 sm:h-11 w-auto shrink-0 rounded-sm"
          referrerPolicy="no-referrer"
        />
        {isLiveEditMode && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLogoModalOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                setLogoModalOpen(true);
              }
            }}
            className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-hotel-gold text-hotel-charcoal shadow-md hover:scale-110 transition-transform cursor-pointer"
            title="Edit Logo Image"
          >
            <Camera className="h-3 w-3" />
          </span>
        )}
      </div>

      {!iconOnly && (
        <div className="flex flex-col text-left">
          <EditableText
            value={brand.title}
            onSave={handleSaveTitle}
            isLiveEditMode={isLiveEditMode}
            useModal
            modalLabel="Edit Brand Name"
            as="span"
            className={`font-serif text-lg sm:text-2xl font-light tracking-wide leading-tight ${textColorClass}`}
          />
          <EditableText
            value={brand.subtitle}
            onSave={handleSaveSubtitle}
            isLiveEditMode={isLiveEditMode}
            useModal
            modalLabel="Edit Brand Subtitle"
            as="span"
            className={`font-sans text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.3em] ${iconColorClass} uppercase whitespace-nowrap`}
          />
        </div>
      )}

      <ImageEditModal
        isOpen={logoModalOpen}
        onClose={() => setLogoModalOpen(false)}
        title="Change Brand Logo Image"
        currentSrc={resolvedLogo}
        onSaveSingle={handleSaveLogoUrl}
      />
    </div>
  );
}
