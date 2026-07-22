import { FileText, Plus, LayoutTemplate, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents, users } from "@/db/schema";
import { eq, count, and, desc } from "drizzle-orm";

import { NoDocuments } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ROUTES, FREE_LIMITS } from "@/lib/constants";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user!.id;

  const [userData] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const [docCountResult] = await db
    .select({ value: count() })
    .from(documents)
    .where(eq(documents.userId, userId));

  const recentProposals = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt))
    .limit(5);

  const docCount = docCountResult?.value ?? 0;
  const remaining = FREE_LIMITS.documentsPerMonth - docCount;
  const hasPro = userData?.subscriptionTier === "pro";

  const quickStats = [
    {
      label: "Proposals",
      value: String(docCount),
      icon: FileText,
      change: hasPro ? "Unlimited (Pro)" : `${remaining} remaining this month`,
    },
    {
      label: "Templates",
      value: "0",
      icon: LayoutTemplate,
      change: "Coming soon",
    },
    {
      label: "Last Activity",
      value: recentProposals[0]
        ? new Date(recentProposals[0].createdAt).toLocaleDateString()
        : "—",
      icon: Clock,
      change: recentProposals[0] ? recentProposals[0].title : "No activity yet",
    },
  ];

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      draft: "Draft",
      sent: "Sent",
      viewed: "Viewed",
      accepted: "Accepted",
      rejected: "Rejected",
    };
    return map[status] ?? status;
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Welcome back{userData?.name ? `, ${userData.name}` : ""}. You have{" "}
            <span className="text-ink">{docCount} proposal{docCount !== 1 ? "s" : ""}</span>.
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.proposalsNew}>
            <Plus className="size-4" />
            New Proposal
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-hairline bg-surface-1 p-4"
          >
            <div className="flex items-center gap-2 text-ink-muted">
              <stat.icon className="size-4" />
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-tertiary">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-muted">Recent Proposals</h2>
          {docCount > 0 && (
            <Link
              href={ROUTES.proposals}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
        {docCount > 0 ? (
          <div className="mt-4 space-y-2">
            {recentProposals.map((doc) => (
              <Link
                key={doc.id}
                href={`${ROUTES.proposals}/${doc.id}`}
                className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-4 py-3 hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-primary" />
                  <span className="text-sm text-ink">{doc.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-tertiary">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                  <span className="rounded-full border border-hairline px-2 py-0.5 text-xs text-ink-muted">
                    {statusLabel(doc.status)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-16">
            <NoDocuments className="size-24 text-ink-tertiary" />
            <p className="mt-4 text-sm text-ink-muted">No proposals yet</p>
            <p className="mt-1 text-xs text-ink-tertiary">
              Create your first proposal to see it here.
            </p>
            <Button className="mt-4" asChild>
              <Link href={ROUTES.proposalsNew}>
                <Plus className="size-4" />
                Create Proposal
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
