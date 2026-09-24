// В проде фронтенд и /php лежат на одном домене — базовый путь пустой.
// Для локальной разработки (Vite на 5173, PHP отдельно) можно задать
// VITE_API_BASE в .env, например VITE_API_BASE=https://pemopumps.ru
const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export type LeadPayload = {
  name: string
  contact: string
  message: string
  website?: string // honeypot — всегда пустая строка от настоящего пользователя
}

export type ReviewPayload = {
  name: string
  company: string
  text: string
  website?: string
}

type ApiResult = { ok: true } | { ok: false; error: string; message?: string }

async function postJson(path: string, payload: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      return { ok: false, error: data?.error ?? 'request_failed', message: data?.message }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'network' }
  }
}

export function submitLead(payload: LeadPayload) {
  return postJson('/php/send-lead.php', payload)
}

export function submitReview(payload: ReviewPayload) {
  return postJson('/php/send-review.php', payload)
}
