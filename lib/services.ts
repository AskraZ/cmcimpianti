import type { ServiceKey } from './types'

export type Service = {
  slug: string
  key: ServiceKey
  n: string
  title: string
  short: string
  lead: string
  items: string[]
  note?: string
}

export const services: Service[] = [
  {
    slug: 'impianti-elettrici',
    key: 'elettrico',
    n: '01',
    title: 'Impianti elettrici',
    short: 'Nuovi impianti, rifacimenti, quadri e certificazioni per casa e azienda.',
    lead: 'Progettiamo e realizziamo impianti elettrici civili e industriali, dal nuovo cantiere all’adeguamento di un impianto esistente.',
    items: [
      'Impianti civili e industriali',
      'Rifacimenti e adeguamenti',
      'Quadri elettrici e cablaggio',
      'Illuminazione e domotica',
      'Dichiarazione di conformità e documentazione',
    ],
  },
  {
    slug: 'videosorveglianza',
    key: 'video',
    n: '02',
    title: 'Videosorveglianza',
    short: 'Telecamere e registrazione, con controllo da smartphone in ogni momento.',
    lead: 'Scegliamo e installiamo il sistema di telecamere più adatto a casa, negozio o capannone, e lo lasciamo pronto da usare.',
    items: [
      'Telecamere IP e analogiche',
      'Registrazione e archivio delle immagini',
      'Controllo da smartphone e computer',
      'Integrazione con antifurto e illuminazione',
      'Assistenza e manutenzione',
    ],
    note: 'Ti indichiamo anche gli adempimenti sulla privacy, come i cartelli informativi.',
  },
  {
    slug: 'giardinaggio',
    key: 'verde',
    n: '03',
    title: 'Giardinaggio',
    short: 'Progetto del verde, irrigazione automatica e manutenzione stagionale.',
    lead: 'Dalla progettazione di un nuovo giardino alla cura periodica degli spazi verdi, per privati, condomini e aziende.',
    items: [
      'Progettazione del verde',
      'Impianti di irrigazione automatica',
      'Manutenzione periodica',
      'Potature e taglio dell’erba',
      'Sistemazione di aree esterne',
    ],
  },
  {
    slug: 'siti-web',
    key: 'web',
    n: '04',
    title: 'Siti web',
    short: 'Siti vetrina chiari e veloci, pronti a portarti nuove richieste.',
    lead: 'Realizziamo siti vetrina curati e veloci, pensati per farti trovare online e ricevere richieste di contatto.',
    items: [
      'Siti vetrina su misura',
      'Form di contatto e richieste di preventivo',
      'Ottimizzazione per i motori di ricerca (SEO)',
      'Dominio, hosting e posta',
      'Aggiornamenti e assistenza',
    ],
  },
]

export const serviceLabel: Record<ServiceKey, string> = {
  elettrico: 'Elettrico',
  video: 'Videosorveglianza',
  verde: 'Giardinaggio',
  web: 'Siti web',
}

export const steps = [
  { t: 'Ascolto e sopralluogo', d: 'Capiamo le tue esigenze e, quando serve, verifichiamo il luogo.' },
  { t: 'Preventivo', d: 'Ricevi un’offerta chiara, con tempi e costi dettagliati.' },
  { t: 'Realizzazione', d: 'Lavoriamo con cura e rispettiamo i tempi concordati.' },
  { t: 'Assistenza', d: 'Collaudo, documenti e supporto anche dopo la consegna.' },
]
