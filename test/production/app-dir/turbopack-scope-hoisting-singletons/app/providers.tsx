'use client'

import { Suspense, useState, type ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { HelmetProvider } from 'react-helmet-async'
import { DesignSystemThemeProvider } from '../design-system'

function SearchParamsReader({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <div data-path={pathname} data-search={searchParams.toString()}>
      {children}
    </div>
  )
}

function createI18nClient(langue: string) {
  const instance = i18next.createInstance()
  instance
    .use(initReactI18next)
    .init({
      lng: langue,
      fallbackLng: 'fr',
      resources: {},
      react: { useSuspense: false },
    })
    .catch((error) => console.error(error))
  return instance
}

export function ClientProviders({
  children,
  langueParDéfaut,
}: {
  children: ReactNode
  langueParDéfaut: string
}) {
  const [i18n] = useState(() => createI18nClient(langueParDéfaut))
  return (
    <Suspense>
      <HelmetProvider>
        <SearchParamsReader>
          <I18nextProvider i18n={i18n}>
            <DesignSystemThemeProvider>{children}</DesignSystemThemeProvider>
          </I18nextProvider>
        </SearchParamsReader>
      </HelmetProvider>
    </Suspense>
  )
}
