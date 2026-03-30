"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BAR_STEM_OPTIONS,
  SADDLE_OPTIONS,
  BAR_TAPE_OPTIONS,
  CAGE_OPTIONS,
  EXTRAS_OPTIONS,
  formatPrice,
  type BarStemOption,
  type ComponentOption,
  type FinishingSelections,
} from "../bikeData";

interface Props {
  selections: FinishingSelections;
  onChange: (updated: FinishingSelections) => void;
}

const SECTIONS = [
  { id: "barStem",  label: "Bar / Stem",  subtitle: "Cockpit control — select bar width and stem length" },
  { id: "saddle",   label: "Saddle",      subtitle: "Your contact point — choose your perch" },
  { id: "barTape",  label: "Bar Tape",    subtitle: "The finishing touch on your cockpit" },
  { id: "cages",    label: "Cages",       subtitle: "Water bottle cages (price shown per cage)" },
  { id: "extras",   label: "Extras",      subtitle: "Computers, pedals, power meters and more — pick as many as you like" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function SizePicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-white/40 text-[10px] tracking-widest uppercase mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={(e) => { e.stopPropagation(); onChange(opt); }}
            className={`px-3 py-1.5 text-xs rounded border transition-all duration-200 ${
              value === opt
                ? "border-twh-gold bg-twh-gold/15 text-twh-gold font-semibold"
                : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {!value && (
        <p className="text-twh-gold/70 text-[10px] mt-1.5">↑ Please select a {label.toLowerCase()}</p>
      )}
    </div>
  );
}

function ItemCard({
  item,
  selected,
  onSelect,
  children,
}: {
  item: ComponentOption;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-lg border-2 transition-all duration-300 overflow-hidden ${
        selected
          ? "border-twh-gold shadow-md shadow-twh-gold/15 bg-twh-gold/5"
          : "border-white/10 hover:border-white/25 bg-twh-dark-light"
      }`}
    >
      <button onClick={onSelect} className="w-full text-left p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-twh-gold text-[10px] tracking-widest uppercase mb-0.5">{item.brand}</p>
            <p className="text-white font-semibold tracking-wide text-sm">{item.name}</p>
            <p className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
            {item.specs && <p className="text-white/25 text-[10px] mt-1.5">{item.specs}</p>}
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selected ? "border-twh-gold bg-twh-gold" : "border-white/30"
            }`}>
              {selected && (
                <svg className="w-3 h-3 text-twh-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-twh-gold font-bold text-sm">{formatPrice(item.price)}</p>
          </div>
        </div>
      </button>

      {children && (
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-4 pt-3 bg-twh-dark/40">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function Section({
  label,
  subtitle,
  count,
  open,
  onToggle,
  children,
}: {
  label: string;
  subtitle: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-twh-dark-light hover:bg-white/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-3 text-left">
          {count > 0 ? (
            <span className="w-6 h-6 rounded-full bg-twh-gold flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-twh-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          ) : (
            <span className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0" />
          )}
          <div>
            <p className="text-white font-bold tracking-wide text-sm uppercase">{label}</p>
            <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {count > 0 && (
            <span className="text-twh-gold text-xs font-semibold tracking-wide">
              {count} selected
            </span>
          )}
          <svg
            className={`w-4 h-4 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-white/10 bg-twh-dark/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FinishingStep({ selections, onChange }: Props) {
  const [openSection, setOpenSection] = useState<SectionId>("barStem");

  const toggleSection = (id: SectionId) =>
    setOpenSection((prev) => (prev === id ? ("" as SectionId) : id));

  const handleBarStemSelect = (item: BarStemOption) => {
    if (selections.barStem?.item.id === item.id) {
      onChange({ ...selections, barStem: null });
    } else {
      onChange({
        ...selections,
        barStem: {
          item,
          barWidth: item.barWidths[1] ?? item.barWidths[0],
          stemLength: item.stemLengths[2] ?? item.stemLengths[0],
        },
      });
    }
  };

  const handleBarStemSize = (field: "barWidth" | "stemLength", value: string) => {
    if (!selections.barStem) return;
    onChange({ ...selections, barStem: { ...selections.barStem, [field]: value } });
  };

  const toggleSingle = <K extends "saddle" | "barTape" | "cages">(
    key: K,
    item: ComponentOption
  ) => {
    onChange({ ...selections, [key]: selections[key]?.id === item.id ? null : item });
  };

  const toggleExtra = (item: ComponentOption) => {
    const exists = selections.extras.some((e) => e.id === item.id);
    onChange({
      ...selections,
      extras: exists
        ? selections.extras.filter((e) => e.id !== item.id)
        : [...selections.extras, item],
    });
  };

  const countFor = (id: SectionId): number => {
    if (id === "barStem") return selections.barStem ? 1 : 0;
    if (id === "saddle")  return selections.saddle  ? 1 : 0;
    if (id === "barTape") return selections.barTape ? 1 : 0;
    if (id === "cages")   return selections.cages   ? 1 : 0;
    if (id === "extras")  return selections.extras.length;
    return 0;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 6 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Finishing Kit</h2>
        <p className="text-white/50 text-sm mt-1">
          All sections are optional — skip any that don&apos;t apply. Extras allow multiple selections.
        </p>
      </div>

      <div className="space-y-3 max-w-4xl">
        {SECTIONS.map((section) => (
          <Section
            key={section.id}
            label={section.label}
            subtitle={section.subtitle}
            count={countFor(section.id)}
            open={openSection === section.id}
            onToggle={() => toggleSection(section.id)}
          >
            {section.id === "barStem" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {BAR_STEM_OPTIONS.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selections.barStem?.item.id === item.id}
                    onSelect={() => handleBarStemSelect(item)}
                  >
                    <SizePicker
                      label="Bar Width"
                      options={item.barWidths}
                      value={selections.barStem?.barWidth ?? ""}
                      onChange={(v) => handleBarStemSize("barWidth", v)}
                    />
                    <SizePicker
                      label="Stem Length"
                      options={item.stemLengths}
                      value={selections.barStem?.stemLength ?? ""}
                      onChange={(v) => handleBarStemSize("stemLength", v)}
                    />
                  </ItemCard>
                ))}
              </div>
            )}

            {section.id === "saddle" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {SADDLE_OPTIONS.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selections.saddle?.id === item.id}
                    onSelect={() => toggleSingle("saddle", item)}
                  />
                ))}
              </div>
            )}

            {section.id === "barTape" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {BAR_TAPE_OPTIONS.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selections.barTape?.id === item.id}
                    onSelect={() => toggleSingle("barTape", item)}
                  />
                ))}
              </div>
            )}

            {section.id === "cages" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {CAGE_OPTIONS.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selections.cages?.id === item.id}
                    onSelect={() => toggleSingle("cages", item)}
                  />
                ))}
              </div>
            )}

            {section.id === "extras" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {EXTRAS_OPTIONS.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selections.extras.some((e) => e.id === item.id)}
                    onSelect={() => toggleExtra(item)}
                  />
                ))}
              </div>
            )}
          </Section>
        ))}
      </div>
    </div>
  );
}
