import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Users,
  Bed,
  ChevronDown,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import {
  getInitialCMSContent,
  saveCMSContent,
  CMSRoomItem,
} from "../lib/cmsStore";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";

interface RoomTypesProps {
  isLiveEditMode?: boolean;
}

const RoomCard: React.FC<{
  room: CMSRoomItem;
  specsBtnText: string;
  bookBtnText: string;
  amenitiesTitle: string;
  bookingUrl: string;
  isLiveEditMode: boolean;
  onUpdateRoom: (updated: CMSRoomItem) => void;
  onUpdateSectionText: (
    field: "specsBtnText" | "bookBtnText" | "amenitiesTitle",
    val: string
  ) => void;
}> = ({
  room,
  specsBtnText,
  bookBtnText,
  amenitiesTitle,
  bookingUrl,
  isLiveEditMode,
  onUpdateRoom,
  onUpdateSectionText,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);

  const safeIdx = Math.min(currentImageIdx, Math.max(0, room.images.length - 1));
  const currentImg = room.images[safeIdx] || "";

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.images.length === 0) return;
    setCurrentImageIdx((prev) => (prev >= room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.images.length === 0) return;
    setCurrentImageIdx((prev) => (prev <= 0 ? room.images.length - 1 : prev - 1));
  };

  const handleSaveCarousel = (newImages: string[], activeIdx: number) => {
    onUpdateRoom({ ...room, images: newImages });
    setCurrentImageIdx(activeIdx);
  };

  const handleSaveSingleImage = (newUrl: string) => {
    const nextImages = [...room.images];
    nextImages[safeIdx] = newUrl;
    onUpdateRoom({ ...room, images: nextImages });
  };

  const handleUpdateAmenity = (amenityIdx: number, val: string) => {
    const next = [...room.amenities];
    next[amenityIdx] = val;
    onUpdateRoom({ ...room, amenities: next });
  };

  const handleAddAmenity = () => {
    onUpdateRoom({
      ...room,
      amenities: [...room.amenities, "New Room Amenity"],
    });
  };

  const handleRemoveAmenity = (amenityIdx: number) => {
    onUpdateRoom({
      ...room,
      amenities: room.amenities.filter((_, i) => i !== amenityIdx),
    });
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
        <div className="absolute top-4 left-4 z-30 bg-hotel-gold text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
          <EditableText
            value={room.badge}
            onSave={(val) => onUpdateRoom({ ...room, badge: val })}
            isLiveEditMode={isLiveEditMode}
            useModal
            modalLabel="Edit Room Badge"
            as="span"
          />
        </div>

        <EditableImage
          src={currentImg}
          alt={room.title}
          onSave={handleSaveSingleImage}
          isLiveEditMode={isLiveEditMode}
          editLabel={`Edit Photos (${room.images.length})`}
          badgePosition="bottom-right"
          carouselImages={room.images}
          currentSlideIndex={safeIdx}
          onSaveCarousel={handleSaveCarousel}
          className="h-full w-full object-cover transition-opacity duration-300"
          containerClassName="h-full w-full"
        />

        {/* Arrows */}
        {room.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between p-2 opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-25 pointer-events-none">
            <button
              type="button"
              onClick={prevImage}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Previous room photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Next room photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dots */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-25">
            {room.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  idx === safeIdx ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="mb-1">
          {isLiveEditMode ? (
            <EditableText
              value={room.title}
              onSave={(val) => onUpdateRoom({ ...room, title: val })}
              isLiveEditMode={isLiveEditMode}
              as="h3"
              className="font-serif text-2xl md:text-3xl text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300"
            />
          ) : (
            <h3 className="font-serif text-2xl md:text-3xl text-hotel-charcoal group-hover:text-hotel-gold transition-colors duration-300">
              {room.title.includes(" - No Window") ? (
                <div className="flex items-baseline flex-wrap sm:flex-nowrap whitespace-nowrap">
                  <span>{room.title.replace(" - No Window", "")}</span>
                  <span className="text-lg md:text-xl ml-2">- No Window</span>
                </div>
              ) : (
                room.title
              )}
            </h3>
          )}
        </div>

        <div className="mb-6">
          <EditableText
            value={room.collection}
            onSave={(val) => onUpdateRoom({ ...room, collection: val })}
            isLiveEditMode={isLiveEditMode}
            as="span"
            className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-hotel-gold block"
          />
        </div>

        {/* Features Row */}
        <div className="flex items-center justify-between border-b border-hotel-sand pb-6 mb-6 gap-2">
          <div className="flex items-center gap-1.5 text-hotel-stone">
            <Maximize className="w-[18px] h-[18px] text-hotel-gold shrink-0" />
            <EditableText
              value={room.size}
              onSave={(val) => onUpdateRoom({ ...room, size: val })}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Room Size"
              as="span"
              className="font-sans text-xs"
            />
          </div>
          <div className="w-[1px] h-6 bg-hotel-sand shrink-0" />
          <div className="flex items-center gap-1.5 text-hotel-stone">
            <Users className="w-[18px] h-[18px] text-hotel-gold shrink-0" />
            <EditableText
              value={room.capacity}
              onSave={(val) => onUpdateRoom({ ...room, capacity: val })}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Room Capacity"
              as="span"
              className="font-sans text-xs"
            />
          </div>
          <div className="w-[1px] h-6 bg-hotel-sand shrink-0" />
          <div className="flex items-center gap-1.5 text-hotel-stone">
            <Bed className="w-[18px] h-[18px] text-hotel-gold shrink-0" />
            <EditableText
              value={room.bed}
              onSave={(val) => onUpdateRoom({ ...room, bed: val })}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Bed Configuration"
              as="span"
              className="font-sans text-xs"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 min-h-[80px]">
          <EditableText
            value={room.description}
            onSave={(val) => onUpdateRoom({ ...room, description: val })}
            isLiveEditMode={isLiveEditMode}
            multiline
            as="p"
            className="font-sans text-[13px] leading-relaxed text-hotel-stone"
          />
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex items-center justify-center gap-2 py-3.5 border border-hotel-sand hover:bg-gray-50 transition-colors text-[10px] font-bold uppercase tracking-widest text-hotel-charcoal"
          >
            <EditableText
              value={specsBtnText}
              onSave={(val) => onUpdateSectionText("specsBtnText", val)}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Specs Button Label"
              as="span"
            />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                showSpecs ? "rotate-180" : ""
              }`}
            />
          </button>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isLiveEditMode) e.preventDefault();
            }}
            className="flex items-center justify-center py-3.5 bg-hotel-gold hover:bg-hotel-gold-dark transition-colors text-[10px] font-bold uppercase tracking-widest text-white"
          >
            <EditableText
              value={bookBtnText}
              onSave={(val) => onUpdateSectionText("bookBtnText", val)}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Book Button Label"
              as="span"
            />
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
                <div className="mb-4">
                  <EditableText
                    value={amenitiesTitle}
                    onSave={(val) => onUpdateSectionText("amenitiesTitle", val)}
                    isLiveEditMode={isLiveEditMode}
                    as="h4"
                    className="font-serif text-lg text-hotel-charcoal"
                  />
                </div>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {room.amenities.map((amenity, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-hotel-stone group/amenity"
                    >
                      <Check className="w-4 h-4 text-hotel-gold shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <EditableText
                          value={amenity}
                          onSave={(val) => handleUpdateAmenity(i, val)}
                          isLiveEditMode={isLiveEditMode}
                          useModal
                          modalLabel="Edit Room Amenity"
                          as="span"
                          className="font-sans text-[11px] leading-tight"
                        />
                      </div>
                      {isLiveEditMode && room.amenities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(i)}
                          className="text-red-500 hover:text-red-700 p-0.5 shrink-0"
                          title="Remove amenity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {isLiveEditMode && (
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-hotel-gold/50 bg-hotel-gold/10 text-hotel-charcoal text-[11px] font-semibold hover:bg-hotel-gold/25 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-hotel-gold" />
                    <span>Add Amenity</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function RoomTypes({ isLiveEditMode = false }: RoomTypesProps) {
  const [cms, setCms] = useState(getInitialCMSContent());

  useEffect(() => {
    const handleCmsUpdate = () => setCms(getInitialCMSContent());
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const section = cms.roomsSection;
  const rooms = cms.rooms || [];
  const bookingUrl =
    cms.contactInfo?.bookingUrl ||
    "https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron";

  const updateSection = (
    field: keyof typeof section,
    newVal: string
  ) => {
    const copy = {
      ...cms,
      roomsSection: { ...section, [field]: newVal },
    };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleUpdateRoom = (idx: number, updated: CMSRoomItem) => {
    const nextRooms = [...rooms];
    nextRooms[idx] = updated;
    const copy = { ...cms, rooms: nextRooms };
    setCms(copy);
    saveCMSContent(copy);
  };

  return (
    <section id="rooms" className="py-24 lg:py-32 bg-hotel-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="mb-4">
            <EditableText
              value={section.anchor}
              onSave={(val) => updateSection("anchor", val)}
              isLiveEditMode={isLiveEditMode}
              as="span"
              className="font-sans text-xs font-bold tracking-[0.25em] text-hotel-gold uppercase block"
            />
          </div>
          <div className="mb-6">
            <EditableText
              value={section.title}
              onSave={(val) => updateSection("title", val)}
              isLiveEditMode={isLiveEditMode}
              as="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-hotel-charcoal font-normal leading-tight"
            />
          </div>
          <div className="max-w-xl mx-auto">
            <EditableText
              value={section.subtitle}
              onSave={(val) => updateSection("subtitle", val)}
              isLiveEditMode={isLiveEditMode}
              multiline
              as="p"
              className="font-sans text-sm md:text-base text-hotel-stone leading-relaxed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-fr">
          {rooms.map((room, idx) => (
            <div
              key={room.id || idx}
              className={`flex flex-col h-full md:col-span-1 lg:col-span-2 ${
                idx === 3 ? "lg:col-start-2" : ""
              } ${idx === 4 ? "lg:col-start-4" : ""}`}
            >
              <RoomCard
                room={room}
                specsBtnText={section.specsBtnText}
                bookBtnText={section.bookBtnText}
                amenitiesTitle={section.amenitiesTitle}
                bookingUrl={bookingUrl}
                isLiveEditMode={isLiveEditMode}
                onUpdateRoom={(updated) => handleUpdateRoom(idx, updated)}
                onUpdateSectionText={(field, val) => updateSection(field, val)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
