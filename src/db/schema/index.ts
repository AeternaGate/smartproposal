import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const subscriptionTierEnum = pgEnum("subscription_tier", ["free", "pro"]);
export const proposalStatusEnum = pgEnum("proposal_status", [
  "draft",
  "sent",
  "viewed",
  "accepted",
  "rejected",
]);
export const documentTypeEnum = pgEnum("document_type", ["proposal", "invoice", "contract"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  subscriptionTier: subscriptionTierEnum("subscription_tier").notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  documentsUsedThisMonth: integer("documents_used_this_month").notNull().default(0),
  subscriptionEndsAt: timestamp("subscription_ends_at", { withTimezone: true }),
  telegramChatId: text("telegram_chat_id"),
  telegramVerificationCode: text("telegram_verification_code"),
  telegramVerificationExpiresAt: timestamp("telegram_verification_expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  content: jsonb("content").notNull().default({}),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  templateId: uuid("template_id").references(() => templates.id, { onDelete: "set null" }),
  type: documentTypeEnum("type").notNull().default("proposal"),
  title: text("title").notNull(),
  content: jsonb("content").notNull().default({}),
  status: proposalStatusEnum("status").notNull().default("draft"),
  recipientEmail: text("recipient_email"),
  recipientName: text("recipient_name"),
  shareToken: uuid("share_token").defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  templates: many(templates),
  documents: many(documents),
}));

export const templatesRelations = relations(templates, ({ one, many }) => ({
  user: one(users, { fields: [templates.userId], references: [users.id] }),
  documents: many(documents),
}));

export const wizardStates = pgTable("wizard_states", {
  chatId: text("chat_id").primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  state: jsonb("state").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const documentEvents = pgTable("document_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentId: uuid("document_id")
    .notNull()
    .references(() => documents.id, { onDelete: "cascade" }),
  eventType: text("event_type", { enum: ["sent", "viewed", "signed", "paid", "reminded", "expired", "cancelled", "created"] }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const documentsRelations = relations(documents, ({ one, many }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  template: one(templates, { fields: [documents.templateId], references: [templates.id] }),
  events: many(documentEvents),
}));

export const documentEventsRelations = relations(documentEvents, ({ one }) => ({
  document: one(documents, { fields: [documentEvents.documentId], references: [documents.id] }),
}));
