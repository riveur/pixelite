import { DateTime, Settings } from 'luxon'

import { useTranslation } from '@/lib/i18n'

export function useLuxon() {
  const { i18n } = useTranslation()

  Settings.defaultLocale = i18n.language

  return {
    DateTime,
  }
}
