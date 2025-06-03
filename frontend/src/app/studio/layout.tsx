import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Content management for HostScena',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>{children}</div>
}
