import { createFileRoute } from '@tanstack/react-router'

import { ServerOverview } from '@/features/core/components/server_overview'

export const Route = createFileRoute('/hypixel/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { info } = Route.useRouteContext()

  return <ServerOverview info={info} />
}
