"use client";

import { useSearchParams } from "next/navigation";
import { FileText, Sparkles } from "lucide-react";
import { createProposal } from "../actions";
import { generateWithAi } from "../ai-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { InferSelectModel } from "drizzle-orm";
import type { templates } from "@/db/schema";

type Template = InferSelectModel<typeof templates>;

export function NewDocumentForm({ templates }: { templates: Template[] }) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          form="create-form"
          placeholder="e.g. Web Development Proposal — Acme Corp"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Document Type</Label>
        <select
          id="type"
          name="type"
          form="ai-form"
          defaultValue="proposal"
          className="flex h-10 w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        >
          <option value="proposal">Proposal</option>
          <option value="invoice">Invoice</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="recipient_name">Recipient Name (optional)</Label>
        <Input
          id="recipient_name"
          name="recipient_name"
          form="create-form"
          placeholder="e.g. Jane Smith"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient_email">Recipient Email (optional)</Label>
        <Input
          id="recipient_email"
          name="recipient_email"
          form="create-form"
          type="email"
          placeholder="jane@acme.com"
        />
      </div>

      <Separator />

      <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium text-ink">Generate with AI</span>
        </div>
        <p className="text-xs text-ink-tertiary">
          Describe what you need, and AI will create a complete document for you.
        </p>
        <div className="space-y-2">
          <Label htmlFor="prompt">What should this document include?</Label>
          <textarea
            id="prompt"
            name="prompt"
            form="ai-form"
            rows={4}
            placeholder="e.g. A web development proposal for a small business website including 5 pages, CMS integration, and SEO setup. Budget around $5,000."
            className="flex w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      {templates.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <Label>Template (optional)</Label>
            <div className="grid gap-2">
              {templates.map((tpl) => (
                <label
                  key={tpl.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-hairline p-3 hover:bg-surface-2 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="template_id"
                    form="create-form"
                    value={tpl.id}
                    className="accent-primary"
                  />
                  <div>
                    <p className="text-sm text-ink">{tpl.name}</p>
                    {tpl.description && (
                      <p className="text-xs text-ink-tertiary">{tpl.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <form id="ai-form" action={generateWithAi}>
          <Button type="submit" variant="secondary">
            <Sparkles className="size-4" />
            Generate with AI
          </Button>
        </form>
        <form id="create-form" action={createProposal}>
          <Button type="submit">
            <FileText className="size-4" />
            Create Blank
          </Button>
        </form>
      </div>
    </div>
  );
}
