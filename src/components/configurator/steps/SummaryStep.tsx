"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type BuildState, formatPrice } from "../bikeData";

interface Props {
  build: BuildState;
  total: number;
  onReset: () => void;
}

interface LineItem {
  label: string;
  value: string;
  price: number;
  sub?: string;
}

export default function SummaryStep({ build, total, onReset }: Props) {
  const lineItems: LineItem[] = [
    {
      label: "Frame",
      value: `${build.frame?.brand} ${build.frame?.model}`,
      price: build.frame?.basePrice ?? 0,
      sub: build.frame?.material,
    },
    {
      label: "Colour",
      value: build.color?.name ?? "",
      price: build.color?.price ?? 0,
      sub: build.color?.price ? "Colour premium" : "Standard colourway",
    },
    {
      label: "Groupset",
      value: `${build.groupset?.brand} ${build.groupset?.name}`,
      price: build.groupset?.price ?? 0,
      sub: build.groupset?.specs,
    },
    {
      label: "Wheels",
      value: `${build.wheels?.brand} ${build.wheels?.name}`,
      price: build.wheels?.price ?? 0,
      sub: build.wheels?.specs,
    },
    {
      label: "Tyres",
      value: `${build.tyres?.brand} ${build.tyres?.name}`,
      price: build.tyres?.price ?? 0,
      sub: build.tyres?.specs,
    },
    {
      label: "Finishing Kit",
      value: `${build.finishing?.brand} ${build.finishing?.name}`,
      price: build.finishing?.price ?? 0,
      sub: build.finishing?.specs,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── HERO BIKE IMAGE ──────────────────────────────────────── */}
      {build.frame && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full overflow-hidden"
          style={{ height: "360px" }}
        >
          <Image
            src={build.frame.image}
            alt={`${build.frame.brand} ${build.frame.model}`}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
            priority
          />
          {/* Gradient overlay — dark at bottom so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-twh-dark via-twh-dark/40 to-transparent" />

          {/* Colour accent bar at very bottom of image */}
          {build.color && (
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: build.color.hex }}
            />
          )}

          {/* Frame name overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">
                {build.frame.brand}
              </p>
              <h2 className="text-white text-4xl font-bold tracking-wide uppercase leading-tight">
                {build.frame.model}
              </h2>
              {build.color && (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: build.color.hex }}
                  />
                  <span className="text-white/60 text-sm tracking-wide">{build.color.name}</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Build total badge — top right */}
          <div className="absolute top-6 right-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-twh-dark/80 backdrop-blur-sm border border-twh-gold/40 rounded-lg px-4 py-3 text-right"
            >
              <p className="text-white/50 text-[10px] tracking-widest uppercase">Build Total</p>
              <p className="text-twh-gold text-2xl font-bold">{formatPrice(total)}</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── BUILD DETAILS ────────────────────────────────────────── */}
      <div className="p-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Complete Build Specification</p>
          <h3 className="text-white text-xl font-bold tracking-wide uppercase">Your Build</h3>
        </motion.div>

        {/* Line items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-twh-dark-light rounded-lg border border-white/10 overflow-hidden mb-6"
        >
          {lineItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-start justify-between p-5 ${
                i < lineItems.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex-1">
                <p className="text-white/40 text-[10px] tracking-widest uppercase mb-0.5">{item.label}</p>
                <p className="text-white font-semibold tracking-wide">{item.value}</p>
                {item.sub && <p className="text-white/30 text-xs mt-0.5">{item.sub}</p>}
              </div>
              <p className={`text-base font-bold ml-4 flex-shrink-0 ${item.price > 0 ? "text-white" : "text-white/30"}`}>
                {item.price > 0 ? formatPrice(item.price) : "—"}
              </p>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between p-5 bg-twh-gold/10 border-t-2 border-twh-gold/30">
            <div>
              <p className="text-twh-gold text-xs tracking-widest uppercase font-semibold">Total Build Price</p>
              <p className="text-white/40 text-xs mt-0.5">Includes frame, components & finishing</p>
            </div>
            <p className="text-twh-gold text-3xl font-bold">{formatPrice(total)}</p>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/30 text-xs text-center mb-8 leading-relaxed"
        >
          Prices are indicative and subject to availability. Our team will confirm final pricing and lead times.
          <br />
          Build & labour costs are additional — ask our workshop team for a quote.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-twh-gold text-twh-gold text-sm font-bold tracking-widest uppercase hover:bg-twh-gold hover:text-twh-dark transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Build Sheet
          </button>

          <a
            href="mailto:hello@thewheelhouse.com.au?subject=Bike Build Enquiry"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-twh-gold text-twh-dark text-sm font-bold tracking-widest uppercase hover:bg-twh-gold-light transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enquire About This Build
          </a>
        </motion.div>

        {/* Start over */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={onReset}
            className="text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors duration-300 underline underline-offset-4"
          >
            Start a new build
          </button>
        </motion.div>
      </div>
    </div>
  );
}
