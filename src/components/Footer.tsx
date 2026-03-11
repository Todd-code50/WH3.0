"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "Bikes", href: "#bikes" },
    { name: "Components", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Apparel", href: "#" },
  ],
  services: [
    { name: "Bike Fitting", href: "#fitting" },
    { name: "Workshop", href: "#workshop" },
    { name: "Servicing", href: "#" },
    { name: "Custom Builds", href: "#" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Coffee Bar", href: "#coffee" },
    { name: "Events", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={footerRef}
      className="bg-twh-dark text-white pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-twh-gold flex items-center justify-center">
                <span className="text-twh-dark font-bold text-xl leading-none">W</span>
              </div>
              <div className="flex flex-col">
                <span className="text-twh-gold text-xs tracking-widest uppercase font-light">The</span>
                <span className="text-white text-lg font-bold tracking-[0.2em] uppercase leading-tight">
                  Wheelhouse
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
              Bikes + Workshop + Coffee
              <br />
              Your one-stop destination for everything cycling.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {["Instagram", "Facebook", "Strava"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-twh-gold hover:border-twh-gold transition-colors duration-300 text-xs uppercase tracking-wider"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (colIndex + 1) }}
            >
              <h4 className="text-twh-gold text-sm tracking-[0.2em] uppercase font-semibold mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm tracking-wide transition-colors duration-300 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs tracking-wide font-light">
              © {new Date().getFullYear()} The Wheelhouse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors duration-300 font-light"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
