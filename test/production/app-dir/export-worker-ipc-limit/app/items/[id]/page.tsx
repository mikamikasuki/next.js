import { randomBytes } from 'node:crypto'
import { cacheLife } from 'next/cache'

export async function generateStaticParams() {
  return Array.from({ length: 600 }, (_, i) => ({ id: String(i) }))
}

async function getCatalog() {
  'use cache'
  cacheLife('max')
  return randomBytes(768 * 1024).toString('base64')
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const catalog = await getCatalog()
  return (
    <p>
      item {id}, catalog size {catalog.length}
    </p>
  )
}
