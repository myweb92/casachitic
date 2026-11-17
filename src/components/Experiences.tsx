import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Landmark,
  ShieldCheck,
  Snowflake,
  Tv,
  Flower,
  Car,
} from "lucide-react";
import {
  getInitialCMSContent,
  saveCMSContent,
  ExperienceIconName,
  CMSExperienceItem,
} from "../lib/cmsStore";
import { EditableText } from "./EditableText";

interface ExperiencesProps {
  isLiveEditMode?: boolean;
}

const renderIcon = (iconName: ExperienceIconName) => {
  const cls = "w-[18px] h-[18px] text-[#A67C52]";
  switch (iconName) {
    case "Landmark":
      return <Landmark className={cls} />;
    case "ShieldCheck":
      return <ShieldCheck className={cls} />;
    case "Snowflake":
      return <Snowflake className={cls} />;
    case "Tv":
      return <Tv className={cls} />;
    case "Flower":
      return <Flower className={cls} />;
    case "Car":
      return <Car className={cls} />;
    default:
      return <Landmark className={cls} />;
  }
};

export default function Experiences({ isLiveEditMode = false }: ExperiencesProps) {
  const [cms, setCms] = useState(getInitialCMSContent());

  useEffect(() => {
    const handleCmsUpdate = () => setCms(getInitialCMSContent());
    window.addEventListener("casachitic_cms_updated", handleCmsUpdate);
    return () => window.removeEventListener("casachitic_cms_updated", handleCmsUpdate);
  }, []);

  const section = cms.experiencesSection;
  const experiences = cms.experiences || [];

  const updateSection = (field: "anchor" | "title" | "subtitle", val: string) => {
    const copy = {
      ...cms,
      experiencesSection: { ...section, [field]: val },
    };
    setCms(copy);
    saveCMSContent(copy);
  };

  const updateExperience = (
    idx: number,
    field: keyof CMSExperienceItem,
    val: string
  ) => {
    const next = [...experiences];
    next[idx] = { ...next[idx], [field]: val };
    const copy = { ...cms, experiences: next };
    setCms(copy);
    saveCMSContent(copy);
  };

  return (
    <section id="experiences" className="bg-[#F5F2ED] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
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
          <div className="max-w-lg mx-auto">
            <EditableText
              value={section.subtitle}
              onSave={(val) => updateSection("subtitle", val)}
              isLiveEditMode={isLiveEditMode}
              multiline
              as="p"
              className="font-sans text-xs text-neutral-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 border border-[#DED9D2] shadow-sm transition-colors duration-300 hover:border-[#A67C52] relative overflow-hidden group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full border border-[#A67C52] flex items-center justify-center shrink-0">
                  {renderIcon(exp.iconName)}
                </div>
                <span className="font-sans text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[#EBE7E0] border border-[#DED9D2] rounded text-neutral-600">
                  <EditableText
                    value={exp.badge}
                    onSave={(val) => updateExperience(idx, "badge", val)}
                    isLiveEditMode={isLiveEditMode}
                    useModal
                    modalLabel="Edit Experience Badge"
                    as="span"
                  />
                </span>
              </div>
              <div className="mt-2 mb-2">
                <EditableText
                  value={exp.title}
                  onSave={(val) => updateExperience(idx, "title", val)}
                  isLiveEditMode={isLiveEditMode}
                  as="h3"
                  className="font-serif text-base md:text-lg font-medium text-[#1A1A1A]"
                />
              </div>
              <EditableText
                value={exp.desc}
                onSave={(val) => updateExperience(idx, "desc", val)}
                isLiveEditMode={isLiveEditMode}
                multiline
                as="p"
                className="font-sans text-xs leading-relaxed text-neutral-600"
              />

              {/* Hover Animation (Bottom Line) */}
              <div className="absolute bottom-0 left-0 h-[1px] w-1/3 bg-[#DED9D2] transition-all duration-500 group-hover:w-full group-hover:bg-[#A67C52]/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
