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

export const Route = createFileRoute('/hypixel')({
  beforeLoad: async () => {
    return {
      info: info,
    }
  },
  component: RouteComponent,
})

const links: Array<ServerWrapperNavigationLink> = [
  { label: 'Overview', url: '/hypixel' },
  { label: 'Player', url: '/hypixel/players' },
  { label: 'Guild', url: '/hypixel/guilds' },
  { label: 'Website', url: info.website, external: true },
  { label: 'Wiki', url: info.wiki!, external: true },
]

function RouteComponent() {
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
