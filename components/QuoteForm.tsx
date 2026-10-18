'use client'

import { useState } from 'react'
import { services } from '@/lib/services'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const field =
  'w-full border border-[#c9d4e8] bg-white px-3.5 py-3 text-base text-navy placeholder:text-navy/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'

export default function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: fd.get('nome'),
          email: fd.get('email'),
          telefono: fd.get('telefono'),
          servizio: fd.get('servizio'),
          messaggio: fd.get('messaggio'),
          sito: fd.get('sito'),
          consenso: fd.get('consenso') === 'on',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Invio non riuscito.')
      setStatus('ok')
      e.currentTarget.reset()
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Invio non riuscito.')
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div role="status" className="border-t-4 border-em bg-white p-6 text-navy">
        <p className="text-lg font-bold text-[#067a54]">Richiesta inviata</p>
        <p>Grazie! Ti rispondiamo entro due giorni lavorativi.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border-t-4 border-em bg-white p-7 text-navy">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">Nome<input name="nome" required maxLength={100} autoComplete="name" className={field} /></label>
        <label className="grid gap-1.5">Email<input name="email" type="email" required maxLength={150} autoComplete="email" className={field} /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">Telefono (facoltativo)<input name="telefono" type="tel" maxLength={40} autoComplete="tel" className={field} /></label>
        <label className="grid gap-1.5">Servizio
          <select name="servizio" defaultValue={defaultService ?? services[0].title} className={field}>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5">Messaggio
        <textarea name="messaggio" required rows={4} maxLength={3000} placeholder="Descrivi brevemente il lavoro" className={field} />
      </label>
      {/* campo trappola per i bot: deve restare vuoto */}
      <input name="sito" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <label className="flex items-start gap-2.5 text-sm">
        <input name="consenso" type="checkbox" required className="mt-1 size-4 accent-[#19E39A]" />
        <span className="text-[#4a5a78]">Ho letto l’<a href="/privacy" className="underline">informativa sulla privacy</a> e acconsento al trattamento dei miei dati per ricevere una risposta.</span>
      </label>
      <button className="btn justify-self-start" disabled={status === 'sending'}>
        {status === 'sending' ? 'Invio in corso…' : 'Invia la richiesta'}
      </button>
      {status === 'error' && <p role="alert" className="border border-red-500 p-3 text-red-700">{msg} Riprova, oppure scrivici direttamente per email.</p>}
    </form>
  )
}
