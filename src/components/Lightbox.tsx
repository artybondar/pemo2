import { useEffect } from 'react'
import type { PumpImage } from '../data/content'

type Props = {
  images: PumpImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const current = images[index]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, images.length, onClose, onNavigate])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-graphite/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="font-mono text-xs text-white/50">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть просмотр"
          className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            aria-label="Предыдущее фото"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
        )}

        <figure className="flex max-h-full max-w-full flex-col items-center">
          <img
            src={current.full}
            alt={current.alt}
            className="max-h-[72vh] w-auto max-w-full border border-white/10 object-contain"
          />
          <figcaption className="mt-4 max-w-xl text-center text-sm text-white/60">{current.alt}</figcaption>
        </figure>

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % images.length)}
            aria-label="Следующее фото"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-accent hover:text-accent sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
