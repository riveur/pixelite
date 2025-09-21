import { createFileRoute, Outlet } from '@tanstack/react-router'

import { DefaultLayout } from '@/features/core/components/default_layout'
import { ServerBanner } from '@/features/core/components/server_banner'
import {
  ServerWrapper,
  ServerWrapperInset,
  ServerWrapperNavigation,
  type ServerWrapperNavigationLink,
} from '@/features/core/components/server_wrapper'
import { info } from '@/features/hypixel/contents/info'
import { useTranslation } from '@/lib/i18n'

export const Route = createFileRoute('/hypixel')({
  beforeLoad: async () => {
    return {
      info: info,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  const links: Array<ServerWrapperNavigationLink> = [
    { label: t('server.labels.overview'), url: '/hypixel' },
    { label: t('server.labels.player'), url: '/hypixel/players' },
    { label: t('server.hypixel.guildLabel'), url: '/hypixel/guilds' },
    { label: t('server.labels.website'), url: info.website, external: true },
    { label: t('server.labels.wiki'), url: info.wiki!, external: true },
  ]

  return (
    <DefaultLayout>
      <ServerBanner info={info} />
      <ServerWrapper>
        <ServerWrapperNavigation links={links} />
        <ServerWrapperInset>
          <Outlet />
        </ServerWrapperInset>
      </ServerWrapper>
    </DefaultLayout>
  )
}
