import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppIcon from './AppIcon'
import { applications } from '../data/content'

export default function IndustrySelector() {
  const [activeId, setActiveId] = useState(applications[0].id)
  const active = applications.find((a) => a.id === activeId) ?? applications[0]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Отрасли применения">
        {applications.map((app) => (
          <button
            key={app.id}
            type="button"
            role="tab"
            aria-selected={app.id === activeId}
            onClick={() => setActiveId(app.id)}
            className={`border px-4 py-2 text-sm font-medium transition-colors ${
              app.id === activeId
                ? 'border-accent bg-accent text-white'
                : 'border-line text-ink-soft hover:border-ink'
            }`}
          >
            {app.title.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">
        <AppIcon id={active.id} className="h-14 w-14 shrink-0 text-accent-deep" />
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">{active.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{active.short}</p>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
            {active.specs.map((s) => (
              <li key={s} className="font-mono text-xs text-ink-faint">
                • {s}
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-xl border-l-2 border-accent bg-accent-soft/40 py-2 pl-4 text-sm leading-relaxed text-ink-soft">
            💡 {active.tip}
          </p>

          <Link
            to={`/catalog#${active.anchor}`}
            className="mt-5 inline-block text-sm font-medium text-accent-deep hover:underline"
          >
            Подробнее в каталоге →
          </Link>
        </div>
      </div>
    </div>
  )
}
