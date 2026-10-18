import { nextTestSetup } from 'e2e-utils'

describe('short-lived-cache-rdc-marker', () => {
  const { next, isNextDev } = nextTestSetup({
    files: __dirname,
  })

  it('should not report cache misses for a short-lived entry shared by static routes', async () => {
    if (!isNextDev) {
      expect(next.cliOutput).not.toContain(
        'Unexpected cache miss after cache warming phase during prerendering'
      )
    }
  })
})
