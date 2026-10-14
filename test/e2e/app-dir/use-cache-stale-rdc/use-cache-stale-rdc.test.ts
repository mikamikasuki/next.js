import { nextTestSetup } from 'e2e-utils'
import { waitFor } from 'next-test-utils'

describe('use-cache-stale-rdc', () => {
  const { next, isNextDev } = nextTestSetup({
    files: __dirname,
  })

  it('keeps a stale hit in the request cache during background revalidation', async () => {
    if (!isNextDev) return

    const cliOutputStart = next.cliOutput.length
    const firstPage = await next.render$('/')
    expect(firstPage('#banner').text()).toBe('banner 1')

    await waitFor(3000)

    const otherPage = await next.render$('/other')
    expect(otherPage('#other').text()).toBe('other 1')

    await waitFor(1000)
    expect(next.cliOutput.slice(cliOutputStart)).not.toContain(
      'encountered uncached data during prerendering'
    )
  })
})
