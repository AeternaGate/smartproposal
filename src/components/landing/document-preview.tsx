export function DocumentPreview({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="60" y="20" width="280" height="240" rx="8" stroke="#23252a" strokeWidth="1" fill="#0f1011" />
      <rect x="60" y="20" width="280" height="40" rx="8" fill="#141516" />
      <rect x="60" y="44" width="280" height="16" fill="#141516" />
      <rect x="80" y="34" width="80" height="12" rx="2" fill="#34343a" />

      <rect x="80" y="76" width="60" height="6" rx="3" fill="#23252a" />
      <rect x="80" y="90" width="240" height="4" rx="2" fill="#23252a" opacity="0.5" />
      <rect x="80" y="100" width="200" height="4" rx="2" fill="#23252a" opacity="0.5" />

      <rect x="80" y="120" width="60" height="6" rx="3" fill="#23252a" />
      <rect x="80" y="134" width="240" height="4" rx="2" fill="#23252a" opacity="0.5" />
      <rect x="80" y="144" width="180" height="4" rx="2" fill="#23252a" opacity="0.5" />
      <rect x="80" y="154" width="220" height="4" rx="2" fill="#23252a" opacity="0.5" />

      <rect x="80" y="174" width="60" height="6" rx="3" fill="#23252a" />
      <rect x="80" y="188" width="200" height="4" rx="2" fill="#23252a" opacity="0.5" />

      <rect x="80" y="214" width="100" height="24" rx="4" fill="#5e6ad2" opacity="0.9" />
      <rect x="196" y="214" width="80" height="24" rx="4" fill="#23252a" />

      <path d="M82 262h236" stroke="#23252a" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="80" y="250" width="16" height="24" rx="2" fill="#5e6ad2" opacity="0.6" />
      <rect x="104" y="250" width="16" height="24" rx="2" fill="#34343a" />
      <rect x="128" y="250" width="16" height="24" rx="2" fill="#34343a" />
    </svg>
  );
}
