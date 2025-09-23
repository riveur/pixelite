import { createFileRoute } from '@tanstack/react-router'

import illutrationUrl from '@/features/hypixel/contents/illustration.png'
import { useTranslation } from '@/lib/i18n'

export const Route = createFileRoute('/hypixel/players/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <img
        src={illutrationUrl}
        alt="Hypixel Illutration"
        className="h-96 w-auto grayscale animate-pulse"
      />
      <p>{t('server.hypixel.playerSearchHelper')}</p>
    </div>
  )
}
