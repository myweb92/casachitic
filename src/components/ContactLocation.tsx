/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Check,
  MessageSquare,
} from "lucide-react";
import { Language } from "../types";
import { CONTACT_INFO } from "../data";
import { getInitialCMSContent, saveCMSContent } from "../lib/cmsStore";
import { EditableText } from "./EditableText";

interface ContactLocationProps {
  lang: Language;
  isLiveEditMode?: boolean;
}

export default function ContactLocation({
  lang,
  isLiveEditMode = false,
}: ContactLocationProps) {
  const [cms, setCms] = useState(getInitialCMSContent());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleCmsUpdate = () => {
      setCms(getInitialCMSContent());
    };
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () =>
      window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const contact = cms.contactInfo || CONTACT_INFO;
  const section = cms.contactSection;

  const updateContactField = (
    field: "phone" | "email" | "address" | "website",
    newVal: string
  ) => {
    const nextContact =
      field === "phone"
        ? { ...contact, phone: newVal, phoneFormatted: newVal }
        : { ...contact, [field]: newVal };
    const copy = { ...cms, contactInfo: nextContact };
    setCms(copy);
    saveCMSContent(copy);
  };

  const updateSectionField = (
    field: keyof typeof section,
    newVal: string
  ) => {
    const copy = {
      ...cms,
      contactSection: { ...section, [field]: newVal },
    };
    setCms(copy);
    saveCMSContent(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-hotel-beige relative overflow-hidden"
      id-attr="contact-section"
    >
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-hotel-gold/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <div className="mb-3">
            <EditableText
              value={section.anchor}
              onSave={(val) => updateSectionField("anchor", val)}
              isLiveEditMode={isLiveEditMode}
              as="span"
              className="block font-sans text-xs font-semibold tracking-[0.25em] text-hotel-gold uppercase"
            />
          </div>
          <div className="mb-4">
            <EditableText
              value={section.title}
              onSave={(val) => updateSectionField("title", val)}
              isLiveEditMode={isLiveEditMode}
              as="h2"
              className="font-serif text-3xl md:text-5xl font-normal text-hotel-charcoal leading-tight tracking-wide"
            />
          </div>
          <div className="w-12 h-[2px] bg-hotel-gold mx-auto mb-6" />
          <EditableText
            value={section.subtitle}
            onSave={(val) => updateSectionField("subtitle", val)}
            isLiveEditMode={isLiveEditMode}
            multiline
            as="p"
            className="font-sans text-xs md:text-sm font-light text-hotel-stone/80 tracking-wide"
          />
        </div>

        {/* Dual Layout: Contact details/Form */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch"
          id-attr="contact-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 max-w-4xl mx-auto w-full flex flex-col justify-between gap-8"
            id-attr="contact-details-box"
          >
            {/* Contact Specs Row */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              id-attr="contact-info-cards-row"
            >
              {/* Address */}
              <div className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"ADDRESS"}
                  </h4>
                  <EditableText
                    value={contact.address}
                    onSave={(val) => updateContactField("address", val)}
                    isLiveEditMode={isLiveEditMode}
                    as="p"
                    className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold"
                  />
                </div>
              </div>

              {/* Telephone */}
              <div className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"PHONE"}
                  </h4>
                  <EditableText
                    value={contact.phoneFormatted || contact.phone}
                    onSave={(val) => updateContactField("phone", val)}
                    isLiveEditMode={isLiveEditMode}
                    as="p"
                    className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold"
                  />
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {"Click to call directly"}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"EMAIL"}
                  </h4>
                  <EditableText
                    value={contact.email}
                    onSave={(val) => updateContactField("email", val)}
                    isLiveEditMode={isLiveEditMode}
                    as="p"
                    className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold break-all"
                  />
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {"Fast email response"}
                  </span>
                </div>
              </div>

              {/* Website */}
              <a
                href={`https://${(contact.website || CONTACT_INFO.website).replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (isLiveEditMode) e.preventDefault();
                }}
                className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"WEBSITE"}
                  </h4>
                  <EditableText
                    value={contact.website || CONTACT_INFO.website}
                    onSave={(val) => updateContactField("website", val)}
                    isLiveEditMode={isLiveEditMode}
                    useModal
                    modalLabel="Edit Website Domain"
                    as="p"
                    className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold hover:text-hotel-terracotta transition-colors"
                  />
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {"Official certified domain"}
                  </span>
                </div>
              </a>
            </div>

            {/* Elegant letter message form panel */}
            <div
              className="p-6 md:p-8 rounded bg-hotel-cream border border-hotel-sand/40 text-left shadow-sm"
              id-attr="direct-message-form-panel"
            >
              <h3 className="font-serif text-lg text-hotel-charcoal mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-hotel-gold shrink-0" />
                <EditableText
                  value={section.formTitle}
                  onSave={(val) => updateSectionField("formTitle", val)}
                  isLiveEditMode={isLiveEditMode}
                  as="span"
                />
              </h3>

              {!success ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  id-attr="direct-contact-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={"Your name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-sm border border-hotel-sand bg-white px-3.5 py-2.5 text-xs text-hotel-charcoal placeholder:text-hotel-stone/40 focus:border-hotel-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder={"Your email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-sm border border-hotel-sand bg-white px-3.5 py-2.5 text-xs text-hotel-charcoal placeholder:text-hotel-stone/40 focus:border-hotel-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={
                        "Subject (e.g. Group booking query, feedback...)"
                      }
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-sm border border-hotel-sand bg-white px-3.5 py-2.5 text-xs text-hotel-charcoal placeholder:text-hotel-stone/40 focus:border-hotel-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      required
                      placeholder={"Type your detailed message here..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-sm border border-hotel-sand bg-white px-3.5 py-2.5 text-xs text-hotel-charcoal placeholder:text-hotel-stone/40 focus:border-hotel-gold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full md:w-auto bg-hotel-charcoal hover:bg-hotel-charcoal-light disabled:bg-hotel-sand text-hotel-beige rounded-sm px-6 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    id-attr="send-message-btn"
                  >
                    {isSending ? (
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-hotel-beige border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-3 w-3 text-hotel-gold" />
                        <EditableText
                          value={section.sendBtnText}
                          onSave={(val) => updateSectionField("sendBtnText", val)}
                          isLiveEditMode={isLiveEditMode}
                          useModal
                          modalLabel="Edit Send Button Label"
                          as="span"
                        />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center py-8"
                  id-attr="contact-form-success"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-base text-emerald-900 font-medium mb-1">
                    {"Message Sent!"}
                  </h4>
                  <p className="font-sans text-xs text-emerald-700 leading-relaxed mb-4 max-w-md">
                    {
                      "Thank you for reaching out! We recorded your direct message and will email a comprehensive response shortly."
                    }
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-sans font-bold text-emerald-800 hover:underline uppercase tracking-wider"
                  >
                    {"Send another message"}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
