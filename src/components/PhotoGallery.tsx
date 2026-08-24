/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight, X, Image, Info } from 'lucide-react';
import { Language } from '../types';
import { GALLERY_ITEMS } from '../data';
import { getInitialCMSContent } from '../lib/cmsStore';

interface PhotoGalleryProps {
  lang: Language;
}

export default function PhotoGallery({ lang }: PhotoGalleryProps) {
  const [cms, setCms] = useState(getInitialCMSContent());
  const [activeTab, setActiveTab] = useState<'all' | 'hotel' | 'city'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getInitialCMSContent());
    };
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const galleryList = cms.images?.gallery || GALLERY_ITEMS;

  // Filter items based on active category tab
  const filteredItems = galleryList.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const openLightbox = (url: string) => {
    // Find index of this item in the currently FILTERED list
    const index = filteredItems.findIndex(item => item.url === url);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
      );
    }
  };

  const tabs = [
    { id: 'all', label: 'ALL PHOTOS' },
    { id: 'hotel', label: 'HOTEL INTERIORS' },
    { id: 'city', label: 'BRAȘOV VIEWS' }
  ];

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-hotel-beige" id-attr="gallery-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="block font-sans text-xs font-semibold tracking-[0.25em] text-hotel-gold uppercase mb-3">
            {'GALLERY & ATMOSPHERE'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-hotel-charcoal leading-tight tracking-wide mb-4">
            {'Photo Gallery'}
          </h2>
          <div className="w-12 h-[2px] bg-hotel-gold mx-auto mb-6" />
          <p className="font-sans text-xs md:text-sm font-light text-hotel-stone/80 tracking-wide leading-relaxed">
            {'Browse snapshots of our elegant rooms, heritage woodwork details, and the majestic cobblestone architecture of old Brașov.'}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center flex-wrap gap-3 mb-16" id-attr="gallery-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-sm px-6 py-2.5 text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase ${
                activeTab === tab.id
                  ? 'bg-hotel-charcoal text-hotel-beige shadow-lg border border-hotel-charcoal'
                  : 'border border-hotel-sand hover:border-hotel-gold text-hotel-stone hover:text-hotel-charcoal bg-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid mimicking elegant boutique masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id-attr="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Create asymmetric height visual feel based on index
              const isTall = idx % 3 === 0 || idx % 7 === 0;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onClick={() => openLightbox(item.url)}
                  className={`group relative overflow-hidden bg-hotel-charcoal rounded-sm shadow-md border border-hotel-sand/20 cursor-pointer ${
                    isTall ? 'row-span-2 aspect-[4/5] md:aspect-auto md:h-[420px]' : 'aspect-square md:h-[200px]'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover visual overlay descriptor */}
                  <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal via-hotel-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 text-left z-10" />
                  
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="self-end rounded-full bg-hotel-beige/90 p-2 shadow-lg">
                      <Maximize2 className="h-3.5 w-3.5 text-hotel-charcoal" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] tracking-widest text-hotel-gold uppercase font-bold block mb-1">
                        {item.category === 'hotel' ? ('HOTEL DETAIL') : ('CITY SCENE')}
                      </span>
                      <p className="font-serif text-sm text-hotel-beige leading-snug">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Full Screen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 md:p-8 backdrop-blur-md"
            id-attr="gallery-lightbox"
          >
            {/* Dark background click handler */}
            <div className="absolute inset-0 z-0" onClick={() => setLightboxIndex(null)} />

            {/* Lightbox Header Bar */}
            <div className="relative z-10 flex justify-between items-center text-hotel-beige">
              <div className="flex items-center gap-2.5">
                <Image className="h-4 w-4 text-hotel-gold" />
                <span className="font-sans text-xs tracking-wider">
                  {'PHOTO'} {lightboxIndex + 1} {'OF'} {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="rounded-full bg-white/10 p-2.5 text-hotel-beige hover:bg-hotel-gold hover:text-hotel-charcoal transition-all"
                aria-label="Close Lightbox"
                id-attr="close-lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="relative z-10 flex-grow flex items-center justify-center max-w-5xl mx-auto w-full my-6">
              
              {/* Left Arrow */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:-left-16 rounded-full bg-white/5 border border-white/10 p-3 text-hotel-beige hover:bg-hotel-gold hover:text-hotel-charcoal transition-all shadow-lg shrink-0 z-20"
                aria-label="Previous Image"
                id-attr="lightbox-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Main Image frame */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[70vh] max-w-full overflow-hidden rounded-sm shadow-2xl border border-white/10"
              >
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].caption}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Right Arrow */}
              <button
                onClick={nextImage}
                className="absolute right-2 md:-right-16 rounded-full bg-white/5 border border-white/10 p-3 text-hotel-beige hover:bg-hotel-gold hover:text-hotel-charcoal transition-all shadow-lg shrink-0 z-20"
                aria-label="Next Image"
                id-attr="lightbox-next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Caption Bar */}
            <div className="relative z-10 text-center max-w-2xl mx-auto pb-4">
              <div className="inline-flex items-center gap-2 bg-hotel-charcoal-light/70 backdrop-blur-md rounded border border-hotel-gold/15 px-5 py-3 text-hotel-beige shadow-xl">
                <Info className="h-4 w-4 text-hotel-gold shrink-0" />
                <p className="font-serif text-sm italic tracking-wide">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
