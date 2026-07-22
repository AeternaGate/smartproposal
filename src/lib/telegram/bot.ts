import { Telegraf, Markup } from "telegraf";
import type { Update } from "telegraf/types";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");

export const bot = new Telegraf(token);

const WIZARD_TIMEOUT = 15 * 60 * 1000;

async function getUserByChatId(chatId: string) {
  const { db } = await import("@/db");
  const { users } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");
  const [user] = await db.select().from(users).where(eq(users.telegramChatId, chatId)).limit(1);
  return user;
}

async function getWizardState(chatId: string) {
  const { db } = await import("@/db");
  const { wizardStates } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");
  const [state] = await db.select().from(wizardStates).where(eq(wizardStates.chatId, chatId)).limit(1);

  if (!state) return null;
  if (Date.now() - new Date(state.updatedAt).getTime() > WIZARD_TIMEOUT) {
    await db.delete(wizardStates).where(eq(wizardStates.chatId, chatId));
    return null;
  }
  return state;
}

async function setWizardState(chatId: string, userId: string | undefined, state: Record<string, unknown>) {
  const { db } = await import("@/db");
  const { wizardStates } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  await db
    .insert(wizardStates)
    .values({ chatId, userId, state, createdAt: new Date(), updatedAt: new Date() })
    .onConflictDoUpdate({
      target: [wizardStates.chatId],
      set: { state, updatedAt: new Date() },
    });
}

async function clearWizardState(chatId: string) {
  const { db } = await import("@/db");
  const { wizardStates } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(wizardStates).where(eq(wizardStates.chatId, chatId));
}

// ─── /start ──────────────────────────────────────────────────

