"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { documents, documentEvents } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function signDocument(token: string, signatureData: string) {
  const [doc] = await db
    .select({ id: documents.id, status: documents.status })
    .from(documents)
    .where(eq(documents.shareToken, token))
    .limit(1);

  if (!doc) throw new Error("Document not found");
  if (doc.status === "accepted") throw new Error("Already signed");

  await db
    .update(documents)
    .set({ status: "accepted", updatedAt: new Date() })
    .where(eq(documents.id, doc.id));

  await db.insert(documentEvents).values({
    documentId: doc.id,
    eventType: "signed",
    metadata: { signatureData },
  });

  revalidatePath(`/share/${token}`);
}
