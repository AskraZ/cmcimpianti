'use client'

import { useState } from 'react'
import type { Lavoro, ServiceKey } from '@/lib/types'
import { serviceLabel } from '@/lib/services'

const img = (url: string, w: number, h?: number) =>
  `${url}?w=${w}${h ? `&h=${h}&fit=crop` : ''}&auto=format`

function Card({ l }: { l: Lavoro }) {
  const [open, setOpen] = useState(false)
  const [cover, ...rest] = l.foto ?? []
  return (
    <article className="border border-line bg-bg">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img(cover.url, 900, 675)} alt={cover.alt || l.titolo} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="grid aspect-[4/3] place-items-center bg-navy font-mono text-sm text-white/60">Foto non disponibile</div>
      )}
      <div className="p-5">
        <span className="font-mono text-[13px] text-emink">{serviceLabel[l.servizio]}</span>
        <h3 className="mb-1.5 mt-1 text-xl font-bold leading-tight">{l.titolo}</h3>
        {l.descrizione && <p className="text-[15px] text-mute">{l.descrizione}</p>}
        {rest.length > 0 && (
          <>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-3 text-[15px] font-bold text-emink underline">
              {open ? 'Nascondi le foto' : `Vedi tutte le foto (${rest.length + 1})`}
            </button>
            {open && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {rest.map((f, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={img(f.url, 500, 375)} alt={f.alt || l.titolo} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  )
}

export default function Works({ lavori, filters = true, empty }: { lavori: Lavoro[]; filters?: boolean; empty?: string }) {
  const [f, setF] = useState<ServiceKey | 'all'>('all')
  const shown = f === 'all' ? lavori : lavori.filter((l) => l.servizio === f)
  const chips: [ServiceKey | 'all', string][] = [['all', 'Tutti'], ...(Object.entries(serviceLabel) as [ServiceKey, string][])]

  if (lavori.length === 0) return empty ? <p className="text-mute">{empty}</p> : null

  return (
    <div>
      {filters && (
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtra per servizio">
          {chips.map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={f === k}
              onClick={() => setF(k)}
              className={`border px-3.5 py-2 font-mono text-[13px] ${f === k ? 'border-brand bg-brand text-white' : 'border-line hover:bg-bg2'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((l) => <Card key={l._id} l={l} />)}
      </div>
      {shown.length === 0 && <p className="text-mute">Nessun lavoro in questa categoria, per ora.</p>}
    </div>
  )
}
