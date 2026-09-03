type Props = {
  id: string
  className?: string
}

// Minimal technical line icons, one per application vertical.
export default function AppIcon({ id, className }: Props) {
  const common = {
    className,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (id) {
    case 'mining':
      return (
        <svg {...common}>
          <path d="M6 36 L18 14 L26 28 L32 18 L42 36 Z" />
          <circle cx="14" cy="30" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'filter-press':
      return (
        <svg {...common}>
          <rect x="10" y="8" width="4" height="32" />
          <rect x="34" y="8" width="4" height="32" />
          {[12, 18, 24, 30].map((y) => (
            <line key={y} x1="14" y1={y} x2="34" y2={y} />
          ))}
        </svg>
      )
    case 'stone':
      return (
        <svg {...common}>
          <path d="M8 32 L16 12 L28 16 L40 30 L34 38 L14 38 Z" />
        </svg>
      )
    case 'ceramics':
      return (
        <svg {...common}>
          <path d="M16 8 H32 L30 20 C34 24 34 34 28 38 H20 C14 34 14 24 18 20 Z" />
        </svg>
      )
    case 'chemical':
      return (
        <svg {...common}>
          <path d="M20 8 V18 L11 36 A3 3 0 0 0 14 40 H34 A3 3 0 0 0 37 36 L28 18 V8" />
          <line x1="17" y1="8" x2="31" y2="8" />
          <line x1="16" y1="30" x2="32" y2="30" />
        </svg>
      )
    case 'steel':
      return (
        <svg {...common}>
          <rect x="8" y="20" width="10" height="16" />
          <rect x="20" y="12" width="10" height="24" />
          <rect x="32" y="24" width="8" height="12" />
          <line x1="6" y1="36" x2="42" y2="36" />
        </svg>
      )
    case 'power':
      return (
        <svg {...common}>
          <path d="M26 6 L12 26 H22 L18 42 L36 20 H26 Z" />
        </svg>
      )
    case 'drilling':
      return (
        <svg {...common}>
          <line x1="24" y1="6" x2="24" y2="30" />
          <path d="M16 30 H32 L28 40 H20 Z" />
          <line x1="18" y1="14" x2="30" y2="14" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
        </svg>
      )
  }
}
