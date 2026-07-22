"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function HeroCta() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <ShimmerButton
        onClick={() => router.push(ROUTES.signup)}
        className="h-10 px-6 text-sm"
      >
        Start Free
        <ArrowRight className="size-4 ml-2" />
      </ShimmerButton>
      <Button variant="outline" size="lg" onClick={() => router.push(ROUTES.pricing)}>
        See Pricing
      </Button>
    </div>
  );
}

export function FinalCta() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ShimmerButton
        onClick={() => router.push(ROUTES.signup)}
        className="h-10 px-6 text-sm"
      >
        Start Free
        <ArrowRight className="size-4 ml-2" />
      </ShimmerButton>
      <Button variant="outline" size="lg" onClick={() => router.push(ROUTES.login)}>
        Sign In
      </Button>
    </div>
  );
}
