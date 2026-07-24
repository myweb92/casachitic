/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Star, HelpCircle as HelpIcon } from 'lucide-react';
import { Language } from '../types';
import { FAQ_DATA } from '../data';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-hotel-cream border-t border-hotel-sand/40 overflow-hidden" id-attr="faq-section">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="block font-sans text-xs font-semibold tracking-[0.25em] text-hotel-gold uppercase mb-3">
            {'QUESTIONS & ANSWERS'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-hotel-charcoal leading-tight tracking-wide mb-4">
            {'Frequently Asked Questions'}
          </h2>
          <div className="w-12 h-[2px] bg-hotel-gold mx-auto mb-6" />
          <p className="font-sans text-xs md:text-sm font-light text-hotel-stone/80 tracking-wide">
            {'Everything you need to know about your luxurious stay at Casa Chitic in Brașov.'}
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4" id-attr="faq-accordion-group">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-sm border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-hotel-gold bg-hotel-beige shadow-lg' 
                    : 'border-hotel-sand/50 bg-hotel-beige/40 hover:border-hotel-gold/50'
                }`}
              >
                {/* Trigger Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-0 cursor-pointer"
                  id-attr={`faq-trigger-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`h-5 w-5 shrink-0 transition-colors ${isOpen ? 'text-hotel-gold' : 'text-hotel-stone/40'}`} />
                    <span className="font-serif text-base md:text-lg text-hotel-charcoal font-medium">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-hotel-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanding Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pl-14 font-sans text-sm font-light text-hotel-stone leading-relaxed border-t border-hotel-sand/35 pt-4">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support callout box */}
        <div className="mt-12 text-center p-6 rounded bg-hotel-beige border border-hotel-sand/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-serif text-base text-hotel-charcoal font-medium">{'Have more questions?'}</h4>
            <p className="font-sans text-xs text-hotel-stone/80 mt-1">
              {'Our local front desk team is delighted to assist you directly.'}
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if(el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-hotel-gold hover:bg-hotel-gold-dark text-hotel-charcoal font-bold text-xs tracking-wider rounded-sm uppercase transition-colors shrink-0"
          >
            {'GET IN TOUCH'}
          </button>
        </div>

      </div>
    </section>
  );
}
