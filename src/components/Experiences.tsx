import React from 'react';
import { motion } from 'motion/react';
import { Landmark, ShieldCheck, Snowflake, Tv, Wine, Car } from 'lucide-react';

const EXPERIENCES_DATA = [
  {
    icon: <Landmark className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'LOCATION',
    title: 'Pedestrian Center',
    desc: 'Located just 100m from the Black Church, perfectly positioned to explore the historic winding streets of Brașov.'
  },
  {
    icon: <ShieldCheck className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'HERITAGE',
    title: 'Solid Wood Furniture',
    desc: 'Each room is uniquely furnished with artisan-crafted pieces that honor traditional Transylvanian woodworking.'
  },
  {
    icon: <Snowflake className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'COMFORT',
    title: 'Air Conditioning',
    desc: 'State-of-the-art, silent climate control systems ensure a restful environment regardless of the season.'
  },
  {
    icon: <Tv className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'ENTERTAINMENT',
    title: 'Smart TV & WiFi',
    desc: 'Stay connected with high-speed internet and premium Smart TVs available in every single room.'
  },
  {
    icon: <Wine className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'GOURMET',
    title: 'Premium Minibar',
    desc: 'Enjoy a curated selection of fine beverages and gourmet snacks thoughtfully stocked in your room.'
  },
  {
    icon: <Car className="w-[18px] h-[18px] text-[#A67C52]" />,
    badge: 'CONVENIENCE',
    title: 'Private Parking',
    desc: 'Secure nearby parking available for our guests, ensuring peace of mind during your stay in the pedestrian zone.'
  }
];

export default function Experiences() {
  return (
    <section id="experiences" className="bg-[#F5F2ED] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#A67C52] mb-3">
            Boutique Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#1A1A1A] mb-5">
            Curated Guest Experiences
          </h2>
          <div className="w-12 h-[1px] bg-[#A67C52] mx-auto mb-5" />
          <p className="font-sans text-xs text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Every detail at Casa Chitic is designed to provide you with a seamless and luxurious stay. Discover the tailored amenities that await you.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 border border-[#DED9D2] shadow-sm transition-colors duration-300 hover:border-[#A67C52] relative overflow-hidden group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full border border-[#A67C52] flex items-center justify-center shrink-0">
                  {exp.icon}
                </div>
                <span className="font-sans text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[#EBE7E0] border border-[#DED9D2] rounded text-neutral-600">
                  {exp.badge}
                </span>
              </div>
              <h3 className="font-serif text-base md:text-lg font-medium text-[#1A1A1A] mt-2 mb-2">
                {exp.title}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-neutral-600">
                {exp.desc}
              </p>

              {/* Hover Animation (Bottom Line) */}
              <div className="absolute bottom-0 left-0 h-[1px] w-1/3 bg-[#DED9D2] transition-all duration-500 group-hover:w-full group-hover:bg-[#A67C52]/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
