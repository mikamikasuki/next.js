import { cacheLife } from 'next/cache'

async function readShared() {
  'use cache'
  cacheLife('seconds')
  return 'shared short-lived value'
}

export async function Short() {
  return <span>{await readShared()}</span>
}
