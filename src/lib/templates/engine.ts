import { db } from "@/db";
import { documents } from "@/db/schema";
import { renderTemplate } from "./defaults";

interface RenderOptions {
  templateContent: { sections: { title: string; content: string }[] };
  variables: Record<string, string>;
  title: string;
  userId: string;
  type: "proposal" | "contract" | "invoice";
  recipientName?: string;
  recipientEmail?: string;
}

export async function renderAndCreateDocument(options: RenderOptions) {
  const renderedSections = options.templateContent.sections.map((section) => ({
    title: section.title,
    content: renderTemplate(section.content, options.variables),
  }));

  const result = renderTemplate(options.title, options.variables);

  const [doc] = await db
    .insert(documents)
    .values({
      userId: options.userId,
      title: result,
      type: options.type,
      recipientName: options.recipientName ?? null,
      recipientEmail: options.recipientEmail ?? null,
      content: { sections: renderedSections },
      status: "draft",
    })
    .returning();

  return doc;
}
