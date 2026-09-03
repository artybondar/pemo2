import { type FormEvent, useState } from 'react'

type Inputs = {
  power: number
  hours: number
  price: number
  pumpCost: number
  parts: number
  downtimeCost: number
}

const defaults: Inputs = {
  power: 55,
  hours: 6000,
  price: 6,
  pumpCost: 1_200_000,
  parts: 350_000,
  downtimeCost: 15_000,
}

// Прозрачные допущения модели — показаны пользователю рядом с результатом.
const ENERGY_SAVING_RATE = 0.13 // выше КПД → меньше потребления при той же гидравлической работе
const PARTS_SAVING_RATE = 0.25 // более долгий ресурс и доступные запчасти
const BASELINE_DOWNTIME_SHARE = 0.015 // типовая доля внеплановых простоев для абразивных сред
const DOWNTIME_REDUCTION_RATE = 0.3 // снижение простоев благодаря разборному корпусу

type Result = {
  energy: number
  parts: number
  downtime: number
  total: number
  payback: number | null
}

function calculate(i: Inputs): Result {
  const energy = i.power * i.hours * i.price * ENERGY_SAVING_RATE
  const parts = i.parts * PARTS_SAVING_RATE
  const downtimeHoursSaved = i.hours * BASELINE_DOWNTIME_SHARE * DOWNTIME_REDUCTION_RATE
  const downtime = downtimeHoursSaved * i.downtimeCost
  const total = energy + parts + downtime
  const payback = i.pumpCost > 0 && total > 0 ? i.pumpCost / total : null
  return { energy, parts, downtime, total, payback }
}

function formatRub(n: number) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' ₽'
}

const fields: { key: keyof Inputs; label: string; step?: number }[] = [
  { key: 'power', label: 'Мощность насоса, кВт' },
  { key: 'hours', label: 'Часов работы в год' },
  { key: 'price', label: 'Стоимость эл/энергии, руб/кВтч', step: 0.1 },
  { key: 'pumpCost', label: 'Стоимость насоса, руб' },
  { key: 'parts', label: 'Запчасти в год, руб' },
  { key: 'downtimeCost', label: 'Потери от простоя, руб/час' },
]

export default function TcoCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults)
  const [result, setResult] = useState<Result | null>(null)

  function handleChange(key: keyof Inputs, value: string) {
    const n = Number(value)
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(n) ? n : 0 }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setResult(calculate(inputs))
  }

  function handleReset() {
    setInputs(defaults)
    setResult(null)
  }

  return (
    <div className="grid gap-8 border border-line bg-surface lg:grid-cols-[1fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="font-mono text-xs uppercase text-ink-faint">{f.label}</span>
              <input
                type="number"
                min={0}
                step={f.step ?? 1}
                value={inputs[f.key]}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="mt-2 w-full border border-line bg-surface px-3 py-2.5 font-mono text-sm text-ink outline-none focus:border-accent"
              />
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep hover:border-accent-deep"
          >
            Рассчитать экономию
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="border border-line px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-ink"
          >
            Сбросить
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center border-t border-line bg-bg p-6 sm:p-8 lg:border-l lg:border-t-0">
        {result === null ? (
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Заполните параметры слева и нажмите «Рассчитать экономию» — покажем
            оценку годовой экономии по трём статьям затрат.
          </p>
        ) : (
          <div>
            <p className="font-mono text-xs uppercase text-ink-faint">Экономия в год</p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">
              {formatRub(result.total)}
            </p>

            <dl className="mt-6 space-y-3 border-t border-line pt-5">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-ink-soft">Электроэнергия (выше КПД)</dt>
                <dd className="font-mono text-ink">{formatRub(result.energy)}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-ink-soft">Запчасти и обслуживание</dt>
                <dd className="font-mono text-ink">{formatRub(result.parts)}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-ink-soft">Меньше простоев</dt>
                <dd className="font-mono text-ink">{formatRub(result.downtime)}</dd>
              </div>
            </dl>

            {result.payback !== null && (
              <p className="mt-5 border-t border-line pt-5 text-sm text-ink-soft">
                Срок окупаемости насоса:{' '}
                <span className="font-mono font-medium text-ink">
                  {result.payback < 1 ? '< 1 года' : `≈ ${result.payback.toFixed(1)} года`}
                </span>
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-ink-faint">
              Оценочный расчёт: +{Math.round(ENERGY_SAVING_RATE * 100)}% к КПД,
              −{Math.round(PARTS_SAVING_RATE * 100)}% на запчасти,
              −{Math.round(DOWNTIME_REDUCTION_RATE * 100)}% внеплановых простоев.
              Точные цифры для вашей задачи уточнит инженер PEMO.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
