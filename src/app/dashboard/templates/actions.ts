"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { templates } from "@/db/schema";
import { ROUTES } from "@/lib/constants";

export async function createTemplate(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(ROUTES.login);

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name?.trim()) {
    redirect(`${ROUTES.templatesNew}?error=${encodeURIComponent("Name is required")}`);
  }

  await db.insert(templates).values({
    userId: user.id,
    name: name.trim(),
    description: description?.trim() || null,
    content: {},
    isPublic: false,
  });

  revalidatePath(ROUTES.templates);
  redirect(ROUTES.templates);
}
