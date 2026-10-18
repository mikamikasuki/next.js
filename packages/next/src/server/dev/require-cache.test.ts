import { mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { deleteCache } from './require-cache'

declare global {
  var __turbopack_nodejs_stable_require__: ((id: string) => unknown) | undefined
}

describe('Turbopack Node.js chunk loading', () => {
  it('loads cached chunks from the stable require-cache module', () => {
    const dir = mkdtempSync(join(tmpdir(), 'next-stable-require-'))
    const chunkPath = join(dir, 'chunk.js')
    writeFileSync(chunkPath, 'module.exports = {}')

    const stableRequire = globalThis.__turbopack_nodejs_stable_require__
    expect(stableRequire).toBeDefined()

    const requireCacheModule = require.cache[require.resolve('./require-cache')]
    expect(requireCacheModule).toBeDefined()

    try {
      stableRequire!(chunkPath)
      const chunkModule = require.cache[realpathSync(chunkPath)]

      expect(chunkModule).toBeDefined()
      expect(chunkModule!.parent).toBe(requireCacheModule)

      deleteCache([chunkPath])

      expect(requireCacheModule!.children).not.toContain(chunkModule)
    } finally {
      deleteCache([chunkPath])
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
