import SectionHeading from '../components/SectionHeading'
import { companyStats, shippingRegions } from '../data/content'

export default function About() {
  return (
    <>
      <section className="border-b border-line-dark bg-graphite text-white">
        <div className="container-px py-14 lg:py-20">
          <p className="font-mono text-xs text-accent">О компании</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
            Perissinotto S.p.A. — завод в Вимодроне с 1947 года
          </h1>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-5 text-sm leading-relaxed text-ink-soft sm:text-base">
            <p>
              PEMO — торговая марка насосов производства Perissinotto S.p.A.,
              итальянского завода в городе Вимодроне под Миланом. Компания
              специализируется на центробежных насосах для перекачки
              абразивных суспензий, шлама и агрессивных кислотных растворов —
              сред, в которых стандартное насосное оборудование выходит из
              строя за недели.
            </p>
            <p>
              Производственный комплекс занимает около 20 000 м² и объединяет
              полный цикл: от литья корпусов и футеровки резиной или
              натуральным каучуком до сборки и стендовых испытаний готовых
              насосов. За время работы завод изготовил и поставил более
              40 000 насосов заказчикам на пяти континентах.
            </p>
            <p>
              Модельный ряд насчитывает свыше 2 000 вариантов исполнения —
              вертикальные, горизонтальные, многоступенчатые, погружные и
              насосы из суперпрочного сплава Hardalloy PEMO (750–800 HB) для
              самых тяжёлых условий эксплуатации. Такой охват позволяет
              подобрать насос индивидуально под технологию заказчика, а не
              подгонять процесс под ограничения серийной модели.
            </p>
            <p>
              Инженерная философия Perissinotto строится вокруг простоты
              обслуживания в поле: разборный корпус, доступ к импеллеру без
              демонтажа трубопроводов и уплотнение, на которое действует
              давление только со стороны входа пульпы — без постоянного
              подвода чистой воды.
            </p>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8">
              {companyStats.map((s) => (
                <div key={s.label} className="border-l-2 border-accent pl-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono text-3xl font-medium text-ink">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="География"
            title="Поставки на пять континентов"
            lede="Насосы PEMO работают на предприятиях горнодобывающей, химической и строительной отраслей по всему миру."
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {shippingRegions.map((r) => (
              <li
                key={r}
                className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
