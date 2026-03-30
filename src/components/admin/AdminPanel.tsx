"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  loadStore,
  saveStore,
  resetStore,
  getAdminPin,
  type AdminStore,
  type AdminSection,
} from "./adminStore";
import type { BikeFrame, ComponentOption, ColorOption } from "../configurator/bikeData";
import FrameEditor from "./editors/FrameEditor";
import ComponentEditor from "./editors/ComponentEditor";

const SECTIONS: { id: AdminSection; label: string; icon: string }[] = [
  { id: "frames",    label: "Frames",       icon: "🚴" },
  { id: "groupsets", label: "Groupsets",    icon: "⚙️" },
  { id: "wheels",    label: "Wheels",       icon: "⭕" },
  { id: "tyres",     label: "Tyres",        icon: "🔘" },
  { id: "finishing", label: "Finishing Kit",icon: "🔧" },
];

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [store, setStore] = useState<AdminStore | null>(null);
  const [section, setSection] = useState<AdminSection>("frames");
  const [saved, setSaved] = useState(false);

  // Load store after auth
  useEffect(() => {
    if (authed) {
      setStore(loadStore());
    }
  }, [authed]);

  const handleLogin = () => {
    if (pin === getAdminPin()) {
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const handleSave = (updated: AdminStore) => {
    saveStore(updated);
    setStore(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm("Reset all data to defaults? This cannot be undone.")) {
      const defaults = resetStore();
      setStore(defaults);
    }
  };

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-twh-dark flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-full bg-twh-gold flex items-center justify-center">
              <span className="text-twh-dark font-bold text-xl leading-none">W</span>
            </div>
            <div>
              <p className="text-twh-gold text-[10px] tracking-widest uppercase leading-none">The</p>
              <p className="text-white text-lg font-bold tracking-[0.2em] uppercase leading-tight">Wheelhouse</p>
            </div>
          </div>

          <div className="bg-twh-dark-light border border-white/10 rounded-xl p-8">
            <h1 className="text-white text-xl font-bold tracking-wide uppercase mb-1">Admin Panel</h1>
            <p className="text-white/40 text-sm mb-8">Enter your PIN to manage bike data</p>

            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Access PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className={`w-full bg-twh-dark border rounded-lg px-4 py-3 text-white text-lg tracking-widest placeholder-white/20 outline-none focus:border-twh-gold transition-colors duration-200 ${
                pinError ? "border-red-500" : "border-white/20"
              }`}
            />
            {pinError && (
              <p className="text-red-400 text-xs mt-2 tracking-wide">Incorrect PIN. Please try again.</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full mt-6 py-3 bg-twh-gold text-twh-dark font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-twh-gold-light transition-all duration-300"
            >
              Enter Admin
            </button>
          </div>

          <p className="text-white/20 text-xs text-center mt-6">
            Default PIN: <span className="text-white/40 font-mono">wheelhouse2024</span>
          </p>
        </motion.div>
      </div>
    );
  }

  if (!store) return null;

  // ── Admin dashboard ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-twh-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-twh-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-twh-gold flex items-center justify-center">
            <span className="text-twh-dark font-bold text-lg leading-none">W</span>
          </div>
          <div>
            <p className="text-twh-gold text-[10px] tracking-widest uppercase leading-none">The</p>
            <p className="text-white text-base font-bold tracking-[0.2em] uppercase leading-tight">Wheelhouse</p>
          </div>
          <span className="ml-3 px-2 py-0.5 bg-twh-gold/20 text-twh-gold text-[10px] tracking-widest uppercase rounded border border-twh-gold/30">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-400 text-xs tracking-widest uppercase flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Saved
            </motion.span>
          )}
          <a
            href="/configure"
            target="_blank"
            className="px-4 py-2 border border-white/20 text-white/60 text-xs tracking-widest uppercase hover:border-white/40 hover:text-white transition-all duration-300 rounded"
          >
            Preview Configurator ↗
          </a>
          <button
            onClick={() => setAuthed(false)}
            className="px-4 py-2 border border-red-500/30 text-red-400/60 text-xs tracking-widest uppercase hover:border-red-500/60 hover:text-red-400 transition-all duration-300 rounded"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 border-r border-white/10 bg-twh-dark-light/30 p-4 flex flex-col gap-1 sticky top-[73px] h-[calc(100vh-73px)]">
          <p className="text-white/30 text-[10px] tracking-widest uppercase px-3 mb-2">Manage</p>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm tracking-wide transition-all duration-200 text-left ${
                section === s.id
                  ? "bg-twh-gold/15 text-twh-gold border border-twh-gold/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">{s.icon}</span>
              {s.label}
              <span className="ml-auto text-[10px] text-white/30">
                {store[s.id].length}
              </span>
            </button>
          ))}

          <div className="mt-auto pt-4 border-t border-white/10">
            <button
              onClick={handleReset}
              className="w-full px-3 py-2 text-red-400/50 text-xs tracking-widest uppercase hover:text-red-400 transition-colors duration-200 text-left"
            >
              Reset to Defaults
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {section === "frames" ? (
                <FrameEditor
                  frames={store.frames}
                  onChange={(frames) => handleSave({ ...store, frames })}
                />
              ) : (
                <ComponentEditor
                  section={section}
                  items={store[section] as ComponentOption[]}
                  onChange={(items) => handleSave({ ...store, [section]: items })}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
