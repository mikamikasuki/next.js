import { cacheLife } from 'next/cache'

let bannerVersion = 0
let otherVersion = 0

export async function getBanner() {
  'use cache'
  cacheLife({ stale: 30, revalidate: 2, expire: 300 })

  await new Promise((resolve) => setTimeout(resolve, 500))
  return ++bannerVersion
}

export async function getOther() {
  'use cache'
  cacheLife('hours')

  return ++otherVersion
}
