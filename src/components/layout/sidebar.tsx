"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutTemplate,
  Settings,
  Home,
  CreditCard,
  LogOut,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logomark } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: Home },
  { href: ROUTES.proposals, label: "Proposals", icon: FileText },
  { href: ROUTES.templates, label: "Templates", icon: LayoutTemplate },
  { href: ROUTES.pricing, label: "Billing", icon: CreditCard },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 flex w-60 flex-col border-r border-hairline bg-canvas transition-transform duration-200 ease-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-hairline px-4">
          <Link href={ROUTES.dashboard} className="flex items-center gap-2">
            <Logomark className="size-6" />
            <span className="text-sm font-semibold text-ink">Propel</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-ink-muted hover:text-ink lg:hidden"
          >
            <X className="size-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-ink-muted hover:bg-surface-1 hover:text-ink",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-hairline p-2">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-surface-1 hover:text-ink transition-colors duration-150"
            >
              <LogOut className="size-4 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
