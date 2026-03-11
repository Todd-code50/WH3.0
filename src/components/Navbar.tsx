"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Bikes", href: "#bikes" },
  { name: "Workshop", href: "#workshop" },
  { name: "Fitting", href: "#fitting" },
  { name: "Coffee", href: "#coffee" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-twh-dark/95 backdrop-blur-md border-b border-twh-gold/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-twh-gold flex items-center justify-center">
              <span className="text-twh-dark font-bold text-xl leading-none">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-twh-gold text-xs tracking-widest uppercase font-light">The</span>
              <span className="text-white text-lg font-bold tracking-[0.2em] uppercase leading-tight">
                Wheelhouse
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-twh-gold text-sm tracking-[0.15em] uppercase transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-twh-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="hidden md:block bg-twh-gold text-twh-dark px-6 py-2.5 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-twh-gold-light transition-colors duration-300"
          >
            Book Now
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-twh-gold block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-twh-gold block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-twh-gold block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-twh-dark border-t border-twh-gold/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-twh-gold text-lg tracking-[0.15em] uppercase transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-twh-gold text-twh-dark px-6 py-3 text-center text-sm font-semibold tracking-[0.15em] uppercase mt-2"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
