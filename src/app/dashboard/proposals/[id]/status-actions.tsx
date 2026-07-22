"use client";

import { updateStatus } from "./actions";
import { Button } from "@/components/ui/button";
import { Send, Eye, CheckCircle, XCircle } from "lucide-react";

const actionConfig: Record<string, { label: string; icon: typeof Send; variant: "default" | "secondary" | "destructive" }> = {
  sent: { label: "Mark Sent", icon: Send, variant: "default" },
  viewed: { label: "Mark Viewed", icon: Eye, variant: "secondary" },
  accepted: { label: "Accept", icon: CheckCircle, variant: "default" },
  rejected: { label: "Reject", icon: XCircle, variant: "destructive" },
};

export function StatusActions({ id, status, nextStatuses }: { id: string; status: string; nextStatuses: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {nextStatuses.map((nextStatus) => {
        const cfg = actionConfig[nextStatus];
        if (!cfg) return null;
        const Icon = cfg.icon;
        return (
          <form key={nextStatus} action={updateStatus.bind(null, id, nextStatus)}>
            <Button type="submit" size="sm" variant={cfg.variant}>
              <Icon className="size-3.5" />
              {cfg.label}
            </Button>
          </form>
        );
      })}
    </div>
  );
}
