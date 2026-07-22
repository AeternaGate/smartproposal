"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { templates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ROUTES } from "@/lib/constants";
import { defaultTemplates } from "@/lib/templates/defaults";

export async function loadDefaultTemplates() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const existing = await db
    .select({ id: templates.id })
    .from(templates)
    .where(eq(templates.userId, user.id))
    .limit(1);

  if (existing.length > 0) return;

  await db.insert(templates).values(
    defaultTemplates.map((tpl) => ({
      userId: user.id,
      name: tpl.name,
      description: tpl.description,
      content: { sections: tpl.sections },
      isPublic: false,
    })),
  );

  revalidatePath(ROUTES.templates);
  revalidatePath(ROUTES.dashboard);
}
