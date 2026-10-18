export type ServiceKey = 'elettrico' | 'video' | 'verde' | 'web'

export type Lavoro = {
  _id: string
  titolo: string
  servizio: ServiceKey
  descrizione?: string
  data?: string
  foto?: { url: string; alt?: string }[]
}
