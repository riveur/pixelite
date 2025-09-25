import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { PlayerDetails, PlayerDetailsSkeleton } from '@/features/hypixel/components/player_details'
import { showHypixelPlayerQueryOptions } from '@/features/hypixel/queries'

export const Route = createFileRoute('/hypixel/players/$username')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(showHypixelPlayerQueryOptions(params.username))
  },
  pendingComponent: PlayerDetailsSkeleton,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: player } = useSuspenseQuery(showHypixelPlayerQueryOptions(username))

  return (
    <>
      <PlayerDetails player={player} />
    </>
  )
}