bot.start(async (ctx) => {
  const code = ctx.payload.trim();

  if (!code) {
    await ctx.reply(
      "👋 Welcome to Propel!\n\n"
        + "I help you create and manage proposals, contracts, and invoices.\n\n"
        + "To link your account, get a code from:\n"
        + "Propel Dashboard → Settings → Telegram\n\n"
        + "Then send: /start <code>\n\n"
        + "Commands:\n"
        + "/create — Create a new document\n"
        + "/templates — List your templates\n"
        + "/proposals — View recent documents\n"
        + "/help — Show all commands",
      Markup.keyboard([["/create", "/templates"], ["/proposals", "/help"]]).resize(),
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
    .where(and(eq(users.telegramVerificationCode, code), gt(users.telegramVerificationExpiresAt, now)))
    .limit(1);

  if (!user) {
    await ctx.reply("❌ Invalid or expired code. Generate a new one in Settings.");
    return;
  }

  await db
    .update(users)
    .set({ telegramChatId: String(ctx.chat.id), telegramVerificationCode: null, telegramVerificationExpiresAt: null })
    .where(eq(users.id, user.id));

  await ctx.reply(
    "✅ Telegram linked! Now you can manage your documents here.\n\nTry: /create",
    Markup.keyboard([["/create", "/templates"], ["/proposals", "/help"]]).resize(),
  );
});

// ─── /create ──────────────────────────────────────────────────

bot.command("create", async (ctx) => {
  const user = await getUserByChatId(String(ctx.chat.id));
  if (!user) {
    await ctx.reply("❌ Account not linked. Use /start to get instructions.");
    return;
  }

  await setWizardState(String(ctx.chat.id), user.id, { step: "type" });

  await ctx.reply(
    "📄 What type of document do you want to create?",
    Markup.inlineKeyboard([
      Markup.button.callback("📝 Proposal", "wizard_type_proposal"),
      Markup.button.callback("📄 Contract", "wizard_type_contract"),
      Markup.button.callback("🧾 Invoice", "wizard_type_invoice"),
      Markup.button.callback("❌ Cancel", "wizard_cancel"),
    ]),
  );
});

// ─── Templates ────────────────────────────────────────────────

bot.command("templates", async (ctx) => {
  const user = await getUserByChatId(String(ctx.chat.id));
  if (!user) {
    await ctx.reply("❌ Account not linked. Use /start to get instructions.");
    return;
  }

  const { db } = await import("@/db");
  const { templates } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const userTemplates = await db.select().from(templates).where(eq(templates.userId, user.id));

  if (userTemplates.length === 0) {
    await ctx.reply("📂 No templates yet. Create one in the dashboard.");
    return;
  }

  const keyboard = userTemplates.map((t) =>
    [Markup.button.callback(`📄 ${t.name}`, `template_select_${t.id}`)],
  );
  keyboard.push([Markup.button.callback("❌ Close", "wizard_cancel")]);

  await ctx.reply("📂 Your templates:", Markup.inlineKeyboard(keyboard));
});

// ─── /proposals ───────────────────────────────────────────────

bot.command("proposals", async (ctx) => {
  const user = await getUserByChatId(String(ctx.chat.id));
  if (!user) {
    await ctx.reply("❌ Account not linked. Use /start to get instructions.");
    return;
  }

  const { db } = await import("@/db");
  const { documents } = await import("@/db/schema");
  const { eq, desc } = await import("drizzle-orm");

  const docs = await db
    .select({ id: documents.id, title: documents.title, status: documents.status, type: documents.type, createdAt: documents.createdAt })
    .from(documents)
    .where(eq(documents.userId, user.id))
    .orderBy(desc(documents.createdAt))
    .limit(10);

  if (docs.length === 0) {
    await ctx.reply("📂 No documents yet. Try: /create");
    return;
  }

  const keyboard = docs.map((d) => {
    const label = `${d.type === "proposal" ? "📝" : d.type === "contract" ? "📄" : "🧾"} ${d.title}`;
    return [Markup.button.callback(label, `proposal_view_${d.id}`)];
  });

  await ctx.reply("📂 Your recent documents:", Markup.inlineKeyboard(keyboard));
});

// ─── /help ────────────────────────────────────────────────────

bot.help(async (ctx) => {
  await ctx.reply(
    "📋 *Propel Bot Commands*\n\n"
      + "/start — Link your account\n"
      + "/create — Create a proposal, contract, or invoice\n"
      + "/templates — Browse your templates\n"
      + "/proposals — View recent documents\n"
      + "/help — This message\n\n"
      + "Need more help? Visit propel.so",
    { parse_mode: "Markdown" },
  );
});

// ─── Callback Query Handler ───────────────────────────────────

bot.on("callback_query", async (ctx) => {
  if (!("data" in ctx.callbackQuery)) return;
  const data = ctx.callbackQuery.data;
  const chatId = String(ctx.chat?.id);

  if (data === "wizard_cancel") {
    await clearWizardState(chatId);
    await ctx.editMessageText("❌ Cancelled.");
    await ctx.answerCbQuery();
    return;
  }

  // ── Wizard: type selection ──
  if (data?.startsWith("wizard_type_")) {
    const docType = data.replace("wizard_type_", "");
    await setWizardState(chatId, undefined, { step: "title", type: docType });

    await ctx.editMessageText(
      `Great! You're creating a *${docType}*.\n\nNow, send me a title for this document.`,
      { parse_mode: "Markdown" },
    );
    await ctx.answerCbQuery();
    return;
  }

  // ── Wizard: template selection ──
  if (data?.startsWith("template_select_")) {
    const templateId = data.replace("template_select_", "");
    const wizard = await getWizardState(chatId);
    if (wizard) {
      const state = wizard.state as Record<string, unknown>;
      state.templateId = templateId;
      await setWizardState(chatId, wizard.userId ?? undefined, state);
    }

    await ctx.editMessageText("✅ Template selected! Now send me the client name.");
    await ctx.answerCbQuery();
    return;
  }

  // ── View proposal ──
  if (data?.startsWith("proposal_view_")) {
    const docId = data.replace("proposal_view_", "");
    const user = await getUserByChatId(chatId);
    if (!user) {
      await ctx.answerCbQuery("Account not linked");
      return;
    }

    const { APP_URL } = await import("@/lib/constants");
    await ctx.editMessageText(
      `📄 Document: ${docId.slice(0, 8)}...\n\n`
        + `Share link: ${APP_URL}/share/${docId}`,
      Markup.inlineKeyboard([
        [Markup.button.url("🔗 Open", `${APP_URL}/share/${docId}`)],
        [Markup.button.callback("◀️ Back", "proposals_back")],
      ]),
    );
    await ctx.answerCbQuery();
    return;
  }

  if (data === "proposals_back") {
    await ctx.deleteMessage();
    await ctx.reply("Use /proposals to view your documents again.");
    await ctx.answerCbQuery();
    return;
  }

  await ctx.answerCbQuery();
});

// ─── Text handler (wizard steps) ──────────────────────────────

bot.on("text", async (ctx) => {
  if (!ctx.chat) return;
  const chatId = String(ctx.chat.id);
  const wizard = await getWizardState(chatId);
  if (!wizard) return;

  const state = wizard.state as Record<string, unknown>;
  const step = state.step as string;
  const text = ctx.message.text;

  if (step === "title") {
    state.title = text;
    state.step = "client_name";
    await setWizardState(chatId, wizard.userId ?? undefined, state);
    await ctx.reply("Got it! Now send me the client name.");
    return;
  }

  if (step === "client_name") {
    state.clientName = text;
    state.step = "description";
    await setWizardState(chatId, wizard.userId ?? undefined, state);
    await ctx.reply("Thanks! Now describe what this document should cover:");
    return;
  }

  if (step === "description") {
    state.description = text;
    state.step = "confirm";
    await setWizardState(chatId, wizard.userId ?? undefined, state);

    const type = state.type as string;
    const title = state.title as string;
    const clientName = state.clientName as string;

    await ctx.reply(
      "📋 *Confirm your document:*\n\n"
        + `Type: ${type}\n`
        + `Title: ${title}\n`
        + `Client: ${clientName}\n\n`
        + "Ready to create?",
      {
        ...Markup.inlineKeyboard([
          [Markup.button.callback("✅ Confirm", "wizard_confirm")],
          [Markup.button.callback("❌ Cancel", "wizard_cancel")],
        ]),
        parse_mode: "Markdown",
      },
    );
    return;
  }
});

// ─── Wizard confirm callback ─────────────────────────────────

bot.action("wizard_confirm", async (ctx) => {
  const chatId = String(ctx.chat?.id);
  const wizard = await getWizardState(chatId);
  if (!wizard) {
    await ctx.answerCbQuery("Session expired");
    return;
  }

  const state = wizard.state as Record<string, unknown>;
  const { db } = await import("@/db");
  const { documents } = await import("@/db/schema");

  try {
    await db.insert(documents).values({
      userId: wizard.userId!,
      title: state.title as string,
      type: (state.type as "proposal" | "invoice" | "contract") || "proposal",
      recipientName: (state.clientName as string) || null,
      content: { sections: [{ title: "Overview", content: state.description as string }] },
      status: "draft",
    });

    await clearWizardState(chatId);
    await ctx.editMessageText("✅ Document created successfully!\n\nView it in the dashboard or use /proposals.");
    await ctx.answerCbQuery();
  } catch (error) {
    await ctx.editMessageText("❌ Failed to create document. Please try again.");
    await ctx.answerCbQuery();
  }
});
