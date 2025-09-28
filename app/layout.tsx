import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K-Nomad',
  description: 'Korean Digital Nomad Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}