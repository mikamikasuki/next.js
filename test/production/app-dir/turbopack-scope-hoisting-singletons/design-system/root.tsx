import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

if (typeof window !== 'undefined') {
  const global = window as typeof window & { __THEME_MODULE_EVALS?: number }
  global.__THEME_MODULE_EVALS = (global.__THEME_MODULE_EVALS ?? 0) + 1
}

export const baseTheme = {
  colors: { bases: { primary: { 700: '#1D458C' } } },
  fonts: { main: "'Roboto', sans-serif" },
  fontSizes: { base: '1rem' },
  darkMode: false,
}

const theme = {
  ...baseTheme,
  spacing: Object.values(baseTheme.fontSizes),
}

const urssafTheme = theme

type SystemRootProps = {
  children: ReactNode
  forceDarkMode?: boolean
}

const SystemRoot = ({ children, forceDarkMode }: SystemRootProps) => (
  <ThemeProvider
    theme={{ ...urssafTheme, darkMode: !!forceDarkMode, isInIframe: false }}
  >
    <>{children}</>
  </ThemeProvider>
)

export default SystemRoot
export { SystemRoot as DesignSystemThemeProvider }
