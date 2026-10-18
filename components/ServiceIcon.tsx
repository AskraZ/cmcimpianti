import type { ServiceKey } from '@/lib/types'

const paths: Record<ServiceKey, React.ReactNode> = {
  elettrico: <path d="M26 4 12 26h10l-2 18 16-24H26z" />,
  video: (<><rect x="6" y="14" width="30" height="18" rx="3" /><path d="M36 20l8-4v16l-8-4M14 32v8h14v-8" /></>),
  verde: <path d="M24 44V22M24 22C24 10 14 6 6 6c0 10 4 16 18 16zM24 28c0-8 8-12 16-12 0 8-4 12-16 12z" />,
  web: (<><rect x="4" y="8" width="40" height="32" rx="3" /><path d="M4 16h40M20 24l-4 4 4 4M28 24l4 4-4 4" /></>),
}

export default function ServiceIcon({ k, className = 'size-11' }: { k: ServiceKey; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`${className} fill-none stroke-brand`} strokeWidth={1.6} aria-hidden="true">
      {paths[k]}
    </svg>
  )
}
