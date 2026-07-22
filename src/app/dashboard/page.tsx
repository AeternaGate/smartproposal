import { FileText, Plus, LayoutTemplate, ArrowRight, TrendingUp, Eye, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents, users, templates } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";

import { NoDocuments } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ROUTES, FREE_LIMITS, PRO_LIMITS } from "@/lib/constants";
import { OnboardingWizard } from "@/components/onboarding/wizard";
import { loadDefaultTemplates } from "@/components/onboarding/actions";

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

  const [templateCountResult] = await db
    .select({ value: count() })
    .from(templates)
    .where(eq(templates.userId, userId));

  const statusCounts = await db
    .select({
      status: documents.status,
      value: count(),
    })
    .from(documents)
    .where(eq(documents.userId, userId))
    .groupBy(documents.status);

  const recentProposals = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt))
    .limit(5);

  const docCount = docCountResult?.value ?? 0;
  const templateCount = templateCountResult?.value ?? 0;
  const hasPro = userData?.subscriptionTier === "pro";
  const limit = hasPro ? PRO_LIMITS : FREE_LIMITS;
  const remaining = limit.documentsPerMonth - docCount;

  const statusMap: Record<string, number> = {};
  for (const s of statusCounts) {
    statusMap[s.status] = Number(s.value);
  }

  const sentCount = statusMap["sent"] ?? 0;
  const viewedCount = statusMap["viewed"] ?? 0;
  const acceptedCount = statusMap["accepted"] ?? 0;

  const conversionRate =
    sentCount > 0 ? Math.round((acceptedCount / sentCount) * 100) : 0;

  const quickStats = [
    {
      label: "Documents",
      value: String(docCount),
      icon: FileText,
      change: hasPro
        ? `${PRO_LIMITS.documentsPerMonth}/mo (Pro)`
        : `${remaining} of ${FREE_LIMITS.documentsPerMonth} remaining`,
    },
    {
      label: "Templates",
      value: String(templateCount),
      icon: LayoutTemplate,
      change: "Reusable document templates",
    },
    {
      label: "Win Rate",
      value: sentCount > 0 ? `${conversionRate}%` : "—",
      icon: TrendingUp,
      change:
        sentCount > 0
          ? `${acceptedCount} accepted of ${sentCount} sent`
          : "Send your first proposal",
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

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      draft: "bg-ink-tertiary",
      sent: "bg-blue-500",
      viewed: "bg-yellow-500",
      accepted: "bg-green-500",
      rejected: "bg-red-500",
    };
    return map[status] ?? "bg-ink-tertiary";
  };

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Welcome back{userData?.name ? `, ${userData.name}` : ""}.{" "}
            <span className="text-ink">{docCount}</span> document
            {docCount !== 1 ? "s" : ""} total.
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.proposalsNew}>
            <Plus className="size-4" />
            New Document
          </Link>
        </Button>
      </div>

      {docCount === 0 && (
        <div className="mt-6">
          <OnboardingWizard onLoadDefaults={loadDefaultTemplates} />
        </div>
      )}

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

      {docCount > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-surface-1 p-4">
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
              Status Breakdown
            </h3>
            <div className="mt-3 space-y-2">
              {Object.entries(statusMap).map(([status, val]) => (
                <div key={status} className="flex items-center gap-3">
                  <span className={`size-2 rounded-full ${statusColor(status)}`} />
                  <span className="flex-1 text-sm text-ink">{statusLabel(status)}</span>
                  <span className="text-sm font-medium text-ink">{val}</span>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-hairline">
                    <div
                      className={`h-full rounded-full ${statusColor(status)}`}
                      style={{
                        width: `${docCount > 0 ? (val / docCount) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-hairline bg-surface-1 p-4">
            <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
              Conversion Funnel
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Send className="size-4 text-blue-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">Sent</span>
                    <span className="text-ink-muted">{sentCount}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="size-4 text-yellow-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">Viewed</span>
                    <span className="text-ink-muted">{viewedCount}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: `${sentCount > 0 ? (viewedCount / sentCount) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">Accepted</span>
                    <span className="text-ink-muted">{acceptedCount}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${sentCount > 0 ? (acceptedCount / sentCount) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-muted">Recent Documents</h2>
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
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs bg-hairline text-ink-muted`}>
                    <span className={`size-1.5 rounded-full ${statusColor(doc.status)}`} />
                    {statusLabel(doc.status)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-16">
            <NoDocuments className="size-24 text-ink-tertiary" />
            <p className="mt-4 text-sm text-ink-muted">No documents yet</p>
            <p className="mt-1 text-xs text-ink-tertiary">
              Create your first proposal to see it here.
            </p>
            <Button className="mt-4" asChild>
              <Link href={ROUTES.proposalsNew}>
                <Plus className="size-4" />
                Create Document
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}