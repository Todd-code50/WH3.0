"use client";

import { type ComponentOption } from "../bikeData";
import ComponentCard from "./ComponentCard";

interface Props {
  kits: ComponentOption[];
  selected: ComponentOption | null;
  onSelect: (f: ComponentOption) => void;
}

export default function FinishingStep({ kits, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 6 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Finishing Kit</h2>
        <p className="text-white/50 text-sm mt-1">Cockpit and saddle — the touchpoints that connect you to your machine.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {kits.map((k, i) => (
          <ComponentCard
            key={k.id}
            option={k}
            isSelected={selected?.id === k.id}
            index={i}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
