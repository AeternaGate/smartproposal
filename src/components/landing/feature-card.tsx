"use client";

import { Sparkles, FileText, Shield, Zap } from "lucide-react";

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
      className="group animate-slide-up rounded-lg border border-hairline bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex size-10 items-center justify-center rounded-lg border border-hairline bg-canvas transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{description}</p>
    </div>
  );
}
