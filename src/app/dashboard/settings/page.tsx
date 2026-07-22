import { User, CreditCard, Palette, Bell, Globe, Smartphone, Link2, Unlink } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ROUTES, PRO_PRICE_MONTHLY, APP_NAME } from "@/lib/constants";
import { generateTelegramCode, unlinkTelegram, setWebhook } from "./actions";
import { TelegramSection } from "./telegram-section";

const sections = [
  {
    id: "profile",
    icon: User,
    title: "Profile",
    description: "Your name, email, and avatar.",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing & Plan",
    description: "Manage your subscription.",
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    description: "Customize your experience.",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Email and push preferences.",
  },
  {
    id: "branding",
    icon: Globe,
    title: "Branding",
    description: "Logo, colors, and domain.",
  },
];

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user!.id;

  const [userData] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <div>
        <h1 className="text-xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your account and preferences.
        </p>
      </div>

      <div className="mt-6 space-y-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-4 py-3 hover:bg-surface-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <section.icon className="size-4 text-primary" />
              <div>
                <p className="text-sm text-ink">{section.title}</p>
                <p className="text-xs text-ink-tertiary">{section.description}</p>
              </div>
            </div>
            <span className="text-xs text-ink-muted">Coming soon</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <TelegramSection
          telegramChatId={userData?.telegramChatId ?? null}
          verificationCode={userData?.telegramVerificationCode ?? null}
          verificationExpiresAt={userData?.telegramVerificationExpiresAt?.toISOString() ?? null}
        />
      </div>

      <div className="mt-4 rounded-lg border border-hairline bg-surface-1 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink">Current Plan</p>
            <p className="text-xs text-ink-tertiary mt-0.5">
              {userData?.subscriptionTier === "pro"
                ? "You're on the Pro plan."
                : `You're on the Free plan. $${PRO_PRICE_MONTHLY}/mo to upgrade.`}
            </p>
          </div>
          {userData?.subscriptionTier !== "pro" && (
            <Button size="sm" asChild>
              <Link href={ROUTES.pricing}>Upgrade</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
