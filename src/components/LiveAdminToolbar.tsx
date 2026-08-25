import React from "react";
import { Shield, Sparkles, Settings, LogOut, CheckCircle2 } from "lucide-react";

interface LiveAdminToolbarProps {
  isLiveEditMode: boolean;
  onToggleLiveEdit: () => void;
  onOpenAdminPanel: () => void;
  onLogout: () => void;
}

export const LiveAdminToolbar: React.FC<LiveAdminToolbarProps> = ({
  isLiveEditMode,
  onToggleLiveEdit,
  onOpenAdminPanel,
  onLogout,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] bg-hotel-charcoal/95 backdrop-blur-md text-hotel-beige border-b border-hotel-gold/30 px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-serif text-sm text-hotel-gold font-normal">
          <Shield className="h-4 w-4 text-hotel-gold" />
          Casa Chitic Admin Session
        </span>
        <span className="hidden sm:inline-block text-[11px] text-hotel-sand/70 border-l border-white/20 pl-3">
          On-Page Live Website Editor
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggle button */}
        <button
          type="button"
          onClick={onToggleLiveEdit}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md ${
            isLiveEditMode
              ? "bg-hotel-gold text-hotel-charcoal ring-2 ring-hotel-gold/50"
              : "bg-white/10 text-hotel-beige hover:bg-white/20"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Live Edit Mode: {isLiveEditMode ? "ACTIVE (Click items to edit)" : "OFF"}</span>
          {isLiveEditMode && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800" />}
        </button>

        <button
          type="button"
          onClick={onOpenAdminPanel}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-hotel-sand/20 hover:bg-hotel-gold hover:text-hotel-charcoal text-hotel-beige rounded transition-colors"
          title="Open Full CMS Admin Drawer"
        >
          <Settings className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Admin Drawer</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-red-900/40 hover:bg-red-800 text-red-200 rounded transition-colors"
          title="Log out of Admin session"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};
