/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Landmark, Heart, Sparkles, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { STORY_VIDEO_SECTION } from '../data';

interface OurStoryProps {
  lang: Language;
}

export default function OurStory({ lang }: OurStoryProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-hotel-charcoal" id-attr="story-section">
      
      {/* Immersive Dark Parallax Background */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${STORY_VIDEO_SECTION.imageBg})`,
          backgroundAttachment: 'fixed', // Simple CSS Parallax
        }}
      />
      
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-hotel-charcoal via-hotel-charcoal/85 to-hotel-charcoal/70 z-0" />

      {/* Floating sound icon / details indicator */}
      <div className="absolute top-8 right-8 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-4 py-1.5 text-[10px] tracking-widest text-hotel-beige/70 uppercase">
        <Volume2 className="h-3 w-3 text-hotel-gold animate-pulse" />
        <span>Audio Guided Story</span>
      </div>

      {/* Centered Contents */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Section Prefix */}
          <span className="block font-sans text-xs font-semibold tracking-[0.3em] text-hotel-gold uppercase mb-4">
            {STORY_VIDEO_SECTION.title}
          </span>

          {/* Majestic Main Headline */}
          <h3 className="font-serif text-3xl md:text-5xl font-normal text-hotel-beige leading-tight tracking-wide mb-8">
            {STORY_VIDEO_SECTION.subtitle}
          </h3>

          {/* Interactive Concentric Pulsing Play Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="group relative flex flex-col items-center justify-center gap-4 focus:outline-none focus:ring-0"
            aria-label="Play story video"
            id-attr="play-story-btn"
          >
            {/* Pulsing Concentric Outer Ring */}
            <div className="absolute h-24 w-24 rounded-full border border-hotel-gold/40 animate-ping opacity-25" />
            <div className="absolute h-20 w-20 rounded-full border border-hotel-gold/60 animate-pulse" />

            {/* Main Play Icon Ball */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-hotel-gold text-hotel-charcoal shadow-2xl transition-all duration-300 group-hover:bg-hotel-terracotta group-hover:text-hotel-beige group-hover:scale-110">
              <Play className="h-6 w-6 fill-current ml-1" />
            </div>

            {/* Prompt Text underneath */}
            <span className="font-sans text-xs font-bold tracking-[0.25em] text-hotel-gold transition-colors group-hover:text-hotel-beige uppercase mt-2">
              {STORY_VIDEO_SECTION.buttonText}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Immersive Audio/Video Dialog Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            id-attr="story-video-modal"
          >
            {/* Close trigger on outer box click */}
            <div className="absolute inset-0" onClick={() => setModalOpen(false)} />

            {/* Close Button top-right */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-hotel-beige hover:bg-hotel-gold hover:text-hotel-charcoal transition-all"
              aria-label="Close modal"
              id-attr="close-story-modal-btn"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Responsive Video Canvas / Historical Storybook Cards */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-sm bg-hotel-charcoal shadow-2xl border border-hotel-gold/25"
            >
              {/* Aspect Ratio container */}
              <div className="aspect-video w-full">
                {/* Fallback elegant HTML5 local story player / YouTube embed */}
                <iframe
                  src={`${STORY_VIDEO_SECTION.videoEmbedUrl}?autoplay=1`}
                  title="Casa Chitic Story"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Extra historical insights footer */}
              <div className="p-6 md:p-8 border-t border-hotel-gold/15 bg-hotel-charcoal-light flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div>
                  <h4 className="font-serif text-lg text-hotel-beige">Casa Chitic: Brașov Landmark</h4>
                  <p className="font-sans text-xs text-hotel-beige/60 mt-1 max-w-xl">
                    {'A rich history dating back to medieval Saxon times, carefully renovated to preserve every authentic artifact while endowing contemporary comfort.'}
                  </p>
                </div>
                <div className="flex gap-4 shrink-0 text-hotel-gold">
                  <div className="flex flex-col items-center p-2.5 rounded border border-hotel-gold/10 bg-hotel-charcoal">
                    <Landmark className="h-5 w-5" />
                    <span className="text-[9px] mt-1 font-mono uppercase tracking-wider">Saxon Soul</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 rounded border border-hotel-gold/10 bg-hotel-charcoal">
                    <Heart className="h-5 w-5" />
                    <span className="text-[9px] mt-1 font-mono uppercase tracking-wider">Romance</span>
                  </div>
                  <div className="flex flex-col items-center p-2.5 rounded border border-hotel-gold/10 bg-hotel-charcoal">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-[9px] mt-1 font-mono uppercase tracking-wider">Luxury</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
