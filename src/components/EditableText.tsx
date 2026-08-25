import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isLiveEditMode?: boolean;
  multiline?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  placeholder?: string;
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
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  if (!isLiveEditMode) {
    return <Component className={className}>{children || value}</Component>;
  }

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span className="relative inline-block w-full z-[100] my-1">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2.5 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded shadow-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 bg-white text-hotel-charcoal border-2 border-hotel-gold rounded shadow-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hotel-gold"
            autoFocus
          />
        )}
        <span className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleSave()}
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
      onClick={() => {
        setTempValue(value);
        setIsEditing(true);
      }}
      className={`${className} relative group cursor-pointer transition-all duration-200 outline-dashed outline-1 outline-hotel-gold/60 hover:outline-2 hover:outline-hotel-gold hover:bg-hotel-gold/15 rounded px-1 -mx-1`}
      title="Click to edit live on page"
    >
      {children || value || <span className="italic text-hotel-stone/60">{placeholder}</span>}
      <span className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 bg-hotel-gold text-hotel-charcoal text-[10px] font-sans font-semibold rounded opacity-80 group-hover:opacity-100 transition-opacity shadow-sm">
        <Edit2 className="h-2.5 w-2.5" /> Edit
      </span>
    </Component>
  );
};
