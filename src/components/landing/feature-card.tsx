"use client";

import { Sparkles, FileText, Shield, Zap, ArrowUpRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  FileText,
  Shield,
  Zap,
};

interface FeatureCardProps {
  icon: "Sparkles" | "FileText" | "Shield" | "Zap";
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className="group animate-slide-up relative rounded-xl border border-hairline bg-surface-1 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:bg-surface-2"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex size-12 items-center justify-center rounded-xl border border-hairline bg-canvas transition-all duration-500 group-hover:border-primary/25 group-hover:bg-primary/[0.04]">
        <Icon className="size-5 text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>
      <h3 className="mt-6 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      <div className="mt-6 flex items-center gap-1 text-xs font-medium text-primary/0 transition-all duration-500 group-hover:text-primary/60">
        <ArrowUpRight className="size-3.5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}
