import { useState } from 'react'
import { pumpShowcase } from '../data/content'
import Lightbox from './Lightbox'

export default function PumpShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const loop = [...pumpShowcase, ...pumpShowcase]

  return (
    <div className="group relative overflow-hidden">
      {/* лёгкий градиент по краям, чтобы обрезка ленты не выглядела случайной */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-t from-bg to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-t from-bg to-transparent sm:w-24" />

      <div className="flex w-max animate-marquee gap-4">
        {loop.map((img, i) => (
          <button
            key={`${img.full}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i % pumpShowcase.length)}
            className="relative h-56 w-72 shrink-0 overflow-hidden border border-line bg-surface sm:h-64 sm:w-80"
          >
            <img
              src={img.thumb}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-graphite/85 to-transparent px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-white">{img.category}</span>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={pumpShowcase}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  )
}
