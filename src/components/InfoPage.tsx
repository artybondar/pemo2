import type { ReactNode } from 'react'

type Block = {
  title: string
  body: ReactNode
}

type Props = {
  eyebrow: string
  title: string
  intro: string
  blocks: Block[]
}

export default function InfoPage({ eyebrow, title, intro, blocks }: Props) {
  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <p className="font-mono text-xs text-accent">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{intro}</p>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="space-y-12">
          {blocks.map((b) => (
            <div key={b.title} className="grid gap-3 border-t border-line pt-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
              <h2 className="font-display text-2xl font-semibold text-ink">{b.title}</h2>
              <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                {b.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
