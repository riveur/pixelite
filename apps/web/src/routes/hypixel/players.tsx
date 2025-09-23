import { createFileRoute, Outlet } from '@tanstack/react-router'

import { SearchPlayerForm } from '@/features/hypixel/components/search_player_form'

export const Route = createFileRoute('/hypixel/players')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <SearchPlayerForm />
      <Outlet />
    </div>
  )
}
