"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ROUTES } from "@/lib/constants";
import { APP_URL } from "@/lib/constants";
import { bot } from "@/lib/telegram/bot";

export async function generateTelegramCode() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const crypto = await import("node:crypto");
  const code = crypto.randomBytes(4).toString("hex");

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db
    .update(users)
    .set({
      telegramVerificationCode: code,
      telegramVerificationExpiresAt: expiresAt,
    })
    .where(eq(users.id, user.id));

  revalidatePath(ROUTES.settings);
  return { code, expiresAt };
}

export async function unlinkTelegram() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await db
    .update(users)
    .set({
      telegramChatId: null,
      telegramVerificationCode: null,
      telegramVerificationExpiresAt: null,
    })
    .where(eq(users.id, user.id));

  revalidatePath(ROUTES.settings);
}

export async function setWebhook() {
  const webhookUrl = `${APP_URL}/api/telegram/webhook`;
  try {
    await bot.telegram.setWebhook(webhookUrl);
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
