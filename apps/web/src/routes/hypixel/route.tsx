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
    { label: t('server.labels.overview'), url: '/hypixel', children: ['/hypixel', '/hypixel/'] },
    {
      label: t('server.labels.player'),
      url: '/hypixel/players',
      children: ['/hypixel/players', '/hypixel/players/', '/hypixel/players/$username'],
    },
    {
      label: t('server.hypixel.labels.guild'),
      url: '/hypixel/guilds',
      children: ['/hypixel/guilds', '/hypixel/guilds/', '/hypixel/guilds/$name'],
    },
    { label: t('server.labels.website'), url: info.website, external: true },
    { label: t('server.labels.wiki'), url: info.wiki!, external: true },
  ]

  return (
    <DefaultLayout serverLinks={links}>
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
