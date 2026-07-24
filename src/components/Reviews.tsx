import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const REVIEWS_DATA = [
  {
    name: 'Elena Popescu',
    date: 'October 2023',
    text: 'A truly magical experience. The historic charm of the building paired with modern luxury made our stay unforgettable. The location is absolutely perfect, right next to the Black Church.'
  },
  {
    name: 'Marcus Weaver',
    date: 'December 2023',
    text: 'The attic rooms are stunning! Waking up to the view of Brașov\'s rooftops through the skylight was a highlight of my trip. Impeccable service and beautiful design.'
  },
  {
    name: 'Sophie Laurent',
    date: 'January 2024',
    text: 'Highly recommend Casa Chitic. The solid wood furniture and the cozy atmosphere are unparalleled. We felt like royalty stepping back in time, yet with every modern comfort.'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-hotel-cream py-20 md:py-28 border-t border-hotel-sand/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#A67C52] mb-3">
            GUEST STORIES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#1A1A1A] mb-5">
            What Our Guests Say
          </h2>
          <div className="w-12 h-[1px] bg-[#A67C52] mx-auto mb-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 border border-hotel-sand/50 shadow-sm flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#A67C52] text-[#A67C52]" />
                ))}
              </div>
              <p className="font-serif italic text-hotel-stone text-base leading-relaxed mb-6 flex-grow">
                "{rev.text}"
              </p>
              <div>
                <p className="font-sans text-xs font-bold text-hotel-charcoal uppercase tracking-wider">{rev.name}</p>
                <p className="font-sans text-[10px] text-hotel-stone/60 uppercase tracking-widest mt-1">{rev.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/search?sca_esv=1c6902ee83d0e082&rlz=1C5CHFA_enRO1041RO1041&cs=1&sxsrf=APpeQnvbkJSGUfVL9JUPwvjLpInv6wzmeQ:1784804512671&uds=AJ5uw1_a2D0D09lxm8gpKKOTUn4r_l5CtmG5EFkznAXrJ4iL7axcXIEyWJBXpVExe9ULecD3QjkPfCjYgVOcoefzeYinOrtO_2Os_NHs8p7GvuX7peYMWL30bTggjaDZ6rg_sJLbeRWicXD38R1zpzpsevq799BsBIHkTSxr1P7RPjqhxZmGs3GZKWN5GyARfTAAgI0QE5wT&q=Hotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7+Reviews&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4OHWJ8-BwC-CfiEJzGpeRyJVozubXkv6QuQEeHmi4afFvOlKmHfhKQgoN-ASTdWnoFMV5R0I9t-kT2GWj-P74K8RdgyqQs27jDTp7YX_wyZiCPaCyLYhy8Hefc8038_QfD9IeoAiGtivmXayy0ckJBMphG7&hl=en-RO&sa=X&ved=2ahUKEwjG7t730uiVAxU_B9sEHTYYEogQ_4MLegQICBAS&biw=1504&bih=700&dpr=2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#A67C52] hover:bg-[#917243] text-[#1e1b18] font-bold text-xs tracking-widest rounded-sm uppercase transition-colors"
          >
            READ ALL REVIEWS
          </a>
        </div>
      </div>
    </section>
  );
}
