import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Edit2, Check, X } from "lucide-react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isLiveEditMode?: boolean;
  multiline?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  placeholder?: string;
  useModal?: boolean;
  modalLabel?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  isLiveEditMode = false,
  multiline = false,
  className = "",
  as: Component = "span",
  placeholder = "Click to edit text...",
  useModal = false,
  modalLabel = "Edit Text",
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  if (!isLiveEditMode) {
    return <Component className={className}>{children || value}</Component>;
  }

  const handleSave = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTempValue(value);
    setIsEditing(false);
  };

  const handleOpenEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempValue(value);
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleCancel();
    } else if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      e.stopPropagation();
      handleSave();
    }
  };

  if (isEditing && useModal && typeof document !== "undefined") {
    return (
      <>
        <Component className={`${className} outline-dashed outline-2 outline-hotel-gold rounded px-1 -mx-1`}>
          {children || value}
        </Component>
        {createPortal(
          <div
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl text-hotel-charcoal space-y-4 border border-hotel-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-lg font-normal text-hotel-charcoal border-b border-hotel-stone/20 pb-2">
                {modalLabel}
              </h3>
              {multiline ? (
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-3 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
                  rows={4}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-3 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
                  autoFocus
                />
              )}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-4 py-2 border border-hotel-stone/30 rounded text-xs font-sans text-hotel-charcoal hover:bg-stone-100"
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded text-xs font-sans font-semibold hover:bg-emerald-700 transition-colors shadow"
                >
                  <Check className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  if (isEditing) {
    return (
      <span
        className="relative inline-block w-full min-w-[180px] z-[100] my-1 normal-case tracking-normal text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2.5 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded shadow-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded shadow-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            autoFocus
          />
        )}
        <span className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded text-xs font-sans font-semibold hover:bg-emerald-700 transition-colors shadow-md"
          >
            <Check className="h-3.5 w-3.5" /> Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1 bg-stone-500 text-white rounded text-xs font-sans hover:bg-stone-600 transition-colors shadow-md"
          >
            <X className="h-3.5 w-3.5" /> Cancel
          </button>
        </span>
      </span>
    );
  }

  return (
    <Component
      onClick={handleOpenEdit}
      className={`${className} relative group cursor-pointer transition-all duration-200 outline-dashed outline-1 outline-hotel-gold/70 hover:outline-2 hover:outline-hotel-gold hover:bg-hotel-gold/15 rounded px-1 -mx-1`}
      title="Click to edit live on page"
    >
      {children || value || <span className="italic text-hotel-stone/60">{placeholder}</span>}
      <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 bg-hotel-gold text-hotel-charcoal text-[9px] font-sans font-bold uppercase tracking-wider rounded opacity-85 group-hover:opacity-100 transition-opacity shadow-sm align-middle">
        <Edit2 className="h-2.5 w-2.5" /> Edit
      </span>
    </Component>
  );
};
