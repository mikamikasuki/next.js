import { nextTestSetup } from 'e2e-utils'
import fs from 'node:fs/promises'
import path from 'node:path'

describe('Turbopack webpack loader with a restored build cache', () => {
  const { next } = nextTestSetup({
    files: __dirname,
    skipStart: true,
    dependencies: {
      '@tailwindcss/turbopack': '4.3.3',
      tailwindcss: '4.3.3',
    },
  })

  for (let attempt = 1; attempt <= 5; attempt++) {
    it(`does not process a restored file with its previous build content (attempt ${attempt})`, async () => {
      const distDir = path.join(next.testDir, '.next')
      const cssPath = path.join(next.testDir, 'app/globals.css')
      const pagePath = path.join(next.testDir, 'app/page.tsx')

      await fs.rm(distDir, { recursive: true, force: true })
      await fs.writeFile(cssPath, stylesheet('v1'))
      await fs.writeFile(pagePath, page(''))

      const coldBuild = await next.build()
      expect(coldBuild.exitCode).toBe(0)

      for (const entry of await fs.readdir(distDir)) {
        if (entry !== 'cache') {
          await fs.rm(path.join(distDir, entry), {
            recursive: true,
            force: true,
          })
        }
      }

      await fs.writeFile(cssPath, stylesheet('v2'))
      await fs.writeFile(pagePath, page('underline'))

      const warmBuild = await next.build({
        env: { TURBO_ENGINE_READ_CONCURRENCY: '1' },
      })
      expect(warmBuild.exitCode).toBe(0)

      const css = (await findCssFiles(path.join(distDir, 'static'))).map(
        (file) => fs.readFile(file, 'utf8')
      )
      const builtCss = (await Promise.all(css)).join('\n')

      expect(builtCss).toMatch(/--repro-stylesheet:\s*"v2"/)
      expect(builtCss).toMatch(
        /\.underline\{[^}]*text-decoration-line:underline/
      )
    })
  }
})

function stylesheet(version: string) {
  return `@import "tailwindcss";\n\n:root {\n  --repro-stylesheet: "${version}";\n}\n`
}

function page(className: string) {
  return `export default function Page() {\n  return <h1 className="text-xl ${className}">Hello</h1>;\n}\n`
}

async function findCssFiles(directory: string): Promise<string[]> {
  const files: string[] = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findCssFiles(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      files.push(fullPath)
    }
  }
  return files
}
