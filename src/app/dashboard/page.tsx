import { FileText, Plus, LayoutTemplate, Clock } from "lucide-react";
import Link from "next/link";

import { NoDocuments } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

const quickStats = [
  {
    label: "Proposals",
    value: "0",
    icon: FileText,
    change: "3 remaining this month",
  },
  {
    label: "Templates",
    value: "0",
    icon: LayoutTemplate,
    change: "3 free templates",
  },
  {
    label: "Last Activity",
    value: "—",
    icon: Clock,
    change: "No activity yet",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Welcome to SmartProposal. Create your first proposal to get started.
          </p>
        </div>
        <Button asChild>
          <Link href="/proposals/new">
            <Plus className="size-4" />
            New Proposal
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-hairline bg-surface-1 p-4"
          >
            <div className="flex items-center gap-2 text-ink-muted">
              <stat.icon className="size-4" />
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-tertiary">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-ink-muted">Recent Proposals</h2>
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-hairline bg-surface-1 py-16">
          <NoDocuments className="size-24 text-ink-tertiary" />
          <p className="mt-4 text-sm text-ink-muted">No proposals yet</p>
          <p className="mt-1 text-xs text-ink-tertiary">
            Create your first proposal to see it here.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/proposals/new">
              <Plus className="size-4" />
              Create Proposal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
