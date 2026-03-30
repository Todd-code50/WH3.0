"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BikeFrame, ColorOption } from "../../configurator/bikeData";

interface Props {
  frames: BikeFrame[];
  onChange: (frames: BikeFrame[]) => void;
}

const BLANK_FRAME: BikeFrame = {
  id: "",
  brand: "",
  model: "",
  category: "Road",
  description: "",
  basePrice: 0,
  image: "",
  material: "",
  weight: "",
  colors: [],
};

const BLANK_COLOR: ColorOption = {
  id: "",
  name: "",
  hex: "#000000",
  price: 0,
};

export default function FrameEditor({ frames, onChange }: Props) {
  const [editing, setEditing] = useState<BikeFrame | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [colorDraft, setColorDraft] = useState<ColorOption>(BLANK_COLOR);
  const [expandedColors, setExpandedColors] = useState(false);

  const openNew = () => {
    setEditing({ ...BLANK_FRAME, id: `frame-${Date.now()}` });
    setIsNew(true);
    setExpandedColors(false);
  };

  const openEdit = (frame: BikeFrame) => {
    setEditing({ ...frame, colors: [...frame.colors] });
    setIsNew(false);
    setExpandedColors(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this frame?")) {
      onChange(frames.filter((f) => f.id !== id));
    }
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.brand || !editing.model) {
      alert("Brand and model are required.");
      return;
    }
    if (isNew) {
      onChange([...frames, editing]);
    } else {
      onChange(frames.map((f) => (f.id === editing.id ? editing : f)));
    }
    setEditing(null);
  };

  const addColor = () => {
    if (!editing) return;
    if (!colorDraft.name || !colorDraft.hex) {
      alert("Color name and hex are required.");
      return;
    }
    const newColor = { ...colorDraft, id: `color-${Date.now()}` };
    setEditing({ ...editing, colors: [...editing.colors, newColor] });
    setColorDraft(BLANK_COLOR);
  };

  const removeColor = (colorId: string) => {
    if (!editing) return;
    setEditing({ ...editing, colors: editing.colors.filter((c) => c.id !== colorId) });
  };

  const field = (label: string, value: string | number, key: keyof BikeFrame, type = "text") => (
    <div>
      <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (!editing) return;
          const val = type === "number" ? Number(e.target.value) : e.target.value;
          setEditing({ ...editing, [key]: val });
        }}
        className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200"
      />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold tracking-wide uppercase">Frames</h2>
          <p className="text-white/40 text-sm mt-0.5">{frames.length} frames configured</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-twh-gold text-twh-dark text-sm font-bold tracking-widest uppercase hover:bg-twh-gold-light transition-all duration-300 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Frame
        </button>
      </div>

      {/* Frame list */}
      <div className="grid gap-4">
        {frames.map((frame) => (
          <motion.div
            key={frame.id}
            layout
            className="flex items-center gap-4 bg-twh-dark-light border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-200"
          >
            {/* Image preview */}
            <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
              {frame.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={frame.image} alt={frame.model} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-twh-gold text-[10px] tracking-widest uppercase">{frame.brand}</span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="text-white/40 text-[10px] uppercase tracking-wider">{frame.category}</span>
              </div>
              <p className="text-white font-semibold tracking-wide truncate">{frame.model}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-twh-gold text-sm font-bold">${frame.basePrice.toLocaleString()}</span>
                <span className="text-white/30 text-xs">{frame.colors.length} colours</span>
                <span className="text-white/30 text-xs">{frame.material}</span>
              </div>
            </div>

            {/* Color swatches preview */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {frame.colors.slice(0, 5).map((c) => (
                <span
                  key={c.id}
                  title={c.name}
                  className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {frame.colors.length > 5 && (
                <span className="text-white/30 text-[10px] ml-1">+{frame.colors.length - 5}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(frame)}
                className="px-3 py-1.5 border border-white/20 text-white/60 text-xs tracking-widest uppercase hover:border-twh-gold hover:text-twh-gold transition-all duration-200 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(frame.id)}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-2xl bg-twh-dark border border-white/15 rounded-xl shadow-2xl my-6"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h3 className="text-white text-lg font-bold tracking-wide uppercase">
                  {isNew ? "Add New Frame" : `Edit — ${editing.brand} ${editing.model}`}
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
                {/* Basic fields */}
                <div className="grid grid-cols-2 gap-4">
                  {field("Brand", editing.brand, "brand")}
                  {field("Model", editing.model, "model")}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Category</label>
                    <select
                      value={editing.category}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-twh-gold transition-colors duration-200"
                    >
                      {["Road", "Gravel", "MTB", "Track", "Cyclocross"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  {field("Base Price (AUD)", editing.basePrice, "basePrice", "number")}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {field("Material", editing.material, "material")}
                  {field("Weight", editing.weight, "weight")}
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Description</label>
                  <textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={3}
                    className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editing.image}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200"
                  />
                  {editing.image && (
                    <div className="mt-2 h-24 rounded-lg overflow-hidden bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={editing.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Colours section */}
                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => setExpandedColors(!expandedColors)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="text-white font-semibold text-sm tracking-wide">
                      Colour Options
                      <span className="ml-2 text-white/40 text-xs font-normal">({editing.colors.length})</span>
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/40 transition-transform duration-200 ${expandedColors ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {expandedColors && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-2">
                          {editing.colors.map((c) => (
                            <div key={c.id} className="flex items-center gap-3 bg-twh-dark-light rounded-lg px-3 py-2">
                              <span className="w-6 h-6 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                              <span className="text-white text-sm flex-1">{c.name}</span>
                              <span className="text-white/40 text-xs">{c.price > 0 ? `+$${c.price}` : "Included"}</span>
                              <button onClick={() => removeColor(c.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add colour row */}
                        <div className="mt-3 flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-white/30 text-[10px] tracking-widest uppercase mb-1">Name</label>
                            <input
                              type="text"
                              value={colorDraft.name}
                              onChange={(e) => setColorDraft({ ...colorDraft, name: e.target.value })}
                              placeholder="e.g. Gloss Black"
                              className="w-full bg-twh-dark border border-white/15 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 outline-none focus:border-twh-gold transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-white/30 text-[10px] tracking-widest uppercase mb-1">Hex</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={colorDraft.hex}
                                onChange={(e) => setColorDraft({ ...colorDraft, hex: e.target.value })}
                                className="w-10 h-9 rounded cursor-pointer bg-transparent border-0"
                              />
                              <input
                                type="text"
                                value={colorDraft.hex}
                                onChange={(e) => setColorDraft({ ...colorDraft, hex: e.target.value })}
                                className="w-24 bg-twh-dark border border-white/15 rounded-lg px-2 py-2 text-white text-sm font-mono outline-none focus:border-twh-gold transition-colors"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-white/30 text-[10px] tracking-widest uppercase mb-1">Premium ($)</label>
                            <input
                              type="number"
                              value={colorDraft.price}
                              onChange={(e) => setColorDraft({ ...colorDraft, price: Number(e.target.value) })}
                              className="w-20 bg-twh-dark border border-white/15 rounded-lg px-2 py-2 text-white text-sm outline-none focus:border-twh-gold transition-colors"
                            />
                          </div>
                          <button
                            onClick={addColor}
                            className="px-4 py-2 bg-twh-gold/20 text-twh-gold border border-twh-gold/30 text-xs tracking-widest uppercase hover:bg-twh-gold hover:text-twh-dark transition-all duration-200 rounded-lg"
                          >
                            Add
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                  {isNew ? "Add Frame" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
