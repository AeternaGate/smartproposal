import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logomark } from "@/components/ui/icons";
import { PRO_PRICE_MONTHLY, PRO_PRICE_YEARLY, FREE_LIMITS, PRO_LIMITS, ROUTES } from "@/lib/constants";

const tiers = [
  {
    name: "Free",
    price: 0,
    description: "For freelancers getting started.",
    features: [
      `${FREE_LIMITS.documentsPerMonth} proposals/month`,
      `${FREE_LIMITS.templates} templates`,
      "Basic AI assistance",
      "PDF export",
    ],
    cta: "Get Started",
    href: ROUTES.signup,
    featured: false,
  },
  {
    name: "Pro",
    price: PRO_PRICE_MONTHLY,
    description: "For serious freelancers and small agencies.",
    features: [
      `${PRO_LIMITS.documentsPerMonth} proposals/month`,
      `${PRO_LIMITS.templates} templates`,
      "Advanced AI (GPT-4o, Claude)",
      "Custom branding",
      "Analytics & tracking",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: ROUTES.signup,
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex h-14 items-center border-b border-hairline px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logomark className="size-6" />
          <span className="text-sm font-semibold text-ink">Propel</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href={ROUTES.login}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Sign in
          </Link>
          <Button asChild>
            <Link href={ROUTES.signup}>Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-24">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-ink">
            Simple, transparent pricing
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Start free. Upgrade when you grow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl border ${
                tier.featured
                  ? "border-primary bg-primary/5"
                  : "border-hairline bg-surface-1"
              } p-6 transition-all hover:border-primary/30`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                  <Sparkles className="size-3" />
                  Most Popular
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-ink">
                    ${tier.price}
                  </span>
                  {tier.price > 0 && (
                    <span className="text-sm text-ink-muted">/month</span>
                  )}
                </div>
                {tier.price > 0 && (
                  <p className="mt-1 text-xs text-ink-tertiary">
                    ${PRO_PRICE_YEARLY}/year (save ${PRO_PRICE_MONTHLY * 12 - PRO_PRICE_YEARLY})
                  </p>
                )}
                <p className="mt-3 text-sm text-ink-muted">{tier.description}</p>
              </div>
              <Separator className="my-5" />
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-ink">
                    <Check className="size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={tier.featured ? "default" : "outline"} asChild>
                <Link href={tier.href}>
                  {tier.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
