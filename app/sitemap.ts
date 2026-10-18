import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'weekly', priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/servizi/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
