export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#5e6ad2" />
      <path
        d="M12 24V8h6a6 6 0 010 12h-2l4 4h-4l-4-4z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#5e6ad2" />
      <path
        d="M12 24V8h6a6 6 0 010 12h-2l4 4h-4l-4-4z"
        fill="white"
        opacity="0.9"
      />
      <text
        x="42"
        y="22"
        fill="#f7f8f8"
        fontSize="16"
        fontWeight="600"
        fontFamily="Inter, system-ui"
        letterSpacing="-0.3"
      >
        Propel
      </text>
    </svg>
  );
}

export function NoDocuments({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="15" width="80" height="90" rx="8" stroke="#23252a" strokeWidth="2" fill="#0f1011" />
      <path d="M35 40h50M35 55h50M35 70h30" stroke="#34343a" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 90l8-8 8 8" stroke="#5e6ad2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

export function NoTemplates({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="20" width="80" height="20" rx="6" stroke="#23252a" strokeWidth="2" fill="#0f1011" />
      <rect x="20" y="50" width="80" height="20" rx="6" stroke="#23252a" strokeWidth="2" fill="#0f1011" />
      <rect x="20" y="80" width="80" height="20" rx="6" stroke="#23252a" strokeWidth="2" fill="#0f1011" />
      <path d="M60 30l-8 8M60 30l8 8" stroke="#5e6ad2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
