import { notFound, redirect } from "next/navigation";
import { ArrowLeft, FileText, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq, and } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES, APP_URL } from "@/lib/constants";
import { StatusBadge } from "./status-badge";
import { StatusActions } from "./status-actions";
import { DeleteButton } from "./delete-button";

const typeLabels: Record<string, string> = {
  proposal: "Proposal",
  invoice: "Invoice",
  contract: "Contract",
};

const statusTransitions: Record<string, string[]> = {
  draft: ["sent"],
  sent: ["viewed"],
  viewed: ["accepted", "rejected"],
  accepted: [],
  rejected: [],
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user!.id;

  const [doc] = await db
    .select()
    .from(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)))
    .limit(1);

  if (!doc) notFound();

  const content = doc.content as {
    sections?: { title: string; content: string }[];
    pricing?: { items: { description: string; amount: number }[]; total: number };
  } | null;

  const shareUrl = doc.shareToken
    ? `${APP_URL}/share/${doc.shareToken}`
    : null;

  const nextStatuses = statusTransitions[doc.status] ?? [];

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <Link
        href={ROUTES.proposals}
        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors mb-4"
      >
        <ArrowLeft className="size-3.5" />
        Back to proposals
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-ink">{doc.title}</h1>
            <StatusBadge status={doc.status} />
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            {typeLabels[doc.type] ?? doc.type}
            {doc.recipientName && ` · To: ${doc.recipientName}`}
            {doc.recipientEmail && ` · ${doc.recipientEmail}`}
          </p>
          <p className="mt-0.5 text-xs text-ink-tertiary">
            Created {new Date(doc.createdAt).toLocaleDateString(undefined, {
              month: "long", day: "numeric", year: "numeric",
            })}
            {doc.updatedAt > doc.createdAt &&
              ` · Updated ${new Date(doc.updatedAt).toLocaleDateString()}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {nextStatuses.length > 0 && <StatusActions id={doc.id} status={doc.status} nextStatuses={nextStatuses} />}
          <DeleteButton id={doc.id} />
        </div>
      </div>

      {shareUrl && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-hairline bg-surface-1 px-3 py-2">
          <ExternalLink className="size-3.5 text-primary shrink-0" />
          <span className="text-xs text-ink-muted truncate flex-1">{shareUrl}</span>
          <CopyButton url={shareUrl} />
        </div>
      )}

      <Separator className="my-6" />

      {content?.sections && content.sections.length > 0 ? (
        <div className="space-y-6">
          {content.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-semibold text-ink">{section.title}</h2>
              <div className="mt-2 text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-16">
          <FileText className="size-12 text-ink-tertiary" />
          <p className="mt-3 text-sm text-ink-muted">No content yet</p>
          <p className="mt-1 text-xs text-ink-tertiary">
            This document has no sections. Use AI to generate content.
          </p>
        </div>
      )}

      {content?.pricing && (
        <>
          <Separator className="my-6" />
          <div>
            <h2 className="text-base font-semibold text-ink">Pricing</h2>
            <div className="mt-3 rounded-lg border border-hairline">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-ink-muted">Description</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-ink-muted">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {content.pricing.items.map((item, i) => (
                    <tr key={i} className="border-b border-hairline last:border-0">
                      <td className="px-4 py-2.5 text-ink">{item.description}</td>
                      <td className="px-4 py-2.5 text-right text-ink">
                        ${item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="px-4 py-2.5 text-sm font-semibold text-ink">Total</td>
                    <td className="px-4 py-2.5 text-right text-sm font-semibold text-ink">
                      ${content.pricing.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CopyButton({ url }: { url: string }) {
  return (
    <form
      action={async () => {
        "use server";
        // Copy handled client-side
      }}
    >
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
        }}
        className="text-xs text-primary hover:text-primary/80 transition-colors shrink-0"
      >
        Copy
      </button>
    </form>
  );
}
