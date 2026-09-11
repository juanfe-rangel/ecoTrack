export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M26 6C16 7 8 14 8 22c0 3.3 1.7 6 4 8 8-2 14-10 15-20 .2-2.2-.4-3.6-1-4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 26c3-6 8-11 14-14"
        stroke="#ecfdf5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h11v8H3V7Zm11 3h4l3 3v2h-7V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function FuelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4h8v12H6V4Zm8 4h2.5a2.5 2.5 0 0 1 2.5 2.5V16a2 2 0 1 0 2 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
