import { createFileRoute } from '@tanstack/react-router'

import { DefaultLayout } from '@/features/core/components/default_layout'
import { useTranslation } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <DefaultLayout className="bg-gradient-to-b from-background to-secondary flex">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-6xl font-bold font-minecraft">{t('home.title')}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t('home.description')}</p>
      </div>
    </DefaultLayout>
  )
}
