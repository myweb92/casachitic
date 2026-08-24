/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Language } from '../types';
import { ABOUT_TEXT } from '../data';
import { getInitialCMSContent } from '../lib/cmsStore';

interface AboutUsProps {
  lang: Language;
}

export default function AboutUs({ lang }: AboutUsProps) {
  const [cms, setCms] = useState(getInitialCMSContent());

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getInitialCMSContent());
    };
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const hillsideImg = cms.images?.aboutHillside || ABOUT_TEXT.imageHillside;
  const rooftopsImg = cms.images?.aboutRooftops || ABOUT_TEXT.imageRooftops;
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-hotel-beige overflow-hidden" id-attr="about-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Rich Layered Asymmetric Editorial Imagery */}
          <div className="lg:col-span-6 relative" id-attr="about-images">
            {/* Background design elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-hotel-sand/35 blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-hotel-gold/15 blur-3xl z-0" />
            
            {/* Primary Hillside Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative z-10 aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border border-white/50"
            >
              <img
                src={hillsideImg}
                alt="Brașov green hillside view"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal/20 to-transparent" />
            </motion.div>

            {/* Overlapping Secondary Rooftops Image */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 md:right-10 lg:-right-10 z-20 w-1/2 md:w-2/5 lg:w-1/2 aspect-square overflow-hidden rounded-sm shadow-2xl border-4 border-hotel-beige"
            >
              <img
                src={rooftopsImg}
                alt="Misty Transylvanian forest rooftops"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Location highlight badge overlay */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-sm bg-hotel-charcoal-light/90 backdrop-blur-md px-4 py-2 text-xs text-hotel-beige shadow-xl border border-hotel-gold/25">
              <MapPin className="h-4 w-4 text-hotel-gold" />
              <span className="font-sans font-medium tracking-wide">Brașov Old Town, Romania</span>
            </div>
          </div>

          {/* Right Side: Luxurious Multilingual Copy */}
          <div className="lg:col-span-6" id-attr="about-text-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              {/* Little Section Anchor */}
              <span className="block font-sans text-xs font-semibold tracking-[0.25em] text-hotel-gold uppercase mb-3">
                {'HERITAGE & COMFORT'}
              </span>

              {/* Serif Title */}
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-hotel-charcoal leading-tight tracking-wide mb-6">
                {ABOUT_TEXT.title}
              </h2>

              {/* Golden divider */}
              <div className="w-16 h-[2px] bg-hotel-gold mb-8" />

              {/* Rich Descriptions */}
              <p className="font-sans text-sm md:text-base font-light text-hotel-stone leading-relaxed mb-6">
                {ABOUT_TEXT.paragraph1}
              </p>
              <p className="font-sans text-sm font-light text-hotel-stone leading-relaxed mb-8">
                {ABOUT_TEXT.paragraph2}
              </p>

              {/* Elegant Tagline */}
              <div className="relative border-l-2 border-hotel-terracotta pl-4 py-1 mb-10">
                <p className="font-serif italic text-base md:text-lg text-hotel-terracotta-dark leading-relaxed">
                  {ABOUT_TEXT.tagline}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
