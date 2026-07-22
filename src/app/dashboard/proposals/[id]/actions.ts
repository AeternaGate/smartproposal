"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ROUTES } from "@/lib/constants";

export async function updateStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await db
    .update(documents)
    .set({ status: status as typeof documents.$inferSelect.status, updatedAt: new Date() })
    .where(and(eq(documents.id, id), eq(documents.userId, user.id)));

  revalidatePath(`${ROUTES.proposals}/${id}`);
}

export async function updateProposal(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const title = formData.get("title") as string;
  const recipientName = formData.get("recipient_name") as string;
  const recipientEmail = formData.get("recipient_email") as string;
  const sectionsRaw = formData.get("sections") as string;
  const pricingRaw = formData.get("pricing") as string;

  const sections = sectionsRaw ? JSON.parse(sectionsRaw) : undefined;
  const pricing = pricingRaw ? JSON.parse(pricingRaw) : undefined;

  const content: Record<string, unknown> = {};
  if (sections) content.sections = sections;
  if (pricing) content.pricing = pricing;

  await db
    .update(documents)
    .set({
      title: title?.trim() || undefined,
      recipientName: recipientName?.trim() || null,
      recipientEmail: recipientEmail?.trim() || null,
      content: Object.keys(content).length > 0 ? (content as unknown as typeof documents.$inferSelect.content) : undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(documents.id, id), eq(documents.userId, user.id)));

  revalidatePath(`${ROUTES.proposals}/${id}`);
  redirect(`${ROUTES.proposals}/${id}`);
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await db
    .delete(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, user.id)));

  revalidatePath(ROUTES.proposals);
  redirect(ROUTES.proposals);
}
