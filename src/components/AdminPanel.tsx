/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  KeyRound,
  FileText,
  Image as ImageIcon,
  Phone,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  Upload,
  Plus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  getInitialCMSContent,
  saveCMSContent,
  verifyAdminPassword,
  getAdminPasswordHash,
  setAdminPassword,
  resetToDefaultPassword,
  CMSContent,
} from "../lib/cmsStore";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "legal" | "about" | "images" | "contact" | "security"
  >("legal");
  const [cms, setCms] = useState<CMSContent>(getInitialCMSContent());

  // New Gallery Item state
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryCaption, setNewGalleryCaption] = useState("");
  const [newGalleryCategory, setNewGalleryCategory] = useState<"hotel" | "city">("hotel");

  // Helper function to handle local image file upload & convert to Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Password change form states
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [showSecPassword, setShowSecPassword] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // General save toast
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCms(getInitialCMSContent());
    }
  }, [isOpen]);

  const [resetNotice, setResetNotice] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetNotice(null);
    const isValid = await verifyAdminPassword(passwordInput);
    if (isValid) {
      setIsAuthenticated(true);
      setLoginError("");
      setPasswordInput("");
    } else {
      setLoginError("Incorrect password. Please try again or click Reset below.");
    }
  };

  const handleQuickReset = async () => {
    await resetToDefaultPassword();
    setLoginError("");
    setResetNotice("Password has been reset to default: casachitic2026!");
    setPasswordInput("casachitic2026!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleSaveAll = () => {
    saveCMSContent(cms);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    const isCurrentValid = await verifyAdminPassword(currentPassInput);
    if (!isCurrentValid) {
      setSecurityMessage({ type: "error", text: "Current password is incorrect." });
      return;
    }

    if (!newPassInput || newPassInput.length < 4) {
      setSecurityMessage({ type: "error", text: "New password must be at least 4 characters long." });
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setSecurityMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    const newHash = await setAdminPassword(newPassInput);
    const updatedCms = { ...cms, adminPasswordHash: newHash };
    setCms(updatedCms);
    saveCMSContent(updatedCms);

    setSecurityMessage({
      type: "success",
      text: "Password updated successfully! It has been cryptographically hashed (SHA-256) and saved safely.",
    });
    setCurrentPassInput("");
    setNewPassInput("");
    setConfirmPassInput("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
      >
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-hotel-beige text-hotel-charcoal rounded-md overflow-hidden shadow-2xl border border-hotel-gold/30"
        >
          {/* Top Admin Header */}
          <div className="bg-hotel-charcoal px-6 py-5 flex items-center justify-between border-b border-hotel-gold/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hotel-gold/15 text-hotel-gold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-hotel-beige font-semibold tracking-wide flex items-center gap-2">
                  Casa Chitic Admin Portal
                </h2>
                <p className="font-sans text-xs text-hotel-beige/60">
                  {isAuthenticated
                    ? "Manage hotel policies, text content, and settings"
                    : "Password Protected Access"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-hotel-beige/70 hover:text-hotel-beige hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-hotel-beige/60 hover:text-hotel-beige hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isAuthenticated ? (
            /* Login Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-hotel-beige to-hotel-sand/30">
              <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-hotel-stone/30">
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 rounded-full bg-hotel-gold/10 text-hotel-gold mb-3">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-hotel-charcoal">
                    Hotel Owner Access
                  </h3>
                  <p className="font-sans text-xs text-hotel-stone mt-1">
                    Enter your admin password to manage site content.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1.5">
                      Admin Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full px-4 py-2.5 pr-10 text-sm rounded border border-hotel-stone/40 focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold transition-all"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-hotel-stone hover:text-hotel-charcoal"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="flex items-center gap-2 p-3 rounded bg-red-50 text-red-700 text-xs border border-red-200">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {resetNotice && (
                    <div className="flex items-center gap-2 p-3 rounded bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{resetNotice}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-hotel-charcoal text-hotel-beige rounded font-sans text-xs uppercase tracking-widest font-semibold hover:bg-hotel-gold hover:text-hotel-charcoal transition-all shadow-md mt-2"
                  >
                    Unlock Admin Portal
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-hotel-stone/20 text-center space-y-2">
                  <p className="text-[11px] text-hotel-stone">
                    Default password: <code className="bg-hotel-sand/50 px-1.5 py-0.5 rounded text-hotel-charcoal font-mono">casachitic2026!</code>
                  </p>
                  <button
                    type="button"
                    onClick={handleQuickReset}
                    className="text-[11px] text-hotel-gold hover:underline font-medium"
                  >
                    Forgot or lost password? Click to reset to default
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Navigation Tabs */}
              <div className="flex border-b border-hotel-stone/30 bg-hotel-sand/20 px-6 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab("legal")}
                  className={`flex items-center gap-2 py-3.5 px-4 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "legal"
                      ? "border-hotel-gold text-hotel-charcoal bg-white/60"
                      : "border-transparent text-hotel-stone hover:text-hotel-charcoal"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Terms & Privacy</span>
                </button>

                <button
                  onClick={() => setActiveTab("about")}
                  className={`flex items-center gap-2 py-3.5 px-4 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "about"
                      ? "border-hotel-gold text-hotel-charcoal bg-white/60"
                      : "border-transparent text-hotel-stone hover:text-hotel-charcoal"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>About & Hero</span>
                </button>

                <button
                  onClick={() => setActiveTab("images")}
                  className={`flex items-center gap-2 py-3.5 px-4 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "images"
                      ? "border-hotel-gold text-hotel-charcoal bg-white/60"
                      : "border-transparent text-hotel-stone hover:text-hotel-charcoal"
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Gallery & Images</span>
                </button>

                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex items-center gap-2 py-3.5 px-4 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "contact"
                      ? "border-hotel-gold text-hotel-charcoal bg-white/60"
                      : "border-transparent text-hotel-stone hover:text-hotel-charcoal"
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  <span>Hotel Contact</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-2 py-3.5 px-4 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "security"
                      ? "border-hotel-gold text-hotel-charcoal bg-white/60"
                      : "border-transparent text-hotel-stone hover:text-hotel-charcoal"
                  }`}
                >
                  <KeyRound className="h-4 w-4" />
                  <span>Security & Password</span>
                </button>
              </div>

              {/* Tab Panels */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {saveToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold">
                        All website changes have been saved and applied live!
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 1. LEGAL TAB */}
                {activeTab === "legal" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-2">
                        Terms & Conditions
                      </label>
                      <textarea
                        rows={10}
                        value={cms.termsAndConditions}
                        onChange={(e) =>
                          setCms({ ...cms, termsAndConditions: e.target.value })
                        }
                        className="w-full p-4 text-xs font-mono leading-relaxed bg-white border border-hotel-stone/40 rounded focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold"
                        placeholder="Enter hotel Terms & Conditions..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-2">
                        Privacy Policy
                      </label>
                      <textarea
                        rows={10}
                        value={cms.privacyPolicy}
                        onChange={(e) =>
                          setCms({ ...cms, privacyPolicy: e.target.value })
                        }
                        className="w-full p-4 text-xs font-mono leading-relaxed bg-white border border-hotel-stone/40 rounded focus:outline-none focus:border-hotel-gold focus:ring-1 focus:ring-hotel-gold"
                        placeholder="Enter Privacy Policy text..."
                      />
                    </div>
                  </div>
                )}

                {/* 2. ABOUT & HERO TAB */}
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Hero Title
                        </label>
                        <input
                          type="text"
                          value={cms.heroTitle}
                          onChange={(e) =>
                            setCms({ ...cms, heroTitle: e.target.value })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Hero Subtitle
                        </label>
                        <input
                          type="text"
                          value={cms.heroSubtitle}
                          onChange={(e) =>
                            setCms({ ...cms, heroSubtitle: e.target.value })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                        Hero Description
                      </label>
                      <textarea
                        rows={2}
                        value={cms.heroDescription}
                        onChange={(e) =>
                          setCms({ ...cms, heroDescription: e.target.value })
                        }
                        className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                      />
                    </div>

                    <hr className="border-hotel-stone/20" />

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                        About Us Section Title
                      </label>
                      <input
                        type="text"
                        value={cms.aboutText.title}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            aboutText: { ...cms.aboutText, title: e.target.value },
                          })
                        }
                        className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                        About Paragraph 1
                      </label>
                      <textarea
                        rows={4}
                        value={cms.aboutText.paragraph1}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            aboutText: { ...cms.aboutText, paragraph1: e.target.value },
                          })
                        }
                        className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                        About Paragraph 2
                      </label>
                      <textarea
                        rows={4}
                        value={cms.aboutText.paragraph2}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            aboutText: { ...cms.aboutText, paragraph2: e.target.value },
                          })
                        }
                        className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                      />
                    </div>
                  </div>
                )}

                {/* 2.5 IMAGES & GALLERY TAB */}
                {activeTab === "images" && (
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded border border-hotel-stone/30 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-gold flex items-center gap-1.5">
                        <ImageIcon className="h-4 w-4" />
                        Website Hero & Section Background Images
                      </h3>

                      {/* Hero Header Image */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Hero Header Background Image
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={cms.images?.heroBg || ""}
                            onChange={(e) =>
                              setCms({
                                ...cms,
                                images: { ...cms.images, heroBg: e.target.value },
                              })
                            }
                            placeholder="Image URL or upload a file..."
                            className="flex-1 p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                          />
                          <label className="flex items-center gap-1.5 px-3 py-2 bg-hotel-sand hover:bg-hotel-stone/20 text-hotel-charcoal rounded text-xs font-semibold cursor-pointer transition-colors shrink-0">
                            <Upload className="h-3.5 w-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  setCms({
                                    ...cms,
                                    images: { ...cms.images, heroBg: dataUrl },
                                  })
                                )
                              }
                            />
                          </label>
                        </div>
                        {cms.images?.heroBg && (
                          <div className="mt-2 h-20 w-36 rounded overflow-hidden border border-hotel-stone/30">
                            <img
                              src={cms.images.heroBg}
                              alt="Hero Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* About Hillside Image */}
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            About Section: Hillside Image
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={cms.images?.aboutHillside || ""}
                              onChange={(e) =>
                                setCms({
                                  ...cms,
                                  images: { ...cms.images, aboutHillside: e.target.value },
                                })
                              }
                              placeholder="Image URL or file..."
                              className="flex-1 p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                            />
                            <label className="flex items-center gap-1 px-2.5 py-2 bg-hotel-sand hover:bg-hotel-stone/20 text-hotel-charcoal rounded text-xs font-semibold cursor-pointer transition-colors shrink-0">
                              <Upload className="h-3.5 w-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (dataUrl) =>
                                    setCms({
                                      ...cms,
                                      images: { ...cms.images, aboutHillside: dataUrl },
                                    })
                                  )
                                }
                              />
                            </label>
                          </div>
                          {cms.images?.aboutHillside && (
                            <div className="mt-2 h-16 w-24 rounded overflow-hidden border border-hotel-stone/30">
                              <img
                                src={cms.images.aboutHillside}
                                alt="Hillside Preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* About Rooftops Image */}
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            About Section: Rooftops Image
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={cms.images?.aboutRooftops || ""}
                              onChange={(e) =>
                                setCms({
                                  ...cms,
                                  images: { ...cms.images, aboutRooftops: e.target.value },
                                })
                              }
                              placeholder="Image URL or file..."
                              className="flex-1 p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                            />
                            <label className="flex items-center gap-1 px-2.5 py-2 bg-hotel-sand hover:bg-hotel-stone/20 text-hotel-charcoal rounded text-xs font-semibold cursor-pointer transition-colors shrink-0">
                              <Upload className="h-3.5 w-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (dataUrl) =>
                                    setCms({
                                      ...cms,
                                      images: { ...cms.images, aboutRooftops: dataUrl },
                                    })
                                  )
                                }
                              />
                            </label>
                          </div>
                          {cms.images?.aboutRooftops && (
                            <div className="mt-2 h-16 w-24 rounded overflow-hidden border border-hotel-stone/30">
                              <img
                                src={cms.images.aboutRooftops}
                                alt="Rooftops Preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Photo Gallery Manager */}
                    <div className="bg-white p-4 rounded border border-hotel-stone/30 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-hotel-gold flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        Manage Photo Gallery Items ({cms.images?.gallery?.length || 0})
                      </h3>

                      {/* Add New Gallery Item */}
                      <div className="p-3 bg-hotel-sand/30 rounded border border-hotel-stone/20 space-y-3">
                        <p className="text-[11px] font-semibold text-hotel-charcoal uppercase tracking-wider">
                          Add New Photo to Gallery
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                          <div className="sm:col-span-5 flex gap-1.5">
                            <input
                              type="text"
                              value={newGalleryUrl}
                              onChange={(e) => setNewGalleryUrl(e.target.value)}
                              placeholder="Image URL or upload below..."
                              className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                            />
                            <label className="px-2.5 py-2 bg-hotel-sand hover:bg-hotel-stone/20 text-hotel-charcoal rounded text-xs cursor-pointer shrink-0 flex items-center justify-center">
                              <Upload className="h-3.5 w-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (dataUrl) => setNewGalleryUrl(dataUrl))
                                }
                              />
                            </label>
                          </div>

                          <input
                            type="text"
                            value={newGalleryCaption}
                            onChange={(e) => setNewGalleryCaption(e.target.value)}
                            placeholder="Caption (e.g. Traditional suite)"
                            className="sm:col-span-4 p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                          />

                          <select
                            value={newGalleryCategory}
                            onChange={(e) =>
                              setNewGalleryCategory(e.target.value as "hotel" | "city")
                            }
                            className="sm:col-span-2 p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                          >
                            <option value="hotel">Hotel</option>
                            <option value="city">City Views</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              if (!newGalleryUrl.trim()) return;
                              const newItem = {
                                id: "gal-" + Date.now(),
                                url: newGalleryUrl,
                                caption: newGalleryCaption || "Casa Chitic photo",
                                category: newGalleryCategory,
                              };
                              const updatedGallery = [newItem, ...(cms.images?.gallery || [])];
                              setCms({
                                ...cms,
                                images: { ...cms.images, gallery: updatedGallery },
                              });
                              setNewGalleryUrl("");
                              setNewGalleryCaption("");
                            }}
                            className="sm:col-span-1 py-2 bg-hotel-charcoal text-hotel-beige rounded hover:bg-hotel-gold hover:text-hotel-charcoal text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Current Gallery Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                        {(cms.images?.gallery || []).map((item, index) => (
                          <div
                            key={item.id || index}
                            className="relative group bg-hotel-sand/20 rounded p-2 border border-hotel-stone/20 flex flex-col gap-1.5"
                          >
                            <div className="h-28 w-full rounded overflow-hidden relative bg-black/10">
                              <img
                                src={item.url}
                                alt={item.caption}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const filtered = cms.images.gallery.filter(
                                    (_, i) => i !== index
                                  );
                                  setCms({
                                    ...cms,
                                    images: { ...cms.images, gallery: filtered },
                                  });
                                }}
                                className="absolute top-1.5 right-1.5 p-1 bg-red-600/80 text-white rounded hover:bg-red-700 transition-colors shadow"
                                title="Remove Image"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.caption}
                              onChange={(e) => {
                                const updated = [...cms.images.gallery];
                                updated[index] = { ...updated[index], caption: e.target.value };
                                setCms({
                                  ...cms,
                                  images: { ...cms.images, gallery: updated },
                                });
                              }}
                              className="p-1 text-[11px] bg-white border border-hotel-stone/30 rounded"
                              placeholder="Caption..."
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CONTACT TAB */}
                {activeTab === "contact" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Hotel Email Address
                        </label>
                        <input
                          type="text"
                          value={cms.contactInfo.email}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              contactInfo: { ...cms.contactInfo, email: e.target.value },
                            })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Phone Display Format
                        </label>
                        <input
                          type="text"
                          value={cms.contactInfo.phoneFormatted}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              contactInfo: {
                                ...cms.contactInfo,
                                phoneFormatted: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                        Hotel Street Address
                      </label>
                      <input
                        type="text"
                        value={cms.contactInfo.address}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            contactInfo: { ...cms.contactInfo, address: e.target.value },
                          })
                        }
                        className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Facebook Page Link
                        </label>
                        <input
                          type="text"
                          value={cms.contactInfo.facebookUrl}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              contactInfo: {
                                ...cms.contactInfo,
                                facebookUrl: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                          Instagram Page Link
                        </label>
                        <input
                          type="text"
                          value={cms.contactInfo.instagramUrl}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              contactInfo: {
                                ...cms.contactInfo,
                                instagramUrl: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2.5 text-xs bg-white border border-hotel-stone/40 rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SECURITY TAB */}
                {activeTab === "security" && (
                  <div className="max-w-md mx-auto py-4">
                    <div className="bg-white p-6 rounded border border-hotel-stone/30 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <KeyRound className="h-5 w-5 text-hotel-gold" />
                        <h4 className="font-serif text-lg text-hotel-charcoal font-semibold">
                          Change Admin Password
                        </h4>
                      </div>

                      <form onSubmit={handleChangePassword} className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal">
                              Current Password
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowSecPassword(!showSecPassword)}
                              className="text-[10px] text-hotel-gold hover:underline flex items-center gap-1"
                            >
                              {showSecPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              <span>{showSecPassword ? "Hide Passwords" : "Show Passwords"}</span>
                            </button>
                          </div>
                          <input
                            type={showSecPassword ? "text" : "password"}
                            value={currentPassInput}
                            onChange={(e) => setCurrentPassInput(e.target.value)}
                            placeholder="Current password (default: casachitic2026!)"
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded focus:outline-none focus:border-hotel-gold"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            New Password
                          </label>
                          <input
                            type={showSecPassword ? "text" : "password"}
                            value={newPassInput}
                            onChange={(e) => setNewPassInput(e.target.value)}
                            placeholder="At least 4 characters"
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded focus:outline-none focus:border-hotel-gold"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type={showSecPassword ? "text" : "password"}
                            value={confirmPassInput}
                            onChange={(e) => setConfirmPassInput(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded focus:outline-none focus:border-hotel-gold"
                            required
                          />
                        </div>

                        {securityMessage && (
                          <div
                            className={`p-3 rounded text-xs border flex items-center gap-2 ${
                              securityMessage.type === "success"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {securityMessage.type === "success" ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                            )}
                            <span>{securityMessage.text}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 bg-hotel-charcoal text-hotel-beige text-xs uppercase tracking-wider font-semibold rounded hover:bg-hotel-gold hover:text-hotel-charcoal transition-all mt-2"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Bar */}
              <div className="bg-hotel-sand/40 px-6 py-4 border-t border-hotel-stone/30 flex justify-between items-center shrink-0">
                <span className="text-[11px] text-hotel-stone font-sans">
                  Changes apply immediately upon clicking Save.
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-hotel-stone/40 text-hotel-charcoal rounded text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveAll}
                    className="flex items-center gap-2 px-5 py-2 bg-hotel-gold text-hotel-charcoal rounded text-xs font-semibold uppercase tracking-wider hover:bg-hotel-gold/80 transition-all shadow-md"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
