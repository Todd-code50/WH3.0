"use client";

import { motion } from "framer-motion";
import { type ComponentOption, formatPrice } from "../bikeData";

interface Props {
  option: ComponentOption;
  isSelected: boolean;
  index: number;
  onSelect: (option: ComponentOption) => void;
}

export default function ComponentCard({ option, isSelected, index, onSelect }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => onSelect(option)}
      className={`relative text-left rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
        isSelected
          ? "border-twh-gold shadow-lg shadow-twh-gold/20"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full transition-all duration-300 ${isSelected ? "bg-twh-gold" : "bg-white/10 group-hover:bg-white/20"}`} />

      <div className="p-5 bg-twh-dark-light">
        {/* Brand + selected indicator */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-twh-gold text-[10px] tracking-widest uppercase font-semibold">{option.brand}</span>
          {isSelected && (
            <div className="w-5 h-5 rounded-full bg-twh-gold flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-twh-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <h3 className="text-white text-base font-bold tracking-wide leading-tight mb-2">{option.name}</h3>
        <p className="text-white/50 text-xs leading-relaxed mb-4">{option.description}</p>

        {/* Specs */}
        {option.specs && (
          <p className="text-white/30 text-[10px] tracking-wide border-t border-white/10 pt-3 mb-3">
            {option.specs}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-white/30 text-xs uppercase tracking-wider">Price</span>
          <span className={`text-lg font-bold ${isSelected ? "text-twh-gold" : "text-white"}`}>
            {formatPrice(option.price)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
