"use client";

import { type ComponentOption } from "../bikeData";
import ComponentCard from "./ComponentCard";

interface Props {
  wheels: ComponentOption[];
  selected: ComponentOption | null;
  onSelect: (w: ComponentOption) => void;
}

export default function WheelsStep({ wheels, selected, onSelect }: Props) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-twh-gold text-xs tracking-widest uppercase mb-1">Step 4 of 6</p>
        <h2 className="text-white text-3xl font-bold tracking-wide uppercase">Choose Your Wheels</h2>
        <p className="text-white/50 text-sm mt-1">Roll fast, roll light. The right wheels transform your ride.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {wheels.map((w, i) => (
          <ComponentCard
            key={w.id}
            option={w}
            isSelected={selected?.id === w.id}
            index={i}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
