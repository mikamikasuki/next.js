import type { ReactNode } from 'react'
import { Body } from './index'

export function InfoButton({
  description,
}: {
  description?: string | ReactNode
}) {
  if (!description) return null
  return <Body>{description}</Body>
}
