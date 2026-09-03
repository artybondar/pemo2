type Props = {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export default function SectionHeading({ eyebrow, title, lede, align = 'left', tone = 'light' }: Props) {
  const isCenter = align === 'center'
  const isDark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`font-mono text-xs ${isDark ? 'text-accent' : 'text-accent-deep'}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl ${
          isDark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-ink-soft'}`}>
          {lede}
        </p>
      )}
    </div>
  )
}
