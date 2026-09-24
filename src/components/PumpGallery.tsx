import { useState } from 'react'
import type { PumpImage } from '../data/content'
import Lightbox from './Lightbox'

type Props = {
  images: PumpImage[]
}

export default function PumpGallery({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.full}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden border border-line bg-surface"
          >
            <img
              src={img.thumb}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 flex items-end text-white from-graphite/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="p-3 text-left text-xs leading-snug text-white">{img.alt}</span>
            </span>
            <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center border border-white/40 bg-graphite/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M21 16v4a1 1 0 0 1-1 1h-4M3 16v4a1 1 0 0 0 1 1h4" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </>
  )
}
