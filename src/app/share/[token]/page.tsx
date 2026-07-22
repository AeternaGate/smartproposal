import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, CheckCircle, Clock, Eye } from "lucide-react";

import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

import { Logomark } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  draft: { label: "Draft", dot: "bg-ink-tertiary", bg: "bg-ink-tertiary/10" },
  sent: { label: "Sent", dot: "bg-blue-500", bg: "bg-blue-500/10" },
  viewed: { label: "Viewed", dot: "bg-yellow-500", bg: "bg-yellow-500/10" },
  accepted: { label: "Accepted", dot: "bg-green-500", bg: "bg-green-500/10" },
  rejected: { label: "Rejected", dot: "bg-red-500", bg: "bg-red-500/10" },
};

const typeLabels: Record<string, string> = {
  proposal: "Proposal",
  invoice: "Invoice",
  contract: "Contract",
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: Props) {
  const { token } = await params;

  const [doc] = await db
    .select()
    .from(documents)
    .where(eq(documents.shareToken, token))
    .limit(1);

  if (!doc) notFound();

  const content = doc.content as {
    sections?: { title: string; content: string }[];
    pricing?: { items: { description: string; amount: number }[]; total: number };
  } | null;

  const status = statusConfig[doc.status] ?? statusConfig.draft;

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex h-14 items-center border-b border-hairline px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logomark className="size-6" />
          <span className="text-sm font-semibold text-ink">Propel</span>
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-ink">{doc.title}</h1>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ${status.bg} text-ink`}>
                <span className={`size-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {typeLabels[doc.type] ?? doc.type}
              {doc.recipientName && ` · Prepared for: ${doc.recipientName}`}
            </p>
          </div>
        </div>

        {content?.sections && content.sections.length > 0 ? (
          <div className="mt-8 space-y-8">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
                <div className="mt-2 text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-16">
            <FileText className="size-12 text-ink-tertiary" />
            <p className="mt-3 text-sm text-ink-muted">No content</p>
          </div>
        )}

        {content?.pricing && (
          <>
            <Separator className="my-8" />
            <div>
              <h2 className="text-lg font-semibold text-ink">Pricing</h2>
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

        <footer className="mt-12 border-t border-hairline pt-6 text-center">
          <p className="text-xs text-ink-tertiary">
            Powered by <span className="text-ink-muted">Propel</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
