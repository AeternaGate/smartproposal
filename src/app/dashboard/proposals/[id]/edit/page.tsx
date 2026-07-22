import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq, and } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/constants";
import { EditForm } from "./form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProposalPage({ params }: Props) {
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

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <Link
        href={`${ROUTES.proposals}/${id}`}
        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors mb-4"
      >
        <ArrowLeft className="size-3.5" />
        Back to proposal
      </Link>

      <div>
        <h1 className="text-xl font-semibold text-ink">Edit Document</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Update your proposal content and details.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-hairline bg-surface-1 p-6">
        <EditForm
          id={doc.id}
          title={doc.title}
          recipientName={doc.recipientName ?? ""}
          recipientEmail={doc.recipientEmail ?? ""}
          sections={content?.sections ?? []}
          pricing={content?.pricing ?? null}
        />
      </div>
    </div>
  );
}
