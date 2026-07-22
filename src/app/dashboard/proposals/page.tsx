import { FileText, Plus, ExternalLink, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import { NoDocuments } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { DeleteButton } from "./delete-button";

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  draft: { label: "Draft", dot: "bg-ink-tertiary", bg: "bg-ink-tertiary/10" },
  sent: { label: "Sent", dot: "bg-blue-500", bg: "bg-blue-500/10" },
  viewed: { label: "Viewed", dot: "bg-yellow-500", bg: "bg-yellow-500/10" },
  accepted: { label: "Accepted", dot: "bg-green-500", bg: "bg-green-500/10" },
  rejected: { label: "Rejected", dot: "bg-red-500", bg: "bg-red-500/10" },
};

export default async function ProposalsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user!.id;

  const allProposals = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt));

  const typeLabel = (type: string) => {
    const map: Record<string, string> = {
      proposal: "Proposal",
      invoice: "Invoice",
      contract: "Contract",
    };
    return map[type] ?? type;
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Proposals</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {allProposals.length} document{allProposals.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.proposalsNew}>
            <Plus className="size-4" />
            New Document
          </Link>
        </Button>
      </div>

      {allProposals.length > 0 ? (
        <div className="mt-6 space-y-2">
          {allProposals.map((doc) => {
            const status = statusConfig[doc.status] ?? statusConfig.draft;
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-4 py-3 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm text-ink truncate">{doc.title}</p>
                    <p className="text-xs text-ink-tertiary mt-0.5">
                      {typeLabel(doc.type)} &middot;{" "}
                      {new Date(doc.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {doc.recipientName && ` · To: ${doc.recipientName}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ${status.bg} text-ink`}
                  >
                    <span className={`size-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                  {doc.shareToken && (
                    <Link
                      href={`/share/${doc.shareToken}`}
                      className="p-1.5 text-ink-tertiary hover:text-ink transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                    </Link>
                  )}
                  <DeleteButton id={doc.id} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-24">
          <NoDocuments className="size-24 text-ink-tertiary" />
          <p className="mt-4 text-sm text-ink-muted">No documents yet</p>
          <p className="mt-1 text-xs text-ink-tertiary">
            Create your first proposal, invoice, or contract.
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
  );
}
