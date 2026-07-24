/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColorClass?: string;
  iconColorClass?: string;
}

export default function Logo({
  className = '',
  iconOnly = false,
  textColorClass = 'text-hotel-beige',
  iconColorClass = 'text-hotel-gold'
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`} id-attr="logo-component">
      {/* High-fidelity custom inline SVG line-art of the Casa Chitic historic building */}
      <svg
        viewBox="0 0 120 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-11 w-11 shrink-0 ${iconColorClass}`}
      >
        {/* Sky Ornament / Circular window on the gable */}
        <circle cx="60" cy="18" r="3" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="15" strokeWidth="1" />

        {/* The Stepped Gable (Corbie Steps) Facade */}
        {/* Peak */}
        <path d="M 60 12 L 60 21" strokeWidth="1" />
        
        {/* Left stepped roof line */}
        <path d="M 60 21 L 55 21 L 55 26 L 50 26 L 50 31 L 45 31 L 45 36 L 40 36" />
        
        {/* Right stepped roof line */}
        <path d="M 60 21 L 65 21 L 65 26 L 70 26 L 70 31 L 75 31 L 75 36 L 80 36" />

        {/* Attic Windows (two small rectangles in the gable) */}
        <rect x="52" y="29" width="6" height="10" strokeWidth="1" />
        <rect x="62" y="29" width="6" height="10" strokeWidth="1" />

        {/* Roof line details & horizontal boundaries */}
        <path d="M 40 36 L 80 36" />
        <path d="M 36 41 L 84 41" strokeWidth="1.5" />
        
        {/* Left wing / Annex building with sloped roof */}
        <path d="M 36 41 L 15 50 L 15 88" />
        <path d="M 15 50 L 5 54 L 5 88" />
        {/* Sloped lines on the left annex roof */}
        <line x1="30" y1="44" x2="15" y2="50" />
        <line x1="25" y1="46" x2="15" y2="50" />
        
        {/* Windows on the left annex */}
        <line x1="10" y1="60" x2="10" y2="72" strokeWidth="1.5" />
        <line x1="22" y1="58" x2="22" y2="68" strokeWidth="1.5" />

        {/* Main building lower structure */}
        <rect x="36" y="41" width="48" height="47" strokeWidth="1.5" />
        
        {/* First floor windows (three refined rectangular frames with inner cross) */}
        <rect x="42" y="47" width="8" height="12" />
        <line x1="46" y1="47" x2="46" y2="59" strokeWidth="0.8" />
        
        <rect x="56" y="47" width="8" height="12" />
        <line x1="60" y1="47" x2="60" y2="59" strokeWidth="0.8" />
        
        <rect x="70" y="47" width="8" height="12" />
        <line x1="74" y1="47" x2="74" y2="59" strokeWidth="0.8" />

        {/* Mid-level ledge */}
        <path d="M 36 64 L 84 64" strokeWidth="1.2" />

        {/* Ground floor windows & arched entrance */}
        {/* Elegant arched entrance door on the right */}
        <path d="M 68 88 L 68 72 C 68 68, 78 68, 78 72 L 78 88" />
        <line x1="73" y1="69" x2="73" y2="88" strokeWidth="0.8" />

        {/* Left ground floor windows */}
        <rect x="42" y="70" width="8" height="12" />
        <line x1="46" y1="70" x2="46" y2="82" strokeWidth="0.8" />

        <rect x="54" y="70" width="8" height="12" />
        <line x1="58" y1="70" x2="58" y2="82" strokeWidth="0.8" />

        {/* Ground Floor horizontal shading lines (mimicking wooden/brick texture in user screenshot) */}
        <line x1="36" y1="68" x2="40" y2="68" strokeWidth="0.8" />
        <line x1="36" y1="72" x2="40" y2="72" strokeWidth="0.8" />
        <line x1="36" y1="76" x2="40" y2="76" strokeWidth="0.8" />
        <line x1="36" y1="80" x2="40" y2="80" strokeWidth="0.8" />
        <line x1="36" y1="84" x2="40" y2="84" strokeWidth="0.8" />

        {/* Ground Line / Pedestrian Cobblestones baseline */}
        <path d="M 2 88 L 118 88" strokeWidth="1.5" />
        <path d="M 10 92 L 110 92" strokeWidth="0.8" strokeDasharray="3 3" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col text-left">
          {/* Elegant script-style cursive font pair */}
          <span className={`font-serif text-2xl font-light tracking-wide leading-tight ${textColorClass}`}>
            Casa Chitic
          </span>
          <span className="font-sans text-[9px] font-bold tracking-[0.3em] text-hotel-gold uppercase">
            Boutique Hotel • Brașov
          </span>
        </div>
      )}
    </div>
  );
}
