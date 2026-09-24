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

export default function PumpSchematic({ className }: Props) {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 1100 650"
      className={className}
      role="img"
      aria-label="Детализированная анимированная схема центробежного насоса в разрезе"
    >
      <defs>
        {/* Штриховка металла (уплотнение) */}
        <pattern id="hatch-seal" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7" />
        </pattern>
        {/* Штриховка корпуса (разрез) */}
        <pattern id="hatch-casing" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.18" />
        </pattern>
        {/* Штриховка опоры */}
        <pattern id="hatch-base" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        </pattern>
        {/* Градиент потока */}
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
        {/* Радиальный градиент импеллера */}
        <radialGradient id="impellerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9540a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d9540a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ================= ОПОРНАЯ ПЛИТА (ФУНДАМЕНТ) ================= */}
      <rect x="100" y="590" width="900" height="30" rx="4" fill="url(#hatch-base)" stroke="currentColor" strokeWidth="2.5" />
      <line x1="150" y1="620" x2="150" y2="640" stroke="currentColor" strokeWidth="3" />
      <line x1="950" y1="620" x2="950" y2="640" stroke="currentColor" strokeWidth="3" />

      {/* ================= ОПОРНАЯ ЛАПА КОРПУСА ================= */}
      <path
        d="M 180 520 L 180 590 L 500 590 L 500 520 Z"
        fill="url(#hatch-casing)"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* ================= КОРПУС (УЛИТКА) ================= */}
      <path
        d="M 300 130 
           C 140 130, 60 250, 60 360 
           C 60 500, 200 540, 340 540 
           C 450 540, 520 490, 560 420 
           L 720 420 
           C 790 490, 870 510, 930 510 
           C 820 480, 760 400, 760 290 
           C 760 160, 620 130, 300 130 Z"
        fill="url(#hatch-casing)"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Внутренняя стенка (толщина) */}
      <path
        d="M 300 175 
           C 190 175, 120 265, 120 360 
           C 120 460, 220 495, 340 495 
           C 410 495, 460 470, 490 420 
           L 720 420 
           C 760 465, 810 480, 850 480 
           C 780 460, 720 390, 720 290 
           C 720 200, 610 175, 300 175 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />

      {/* ================= ВСАСЫВАЮЩИЙ ПАТРУБОК ================= */}
      <g stroke="currentColor" strokeWidth="3" fill="none">
        <rect x="10" y="320" width="110" height="80" rx="3" />
        {/* Фланец */}
        <rect x="0" y="308" width="22" height="104" rx="3" fill="currentColor" opacity="0.85" />
        {/* Болты фланца */}
        <circle cx="11" cy="322" r="3" fill="#fff" opacity="0.7" />
        <circle cx="11" cy="398" r="3" fill="#fff" opacity="0.7" />
      </g>

      {/* ================= НАГНЕТАТЕЛЬНЫЙ ПАТРУБОК ================= */}
      <g stroke="currentColor" strokeWidth="3" fill="none">
        <rect x="790" y="30" width="90" height="120" rx="3" />
        {/* Фланец */}
        <rect x="778" y="18" width="114" height="22" rx="3" fill="currentColor" opacity="0.85" />
        <circle cx="792" cy="29" r="3" fill="#fff" opacity="0.7" />
        <circle cx="878" cy="29" r="3" fill="#fff" opacity="0.7" />
      </g>

      {/* ================= ОПОРНАЯ СТОЙКА ================= */}
      <path
        d="M 700 420 L 700 590 L 980 590 L 980 420 Z"
        fill="url(#hatch-casing)"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* ================= ВАЛ ================= */}
      <line x1="300" y1="360" x2="980" y2="360" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      {/* Шейки вала под подшипники */}
      <rect x="820" y="345" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="900" y="345" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

      {/* ================= КОРПУС УПЛОТНЕНИЯ ================= */}
      <g stroke="currentColor" strokeWidth="2.5" fill="none">
        {/* Кольцо сальника */}
        <rect x="700" y="305" width="55" height="110" fill="url(#hatch-seal)" strokeWidth="2.5" />
        {/* Нажимная втулка */}
        <rect x="755" y="315" width="40" height="90" strokeWidth="2" />
        {/* Гайки нажимной втулки */}
        <circle cx="775" cy="325" r="3" fill="currentColor" />
        <circle cx="775" cy="395" r="3" fill="currentColor" />
      </g>

      {/* ================= ПОДШИПНИКОВЫЙ УЗЕЛ ================= */}
      <g stroke="currentColor" strokeWidth="2.5" fill="none">
        {/* Корпус подшипника */}
        <rect x="795" y="280" width="180" height="160" rx="8" />
        
        {/* Передний подшипник */}
        <rect x="820" y="300" width="55" height="120" rx="4" strokeWidth="2" />
        <circle cx="847" cy="325" r="5" fill="currentColor" opacity="0.35" />
        <circle cx="847" cy="360" r="5" fill="currentColor" opacity="0.35" />
        <circle cx="847" cy="395" r="5" fill="currentColor" opacity="0.35" />
        
        {/* Задний подшипник */}
        <rect x="895" y="300" width="55" height="120" rx="4" strokeWidth="2" />
        <circle cx="922" cy="325" r="5" fill="currentColor" opacity="0.35" />
        <circle cx="922" cy="360" r="5" fill="currentColor" opacity="0.35" />
        <circle cx="922" cy="395" r="5" fill="currentColor" opacity="0.35" />
        
        {/* Крышка подшипника (справа) */}
        <rect x="975" y="285" width="30" height="150" rx="4" fill="url(#hatch-casing)" />
        {/* Болты крышки */}
        <circle cx="990" cy="305" r="3" fill="currentColor" />
        <circle cx="990" cy="415" r="3" fill="currentColor" />
        
        {/* Маслёнка */}
        <rect x="860" y="260" width="20" height="25" rx="3" fill="none" />
        <circle cx="870" cy="255" r="6" fill="none" strokeWidth="2" />
      </g>

      {/* ================= ИМПЕЛЛЕР (РАБОЧЕЕ КОЛЕСО) ================= */}
      <g style={{ transformOrigin: '300px 360px' }} className={reduced ? '' : 'motion-safe:animate-spin-slow'}>
        {/* Ореол вращения */}
        <circle cx="300" cy="360" r="120" fill="url(#impellerGrad)" />
        {/* Внешний обод */}
        <circle cx="300" cy="360" r="120" fill="none" stroke="#d9540a" strokeWidth="4" opacity="0.4" />
        
        {/* Лопатки — 8 штук, математически идентичные */}
        <g stroke="#d9540a" strokeWidth="5" strokeLinecap="round" fill="none">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180 // 8 лопаток = 45° между ними
            
            // Начало лопатки (от ступицы)
            const startR = 45
            const x1 = 300 + Math.cos(angle) * startR
            const y1 = 360 + Math.sin(angle) * startR
            
            // Конец лопатки (у внешнего обода)
            const endR = 115
            const x2 = 300 + Math.cos(angle + 0.4) * endR
            const y2 = 360 + Math.sin(angle + 0.4) * endR
            
            // Контрольная точка для плавного изгиба
            const ctrlR = 80
            const ctrlAngle = angle + 0.2
            const cx = 300 + Math.cos(ctrlAngle) * ctrlR
            const cy = 360 + Math.sin(ctrlAngle) * ctrlR
            
            return (
              <path 
                key={i} 
                d={`M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`} 
              />
            )
          })}
        </g>
        
        {/* Ступица (внутренняя) */}
        <circle cx="300" cy="360" r="18" fill="#d9540a" />
      </g>
      
      {/* Ось вала — всегда сверху */}
      <circle cx="300" cy="360" r="6" fill="#fff" />

      {/* ================= ПОТОК ЖИДКОСТИ ================= */}
      {!reduced && (
        <g>
          {/* Траектория потока */}
          <path
            d="M 20 360 L 130 360 C 200 360, 240 340, 270 330 C 300 320, 340 300, 420 260 C 520 210, 640 160, 835 100"
            fill="none"
            stroke="url(#flowGrad)"
            strokeWidth="4"
            strokeDasharray="12 8"
            opacity="0.6"
          />
          {/* Частицы потока */}
          {[0, 0.7, 1.4, 2.1].map((delay, i) => (
            <circle key={i} r="7" fill="#38bdf8" opacity={0.95 - i * 0.15}>
              <animateMotion
                dur="3.2s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                path="M 20 360 L 130 360 C 200 360, 240 340, 270 330 C 300 320, 340 300, 420 260 C 520 210, 640 160, 835 100"
              />
            </circle>
          ))}
          {/* Внутренние частицы (внутри колеса) */}
          {[0.3, 1.1].map((delay, i) => (
            <circle key={`inner-${i}`} r="4" fill="#7dd3fc" opacity="0.8">
              <animateMotion
                dur="3.2s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                path="M 20 360 L 130 360 C 200 360, 240 340, 270 330 C 300 320, 340 300, 420 260 C 520 210, 640 160, 835 100"
              />
            </circle>
          ))}
        </g>
      )}
    </svg>
  )
}