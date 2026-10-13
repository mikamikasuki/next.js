import { nextTestSetup } from 'e2e-utils'

describe('turbopack-scope-hoisting-singletons', () => {
  const { next } = nextTestSetup({
    files: __dirname,
    dependencies: {
      i18next: '22.4.10',
      'react-helmet-async': '1.3.0',
      'react-i18next': '12.3.1',
      'styled-components': '6.0.7',
    },
  })

  it('evaluates a shared singleton module once in a production build', async () => {
    const browser = await next.browser('/')
    expect(await browser.eval('window.__THEME_MODULE_EVALS')).toBe(1)
    expect(await browser.elementByCss('p').text()).toContain('pour vous.')
  })
})
