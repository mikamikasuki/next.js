import type { ReactNode } from 'react'
import { ClientProviders } from './providers'
import { PageLayout } from './page-layout'

export const metadata = {
  title: 'Turbopack scope hoisting singleton regression',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClientProviders langueParDéfaut="fr">
          <PageLayout>{children}</PageLayout>
        </ClientProviders>
      </body>
    </html>
  )
}
