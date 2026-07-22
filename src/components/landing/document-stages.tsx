"use client";

import { useEffect, useState, useRef } from "react";
import { Star, CheckCircle2, Send, Eye } from "lucide-react";

type Stage = 0 | 1 | 2 | 3;

const stages: { section: string; badge: React.ReactNode }[] = [
  {
    section: "hero",
    badge: null,
  },
  {
    section: "features",
    badge: (
      <div className="flex items-center gap-2">
        <Send className="size-3 text-primary" />
        <span className="text-xs text-ink-muted">Sent to client</span>
      </div>
    ),
  },
  {
    section: "stats",
    badge: (
      <div className="flex items-center gap-2">
        <Eye className="size-3 text-yellow-500" />
        <span className="text-xs text-ink-muted">Viewed by client</span>
      </div>
    ),
  },
  {
    section: "cta",
    badge: (
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-3 text-green-500" />
        <span className="text-xs text-ink-muted">Signed & closed</span>
      </div>
    ),
  },
];

function DocFrame({ stage, index, active }: { stage: Stage; index: number; active: boolean }) {
  const fill = (y: number) => {
    const order = [76, 90, 100, 120, 134, 144, 154, 174, 188];
    return order.slice(0, stage).some((o) => o === y);
  };

  const sectionFilled = (y: number) => {
    if (stage === 0) return false;
    if (stage === 1) return [76, 90, 100].includes(y);
    if (stage === 2) return [76, 90, 100, 120, 134, 144, 154].includes(y);
    return [76, 90, 100, 120, 134, 144, 154, 174, 188].includes(y);
  };

  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="60" y="20" width="280" height="240" rx="8" stroke="#23252a" strokeWidth="1" fill="#0f1011" />
      <rect x="60" y="20" width="280" height="40" rx="8" fill="#141516" />
      <rect x="60" y="44" width="280" height="16" fill="#141516" />
      <rect x="80" y="34" width="80" height="12" rx="2" fill="#34343a" />

      <g opacity={stage > 0 ? 1 : 0} style={{ transition: "opacity 0.6s ease-out" }}>
        <rect x="80" y="76" width="60" height="6" rx="3" fill={sectionFilled(76) ? "#23252a" : "#23252a"} opacity={sectionFilled(76) ? 1 : 0.2} />
        <rect x="80" y="90" width="240" height="4" rx="2" fill={sectionFilled(90) ? "#23252a" : "#23252a"} opacity={sectionFilled(90) ? 0.5 : 0.1} />
        <rect x="80" y="100" width="200" height="4" rx="2" fill={sectionFilled(100) ? "#23252a" : "#23252a"} opacity={sectionFilled(100) ? 0.5 : 0.1} />
      </g>

      <g opacity={stage > 1 ? 1 : 0} style={{ transition: "opacity 0.6s ease-out 0.15s" }}>
        <rect x="80" y="120" width="60" height="6" rx="3" fill={sectionFilled(120) ? "#23252a" : "#23252a"} opacity={sectionFilled(120) ? 1 : 0.2} />
        <rect x="80" y="134" width="240" height="4" rx="2" fill={sectionFilled(134) ? "#5e6ad2" : "#23252a"} opacity={sectionFilled(134) ? 0.6 : 0.1} />
        <rect x="80" y="144" width="180" height="4" rx="2" fill={sectionFilled(144) ? "#23252a" : "#23252a"} opacity={sectionFilled(144) ? 0.5 : 0.1} />
        <rect x="80" y="154" width="220" height="4" rx="2" fill={sectionFilled(154) ? "#23252a" : "#23252a"} opacity={sectionFilled(154) ? 0.5 : 0.1} />
      </g>

      <g opacity={stage > 2 ? 1 : 0} style={{ transition: "opacity 0.6s ease-out 0.3s" }}>
        <rect x="80" y="174" width="60" height="6" rx="3" fill={sectionFilled(174) ? "#23252a" : "#23252a"} opacity={sectionFilled(174) ? 1 : 0.2} />
        <rect x="80" y="188" width="200" height="4" rx="2" fill={sectionFilled(188) ? "#23252a" : "#23252a"} opacity={sectionFilled(188) ? 0.5 : 0.1} />
      </g>

      <rect x="80" y="214" width="100" height="24" rx="4" fill="#5e6ad2" opacity={0.9} />
      <rect x="196" y="214" width="80" height="24" rx="4" fill="#23252a" />

      {stage === 3 && (
        <g className="animate-scale-in">
          <path d="M82 262h236" stroke="#23252a" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="80" y="250" width="16" height="24" rx="2" fill="#22c55e" opacity="0.8" />
          <rect x="104" y="250" width="16" height="24" rx="2" fill="#34343a" />
          <rect x="128" y="250" width="16" height="24" rx="2" fill="#34343a" />
          <text x="152" y="266" fill="#22c55e" fontSize="11" fontFamily="Inter, system-ui" fontWeight="500">Signed</text>
        </g>
      )}
      {stage === 2 && (
        <g>
          <path d="M82 262h236" stroke="#23252a" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="80" y="250" width="16" height="24" rx="2" fill="#5e6ad2" opacity="0.6" />
          <rect x="104" y="250" width="16" height="24" rx="2" fill="#34343a" />
          <rect x="128" y="250" width="16" height="24" rx="2" fill="#34343a" />
        </g>
      )}
      {stage < 2 && (
        <g>
          <path d="M82 262h236" stroke="#23252a" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="80" y="250" width="16" height="24" rx="2" fill="#5e6ad2" opacity={stage === 0 ? 0.3 : 0.6} />
          <rect x="104" y="250" width="16" height="24" rx="2" fill="#34343a" />
          <rect x="128" y="250" width="16" height="24" rx="2" fill="#34343a" />
        </g>
      )}
    </svg>
  );
}

export function ScrollDocument() {
  const [stage, setStage] = useState<Stage>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = ["hero-section", "features-section", "stats-section", "cta-section"];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setStage(index as Stage);
            }
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px]">
      <div className="transition-all duration-700 ease-out">
        <DocFrame stage={stage} index={0} active={false} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {stages.map((s, i) => (
          <button
            key={i}
            onClick={() => setStage(i as Stage)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              stage === i ? "w-6 bg-primary" : "w-1.5 bg-hairline hover:bg-hairline-strong"
            }`}
            aria-label={`Document stage ${i + 1}`}
          />
        ))}
      </div>

      <div
        className={`absolute -bottom-3 -right-3 transition-all duration-500 ${
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="rounded-lg border border-hairline bg-surface-1 px-3 py-2">
          <div className="flex items-center gap-2">
            <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs text-ink-muted">Client just signed!</span>
          </div>
        </div>
      </div>

      <div
        className={`absolute -left-3 -top-3 transition-all duration-500 ${
          stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <div className="rounded-lg border border-hairline bg-surface-1 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500" />
            <span className="text-xs text-ink-muted">
              {stage >= 3 ? "Accepted!" : "Viewed now"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
