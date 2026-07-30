/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import logoImg from "../../assets/logo.jpeg";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColorClass?: string;
  iconColorClass?: string;
}

export default function Logo({
  className = "",
  iconOnly = false,
  textColorClass = "text-hotel-beige",
  iconColorClass = "text-hotel-gold",
}: LogoProps) {
  return (
    <div
      className={`flex items-center gap-3.5 ${className}`}
      id-attr="logo-component"
    >
      <img
        src={logoImg}
        alt="Casa Chitic Logo"
        className="h-11 w-auto shrink-0"
      />
      {!iconOnly && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif text-2xl font-light tracking-wide leading-tight ${textColorClass}`}
          >
            Casa Chitic
          </span>
          <span
            className={`font-sans text-[9px] font-bold tracking-[0.3em] ${iconColorClass} uppercase`}
          >
            Boutique Hotel • Brașov
          </span>
        </div>
      )}
    </div>
  );
}
