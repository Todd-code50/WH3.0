"use client";

import { motion } from "framer-motion";
import { type BikeFrame, type ColorOption, formatPrice } from "../bikeData";

interface Props {
  frame: BikeFrame;
  selected: ColorOption | null;
  onSelect: (color: ColorOption) => void;
}

export default function ColorStep({ frame, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 2 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Choose Your Colour</h2>
        <p className="text-white/50 text-sm mt-1">
          {frame.brand} {frame.model} — {frame.colors.length} colourways available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {frame.colors.map((color, i) => {
          const isSelected = selected?.id === color.id;
          return (
            <motion.button
              key={color.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onSelect(color)}
              className={`relative text-left rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                isSelected
                  ? "border-twh-gold shadow-lg shadow-twh-gold/20"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Color swatch */}
              <div
                className="h-40 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20" />

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-twh-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Premium badge */}
                {color.price > 0 && (
                  <span className="absolute top-3 right-3 bg-twh-gold text-twh-dark text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-twh-dark-light flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-white font-semibold tracking-wide">{color.name}</p>
                </div>
                <p className={`text-sm font-bold ${color.price > 0 ? "text-twh-gold" : "text-white/40"}`}>
                  {color.price > 0 ? `+${formatPrice(color.price)}` : "Included"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected preview */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-twh-dark-light rounded-lg border border-twh-gold/20 flex items-center gap-4"
        >
          <div
            className="w-12 h-12 rounded-lg border-2 border-twh-gold/40 flex-shrink-0"
            style={{ backgroundColor: selected.hex }}
          />
          <div>
            <p className="text-white font-bold tracking-wide">{selected.name}</p>
            <p className="text-white/40 text-xs">
              {frame.brand} {frame.model} ·{" "}
              {selected.price > 0 ? `+${formatPrice(selected.price)} colour premium` : "Standard colourway"}
            </p>
          </div>
          <div className="ml-auto">
            <svg className="w-5 h-5 text-twh-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
}
