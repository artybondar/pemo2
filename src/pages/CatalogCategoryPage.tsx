import { Link, Navigate, useParams } from 'react-router-dom'
import { catalogCategories, phone, phoneHref } from '../data/content'

export default function CatalogCategoryPage() {
  const { slug } = useParams()
  const category = catalogCategories.find((c) => c.slug === slug)

  if (!category) return <Navigate to="/catalog" replace />

  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <Link to="/catalog" className="font-mono text-xs text-accent hover:underline">
            ← Весь каталог
          </Link>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            {category.title} насосы PEMO
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{category.description}</p>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="border-t border-line pt-6">
            <p className="font-mono text-xs uppercase text-ink-faint">Характеристики</p>
            <ul className="mt-3 space-y-2">
              {category.specs.map((s) => (
                <li key={s} className="font-mono text-sm text-ink-soft">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line pt-6">
            <p className="font-mono text-xs uppercase text-ink-faint">Применение</p>
            <ul className="mt-3 space-y-2">
              {category.uses.map((u) => (
                <li key={u} className="text-sm text-ink-soft">
                  • {u}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line pt-6">
            <p className="font-mono text-xs uppercase text-ink-faint">Материалы исполнения</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{category.materials}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h2 className="font-display text-xl font-semibold text-ink">Подбор исполнения</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            Точная модель и материал футеровки зависят от перекачиваемой
            среды, давления и требуемой производительности. Инженер PEMO
            поможет подобрать исполнение по телефону.
          </p>
          <a
            href={phoneHref}
            className="mt-5 inline-block border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep hover:border-accent-deep"
          >
            Позвонить: {phone}
          </a>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h2 className="font-display text-xl font-semibold text-ink">Другие исполнения</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {catalogCategories
              .filter((c) => c.id !== category.id)
              .map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/catalog/${c.slug}`}
                    className="block border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent-deep"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  )
}
