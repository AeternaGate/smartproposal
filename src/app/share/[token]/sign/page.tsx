import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

import { Logomark } from "@/components/ui/icons";
import { SignForm } from "./form";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function SignPage({ params }: Props) {
  const { token } = await params;

  const [doc] = await db
    .select({ id: documents.id, title: documents.title, status: documents.status })
    .from(documents)
    .where(eq(documents.shareToken, token))
    .limit(1);

  if (!doc) notFound();

  const isSigned = doc.status === "accepted";

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex h-14 items-center border-b border-hairline px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logomark className="size-6" />
          <span className="text-sm font-semibold text-ink">Propel</span>
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12">
        <Link
          href={`/share/${token}`}
          className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          Back to document
        </Link>

        <h1 className="text-xl font-semibold text-ink">Sign Document</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isSigned
            ? `"${doc.title}" has already been signed.`
            : `Sign "${doc.title}" to accept.`}
        </p>

        {!isSigned && (
          <div className="mt-6 rounded-lg border border-hairline bg-surface-1 p-6">
            <SignForm token={token} />
          </div>
        )}
      </main>
    </div>
  );
}
