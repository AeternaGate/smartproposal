import { Plus, LayoutTemplate } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { templates } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import { NoTemplates } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { seedDefaultTemplates } from "./actions";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user!.id;

  const userTemplates = await db
    .select()
    .from(templates)
    .where(eq(templates.userId, userId))
    .orderBy(desc(templates.createdAt));

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Templates</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {userTemplates.length} template{userTemplates.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.templatesNew}>
            <Plus className="size-4" />
            New Template
          </Link>
        </Button>
      </div>

      {userTemplates.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-lg border border-hairline bg-surface-1 p-4 hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate className="size-4 text-primary" />
                <h3 className="text-sm font-medium text-ink">{tpl.name}</h3>
              </div>
              {tpl.description && (
                <p className="mt-2 text-xs text-ink-tertiary line-clamp-2">
                  {tpl.description}
                </p>
              )}
              <p className="mt-3 text-xs text-ink-tertiary">
                Created {new Date(tpl.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-24">
          <NoTemplates className="size-24 text-ink-tertiary" />
          <p className="mt-4 text-sm text-ink-muted">No templates yet</p>
          <p className="mt-1 text-xs text-ink-tertiary">
            Create a template from scratch or load our defaults to get started.
          </p>
          <div className="mt-4 flex gap-3">
            <Button asChild variant="secondary">
              <Link href={ROUTES.templatesNew}>
                <Plus className="size-4" />
                Create Template
              </Link>
            </Button>
            <form action={seedDefaultTemplates}>
              <Button type="submit">
                <LayoutTemplate className="size-4" />
                Load Defaults
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
