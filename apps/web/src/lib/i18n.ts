import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { useLangStore } from '@/features/core/stores/lang_store'

const langs = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
]

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: useLangStore.getState().lang,
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n, langs }

export { useTranslation } from 'react-i18next'
