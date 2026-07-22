import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Shield, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoFull } from "@/components/ui/icons";
import { ROUTES } from "@/lib/constants";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Generate professional proposals from a single prompt. Our AI understands your project and crafts compelling content.",
  },
  {
    icon: FileText,
    title: "Smart Templates",
    description: "Create once, reuse forever. Build custom templates that capture your brand voice and proposal structure.",
  },
  {
    icon: Shield,
    title: "Secure Sharing",
    description: "Share proposals with a secure link. Track when clients view, and get notified when they accept.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "From idea to sent proposal in under 5 minutes. Stop spending hours formatting documents.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="flex h-14 items-center justify-between border-b border-hairline px-4 lg:px-6">
        <LogoFull className="h-6" />
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.login}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Sign in
          </Link>
          <Button asChild>
            <Link href={ROUTES.signup}>
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-24 lg:py-32">
          <div className="animate-slide-up text-center">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-ink lg:text-6xl">
              Proposals that close.
              <br />
              <span className="text-primary">In minutes, not hours.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              Propel uses AI to help freelancers and small agencies create stunning proposals,
              invoices, and contracts. Stop formatting — start winning.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={ROUTES.signup}>
                  Start Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={ROUTES.pricing}>See Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="animate-slide-up rounded-lg border border-hairline bg-surface-1 p-6"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
              >
                <feature.icon className="size-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline px-4 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-sm text-ink-tertiary">
              &copy; {new Date().getFullYear()} Propel. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-ink-tertiary">
            <Link href={ROUTES.pricing} className="hover:text-ink-muted transition-colors">
              Pricing
            </Link>
            <span className="text-ink-tertiary">Contact: support@propel.so</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
