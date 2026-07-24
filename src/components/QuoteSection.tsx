/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Language } from '../types';
import { QUOTE_TEXT } from '../data';

interface QuoteSectionProps {
  lang: Language;
}

export default function QuoteSection({ lang }: QuoteSectionProps) {
  return (
    <section className="relative py-20 bg-hotel-sand/30 overflow-hidden border-y border-hotel-sand/45" id-attr="quote-section">
      {/* Absolute decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <Quote className="w-96 h-96 text-hotel-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Small gold quote icon indicator */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hotel-gold/10 text-hotel-gold mb-6">
            <Quote className="h-5 w-5" />
          </div>

          {/* Elegant italicized serif quote */}
          <blockquote className="font-serif italic text-2xl md:text-4xl font-normal text-hotel-stone leading-relaxed tracking-wide mb-6">
            {QUOTE_TEXT.quote}
          </blockquote>

          {/* Author line with gold accents */}
          <div className="flex items-center gap-3 justify-center">
            <span className="w-6 h-[1px] bg-hotel-gold" />
            <cite className="font-sans text-xs font-semibold tracking-[0.2em] text-hotel-gold uppercase not-italic">
              {QUOTE_TEXT.author}
            </cite>
            <span className="w-6 h-[1px] bg-hotel-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
