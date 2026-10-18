# CMC IMPIANTI – sito vetrina

Next.js (App Router) · Tailwind CSS · Sanity (pannello privato) · Resend (preventivi) · Vercel.

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # poi compila i valori
npm run dev                  # http://localhost:3000
```

Il sito parte anche senza Sanity e Resend: la sezione "Lavori" mostrerà un messaggio e il form restituirà "servizio email non configurato".

## 1. Sanity (pannello per caricare i lavori)

1. Crea un progetto gratuito su https://www.sanity.io/manage e copia il **Project ID**.
2. In *Datasets* verifica che esista `production` (altrimenti crealo, come pubblico).
3. In *API → CORS origins* aggiungi `http://localhost:3000` e il dominio del sito, con "Allow credentials".
4. Metti il Project ID in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
5. Apri `/studio`, accedi e crea i lavori (titolo, servizio, descrizione, foto).
6. Per dare accesso ad altre persone: *Members → Invite* nel pannello Sanity.

I lavori pubblicati compaiono nel sito entro circa un minuto.

## 2. Resend (email dei preventivi)

1. Crea l'account su https://resend.com e verifica il dominio dell'azienda.
2. Crea una API key e compila `RESEND_API_KEY`.
3. `RESEND_FROM` = mittente su dominio verificato, `PREVENTIVI_TO` = casella che riceve le richieste.

## 3. Deploy su Vercel

1. Carica il progetto su GitHub e importalo su Vercel.
2. Aggiungi tutte le variabili di `.env.example` nelle impostazioni del progetto.
3. Collega il dominio e aggiorna `NEXT_PUBLIC_SITE_URL`.

## Da completare prima della pubblicazione

- [ ] `lib/site.ts`: email, telefono e indirizzo reali
- [ ] Rileggere i testi dei servizi in `lib/services.ts`
- [ ] Far verificare l'informativa in `app/(site)/privacy/page.tsx`
- [ ] Caricare almeno 3-4 lavori in Sanity
- [ ] Aggiungere un'icona del sito (`app/icon.png`) e il logo, se esiste

## Note

- Foto hero: `public/images/hero.jpg`, controlla che la licenza ne consenta l'uso commerciale.
- Il sito non usa cookie né analytics, quindi non serve il banner cookie. Se li aggiungi, va aggiunto anche il banner.
- Il form ha una protezione base anti-bot (campo trappola). Per volumi alti valuta un captcha o un limite di richieste.
