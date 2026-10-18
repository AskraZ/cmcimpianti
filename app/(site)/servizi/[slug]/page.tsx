import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Works from '@/components/Works'
import QuoteForm from '@/components/QuoteForm'
import ServiceIcon from '@/components/ServiceIcon'
import { services, steps } from '@/lib/services'
import { getLavori } from '@/lib/sanity'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = services.find((x) => x.slug === slug)
  return s ? { title: s.title, description: s.short } : {}
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const s = services.find((x) => x.slug === slug)
  if (!s) return notFound()
  const lavori = await getLavori(s.key)

  return (
    <>
      <section className="grid-lines bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/#servizi" className="font-mono text-sm text-em hover:underline">← Tutti i servizi</Link>
          <div className="mt-6 flex items-center gap-4">
            <ServiceIcon k={s.key} className="size-14 !stroke-em" />
            <span className="font-mono text-sm text-[#8fa6d4]">{s.n} / 04</span>
          </div>
          <h1 className="mb-4 mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-tight">{s.title}</h1>
          <p className="mb-7 max-w-[56ch] text-lg text-[#c5d3ee]">{s.lead}</p>
          <Link href="#preventivo" className="btn">Richiedi un preventivo</Link>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Cosa facciamo</h2>
            <ul className="grid gap-3">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3 border-b border-line pb-3">
                  <span className="mt-2 size-2.5 shrink-0 bg-em" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
            {s.note && <p className="mt-6 text-mute">{s.note}</p>}
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Come si procede</h2>
            <ol className="grid gap-5">
              {steps.map((st, i) => (
                <li key={st.t} className="flex gap-4">
                  <span className="font-mono text-sm text-emink">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{st.t}</h3>
                    <p className="text-[15px] text-mute">{st.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {lavori.length > 0 && (
        <section className="border-y border-line bg-bg2 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Alcuni nostri lavori</h2>
            <Works lavori={lavori} filters={false} />
          </div>
        </section>
      )}

      <section id="preventivo" className="grid-lines bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 max-w-[14ch] text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight">Chiedi un preventivo</h2>
            <p className="text-[#c5d3ee]">Raccontaci cosa ti serve per {s.title.toLowerCase()}: ti rispondiamo entro due giorni lavorativi.</p>
          </div>
          <QuoteForm defaultService={s.title} />
        </div>
      </section>
    </>
  )
}
