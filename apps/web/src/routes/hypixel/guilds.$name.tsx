import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { GuildDetails, GuildDetailsSkeleton } from '@/features/hypixel/components/guild_details'
import { showHypixelGuildQueryOptions } from '@/features/hypixel/queries'

export const Route = createFileRoute('/hypixel/guilds/$name')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      showHypixelGuildQueryOptions({ name: params.name, type: context.search.type })
    )
  },
  pendingComponent: GuildDetailsSkeleton,
})

function RouteComponent() {
  const { name } = Route.useParams()
  const { type } = Route.useSearch()
  const { data: guild } = useSuspenseQuery(showHypixelGuildQueryOptions({ name: name, type: type }))

  return (
    <>
      <GuildDetails guild={guild} />
    </>
  )
}
