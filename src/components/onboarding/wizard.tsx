"use client";

import { useState } from "react";
import { Rocket, LayoutTemplate, FileText, MessageSquare, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES, APP_NAME } from "@/lib/constants";

interface Step {
  icon: typeof Rocket;
  title: string;
  description: string;
  action: { label: string; href?: string; onClick?: () => void };
}

export function OnboardingWizard({
  onLoadDefaults,
}: {
  onLoadDefaults: () => Promise<void>;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps: Step[] = [
    {
      icon: LayoutTemplate,
      title: "Load Starter Templates",
      description:
        "Get 5 ready-made templates: proposal, contract, invoice, SOW, and NDA. You can customize them later.",
      action: {
        label: "Load Templates",
        onClick: async () => {
          setLoading(true);
          await onLoadDefaults();
          setLoading(false);
          setCurrentStep(1);
        },
      },
    },
    {
      icon: FileText,
      title: "Create Your First Document",
      description:
        "Use a template or generate one with AI. Describe what you need and we'll write it for you.",
      action: { label: "Create Document", href: ROUTES.proposalsNew },
    },
    {
      icon: MessageSquare,
      title: "Connect Telegram",
      description:
        "Link your Telegram account to manage documents on the go. Get notified when clients view or sign.",
      action: { label: "Connect", href: ROUTES.settings },
    },
  ];

  const step = steps[currentStep];

  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-surface-1 p-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="size-5 text-primary" />
          <h2 className="text-sm font-semibold text-ink">
            {APP_NAME} — Ready in 3 steps
          </h2>
        </div>
        <span className="text-xs text-ink-tertiary">
          {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="mt-4 flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentStep ? "bg-primary" : "bg-hairline"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <step.icon className="size-4 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-ink">{step.title}</h3>
          <p className="mt-1 text-xs text-ink-tertiary">{step.description}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {currentStep > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
        )}
        {step.action.href ? (
          <Button asChild size="sm">
            <Link href={step.action.href}>
              {step.action.label}
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        ) : (
          <Button size="sm" onClick={step.action.onClick} disabled={loading}>
            {loading ? "Loading..." : step.action.label}
            {!loading && <ArrowRight className="size-3.5 ml-1" />}
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(currentStep + 1)}>
            Skip
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(steps.length)}>
            <Check className="size-3.5 mr-1" />
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
