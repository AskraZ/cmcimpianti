'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CSSProperties } from 'react'

const DEF = 'Scegli un servizio per scoprire di più.'

const nodes = [
  { href: '/servizi/impianti-elettrici', n: '01', label: 'Elettrico', x: 60, y: 50, text: 'Impianti elettrici civili e industriali, quadri, domotica e dichiarazione di conformità.' },
  { href: '/servizi/videosorveglianza', n: '02', label: 'Videosorveglianza', x: 380, y: 50, text: 'Telecamere IP, registrazione, controllo da smartphone e assistenza.' },
  { href: '/servizi/giardinaggio', n: '03', label: 'Giardinaggio', x: 60, y: 410, text: 'Progetto del verde, irrigazione automatica e manutenzione periodica.' },
  { href: '/servizi/siti-web', n: '04', label: 'Siti web', x: 380, y: 410, text: 'Siti vetrina veloci e curati, con form di contatto e richieste di preventivo.' },
]

const wires = ['M300 250V160H150V90', 'M300 250H450V160H470V90', 'M300 250V340H150V410', 'M300 250H470V340V410']

export default function Hero() {
  const [cap, setCap] = useState(DEF)

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-navy text-white">
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg,#0A1F44f5 0%,#0A1F44e0 45%,#0A1F4499 100%), linear-gradient(#0A1F4400 60%,#0A1F44 100%)',
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-4 font-mono text-sm text-em">Impianti · Sicurezza · Verde · Web</p>
          <h1 className="mb-5 text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight">
            Ogni impianto, un unico progetto ben collegato.
          </h1>
          <p className="mb-7 max-w-[46ch] text-[19px] text-[#c5d3ee]">
            Dall’impianto elettrico al giardino, dalle telecamere al sito web: un solo referente per progettare, installare e seguire nel tempo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#preventivo" className="btn">Richiedi un preventivo</Link>
            <Link href="/#servizi" className="btn btn-ghost">Scopri i servizi</Link>
          </div>
          <p className="mt-6 min-h-[3.2em] border-l-[3px] border-em pl-3 text-[15px] text-[#c5d3ee]" aria-live="polite">{cap}</p>
        </div>

        <svg viewBox="0 0 600 500" className="h-auto max-h-[70vh] w-full" role="group" aria-label="Schema dei quattro servizi">
          {wires.map((d, i) => (
            <path key={d} d={d} className="wire" style={{ '--len': 420, animationDelay: `${i * 0.25}s` } as CSSProperties} />
          ))}
          <g>
            <rect x="250" y="226" width="100" height="48" fill="#19E39A" />
            <text x="300" y="255" textAnchor="middle" fill="#0A1F44" fontWeight="700" fontSize="14">Progetto</text>
          </g>
          {nodes.map((nd, i) => (
            <a
              key={nd.href}
              href={nd.href}
              className="node appear"
              style={{ animationDelay: `${1.2 + i * 0.3}s` }}
              onMouseEnter={() => setCap(nd.text)}
              onFocus={() => setCap(nd.text)}
              onMouseLeave={() => setCap(DEF)}
              onBlur={() => setCap(DEF)}
              aria-label={nd.label}
            >
              <rect x={nd.x} y={nd.y} width="180" height="42" />
              <text className="num" x={nd.x + 14} y={nd.y + 26}>{nd.n}</text>
              <text x={nd.x + 44} y={nd.y + 26}>{nd.label}</text>
            </a>
          ))}
        </svg>
      </div>
    </section>
  )
}
