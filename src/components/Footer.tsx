import { Link } from 'react-router-dom'
import { address, catalogCategories, email, navLinks, phone, phoneHref, presentationUrl, socials } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-graphite text-white/70">
      <div className="container-px grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8 lg:py-16">
        <div>
          <span className="text-2xl font-display font-bold text-white">PEMO</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Центробежные насосы Perissinotto S.p.A. для абразивных и агрессивных
            сред. Производство — Виммодроне, Милан, Италия.
          </p>
          <a href={phoneHref} className="mt-4 block font-mono text-sm text-white">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="mt-1.5 block font-mono text-sm text-white/70 hover:text-white">
            {email}
          </a>
          <p className="mt-1.5 text-sm text-white/50">{address}</p>
          <div className="mt-4 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase text-white/50 transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase text-white/45">Разделы</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase text-white/45">Модельный ряд</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {catalogCategories.map((c) => (
              <li key={c.id}>
                <Link to={`/catalog/${c.slug}`} className="transition-colors hover:text-accent">
                  {c.title} шламовые насосы
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase text-white/45">Материалы</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={presentationUrl} className="transition-colors hover:text-accent">
                Скачать презентацию (PDF)
              </a>
            </li>
            <li>
              <Link to="/catalog" className="transition-colors hover:text-accent">
                Сравнение по применению
              </Link>
            </li>
            <li>
              <Link to="/service" className="transition-colors hover:text-accent">
                Монтаж и обслуживание
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Perissinotto © 1947—{year}</span>
          <span>Неофициальный демонстрационный сайт на данных pemopumps.ru</span>
        </div>
      </div>
    </footer>
  )
}
