"use client";

import { type ComponentOption } from "../bikeData";
import ComponentCard from "./ComponentCard";

interface Props {
  groupsets: ComponentOption[];
  selected: ComponentOption | null;
  onSelect: (g: ComponentOption) => void;
}

export default function GroupsetStep({ groupsets, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 3 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Choose Your Groupset</h2>
        <p className="text-white/50 text-sm mt-1">Shifting, braking, and drivetrain — the heart of your bike.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {groupsets.map((g, i) => (
          <ComponentCard
            key={g.id}
            option={g}
            isSelected={selected?.id === g.id}
            index={i}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
