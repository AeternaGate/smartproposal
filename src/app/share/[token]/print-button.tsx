"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 rounded-md border border-hairline px-3 py-1.5 text-xs text-ink-muted hover:text-ink hover:bg-surface-1 transition-colors cursor-pointer"
    >
      <Printer className="size-3.5" />
      PDF
    </button>
  );
}
