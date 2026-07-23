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
      className="animate-slide-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="group relative rounded-xl border border-hairline bg-surface-1 p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-surface-2">
        <div className="flex size-12 items-center justify-center rounded-xl border border-hairline bg-canvas">
          <Icon className="size-5 text-primary" />
        </div>
        <h3 className="mt-6 text-base font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
        <div className="absolute bottom-0 left-4 right-4 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </div>
  );
}
