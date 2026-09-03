import { type FormEvent, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { testimonials } from '../data/content'

type Review = {
  name: string
  company: string
  text: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setReviews((prev) => [{ name, company, text }, ...prev])
    setName('')
    setCompany('')
    setText('')
  }

  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <p className="font-mono text-xs text-accent">Отзывы</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            Опыт эксплуатации насосов PEMO
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Работаете с оборудованием PEMO? Поделитесь опытом эксплуатации —
            это помогает другим предприятиям сделать правильный выбор.
          </p>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="От инженеров — инженерам"
              title="Оставить отзыв"
              lede="Расскажите, на какой задаче используете насос, какое исполнение и как долго он в эксплуатации."
            />
            <form onSubmit={handleSubmit} className="mt-10 border-t border-line pt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase text-ink-faint">Имя</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2 w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-xs uppercase text-ink-faint">Предприятие</span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="font-mono text-xs uppercase text-ink-faint">Отзыв</span>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  required
                  className="mt-2 w-full resize-none border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                  placeholder="Модель насоса, задача, срок эксплуатации"
                />
              </label>
              <button
                type="submit"
                className="mt-6 border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep hover:border-accent-deep"
              >
                Опубликовать
              </button>
            </form>
          </div>

          <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
            {reviews.length > 0 && (
              <ul className="mb-8 space-y-6 border-b border-line pb-8">
                {reviews.map((r, i) => (
                  <li key={i} className="border-l-2 border-accent pl-5">
                    <p className="text-sm leading-relaxed text-ink-soft">{r.text}</p>
                    <p className="mt-2 font-mono text-xs uppercase text-ink-faint">
                      {r.name}
                      {r.company ? ` · ${r.company}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <ul className="space-y-6">
              {testimonials.map((t) => (
                <li key={t.name + t.company} className="border-l-2 border-line pl-5">
                  <p className="text-sm leading-relaxed text-ink-soft">«{t.quote}»</p>
                  <p className="mt-2 font-mono text-xs uppercase text-ink-faint">
                    {t.name}, {t.role} · {t.company}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
