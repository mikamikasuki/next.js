import { nextTestSetup } from 'e2e-utils'

describe('export-worker-ipc-limit', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('completes static generation with large resume data cache results', async () => {
    const $ = await next.render$('/items/599')
    expect($('p').text()).toBe('item 599, catalog size 1048576')
  })
})
