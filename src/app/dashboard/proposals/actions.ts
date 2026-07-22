"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ROUTES } from "@/lib/constants";

export async function createProposal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(ROUTES.login);

  const title = formData.get("title") as string;
  const recipientName = formData.get("recipient_name") as string;
  const recipientEmail = formData.get("recipient_email") as string;
  const type = formData.get("type") as string;

  if (!title?.trim()) {
    redirect(`${ROUTES.proposalsNew}?error=${encodeURIComponent("Title is required")}`);
  }

  await db.insert(documents).values({
    userId: user.id,
    title: title.trim(),
    recipientName: recipientName?.trim() || null,
    recipientEmail: recipientEmail?.trim() || null,
    type: (type as "proposal" | "invoice" | "contract") || "proposal",
    content: {},
  });

  revalidatePath(ROUTES.proposals);
  revalidatePath(ROUTES.dashboard);
  redirect(ROUTES.proposals);
}

export async function deleteProposal(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await db.delete(documents).where(
    and(eq(documents.id, id), eq(documents.userId, user.id)),
  );

  revalidatePath(ROUTES.proposals);
  revalidatePath(ROUTES.dashboard);
}

export async function updateProposalStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await db
    .update(documents)
    .set({ status: status as typeof documents.$inferSelect.status, updatedAt: new Date() })
    .where(and(eq(documents.id, id), eq(documents.userId, user.id)));

  revalidatePath(ROUTES.proposals);
}
