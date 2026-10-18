import Link from 'next/link'
import { site } from '@/lib/site'

const links = [
  { href: '/#servizi', label: 'Servizi' },
  { href: '/#metodo', label: 'Come lavoriamo' },
  { href: '/#lavori', label: 'Lavori' },
  { href: '/#preventivo', label: 'Contatti' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold">
          <span className="relative inline-block size-5 border-2 border-em">
            <span className="absolute inset-1 bg-em" />
          </span>
          {site.name}
        </Link>
        <nav className="hidden gap-7 md:flex" aria-label="Principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] opacity-85 hover:text-em hover:opacity-100">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/#preventivo" className="btn hidden sm:inline-block">Richiedi preventivo</Link>
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none border border-white/30 px-3 py-2 font-mono text-sm">Menu</summary>
            <div className="absolute right-0 top-full mt-3 grid w-60 gap-1 border border-white/20 bg-navy p-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="px-2 py-2 hover:text-em">{l.label}</Link>
              ))}
              <Link href="/#preventivo" className="btn mt-2 text-center">Richiedi preventivo</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
