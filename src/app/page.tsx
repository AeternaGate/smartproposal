import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Shield, Zap, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoFull } from "@/components/ui/icons";
import { AnimatedBackground } from "@/components/landing/background";
import { ROUTES } from "@/lib/constants";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Generate professional proposals from a single prompt. Our AI understands your project and crafts compelling content in seconds.",
  },
  {
    icon: FileText,
    title: "Smart Templates",
    description: "Create once, reuse forever. Build custom templates that capture your brand voice and proposal structure.",
  },
  {
    icon: Shield,
    title: "Secure Sharing",
    description: "Share proposals with a secure link. Track when clients view, and get notified the moment they accept.",
  },
  {
    icon: Zap,
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
            <Button asChild>
              <Link href={ROUTES.signup}>
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 pb-16 pt-20 text-center lg:pb-24 lg:pt-28">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
                <Sparkles className="size-3" />
                AI-powered proposal platform
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-ink lg:text-6xl">
                Proposals that
                <br />
                <span className="text-primary">close in minutes</span>
                <br />
                not hours.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted lg:text-lg">
                Propel uses AI to help freelancers and small agencies create stunning proposals,
                invoices, and contracts. Stop formatting — start winning.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
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

              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-ink-tertiary">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-primary" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-primary" />
                  Free for 3 docs/mo
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-primary" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-hairline bg-surface-1/50">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-slide-up text-center"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  <p className="text-2xl font-semibold text-ink tabular-nums">{stat.value}</p>
                  <p className="mt-1 text-xs text-ink-tertiary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 lg:py-28">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-ink lg:text-3xl">
              Everything you need to win more clients
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Built for the way freelancers and agencies actually work.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group animate-slide-up rounded-lg border border-hairline bg-surface-1 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface-2 hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
              >
                <div className="relative flex size-10 items-center justify-center rounded-lg border border-hairline bg-canvas transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-hairline">
          <div className="mx-auto max-w-6xl px-4 py-20 lg:py-28">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-ink lg:text-3xl">
                Ready to close your next deal?
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Join freelancers and agencies who use Propel to send proposals that get signed.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href={ROUTES.signup}>
                    Start Free
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={ROUTES.login}>Sign In</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-ink-tertiary">
                Free plan includes 3 documents per month. No credit card required.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(94,106,210,0.06),transparent)]" />
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-sm text-ink-tertiary">
            &copy; {new Date().getFullYear()} Propel. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-ink-tertiary">
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
