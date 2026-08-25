import React, { useState } from "react";
import { Camera, Upload } from "lucide-react";

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (newUrl: string) => void;
  isLiveEditMode?: boolean;
  className?: string;
  containerClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onSave,
  isLiveEditMode = false,
  className = "",
  containerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(src);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setTempUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(tempUrl);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {isLiveEditMode && (
        <div className="absolute inset-0 bg-hotel-charcoal/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-30">
          <button
            type="button"
            onClick={() => {
              setTempUrl(src);
              setIsOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-hotel-gold text-hotel-charcoal font-sans text-xs uppercase tracking-wider font-semibold rounded shadow-xl hover:scale-105 transition-transform"
          >
            <Camera className="h-4 w-4" /> Change Image
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl text-hotel-charcoal space-y-4">
            <h3 className="font-serif text-lg font-normal text-hotel-charcoal border-b border-hotel-stone/20 pb-2">
              Change Image
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-sans text-xs font-medium text-hotel-stone mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full p-2 border border-hotel-stone/30 rounded text-xs font-mono focus:border-hotel-gold focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-medium text-hotel-stone mb-1">
                  Or Upload Local File
                </label>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-hotel-gold/50 rounded-lg p-3 cursor-pointer hover:bg-hotel-sand/20 transition-colors">
                  <Upload className="h-4 w-4 text-hotel-gold" />
                  <span className="text-xs text-hotel-charcoal font-sans font-medium">Select File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {tempUrl && (
                <div className="aspect-video w-full overflow-hidden rounded border border-hotel-stone/20 bg-stone-100">
                  <img src={tempUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-hotel-stone/30 rounded text-xs font-sans hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-hotel-charcoal text-hotel-beige rounded text-xs font-sans uppercase font-semibold hover:bg-hotel-gold hover:text-hotel-charcoal transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
