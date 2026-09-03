import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-px flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-xs text-accent-deep">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
        Возможно, ссылка устарела. Вернитесь на главную или откройте каталог насосов.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="border border-accent bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-deep">
          На главную
        </Link>
        <Link to="/catalog" className="border border-line px-6 py-3 text-sm font-medium text-ink-soft hover:border-ink">
          Каталог
        </Link>
      </div>
    </section>
  )
}
