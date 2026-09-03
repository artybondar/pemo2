import { useEffect, useState } from 'react'

type Props = {
  className?: string
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

const callouts = [
  { x: 40, y: 46, label: 'Всасывающий патрубок' },
  { x: 260, y: 10, label: 'Разборный корпус' },
  { x: 320, y: 210, label: 'Импеллер' },
  { x: 470, y: 120, label: 'Уплотнение' },
]

export default function PumpSchematic({ className }: Props) {
  const reduced = useReducedMotion()
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="Схема центробежного насоса PEMO в разрезе: всасывающий патрубок, разборный корпус, импеллер и узел уплотнения"
    >
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        </pattern>
      </defs>

      {/* baseline / grid */}
      <line x1="0" y1="300" x2="560" y2="300" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />

      {/* IN / OUT labels */}
      <text x="15" y="140" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="currentColor" opacity="0.6">
        ВХОД
      </text>
      <text x="395" y="10" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="currentColor" opacity="0.6">
        ВЫХОД
      </text>

      {/* volute casing */}
      <path
        d="M180 60
           C 120 60, 90 110, 90 165
           C 90 225, 140 265, 210 265
           C 250 265, 275 245, 285 220
           L 340 220
           C 350 245, 380 265, 420 265
           C 340 260, 300 220, 300 165
           C 300 105, 250 60, 180 60 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* suction pipe (left) */}
      <rect x="10" y="150" width="90" height="34" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="150" x2="10" y2="184" stroke="currentColor" strokeWidth="2.5" />

      {/* discharge pipe (top right, angled) */}
      <path d="M300 70 L300 30 L 430 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="380" y="14" width="55" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" />

      {/* shaft */}
      <line x1="300" y1="165" x2="500" y2="165" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

      {/* seal housing */}
      <rect x="440" y="140" width="46" height="50" fill="url(#hatch)" stroke="currentColor" strokeWidth="2" />

      {/* bearing block */}
      <rect x="486" y="128" width="60" height="74" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      

      {/* impeller (rotating group) */}
      <g style={{ transformOrigin: '190px 165px' }} className="motion-safe:animate-spin-slow">
        <circle cx="190" cy="165" r="58" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 5" opacity="0.5" />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180
          const x1 = 190 + Math.cos(angle) * 16
          const y1 = 165 + Math.sin(angle) * 16
          const x2 = 190 + Math.cos(angle) * 52
          const y2 = 165 + Math.sin(angle) * 52
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${190 + Math.cos(angle + 0.5) * 36} ${165 + Math.sin(angle + 0.5) * 36}, ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )
        })}
        <circle cx="190" cy="165" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </g>

      {/* center hub dot, static */}
      <circle cx="190" cy="165" r="3" fill="currentColor" />

      {/* animated flow particles: suction -> volute -> discharge */}
      {!reduced && (
        <g className="text-accent">
          {[0, 0.9, 1.8].map((delay, i) => (
            <circle key={i} r="3" fill="currentColor" opacity={1 - i * 0.25}>
              <animateMotion
                dur="2.8s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                path="M 20 167 L 90 167 C 130 167, 140 140, 165 130 C 220 105, 280 90, 300 65 L 300 30 L 420 30"
              />
            </circle>
          ))}
        </g>
      )}

      {/* leader lines for callouts */}
      <line x1="55" y1="150" x2="55" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {callouts.map((c) => (
        <text
          key={c.label}
          x={c.x}
          y={c.y}
          fontFamily="var(--font-mono)"
          fontSize="10.5"
          fill="currentColor"
          opacity="0.75"
        >
          {c.label}
        </text>
      ))}
    </svg>
  )
}
