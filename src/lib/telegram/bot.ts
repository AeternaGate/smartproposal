import { Telegraf, Markup } from "telegraf";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not configured");
}

export const bot = new Telegraf(token);

bot.start(async (ctx) => {
  const code = ctx.payload.trim();

  if (!code) {
    await ctx.reply(
      "👋 Welcome to Propel!\n\n"
        + "I help you manage your proposals from Telegram.\n\n"
        + "To link your account:\n"
        + "1. Go to Propel dashboard → Settings → Telegram\n"
        + "2. Get your verification code\n"
        + "3. Send: /start <code>\n\n"
        + "Commands:\n"
        + "/proposals — View your recent proposals",
      Markup.keyboard([["/proposals"]]).resize(),
    );
    return;
  }

  const { db } = await import("@/db");
  const { users } = await import("@/db/schema");
  const { eq, and, gt } = await import("drizzle-orm");

  const now = new Date();

  const [user] = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.telegramVerificationCode, code),
        gt(users.telegramVerificationExpiresAt, now),
      ),
    )
    .limit(1);

  if (!user) {
    await ctx.reply("❌ Invalid or expired code. Generate a new one in Settings.");
    return;
  }

  await db
    .update(users)
    .set({
      telegramChatId: String(ctx.chat.id),
      telegramVerificationCode: null,
      telegramVerificationExpiresAt: null,
    })
    .where(eq(users.id, user.id));

  await ctx.reply(
    "✅ Telegram linked! Now you can manage your proposals here.\n\n"
      + "Try: /proposals",
    Markup.keyboard([["/proposals"]]).resize(),
  );
});

bot.command("proposals", async (ctx) => {
  const chatId = String(ctx.chat.id);

  const { db } = await import("@/db");
  const { users, documents } = await import("@/db/schema");
  const { eq, desc } = await import("drizzle-orm");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.telegramChatId, chatId))
    .limit(1);

  if (!user) {
    await ctx.reply(
      "❌ Account not linked.\n"
        + "Go to Propel Settings → Telegram to get a verification code.",
    );
    return;
  }

  const userDocs = await db
    .select({ title: documents.title, status: documents.status, createdAt: documents.createdAt })
    .from(documents)
    .where(eq(documents.userId, user.id))
    .orderBy(desc(documents.createdAt))
    .limit(5);

  if (userDocs.length === 0) {
    await ctx.reply("📂 No proposals yet. Create one at propel.so");
    return;
  }

  const lines = userDocs.map(
    (d, i) =>
      `${i + 1}. ${d.title} — ${d.status}\n`
        + `   ${new Date(d.createdAt).toLocaleDateString()}`,
  );

  await ctx.reply(`📂 Your recent proposals:\n\n${lines.join("\n")}`);
});

bot.help(async (ctx) => {
  await ctx.reply(
    "Commands:\n"
      + "/start [code] — Link your account\n"
      + "/proposals — View recent proposals\n"
      + "/help — This message",
  );
});
