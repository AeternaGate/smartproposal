"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { updateProposal } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Section {
  title: string;
  content: string;
}

interface Pricing {
  items: { description: string; amount: number }[];
  total: number;
}

interface Props {
  id: string;
  title: string;
  recipientName: string;
  recipientEmail: string;
  sections: Section[];
  pricing: Pricing | null;
}

export function EditForm({ id, title, recipientName, recipientEmail, sections: initialSections, pricing: initialPricing }: Props) {
  const [sections, setSections] = useState<Section[]>(
    initialSections.length > 0 ? initialSections : [{ title: "", content: "" }],
  );
  const [pricing, setPricing] = useState<Pricing>(
    initialPricing ?? { items: [{ description: "", amount: 0 }], total: 0 },
  );

  function addSection() {
    setSections([...sections, { title: "", content: "" }]);
  }

  function removeSection(index: number) {
    setSections(sections.filter((_, i) => i !== index));
  }

  function updateSection(index: number, field: keyof Section, value: string) {
    const updated = sections.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    setSections(updated);
  }

  function addPricingItem() {
    setPricing({
      ...pricing,
      items: [...pricing.items, { description: "", amount: 0 }],
    });
  }

  function removePricingItem(index: number) {
    const items = pricing.items.filter((_, i) => i !== index);
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    setPricing({ ...pricing, items, total });
  }

  function updatePricingItem(index: number, field: "description" | "amount", value: string) {
    const items = pricing.items.map((item, i) => {
      if (i !== index) return item;
      const updated = { ...item, [field]: field === "amount" ? Number(value) || 0 : value };
      return updated;
    });
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    setPricing({ ...pricing, items, total });
  }

  return (
    <form action={updateProposal.bind(null, id)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={title} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recipient_name">Recipient Name</Label>
          <Input id="recipient_name" name="recipient_name" defaultValue={recipientName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipient_email">Recipient Email</Label>
          <Input id="recipient_email" name="recipient_email" type="email" defaultValue={recipientEmail} />
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <Label>Sections</Label>
          <Button type="button" variant="ghost" size="sm" onClick={addSection}>
            <Plus className="size-3.5" />
            Add Section
          </Button>
        </div>
        <div className="mt-3 space-y-4">
          {sections.map((section, i) => (
            <div key={i} className="rounded-lg border border-hairline p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink-tertiary">Section {i + 1}</span>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(i)}
                    className="p-1 text-ink-tertiary hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-2 space-y-2">
                <input type="hidden" name="sections" value={JSON.stringify(sections)} />
                <Input
                  placeholder="Section title"
                  value={section.title}
                  onChange={(e) => updateSection(i, "title", e.target.value)}
                />
                <textarea
                  placeholder="Section content..."
                  rows={4}
                  value={section.content}
                  onChange={(e) => updateSection(i, "content", e.target.value)}
                  className="flex w-full rounded-md border border-hairline bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <Label>Pricing</Label>
          <Button type="button" variant="ghost" size="sm" onClick={addPricingItem}>
            <Plus className="size-3.5" />
            Add Item
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          <input type="hidden" name="pricing" value={JSON.stringify(pricing)} />
          {pricing.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => updatePricingItem(i, "description", e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={item.amount || ""}
                onChange={(e) => updatePricingItem(i, "amount", e.target.value)}
                className="w-32"
              />
              {pricing.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePricingItem(i)}
                  className="p-1.5 text-ink-tertiary hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end border-t border-hairline pt-2 text-sm">
            <span className="text-ink-muted">Total: </span>
            <span className="ml-2 font-semibold text-ink">${pricing.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
