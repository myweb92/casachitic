import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Camera, Upload, Plus, Trash2, X, Check } from "lucide-react";
import { processImageFile } from "../lib/imageUtils";

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  currentSrc: string;
  onSaveSingle?: (newUrl: string) => void;
  carouselImages?: string[];
  initialSlideIndex?: number;
  onSaveCarousel?: (newImages: string[], activeIdx: number) => void;
}

export const ImageEditModal: React.FC<ImageEditModalProps> = ({
  isOpen,
  onClose,
  title = "Change Image",
  currentSrc,
  onSaveSingle,
  carouselImages,
  initialSlideIndex = 0,
  onSaveCarousel,
}) => {
  const isCarousel = Array.isArray(carouselImages) && Boolean(onSaveCarousel);
  const [slides, setSlides] = useState<string[]>(
    isCarousel ? [...carouselImages!] : [currentSrc]
  );
  const [activeIdx, setActiveIdx] = useState<number>(
    isCarousel ? Math.min(initialSlideIndex, (carouselImages?.length || 1) - 1) : 0
  );
  const [uploadError, setUploadError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || typeof document === "undefined") return null;

  const activeUrl = slides[activeIdx] || "";

  const updateActiveUrl = (url: string) => {
    setSlides((prev) => {
      const next = [...prev];
      next[activeIdx] = url;
      return next;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError("");
    setIsProcessing(true);
    try {
      const optimizedDataUrl = await processImageFile(file);
      updateActiveUrl(optimizedDataUrl);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to process image file."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddSlideFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError("");
    setIsProcessing(true);
    try {
      const optimizedDataUrl = await processImageFile(file);
      setSlides((prev) => {
        const next = [...prev, optimizedDataUrl];
        setActiveIdx(next.length - 1);
        return next;
      });
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to process image file."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddEmptySlide = () => {
    setSlides((prev) => {
      const next = [...prev, activeUrl || ""];
      setActiveIdx(next.length - 1);
      return next;
    });
  };

  const handleDeleteSlide = (idxToRemove: number) => {
    if (slides.length <= 1) return;
    setSlides((prev) => {
      const next = prev.filter((_, i) => i !== idxToRemove);
      setActiveIdx((curr) => Math.max(0, Math.min(curr, next.length - 1)));
      return next;
    });
  };

  const handleSave = () => {
    if (isCarousel && onSaveCarousel) {
      const cleaned = slides.map((s) => s.trim()).filter(Boolean);
      const finalSlides = cleaned.length > 0 ? cleaned : [currentSrc];
      onSaveCarousel(finalSlides, Math.min(activeIdx, finalSlides.length - 1));
    } else if (onSaveSingle) {
      onSaveSingle(activeUrl.trim() || currentSrc);
    }
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl text-hotel-charcoal space-y-4 max-h-[90vh] overflow-y-auto border border-hotel-gold/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hotel-stone/20 pb-2">
          <h3 className="font-serif text-lg font-normal text-hotel-charcoal flex items-center gap-2">
            <Camera className="h-4 w-4 text-hotel-gold" />
            <span>{title}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-hotel-stone hover:text-hotel-charcoal rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Slide Switcher for Carousel Images */}
        {isCarousel && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-hotel-stone">
                Gallery Slides ({slides.length})
              </span>
              <div className="flex items-center gap-1.5">
                <label className="flex items-center gap-1 px-2.5 py-1 bg-hotel-gold/15 hover:bg-hotel-gold/30 text-hotel-charcoal border border-hotel-gold/40 rounded text-[11px] font-semibold cursor-pointer transition-colors">
                  <Upload className="h-3 w-3 text-hotel-gold" />
                  <span>Upload New Slide</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddSlideFile}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleAddEmptySlide}
                  className="flex items-center gap-1 px-2.5 py-1 bg-hotel-sand/40 hover:bg-hotel-sand text-hotel-charcoal rounded text-[11px] font-semibold transition-colors"
                >
                  <Plus className="h-3 w-3" /> Add URL
                </button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {slides.map((slideUrl, idx) => (
                <div
                  key={idx}
                  className={`relative shrink-0 w-16 h-12 rounded overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === activeIdx
                      ? "border-hotel-gold ring-2 ring-hotel-gold/30"
                      : "border-hotel-stone/20 opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveIdx(idx)}
                >
                  {slideUrl ? (
                    <img
                      src={slideUrl}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center text-[10px] text-hotel-stone">
                      Empty
                    </div>
                  )}
                  <span className="absolute bottom-0.5 left-0.5 bg-black/70 text-white text-[9px] px-1 rounded">
                    {idx + 1}
                  </span>
                  {slides.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(idx);
                      }}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-red-600/90 text-white rounded hover:bg-red-700"
                      title="Remove slide"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block font-sans text-xs font-medium text-hotel-stone mb-1">
              {isCarousel ? `Slide ${activeIdx + 1} Image URL` : "Image URL"}
            </label>
            <input
              type="text"
              value={activeUrl}
              onChange={(e) => updateActiveUrl(e.target.value)}
              className="w-full p-2.5 border border-hotel-stone/30 rounded text-xs font-mono focus:border-hotel-gold focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-hotel-stone mb-1">
              Or Upload Local File (PNG, JPG, WebP)
            </label>
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-hotel-gold/50 rounded-lg p-3 cursor-pointer hover:bg-hotel-sand/20 transition-colors">
              <Upload className="h-4 w-4 text-hotel-gold" />
              <span className="text-xs text-hotel-charcoal font-sans font-medium">
                {isProcessing ? "Optimizing image..." : "Select Image from Device"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
            </label>
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {uploadError}
            </p>
          )}

          {activeUrl && (
            <div className="aspect-video w-full overflow-hidden rounded border border-hotel-stone/20 bg-stone-100">
              <img
                src={activeUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-hotel-stone/30 rounded text-xs font-sans hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 bg-hotel-charcoal text-hotel-beige rounded text-xs font-sans uppercase font-semibold hover:bg-hotel-gold hover:text-hotel-charcoal transition-colors disabled:opacity-50"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (newUrl: string) => void;
  isLiveEditMode?: boolean;
  className?: string;
  containerClassName?: string;
  editLabel?: string;
  badgePosition?: "top-right" | "bottom-right" | "bottom-left";
  carouselImages?: string[];
  currentSlideIndex?: number;
  onSaveCarousel?: (newImages: string[], activeIdx: number) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onSave,
  isLiveEditMode = false,
  className = "",
  containerClassName = "",
  editLabel = "Edit Image",
  badgePosition = "bottom-right",
  carouselImages,
  currentSlideIndex = 0,
  onSaveCarousel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const badgePosClass =
    badgePosition === "top-right"
      ? "top-3 right-3"
      : badgePosition === "bottom-left"
      ? "bottom-3 left-3"
      : "bottom-3 right-3";

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div
      className={`relative ${containerClassName} ${
        isLiveEditMode ? "outline-dashed outline-2 outline-hotel-gold/75" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {isLiveEditMode && (
        <>
          {/* Persistent visible badge for desktop & touch */}
          <button
            type="button"
            onClick={handleOpen}
            className={`absolute ${badgePosClass} z-30 flex items-center gap-1.5 px-2.5 py-1.5 bg-hotel-gold text-hotel-charcoal font-sans text-[10px] uppercase tracking-wider font-bold rounded shadow-xl hover:scale-105 transition-transform border border-white/40`}
            title="Edit or replace image"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>{editLabel}</span>
          </button>

          {/* Hover centered overlay */}
          <div
            onClick={handleOpen}
            className="absolute inset-0 bg-hotel-charcoal/35 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-20 cursor-pointer"
          >
            <span className="flex items-center gap-2 px-4 py-2 bg-hotel-gold text-hotel-charcoal font-sans text-xs uppercase tracking-wider font-semibold rounded shadow-xl">
              <Camera className="h-4 w-4" /> {editLabel}
            </span>
          </div>
        </>
      )}

      <ImageEditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={carouselImages ? "Manage Room Photos" : "Change Image"}
        currentSrc={src}
        onSaveSingle={onSave}
        carouselImages={carouselImages}
        initialSlideIndex={currentSlideIndex}
        onSaveCarousel={onSaveCarousel}
      />
    </div>
  );
};
