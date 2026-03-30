"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type BikeFrame, formatPrice } from "../bikeData";

interface Props {
  frames: BikeFrame[];
  selected: BikeFrame | null;
  onSelect: (frame: BikeFrame) => void;
}

export default function FrameStep({ frames, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 1 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Choose Your Frame</h2>
        <p className="text-white/50 text-sm mt-1">The foundation of your build. Select a frame to get started.</p>
      </div>

      {/* Frame Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {frames.map((frame, i) => {
          const isSelected = selected?.id === frame.id;
          return (
            <motion.button
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onSelect(frame)}
              className={`relative text-left rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                isSelected
                  ? "border-twh-gold shadow-lg shadow-twh-gold/20"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/10 overflow-hidden">
                <Image
                  src={frame.image}
                  alt={`${frame.brand} ${frame.model}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-twh-dark/80 text-twh-gold text-[10px] tracking-widest uppercase px-2 py-1 rounded">
                  {frame.category}
                </span>
                {/* Selected overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-twh-gold/10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-twh-gold flex items-center justify-center">
                      <svg className="w-5 h-5 text-twh-dark" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-twh-dark-light">
                <p className="text-twh-gold text-xs tracking-widest uppercase mb-0.5">{frame.brand}</p>
                <p className="text-white text-lg font-bold tracking-wide">{frame.model}</p>
                <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{frame.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider">{frame.material}</p>
                    <p className="text-white/40 text-[10px]">{frame.weight}</p>
                  </div>
                  <p className="text-twh-gold text-lg font-bold">{formatPrice(frame.basePrice)}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
