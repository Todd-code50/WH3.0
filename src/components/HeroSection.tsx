"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-twh-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/basso-sv-hero.jpg"
          alt="Basso SV - Sempre Veloce"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-twh-dark/90 via-twh-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-twh-dark via-transparent to-twh-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-twh-gold text-sm tracking-[0.3em] uppercase mb-4 font-light"
            >
              Now Available at The Wheelhouse
            </motion.p>

            {/* Brand Name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 text-xl md:text-2xl tracking-[0.2em] uppercase font-light mb-2"
            >
              Basso
            </motion.h2>

            {/* Model Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-2"
            >
              SV
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/50 text-lg md:text-xl tracking-[0.15em] uppercase font-light mb-8"
            >
              Sempre Veloce
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="h-0.5 bg-twh-gold mb-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-10 font-light"
            >
              Italian craftsmanship meets aerodynamic perfection. The Basso SV
              delivers uncompromising speed with race-proven engineering —
              exclusively at The Wheelhouse.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="bg-twh-gold text-twh-dark px-8 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-twh-gold-light transition-colors duration-300"
              >
                Explore the SV
              </a>
              <a
                href="#fitting"
                className="border border-white/30 text-white px-8 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase hover:border-twh-gold hover:text-twh-gold transition-colors duration-300"
              >
                Book a Fitting
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-twh-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
