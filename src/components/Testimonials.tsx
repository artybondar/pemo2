import { testimonials } from '../data/content'

export default function Testimonials() {
  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      {testimonials.map((t) => (
        <figure key={t.name + t.company} className="flex flex-col gap-4 bg-surface p-6 sm:p-7">
          <blockquote className="text-sm leading-relaxed text-ink-soft sm:text-base">
            «{t.quote}»
          </blockquote>
          <figcaption className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
            <div>
              <p className="font-display text-base font-semibold text-ink">
                {t.name}, {t.role}
              </p>
              <p className="text-xs text-ink-faint">{t.company}</p>
            </div>
            <p className="shrink-0 font-mono text-[11px] text-ink-faint">{t.date}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
