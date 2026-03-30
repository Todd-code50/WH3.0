"use client";

import { type ComponentOption } from "../bikeData";
import ComponentCard from "./ComponentCard";

interface Props {
  tyres: ComponentOption[];
  selected: ComponentOption | null;
  onSelect: (t: ComponentOption) => void;
}

export default function TyresStep({ tyres, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 5 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Choose Your Tyres</h2>
        <p className="text-white/50 text-sm mt-1">Where rubber meets road — the final contact point between you and the tarmac.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {tyres.map((t, i) => (
          <ComponentCard
            key={t.id}
            option={t}
            isSelected={selected?.id === t.id}
            index={i}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
