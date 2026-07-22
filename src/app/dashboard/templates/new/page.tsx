import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTemplate } from "../actions";

export default function NewTemplatePage() {
  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-xl font-semibold text-ink">New Template</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Create a reusable template for your documents.
        </p>
      </div>
      <div className="mt-6 rounded-lg border border-hairline bg-surface-1 p-6">
        <form action={createTemplate} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Web Development Proposal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="What is this template for?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="submit">
              <LayoutTemplate className="size-4" />
              Create Template
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
