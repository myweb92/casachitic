import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Plus, Trash2, Link2 } from "lucide-react";
import {
  getInitialCMSContent,
  saveCMSContent,
  CMSReviewItem,
} from "../lib/cmsStore";
import { EditableText } from "./EditableText";

interface ReviewsProps {
  isLiveEditMode?: boolean;
}

export default function Reviews({ isLiveEditMode = false }: ReviewsProps) {
  const [cms, setCms] = useState(getInitialCMSContent());

  useEffect(() => {
    const handleCmsUpdate = () => setCms(getInitialCMSContent());
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const section = cms.reviewsSection;
  const reviews = cms.reviews || [];

  const updateSection = (
    field: "anchor" | "title" | "readAllBtnText" | "readAllUrl",
    val: string
  ) => {
    const copy = {
      ...cms,
      reviewsSection: { ...section, [field]: val },
    };
    setCms(copy);
    saveCMSContent(copy);
  };

  const updateReview = (
    idx: number,
    patch: Partial<CMSReviewItem>
  ) => {
    const next = [...reviews];
    next[idx] = { ...next[idx], ...patch };
    const copy = { ...cms, reviews: next };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleAddReview = () => {
    const newRev: CMSReviewItem = {
      id: "rev-" + Date.now(),
      name: "Guest Name",
      date: "Recent Stay",
      text: "Share an authentic guest review here...",
      rating: 5,
    };
    const copy = { ...cms, reviews: [...reviews, newRev] };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleDeleteReview = (idx: number) => {
    if (reviews.length <= 1) return;
    const copy = {
      ...cms,
      reviews: reviews.filter((_, i) => i !== idx),
    };
    setCms(copy);
    saveCMSContent(copy);
  };

  return (
    <section
      id="reviews"
      className="bg-hotel-cream py-20 md:py-28 border-t border-hotel-sand/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="mb-3">
            <EditableText
              value={section.anchor}
              onSave={(val) => updateSection("anchor", val)}
              isLiveEditMode={isLiveEditMode}
              as="span"
              className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#A67C52]"
            />
          </div>
          <div className="mb-5">
            <EditableText
              value={section.title}
              onSave={(val) => updateSection("title", val)}
              isLiveEditMode={isLiveEditMode}
              as="h2"
              className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#1A1A1A]"
            />
          </div>
          <div className="w-12 h-[1px] bg-[#A67C52] mx-auto mb-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 border border-hotel-sand/50 shadow-sm flex flex-col relative"
            >
              {isLiveEditMode && reviews.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteReview(idx)}
                  className="absolute top-3 right-3 p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => {
                  const filled = i < (rev.rating ?? 5);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!isLiveEditMode}
                      onClick={() => updateReview(idx, { rating: i + 1 })}
                      className={isLiveEditMode ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
                      title={isLiveEditMode ? `Set rating to ${i + 1} stars` : undefined}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          filled
                            ? "fill-[#A67C52] text-[#A67C52]"
                            : "text-hotel-sand"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mb-6 flex-grow">
                <EditableText
                  value={rev.text}
                  onSave={(val) => updateReview(idx, { text: val })}
                  isLiveEditMode={isLiveEditMode}
                  multiline
                  as="p"
                  className="font-serif italic text-hotel-stone text-base leading-relaxed"
                >
                  {`"${rev.text}"`}
                </EditableText>
              </div>

              <div>
                <EditableText
                  value={rev.name}
                  onSave={(val) => updateReview(idx, { name: val })}
                  isLiveEditMode={isLiveEditMode}
                  as="p"
                  className="font-sans text-xs font-bold text-hotel-charcoal uppercase tracking-wider"
                />
                <div className="mt-1">
                  <EditableText
                    value={rev.date}
                    onSave={(val) => updateReview(idx, { date: val })}
                    isLiveEditMode={isLiveEditMode}
                    as="p"
                    className="font-sans text-[10px] text-hotel-stone/60 uppercase tracking-widest"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isLiveEditMode && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleAddReview}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-hotel-gold bg-white text-hotel-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-hotel-gold/15 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-hotel-gold" />
              <span>Add Guest Review</span>
            </button>
          </div>
        )}

        <div className="mt-12 text-center flex flex-col items-center gap-3">
          <a
            href={section.readAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isLiveEditMode) e.preventDefault();
            }}
            className="inline-block px-8 py-3 bg-[#A67C52] hover:bg-[#917243] text-[#1e1b18] font-bold text-xs tracking-widest rounded-sm uppercase transition-colors"
          >
            <EditableText
              value={section.readAllBtnText}
              onSave={(val) => updateSection("readAllBtnText", val)}
              isLiveEditMode={isLiveEditMode}
              useModal
              modalLabel="Edit Reviews Button Label"
              as="span"
            />
          </a>

          {isLiveEditMode && (
            <div className="inline-flex items-center gap-1.5 text-xs text-hotel-stone">
              <Link2 className="w-3.5 h-3.5 text-hotel-gold" />
              <EditableText
                value={section.readAllUrl}
                onSave={(val) => updateSection("readAllUrl", val)}
                isLiveEditMode={isLiveEditMode}
                useModal
                modalLabel="Edit Google Reviews URL"
                as="span"
                className="text-[11px] font-sans underline"
              >
                Edit Reviews Link URL
              </EditableText>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
