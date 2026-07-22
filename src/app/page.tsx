import Link from "next/link";
import { Sparkles, CheckCircle } from "lucide-react";

import { LogoFull } from "@/components/ui/icons";
import { AnimatedBackground } from "@/components/landing/background";
import { HeroVisual } from "@/components/landing/hero-visual";
import { FeatureCard } from "@/components/landing/feature-card";
import { HeroCta, FinalCta } from "@/components/landing/cta-buttons";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ROUTES } from "@/lib/constants";

const features = [
  {
    icon: "Sparkles",
    title: "AI-Powered Generation",
    description: "Generate professional proposals from a single prompt. Our AI understands your project and crafts compelling content in seconds.",
  },
  {
    icon: "FileText",
    title: "Smart Templates",
    description: "Create once, reuse forever. Build custom templates that capture your brand voice and proposal structure.",
  },
  {
    icon: "Shield",
    title: "Secure Sharing",
    description: "Share proposals with a secure link. Track when clients view, and get notified the moment they accept.",
  },
  {
    icon: "Zap",
    title: "Lightning Fast",
    description: "From idea to sent proposal in under 5 minutes. Stop spending hours formatting documents.",
  },
];

const stats = [
  { value: "10x", label: "Faster proposals" },
  { value: "68%", label: "Average win rate" },
  { value: "5min", label: "From blank to sent" },
  { value: "100%", label: "Your brand, your voice" },
];

const checklist = [
  "No credit card required",
  "Free for 3 documents per month",
  "Cancel anytime",
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <AnimatedBackground />

      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md supports-backdrop-filter:bg-canvas/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <LogoFull className="h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.login}
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              Sign in
            </Link>
            <div className="group relative overflow-hidden">
              <Link
                href={ROUTES.signup}
                className="relative z-10 inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:translate-y-px"
              >
                Get Started
                <Sparkles className="size-4" />
              </Link>
              <div className="pointer-events-none absolute inset-0 -translate-x-full rounded-lg bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-6 top-0 select-none text-[280px] font-bold leading-none text-primary/[0.012] lg:text-[400px]">
            P
          </div>
          <div className="mx-auto max-w-6xl px-4 pb-32 pt-20 sm:pb-40 sm:pt-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="lg:col-span-7">
                <div className="animate-fade-in">
                  <div className="relative inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    AI-powered proposal platform
                    <BorderBeam size={30} duration={8} borderWidth={1} delay={0} />
                  </div>

                  <h1 className="mt-10 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                    Proposals that
                    <br />
                    <span className="text-primary">close in minutes</span>
                    <br />
                    not hours.
                  </h1>

                  <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
                    Propel uses AI to help freelancers and small agencies create stunning proposals,
                    invoices, and contracts. Stop formatting — start winning.
                  </p>

                  <div className="mt-12">
                    <HeroCta />
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-tertiary">
                    {checklist.map((item) => (
                      <span key={item} className="flex items-center gap-1.5">
                        <CheckCircle className="size-3.5 text-primary/60" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:col-span-5 lg:block">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-hairline bg-surface-1/50">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-slide-up relative text-center"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  {i < stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 lg:block bg-gradient-to-b from-transparent via-hairline to-transparent" />
                  )}
                  <p className="text-3xl font-semibold text-ink tabular-nums tracking-tight lg:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-ink-tertiary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-28 lg:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary mb-8">
              Features
            </div>
            <h2 className="text-3xl font-semibold text-ink tracking-tight lg:text-4xl">
              Everything you need to win more clients
            </h2>
            <p className="mt-4 text-base text-ink-muted">
              Built for the way freelancers and agencies actually work.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon as "Sparkles" | "FileText" | "Shield" | "Zap"}
                title={feature.title}
                description={feature.description}
                index={i}
              />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-hairline">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(94,106,210,0.06),transparent)]" />
          <div className="mx-auto max-w-6xl px-4 py-28 lg:py-36">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary mb-8">
                Get Started
              </div>
              <h2 className="text-3xl font-semibold text-ink tracking-tight lg:text-4xl">
                Ready to close your next deal?
              </h2>
              <p className="mt-4 text-base text-ink-muted">
                Join freelancers and agencies who use Propel to send proposals that get signed.
              </p>
              <div className="mt-10">
                <FinalCta />
              </div>
              <p className="mt-6 text-xs text-ink-tertiary">
                Free plan includes 3 documents per month. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-sm text-ink-tertiary">
            &copy; {new Date().getFullYear()} Propel. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-ink-tertiary">
            <Link href={ROUTES.pricing} className="hover:text-ink-muted transition-colors">
              Pricing
            </Link>
            <a href="mailto:support@propel.so" className="hover:text-ink-muted transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
