"use client";

import { Bell, Search } from "lucide-react";

import { Logomark } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-hairline bg-canvas px-4 lg:px-6">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex items-center gap-2 lg:hidden">
          <Logomark className="size-6 shrink-0" />
        </div>
        <div className="relative hidden w-full max-w-sm sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            placeholder="Search proposals..."
            className="w-full rounded-md border border-hairline bg-surface-1 px-9 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink">
          <Bell className="size-4" />
        </Button>
      </div>
    </header>
  );
}
