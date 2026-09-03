import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks, phone, phoneHref } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-graphite text-white">
      <div className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="text-2xl font-display font-bold tracking-tight lg:text-3xl">
            PEMO
          </span>
          <span className="hidden font-mono text-[10px] uppercase leading-tight text-white/50 sm:block">
            Perissinotto
            <br />
            pumps
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-white/75'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={phoneHref}
            className="hidden font-mono text-sm font-medium tracking-tight text-white sm:block"
          >
            {phone}
          </a>
          <Link
            to="/contacts"
            className="hidden shrink-0 rounded-none border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-deep hover:border-accent-deep lg:block"
          >
            Оставить заявку
          </Link>
          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span
              className={`block h-px w-6 bg-white transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-white transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 xl:hidden">
          <nav className="container-px flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/10 py-3 text-base ${isActive ? 'text-accent' : 'text-white/85'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a href={phoneHref} className="mt-3 font-mono text-base text-white">
              {phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
