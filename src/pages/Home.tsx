import { Link } from 'react-router-dom'
import PumpSchematic from '../components/PumpSchematic'
import SectionHeading from '../components/SectionHeading'
import IndustrySelector from '../components/IndustrySelector'
import TcoCalculator from '../components/TcoCalculator'
import Testimonials from '../components/Testimonials'
import PumpShowcase from '../components/PumpShowcase'
import {
  advantages,
  companyStats,
  heroKpis,
  heroStats,
  presentationUrl,
} from '../data/content'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:py-20">
          <div>
            <p className="font-mono text-xs text-accent">Инженерные решения с 1947 года</p>
            <h1 className="mt-3 max-w-xl font-display text-[2.6rem] font-semibold leading-[0.98] sm:text-6xl">
              Работает там, где другие останавливаются
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
              PEMO проектирует и производит центробежные насосы для пульпы,
              шлама и агрессивных кислотных растворов. По результатам
              испытаний на реальных производствах насосы PEMO работают на
              20–30% дольше аналогичных устройств.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="border border-accent bg-accent px-6 py-3 text-sm font-medium transition-colors hover:bg-accent-deep hover:border-accent-deep"
              >
                Рассчитать экономию
              </a>
              <Link
                to="/catalog"
                className="border border-white/25 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-white hover:text-white"
              >
                Смотреть каталог
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono text-lg font-medium text-white sm:text-xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-white/50">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <PumpSchematic className="h-auto w-full text-white/80" />
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              {heroKpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={`absolute flex items-center gap-2 border border-accent/40 bg-graphite/90 px-3 py-1.5 backdrop-blur-sm motion-safe:animate-pulse ${
                    i === 0 ? 'right-2 top-2' : 'bottom-4 right-6'
                  }`}
                  style={{ animationDuration: '3s' }}
                >
                  <span className="font-mono text-sm font-semibold text-accent">{kpi.value}</span>
                  <span className="text-[10px] uppercase leading-tight text-white/50">{kpi.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO SHOWCASE — реальные насосы PEMO в эксплуатации */}
      <section className="border-b border-line bg-bg py-10 lg:py-14">
        <div className="container-px mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent-deep">На объектах заказчиков</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Насосы PEMO в работе
            </h2>
          </div>
          <Link to="/catalog" className="hidden shrink-0 text-sm font-medium text-accent-deep hover:underline sm:block">
            Смотреть по категориям →
          </Link>
        </div>
        <PumpShowcase />
      </section>

      {/* ADVANTAGES */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="Почему инженеры выбирают PEMO"
          title="Четыре причины ниже TCO"
          lede="Инженерные решения, которые снижают затраты и повышают надёжность производства на всём сроке службы насоса."
        />

        <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2">
          {advantages.map((a) => (
            <div key={a.id} className="border-l-2 border-accent pl-5">
              <p className="font-mono text-xs uppercase text-accent-deep">{a.stat}</p>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
                {a.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {a.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-ink-soft">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES — interactive selector */}
      <section className="border-y border-line bg-surface py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Отрасли"
            title="Основные области применения"
            lede="Выберите отрасль — покажем ключевые параметры и рекомендованное исполнение насоса."
          />
          <div className="mt-10">
            <IndustrySelector />
          </div>
        </div>
      </section>

      {/* TCO CALCULATOR */}
      <section id="calculator" className="scroll-mt-20 container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="Калькулятор"
          title="Сколько вы сэкономите на TCO"
          lede="Введите параметры вашего процесса — покажем оценку годовой экономии на энергии, запчастях и простоях."
        />
        <div className="mt-10">
          <TcoCalculator />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-line bg-surface py-16 lg:py-24">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Отзывы"
              title="Что говорят инженеры и руководители"
              lede="Типовые сценарии применения насосов PEMO на разных производствах."
            />
            <Link to="/reviews" className="hidden shrink-0 text-sm font-medium text-accent-deep hover:underline lg:block">
              Все отзывы →
            </Link>
          </div>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* COMPANY TEASER */}
      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Производство"
            title="Вимодроне, Милан. С 1947 года."
            lede="Компания PEMO проектирует и изготавливает центробежные насосы для самых сложных абразивных и агрессивных кислотных сред индивидуально под задачи заказчика."
          />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 lg:border-t-0 lg:pt-0">
            {companyStats.map((s) => (
              <div key={s.label} className="border-l-2 border-line pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-mono text-2xl font-medium text-ink sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link to="/about" className="text-sm font-medium text-accent-deep hover:underline">
            Подробнее о компании →
          </Link>
          <a href={presentationUrl} className="text-sm font-medium text-accent-deep hover:underline">
            Скачать презентацию (PDF) →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal text-white">
        <div className="container-px flex flex-col items-start gap-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Подберём насос под вашу технологическую задачу
          </h2>
          <Link
            to="/contacts"
            className="shrink-0 border border-white bg-white px-7 py-3 text-sm font-medium text-teal transition-colors hover:bg-accent hover:border-accent hover:text-white"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </>
  )
}
