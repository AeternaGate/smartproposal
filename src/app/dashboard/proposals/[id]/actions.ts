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
