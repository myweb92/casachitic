/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Check,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Language } from "../types";
import { CONTACT_INFO } from "../data";

interface ContactLocationProps {
  lang: Language;
}

export default function ContactLocation({ lang }: ContactLocationProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    // Simulate sending inquiry API proxy
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
          <span className="block font-sans text-xs font-semibold tracking-[0.25em] text-hotel-gold uppercase mb-3">
            {"LOCATION & RESERVATIONS"}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-hotel-charcoal leading-tight tracking-wide mb-4">
            {"Contact & Location"}
          </h2>
          <div className="w-12 h-[2px] bg-hotel-gold mx-auto mb-6" />
          <p className="font-sans text-xs md:text-sm font-light text-hotel-stone/80 tracking-wide">
            {
              "Perfectly centered in old Brașov, ready to accommodate your exceptional Transylvanian journey."
            }
          </p>
        </div>

        {/* Dual Layout: Map + Contact details/Form */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch"
          id-attr="contact-grid"
        >
          {/* Right Side: Contact Cards + Letter Message Form (lg:col-span-6) */}
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
              <a
                href="https://www.google.com/maps/place/Hotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7/@45.6413547,25.5908935,17z/data=!4m21!1m11!3m10!1s0x40b35b2ea02a0bb5:0x6ef2f837aa20b6b!2sHotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7!5m2!4m1!1i2!8m2!3d45.6413665!4d25.5906935!10e5!16s%2Fg%2F11j20fdtxw!3m8!1s0x40b35b2ea02a0bb5:0x6ef2f837aa20b6b!5m2!4m1!1i2!8m2!3d45.6413665!4d25.5906935!16s%2Fg%2F11j20fdtxw?entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"ADDRESS"}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold group-hover:text-hotel-terracotta transition-colors">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </a>

              {/* Telephone */}
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\./g, "")}`}
                className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"PHONE"}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold hover:text-hotel-terracotta transition-colors">
                    {CONTACT_INFO.phoneFormatted}
                  </p>
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {"Click to call directly"}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"EMAIL"}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold hover:text-hotel-terracotta transition-colors break-all">
                    {CONTACT_INFO.email}
                  </p>
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {"Fast email response"}
                  </span>
                </div>
              </a>

              {/* Website */}
              <a
                href={`https://${CONTACT_INFO.website}`}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {"WEBSITE"}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold hover:text-hotel-terracotta transition-colors">
                    {CONTACT_INFO.website}
                  </p>
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
                <MessageSquare className="h-4 w-4 text-hotel-gold" />
                {"Send us a direct message"}
              </h3>

              {!success ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  id-attr="direct-contact-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
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
                    {/* Email */}
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

                  {/* Subject */}
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

                  {/* Message body */}
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

                  {/* Submit buttons */}
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
                        <span>{"SEND MESSAGE"}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Prompt feedback */
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
