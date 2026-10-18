import Link from 'next/link'
import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-mute">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-6">
        <div>
          <p className="font-bold text-ink">{site.name}</p>
          <p>P.IVA {site.piva}</p>
          <p>{site.address}</p>
        </div>
        <div>
          <p><a className="hover:text-emink" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a className="hover:text-emink" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></p>
          <p className="mt-2"><Link className="underline hover:text-emink" href="/privacy">Informativa sulla privacy</Link></p>
        </div>
        <p className="w-full">© {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
