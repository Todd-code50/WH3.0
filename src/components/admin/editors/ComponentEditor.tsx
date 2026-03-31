"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentOption } from "../../configurator/bikeData";
import type { AdminSection } from "../adminStore";
import ImageInput from "../ImageInput";

interface Props {
  section: AdminSection;
  items: ComponentOption[];
  onChange: (items: ComponentOption[]) => void;
}

const SECTION_META: Record<AdminSection, { label: string; icon: string; priceSuffix: string }> = {
  frames:    { label: "Frames",        icon: "🚴", priceSuffix: "frame" },
  groupsets: { label: "Groupsets",     icon: "⚙️", priceSuffix: "groupset" },
  wheels:    { label: "Wheels",        icon: "⭕", priceSuffix: "wheelset" },
  tyres:     { label: "Tyres",         icon: "🔘", priceSuffix: "pair" },
  finishing: { label: "Finishing Kit", icon: "🔧", priceSuffix: "kit" },
};

const BLANK: ComponentOption = {
  id: "",
  brand: "",
  name: "",
  description: "",
  price: 0,
  specs: "",
  image: "",
};

export default function ComponentEditor({ section, items, onChange }: Props) {
  const [editing, setEditing] = useState<ComponentOption | null>(null);
  const [isNew, setIsNew] = useState(false);
  const meta = SECTION_META[section];

  const openNew = () => {
    setEditing({ ...BLANK, id: `${section}-${Date.now()}` });
    setIsNew(true);
  };

  const openEdit = (item: ComponentOption) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this item?")) {
      onChange(items.filter((i) => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.brand || !editing.name) {
      alert("Brand and name are required.");
      return;
    }
    if (isNew) {
      onChange([...items, editing]);
    } else {
      onChange(items.map((i) => (i.id === editing.id ? editing : i)));
    }
    setEditing(null);
  };

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const handleMoveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  const field = (label: string, key: keyof ComponentOption, type = "text", placeholder = "") => (
    <div>
      <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">{label}</label>
      <input
        type={type}
        value={(editing?.[key] as string | number) ?? ""}
        onChange={(e) => {
          if (!editing) return;
          const val = type === "number" ? Number(e.target.value) : e.target.value;
          setEditing({ ...editing, [key]: val });
        }}
        placeholder={placeholder}
        className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200"
      />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold tracking-wide uppercase">
            {meta.icon} {meta.label}
          </h2>
          <p className="text-white/40 text-sm mt-0.5">{items.length} options configured</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-twh-gold text-twh-dark text-sm font-bold tracking-widest uppercase hover:bg-twh-gold-light transition-all duration-300 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add {meta.label.replace(/s$/, "")}
        </button>
      </div>

      {/* Items list */}
      <div className="grid gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            className="flex items-center gap-4 bg-twh-dark-light border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-200"
          >
            {/* Reorder buttons */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button
                onClick={() => handleMoveUp(idx)}
                disabled={idx === 0}
                className="w-6 h-5 flex items-center justify-center text-white/20 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => handleMoveDown(idx)}
                disabled={idx === items.length - 1}
                className="w-6 h-5 flex items-center justify-center text-white/20 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-twh-gold text-[10px] tracking-widest uppercase">{item.brand}</span>
              </div>
              <p className="text-white font-semibold tracking-wide truncate">{item.name}</p>
              {item.specs && <p className="text-white/30 text-xs mt-0.5 truncate">{item.specs}</p>}
            </div>

            {/* Price */}
            <div className="flex-shrink-0 text-right">
              <p className="text-twh-gold font-bold">${item.price.toLocaleString()}</p>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">per {meta.priceSuffix}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(item)}
                className="px-3 py-1.5 border border-white/20 text-white/60 text-xs tracking-widest uppercase hover:border-twh-gold hover:text-twh-gold transition-all duration-200 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 border border-red-500/20 text-red-400/50 text-xs tracking-widest uppercase hover:border-red-500/50 hover:text-red-400 transition-all duration-200 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit / Add modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-lg bg-twh-dark border border-white/15 rounded-xl shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h3 className="text-white text-lg font-bold tracking-wide uppercase">
                  {isNew ? `Add ${meta.label.replace(/s$/, "")}` : `Edit — ${editing.brand} ${editing.name}`}
                </h3>
                <button
                  onClick={() => setEditing(null)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {field("Brand", "brand", "text", "e.g. Shimano")}
                  {field("Name", "name", "text", "e.g. Dura-Ace Di2 R9200")}
                </div>
                {field("Price (AUD)", "price", "number")}
                <div>
                  <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Description</label>
                  <textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={3}
                    className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200 resize-none"
                  />
                </div>
                {field("Specs / Details", "specs", "text", "e.g. 12-speed | 50/34T | Di2 Electronic")}
                <ImageInput
                  label="Image (optional)"
                  value={editing.image ?? ""}
                  onChange={(val) => setEditing({ ...editing, image: val })}
                />
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
                <button
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 border border-white/20 text-white/60 text-sm tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-twh-gold text-twh-dark text-sm font-bold tracking-widest uppercase hover:bg-twh-gold-light transition-all duration-300 rounded"
                >
                  {isNew ? `Add ${meta.label.replace(/s$/, "")}` : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
