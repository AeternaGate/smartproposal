"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

const shapes = [
  { x: 55, y: 20, w: 140, h: 96, r: 8, angle: -4, delay: 0 },
  { x: 180, y: 50, w: 120, h: 84, r: 8, angle: 6, delay: 0.15 },
  { x: 110, y: 72, w: 100, h: 72, r: 6, angle: -2, delay: 0.3 },
  { x: 50, y: 68, w: 80, h: 60, r: 6, angle: 8, delay: 0.1 },
  { x: 220, y: 10, w: 64, h: 48, r: 6, angle: -6, delay: 0.2 },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg viewBox="0 0 340 180" fill="none" className="w-full max-w-[400px]">
        {shapes.map((s, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            animate={inView ? { opacity: 1, y: 0, rotate: s.angle } : {}}
            transition={{ duration: 0.7, delay: s.delay, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={s.r}
              className={
                i === 0
                  ? "fill-surface-1 stroke-hairline"
                  : "fill-canvas stroke-hairline"
              }
              strokeWidth={1}
            />
            {i === 0 && (
              <>
                <rect x={s.x + 12} y={s.y + 14} width={60} height={6} rx={2} className="fill-primary/60" />
                <rect x={s.x + 12} y={s.y + 26} width={s.w - 24} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.6} />
                <rect x={s.x + 12} y={s.y + 34} width={s.w - 40} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.4} />
                <rect x={s.x + 12} y={s.y + 46} width={60} height={6} rx={2} className="fill-hairline-strong" />
                <rect x={s.x + 12} y={s.y + 56} width={s.w - 24} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.5} />
                <rect x={s.x + 12} y={s.y + 64} width={s.w - 50} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.3} />
                <rect x={s.x + 12} y={s.y + 78} width={48} height={8} rx={3} className="fill-primary" />
              </>
            )}
            {i === 1 && (
              <>
                <rect x={s.x + 12} y={s.y + 14} width={50} height={5} rx={2} className="fill-hairline-strong" />
                <rect x={s.x + 12} y={s.y + 24} width={s.w - 24} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.4} />
                <rect x={s.x + 12} y={s.y + 32} width={s.w - 40} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.3} />
                <rect x={s.x + 12} y={s.y + 44} width={40} height={6} rx={2} className="fill-hairline-strong" />
                <rect x={s.x + 12} y={s.y + 54} width={s.w - 24} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.5} />
              </>
            )}
            {i === 2 && (
              <>
                <rect x={s.x + 10} y={s.y + 14} width={40} height={5} rx={2} className="fill-primary/40" />
                <rect x={s.x + 10} y={s.y + 24} width={s.w - 20} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.3} />
                <rect x={s.x + 10} y={s.y + 32} width={s.w - 30} height={3} rx={1.5} className="fill-hairline-strong" opacity={0.2} />
                <rect x={s.x + 10} y={s.y + 44} width={36} height={6} rx={2} className="fill-primary" opacity={0.7} />
              </>
            )}
          </motion.g>
        ))}

        <motion.circle
          cx={320}
          cy={160}
          r={24}
          className="fill-primary/10"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.circle
          cx={320}
          cy={160}
          r={12}
          className="fill-primary/20"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>
    </div>
  );
}
