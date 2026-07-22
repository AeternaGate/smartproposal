import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { error } = await searchParams;

  if (data?.user) redirect(ROUTES.dashboard);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-xl font-semibold text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-ink-muted">Start creating proposals in minutes</p>
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <form action={signup} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-ink-muted">
            Full name
          </Label>
          <Input id="name" name="name" type="text" placeholder="Jane Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-ink-muted">
            Email
          </Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-ink-muted">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
            minLength={8}
          />
        </div>
        <Button type="submit" className="w-full">
          Create account
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-tertiary">
        Already have an account?{" "}
        <Link
          href={ROUTES.login}
          className="text-primary hover:text-primary-hover transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
