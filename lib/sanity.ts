import { createClient } from 'next-sanity'
import type { Lavoro, ServiceKey } from './types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Se Sanity non è ancora configurato il sito funziona comunque (senza lavori).
const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
  : null

const query = `*[_type == "lavoro" && ($s == null || servizio == $s)]
  | order(coalesce(data, _createdAt) desc) {
    _id, titolo, servizio, descrizione, data,
    "foto": foto[]{ "url": asset->url, alt }
  }`

export async function getLavori(servizio?: ServiceKey): Promise<Lavoro[]> {
  if (!client) return []
  try {
    return await client.fetch<Lavoro[]>(query, { s: servizio ?? null }, { next: { revalidate: 60 } })
  } catch (e) {
    console.error('Sanity fetch error', e)
    return []
  }
}
