"use client";

import { Building2, Hexagon, Diamond, CircleDot, Component } from "lucide-react";

const logos = [
  { Icon: Building2, label: "BuildRight" },
  { Icon: Hexagon, label: "HexaCorp" },
  { Icon: Diamond, label: "DiamondStack" },
  { Icon: CircleDot, label: "OrbitSys" },
  { Icon: Component, label: "Modular" },
];

export function SocialProof() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="mb-10 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-ink-tertiary">
          Trusted by freelancers and agencies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-ink-subtle/30 transition-all duration-300 hover:text-ink-subtle/60"
            >
              <Icon className="size-8" strokeWidth={1} />
              <span className="text-xs font-medium tracking-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
