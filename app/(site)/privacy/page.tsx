import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Informativa sulla privacy' }

// TODO: far verificare questo testo a un consulente prima della pubblicazione.
export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-bold tracking-tight">Informativa sulla privacy</h1>
      <div className="grid gap-5 text-mute">
        <p><strong className="text-ink">Titolare del trattamento:</strong> {site.name}, P.IVA {site.piva}, {site.address}. Contatto: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p><strong className="text-ink">Dati raccolti.</strong> Quando invii una richiesta tramite il modulo raccogliamo nome, indirizzo email, eventuale telefono e il testo del messaggio.</p>
        <p><strong className="text-ink">Finalità.</strong> Usiamo questi dati solo per rispondere alla tua richiesta e, se serve, preparare un preventivo. La base giuridica è l’esecuzione di misure precontrattuali richieste da te e il tuo consenso.</p>
        <p><strong className="text-ink">Destinatari.</strong> Il messaggio viene inoltrato alla nostra casella email tramite il servizio Resend, che agisce come fornitore tecnico. Non vendiamo né cediamo i dati a terzi.</p>
        <p><strong className="text-ink">Conservazione.</strong> Conserviamo i dati per il tempo necessario a gestire la richiesta e gli eventuali rapporti successivi, nel rispetto degli obblighi di legge.</p>
        <p><strong className="text-ink">I tuoi diritti.</strong> Puoi chiedere accesso, rettifica, cancellazione o limitazione del trattamento scrivendo all’indirizzo sopra. Hai inoltre il diritto di presentare reclamo al Garante per la protezione dei dati personali.</p>
        <p><strong className="text-ink">Cookie.</strong> Questo sito non usa cookie di profilazione né strumenti di analisi.</p>
      </div>
    </div>
  )
}
