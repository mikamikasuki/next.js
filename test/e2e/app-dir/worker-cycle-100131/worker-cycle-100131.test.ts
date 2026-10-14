import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

describe('worker importing its spawning module', () => {
  const { next, isNextStart, isTurbopack } = nextTestSetup({
    files: __dirname,
    skipStart: true,
  })

  if (!isNextStart || !isTurbopack) {
    it.skip('requires the Turbopack production build mode', () => {})
    return
  }

  it('reports recursive worker references during a Turbopack build', async () => {
    const { exitCode, cliOutput } = await next.build()

    expect(exitCode).toBe(1)
    expect(cliOutput).toContain(
      'Recursive Web Worker reference across a worker boundary detected: the worker module graph includes its own worker loader'
    )

    await next.patchFile('app/lib/worker.js', 'self.postMessage(42)')

    const validBuild = await next.build()
    expect(validBuild.exitCode).toBe(0)

    await next.start()
    const browser = await next.browser('/worker-cycle')
    await retry(async () =>
      expect(await browser.elementByCss('#worker-cycle-message').text()).toBe(
        '42'
      )
    )
  })
})
