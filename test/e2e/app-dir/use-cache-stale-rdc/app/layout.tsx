import type { ReactNode } from 'react'
import { getBanner } from './data'

export default async function Root({ children }: { children: ReactNode }) {
  const version = await getBanner()

  return (
    <html>
      <body>
        <p id="banner">banner {version}</p>
        {children}
      </body>
    </html>
  )
}
