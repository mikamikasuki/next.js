import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Short } from './short'

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Suspense fallback={null}>
          <Short />
        </Suspense>
      </body>
    </html>
  )
}
