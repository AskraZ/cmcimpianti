import Link from 'next/link'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import QuoteForm from '@/components/QuoteForm'
import ServiceIcon from '@/components/ServiceIcon'
import { services, steps } from '@/lib/services'
import { getLavori } from '@/lib/sanity'

export const revalidate = 60

export default async function Home() {
  const lavori = await getLavori()

  return (
    <>
      <Hero />

      <section id="servizi" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight">
              Quattro competenze, un solo interlocutore
            </h2>
            <p className="max-w-[42ch] text-mute">Ogni servizio ha la sua pagina, con i dettagli e i lavori già realizzati.</p>
          </div>
          <div className="grid border border-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="flex min-h-72 flex-col gap-3.5 border-b border-line p-7 transition-colors last:border-b-0 hover:bg-bg2 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="font-mono text-[13px] text-emink">{s.n}</span>
                <ServiceIcon k={s.key} />
                <h3 className="text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="text-[15px] text-mute">{s.short}</p>
                <span className="mt-auto font-bold text-emink">Scopri di più</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="border-y border-line bg-bg2 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight">
              Come lavoriamo, in quattro passaggi
            </h2>
            <p className="max-w-[42ch] text-mute">Lo stesso percorso per ogni servizio, così sai sempre a che punto siamo.</p>
          </div>
          <ol className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map((st, i) => (
              <li key={st.t} className="relative border-t-2 border-brand pr-6 pt-6 before:absolute before:-top-[7px] before:left-0 before:size-3 before:border-2 before:border-brand before:bg-em">
                <span className="font-mono text-[13px] text-emink">Fase {i + 1}</span>
                <h3 className="mb-1.5 mt-1 text-xl font-bold">{st.t}</h3>
                <p className="text-[15px] text-mute">{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="lavori" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight">Lavori realizzati</h2>
            <p className="max-w-[42ch] text-mute">Alcuni interventi recenti, aggiornati direttamente da noi.</p>
          </div>
          <Works lavori={lavori} empty="Stiamo aggiungendo i nostri lavori più recenti. Torna a trovarci presto." />
        </div>
      </section>

      <section id="preventivo" className="grid-lines bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 max-w-[14ch] text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight">Raccontaci cosa ti serve</h2>
            <p className="text-[#c5d3ee]">Compila il modulo: ti rispondiamo entro due giorni lavorativi con una proposta o per fissare un sopralluogo.</p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
