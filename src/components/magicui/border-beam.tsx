"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 50,
  duration = 6,
  borderWidth = 1,
  colorFrom = "#5e6ad2",
  colorTo = "#828fff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "[border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box]",
        "![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]",
        "after:animate-border-beam",
        "after:[animation-delay:var(--delay)]",
        "after:[background:var(--color-from)]",
        "after:[offset-path:rect(0_auto_auto_0_round_8px)]",
        "after:shadow-[0_0_8px_2px_var(--color-from),0_0_16px_4px_var(--color-to)]",
        className
      )}
    />
  );
}
