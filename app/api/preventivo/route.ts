import { NextResponse } from 'next/server'
import { services } from '@/lib/services'
import { site } from '@/lib/site'

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status })

export async function POST(req: Request) {
  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return bad('Richiesta non valida.')
  }

  // honeypot: i bot compilano questo campo, gli utenti no
  if (str(data.sito, 50)) return NextResponse.json({ ok: true })

  const nome = str(data.nome, 100)
  const email = str(data.email, 150)
  const telefono = str(data.telefono, 40)
  const servizio = str(data.servizio, 60)
  const messaggio = str(data.messaggio, 3000)

  if (!nome || !messaggio) return bad('Compila tutti i campi obbligatori.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Indirizzo email non valido.')
  if (!services.some((s) => s.title === servizio)) return bad('Servizio non valido.')
  if (data.consenso !== true) return bad('Serve il consenso al trattamento dei dati.')

  const key = process.env.RESEND_API_KEY
  const to = process.env.PREVENTIVI_TO
  const from = process.env.RESEND_FROM
  if (!key || !to || !from) return bad('Il servizio email non è ancora configurato.', 500)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nuova richiesta di preventivo – ${servizio}`,
      text: [
        `Nuova richiesta dal sito ${site.name}`,
        '',
        `Nome: ${nome}`,
        `Email: ${email}`,
        `Telefono: ${telefono || '—'}`,
        `Servizio: ${servizio}`,
        '',
        'Messaggio:',
        messaggio,
      ].join('\n'),
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return bad('Non siamo riusciti a inviare la richiesta.', 502)
  }
  return NextResponse.json({ ok: true })
}
