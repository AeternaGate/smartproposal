import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { templates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ROUTES, FREE_LIMITS } from "@/lib/constants";
import { NewDocumentForm } from "./form";

export default async function NewProposalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(ROUTES.login);

  const userTemplates = await db
    .select()
    .from(templates)
    .where(eq(templates.userId, user.id));

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-xl font-semibold text-ink">New Document</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Create a proposal, invoice, or contract.
        </p>
      </div>
      <div className="mt-6 rounded-lg border border-hairline bg-surface-1 p-6">
        <NewDocumentForm templates={userTemplates} />
      </div>
    </div>
  );
}
