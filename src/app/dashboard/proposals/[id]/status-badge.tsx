const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  draft: { label: "Draft", dot: "bg-ink-tertiary", bg: "bg-ink-tertiary/10" },
  sent: { label: "Sent", dot: "bg-blue-500", bg: "bg-blue-500/10" },
  viewed: { label: "Viewed", dot: "bg-yellow-500", bg: "bg-yellow-500/10" },
  accepted: { label: "Accepted", dot: "bg-green-500", bg: "bg-green-500/10" },
  rejected: { label: "Rejected", dot: "bg-red-500", bg: "bg-red-500/10" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ${cfg.bg} text-ink`}>
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
