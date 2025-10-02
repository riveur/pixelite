import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

import { SearchGuildForm } from '@/features/hypixel/components/search_guild_form'

export const Route = createFileRoute('/hypixel/guilds')({
  component: RouteComponent,
  validateSearch: z.object({ type: z.string().catch('name') }),
  beforeLoad: async ({ search }) => ({ search }),
})

function RouteComponent() {
  const { type } = Route.useSearch()

  return (
    <div className="flex flex-col gap-6">
      <SearchGuildForm type={type} />
      <Outlet />
    </div>
  )
}
