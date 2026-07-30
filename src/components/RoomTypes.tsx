import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Users,
  Bed,
  ChevronDown,
  Check,
} from "lucide-react";

const ROOMS = [
  {
    title: "Deluxe Apartment",
    collection: "JOHANN GOTT 7",
    size: "55 m\u00b2",
    capacity: "2-4 Adults",
    bed: "1 Double Bed & Sofa",
    description:
      "The air-conditioned apartment features 2 bedrooms and 1 bathroom with a walk-in shower and a hairdryer. This apartment has soundproof walls, a minibar, a flat-screen TV with cable channels and a terrace.",
    badge: "PREMIUM",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/t20pj~~6a328456922c9.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-4~~6a328463113f1.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/ybwyn_1~~6a328468082ca.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/download~~6a32846f96ade.png",
    ],
  },
  {
    title: "Deluxe Suite",
    collection: "JOHANN GOTT 7",
    size: "50 m\u00b2",
    capacity: "2-4 Adults",
    bed: "1 Double Bed",
    description:
      "This suite includes 1 living room, 1 separate bedroom and 1 bathroom with a walk-in shower and free toiletries. The suite offers air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels. The unit has 3 beds.",
    badge: "BOUTIQUE",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image-2~~6a32840c7c61b.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-1~~6a328417baf48.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-2~~6a32841813246.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-3~~6a32841a25ea3.jpg",
    ],
  },
  {
    title: "Deluxe Twin Room",
    collection: "JOHANN GOTT 7",
    size: "25 m\u00b2",
    capacity: "2 Adults",
    bed: "2 Single Beds",
    description:
      "Featuring free toiletries, this twin room includes a private bathroom with a walk-in shower, a hairdryer and slippers. This twin room is air-conditioned and has a flat-screen TV with cable channels, soundproof walls, a minibar and a wardrobe. The unit has 2 beds.",
    badge: "COZY",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a3283e751102.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-4~~6a3283f16c7aa.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283f1db075.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283f373f06.jpg",
    ],
  },
  {
    title: "Deluxe Double Room",
    collection: "JOHANN GOTT 7",
    size: "25 m\u00b2",
    capacity: "2 Adults",
    bed: "1 Double Bed",
    description:
      "Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe and a flat-screen TV with cable channels. The unit offers 1 bed.",
    badge: "QUIET",
    images: [
      "https://h-img1.cloudbeds.com/uploads/184869/image-2~~6a3283b435512.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image~~6a32839f156df.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-1~~6a3283b3a751d.jpg",
      "https://h-img1.cloudbeds.com/uploads/184869/image-3~~6a3283b628c43.jpg",
    ],
  },
  {
    title: "Deluxe Room - No Window",
    collection: "JOHANN GOTT 7",
    size: "20 m\u00b2",
    capacity: "2 Adults",
    bed: "1 Double Bed",
    description:
      "Providing free toiletries, this double room includes a private bathroom with a walk-in shower, a hairdryer and slippers. The double room provides air conditioning, soundproof walls, a minibar, a wardrobe, as well as a flat-screen TV with cable channels. The unit offers 1 bed.",
    badge: "BEST SELLER",
    images: [
      "https://h-img2.cloudbeds.com/uploads/184869/image-1~~6a32836d4c50c.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-2~~6a32837898a3c.jpg",
      "https://h-img3.cloudbeds.com/uploads/184869/image-3~~6a328378ee50f.jpg",
      "https://h-img2.cloudbeds.com/uploads/184869/image-4~~6a32837aad27b.jpg",
    ],
  },
];

const RoomCard: React.FC<{ room: (typeof ROOMS)[0] }> = ({ room }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-hotel-sand hover:border-hotel-gold transition-colors duration-300 group flex flex-col h-full flex-grow w-full"
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <span className="absolute top-4 left-4 z-20 bg-hotel-gold text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
          {room.badge}
        </span>

        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIdx}
            src={room.images[currentImageIdx]}
            alt={room.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Arrows (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={prevImage}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIdx(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIdx ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl md:text-3xl text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300 mb-1">
          {room.title.includes(" - No Window") ? (
            <div className="flex items-baseline flex-wrap sm:flex-nowrap whitespace-nowrap">
              <span>{room.title.replace(" - No Window", "")}</span>
              <span className="text-lg md:text-xl ml-2">- No Window</span>
            </div>
          ) : (
            room.title
          )}
        </h3>
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-hotel-gold mb-6 block">
          {room.collection}
        </span>

        {/* Features Row */}
        <div className="flex items-center justify-between border-b border-hotel-sand pb-6 mb-6">
          <div className="flex items-center gap-2 text-hotel-stone">
            <Maximize className="w-[18px] h-[18px] text-hotel-gold" />
            <span className="font-sans text-xs">{room.size}</span>
          </div>
          <div className="w-[1px] h-6 bg-hotel-sand" />
          <div className="flex items-center gap-2 text-hotel-stone">
            <Users className="w-[18px] h-[18px] text-hotel-gold" />
            <span className="font-sans text-xs">{room.capacity}</span>
          </div>
          <div className="w-[1px] h-6 bg-hotel-sand" />
          <div className="flex items-center gap-2 text-hotel-stone">
            <Bed className="w-[18px] h-[18px] text-hotel-gold" />
            <span className="font-sans text-xs">{room.bed}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-[13px] leading-relaxed text-hotel-stone mb-8 min-h-[80px]">
          {room.description}
        </p>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex items-center justify-center gap-2 py-3.5 border border-hotel-sand hover:bg-gray-50 transition-colors text-[10px] font-bold uppercase tracking-widest text-hotel-charcoal"
          >
            SPECS{" "}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showSpecs ? "rotate-180" : ""}`}
            />
          </button>
          <a
            href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3.5 bg-hotel-gold hover:bg-hotel-gold-dark transition-colors text-[10px] font-bold uppercase tracking-widest text-white"
          >
            BOOK STAY
          </a>
        </div>

        <AnimatePresence>
          {showSpecs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-hotel-sand">
                <h4 className="font-serif text-lg text-hotel-charcoal mb-4">
                  Accommodation Amenities
                </h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    "220-240 volt circuits",
                    "Air-conditioning",
                    "AM / FM radio",
                    "Cable television",
                    "Cribs upon request",
                    "Hairdryer",
                    "Slippers",
                    "Wireless internet (WiFi)",
                  ].map((amenity, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-hotel-stone"
                    >
                      <Check className="w-4 h-4 text-hotel-gold shrink-0 mt-0.5" />
                      <span className="font-sans text-[11px] leading-tight">
                        {amenity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function RoomTypes() {
  return (
    <section id="rooms" className="py-24 lg:py-32 bg-hotel-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-hotel-gold uppercase block mb-4">
            THE COLLECTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-hotel-charcoal font-normal leading-tight mb-6">
            Stay with us
          </h2>
          <p className="font-sans text-sm md:text-base text-hotel-stone leading-relaxed max-w-xl mx-auto">
            Choose from our carefully curated collections of rooms and suites.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-fr">
          {ROOMS.map((room, idx) => (
            <div
              key={idx}
              className={`flex flex-col h-full md:col-span-1 lg:col-span-2 ${
                idx === 3 ? "lg:col-start-2" : ""
              } ${idx === 4 ? "lg:col-start-4" : ""}`}
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
