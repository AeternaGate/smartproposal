"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { generateDocumentContent, AI_MODELS } from "@/lib/ai/openrouter";
import { ROUTES } from "@/lib/constants";

export async function generateWithAi(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(ROUTES.login);

  const title = formData.get("title") as string;
  const prompt = formData.get("prompt") as string;
  const recipientName = formData.get("recipient_name") as string;
  const type = (formData.get("type") as string) || "proposal";

  if (!title?.trim()) {
    redirect(`${ROUTES.proposalsNew}?error=${encodeURIComponent("Title is required")}`);
  }

  if (!prompt?.trim()) {
    redirect(`${ROUTES.proposalsNew}?error=${encodeURIComponent("Describe what you need")}`);
  }

  try {
    const content = await generateDocumentContent({
      prompt: prompt.trim(),
      title: title.trim(),
      recipientName: recipientName?.trim() || undefined,
      type: type as "proposal" | "invoice" | "contract",
    });

    await db.insert(documents).values({
      userId: user.id,
      title: title.trim(),
      recipientName: recipientName?.trim() || null,
      type: (type as "proposal" | "invoice" | "contract") || "proposal",
      content: content as unknown as Record<string, unknown>,
      status: "draft",
    });

    revalidatePath(ROUTES.proposals);
    revalidatePath(ROUTES.dashboard);
    redirect(ROUTES.proposals);
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI generation failed";
    redirect(`${ROUTES.proposalsNew}?error=${encodeURIComponent(message)}`);
  }
}
