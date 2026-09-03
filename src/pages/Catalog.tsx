import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { applicationDetails, catalogCategories, phoneHref } from '../data/content'

export default function Catalog() {
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(
    () => (active === 'all' ? catalogCategories : catalogCategories.filter((c) => c.id === active)),
    [active],
  )

  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <p className="font-mono text-xs text-accent">Каталог</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            Модельный ряд насосов PEMO
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Пять конструктивных исполнений и более 2 000 вариантов комплектации —
            под конкретную технологическую задачу, среду и производительность.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="border-b border-line bg-surface py-12 lg:py-16">
        <div className="container-px">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Фильтр по типу насоса">
            <button
              type="button"
              role="tab"
              aria-selected={active === 'all'}
              onClick={() => setActive('all')}
              className={`border px-4 py-2 text-sm font-medium transition-colors ${
                active === 'all'
                  ? 'border-accent bg-accent text-white'
                  : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              Все исполнения
            </button>
            {catalogCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`border px-4 py-2 text-sm font-medium transition-colors ${
                  active === c.id
                    ? 'border-accent bg-accent text-white'
                    : 'border-line text-ink-soft hover:border-ink'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {filtered.map((c) => (
              <div key={c.id} className="grid gap-6 py-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">{c.title}</h2>
                  <Link
                    to={`/catalog/${c.slug}`}
                    className="mt-2 inline-block text-sm font-medium text-accent-deep hover:underline"
                  >
                    Страница исполнения →
                  </Link>
                </div>
                <div>
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{c.description}</p>

                  <div className="mt-5 grid gap-6 sm:grid-cols-3">
                    <div>
                      <p className="font-mono text-xs uppercase text-ink-faint">Характеристики</p>
                      <ul className="mt-2 space-y-1.5">
                        {c.specs.map((s) => (
                          <li key={s} className="font-mono text-xs text-ink-soft">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase text-ink-faint">Применение</p>
                      <ul className="mt-2 space-y-1.5">
                        {c.uses.map((u) => (
                          <li key={u} className="text-xs text-ink-soft">
                            • {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase text-ink-faint">Материалы</p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{c.materials}</p>
                    </div>
                  </div>

                  <a
                    href={phoneHref}
                    className="mt-5 inline-block text-sm font-medium text-accent-deep hover:underline"
                  >
                    Уточнить подбор по телефону →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS DETAIL */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="Подбор по задаче"
          title="Насосы по отраслям применения"
          lede="Каждая отрасль предъявляет свои требования к материалам, уплотнению и давлению — вот как PEMO закрывает эти задачи."
        />

        <div className="mt-12 space-y-14">
          {applicationDetails.map((d) => (
            <article key={d.id} id={d.id} className="scroll-mt-24 border-t border-line pt-8">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{d.title}</h3>
              <div className="mt-4 max-w-3xl space-y-3">
                {d.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink-soft sm:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-teal text-white">
        <div className="container-px flex flex-col items-start gap-6 py-16 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Не нашли подходящее исполнение?
          </h2>
          <Link
            to="/contacts"
            className="shrink-0 border border-white bg-white px-7 py-3 text-sm font-medium text-teal transition-colors hover:bg-accent hover:border-accent hover:text-white"
          >
            Опишите задачу — подберём насос
          </Link>
        </div>
      </section>
    </>
  )
}
