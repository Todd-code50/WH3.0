// ─── Admin Data Store ─────────────────────────────────────────────────────────
// Manages bike configurator data with localStorage persistence.
// The configurator reads from this store at runtime.

import type { BikeFrame, ComponentOption } from "../configurator/bikeData";
import { FRAMES, GROUPSETS, WHEELS, TYRES, FINISHING_KITS } from "../configurator/bikeData";

export type AdminSection = "frames" | "groupsets" | "wheels" | "tyres" | "finishing";

export interface AdminStore {
  frames: BikeFrame[];
  groupsets: ComponentOption[];
  wheels: ComponentOption[];
  tyres: ComponentOption[];
  finishing: ComponentOption[];
}

const STORAGE_KEY = "twh_admin_data";
const ADMIN_PIN = "wheelhouse2024"; // Simple PIN — change as needed

export function getAdminPin(): string {
  return ADMIN_PIN;
}

export function loadStore(): AdminStore {
  if (typeof window === "undefined") {
    return getDefaultStore();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminStore;
      // Validate structure
      if (parsed.frames && parsed.groupsets && parsed.wheels && parsed.tyres && parsed.finishing) {
        return parsed;
      }
    }
  } catch {
    // fall through to defaults
  }
  return getDefaultStore();
}

export function saveStore(store: AdminStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function resetStore(): AdminStore {
  const defaults = getDefaultStore();
  saveStore(defaults);
  return defaults;
}

function getDefaultStore(): AdminStore {
  return {
    frames: FRAMES,
    groupsets: GROUPSETS,
    wheels: WHEELS,
    tyres: TYRES,
    finishing: FINISHING_KITS,
  };
}
