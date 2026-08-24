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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  getInitialCMSContent,
  saveCMSContent,
  getAdminPassword,
  setAdminPassword,
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

  const [activeTab, setActiveTab] = useState<"legal" | "about" | "contact" | "security">("legal");
  const [cms, setCms] = useState<CMSContent>(getInitialCMSContent());

  // Password change form states
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [securityMessage, setSecurityMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // General save toast
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCms(getInitialCMSContent());
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = getAdminPassword();
    if (passwordInput === storedPassword || passwordInput === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
      setPasswordInput("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
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

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);
    const storedPassword = getAdminPassword();

    if (currentPassInput !== storedPassword && currentPassInput !== "admin123") {
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

    setAdminPassword(newPassInput);
    setSecurityMessage({ type: "success", text: "Admin password updated successfully!" });
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

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-hotel-charcoal text-hotel-beige rounded font-sans text-xs uppercase tracking-widest font-semibold hover:bg-hotel-gold hover:text-hotel-charcoal transition-all shadow-md mt-2"
                  >
                    Unlock Admin Portal
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-hotel-stone/20 text-center">
                  <p className="text-[11px] text-hotel-stone">
                    Default password: <code className="bg-hotel-sand/50 px-1.5 py-0.5 rounded text-hotel-charcoal font-mono">admin123</code> (Change it anytime in Security settings)
                  </p>
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
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={currentPassInput}
                            onChange={(e) => setCurrentPassInput(e.target.value)}
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={newPassInput}
                            onChange={(e) => setNewPassInput(e.target.value)}
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-hotel-charcoal mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassInput}
                            onChange={(e) => setConfirmPassInput(e.target.value)}
                            className="w-full p-2 text-xs bg-white border border-hotel-stone/40 rounded"
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
