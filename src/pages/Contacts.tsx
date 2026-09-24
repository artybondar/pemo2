import { type FormEvent, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { address, email, phone, phoneHref, presentationUrl, socials } from '../data/content'
import { submitLead } from '../lib/api'

export default function Contacts() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setError('Заполните имя и телефон или e-mail — иначе мы не сможем связаться с вами.')
      return
    }
    setError('')
    setSending(true)
    const result = await submitLead({ name, contact, message, website })
    setSending(false)
    if (!result.ok) {
      setError('Не удалось отправить заявку. Позвоните напрямую: ' + phone)
      return
    }
    setSent(true)
  }

  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <p className="font-mono text-xs text-accent">Контакты</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            Обсудим подбор насоса под вашу задачу
          </h1>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Прямая связь"
              title="Позвоните или оставьте заявку"
              lede="Расскажите инженеру о перекачиваемой среде, требуемой производительности и давлении — подберём исполнение и материал футеровки."
            />
            <div className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <p className="font-mono text-xs uppercase text-ink-faint">Телефон</p>
                <a href={phoneHref} className="mt-1 block font-display text-2xl font-semibold text-ink">
                  {phone}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-ink-faint">E-mail</p>
                <a href={`mailto:${email}`} className="mt-1 block text-base font-medium text-ink hover:underline">
                  {email}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-ink-faint">Адрес</p>
                <p className="mt-1 text-base text-ink">{address}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-ink-faint">Материалы для инженера</p>
                <a href={presentationUrl} className="mt-1 block text-sm font-medium text-accent-deep hover:underline">
                  Скачать презентацию модельного ряда (PDF) →
                </a>
              </div>
              <div className="flex gap-4 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase text-ink-faint transition-colors hover:text-accent-deep"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-line bg-surface p-6 sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center gap-3 py-10">
                <div className="h-10 w-10 border-2 border-accent" aria-hidden />
                <h3 className="font-display text-2xl font-semibold text-ink">Заявка принята</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Мы свяжемся с вами в ближайшее рабочее время. Если вопрос
                  срочный — звоните напрямую: {phone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* honeypot: скрыто от людей, но видно ботам-автозаполнителям */}
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-xs uppercase text-ink-faint">Имя</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      placeholder="Как к вам обращаться"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-xs uppercase text-ink-faint">Телефон или e-mail</span>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="mt-2 w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      placeholder="Для обратной связи"
                    />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="font-mono text-xs uppercase text-ink-faint">Задача</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                    placeholder="Среда, требуемая производительность, давление"
                  />
                </label>
                {error && <p className="mt-3 text-sm text-accent-deep">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep hover:border-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Отправляем…' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
