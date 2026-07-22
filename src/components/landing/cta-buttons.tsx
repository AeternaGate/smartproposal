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
        className="group h-10 px-6 text-sm transition-transform duration-300 hover:scale-105"
      >
        Start Free
        <ArrowRight className="size-4 ml-2 transition-all duration-300 group-hover:translate-x-1" />
      </ShimmerButton>
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push(ROUTES.pricing)}
        className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
      >
        <span className="relative z-10">See Pricing</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-500" />
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
        className="group h-10 px-6 text-sm transition-transform duration-300 hover:scale-105"
      >
        Start Free
        <ArrowRight className="size-4 ml-2 transition-all duration-300 group-hover:translate-x-1" />
      </ShimmerButton>
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push(ROUTES.login)}
        className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
      >
        <span className="relative z-10">Sign In</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-500" />
      </Button>
    </div>
  );
}
